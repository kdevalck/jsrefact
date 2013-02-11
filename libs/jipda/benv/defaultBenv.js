function DefaultBenv()
{
  function Benv(Class)
  {
    this.Class = Class;
    this.frame = [];
    this.parents = [];
    this.Call = [];
   }
  
  Benv.prototype.isBenv = true;
  
  Benv.prototype.toString =
    function ()
    {
  //    return "<" + this.Class + ": " + this.frame.map(function (entry) {return entry[0] + "->" + entry[1]}).join("|") + ">";
      return "<" + this.Class + " " + this.names() + ">";
    };
    
  Benv.prototype.accept =
    function (visitor)
    {
      return visitor.visitBenv(this);
    }
  
  // 'add' of existing address to existing name currently adds it to the front (most recent first)
    // this implies that Benv equality (certainly keeping in mind 'join' which repeatedly calls 'add') must rely on *set* equality for these addresses
  Benv.prototype.add =
    function (name, address)
    {  
      var as = [address];
      // pass 1: remove all subsumed names: e.g. add {1,2} exist {1}
      var cleanedUpEntries = [];
      for (var i = 0; i < this.frame.length; i++)
      {
        var entry = this.frame[i];
        var c = entry[0].compareTo(name); 
        if (c < 0)
        {
          // remove this entry, but keep addresses
          as = as.concat(entry[1]).toSet();
        }
        else
        {
          // keep entry
          cleanedUpEntries = cleanedUpEntries.addLast(entry);
        }
      }
      //print("pass 1 cleaned up addresses", as, "after adding", name, address);
      // pass 2: weak update of addresses
      var joinedEntries = [];
      var matchOrJoin = false;
      for (var i = 0; i < cleanedUpEntries.length; i++)
      {
        var entry = cleanedUpEntries[i];
        var c = name.compareTo(entry[0]); 
        if (c <= 0) // was '<' if strong update allowed
        {
          // union loops over argument adding to receiver, so to 'addFirst' the addresses, make 'as' receiver 
          joinedEntries = joinedEntries.addLast([entry[0], as.concat(entry[1]).toSet()]); // weak
          matchOrJoin = true;
        }
  //      else if (c === 0)
  //      {
  //        joinedEntries = joinedEntries.addLast([entry[0], as]); // strong
  //        matchOrJoin = true; // in principle we're done, since the name to add is guaranteed to be a glb after cleanup
  //      }
        else if (c > 0)
        {
          // can never happen: cleaning up ensures that name to add is glb
          throw new Error("assertion error");
        }
        else // not comparable
        {
          joinedEntries = joinedEntries.addLast(entry);
        }
      } 
      if (!matchOrJoin)
      {
        joinedEntries = joinedEntries.addFirst([name, as]);
      }
      var result = new Benv(this.Class);
      result.frame = joinedEntries;
      result.Call = this.Call;
      result.Prototype = this.Prototype;
      result.parents = this.parents;
      return result;
    };
    
  Benv.prototype.lookup =
    function (aname)
    {
      var as = [];
      for (var i = 0; i < this.frame.length; i++)
      {
        var entry = this.frame[i];
        var c = aname.compareTo(entry[0]);
        if (c <= 0)
        {
          as = as.concat(entry[1]);
          if (c === 0)
          {
            return {addresses: as.toSet(), directMatch: true};
          }
        }
      }
      return {addresses: as.toSet(), directMatch: false};
    };
    
  Benv.prototype.conc =
    function ()
    {
      return [this];
    }
  
  Benv.prototype.join =
    function (other)
    {
      if (other === BOT)
      {
        return this;
      }    
      var result = new Benv(this.Class.concat(other.Class).toSet());
      // "order preservation" for frame: receiver first (<[{1},1],[{11},11]>.join(<[{2},2],[{22},22]> = <[{1},1],[{11},11],[{2},2],[{22},22]> 
      result.frame = other.frame.slice(0);
      for (var i = this.frame.length - 1; i > -1; i--)
      {
        var entry = this.frame[i];
        var name = entry[0];
        entry[1].forEach(
          function (address)
          {
            result = result.add(name, address); // TODO review most recent first for 'Benv.add': joining equal benvs results in reversing addresses for identical names 
          });
      }
      result.Call = this.Call.concat(other.Call).toSet();
      result.Prototype = this.Prototype.join(other.Prototype);
      result.parents = this.parents.concat(other.parents).toSet();
      return result;
    }
  
  Benv.prototype.equals =
    function (x)
    {
      return this.compareTo(x) === 0;
    }
  
  Benv.prototype.subsumes =
    function (x)
    {
      if (this === x)
      {
        return true;
      }
      if (!this.Class.subsumes(x.Class) 
          || !this.parents.subsumes(x.parents) 
          || !this.Prototype.subsumes(x.Prototype)
          || !this.Call.subsumes(x.Call))
      {
        return false;
      }
      for (var i = 0; i < this.frame.length; i++)
      {
        var thisEntry = this.frame[i];
        var xas = x.lookup(thisEntry[0]).addresses;
        if (!thisEntry[1].subsumes(xas))
        {
          return false;
        }
      }
      return true;
    }
  
  Benv.prototype.compareTo =
    function (x)
    {
      return Lattice.subsumeComparison(this, x);
    }
  
  Benv.prototype.names = 
    function ()
    {
      return this.frame.map(function (entry) { return entry[0]; });
    }
    
  Benv.prototype.addresses = 
    function ()
    {
      return myAddresses = this.frame.flatMap(function (entry) { return entry[1]; });
    }
  
  Benv.prototype.isObject =
    function ()
    {
      return this.Class.indexOf(Ecma.Class.OBJECT) > -1;
    }
  
  Benv.prototype.isArray =
    function ()
    {
      return this.Class.indexOf(Ecma.Class.ARRAY) > -1;
    }
  
  Benv.prototype.isFunction =
    function ()
    {
      return this.Class.indexOf(Ecma.Class.FUNCTION) > -1;
    }
  
  var module = {};
  
  module.createEnvironment =
    function (parenta, sourceNode, declarationNode)
    {
      var benv = new Benv(["Env"]); // TODO introduce constant? (need a classifier here because of joining)
      benv.parents = [parenta]; // no ECMA internal property exists for 'outer environment' (10.2)
      benv.Prototype = BOT;
      return benv;    
    }
  
  module.createObject =
    function (Prototype)
    {
      var benv = new Benv([Ecma.Class.OBJECT]);
      benv.Prototype = Prototype;
      return benv;
    }
  
  module.createArray =
    function (ARRAYPA)
    {
      var benv = new Benv([Ecma.Class.ARRAY]);
      benv.Prototype = ARRAYPA;
      return benv;
    }

  module.createFunction =
    function (Call, FUNCTIONPA)
    {
      var benv = new Benv([Ecma.Class.FUNCTION]);
      benv.Prototype = FUNCTIONPA;
      benv.Call = [Call];
      return benv;
    }
  
  return module;
}
