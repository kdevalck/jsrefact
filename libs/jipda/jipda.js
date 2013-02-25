goog.provide('jipda');

function Time(time)
{
  this.time = time || [];
}

Time.prototype.toString =
	function ()
	{
		return this.time.toString();
	}

Time.prototype.equals =
	function (object)
	{
		if (this === object)
		{
			return true;
		}
		return this.time.equals(object.time);
	};

Time.prototype.tick =
	function (value, k)
	{
		var newTime = this.time.slice(0);
		newTime.push(value);
		if (newTime.length > k)
		{
			newTime.shift();
		}
		return new Time(newTime);
	};
	
function StoreValue(aval, fresh)
{
  assertDefinedNotNull(aval);
  assertDefinedNotNull(aval.join);
  assertDefinedNotNull(aval.equals); 
  assertDefinedNotNull(aval.compareTo); 
	this.aval = aval;
	this.fresh = (fresh === undefined) ? 1 : fresh;
}

StoreValue.aval =
	function (storeValue)
	{
		return storeValue.aval;
	}

StoreValue.prototype.equals =
	function (x)
	{
		if (this === x)
		{
			return true;
		}
		return this.aval.equals(x.aval);
	}

StoreValue.prototype.compareTo =
  function (x)
  {
    // TODO does freshness plays a role in subsumption? Current answer: no.
    return this.aval.compareTo(x.aval);
  }

StoreValue.prototype.toString =
	function ()
	{
		return this.aval.toString();
	}

StoreValue.prototype.update =
	function (aval)
	{
		if (this.fresh === 1)
		{
			return this.strongUpdate(aval);
		}
		return this.weakUpdate(aval);
	}
	
StoreValue.prototype.strongUpdate =
	function (aval)
	{
		return new StoreValue(aval, 1);
	}

StoreValue.prototype.weakUpdate =
	function (aval)
	{
		return new StoreValue(this.aval.join(aval), 2);
	}
	
StoreValue.prototype.reset =
	function ()
	{
    return new StoreValue(BOT, 0);      
	}
	
function Store(entries)
{
	this.entries = entries || [];
}

Store.prototype.equals =
	function (x)
	{
    return this.compareTo(x) === 0;
	}

Store.prototype.compareTo =
  function (x)
  {
    return Lattice.subsumeComparison(this, x);
  }
  
Store.prototype.subsumes =
  function (x)
  {
    for (var i = 0; i < x.entries.length; i++)
    {
      var xentry = x.entries[i];
      var address = xentry[0];
      var thisEntry = this.entries.getEntry(address);
      if (!thisEntry)
      {
        return false;
      }
      var xStoreValue = xentry[1];
      var xThisValue = thisEntry[1];
      var c = xStoreValue.compareTo(xThisValue);
      if (c === undefined || c > 0)
      {
        return false;
      }
    }
    return true;
  }

Store.prototype.diff = // debug
  function (x)
  {
    var diff = [];
    for (var i = 0; i < this.entries.length; i++)
    {
      var entry = this.entries[i];
      var address = entry[0];
      var value = entry[1];
      var xentry = x.entries.getEntry(address);
      if (xentry)
      {
        var xvalue = xentry[1];
        if (!value.equals(xvalue))
        {
          diff.push(address + ":\n\t" + value + " (" + value.fresh + ")\n\t" + xvalue + " (" + xvalue.fresh + ")");
        }
      }
      else
      {
        diff.push(address + ":\n\t" + value + " (" + value.fresh + ")\n\t<undefined>");
      }
    }
    for (i = 0; i < x.entries.length; i++)
    {
      xentry = x.entries[i];
      address = xentry[0];
      xvalue = xentry[1];
      var entry = this.entries.getEntry(address);
      if (!entry)
      {
        diff.push(address + ":\n\t<undefined>\n\t" + xvalue + " (" + xvalue.fresh + ")");
      }
    }
    return diff.join("\n");
  }

Store.prototype.toString =
	function ()
	{
		return "{" + this.entries.map(
			function (entry)
			{
				return entry[0] + " =" + entry[1].fresh + "=> " + entry[1];
			}).join(",") + "}";
	}

Store.prototype.nice =
	function ()
	{
		return "\n{\n" + this.entries.map(
			function (entry)
			{
				return entry[0] + " =" + entry[1].fresh + "=> " + entry[1];
			}).join("\n") + "\n}";
	}

Store.prototype.getValue =
  function (address)
  {
    var entry = this.entries.getEntry(address);
    return entry ? entry[1] : BOT;
  }

Store.prototype.lookupAval =
	function (address)
	{
		var entry = this.entries.getEntry(address);
		if (entry)
		{
			return entry[1].aval;
		}
		throw new Error("Store.lookupAval: no abstract value for address " + address + "\n" + this.nice());
	};
	
Store.prototype.allocAval =
	function (address, aval)
	{
    assertDefinedNotNull(address);
    assertTrue(aval instanceof JipdaValue || aval.isBenv, "need JipdaValue or Benv");
  
		var entry = this.entries.getEntry(address);
		if (entry && entry.fresh !== 0)
		{
		  var weaklyUpdatedValue = entry[1].weakUpdate(aval);
//			print("REALLOCATED", address, weaklyUpdatedValue, msg ? msg : "", "-- was", entry);
		  var store = new Store(this.entries.updateEntry(address, weaklyUpdatedValue)); 
		  store.weak = true; // hackety hack?
			return store;
		}
		var newValue = new StoreValue(aval);
//    print("ALLOCATED", address, newValue, msg ? msg : "", "-- was", entry);
		return new Store(this.entries.updateEntry(address, newValue));
	};
	
Store.prototype.updateAval =
	function (address, aval, msg)
	{
    assertTrue((aval instanceof JipdaValue) || aval.isBenv, "need JipdaValue or Benv");
		var entry = this.entries.getEntry(address);
		if (entry)
		{
		  var updatedValue = entry[1].update(aval);
      //print("UPDATED", address, updatedValue, msg ? msg : "", "-- was", entry);
			return new Store(this.entries.updateEntry(address, updatedValue));
		}
		throw new Error("Store.updateAval: no abstract value at address " + address);
	};
	
Store.prototype.join =
  function (store)
  {
    if (store === BOT)
    {
      return this;
    }
    var result = [];
    var addresses = this.entries.entryKeys().concat(store.entries.entryKeys()).toSet();
    var that = this;
    addresses.forEach(
      function (address)
      {
        var thisValue = that.getValue(address);
        var otherValue = store.getValue(address);
        if (thisValue === BOT)
        {
          result = result.addEntry(address, otherValue);          
//          print("JOINED", address, otherValue, "-- was", thisValue, "-- and", otherValue);
        }
        else if (otherValue === BOT)
        {
          result = result.addEntry(address, thisValue);          
//          print("JOINED", address, thisValue, "-- was", thisValue, "-- and", otherValue);
        }
        else if (thisValue.equals(otherValue))
        {
          result = result.addEntry(address, thisValue);          
        }
        else
        {
          var joinedValue = new StoreValue(thisValue.aval.join(otherValue.aval), Math.min(thisValue.fresh + otherValue.fresh, 2));
          result = result.addEntry(address, joinedValue);          
//          print("JOINED", address, joinedValue, "-- was", thisValue, "-- and", otherValue);
        }
      });
    return new Store(result);
  };
	    
Store.prototype.narrow =
	function (addresses)
	{
		var entries =  this.entries.flatMap(
			function (entry)
			{
				var address = entry[0];
				if (addresses.memberAt(address) > -1)
				{
					return [entry];
				}
				if (address instanceof Addr)
				{
					return [];

//				  var reset = entry[1].reset();
//					print("reset address", address, "before", entry[1], "after", reset);
//					return [[address, reset]];
				}
				return [];
			}
		);
		return new Store(entries);
	};
	

function Cont(memento, benva, proc, applications, handler)
{
  this.memento = memento;
	this.benva = benva;
	this.proc = proc;
	this.applications = applications || [];
	this.handler = handler;
}

Cont.prototype.equals =
  function (other)
  {
    return this.memento.equals(other.memento)
      && this.benva.equals(other.benva)
//      && this.applications.setEquals(other.applications)  TODO review this, esp. for 'visited'
//      && Eq.equals(this.handler, other.handler)
  }

Cont.prototype.toString =
	function ()
	{
		return this.memento;
	};

Cont.prototype.execute =
	function (stack, store, time, state)
	{
//		print("---->", this, stack);
		// TODO remove (or rewrite) these asserts
    if (!(store instanceof Store))
    {
      throw new Error("no or wrong store:" + store);
    }
    if (!(time instanceof Time))
    {
      throw new Error("no or wrong time:" + time);
    }
    if (!(state instanceof State))
    {
      throw new Error("no or wrong state:" + state);
    }
		return this.proc(stack, store, time, state);
	};
	

Cont.prototype.addApplication =
  function (application)
  {
    var newApplications = this.applications.remove(application).addFirst(application);
//    print("ADDING", application, "OLD", this.applications, "NEW", newApplications);
    var cont = new Cont(this.memento, this.benva, this.proc, newApplications, this.handler);
    return cont;
  };
	
	
Cont.prototype.setHandler =
  function (handler)
  {
    var cont = new Cont(this.memento, this.benva, this.proc, this.applications, handler);
    return cont;
  }
		
function Task(msg, proc)
{
  this.msg = msg;
	this.proc = proc;
}

Task.prototype.toString =
  function ()
  {
    return this.msg;
  }

Task.prototype.execute =
	function ()
	{
		return this.proc();
	};
	
function gc(store, stack, benva)//, tasks)
{
  
	function benvReachable(benv, reachable)
	{	
		if (benv.isFunction())
		{
		  benv.Call.forEach(
		    function (Call) 
		    {
		      reachable = addressesReachable(Call.addresses(), reachable);		      		        
		    });
		}
		if (benv.isObject())
		{
			reachable = valueReachable(benv.Prototype, reachable);
		}
//		if (benv.parents)
//		{
		  reachable = addressesReachable(benv.parents, reachable);
//		}
		return addressesReachable(benv.addresses(), reachable);
	}
	
	function contReachable(cont, reachable)
	{
		return addressReachable(cont.benva, reachable);
	}
	
	function valueReachable(value, reachable)
	{
		if (value instanceof JipdaValue)
		{
			return addressesReachable(value.addresses(), reachable);
		}
    if (value instanceof Addr) // object pointer (currently only used for 'this' pointer in apply?)
    {
      return addressReachable(value, reachable);
    }
    if (value.isBenv) // object, env, ...
    {
      return benvReachable(value, reachable);
    }
		if (value instanceof Cont)
		{
			return contReachable(value, reachable);
		}
		if (Array.isArray(value))
		{
			return valuesReachable(value, reachable);
		}
		return reachable; // TODO investigate: when is getting here ok?
	}
	
	function valuesReachable(values, reachable)
	{
		for (var i = 0; i < values.length; i++)
		{
			reachable = valueReachable(values[i], reachable);
		}
		return reachable;
	}
	
	function addressReachable(address, reachable)
	{
		if (address === null)
		{
			return reachable;
		}
		if (reachable.memberAt(address) > -1)
		{
			return reachable;
		}
//		if (address instanceof Addr)
//		{
			var aval = store.lookupAval(address);
			assertDefinedNotNull(aval);
			return valueReachable(aval, reachable.addLast(address));
//		}
//		throw new Error("gc.addressReachable: cannot handle address " + address);
	}
	
	function addressesReachable(addresses, reachable)
	{
		for (var i = 0; i < addresses.length; i++)
		{
			reachable = addressReachable(addresses[i], reachable);
		}
		return reachable;
	}
	
//	function taskReachable(task, reachable)
//	{
//    //return addressReachable(task.benva, valuesReachable(task.stack, reachable));
//	  return reachable; 
//	}
	
//	function tasksReachable(tasks, reachable)
//	{
//		for (var i = 0; i < tasks.length; i++)
//		{
//			reachable = taskReachable(tasks[i], reachable);
//		}
//		return reachable;
//	}
	
	//print("GC", stack, benv, "\n", store);
//  var reachable = tasksReachable(tasks, addressReachable(benva, valuesReachable(stack, [])));
  var reachable = addressReachable(benva, valuesReachable(stack, []));
	//print("reachable", reachable);
	return store.narrow(reachable);
}


function JipdaLattice(userLattice)
{
  assertDefinedNotNull(userLattice);
  this.userLattice = userLattice; 
}
JipdaLattice.prototype = new Lattice();

JipdaLattice.prototype.toString =
  function ()
  {
    return "[JipdaLattice (" + this.userLattice + ")]";
  }

JipdaLattice.prototype.abst =
  function (cvalues)
  {
    return cvalues.map(JipdaLattice.prototype.abst1, this).reduce(Lattice.join);
  }

JipdaLattice.prototype.abst1 =
  function (cvalue)
  {
    if (cvalue instanceof Addr)
    {
      return new JipdaValue(BOT, [cvalue]);
    }
    return new JipdaValue(this.userLattice.abst1(cvalue), []);
  }

JipdaLattice.prototype.isFalse =
  function (value)
  {
//    if (this.userLattice.isFalse(value.user)) // TODO move isTrue/isFalse to LatticeValue
//    {
//      return value.as.length === 0;
//    }
//    return false;
    throw new Error();
  }

JipdaLattice.prototype.isTrue =
  function (value)
  {
//    return this.userLattice.isTrue(value.user)) // TODO move isTrue/isFalse to LatticeValue
    throw new Error(); // use ToBoolean first, then use isTrue/False on user value
  }

function JipdaValue(user, as)
{
  assertDefinedNotNull(user);
  assertDefinedNotNull(as);
  this.user = user;
  this.as = as;
}
JipdaValue.prototype = new LatticeValue();

JipdaValue.prototype.accept =
  function (visitor)
  {
    return visitor.visitJipdaValue(this);
  }

JipdaValue.prototype.addresses =
  function ()
  {
    return this.as.slice(0);
  }

JipdaValue.prototype.isAddress =
  function ()
  {
    return this.user === BOT;
  }

JipdaValue.prototype.toString =
  function (printer)
  {
    return "[" + this.user.toString(printer) + ", " + (printer ? this.as.map(printer) : this.as) + "]";
  }

JipdaValue.prototype.join =
  function (x)
  {
    if (x === BOT)
    {
      return this;
    }
    return new JipdaValue(this.user.join(x.user), this.as.concat(x.as).toSet());
  }

JipdaValue.prototype.compareTo =
  function (x)
  {
    if (x === BOT)
    {
      return 1;
    }
    
    if (x === this)
    {
      return 0;
    }

    var c1 = this.user.compareTo(x.user);
    if (c1 === undefined)
    {
      return undefined;
    }
    var c2 = Lattice.subsumeComparison(this.as, x.as);
    return Lattice.joinCompareResults(c1, c2);
  }

// TODO move this into JipdaValue as methods (and have JV NOT inherit from LatticeValue)

function toUserString(j, store)
{
  var objs = j.as.map(Store.prototype.lookupAval, store);
  // 8.12.8 The [...] specification of [[DefaultValue]] for native objects can return only primitive values.
  // !!! DefaultValue must return user value
  var vals = objs.map(function (o) {return o.DefaultValue("string")});
  var u = j.user.join(vals.reduce(Lattice.join, BOT)).ToString();
  return u;
}  

function toUserNumber(j, store)
{
  var objs = j.as.map(Store.prototype.lookupAval, store);
  var vals = objs.map(function (o) {return o.DefaultValue("number")});
  var u = j.user.join(vals.reduce(Lattice.join, BOT)).ToNumber();
  return u;
}  

function toUserInt32(j, store)
{
  var objs = j.as.map(Store.prototype.lookupAval, store);
  var vals = objs.map(function (o) {return o.DefaultValue("number")});
  var r = j.user.join(vals.reduce(Lattice.join, BOT));
//  if (!r.ToInt32) print("HELP", r, r.constructor);
  var u = j.user.join(vals.reduce(Lattice.join, BOT)).ToInt32();
  return u;
}  

function toUserBoolean(j) // no store: objects are 'true' (no need for lookup)
{
  return j.user.ToBoolean().join(j.as.length === 0 ? BOT : userLattice.abst1(true));
}


//// ToBoolean
//// ToString
//// ToUint32

function ipdaEval(node0, state0, config)
{
  // start constants
  var performGc = config.performGc === undefined ? true : config.performGc;
  var k = config.k === undefined ? 1 : config.k;
  var userLattice = config.lattice;
  var lattice = new JipdaLattice(userLattice);
  var ag = config.ag;
  var visited = config.visited || new DefaultVisitedStrategy(performGc ? gc : function (store) {return store}); // TODO make this mandatory param
  var benvFactory = config.benv || new DefaultBenv();
  
  assertDefinedNotNull(k);
  assertDefinedNotNull(userLattice);
  assertDefinedNotNull(ag);
  assertDefinedNotNull(visited);
  
  var J_UNDEFINED = lattice.abst1(undefined);
  var J_NULL = lattice.abst1(null);
  var J_0 = lattice.abst1(0);
  var J_1 = lattice.abst1(1);
  
  var U_0 = userLattice.abst1(0);
  var U_1 = userLattice.abst1(1);
  var U_TRUE = userLattice.abst1(true);
  var U_FALSE = userLattice.abst1(false);
  var U_THIS = userLattice.abst1("this");
  var U_PROTOTYPE = userLattice.abst1("prototype");
  var U_LENGTH = userLattice.abst1("length");
  // end constants

  // start JIPDA globals: shared by Tasks
	var result = BOT;
	var tasks = false;
	// end globals
	
  function createEnvironment(parenta, sourceNode, declarationNode, state)
  {
    var benv = benvFactory.createEnvironment(parenta, sourceNode, declarationNode);
    state2 = state.createsEnvironment(sourceNode, declarationNode, benv);
    return {benv:benv,state:state2};
  }

  function createObject(Prototype)
  {
    var benv = benvFactory.createObject(Prototype);
    return benv;
  }

  function createArray()
  {
    var benv = benvFactory.createArray(ARRAYPA);
    return benv;
  }

  function createClosure(node, scope)
  {
    var benv = benvFactory.createFunction(new BenvClosureCall(node, scope), FUNCTIONPA);
    return benv;
  }

  function createPrimitive(applyFunction)
  {
    var benv = benvFactory.createFunction(new BenvPrimitiveCall(applyFunction), FUNCTIONPA);
    return benv;
  }
	
	function allocAval(address, value, stack, store, state)
  {
    var store2 = store.allocAval(address, value);
    var state2 = state.allocsAddress(address, value, store2.weak, stack);
    return {store:store2, state:state2};
  }
	
	function lookupAval(address, stack, store, state)
	{
	  var result = store.lookupAval(address);
	  var state2 = state.readsAddress(address, result, stack);
	  return {value:result, state:state2};
	}
	
  function updateAval(address, value, stack, store, state)
  {
    var store2 = store.updateAval(address, value);
    var state2 = state.writesAddress(address, value, stack);
    return {store:store2, state:state2};
  }
  
  function sideEffectAval(address, value, stack, store, state)
  {
    var store2 = store.updateAval(address, value);
    var state2 = state.writesAddress(address, value, stack);
    return {store:store2, state:state2};
  }
  
  function doLookupAddresses(addresses, stack, store, state)
  {
    var result = BOT;
    addresses.forEach(
      function (address)
      {
        var lookupResult = lookupAval(address, stack, store, state);
        var aval = lookupResult.value;
        result = result.join(aval);
        state = lookupResult.state;
      });
    return {value:result, state:state};
  } 
  
	// TODO this function returns addresses, while doProtoLookup returns values
	function doScopeLookup(name, stack, benva, store, state)
	{
	  var resultas = [];
	  var benvas = [benva];
	  while (benvas.length !== 0)
	  {
	    var a = benvas[0];
	    benvas = benvas.slice(1);
	    var lookupResult = lookupAval(a, stack, store, state);
	    var benv = lookupResult.value;
	    state = lookupResult.state;
	    var lookup = benv.lookup(name);
	    resultas = resultas.concat(lookup.addresses);
	    if (lookup.directMatch)
	    {
	      break;
	    }
	    benvas = benvas.concat(benv.parents);
	  }
	  return {as:resultas.toSet(), state:state};
	}

  function doProtoLookup(object, propertyName, stack, store, state, fcont)
  {
    var objects = [object];
    var result = BOT;
    while (objects.length > 0)
    {
      var object = objects[0];
      objects = objects.slice(1);
//      print("protoLookup", propertyName, "in", object.names(), "for", object);
      var lookup = object.lookup(propertyName);
      var propertyAddresses = lookup.addresses;
      if (propertyAddresses.length === 0)
      {
        if (object.Prototype.equals(J_NULL))
        {
           result = result.join(J_UNDEFINED);
        }
        else
        {
          var cprotoAddresses = object.Prototype.addresses();
          if (!cprotoAddresses)
          {
            throw new Error("doProtoLookup: no addresses for " + object.Prototype);
            //return fcont(null, state); // TODO null checks are still in place everywhere this function is called
          }
          cprotoAddresses.forEach(
            function (protoAddress)
            {
              var lookupResult = lookupAval(protoAddress, stack, store, state);
              var protoObject = lookupResult.value;
              state = lookupResult.state;
              objects = objects.addLast(protoObject);         
            });
        }
      }
      else
      {
        var laResult = doLookupAddresses(propertyAddresses, stack, store, state);
        result = result.join(laResult.value);
        state = laResult.state;
        if (lookup.directMatch)
        {
          break;
        }
      }
    }
//    print("result of looking up", propertyName, "in", object, ":", result);
    return fcont(result, state);
  }
  
  function hoist(nodes)
  {
    function varsAndDecls(nodes)
    {
      return nodes.flatMap(
        function (node)
        {
          if (isVariableDeclaration(node))
          {
            if (node.kind === "var")
            {
              return node.declarations;
            }
          }
          else if (isFunctionDeclaration(node))
          {
            return [node];
          }
          else if (isFunctionExpression(node))
          {
            return [];
          }
          else
          {
            var cs = children(node);
            return varsAndDecls(cs);
          }      
        });
    }
    
    var vds = varsAndDecls(nodes);
//    print("vds", vds);
    var decls = [];
    var vars = [];
    vds.reverse().forEach(
      function (vd)
      {
        var name = vd.id.name;
        var exists = false;
        if (isFunctionDeclaration(vd))
        {
          decls.forEach(function (d) { if (d.id.name === name) {exists = true;}});
          if (!exists)
          {
            decls = decls.addLast(vd);
          }
        }
        else if (isVariableDeclarator(vd))
        {
          vars.forEach(function (v) { if (v.id.name === name) {exists = true;}});
          if (!exists)
          {
            decls.forEach(function (d) { if (d.id.name === name) {exists = true;}});          
          }
          if (!exists)
          {
            vars = vars.addLast(vd);
          }        
        }
      });
    return {funs: decls, vars: vars};
  }
    
  function DefaultValue(objectAddresses, primPostProcessor, node, stack, benva, store, time, state)
  {
    return DefaultValueNumber(objectAddresses, primPostProcessor, node, stack, benva, store, time, state)
  }

  function DefaultValueString(objectAddresses, primPostProcessor, node, stack, benva, store, time, state)
  {
    return defaultValue("toString", "valueOf", objectAddresses, primPostProcessor, node, stack, benva, store, time, state);
    
  }
  
  function DefaultValueNumber(objectAddresses, primPostProcessor, node, stack, benva, store, time, state)
  {
    return defaultValue("valueOf", "toString", objectAddresses, primPostProcessor, node, stack, benva, store, time, state);    
  }
  
  
  //8.12.8: returns JipdaValue with as = []
  function defaultValue(methodName1, methodName2, objectAddresses, primPostProcessor, node, stack, benva, store, time, state)
  {
    var throwTypeError = (methodName1 === null); 
    var propertyName = userLattice.abst1(throwTypeError ? methodName2 : methodName1);
    var application = node; // TODO 'synthetic' applications
    return objectAddresses.flatMap( // we do things differently here from regular applyProc (update: still holds?)
        // we create tasks for receiverAddress/Callable pairs (applyProc creates Tasks per receiverA and per Callable
      function (objectAddress)
      {
        var lookupResult = lookupAval(objectAddress, stack, store, state);
        var objectAval = lookupResult.value;
        state = lookupResult.state;
//        print("objectAddress", objectAddress, "objectAval", objectAval);
        return doProtoLookup(objectAval, propertyName, stack, store, state,
          function (method, state)
          {
            if (method === null)
            {
              throw new Error("TODO");
            }
            var methodFuns = method.as.map(function (a) { var lookupResult = lookupAval(a, stack, store, state); state = lookupResult.state; return lookupResult.value});
            var allCallable = method.user === BOT && methodFuns.map(function (benv) { return benv.Call.length > 0}).reduce(function (a, b) {return a && b});
            var Callables = methodFuns.flatMap(function (benv) { return benv.Call });
            var cont = defaultValueCont();
            var markedCont = cont.addApplication(application);
            markedCont.toString = cont.toString; // DEBUG
            var tasks = Callables.map(
              function (Callable)
              {
                return new Task("default value " + application, //stack, // orginal stack (not current) for GC purposes
                    function ()
                    {
                      return Callable.applyFunction(application, [], objectAddress, stack.addFirst(markedCont), benva, store, time, state);
                    });
              });
            if (!allCallable)
            {
              if (throwTypeError)
              {
                throw new Error("TODO: non-callable second-chance object-to-value coercion must throw type error");
              }
              tasks = tasks.addLast(new Task("not all callable",
                function ()
                {
                  // push missing called value
                  return defaultValue(null, methodName2, objectAddresses, primPostProcessor, application, stack.addFirst(BOT), benva, store, time, state);
                }));
            }
            return tasks;
            
            function defaultValueCont()
            {
              return new Cont("defval-" + node.tag, benva,
                function (stack, store, time, state)
                {
                  var aval = stack[0];
                  
                  var cont;
                  var stack2;
                  if (throwTypeError)
                  {
                    var aval2 = stack[1]; // called value
                    aval = aval.join(aval2);
                    cont = stack[2];
                    stack2 = stack.slice(3);
                    
                    if (aval.as.length === 0)
                    {
                      return cont.execute(stack2.addFirst(primPostProcessor ? primPostProcessor(aval) : aval), store, time, state);
                    }
                    
                    if (aval.user === BOT)
                    {
                      throw new Error("TODO: non-primitive second-chance object-to-value coercion must throw type error");
                    }
                    
                    return [new Task("blah1",
                      function () 
                      {
                        return cont.execute(stack2.addFirst(primPostProcessor ? primPostProcessor(aval) : aval), store, time, state);
                      }),
                      new Task("blah2",
                      function ()
                      {
                        throw new Error("TODO: non-primitive second-chance object-to-value coercion must throw type error");
                      })];
                  }
                  
                  cont = stack[1];
                  stack2 = stack.slice(2);                      
  
                  if (aval.as.length === 0)
                  {
                    return cont.execute(stack2.addFirst(primPostProcessor ? primPostProcessor(aval) : aval), store, time, state);
                  }
                  
                  if (allCallable)
                  {
                    // all callables during first attempt: no second-chance Task has been created 
                    return defaultValue(application, methodName2, objectAddresses, primPostProcessor, application, stack, benva, store, time, state);
                  }
                  
                  // not all callables, but second attempt already launched
                  return [];
                });
            }
            
          });
      });
  }
  
  // 9.3
  function ToNumber(value, node, stack, benva, store, time, state)
  {
    
    if (value.addresses().length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToNumber(), [])), store, time, state);
    }
    
    var tasks = DefaultValue(value.addresses(), function (primValue) {return primValue.ToNumber()}, node, stack, benva, store, time, state); 
    if (value.user === BOT)
    {
      return tasks;
    }
    
    return tasks.addFirst(
      new Task("primitive part ToNumber",
        function ()
        {
          var cont = stack[0];
          var stack2 = stack.slice(1);
          return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToNumber(), [])), store, time, state);
        }));
  }
  
  // 9.6
  function ToUInt32(value, node, stack, benva, store, time, state)
  {
    
    if (value.addresses().length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToUInt32(), [])), store, time, state);
    }
    
    var tasks = DefaultValue(value.addresses(), function (primValue) {return primValue.ToUInt32()}, node, stack, benva, store, time, state); 
    if (value.user === BOT)
    {
      return tasks;
    }
    
    return tasks.addFirst(
      new Task("primitive part ToNumber",
        function ()
        {
          var cont = stack[0];
          var stack2 = stack.slice(1);
          return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToUInt32(), [])), store, time, state);
        }));
  }
  
  
  // 9.8
  function ToString(value, node, stack, benva, store, time, state)
  {
    
    if (value.addresses().length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToString(), [])), store, time, state);
    }
    
    var tasks = DefaultValueString(value.addresses(), node, function (primValue) {return primValue.ToString()}, stack, benva, store, time, state); 
    if (value.user === BOT)
    {
      return tasks;
    }
    
    return tasks.addFirst(
      new Task("primitive part ToString",
        function ()
        {
          var cont = stack[0];
          var stack2 = stack.slice(1);
          return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToString(), [])), store, time, state);
        }));
  }
  
  function stackElementsSubsume(s1, s2)
  {
    if (s1.length < s2.length)
    {
      return false;
    }
//    for (var i = 0; i < s2.length; i++)
//    {
////      if (!s1[i].subsumes)
////      {
////        print("HELP", s1[i], s1[i].constructor);
////      }
////      if (!s2[i].subsumes)
////      {
////        print("HELP", s2[i], s2[i].constructor);
////      }
//      if (!s1[i].subsumes(s2[i]))
//      {
//        return false;
//      }
//    }
    return true;
  }
  

			
	function evalLiteral(node, stack, benva, store, time, state)
	{
		var cont = stack[0];
		var stack2 = stack.slice(1);
		return cont.execute(stack2.addFirst(lattice.abst1(node.value)), store, time, state);
	}

	function evalIdentifier(node, stack, benva, store, time, state)
	{
		var cont = stack[0];
		var stack2 = stack.slice(1);
		var scopeResult = doScopeLookup(userLattice.abst1(node.name), stack, benva, store, state);
		var as = scopeResult.as;
		state = scopeResult.state;
		if (as.length === 0)
		{
		  throw new Error("no addresses for " + node);
		  //return cont.execute(stack2.addFirst(lattice.abst([eval(node.name)])), time, state); SEMANTIC OVERLAP
		}
		var result = BOT;
		var laResult = doLookupAddresses(as, stack, store, state);
    return cont.execute(stack2.addFirst(laResult.value), store, time, laResult.state);
	}
	
  function evalBinaryExpression(node, stack, benva, store, time, state)
  {
    var leftNode = node.left;
    var rightNode = node.right;
  
    function leftCont()
    {
      function rightCont()
      {
        
        function mul(stack, store, time, state)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = userLattice.mul(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
        }
        function sub(stack, store, time, state)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = userLattice.sub(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
        }
        function div(stack, store, time, state)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = userLattice.div(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
        }
        function lt(stack, store, time, state)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = userLattice.lt(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
        }
        function lte(stack, store, time, state)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = userLattice.lte(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
        }
        function gt(stack, store, time, state)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = userLattice.gt(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
        }
        function gte(stack, store, time, state)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = userLattice.gte(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
        }
        
        // 11.9.3
        function eq(eqFlag, stack, store, time, state)
        {
          var rightAval = stack[0];
          var leftAval = stack[1];
          var eqResult = BOT; // primitive value
          var lasl = leftAval.as.length;
          var rasl = rightAval.as.length;
          
          if (leftAval.user !== BOT && rightAval.user !== BOT)
          {
            eqResult = eqResult.join(eqFlag ? userLattice.eq(leftAval.user, rightAval.user) : userLattice.neq(leftAval.user, rightAval.user));
          }
          
          // only primitives: done (shortcut)
          if (lasl === 0 && rasl === 0)
          {
            var cont = stack[2];
            var stack2 = stack.slice(3);
            return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state);                                      
          }
          else if (lasl === 1 && rasl === 1)
          {
            if (leftAval.as[0].equals(rightAval.as[0]))
            {
              eqResult = eqResult.join(eqFlag ? U_TRUE : U_FALSE);
            }
            else
            {
              eqResult = eqResult.join(eqFlag ? U_FALSE : U_TRUE);
            }
          }
          else if (lasl > 0 && rasl > 0)
          {
            eqResult = eqResult.join(eqFlag ? U_FALSE : U_TRUE);
            var intersection = leftAval.as.keepAll(rightAval.as);
            if (intersection.length > 0)
            {
              eqResult = eqResult.join(eqFlag ? U_TRUE : U_FALSE);
            }
          }
          
          // only addresses: done (shortcut)
          if (leftAval.user === BOT && rightAval.user === BOT)
          {
            var cont = stack[2];
            var stack2 = stack.slice(3);
            return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state);                                                        
          }
          
          function eqLeftRightCont(leftStrNum, eqResult)
          {
            return new Cont("eqLeftRight-" + node.tag, benva,
              function (stack, store, time, state)
              {
                var rightPrim = stack[0];
                // [1] [2] rightAval leftAval
                var cont = stack[3];
                var stack2 = stack.slice(4);
                eqResult = eqResult.join(eqFlag ? userLattice.eq(leftStrNum, rightPrim.user) : userLattice.neq(leftStrNum, rightPrim.user));
                return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state);                                      
              });
          }                
          
          if (leftAval.as.length !== 0)
          {
            function eqRightCont(rightStrNum, eqResult)
            {
              return new Cont("eqRight-" + rightNode.tag, benva,
                function (stack, store, time, state)
                {                      
                  var leftPrim = stack[0];
                  eqResult = eqResult.join(eqFlag ? userLattice.eq(leftPrim.user, rightStrNum) : userLattice.neq(leftPrim.user, rightStrNum));
                  // start clone
                  if (rightAval.as.length !== 0) 
                  {
                    var leftStrNum = leftAval.user.limitStringNumber();
                    if (leftStrNum !== BOT)
                    {
                      var isOnlyStrNum = (leftStrNum.equals(leftAval.user));
                      if (!isOnlyStrNum)
                      {
                        eqResult = eqResult.join(eqFlag ? U_FALSE : U_TRUE);
                      }
                      var stack2 = stack.slice(1);
                      return DefaultValue(rightAval.as, undefined, rightNode, stack2.addFirst(eqLeftRightCont(eqResult, leftStrNum)), benv, store, time, state);                      
                    }
                    else
                    {
                      eqResult = eqResult.join(eqFlag ? U_FALSE : U_TRUE);
                    }
                  }
                  // end clone
                  
                  // [1] [2] rightAval leftAval
                  var cont = stack[3];
                  var stack2 = stack.slice(4);
                  return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state);                        
                });
            }
            
            var rightStrNum = rightAval.user.limitStringNumber();
            if (rightStrNum !== BOT)
            {
              var isOnlyStrNum = (rightStrNum.equals(rightAval.user));
              if (!isOnlyStrNum)
              {
                eqResult = eqResult.join(eqFlag ? U_FALSE : U_TRUE);
              }
              return DefaultValue(leftAval.as, undefined, leftNode, stack.addFirst(eqRightCont(rightStrNum, eqResult)), benva, store, time, state);                      
            }
            else
            {
              eqResult = eqResult.join(eqFlag ? U_FALSE : U_TRUE);
            }
          }
          if (rightAval.as.length !== 0) 
          {
            var leftStrNum = leftAval.user.limitStringNumber();
            if (leftStrNum !== BOT)
            {
              var isOnlyStrNum = (leftStrNum.equals(leftAval.user));
              if (!isOnlyStrNum)
              {
                eqResult = eqResult.join(eqFlag ? U_FALSE : U_TRUE);
              }
              return DefaultValue(rightAval.as, undefined, rightNode, stack.addFirst(eqLeftRightCont(leftStrNum, eqResult)), benva, store, time, state);                      
            }
            else
            {
              eqResult = eqResult.join(eqFlag ? U_FALSE : U_TRUE);
            }
          }
          var cont = stack[2];
          var stack2 = stack.slice(3);
          return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state);                                      
        }

        
        return new Cont("binr-" + rightNode.tag, benva,
          function (stack, store, time, state)
          {
            var rightAval = stack[0];
            var leftAval = stack[1];
                        
            switch (node.operator)
            {
              case "+":
              {
                var rightAval = stack[0];
                var leftAval = stack[1];
                var result = BOT; // primitive value
                var lasl = leftAval.as.length;
                var rasl = rightAval.as.length;
                
                if (leftAval.user !== BOT && rightAval.user !== BOT)
                {
                  result = result.join(userLattice.add(leftAval.user, rightAval.user));
                }
                
                if (lasl === 0 && rasl === 0)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                  
                }
                
                if (lasl > 0)
                {
                  function addLeftCont(result)
                  {
                    return new Cont("addl-" + leftNode.tag, benva,
                      function (stack, store, time, state)
                      {
                        var lprim = stack[0].user;

                        if (rightAval.user !== BOT)
                        {
                          result = result.join(userLattice.add(lprim, rightAval.user));
                        }
                        if (rasl > 0)
                        {
                          function addLeftRightCont(result)
                          {
                            return new Cont("addlr-" + rightNode.tag, benva,
                              function (stack, store, time, state)
                              {
                                var rprim = stack[0].user;
                                if (leftAval.user !== BOT)
                                {
                                  result = result.join(userLattice.add(leftAval.user, rprim));
                                }
                                result = result.join(userLattice.add(lprim, rprim));
                                var cont = stack[4];
                                var stack2 = stack.slice(5);
                                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                                                  
                              });
                          }
                          return DefaultValue(rightAval.as, undefined, leftNode, stack.addFirst(addLeftRightCont(result)), benva, store, time, state);                          
                        }
                        var cont = stack[3];
                        var stack2 = stack.slice(4);
                        return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                                                                          
                      });
                  }
                  
                  return DefaultValue(leftAval.as, undefined, leftNode, stack.addFirst(addLeftCont(result)), benva, store, time, state);
                }
                
                if (rasl > 0)
                {
                  function addRightCont(result)
                  {
                    return new Cont("addr-" + rightNode.tag, benva,
                      function (stack, store, time, state)
                      {
                        var rprim = stack[0].user;
                        result = result.join(userLattice.add(leftAval.user, rprim)); // luser must be present when lasl == 0
                        var cont = stack[3];
                        var stack2 = stack.slice(4);
                        return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                                                  
                      });
                  }
                  return DefaultValue(rightAval.as, undefined, leftNode, stack.addFirst(addRightCont(result)), benva, store, time, state);                          
                }
                
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                
              }
              case "*":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return mul(stack, store, time, state);
                }
                throw new Error("TODO");
              }
              case "-":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return sub(stack, store, time, state);
                }
                throw new Error("TODO");
              }
              case "/":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return div(stack, store, time, state);
                }
                throw new Error("TODO");
              }
              case "===":
              {
                var rightAval = stack[0];
                var leftAval = stack[1];
                var result = BOT; // primitive value
                var lasl = leftAval.as.length;
                var rasl = rightAval.as.length;
                
                if (leftAval.user !== BOT && rightAval.user !== BOT)
                {
                  result = result.join(userLattice.eqq(leftAval.user, rightAval.user));
                }
                
                if (lasl === 0 && rasl === 0)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                  
                }
                
                if (lasl === 1 && rasl === 1)
                {
                  if (leftAval.as[0].equals(rightAval.as[0]))
                  {
                    result = result.join(U_TRUE);
                  }
                  else
                  {
                    result = result.join(U_FALSE);
                  }
                }
                else if (lasl > 0 && rasl > 0)
                {
                  result = result.join(U_FALSE);
                  if ((leftAval.as.intersect(rightAval.as)).length > 0)
                  {
                    result = result.join(U_TRUE);
                  }
                }
                
                if (leftAval.user === BOT && rightAval.user === BOT)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                  
                }
                
                result = result.join(U_FALSE);
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                
              }
              case "!==":
              {
                var rightAval = stack[0];
                var leftAval = stack[1];
                var result = BOT; // primitive value
                var lasl = leftAval.as.length;
                var rasl = rightAval.as.length;
                
                if (leftAval.user !== BOT && rightAval.user !== BOT)
                {
                  result = result.join(userLattice.neqq(leftAval.user, rightAval.user));
                }
                
                if (lasl === 0 && rasl === 0)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                  
                }
                
                if (lasl === 1 && rasl === 1)
                {
                  if (leftAval.as[0].equals(rightAval.as[0]))
                  {
                    result = result.join(U_FALSE);
                  }
                  else
                  {
                    result = result.join(U_TRUE);
                  }
                }
                else if (lasl > 0 && rasl > 0)
                {
                  result = result.join(U_TRUE);
                  if ((leftAval.as.intersect(rightAval.as)).length > 0)
                  {
                    result = result.join(U_FALSE);
                  }
                }
                
                if (leftAval.user === BOT && rightAval.user === BOT)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                  
                }
                
                result = result.join(U_TRUE);
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);                

              }
              case "==":
              {
                return eq(true, stack, store, time, state);
              }
              case "!=":
              {
                return eq(false, stack, store, time, state);
              }
              case "<":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return lt(stack, store, time, state);
                }
                throw new Error("TODO");
                // reduce with number!
              }
              case "<=":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return lte(stack, store, time, state);
                }
                throw new Error("TODO");
                // reduce with number!
              }
              case ">":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return gt(stack, store, time, state);
                }
                throw new Error("TODO");
                // reduce with number!
              }
              case ">=":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return gte(stack, store, time, state);
                }
                throw new Error("TODO");
                // reduce with number!
              }
              case "&":
              {
                var lu = toUserInt32(leftAval);
                var ru = toUserInt32(rightAval);
                var result = userLattice.binand(lu, ru);
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
              }
              case "|":
              {
                var lu = toUserInt32(leftAval);
                var ru = toUserInt32(rightAval);
                var result = userLattice.binor(lu, ru);
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
              }
              default: throw new Error("cannot handle binary operator " + node.operator);
            }            
          });
      }
      
      return new Cont("binl-" + leftNode.tag, benva,
        function (stack, store, time, state)
        {
          return evalNode(rightNode, stack.addFirst(rightCont()), benva, store, time, state);
        });
    }
    
    return evalNode(leftNode, stack.addFirst(leftCont()), benva, store, time, state);
  }
  
  function evalUnaryExpression(node, stack, benva, store, time, state)
  {
    var argumentNode = node.argument;
    
    function rightCont()
    {
      return new Cont("unr-" + argumentNode.tag, benva,
        function (stack, store, time, state)
        {
          var rightAval = stack[0];
          var cont = stack[1];
          var stack2 = stack.slice(2);
          var robjs = rightAval.as.map(function (a) {var lookupResult = lookupAval(a, stack, store, state); state = lookupResult.state; return lookupResult.value});
          var result;
          switch (node.operator)
          {
            case "-":
            {
              var robjvals = robjs.map(function (o) {return o.DefaultValue()}).reduce(Lattice.join, BOT);
              var rprim = rightAval.user.join(robjvals);
              result = userLattice.neg(rprim);
              break;
            }
            case "!":
            {
              var robjvals = robjs.map(function (o) {return o.DefaultValue()}).reduce(Lattice.join, BOT);
              var rprim = rightAval.user.join(robjvals);
              result = userLattice.not(rprim);
              break;
            }
            case "~":
            {
              var robjvals = robjs.map(function (o) {return o.DefaultValue()}).reduce(Lattice.join, BOT);
              var rprim = rightAval.user.join(robjvals);
              result = userLattice.binnot(rprim);
              break;
            }
            case "+":
            {
              var robjvals = robjs.map(function (o) {return o.DefaultValue()}).reduce(Lattice.join, BOT);
              var rprim = rightAval.user.join(robjvals);
              result = userLattice.pos(rprim);
              break;
            }
            default: throw new Error("cannot handle unary operator " + node.operator);
          }
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state);
        });
    }
    
    return evalNode(argumentNode, stack.addFirst(rightCont()), benva, store, time, state);
  }  
  
  function evalLogicalExpression(node, stack, benva, store, time, state)
  {
    // TODO delegate to lattice (as for binary exps) or simply implement logic here?
    // currently: implemented here
    var leftNode = node.left;
    var rightNode = node.right;
    var operator = node.operator;
  
    function leftCont()
    {
      
      function rightCont()
      {
        return new Cont("logr-" + rightNode.tag, benva,
          function (stack, store, time, state)
          {
            var right = stack[0];
            var cont = stack[1];
            var stack2 = stack.slice(2);
            return cont.execute(stack2.addFirst(right), store, time, state);
          });
      }
      
      return new Cont("logl-" + leftNode.tag, benva,
        function (stack, store, time, state)
        {
          var left = stack[0];
          switch (operator)
          {
            case "&&":
              if (userLattice.isFalse(toUserBoolean(left)))
              {
                var cont1 = stack[1];
                var stack2 = stack.slice(2);
                return cont1.execute(stack2.addFirst(left), store, time, state);
              }
              break;
            case "||":
              if (userLattice.isTrue(toUserBoolean(left)))
              {
                var cont2 = stack[1];
                var stack3 = stack.slice(2);
                return cont2.execute(stack3.addFirst(left), store, time, state);
              }
              break;
            default: throw new Error("cannot handle logical operator " + operator);
          }
          var stack4 = stack.slice(1);
          return evalNode(rightNode, stack4.addFirst(rightCont()), benva, store, time, state);
        });
    }
    
    return evalNode(leftNode, stack.addFirst(leftCont()), benva, store, time, state);
  }
  	
	function evalCallExpression(node, stack, benva, store, time, state)
	{
		var calleeNode = node.callee;
		var operands = node.arguments;
	
		function operandsCont(i)
		{
			return new Cont("rand-" + operands[i - 1].tag, benva,
				function (stack, store, time, state)
				{
					if (operands.length === i)
					{
						return applyProc(node, stack, benva, store, time, state);
					}
					return evalNode(operands[i], stack.addFirst(operandsCont(i + 1)), benva, store, time, state);
				});
		}
	
		function operatorCont()
		{	
			return new Cont("rator-" + calleeNode.tag, benva,
				function (stack, store, time, state)
				{
					if (operands.length === 0)
					{
						return applyProc(node, stack, benva, store, time, state);
					}
					return evalNode(operands[0], stack.addFirst(operandsCont(1)), benva, store, time, state);
				});
		}
		
		function methodOperatorCont()
		{
			return new Cont("meth-" + calleeNode.object.tag, benva,
				function (stack, store, time, state)
				{
					var objectAddresses = stack[0].addresses();
					assertTrue(Array.isArray(objectAddresses), "no addresses for " + stack[0]);
					var propertyName = calleeNode.property.name; // TODO: computed TODO 2 shouldn't this use evalMemberAddressProperty?
					var stack2 = stack.slice(1);
					return objectAddresses.flatMap( // 'map' if Tasks are created
						function (objectAddress)
						{
							var stack3 = stack2.addFirst(lattice.abst1(objectAddress)); // "this" (single address)
							//return new Task("apply method " + propertyName + " on " + objectAddress + " for " + node, //stack3,
							//	function () // TODO remove this task level? (see DefaultValue impl)
							//	{
									var lookupResult = lookupAval(objectAddress, stack, store, state);
		              var objectAval = lookupResult.value;
		              state = lookupResult.state;
//									print("objectAddress", objectAddress, "objectAval", objectAval);
									return doProtoLookup(objectAval, userLattice.abst1(propertyName), stack, store, state,
									  function (memberAval, state)
									  {
									    if (memberAval === null)
									    {
									      throw new Error("doProtoLookup: no addresses for " + propertyName + " on " + objectAval);
									    }
  	                  var stack4 = stack3.addFirst(memberAval);
  	                  if (operands.length === 0)
  	                  {
  	                    return applyProc(node, stack4, benva, store, time, state);
  	                  }
  	                  return evalNode(operands[0], stack4.addFirst(operandsCont(1)), benva, store, time, state);									  
									  });
								//});
						});
				});
		}
		
		if (isMemberExpression(calleeNode))
		{
			return evalNode(calleeNode.object, stack.addFirst(methodOperatorCont()), benva, store, time, state);
		}
		
		var stack2 = stack.addFirst(lattice.abst1(GLOBALA));  // global "this" (single address)
		return evalNode(calleeNode, stack2.addFirst(operatorCont()), benva, store, time, state);
	}
	
		
	function evalNewExpression(node, stack, benva, store, time, state)
	{
	  var calleeNode = node.callee;
	  
		function constructorCont()
		{
			var operands = node.arguments;

			function operandsCont(i)
			{
				return new Cont("rand-" + operands[i - 1].tag, benva,
					function (stack, store, time, state)
					{
						if (operands.length === i)
						{
							return applyConstructor(node, stack, benva, store, time, state);
						}
						return evalNode(operands[i], stack.addFirst(operandsCont(i + 1)), benva, store, time, state);
					});
			}

			return new Cont("cons-" + calleeNode.tag, benva,
				function (stack, store, time, state)
				{
					if (operands.length === 0)
					{
						return applyConstructor(node, stack, benva, store, time, state);
					}
					return evalNode(operands[0], stack.addFirst(operandsCont(1)), benva, store, time, state);
				});
		}
		
		return evalNode(calleeNode, stack.addFirst(constructorCont()), benva, store, time, state);
	}

	function evalThisExpression(node, stack, benva, store, time, state)
	{
		var cont = stack[0];
		var stack2 = stack.slice(1);
		//print("looking up 'this' in", benva);
    var scopeResult = doScopeLookup(U_THIS, stack, benva, store, state);
    var as = scopeResult.as;
    state = scopeResult.state;
		if (as.length !== 1)
		{
			throw new Error(as.length + " addresses (!== 1) for this: " + as);
		}
		return cont.execute(stack2.addFirst(lattice.abst1(as[0])), store, time, state); // TODO this doesn't feel right, right? probably should allow multiple thisses
	}

	function evalFunctionExpression(node, stack, benva, store, time, state)
	{
		var cont = stack[0];
		var stack2 = stack.slice(1);

		var closure = createClosure(node, benva);
		var closureAddress = ag.closure(node, time);

		var prototype = createObject(OBJECTPA);
		var prototypeObjectAddress = ag.closureProtoObject(node, time); /*node.body*/
		
		var constructorPropertyAddress = ag.objectProperty(prototypeObjectAddress, userLattice.abst1("constructor"));
		var allocResult = allocAval(constructorPropertyAddress, lattice.abst1(closureAddress), stack, store, state, "constructor");
    store = allocResult.store;
    state = allocResult.state;
    prototype = prototype.add(userLattice.abst1("constructor"), constructorPropertyAddress);
    
    allocResult = allocAval(prototypeObjectAddress, prototype, stack, store, state, "prototype object");
    store = allocResult.store;
    state = allocResult.state;

		var prototypePropertyAddress = ag.objectProperty(closureAddress, "prototype");
		closure = closure.add(U_PROTOTYPE, prototypePropertyAddress);
		allocResult = allocAval(prototypePropertyAddress, lattice.abst1(prototypeObjectAddress), stack, store, state, "prototype property");
    store = allocResult.store;
    state = allocResult.state;

		allocResult = allocAval(closureAddress, closure, stack, store, state, "closure for " + node);
    store = allocResult.store;
    state = allocResult.state;
    
		return cont.execute(stack2.addFirst(lattice.abst1(closureAddress)), store, time, state);
	}
	
	function evalAssignmentExpression(node, stack, benva, store, time, state)
	{	
		var left = node.left;
		var right = node.right;
		
		switch (left.type)
		{
			case "Identifier":
			{
				function varAssignmentCont()
				{
					return new Cont("=id-" + right.tag, benva,
						function (stack, store, time, state)
						{
							var rvalues = stack[0];
              var cont = stack[1];
              var stack2 = stack.slice(2);
							var scopeResult = doScopeLookup(userLattice.abst1(left.name), stack, benva, store, state);
							var as = scopeResult.as;
							state = scopeResult.state;
							if (as.length === 0)
					    {
					      throw new Error("no addresses for left-hand side " + left);
					    }
							as.forEach(
							    function (address)
							    {
			              var updateResult = updateAval(address, rvalues, stack, store, state);
			              store = updateResult.store;
			              state = updateResult.state;
							    });
							return cont.execute(stack2.addFirst(rvalues), store, time, state);
						});
				}
				
				return evalNode(right, stack.addFirst(varAssignmentCont()), benva, store, time, state);
			}
			case "MemberExpression":
			{
				function rightCont()
				{
					function memberAssignmentCont()
					{
						return new Cont("=mem-" + right.tag, benva,
							function (stack, store, time, state)
							{
								var rvalues = stack[0];
								var propertyName = stack[1];
								var spn = toUserString(propertyName, store);
			          var uspn = spn.ToUInt32();
			          var suspn = uspn.ToString();
			          var length;
			          if (suspn.equals(spn) 
			              && userLattice.isTrue(userLattice.lt(uspn, userLattice.abst1(Ecma.POW_2_32))))
			          {
			            length = userLattice.add(uspn, U_1);
			          }
								var objectAddresses = stack[2].addresses();
								var cont = stack[3];
								var stack2 = stack.slice(4);
								//print("rvalues", rvalues, "objectAddresses", objectAddresses, "propertyName", spn);
								if (!objectAddresses)
							  {
								  throw new Error("cannot determine object addresses for lhs in " + node);
							  }
								objectAddresses.forEach(
									function (objectAddress)
									{
                    var lookupResult = lookupAval(objectAddress, stack, store, state);
                    var object = lookupResult.value;
                    state = lookupResult.state;
                    assertDefinedNotNull(object.lookup, "not a benv at " + objectAddress + ": " + object + " " + object.constructor);
								    var propertyAddresses = object.lookup(spn).addresses;
								    if (propertyAddresses.length === 0)
								    {
								      var propertyAddress = ag.objectProperty(objectAddress, spn); 
	                    object = object.add(spn, propertyAddress);
	                    var allocResult = allocAval(propertyAddress, rvalues, stack, store, state);
	                    store = allocResult.store;
	                    state = allocResult.state;
	                    var updateResult = sideEffectAval(objectAddress, object, stack, store, state);
	                    store = updateResult.store;
	                    state = updateResult.state;
								    }
								    else
								    {
								      // TODO: join looked up values ('doLookupAs')? Or: Good principle(?) to never join when updating
								      // Also: when checking length (below), we do use 'doLookupAs'
								      propertyAddresses.forEach(
								        function (propertyAddress)
								        {
                          var updateResult = updateAval(propertyAddress, rvalues, stack, store, state);
                          store = updateResult.store;
                          state = updateResult.state;                       								          
								        });
								    }
								    if (length && object.isArray())
								    {
								      var lengthPropertyAs = object.lookup(U_LENGTH).addresses; // direct (local) lookup without protochain
								      var laResult = doLookupAddresses(lengthPropertyAs, stack, store, state);
								      state = laResult.state;
								      if (userLattice.isTrue(userLattice.lt(laResult.value.user, length)))
								      {
								        lengthPropertyAs.forEach(
								            function (lengthPropertyAddress)
								            {
								              var updateResult = updateAval(lengthPropertyAddress, new JipdaValue(length, []), stack, store, state);
								              store = updateResult.store;
								              state = updateResult.state;
								            }); 
								      }
								    }
									});
								return cont.execute(stack2.addFirst(rvalues), store, time, state);
							});
					}
								
					return new Cont("=right-" + left.tag, benva,
						function (stack, store, time, state)
						{						
							return evalNode(right, stack.addFirst(memberAssignmentCont()), benva, store, time, state);
						});
				}
					
				return evalMemberAddressProperty(left, stack.addFirst(rightCont()), benva, store, time, state);
			}
			default:
				throw new Error("evalAssignment: cannot handle left hand side " + left); 
		}
	}
	
	function evalArrayExpression(node, stack, benv, store, time, state)
	{
		var elements = node.elements;
		
		function arrayCont(i)
		{
			return new Cont("array-" + elements[i - 1].tag, benv,
				function (stack, store, time, state)
				{
					if (i === elements.length)
					{
						var exps = stack.slice(0, elements.length).reverse();
						var cont = stack[elements.length];
						var stack2 = stack.slice(elements.length + 1);
						var arr = createArray();
						var objectAddress = ag.array(node, time);
						exps.forEach(
							function (exp, ind)
							{
								var propertyName = userLattice.abst1(ind).ToString();
								var propertyAddress = ag.objectProperty(objectAddress, propertyName);
								arr = arr.add(propertyName, propertyAddress);
								var allocResult = allocAval(propertyAddress, exp, stack, store, state);
								store = allocResult.store;
								state = allocResult.state;
							});
			      var lengthPropertyAddress = ag.objectProperty(objectAddress, U_LENGTH);
			      arr = arr.add(U_LENGTH, lengthPropertyAddress);
			      var allocResult = allocAval(lengthPropertyAddress, lattice.abst1(exps.length), stack, store, state);
			      allocResult = allocAval(objectAddress, arr, stack, allocResult.store, allocResult.state);
			      store = allocResult.store;
			      state = allocResult.state;
						return cont.execute(stack2.addFirst(lattice.abst1(objectAddress)), store, time, state);
					}
					return evalNode(elements[i], stack.addFirst(arrayCont(i + 1)), benv, store, time, state);
				});
		}
		
		
		if (elements.length === 0)
		{
			var cont = stack[0];
			var stack2 = stack.slice(1);
			var arr = createArray();
			var objectAddress = ag.array(node, time);
			var lengthPropertyAddress = ag.objectProperty(objectAddress, U_LENGTH);
			arr = arr.add(U_LENGTH, lengthPropertyAddress);
			var allocResult = allocAval(lengthPropertyAddress, J_0, stack, store, state);
			allocResult = allocAval(objectAddress, arr, stack, allocResult.store, allocResult.state);
			store = allocResult.store;
			state = allocResult.state;
			return cont.execute(stack2.addFirst(lattice.abst1(objectAddress)), store, time, state);
		}
		return evalNode(elements[0], stack.addFirst(arrayCont(1)), benv, store, time, state);
	}
	
  function evalMemberAddressProperty(node, stack, benva, store, time, state) // TODO turn this into "internal continuation" i.e. without JIPDA stack (see Benv.lookup)
	{
    var object = node.object;

    function baseCont()
		{
			return new Cont("base-" + object.tag, benva,
				function (stack, store, time, state)
				{
					var objectAddresses = stack[0];
					var cont = stack[1];
					var stack2 = stack.slice(2);
					var property = node.property;
					if (node.computed)
					{
						return evalNode(property, stack2.addFirst(objectAddresses).addFirst(cont), benva, store, time, state);
					}
					// jipda value for property name to correspond with computed property's type
					return cont.execute(stack2.addFirst(objectAddresses).addFirst(lattice.abst1(property.name)), store, time, state);
				});
		}
		
		return evalNode(object, stack.addFirst(baseCont()), benva, store, time, state);
	}
	
	function evalMemberExpression(node, stack, benva, store, time, state)
	{
		function memberCont()
		{
			return new Cont("member-" + node.tag, benva,
				function (stack, store, time, state)
				{
					var propertyName = stack[0];
					var stringPropertyName = toUserString(propertyName, store);
					var objectAddresses = stack[1].addresses();
					var cont = stack[2];
					var stack2 = stack.slice(3);
					
					//
					var vals = objectAddresses.map(
					  function (objectAddress)
					  {
					    var lookupResult = lookupAval(objectAddress, stack, store, state);
					    var objectAval = lookupResult.value;
					    state = lookupResult.state;
					    return doProtoLookup(objectAval, stringPropertyName, stack, store, state,
                function (memberAval, state2)
                {
                  if (memberAval === null)
                  {
                    throw new Error("doProtoLookup: no addresses for " + propertyName + " on " + objectAval);
                  }
					        state = state2;
                  return memberAval;                      
                });
					  });
					var val = vals.reduce(Lattice.join, BOT);
					return cont.execute(stack2.addFirst(val), store, time, state);
					//
					
//					return objectAddresses.map(
//					  function (objectAddress)
//					  {
//              return new Task("eval member " + stringPropertyName + " on " + objectAddress, //stack, 
//                  function ()
//                  {
//                    var objectAval = store.lookupAval(objectAddress);
//                    var state2 = state.callExpressionReadsAddress(objectAddress, stack);
//                    print("objectAddress", objectAddress, "propertyName", stringPropertyName, "objectAval", objectAval);
//                    return doProtoLookup(objectAval, stringPropertyName, stack, store, state2,
//                      function (memberAval, state)
//                      {
//                        return cont.execute(stack2.addFirst(memberAval), store, time, state);                      
//                      });
//                  });             					        
//					  });
				});
		}
					
		return evalMemberAddressProperty(node, stack.addFirst(memberCont()), benva, store, time, state);
	}
	
	function evalObjectExpression(node, stack, benv, store, time, state)
	{
		var properties = node.properties;
		
		function objectCont(i)
		{
			return new Cont("obj-" + properties[i - 1].value.tag, benv,
				function (stack, store, time, state)
				{
					if (i === properties.length)
					{
						var rexps = stack.slice(0, properties.length);
						var cont = stack[properties.length];
						var stack2 = stack.slice(properties.length + 1);
						var obj = createObject(OBJECTPA);
						var objectAddress = ag.object(node, time);
						for (var k = properties.length - 1; k > -1; k--)
						{
							var propertyName = userLattice.abst1(properties[properties.length - k - 1].key.name);
							var propertyAddress = ag.objectProperty(objectAddress, propertyName);
							obj = obj.add(propertyName, propertyAddress);
							var allocResult = allocAval(propertyAddress, rexps[k], stack, store, state);
							store = allocResult.store;
							state = allocResult.state;
						}
						var allocResult = allocAval(objectAddress, obj, stack, store, state);
						store = allocResult.store;
						state = allocResult.state;
						return cont.execute(stack2.addFirst(lattice.abst1(objectAddress)), store, time, state);
					}
					return evalNode(properties[i].value, stack.addFirst(objectCont(i + 1)), benv, store, time, state);
				});
		}
		
		if (properties.length === 0)
		{ 
			var cont = stack[0];
			var stack2 = stack.slice(1);
			var obj = createObject(OBJECTPA);
			var objectAddress = ag.object(node, time);
			var allocResult = allocAval(objectAddress, obj, stack, store, state);
			store = allocResult.store;
			state = allocResult.state;
			return cont.execute(stack2.addFirst(lattice.abst1(objectAddress)), store, time, state);
		  //return objectCont(0).execute(stack, time);
		}
		return evalNode(properties[0].value, stack.addFirst(objectCont(1)), benv, store, time, state);
	}
	
  function evalFunctionDeclaration(node, stack, benva, store, time, state)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);    
    return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);
  }
  
  function evalHoistedFunctionDeclaration(node, stack, benva, benv, store, time, state)
  {
    var vr = node.id;
    
    var closure = createClosure(node, benva);
    var closureAddress = ag.closure(node, time);

    var prototype = createObject(OBJECTPA);
    var prototypeObjectAddress = ag.closureProtoObject(node, time); /*node.body*/
    
    var constructorPropertyAddress = ag.objectProperty(prototypeObjectAddress, userLattice.abst1("constructor"));
    var allocResult = allocAval(constructorPropertyAddress, lattice.abst1(closureAddress), stack, store, state, "constructor");
    store = allocResult.store;
    state = allocResult.state;
    prototype = prototype.add(userLattice.abst1("constructor"), constructorPropertyAddress);

    allocResult = allocAval(prototypeObjectAddress, prototype, stack, store, state, "prototype object");
    store = allocResult.store;
    state = allocResult.state;

    var prototypePropertyAddress = ag.objectProperty(closureAddress, "prototype");
    closure = closure.add(U_PROTOTYPE, prototypePropertyAddress);
    allocResult = allocAval(prototypePropertyAddress, lattice.abst1(prototypeObjectAddress), stack, store, state, "prototype property");
    allocResult = allocAval(closureAddress, closure, stack, allocResult.store, allocResult.state, "closure for " + node);
    store = allocResult.store;
    state = allocResult.state;
    
    var vr = node.id;
    var declarationAddress = ag.variable(vr,time);
    benv = benv.add(userLattice.abst1(vr.name), declarationAddress);
    allocResult = allocAval(declarationAddress, lattice.abst1(closureAddress), stack, store, state, "variable " + vr);
    store = allocResult.store;
    state = allocResult.state;

    return {benv:benv, store: store, state: state};
  }
  
  function evalVariableDeclarator(node, stack, benva, store, time, state, mode)
  { 
    var vr = node.id;

    function variableDeclaratorCont()
    {
      return new Cont("decl-" + node.init.tag, benva,
        function (stack, store, time, state)
        {
          var value = stack[0];
          var cont = stack[1];
          var stack2 = stack.slice(2);
          var scopeResult = doScopeLookup(userLattice.abst1(vr.name), stack, benva, store, state);
          var as = scopeResult.as;
          state = scopeResult.state;
          if (as.length === 0)
          {
            throw new Error("no addresses for " + node);
          }
          as.forEach(
            function (address)
            {
              var updateResult = updateAval(address, value, stack, store, state);
              store = updateResult.store;
              state = updateResult.state;              
            });
          return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);
        });
    }
    
    if (node.init === null)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);      
    }
    return evalNode(node.init, stack.addFirst(variableDeclaratorCont()), benva, store, time, state);
  } 
  
  function evalHoistedVariableDeclarator(node, stack, benv, store, time, state)
  { 
    var vr = node.id;    
    var address = ag.variable(vr, time);
    benv = benv.add(userLattice.abst1(vr.name), address);
    var allocResult = allocAval(address, J_UNDEFINED, stack, store, state);
    store = allocResult.store;
    state = allocResult.state;
    return {benv: benv, store: store, state: state};      
  } 
		
//  function evalStatementList(nodes, stack, benva, store, time, state, mode)
//  {
//    var value;
//    
//    function statementListCont(i)
//    {
//      return new Cont("slist-" + nodes[i - 1].tag, benva,
//        function (stack, store, time, state)
//        {
//          var statementValue = stack[0];
//          
//          // keep track of last value-producing statement (ECMA 12.1 Block, 14 Program)
//          if (!statementValue.equals(J_UNDEFINED) || !value)
//          {
//            value = statementValue; // TODO put this on the stack so doesn't get GCed?
//            // Also: equality between configs impacted
//          }
//          
//          if (i === nodes.length)
//          {
//            var cont = stack[1];
//            var stack2 = stack.slice(2);
//            return cont.execute(stack2.addFirst(value), store, time, state);
//          }
//          var stack2 = stack.slice(1);
//          return evalNode(nodes[i], stack2.addFirst(statementListCont(i + 1)), benva, store, time, state, mode);
//        });
//    }
//    
//    if (nodes.length === 0)
//    {
//      var cont = stack[0];
//      var stack2 = stack.slice(1);
//      return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);
//    }
//    if (nodes.length === 1)
//    {
//      return evalNode(nodes[0], stack, benva, store, time, state, mode);
//    }
//    return evalNode(nodes[0], stack.addFirst(statementListCont(1)), benva, store, time, state, mode);
//  }

  // with last value on stack
  function evalStatementList(nodes, stack, benva, store, time, state, mode)
  {
    function statementListCont(i)
    {
      return new Cont("slist-" + nodes[i - 1].tag, benva,
        function (stack, store, time, state)
        {
          var statementValue = stack[0];
          var value = stack[1];
          
          // keep track of last value-producing statement (ECMA 12.1 Block, 14 Program)
          if (!statementValue.equals(J_UNDEFINED))
          {
            value = statementValue;
          }
          
          if (i === nodes.length)
          {
            var cont = stack[2];
            var stack2 = stack.slice(3);
            return cont.execute(stack2.addFirst(value), store, time, state);
          }
          var stack2 = stack.slice(2);
          return evalNode(nodes[i], stack2.addFirst(value).addFirst(statementListCont(i + 1)), benva, store, time, state, mode);
        });
    }
    
    if (nodes.length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);
    }
    if (nodes.length === 1)
    {
      return evalNode(nodes[0], stack, benva, store, time, state, mode);
    }
    return evalNode(nodes[0], stack.addFirst(J_UNDEFINED).addFirst(statementListCont(1)), benva, store, time, state, mode);
  }

  function evalStatementListTC(nodes, stack, benva, store, time, state, mode)
  {
    var value;
    
    function statementListCont(i)
    {
      return new Cont("slist-" + nodes[i - 1].tag, benva,
        function (stack, store, time, state)
        {
          var statementValue = stack[0];
          
          // keep track of last value-producing statement (ECMA 12.1 Block, 14 Program)
          if (!statementValue.equals(J_UNDEFINED) || !value)
          {
            value = statementValue; // TODO put this on the stack so doesn't get GCed?
          }
          
          if (i === nodes.length)
          {
            var cont = stack[1];
            var stack2 = stack.slice(2);
            return cont.execute(stack2.addFirst(value), store, time, state);
          }
          var stack2 = stack.slice(1);
          return evalNode(nodes[i], stack2.addFirst(statementListCont(i + 1)), benva, store, time, state, mode);
        });
    }
    
    if (nodes.length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);
    }
    if (nodes.length === 1)
    {
      return evalNode(nodes[0], stack, benva, store, time, state, mode);
    }
    return evalNode(nodes[0], stack.addFirst(statementListCont(1)), benva, store, time, state, mode);
  }
    
  function evalReturnStatement(node, stack, benva, store, time, state)
  {
    
    function doReturn(value, stack, store, time, state)
    {
      for (var i = 0; i < stack.length; i++)
      {
        var stackValue = stack[i];
        if (stackValue instanceof Cont)
        {
          if (stackValue.applications.length > 0)
          {
            var stack2 = stack.slice(i + 1);
            state = state.returns(value, stackValue.applications[0]);
            return stackValue.execute(stack2.addFirst(value), store, time, state);
          }
        }
      }
      throw new Error("return not in function: " + node);      
    }
    
    function returnCont()
    {
      return new Cont("ret-"+node.tag, benva,
        function (stack, store, time, state)
        {
          var value = stack[0];
          var stack2 = stack.slice(1);
          return doReturn(value, stack2, store, time, state);
        });
    }
    
    if (node.argument === null)
    {
      return doReturn(J_UNDEFINED, stack, store, time, state);
    }

    return evalNode(node.argument, stack.addFirst(returnCont()), benva, store, time, state);
  }
  
  function evalBreakStatement(node, stack, benva, store, time, state)
  {
    var breakValue = J_UNDEFINED;
    
    // TODO examine whether it is always the case that break value is at stack[1];
    for (var j = 0; j < stack.length; j++)
    {
      var value = stack[j];
      if (value instanceof JipdaValue)
      {
        breakValue = value;
        break;
      }
    }
//    print("breakValue", breakValue, stack);
    
    if (node.label === null)
    {
      for (var i = 0; i < stack.length; i++)
      {
        var value = stack[i];
        if (value instanceof Cont)
        {
          if (value.handler)
          {
            var handler = value.handler;
            if (isSwitchStatement(handler)) // TODO: labelless breaks in loops
            {
              var stack2 = stack.slice(i);
              return value.execute(stack2.addFirst(breakValue), store, time, state);                              
            }
          }
        }
      }
      throw new Error("no handler for " + node);      
    }
    
    for (var i = 0; i < stack.length; i++)
    {
      var value = stack[i];
      if (value instanceof Cont)
      {
        if (value.handler)
        {
          var handler = value.handler;
          if (isLabeledStatement(handler) && handler.label.name === node.label.name)
          {
            var stack2 = stack.slice(i);
            return value.execute(stack2.addFirst(breakValue), store, time, state);                              
          }
        }
      }
    }    
    throw new Error("no handler for " + node);      
  }
  
  function evalLabeledStatement(node, stack, benva, store, time, state)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    var handlerCont = cont.setHandler(node);
    return evalNode(node.body, stack2.addFirst(handlerCont), benva, store, time, state);
  }
  
  function evalThrowStatement(node, stack, benva, store, time, state)
  {
    
    function argumentCont()
    {
      return new Cont("throw-" + node.argument.tag, benva,
        function (stack, store, time, state)
        {
          var throwValue = stack[0];
          for (var i = 1; i < stack.length; i++)
          {
            var value = stack[i];
            if (value instanceof Cont)
            {
              if (value.handler)
              {
                var handler = value.handler;
                if (isCatchClause(handler))
                {
                  var stack2 = stack.slice(i);
                  //print("handler", handler, "in cont", value, "for throw value", throwValue);
                  var createResult = createEnvironment(benva, node, handler, state);
                  var extendedBenv = createResult.benv;
                  state = createResult.state;
                  var param = handler.param;
                  var address = ag.variable(param, time);
                  extendedBenv = extendedBenv.add(userLattice.abst1(param.name), address);
                  var allocResult = allocAval(address, throwValue, stack, store, state);
                  var extendedBenva = ag.benv(handler, time);
                  allocResult = allocAval(extendedBenva, extendedBenv, stack, allocResult.store, allocResult.state, "extended static env for handler with root " + benva);
                  store = allocResult.store;
                  state = allocResult.state;
                  // ECMA 12.14:  [...] Return the result of evaluating Catch with parameter B.value.
                  // which means we cannot eval catch block as block (which discards last val) ??? REVIEW AFTER evalStatList
                  // therefore: eval as sequence
                  var block = handler.body;
                  return evalStatementList(block.body, stack2, extendedBenva, store, time, state);                              
                }
              }
            }
          }
          throw new Error("no handler for " + node);
        });
    }
    
    return evalNode(node.argument, stack.addFirst(argumentCont()), benva, store, time, state);
  }
  
  function evalTryStatement(node, stack, benva, store, time, state)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    var handlerCont = cont.setHandler(node.handlers[0]);
    return evalNode(node.block, stack2.addFirst(handlerCont), benva, store, time, state);
  }
  
  function evalIfStatement(node, stack, benva, store, time, state)
  {
    var testNode = node.test;
    
    function ifCont()
    {
      return new Cont("if-" + testNode.tag, benva,
        function (stack, store, time, state)
        {
          var value = stack[0];
          var booleanValue = toUserBoolean(value);
          var stack2 = stack.slice(1);
          var consequent = node.consequent;
          var alternate = node.alternate;
          if (userLattice.isFalse(booleanValue))
          {
            if (alternate === null)
            {
              var cont = stack2[0];
              var stack3 = stack2.slice(1);
              return cont.execute(stack3.addFirst(J_UNDEFINED), store, time, state);
            }
            return evalNode(alternate, stack2, benva, store, time, state);
          }
          if (userLattice.isTrue(booleanValue))
          {
            return evalNode(consequent, stack2, benva, store, time, state);     
          }
          var tasks = [
            new Task("eval consequent of " + testNode.tag, //stack2, 
              function ()
              {
                var time2 = time.tick(consequent.tag, k);
                return evalNode(consequent, stack2, benva, store, time2, state);
              })];
          if (alternate === null)
          {
            tasks = tasks.addLast(
                new Task("eval empty alternate of " + testNode.tag,
                  function ()
                  {
                    var cont = stack2[0];
                    var stack3 = stack2.slice(1);
                    return cont.execute(stack3.addFirst(J_UNDEFINED), store, time, state);                  
                  }));
          }
          else
          {
            tasks = tasks.addLast(
                new Task("eval non-empty alternate of " + testNode.tag, //stack2, 
                  function ()
                  {
                    var time2 = time.tick(alternate.tag, k);
                    return evalNode(alternate, stack2, benva, store, time2, state);
                  }));
          }
          return tasks;
        });
    }
  
    return evalNode(testNode, stack.addFirst(ifCont()), benva, store, time, state);
  }
  
  function evalConditionalExpression(node, stack, benva, store, time, state)
  {
    var testNode = node.test;
    
    function condCont()
    {
      return new Cont("cond-" + testNode.tag, benva,
        function (stack, store, time, state)
        {
          var value = stack[0];
          var booleanValue = toUserBoolean(value);
          var stack2 = stack.slice(1);
          var consequent = node.consequent;
          var alternate = node.alternate;
          if (userLattice.isFalse(booleanValue))
          {
            return evalNode(alternate, stack2, benva, store, time, state);
          }
          if (userLattice.isTrue(booleanValue))
          {
            return evalNode(consequent, stack2, benva, store, time, state);     
          }
          var tasks = [
            new Task("eval consequent of " + testNode.tag, //stack2, 
              function ()
              {
                var time2 = time.tick(consequent.tag, k);
                return evalNode(consequent, stack2, benva, store, time2, state);
              })];
          tasks = tasks.addLast(
              new Task("eval alternate of " + testNode.tag, //stack2, 
                function ()
                {
                  var time2 = time.tick(alternate.tag, k);
                  return evalNode(alternate, stack2, benva, store, time2, state);
                }));
          return tasks;
        });
    }
  
    return evalNode(testNode, stack.addFirst(condCont()), benva, store, time, state);
  }
  
	
  function evalSwitchStatement(node, stack, benva, store, time, state)
  {
    var discriminantNode = node.discriminant;
    
    function switchCont()
    {
      return new Cont("switch-"+node.tag, benva,
        function (stack, store, time, state)
        {
          var discr = stack[0].user;
          
          function execCase(i, stack, store, time, state)
          {
            
            function execCaseCont()
            {
              return new Cont("checkcase-"+node.cases[i].tag, benva,
                  function (stack, store, time, state)
                  {
                    return execCase(i + 1, stack, store, time, state);
                  });
            }
            
            var statements = [];
            for (var j = i; j < node.cases.length; j++)
            {
              statements = statements.concat(node.cases[j].consequent);
            }
            
            var stack2 = stack.slice(1);
            return evalStatementList(statements, stack2, benva, store, time, state);
          }
          
          function scanCase(i, defaultI, stack, store, time, state)
          {
            function checkCaseCont()
            {
              return new Cont("checkcase-"+node.cases[i].tag, benva,
                function (stack, store, time, state)
                {
                  var selector = stack[0].user;
                  var stack2 = stack.slice(1);
                  if (userLattice.isTrue(userLattice.eqq(discr, selector)))
                  {
                    return execCase(i, stack2, store, time, state);
                  }
                  if (userLattice.isFalse(userLattice.eqq(discr, selector)))
                  {
                    return scanCase(i + 1, defaultI, stack2, store, time, state);
                  }
                  return [new Task("execute case " + i), function () {return execCase(i, stack2, store, time, state)},
                          new Task("scan case " + i), function() {return scanCase(i + 1, stack2, store, time, state)}];
                });
            }
            
            if (i === node.cases.length)
            {
              if (defaultI === null)
              {
                // var discr = stack[0];
                var cont = stack[1];
                var stack2 = stack.slice(2);
                return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);                              
              }
              
              var statements = [];
              for (var j = defaultI; j < node.cases.length; j++)
              {
                statements = statements.concat(node.cases[j].consequent);
              }
              
              var stack2 = stack.slice(1);
              return evalStatementList(statements, stack2, benva, store, time, state);
            }
            
            var nodeTest = node.cases[i].test;
            if (nodeTest === null)
            {
              if (i + 1 === node.cases.length)
              {
                return execCase(i, stack, store, time, state);                
              }
              return scanCase(i + 1, i, stack, store, time, state);
            }
            return evalNode(nodeTest, stack.addFirst(checkCaseCont()), benva, store, time, state);
          }
          
          if (node.cases)
          {
            // push default result value (discr is also on the stack: should not be GCed because this can be object)
            return scanCase(0, null, stack, store, time, state);
          }
          
          var cont = stack[1];
          var stack2 = stack.slice(2);
          return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);
        });
    }
       
    var cont = stack[0];
    var stack2 = stack.slice(1);
    var handlerCont = cont.setHandler(node);
    return evalNode(discriminantNode, stack2.addFirst(handlerCont).addFirst(switchCont()), benva, store, time, state);
  }
	
	
	function evalEmptyStatement(node, stack, benv, store, time, state)
	{
		var cont = stack[0];
		var stack2 = stack.slice(1);
		return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);
	}
	
	function evalUpdateExpression(node, stack, benva, store, time, state)
	{
		var argument = node.argument;
		if (isIdentifier(argument))
		{
			var cont = stack[0];
			var stack2 = stack.slice(1);
			var scopeResult = doScopeLookup(userLattice.abst1(argument.name), stack, benva, store, state);
			var as = scopeResult.as;
			state = scopeResult.state;
			if (as.length === 0)
		  {
			  throw new Error("no addresses for " + argument);
		  }
			// TODO here we chose not to perform lookupAddress, joining all lookup results
			// into a lub,increment the lub, and store it for each addresss
			// REVIEW THIS? Make it uniform with the rest of the code?
			var result = BOT;
			as.forEach(
			  function (address)
			  {
			    var lookupResult = lookupAval(address, stack, store, state);
			    var aval = lookupResult.value;
			    state = lookupResult.state;
			    var uold = aval.user.ToNumber();
			    var jold = new JipdaValue(uold, []);
			    var jnew = new JipdaValue((node.operator === "++" ? userLattice.add(uold, U_1) : userLattice.sub(uold, U_1)), []);
          var updateResult = updateAval(address, jnew, stack, store, state);
          store = updateResult.store;
          state = updateResult.state;
          result = result.join(node.prefix ? jnew : jold);
			  });
 	    return cont.execute(stack2.addFirst(result), store, time, state);			  
		}
		else if (isMemberExpression(argument))
		{
			function updateMemberCont()
			{
				return new Cont("updMem-" + argument.tag, benva,
					function (stack, store, time, state)
					{
						var propertyName = toUserString(stack[0], store);
						var objectAddresses = stack[1].addresses();
						var cont = stack[2];
						var stack2 = stack.slice(3);
						var result = BOT;
						
						// looking up uses proto chain, setting is local
						objectAddresses.forEach(
						  function (objectAddress) 
						  {
						    var lookupResult = lookupAval(objectAddress, stack, store, state);
						    var object = lookupResult.value;
						    state = lookupResult.state;
		            return doProtoLookup(object, propertyName, stack, store, state,
		              function (aval, state) 
		              {
                    if (aval === null)
                    {
                      throw new Error("doProtoLookup: no addresses for " + propertyName + " on " + object);
                    }
		                var uold = toUserNumber(aval, store);
		                var jold = new JipdaValue(uold, []);
		                var jnew = new JipdaValue((node.operator === "++" ? userLattice.add(uold, U_1) : userLattice.sub(uold, U_1)), []);
                    var pas = object.lookup(propertyName).addresses;
                    if (pas.length === 0)
                    {
                      object = object.add(propertyName, propertyAddress);
                      var allocResult = allocAval(propertyAddress, jnew, stack, store, state);
                      store = allocResult.store;
                      state = allocResult.state;
                      var updateResult = sideEffectAval(objectAddress, object, stack, store, state);
                      store = updateResult.store;
                      state = updateResult.state;
                    }
                    else
                    {
                      pas.forEach(
                        function (propertyAddress) 
                        {
                          var updateResult = updateAval(propertyAddress, jnew, stack, store, state);
                          store = updateResult.store;
                          state = updateResult.state;
                        });
                    }
                    result = result.join(node.prefix ? jnew : jold);
		              });
						  });
						return cont.execute(stack2.addFirst(result), store, time, state);
					});
			}
		
			return evalMemberAddressProperty(argument, stack.addFirst(updateMemberCont()), benva, store, time, state);
		}
		else
		{
			throw new Error("evalUpdateExpression: cannot handle " + argument);
		}
	}
	
  function evalForStatement(node, stack, benva, store, time, state)
  {
    var init = node.init;
    var test = node.test;
    var update = node.update;
    var body = node.body;

    function initCont()
    {
      function testCont()
      { 
        function bodyCont()
        {
          function updateCont()
          {
            return new Cont("foru-" + update.tag, benva,
              function (stack, store, time, state)
              {
                // discard updateAval = stack[0]
                var stack2 = stack.slice(1);
                return evalNode(test, stack2.addFirst(testCont()), benva, store, time, state);
              });
          }
          
          return new Cont("forb-" + body.tag, benva,
            function (stack, store, time, state)
            {
              return evalNode(update, stack.addFirst(updateCont()), benva, store, time, state);
            });
        }
      
        return new Cont("fort-" + test.tag, benva,
          function (stack, store, time, state)
          {
            var testAval = stack[0];
            if (userLattice.isFalse(toUserBoolean(testAval)))
            {
              var bodyAval = stack[1];
              var cont = stack[2];
              var stack2 = stack.slice(3);
              return cont.execute(stack2.addFirst(bodyAval), store, time, state);
            }
            var time2 = time.tick(node.tag, k);
            if (userLattice.isTrue(toUserBoolean(testAval)))
            {
              // discard bodyAval = stack[1]
              
              var store2 = visited.visited(body, stack, benva, store, time); 
              if (store2 === null)
              {
                return [];
              }
//                var store2 = store;
              
              var stack2 = stack.slice(2);
              return evalNode(body, stack2.addFirst(bodyCont()), benva, store2, time2, state);
            }
            var tasks = [
              new Task("exit for-loop " + node.tag, //stack, 
                function ()
                {
                  var bodyAval = stack[1];
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(bodyAval), store, time2, state);
                }),
              new Task("eval body of for-loop " + node.tag, //stack, 
                function ()
                {
                  // discard bodyAval = stack[1]

                  var store2 = visited.visited(body, stack, benva, store, time2); 
                  if (store2 === null)
                  {
                    return [];
                  }                                   
//                  var store2 = store;
                  
                  var stack2 = stack.slice(2);
                  return evalNode(body, stack2.addFirst(bodyCont()), benva, store2, time2, state);
                })];
            return tasks;
          });
      }
    
      return new Cont("fori-" + init.tag, benva,
        function (stack, store, time, state)
        {
          // discard stack[0]: init value
          var stack2 = stack.slice(1);
          // push 'undefined' as the 'result' of unexecuted node.body
          return evalNode(test, stack2.addFirst(J_UNDEFINED).addFirst(testCont()), benva, store, time, state);
        });
    }
    
    return evalNode(init, stack.addFirst(initCont()), benva, store, time, state);
  }

  function evalWhileStatement(node, stack, benva, store, time, state)
  {
    var test = node.test;
    var body = node.body;

    function testCont()
    { 
      function bodyCont()
      {
        return new Cont("whileb-" + body.tag, benva,
          function (stack, store, time, state)
          {
            return evalNode(test, stack.addFirst(testCont()), benva, store, time, state);
          });
      }
    
      return new Cont("whilet-" + test.tag, benva,
        function (stack, store, time, state)
        {
          var testAval = stack[0];
          if (userLattice.isFalse(toUserBoolean(testAval)))
          {
            var bodyAval = stack[1];
            var cont = stack[2];
            var stack2 = stack.slice(3);
            return cont.execute(stack2.addFirst(bodyAval), store, time, state);
          }
          var time2 = time.tick(node.tag, k);
          if (userLattice.isTrue(toUserBoolean(testAval)))
          {
            // discard bodyAval = stack[1]
            
            var store2 = visited.visited(body, stack, benva, store, time); 
            if (store2 === null)
            {
              return [];
            }
//                var store2 = store;
            
            var stack2 = stack.slice(2);
            return evalNode(body, stack2.addFirst(bodyCont()), benva, store2, time2, state);
          }
          var tasks = [
            new Task("exit while-loop " + node.tag, //stack, 
              function ()
              {
                var bodyAval = stack[1];
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(bodyAval), store, time2, state);
              }),
            new Task("eval body of while-loop " + node.tag, //stack, 
              function ()
              {
                // discard bodyAval = stack[1]

                var store2 = visited.visited(body, stack, benva, store, time2); 
                if (store2 === null)
                {
                  return [];
                }                                   
//                  var store2 = store;
                
                var stack2 = stack.slice(2);
                return evalNode(body, stack2.addFirst(bodyCont()), benva, store2, time2, state);
              })];
          return tasks;
        });
    }

    // push 'undefined' as the 'result' of unexecuted node.body
    return evalNode(test, stack.addFirst(J_UNDEFINED).addFirst(testCont()), benva, store, time, state);
  }
  
  function evalProgram(node, stack, benva, store, time, state)
  {
    var bodyNodes = node.body;
    var hoisted = hoist(bodyNodes);
    if (hoisted.funs.length > 0 || hoisted.vars.length > 0)
    {
      var benv = store.lookupAval(benva);      
      hoisted.funs.forEach(
        function (funDecl)
        {
          var result = evalHoistedFunctionDeclaration(funDecl, stack, benva, benv, store, time, state);
          benv = result.benv;
          store = result.store;
          state = result.state;
          
        });
      hoisted.vars.forEach(
          function (varDecl)
          {
            var result = evalHoistedVariableDeclarator(varDecl, stack, benv, store, time, state);
            benv = result.benv;
            store = result.store;
            state = result.state;
          });
      var updateResult = sideEffectAval(benva, benv, stack, store, state);
      store = updateResult.store;
      state = updateResult.state;
    }
    
    return evalStatementList(bodyNodes, stack, benva, store, time, state);
  }

	function evalNode(node, stack, benva, store, time, state)
	{
//		print("===== evalNode", "#" + node.tag, node, "\n", stack, benva);
    assertTrue(benva instanceof Addr);
    assertTrue(store instanceof Store);
    assertTrue(state instanceof State, "not a State: " + state + " " + state.constructor);
     
//		if (performGc)
//		{
//			store = gc(store, stack, benva);
//		}
		
//    store = visited.visited(node, stack, benva, store, time);
//    if (store === null)
//    {
//      return [];
//    }		
		
//		print(store.nice());
//		dreadline();
		switch (node.type)
		{
			case "Literal": 
				return evalLiteral(node, stack, benva, store, time, state);
			case "Identifier":
				return evalIdentifier(node, stack, benva, store, time, state);
      case "BinaryExpression":
        return evalBinaryExpression(node, stack, benva, store, time, state);
      case "LogicalExpression":
        return evalLogicalExpression(node, stack, benva, store, time, state);
			case "CallExpression":
				return evalCallExpression(node, stack, benva, store, time, state);
			case "FunctionExpression":
				return evalFunctionExpression(node, stack, benva, store, time, state);
			case "AssignmentExpression":
				return evalAssignmentExpression(node, stack, benva, store, time, state);
			case "ArrayExpression":
				return evalArrayExpression(node, stack, benva, store, time, state);
			case "MemberExpression":
				return evalMemberExpression(node, stack, benva, store, time, state);
			case "ObjectExpression":
				return evalObjectExpression(node, stack, benva, store, time, state);
			case "ThisExpression":
				return evalThisExpression(node, stack, benva, store, time, state);
			case "NewExpression":
				return evalNewExpression(node, stack, benva, store, time, state);
      case "UpdateExpression":
        return evalUpdateExpression(node, stack, benva, store, time, state);
      case "UnaryExpression":
        return evalUnaryExpression(node, stack, benva, store, time, state);
			case "ExpressionStatement":
        return evalNode(node.expression, stack, benva, store, time, state);
      case "ReturnStatement": 
        return evalReturnStatement(node, stack, benva, store, time, state);
      case "BreakStatement": 
        return evalBreakStatement(node, stack, benva, store, time, state);
      case "LabeledStatement": 
        return evalLabeledStatement(node, stack, benva, store, time, state);
      case "IfStatement": 
        return evalIfStatement(node, stack, benva, store, time, state);
      case "ConditionalExpression": 
        return evalConditionalExpression(node, stack, benva, store, time, state);
      case "SwitchStatement": 
        return evalSwitchStatement(node, stack, benva, store, time, state);
      case "ForStatement": 
        return evalForStatement(node, stack, benva, store, time, state);
      case "WhileStatement": 
        return evalWhileStatement(node, stack, benva, store, time, state);
			case "FunctionDeclaration": 
				return evalFunctionDeclaration(node, stack, benva, store, time, state);
			case "VariableDeclaration": 
				return evalStatementList(node.declarations, stack, benva, store, time, state, node.kind);
			case "VariableDeclarator": 
				return evalVariableDeclarator(node, stack, benva, store, time, state);
			case "BlockStatement":
				return evalStatementList(node.body, stack, benva, store, time, state);
			case "EmptyStatement":
				return evalEmptyStatement(node, stack, benva, store, time, state);
      case "TryStatement": 
        return evalTryStatement(node, stack, benva, store, time, state);
      case "ThrowStatement": 
        return evalThrowStatement(node, stack, benva, store, time, state);
      case "Program":
        return evalProgram(node, stack, benva, store, time, state);
			default:
				throw "ipdaEval: cannot handle node " + node.type; 
		}
	}
	
  function applyProc(application, stack, benva, store, time, state)
  {
    //print("applyProc", application, "\n", stack, benva, time);
    if (stack.length > 64)
    {
      throw new Error("stack overflow");
    }
    var applicationLength = application.arguments.length + 2; // operands + operator + this 
    var applicationValues = stack.slice(0, applicationLength).reverse();
    var ths = applicationValues[0];
    var operatorValues = applicationValues[1].addresses();
    var operandsValues = applicationValues.slice(2);
//    print("ths", ths, "operator", operatorValues, "operands", operandsValues);
    var stack2 = stack.slice(applicationLength);
    var cont = stack2[0];
    var stack3 = stack2.slice(1);
    var time2 = time.tick(application.tag, k);

    var store2 = visited.visited(application, stack, benva, store, time);
    if (store2 === null)
    {
      return [];
    }
    
    operatorValues = operatorValues.map(
        function (operatorValue)
        {
          assertTrue(operatorValue instanceof Addr);
          var lookupResult = lookupAval(operatorValue, stack, store2, state);
          var benv = lookupResult.value;
          state = lookupResult.state;
          return benv;
        }); 
    return operatorValues.flatMap(
      function (operator)
      {
        var callConc = operator.Call;
        assertTrue(callConc.length > 0);
        assertTrue(ths.as.length > 0, "'this'");
        return callConc.map(
          function (Call) 
          {
            return new Task("#" + application.tag + " " + application + " stack length " + stack.length + " store size " + store.entries.length, //stack, // orginal stack (not current) for GC purposes
                function ()
                {
                  var markedCont = Call.mark(cont, application); 
                  return Call.applyFunction(application, operandsValues, ths.as[0], stack3.addFirst(markedCont), benva, store2, time2, state);
                })
          })
      });
  }
  
  function applyProc2(node, operatorValues, operands, thisa, stack, benva, store, time, state)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    var time2 = time.tick(node.tag, k);
    var store2 = visited.visited(node, stack, benva, store, time);
    if (store2 === null)
    {
      return [];
    }
    
    operatorValues = operatorValues.map(
        function (operatorValue)
        {
          assertTrue(operatorValue instanceof Addr);
          var lookupResult = lookupAval(operatorValue, stack, store2, state);
          var benv = lookupResult.value;
          state = lookupResult.state;
          return benv;
        }); 
    return operatorValues.flatMap(
      function (operator)
      {
        var callConc = operator.Call;
        assertTrue(callConc.length > 0);
        return callConc.map(
          function (Call) 
          {
            return new Task("#" + node.tag + " " + node + " stack length " + stack.length + " store size " + store.entries.length, //stack, // orginal stack (not current) for GC purposes
                function ()
                {
                  var markedCont = Call.mark(cont, node); 
                  return Call.applyFunction(node, operands, thisa, stack2.addFirst(markedCont), benva, store2, time2, state);
                })
          })
      });
  }
  
  function applyConstructor(application, stack, benva, store, time, state)
  {
//    print("applyConstructor", application, "\n", stack, benva, time);
    if (stack.length > 128)
    {
      throw new Error("stack explosion");
    }
    var applicationLength = application.arguments.length + 1;
    var applicationValues = stack.slice(0, applicationLength).reverse();
    var constructorValues = applicationValues[0].addresses();
    var operandsValues = applicationValues.slice(1);
    var stack2 = stack.slice(applicationLength);
    var time2 = time.tick(application.tag, k);
    
    constructorValues = constructorValues.map(
        function (operatorValue)
        {
          var lookupResult = lookupAval(operatorValue, stack, store, state);
          var benv = lookupResult.value;
          state = lookupResult.state;
          return benv;
        }); 
    
    return constructorValues.flatMap(
      function (constructor)
      {
        // TODO move this closer to applyFunction call, and include declaration node?
        // (so that address generators can base themselves on application and declaration node)
        var objectAddress = ag.constructor(application, time); // was (constructor, time)
//        print("address", objectAddress, "for", application);
    
        function constructorObjectCont()
        {
          return new Cont("consObj-" + application.tag, benva,
            function (stack, store, time, state)
            {
              var objectAval = stack[0];
              var cont = stack[1];
              var stack2 = stack.slice(2);
//              print("+ value", objectAval);
              if (objectAval.isAddress())
              {
                return cont.execute(stack2.addFirst(objectAval), store, time, state);
              }
              var caddresses = objectAval.addresses();
              return cont.execute(stack2.addFirst(lattice.abst([objectAddress].concat(caddresses))), store, time, state);
            });
        }                    
        
        var cont = constructorObjectCont();
        var markedCont = cont.addApplication(application);
        
        var prototypePropertyAs = constructor.lookup(U_PROTOTYPE).addresses; // seems that we don't require a protochain lookup here (TODO check with ECMA-262 spec)
        var laResult = doLookupAddresses(prototypePropertyAs, stack, store, state);
        // TODO 13.2.2 case when prototype isn't an object 
        var ths = createObject(laResult.value);
        var allocResult = allocAval(objectAddress, ths, stack, store, laResult.state, "'this' object for " + application);
        store = allocResult.store;
        state = allocResult.state;
        return constructor.Call.map(
            function (Call) 
            {
              return new Task("#" + application.tag + " " + application + " stack length " + stack.length + " store size " + store.entries.length,//stack, // original stack (not current) for GC purposes
                  function ()
                  {
                    return Call.applyFunction(application, operandsValues, objectAddress, stack2.addFirst(markedCont), benva, store, time2, state);
                  })
            })
      })
  }
	
	
	function BenvClosureCall(node, scope)
	{
	  this.node = node;
	  this.scope = scope;
	}
	
	BenvClosureCall.prototype.toString =
	  function ()
	  {
	    return "<BenvClosureCall " + this.node.tag + ">"
	  }

	BenvClosureCall.prototype.equals =
	  function (other)
	  {
	    if (this === other)
	    {
	      return true;
	    }
	    if (!(this instanceof BenvClosureCall))
	    {
	      return false;
	    }
	    return this.node === other.node
	      && this.scope.equals(other.scope);
	  }
	
	BenvClosureCall.prototype.mark =
	  function (cont, application)
	  {
      var markedCont = cont.addApplication(application);
      markedCont.toString = cont.toString; // DEBUG
      return markedCont;
	  }

	BenvClosureCall.prototype.applyFunction =
	  function (application, operandsValues, ths, stack, benva, store, time, state)
	  {
//	    print("BenvClosureCall.applyFunction", application, "operandsValues", operandsValues, "ths", ths);

	    var funNode = this.node;
	    var funScope = this.scope;
      var bodyNodes = funNode.body.body;
      if (bodyNodes.length === 0)
      {
        var cont = stack[0];
        var stack2 = stack.slice(1);
        state = state.appliesFunction(application, funNode, funScope, ths);
        state = state.leavesFunction(application, funNode, funScope, ths);
        return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);
      }
      
      var formalParameters = funNode.params;

	    var createResult = createEnvironment(funScope, application, funNode, state);
	    var extendedBenv = createResult.benv;
	    state = createResult.state;
	    
	    if (ths === null || ths === undefined)
	    {
	      ths = GLOBALA;
	    }
      extendedBenv = extendedBenv.add(U_THIS, ths);
      
	    for (var i = 0; i < formalParameters.length; i++)
      {
        var param = formalParameters[i];
        var address = ag.variable(param, time);
        extendedBenv = extendedBenv.add(userLattice.abst1(param.name), address);
        var allocResult = allocAval(address, operandsValues[i], stack, store, state);
        store = allocResult.store;
        state = allocResult.state;
      }
      
      var extendedBenva = ag.benv(application, time);

      var hoisted = hoist(bodyNodes);
      if (hoisted.funs.length > 0 || hoisted.vars.length > 0)
      {
        hoisted.funs.forEach(
            function (funDecl)
            {
              var result = evalHoistedFunctionDeclaration(funDecl, stack, extendedBenva, extendedBenv, store, time, state);
              extendedBenv = result.benv;
              store = result.store;
              state = result.state;
            });
        hoisted.vars.forEach(
            function (varDecl)
            {
              var result = evalHoistedVariableDeclarator(varDecl, stack, extendedBenv, store, time, state);
              extendedBenv = result.benv;
              store = result.store;
              state = result.state;
            });
      }
      
      var allocResult = allocAval(extendedBenva, extendedBenv, stack, store, state, "extended static env for closure call with root " + funScope);
      store = allocResult.store;
      state = allocResult.state;
      
      state = state.appliesFunction(application, funNode, extendedBenva, ths);
      
      // ECMA 13.2.1: [[Code]] cannot be evaluated as Block,
      // therefore "custom" eval

      function fbodyCont(i)
      {
        return new Cont("fbody-" + bodyNodes[i - 1].tag, extendedBenva,
          function (stack, store, time, state)
          {
            if (i === bodyNodes.length)
            {
                // discard aval = stack[0]
              var cont = stack[1];
              var stack2 = stack.slice(2);
              state = state.leavesFunction(application, funNode, funScope, ths);
              return cont.execute(stack2.addFirst(J_UNDEFINED), store, time, state);
            }
            var stack3 = stack.slice(1);
            return evalNode(bodyNodes[i], stack3.addFirst(fbodyCont(i + 1)), extendedBenva, store, time, state);
          });
      }

      return evalNode(bodyNodes[0], stack.addFirst(fbodyCont(1)), extendedBenva, store, time, state);
	  }
	
	BenvClosureCall.prototype.addresses =
	  function ()
	  {
	    return [this.scope];
	  }
	
  function BenvPrimitiveCall(applyFunction)
  {
    this.applyFunction = applyFunction;
  }

  BenvPrimitiveCall.prototype.toString =
    function ()
    {
      return "<BenvPrimitiveCall>";
    }
  
  BenvPrimitiveCall.prototype.equals =
    function (other)
    {
      if (this === other)
      {
        return true;
      }
      if (!(this instanceof BenvPrimitiveCall))
      {
        return false;
      }
      return this.applyFunction === other.applyFunction; // this case needed? (finite number of fixed prims)
    }
  
  BenvPrimitiveCall.prototype.mark =
    function (cont, application)
    {
      var markedCont = cont.addApplication(application);
      markedCont.toString = cont.toString; // DEBUG
      return markedCont;
    }

  BenvPrimitiveCall.prototype.addresses =
    function ()
    {
      return [];
    } 
  
	
	var totalNumTasks = 0;
	
	function taskRunner()
	{
		while (tasks.length > 0)
		{
      if (tasks.length > 128)
      {
        throw new Error("task overflow");
      }
      if (totalNumTasks > 1024)
      {
        throw new Error("state space overflow");
      }
		  var task = tasks[0];
//		  print("\nSTART", task, "-- length", tasks.length);
			var taskResult = task.execute();
			assertDefinedNotNull(taskResult);
//			print("END", task, "-- result", taskResult, "-- total", ++totalNumTasks);
			tasks = tasks.slice(1).concat(taskResult);
		}		
	}

	
	// TODO GLOBALA is not abstracted; OBJECTPA, FUNCTIONPA, ARRAYPA are abstracted 
	
  var GLOBALA = new ContextAddr("this", 0); // global this
  var OBJECTPA; // Object.prototype
  var FUNCTIONPA; // Function.prototype
  var ARRAYPA; // Array.prototype
  
  function createGlobal(store)
  {
    
    function registerProperty(object, objectAddress, propertyName, value)
    {
      var propertyAddress = ag.objectProperty(objectAddress, propertyName); // TODO: abst 'propertyName'?
      object = object.add(userLattice.abst1(propertyName), propertyAddress);
      store = store.allocAval(propertyAddress, value);
      return object;      
    }

    function registerPrimitiveFunction(object, objectAddress, propertyName, fun)
    {
      var primFunObject = createPrimitive(fun);
      var primFunObjectAddress = new ContextAddr(objectAddress, "<" + propertyName + ">"); 
      store = store.allocAval(primFunObjectAddress, primFunObject);    
      return registerProperty(object, objectAddress, propertyName, lattice.abst1(primFunObjectAddress));
    }
    
    // BEGIN PROTOTYPES
    // first we need to establish 'global' and some prototypes,
    // because for example: 'createPrimitive' relies on 'FUNCTIONPA', 'FUNCTIONPA' relies on OBJECTPA
    
    var objectPa = new ContextAddr("Object.prototype", 0);
    OBJECTPA = lattice.abst1(objectPa);
    var objectP = createObject(J_NULL);
    objectP.toString = function () { return "<Object.prototype>"; }; // debug

    var functionPa = new ContextAddr("Function.prototype", 0);
    FUNCTIONPA = lattice.abst1(functionPa);
    var functionP = createObject(OBJECTPA);
    functionP.toString = function () { return "<Function.prototype>"; }; // debug

    var arrayPa = new ContextAddr("Array.prototype", 0);
    ARRAYPA = lattice.abst1(arrayPa);
    var arrayP = createObject(OBJECTPA);
    arrayP.toString = function () { return "<Array.prototype>"; }; // debug
    
    var global = createObject(OBJECTPA);
    // END PROTOTYPES
    
    // BEGIN OBJECT
    var objecta = new ContextAddr("<Object>", 0);
    objectP = registerProperty(objectP, objectPa, "constructor", lattice.abst1(objecta));
    
    var object = createPrimitive(objectConstructor);
    var objectppa = new ContextAddr(objecta, "prototype");
    object = object.add(U_PROTOTYPE, objectppa);
    store = store.allocAval(objectppa, OBJECTPA);
    var objectNa = new ContextAddr("Object", 0);
    global = global.add(userLattice.abst1("Object"), objectNa);
    store = store.allocAval(objectNa, lattice.abst1(objecta));
    
    object = registerPrimitiveFunction(object, objecta, "getPrototypeOf", objectGetPrototypeOf);
    object = registerPrimitiveFunction(object, objecta, "create", objectCreate);

    store = store.allocAval(objecta, object);
    store = store.allocAval(objectPa, objectP);
    // END OBJECT

        
    // BEGIN FUNCTION
    var functiona = new ContextAddr("<Function>", 0);
    var functionP = registerProperty(functionP, functionPa, "constructor", lattice.abst1(functiona));
    var fun = createPrimitive(function () {}); // TODO
    var funppa = new ContextAddr(functiona, "prototype");
    fun = fun.add(U_PROTOTYPE, funppa);
    store = store.allocAval(funppa, FUNCTIONPA);
    var functionNa = new ContextAddr("Function", 0);
    global = global.add(userLattice.abst1("Function"), functionNa);
    store = store.allocAval(functiona, fun);
    store = store.allocAval(functionNa, lattice.abst1(functiona));

    store = store.allocAval(functionPa, functionP);
    // END FUNCTION 
            
    // BEGIN ARRAY
    var arraya = new ContextAddr("<Array>", 0);
    var arrayP = registerProperty(arrayP, arrayPa, "constructor", lattice.abst1(arraya));
    var array = createPrimitive(arrayConstructor);
    var arrayppa = new ContextAddr(arraya, "prototype");
    array = array.add(U_PROTOTYPE, arrayppa);
    store = store.allocAval(arrayppa, ARRAYPA);
    var arrayNa = new ContextAddr("Array", 0);
    global = global.add(userLattice.abst1("Array"), arrayNa);
    store = store.allocAval(arraya, array);
    store = store.allocAval(arrayNa, lattice.abst1(arraya));
    
    arrayP = registerPrimitiveFunction(arrayP, arrayPa, "concat", arrayConcat);
    arrayP = registerPrimitiveFunction(arrayP, arrayPa, "push", arrayPush);
    arrayP = registerPrimitiveFunction(arrayP, arrayPa, "map", arrayMap);
    store = store.allocAval(arrayPa, arrayP);
    // END ARRAY
    
    
    // BEGIN MATH
    var mathap = new ContextAddr("Math", 0);
    global = global.add(userLattice.abst1("Math"), mathap);
    var matha = new ContextAddr("<Math>", 0);
    store = store.allocAval(mathap, lattice.abst1(matha));
    var math = createObject(OBJECTPA);
    math = registerPrimitiveFunction(math, matha, "sqrt", mathSqrt);
    store = store.allocAval(matha, math);
    // END MATH
    
    // BEGIN GLOBAL
    global = global.add(U_THIS, GLOBALA); // global "this" address
    
    // ECMA 15.1.1 value properties of the global object (no "null", ...)
    global = registerProperty(global, GLOBALA, "undefined", J_UNDEFINED);
    global = registerProperty(global, GLOBALA, "NaN", lattice.abst1(NaN));
    global = registerProperty(global, GLOBALA, "Infinity", lattice.abst1(Infinity));

    // specific interpreter functions
    var metaFun = createPrimitive(meta);
    var metaa = new ContextAddr("$meta", 0);
    global = global.add(userLattice.abst1("$meta"), metaa);
    var metaFuna = new ContextAddr("metaFun", 0);
    store = store.allocAval(metaa, lattice.abst1(metaFuna));    
    store = store.allocAval(metaFuna, metaFun);    
          
    var avalFun = createPrimitive(aval);
    var avala = new ContextAddr("$aval", 0);
    global = global.add(userLattice.abst1("$aval"), avala);
    var avalFuna = new ContextAddr("avalFun", 0);
    store = store.allocAval(avala, lattice.abst1(avalFuna));    
    store = store.allocAval(avalFuna, avalFun);
    // end specific interpreter functions
    
    store = store.allocAval(GLOBALA, global);
    // END GLOBAL
    
    // BEGIN PRIMITIVES
    function objectConstructor(application, operands, objectAddress, stack, benva, store, time, state)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var obj = createObject(OBJECTPA);
      var allocResult = allocAval(objectAddress, obj, stack, store, state);
      store = allocResult.store;
      state = allocResult.state;
      return cont.execute(stack2.addFirst(lattice.abst1(objectAddress)), store, time, state);
    }    
    
    function objectCreate(application, operands, objectAddress, stack, benva, store, time, state)
    {
      if (operands.length !== 1)
      {
        throw new Error("TODO");
      }
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var obj = createObject(operands[0]);
      var address = ag.object(application, time);
      var allocResult = allocAval(address, obj, stack, store, state);
      store = allocResult.store;
      state = allocResult.state;
      return cont.execute(stack2.addFirst(lattice.abst1(address)), store, time, state);
    }    
    
    function objectGetPrototypeOf(application, operands, objectAddress, stack, benva, store, time, state)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var operand = operands[0];
      if (operand.user === BOT)
      {
        var addresses = operand.addresses();
        var object = addresses.map(store.lookupAval, store).reduce(Lattice.join);
        return cont.execute(stack2.addFirst(object.Prototype), store, time, state);
      }
      throw new Error("TODO");
    }    
    
    function arrayConstructor(application, operands, objectAddress, stack, benva, store, time, state)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var arrayBenv = createArray();
      var arrayAddress = ag.array(application, time);
      var l = operands[0];
      var lengthAddress = ag.objectProperty(arrayAddress, "length");
      arrayBenv = arrayBenv.add(U_LENGTH, lengthAddress);
      var allocResult = allocAval(lengthAddress, l, stack, store, state);
      allocResult = allocAval(arrayAddress, arrayBenv, stack, allocResult.store, allocResult.state);
      store = allocResult.store;
      state = allocResult.state;
      return cont.execute(stack2.addFirst(lattice.abst1(arrayAddress)), store, time, state);
    }    
    
    function arrayPush(application, operands, objectAddress, stack, benva, store, time, state)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
     
      var arg0aa = operands[0];
                    
      var lookupResult = lookupAval(objectAddress, stack, store, state);
      var receiver = lookupResult.value;
      state = lookupResult.state;
      var lreceiveraa = receiver.lookup(U_LENGTH).addresses;
      if (lreceiveraa.length === 0)
      {
        // this branch is untested (need apply or call)
        var newPropertyAddress = ag.objectProperty(objectAddress, U_0.ToString());
        receiver = receiver.add(U_0.ToString(), newPropertyAddress);
        var allocResult = allocAval(newPropertyAddress, arg0aa, stack, store, state);
        store = allocResult.store;
        state = allocResult.state;
        var lengthPropertyAddress = ag.objectPropery(objectAddress, U_LENGTH);
        receiver = receiver.add(U_LENGTH, lengthPropertyAddress);
        allocResult = allocAval(lengthPropertyAddress, J_0, stack, store, state);
        store = allocResult.store;
        state = allocResult.state;
        var updateResult = sideEffectAval(objectAddress, receiver, stack, store, state);
        store = updateResult.store;
        state = updateResult.state;
        return cont.execute(stack2.addFirst(arg0aa), store, time, state);                                                                            
      }
      else
      {
        var laResult = doLookupAddresses(lreceiveraa, stack, store, state);
        var lreceiveru = laResult.value.user;
        var newPropertyAddress = ag.objectProperty(objectAddress, lreceiveru.ToString());
        receiver = receiver.add(lreceiveru.ToString(), newPropertyAddress);
        var allocResult = allocAval(newPropertyAddress, arg0aa, stack, store, laResult.state);
        store = allocResult.store;
        state = allocResult.state;
        var updateResult = sideEffectAval(objectAddress, receiver, stack, store, state);
        store = updateResult.store;
        state = updateResult.state;
        var newLength = userLattice.add(lreceiveru, U_1);
        lreceiveraa.forEach(
          function (lengthAddress) 
          {
            var updateResult = updateAval(lengthAddress, new JipdaValue(newLength, []), stack, store, state);
            store = updateResult.store;
            state = updateResult.state;
          });
        return cont.execute(stack2.addFirst(arg0aa), store, time, state);                                                                                  
      }
    }
    
    function arrayConcat(application, operands, objectAddress, stack, benva, store, time, state)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
     
      var arg0aa = operands[0];

      var lookupResult = lookupAval(objectAddress, stack, store, state);
      var receiver = lookupResult.value;
      state = lookupResult.state;
      var lreceiveraa = receiver.lookup(U_LENGTH).addresses;
      var laResult = doLookupAddresses(arg0aa.addresses(), stack, store, state);
      var arg0 = laResult.value;
      laResult = doLookupAddresses(lreceiveraa, stack, store, laResult.state);
      var lreceiveru = laResult.value.user;
      var larg0aa = arg0.lookup(U_LENGTH).addresses;
      laResult = doLookupAddresses(larg0aa, stack, store, laResult.state);
      var larg0 = laResult.value;
      var larg0u = larg0.user;
      var result = createArray();
      var resulta = ag.array(application, time);
      return arrayCopy(receiver, U_0, result, resulta, U_0, lreceiveru, stack, store, laResult.state,
        function (result, index, store, state)
        {
          return arrayCopy(arg0, U_0, result, resulta, index, larg0u, stack, store, state, 
            function (result, index, store, state)
            {
              var lengthPropertya = ag.objectProperty(resulta, U_LENGTH);
              result = result.add(U_LENGTH, lengthPropertya);
              var allocResult = allocAval(lengthPropertya, new JipdaValue(index, []), stack, store, state);
              allocResult = allocAval(resulta, result, stack, allocResult.store, allocResult.state);
              store = allocResult.store;
              state = allocResult.state;
              return cont.execute(stack2.addFirst(lattice.abst1(resulta)), store, time, state);                                                                                  
            });
        });
    } 
    
    function arrayMap(application, operands, thisa, stack, benva, store, time, state)
    {
      // TODO ToObject(thisa)
      // TODO best way to solve this?
      var lookupResult = lookupAval(thisa, stack, store, state);
      var receiver = lookupResult.value;
      state = lookupResult.state;
      var lena = receiver.lookup(U_LENGTH).addresses;
      var laResult = doLookupAddresses(lena, stack, store, state);
      var lenValue = laResult.value;
      state = laResult.state;
      
      function arrayMapToUInt32Cont()
      {
        return new Cont("arrayMapToUInt32-"+application.tag, benva,
          function (stack, store, time, state)
          {
            var lenPrim = stack[0].user;            
            
            var t;
            if (operands[1])
            {
              var thisas = operands[1].addresses(); 
              assertTrue(thisas.length === 1);
              t = thisas[0];
            }
            
            var arr = createArray();
            var arrAddr = ag.array(application, time);
            var lenPropAddr = ag.objectProperty(arrAddr, U_LENGTH);
            arr = arr.add(U_LENGTH, lenPropAddr);
            var allocResult = allocAval(lenPropAddr, new JipdaValue(lenPrim, []), stack, store, state);
            store = allocResult.store;
            state = allocResult.state;
            var k = U_0;
            
            function arrayMapCont(k, arr, arrAddr)
            {
              return new Cont("arrayMap-"+application.tag, benva,
                function (stack, store, time, state)
                {
                  var value = stack[0];
                  var valuePropAddr = ag.objectProperty(arrAddr, k.ToString());
                  arr = arr.add(k.ToString(), valuePropAddr);
                  var allocResult = allocAval(valuePropAddr, value, stack, store, state);
                  store = allocResult.store;
                  state = allocResult.state;
                  k = userLattice.add(k, U_1);
                  while (userLattice.isTrue(userLattice.lt(k, lenPrim)))
                  {
                    var indexAs = receiver.lookup(k.ToString()).addresses;
                    if (indexAs.length > 0)
                    {
                      var laResult = doLookupAddresses(indexAs, stack, store, state);
                      var indexValue = laResult.value;
                      state = laResult.state;
                      var stack2 = stack.slice(1);
                      return applyProc2(application, operands[0].addresses(), [indexValue, k, thisa], t, stack2.addFirst(arrayMapCont(k, arr, arrAddr)), benva, store, time, state);          
                    }
                    k = userLattice.add(k, U_1);
                  }
                  var cont = stack[1];
                  var stack2 = stack.slice(2);
                  allocResult = allocAval(arrAddr, arr, stack, store, state);
                  return cont.execute(stack2.addFirst(new JipdaValue(BOT, [arrAddr])), allocResult.store, time, allocResult.state);                  
                });
            }
            
            while (userLattice.isTrue(userLattice.lt(k, lenPrim)))
            {
              var indexAs = receiver.lookup(k.ToString()).addresses;
              if (indexAs.length > 0)
              {
                var laResult = doLookupAddresses(indexAs, stack, store, state);
                var indexValue = laResult.value;
                state = laResult.state;
                var stack2 = stack.slice(1);
                return applyProc2(application, operands[0].addresses(), [indexValue, k, thisa], t, stack2.addFirst(arrayMapCont(k, arr, arrAddr)), benva, store, time, state);          
              }
              k = userLattice.add(k, U_1);
            }
            var cont = stack[1];
            var stack2 = stack.slice(2);
            allocResult = allocAval(arrAddr, arr, stack, store, state);
            return cont.execute(stack2.addFirst(new JipdaValue(BOT, [arrAddr])), allocResult.store, time, allocResult.state);            
          });
      }
      return ToUInt32(lenValue, application, stack.addFirst(arrayMapToUInt32Cont()), benva, store, time, state);
    }
    
    function mathSqrt(application, operands, objectAddress, stack, benva, store, time, state)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var u = toUserNumber(operands[0], store);
      var r = userLattice.sqrt(u);
      var j = new JipdaValue(r, []);
      return cont.execute(stack2.addFirst(j), store, time, state);
    }
    
    function meta(application, operands, objectAddress, stack, benva, store, time, state)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var str = operands[0].conc()[0];
      var value = lattice.abst1(eval(str));
      return cont.execute(stack2.addFirst(value), store, time, state);
    }
    
    function aval(application, operands, objectAddress, stack, benva, store, time, state)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var value = operands.reduce(Lattice.join, BOT);
      return cont.execute(stack2.addFirst(value), store, time, state);
    }    
    // END PRIMITIVES
    
    // BEGIN HELPERS
    function arrayCopy(srcBenv, srcPos, dstBenv, dsta, dstPos, l, stack, store, state, fcont)
    {
      var i = U_0;
      while (userLattice.isTrue(userLattice.lt(i, l)))
      {
        var srcvalueaa = srcBenv.lookup(userLattice.add(i, srcPos).ToString()).addresses;
        var laResult = doLookupAddresses(srcvalueaa, stack, store, state);
        var srcvalue = laResult.value;
        var dstName = userLattice.add(i, dstPos).ToString();
        var dstindexa = ag.objectProperty(dsta, dstName);
        dstBenv = dstBenv.add(dstName, dstindexa);
        var allocResult = allocAval(dstindexa, srcvalue, stack, store, laResult.state);
        store = allocResult.store;
        state = allocResult.state;
        i = userLattice.add(i, U_1);
      }
      return fcont(dstBenv, userLattice.add(i, dstPos), store, state);
    }
    // END HELPERS
    
    return store;
  }
    	
	function init()
	{
	  var store0 = new Store();
    store0 = createGlobal(store0);
		
		var replCont = new Cont("repl", GLOBALA,
		    function (stack, store, time, state)
		    {
		      var value = stack[0];
          var stack2 = stack.slice(1);
          var printer = new ConcretePrinter(userLattice, store);
//		      print(value.accept(printer));
		      putstr("> ");
		      var src = readline();
		      if (":q".equals(src))
		      {
//		        print("Bye!");
		        return [];
		      }
		      try
		      {
  		      var node = createAst(src);
  		      return evalNode(node, stack2.addFirst(replCont), GLOBALA, store, time, state);
		      }
		      catch (e)
		      { 
//		        print(e);
//		        print(e.stack);
		        return replCont.execute(stack2.addFirst(BOT), store, time, state);
		      }
		    });

		var time0 = new Time();
		if (node0)
		{
	    var exitCont = new Cont("exit-" + node0.tag, GLOBALA,
        function (stack, store, time, state)
        {
          var state2 = state.returnsResult(stack[0], store); 
          result = result.join(state2); 
          return [];
        });

	    tasks = [new Task("eval", function () { return evalNode(node0, [exitCont], GLOBALA, store0, time0, state0);})];		  
		}
		else
		{
      tasks = [new Task("repl", function () { return evalNode(createAst("'I am JIPDA'"), [replCont], GLOBALA, store0, time0, state0);})];     		  
		}
		return store0; // hack
	}
	
	var store0 = init(); // TODO clean this up
	taskRunner();
  return {result:result, lattice:lattice, globala:GLOBALA, globalStore: store0};
}

function jipdaRepl(k, n)
{
  var lat = new LatN(n === undefined ? 1 : n);
  try
  {
    ipdaEval(null, new State(), {k:k||4, lattice:lat, ag: timeDefaultAg});    
  }
  catch (e)
  {
//    print(e);
//    print(e.stack);
  }
}

function concRepl(k, n)
{
  var lat = new CpLattice();
  var concreteVisited = {};
  concreteVisited.visited = function (node, stack, benva, store, time) { return store };
  try
  {
    ipdaEval(null, new State(), {k:0, lattice:lat, ag: concreteAg, visited: concreteVisited});    
  }
  catch (e)
  {
//    print(e);
//    print(e.stack);
  }
}

// what with printing read access (e.g. printing array reads .length)???
function createJipdaPrinter(lattice, store)
{
  return function jipdaPrinter(el)
  {
    if (el === undefined)
    {
      return "undefined";
    }
    if (el === null)
    {
      return "null";
    }
    if (el instanceof Addr)
    {
      var aval = store.lookupAval(el); // TODO read/write stuff!!!!
      if (aval.isBenv)
      {
        if (aval.isArray())
        {
          var i = lattice.abst1(0);
          var las = aval.lookup(lattice.abst1("length")).addresses;
          var l = las.map(store.lookupAval, store).reduce(Lattice.join, BOT).user;
          var result = [];
          while (lattice.isTrue(lattice.lt(i, l)))
          {
            var ias = aval.lookup(i.ToString()).addresses;
//            print("looking up name", i.ToString(), "-> addresses", ias, "==> in store", ias.map(store.lookupAval, store));
            var v = ias.map(store.lookupAval, store).reduce(Lattice.join, BOT);
            result = result.addLast(v.toString(jipdaPrinter));
            i = lattice.add(i, lattice.abst1(1));
          }
          return result.toString();
        }
        return "<" + aval.Class + ">";
      }
      return aval.toString(jipdaPrinter);
    }
    return el.toString();
  };
}

