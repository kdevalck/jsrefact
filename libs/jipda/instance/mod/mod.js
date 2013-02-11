function ModAnalysis(ast)
{

  function AnalysisState()
  {
    this.store = new Store();
    this.envs = [];
    this.thss = [];
    this.rets = [];
    this.apps = [];
  }
  AnalysisState.prototype = new State();
  
  AnalysisState.prototype.allocsAddress =
    function (address, value, stack)
    {
      this.store = this.store.allocAval(address, value);
      return this;
    };

  AnalysisState.prototype.writesAddress =
    function (address, value, stack)
    {
      this.store = this.store.allocAval(address, value);
      return this;
    };
   
  AnalysisState.prototype.appliesFunction =
    function (app, func, env, ths)
    {
      this.apps = this.apps.updateSetEntry(func.tag, app.tag);
      this.envs = this.envs.updateSetEntry(func.tag, env);
      this.thss = this.thss.updateSetEntry(func.tag, ths);
      return this;
    }
  
  AnalysisState.prototype.returns =
    function (value, application)
    {
      var rets = this.rets;
      value.addresses().forEach(
        function (address)
        {
          rets = rets.updateSetEntry(application.tag, address);
        });
      this.rets = rets;
      return this;
    }
  
  AnalysisState.prototype.join =
    function (state)
    {
      return this;
    }
 
  this.ast = ast;
  this.primLattice = new CpLattice();
  var state = new AnalysisState();
  var ipda = ipdaEval(this.ast, state, {lattice: this.primLattice, k:0, ag: tagAg});
  this.lattice = ipda.lattice;
  this.store = state.store.join(ipda.globalStore);
  this.envs = state.envs;
  this.apps = state.apps;
  this.rets = state.rets;
  this.thss = state.thss;
  this.globala = ipda.globala;
  
  function lookupGlobal(name, jsa)
  {
    return jsa.lookup(jsa.lookup(jsa.globala).lookup(jsa.primLattice.abst1(name)).addresses[0]).addresses()[0];
  }
  this.globalObjectAs = [];
  this.globalObjectAs = this.globalObjectAs.addEntry(lookupGlobal("Object", this), createAst("function Object() {}")); 
  this.globalObjectAs = this.globalObjectAs.addEntry(lookupGlobal("Function", this), createAst("function Function() {}")); 
  this.globalObjectAs = this.globalObjectAs.addEntry(lookupGlobal("Array", this), createAst("function Array() {}")); 
}

////

ModAnalysis.prototype.lookup =
  function (address)
  {
    return this.store.lookupAval(address);
  }

ModAnalysis.prototype.value =
  function (node)
  {
    var tag = node.tag;
    return this.store.entries.flatMap(
      function (entry)
      {
        var a = entry[0];
        if (a.base === tag)
        {
          return entry[1].aval;
        }
        return [];
      }).reduce(Lattice.join, BOT);
  }

ModAnalysis.prototype.addresses =
  function (node)
  {
    if (isNewExpression(node) || isFunctionExpression(node))
    {
      var tag = node.tag;
      return this.store.entries.flatMap(
        function (entry)
        {
          var a = entry[0];
          if (a.base === tag)
          {
            return entry[0];
          }
          return [];
        });
    }
    if (isReferenceIdentifier(node, this.ast))
    {
      var refVar = lookupDeclarationIdentifier(node.name, node, this.ast);
      return this.addresses(refVar);
    }
    if (isCallExpression(node))
    {
      return this.addresses(node.callee).flatMap(this.ret, this);
    }
    var value = this.value(node);
    if (value instanceof JipdaValue)
    {
      return value.as
    }
    throw new Error("cannot handle value " + value);
  }

// TODO catch clauses
ModAnalysis.prototype.scope =
  function (node)
  {
    var tag = node.tag;
    return this.envs.getSetEntry(tag);
  }

ModAnalysis.prototype.proto =
  function (address)
  {
    var object = this.lookup(address);
    var protos = object.Prototype;
    var protoAddresses = protos.as;
    return protoAddresses;
  }

ModAnalysis.prototype.props =
  function (address)
  {
    var object = this.lookup(address);
    var propAddresses = object.addresses();
    var propValues = propAddresses.flatMap(this.lookup, this);
    var addresses = propValues.flatMap(function (value) {return value.as}).toSet();
    return addresses;
  }

ModAnalysis.prototype.mayHaveProp =
  function (address, name)
  {
    var object = this.lookup(address);
    var abstractName = this.primLattice.abst1(name);
    var abstractNames = object.names();
    var subsumes = abstractNames.map(function (n) { return n.subsumes(abstractName) });
    var mayHaveProp = subsumes.reduce(function (a, b) { return a || b });
    return mayHaveProp;
  }


// TODO mustHaveProp: the resulting Benvs might be the result of joining,
// so we need meta-info on Benv names to be sure (= not yet available)

/**
 * @param i: 1..n for args, 0 for receiver
 */
ModAnalysis.prototype.arg =
  function (address, i)
  {
    var object = this.lookup(address);
    var callables = object.Call;
    if (i === 0)
    {
      var nodes = callables.map(function (callable) { return callable.node.tag });
      var receiverObjects = nodes.flatMap(this.thss.getSetEntry, this.thss);
      return receiverObjects;
    }
    var params = callables.map(function (callable) { return callable.node.params[i - 1] });
    var paramObjects = params.flatMap(this.addresses, this);
    return paramObjects;
  }


ModAnalysis.prototype.ret =
  function (address)
  {
    var object = this.lookup(address);
    var callables = object.Call;
    var nodes = callables.map(function (callable) { return callable.node.tag });
    // alternative to using 'apps': check every CallExpression in ast, see if operator has corresponding values
    var apps = nodes.flatMap(this.apps.getSetEntry, this.apps);
    var returnObjects = apps.flatMap(this.rets.getSetEntry, this.rets);
    return returnObjects;
  }

////
//
//ModAnalysis.prototype.doProtoLookup =
//  function(object, propertyName)
//  {
//    var objects = [object];
//    var result = BOT;
//    var store = this.store;
//    while (objects.length > 0)
//    {
//      var object = objects[0];
//      objects = objects.slice(1);
//      var lookup = object.lookup(propertyName);
//      var propertyAddresses = lookup.addresses;
//      if (propertyAddresses.length === 0)
//      {
//        if (object.Prototype === BOT)
//        {
//           result = result.join(this.lattice.abst1(undefined));
//        }
//        else
//        {
//          var cprotoAddresses = object.Prototype.addresses();
//          if (!cprotoAddresses)
//          {
//            throw new Error("doProtoLookup: no addresses for " + object.Prototype);
//          }
//          cprotoAddresses.forEach(
//            function (protoAddress)
//            {
//              var protoObject = store.lookupAval(protoAddress);
//              objects = objects.addLast(protoObject);         
//            });
//        }
//      }
//      else
//      {
//        var lookupResult = this.doLookupAddresses(propertyAddresses) 
//        result = result.join(lookupResult);
//        if (lookup.directMatch)
//        {
//          break;
//        }
//      }
//    }
//    return result;
//  }
//  
//ModAnalysis.prototype.doLookupAddresses =
//  function (addresses)
//  {
//    var result = BOT;
//    addresses.forEach(
//      function (address)
//      {
//        var aval = this.lookup(address);
//        result = result.join(aval);
//      }, this);
//    return result;
//  }

/**
 * @param addresses addresses of function objects
 * @returns declaration nodes for given function objects
 */
function addressesToNodes(addresses, jsa)
{
  var objects = addresses.map(jsa.lookup, jsa);
  var calls = objects.flatMap(function (o) { return o.Call });
  var nodes = calls.map(
    function (call, i)
    {
      if (call.node)
      {
        return call.node;
      }
      var address = addresses[i];
      var nodeEntry = jsa.globalObjectAs.getEntry(address);
      if (nodeEntry)
      {
        return nodeEntry[1];
      }      
      return address;
    });
  return nodes;
}

function getReadObjectNodes(funNode, jsa)
{
  var ns = nodes(funNode.body);
  var nsnf = ns.filter(function (n) { return !isFunctionExpression(n) && !isFunctionDeclaration(n)});
  var mes = nsnf.filter(
    function (n)
    {
      if (!isMemberExpression(n))
      {
        return false;
      }
      var p = parent(n, jsa.ast);
      if (!isAssignmentExpression(p))
      {
        return true;
      }
      return p.left !== n;
    });
  return mes;
}

function getWrittenObjectNodes(funNode, jsa)
{
  var ns = nodes(funNode.body);
  var nsnf = ns.filter(function (n) { return !isFunctionExpression(n) && !isFunctionDeclaration(n)});
  var asns = nsnf.filter(function (n) { return isAssignmentExpression(n) && isMemberExpression(n.left)}); // TODO UpdateExpression
  var objectNodes = asns.map(function (asn) { return asn.left });
  return objectNodes;
}


function ModFunAnalysis(readAccesses, writeAccesses)
{
  this.r = readAccesses;
  this.w = writeAccesses;
}

ModFunAnalysis.prototype.reads =
  function ()
  {
    return this.r.flatMap(function (accessToConstructor) {return accessToConstructor[1]});
  }

ModFunAnalysis.prototype.writes =
  function ()
  {
    return this.w.flatMap(function (accessToConstructor) {return accessToConstructor[1]});
  }

///////////////////////////////// inverse lookup of .Prototype addresses

ModAnalysis.prototype.analyzeFunction =
  function (funNode)
  {
    return new ModFunAnalysis(this.reads(funNode), this.writes(funNode)); // TODO creates!
  }

ModAnalysis.prototype.inverseLookup =
  function (address)
  {
    return this.store.entries.flatMap(
      function (entry) 
      {
        var aval = entry[1].aval; 
        if (aval instanceof JipdaValue && aval.addresses().memberAt(address) > -1)
        {
          return [entry[0]];
        }
        return [];
      });
  }

function constructorNodes(accessNode, jsa)
{
  var addresses = jsa.addresses(accessNode.object);
  return addresses.flatMap(
    function (address)
    {
      var tagNode = tagToNode(address.base, jsa.ast); 
      if (isObjectExpression(tagNode))
      {
        return tagNode;
      }
      var object = jsa.lookup(address);
      var protoAddresses = object.Prototype.addresses();
      var inverseAddresses = protoAddresses.flatMap(jsa.inverseLookup, jsa);
      var protoPropsAddresses = inverseAddresses.filter(function (a) {return a.base instanceof Addr && a.context === "prototype"});
      var instanceOfAddresses = protoPropsAddresses.map(function (a) {return a.base});
      return addressesToNodes(instanceOfAddresses, jsa);      
    }, jsa);
}

ModAnalysis.prototype.reads =
  function (funNode)
  {
    var accessNodes = getReadObjectNodes(funNode, this);
    var accessToConstructor = accessNodes.map(
      function (n)
      {
        return [n, constructorNodes(n, this)];
      }, this);
    return accessToConstructor;
  }

ModAnalysis.prototype.writes =
  function (funNode)
  {
    var accessNodes = getWrittenObjectNodes(funNode, this);
    var accessToConstructor = accessNodes.map(
      function (n)
      {
        return [n, constructorNodes(n, this)];
      }, this);
    return accessToConstructor;
  }

///// check addresses of name in construction site (e.g. 'F' in 'new F(...)')

ModAnalysis.prototype.analyzeFunction2 =
  function (funNode)
  {
    return new ModFunAnalysis(this.reads2(funNode), this.writes2(funNode)); // TODO creates!
  }

function constructionNode(address, jsa)
{
  var tagNode = tagToNode(address.base, jsa.ast); 
  return tagNode;
}

function constructorNodes2(constructionNode, jsa)
{
  if (isObjectExpression(constructionNode))
  {
    return [constructionNode];
  }
  if (isNewExpression(constructionNode))
  {
    var addresses = jsa.addresses(constructionNode.callee);
    return addressesToNodes(addresses, jsa);
  }
  throw new Error("cannot handle " + constructionNode)
}

ModAnalysis.prototype.reads2 =
  function (funNode)
  {
    var accessNodes = getReadObjectNodes(funNode, this);
    var accessToConstructor = accessNodes.map(
      function (n)
      {
        var addresses = this.addresses(n.object);
        var constructionNodes = addresses.flatMap(function (a) {return constructionNode(a, this)}, this);
        var cns = constructionNodes.flatMap(function (n) {return constructorNodes2(n, this)}, this);
        return [n, cns];
      }, this);
    return accessToConstructor;
  }

ModAnalysis.prototype.writes2 =
  function (funNode)
  {
    var accessNodes = getWrittenObjectNodes(funNode, this);
    var accessToConstructor = accessNodes.map(
        function (n)
        {
          var addresses = this.addresses(n.object);
          var constructionNodes = addresses.flatMap(function (a) {return constructionNode(a, this)}, this);
          var cns = constructionNodes.flatMap(function (n) {return constructorNodes2(n, this)}, this);
          return [n, cns];
        }, this);
      return accessToConstructor;
  }


