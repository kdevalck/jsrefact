goog.provide('jijsanalysis');

// interface based on "Tool-supported Refactoring for JavaScript" by Asger Feldthaus et al. (OOPSLA'11)

function JsAnalysis(ast)
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
  this.primLattice = new LatN(1);
  var state = new AnalysisState();
  var ipda = ipdaEval(this.ast, state, {lattice: this.primLattice, k:0, ag: tagAg});
  this.lattice = ipda.lattice;
  this.store = state.store;
  this.envs = state.envs;
  this.apps = state.apps;
  this.rets = state.rets;
  this.thss = state.thss;
  this.globala = ipda.globala;
}

JsAnalysis.prototype.lookup =
  function (address)
  {
    return this.store.lookupAval(address);
  }

JsAnalysis.prototype.value =
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

JsAnalysis.prototype.objects =
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
    if (isReferenceIdentifier(node, this.ast)) // branch not tested
    {
      var refVar = lookupDeclarationIdentifier(node.name, node, this.ast);
      return this.objects(refVar);
    }
    var value = this.value(node);
    if (value instanceof JipdaValue)
    {
      return value.as
    }
    throw new Error("cannot handle value " + value);
  }

// TODO catch clauses
JsAnalysis.prototype.scope =
  function (node)
  {
    var tag = node.tag;
    return this.envs.getSetEntry(tag);
  }

JsAnalysis.prototype.proto =
  function (address)
  {
    var object = this.lookup(address);
    var protos = object.Prototype;
    var protoAddresses = protos.as;
    return protoAddresses;
  }

JsAnalysis.prototype.props =
  function (address)
  {
    var object = this.lookup(address);
    var propAddresses = object.addresses();
    var propValues = propAddresses.flatMap(this.lookup, this);
    var addresses = propValues.flatMap(function (value) {return value.as}).toSet();
    return addresses;
  }

JsAnalysis.prototype.mayHaveProp =
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
JsAnalysis.prototype.arg =
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
    var paramObjects = params.flatMap(this.objects, this);
    return paramObjects;
  }


JsAnalysis.prototype.ret =
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

  JsAnalysis.prototype.allObjects = 
  function (node) 
  { 
    return this.store.entries.flatMap( 
      function (entry) 
      { 
        var v = entry[1].aval; 
        return (v.isBenv && v.isObject()) ? [entry[0]] : []; 
      }); 
  } 
