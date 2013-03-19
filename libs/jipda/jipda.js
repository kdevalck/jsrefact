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
//      print("REALLOCATED", address, weaklyUpdatedValue, msg ? msg : "", "-- was", entry);
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

//          var reset = entry[1].reset();
//          print("reset address", address, "before", entry[1], "after", reset);
//          return [[address, reset]];
        }
        return [];
      }
    );
    return new Store(entries);
  };
  

function Cont(memento, benva, proc, marks, handler)
{
  this.memento = memento;
  this.benva = benva;
  this.proc = proc;
  this.marks = marks || [];
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
  function (stack, store, time, state, c)
  {
//    print("---->", this, stack);
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
    if (!c)
    {
      throw new Error("no or wrong c:" + c);
    }
    return this.proc(stack, store, time, state, c);
    // or, if cont execution in context of evaluator:
    // return this.proc.call(c.e, stack, store, time, state, c);
  };
  
Cont.prototype.addMark =
  function (mark)
  {
    var newMarks = this.marks.remove(mark).addFirst(mark);
//    print("ADDING", application, "OLD", this.applications, "NEW", newApplications);
    var cont = new Cont(this.memento, this.benva, this.proc, newMarks, this.handler);
    return cont;
  };
  
  
Cont.prototype.setHandler =
  function (handler)
  {
    var cont = new Cont(this.memento, this.benva, this.proc, this.marks, handler);
    return cont;
  }

function CallMark(application, callable)
{
  this.application = application;
  this.callable = callable;
}
CallMark.prototype.equals = function (x) {return Eq.equals(this.application, x.application) && Eq.equals(this.callable, x.callable)}
CallMark.prototype.toString = function () {return "(" + this.application.tag + ", " + this.callable + ")"};
    
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
//    if (benv.parents)
//    {
      reachable = addressesReachable(benv.parents, reachable);
//    }
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
//    if (address instanceof Addr)
//    {
      var aval = store.lookupAval(address);
      assertDefinedNotNull(aval);
      return valueReachable(aval, reachable.addLast(address));
//    }
//    throw new Error("gc.addressReachable: cannot handle address " + address);
  }
  
  function addressesReachable(addresses, reachable)
  {
    for (var i = 0; i < addresses.length; i++)
    {
      reachable = addressReachable(addresses[i], reachable);
    }
    return reachable;
  }
  
//  function taskReachable(task, reachable)
//  {
//    //return addressReachable(task.benva, valuesReachable(task.stack, reachable));
//    return reachable; 
//  }
  
//  function tasksReachable(tasks, reachable)
//  {
//    for (var i = 0; i < tasks.length; i++)
//    {
//      reachable = taskReachable(tasks[i], reachable);
//    }
//    return reachable;
//  }
  
  //print("GC", stack, benv, "\n", store);
//  var reachable = tasksReachable(tasks, addressReachable(benva, valuesReachable(stack, [])));
  var reachable = addressReachable(benva, valuesReachable(stack, []));
  //print("reachable", reachable);
  var narrowed = store.narrow(reachable);
//  print("GC", narrowed.diff(store));
  return narrowed;
}


function JipdaLattice(userLattice)
{
  assertDefinedNotNull(userLattice);
  this.userLattice = userLattice; 
  this.J_UNDEFINED = this.abst1(undefined);
  this.J_NULL = this.abst1(null);
  this.J_0 = this.abst1(0);
  this.J_1 = this.abst1(1);
  this.U_0 = userLattice.abst1(0);
  this.U_1 = userLattice.abst1(1);
  this.U_TRUE = userLattice.abst1(true);
  this.U_FALSE = userLattice.abst1(false);
  this.U_THIS = userLattice.abst1("this");
  this.U_PROTOTYPE = userLattice.abst1("prototype");
  this.U_LENGTH = userLattice.abst1("length");
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
//    if (this.c.l.userLattice.isFalse(value.user)) // TODO move isTrue/isFalse to LatticeValue
//    {
//      return value.as.length === 0;
//    }
//    return false;
    throw new Error();
  }

JipdaLattice.prototype.isTrue =
  function (value)
  {
//    return this.c.l.userLattice.isTrue(value.user)) // TODO move isTrue/isFalse to LatticeValue
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
  return j.user.ToBoolean().join(j.as.length === 0 ? BOT : c.l.userLattice.abst1(true));
}


//// ToBoolean
//// ToString
//// ToUint32


function Jipda(config)
{
  // start constants
  var performGc = config.performGc === undefined ? true : config.performGc;
  var k = config.k === undefined ? 1 : config.k;
  var userLattice = config.lattice;
  var lattice = new JipdaLattice(userLattice);
  var ag = config.ag;
  var visited = config.visited || new DefaultVisitedStrategy(performGc ? gc : function (store) {return store}); // TODO make this mandatory param
  var benvFactory = config.benv || new DefaultBenv();
  var evaluator = config.evaluator || jseval;
  
  assertDefinedNotNull(k);
  assertDefinedNotNull(userLattice);
  assertDefinedNotNull(ag);
  assertDefinedNotNull(visited);
  
  // end constants
  
  function createEnvironment(parenta, sourceNode, declarationNode, state, c)
  {
    var benv = benvFactory.createEnvironment(parenta, sourceNode, declarationNode);
    state2 = state.createsEnvironment(sourceNode, declarationNode, benv);
    return {benv:benv,state:state2};
  }

  function createObject(Prototype)
  {
    assertDefinedNotNull(Prototype, "[[Prototype]]");
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
      
  
  // 9.3
  function ToNumber(value, node, stack, benva, store, time, state, c)
  {
    
    if (value.addresses().length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToNumber(), [])), store, time, state, c);
    }
    
    var tasks = DefaultValue(value.addresses(), function (primValue) {return primValue.ToNumber()}, node, stack, benva, store, time, state, c); 
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
          return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToNumber(), [])), store, time, state, c);
        }));
  }
  
  // 9.6
  function ToUInt32(value, node, stack, benva, store, time, state, c)
  {
    
    if (value.addresses().length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToUInt32(), [])), store, time, state, c);
    }
    
    var tasks = DefaultValue(value.addresses(), function (primValue) {return primValue.ToUInt32()}, node, stack, benva, store, time, state, c); 
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
          return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToUInt32(), [])), store, time, state, c);
        }));
  }
  
  
  // 9.8
  function ToString(value, node, stack, benva, store, time, state, c)
  {
    
    if (value.addresses().length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToString(), [])), store, time, state, c);
    }
    
    var tasks = DefaultValueString(value.addresses(), node, function (primValue) {return primValue.ToString()}, stack, benva, store, time, state, c); 
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
          return cont.execute(stack2.addFirst(new JipdaValue(value.user.ToString(), [])), store, time, state, c);
        }));
  }
  
  function stackElementsSubsume(s1, s2)
  {
    if (s1.length < s2.length)
    {
      return false;
    }
    return true;
  }
          
  
  
      
  function applyProc2(node, operatorValues, operands, thisa, stack, benva, store, time, state, c)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    var time2 = time.tick(node.tag, k);
    // could push operator/operands here, but then not "universally" GC-compatible
    var store2 = visited.visited(node, stack, benva, store, time);
    if (store2 === null)
    {
      return [];
    }
    
    operatorValues = operatorValues.map(
        function (operatorValue)
        {
          assertTrue(operatorValue instanceof Addr);
          var lookupResult = c.e.lookupAval(operatorValue, stack, store2, state, c);
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
          function (call) 
          {
            return new Task("#" + node.tag + " " + node + " stack length " + stack.length + " store size " + store.entries.length, //stack, // orginal stack (not current) for GC purposes
                function ()
                {
                  var markedCont = call.mark(cont, node); 
                  return call.applyFunction(node, operands, thisa, stack2.addFirst(markedCont), benva, store2, time2, state, c);
                })
          })
      });
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
      var markedCont = cont.addMark(new CallMark(application, this));
      markedCont.toString = cont.toString; // DEBUG
      return markedCont;
    }

  BenvPrimitiveCall.prototype.addresses =
    function ()
    {
      return [];
    } 
  
  
  var totalNumTasks = 0;
  
  function taskRunner(tasks)
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
//      print("\nSTART", task, "-- length", tasks.length);
      var taskResult = task.execute();
      assertDefinedNotNull(taskResult);
//      print("END", task, "-- result", taskResult, "-- total", ++totalNumTasks);
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
    var objectP = createObject(lattice.J_NULL);
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
    object = object.add(lattice.U_PROTOTYPE, objectppa);
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
    fun = fun.add(lattice.U_PROTOTYPE, funppa);
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
    array = array.add(lattice.U_PROTOTYPE, arrayppa);
    store = store.allocAval(arrayppa, ARRAYPA);
    var arrayNa = new ContextAddr("Array", 0);
    global = global.add(userLattice.abst1("Array"), arrayNa);
    store = store.allocAval(arraya, array);
    store = store.allocAval(arrayNa, lattice.abst1(arraya));
    
    arrayP = registerPrimitiveFunction(arrayP, arrayPa, "concat", arrayConcat);
    arrayP = registerPrimitiveFunction(arrayP, arrayPa, "push", arrayPush);
    arrayP = registerPrimitiveFunction(arrayP, arrayPa, "map", arrayMap);
    arrayP = registerPrimitiveFunction(arrayP, arrayPa, "reduce", arrayReduce);
    arrayP = registerPrimitiveFunction(arrayP, arrayPa, "filter", arrayFilter);
    store = store.allocAval(arrayPa, arrayP);
    // END ARRAY
    
    
    // BEGIN MATH
    var mathap = new ContextAddr("Math", 0);
    global = global.add(userLattice.abst1("Math"), mathap);
    var matha = new ContextAddr("<Math>", 0);
    store = store.allocAval(mathap, lattice.abst1(matha));
    var math = createObject(OBJECTPA);
    
    math = registerPrimitiveFunction(math, matha, "sqrt", mathSqrt);
    math = registerProperty(math, matha, "PI", lattice.abst1(Math.PI));
    store = store.allocAval(matha, math);
    // END MATH
    
    // BEGIN GLOBAL
    global = global.add(lattice.U_THIS, GLOBALA); // global "this" address
    
    // ECMA 15.1.1 value properties of the global object (no "null", ...)
    global = registerProperty(global, GLOBALA, "undefined", lattice.J_UNDEFINED);
    global = registerProperty(global, GLOBALA, "NaN", lattice.abst1(NaN));
    global = registerProperty(global, GLOBALA, "Infinity", lattice.abst1(Infinity));

    // specific interpreter functions
    var metaFun = createPrimitive($meta);
    var metaa = new ContextAddr("$meta", 0);
    global = global.add(userLattice.abst1("$meta"), metaa);
    var metaFuna = new ContextAddr("metaFun", 0);
    store = store.allocAval(metaa, lattice.abst1(metaFuna));    
    store = store.allocAval(metaFuna, metaFun);    
          
    global = registerPrimitiveFunction(global, GLOBALA, "$join", $join);
    global = registerPrimitiveFunction(global, GLOBALA, "print", _print);
    // end specific interpreter functions
    
    store = store.allocAval(GLOBALA, global);
    // END GLOBAL
    
    // BEGIN PRIMITIVES
    function objectConstructor(application, operands, objectAddress, stack, benva, store, time, state, c)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var obj = createObject(OBJECTPA);
      var allocResult = c.e.allocAval(objectAddress, obj, stack, store, state, c);
      store = allocResult.store;
      state = allocResult.state;
      return cont.execute(stack2.addFirst(c.l.abst1(objectAddress)), store, time, state, c);
    }    
    
    function objectCreate(application, operands, objectAddress, stack, benva, store, time, state, c)
    {
      if (operands.length !== 1)
      {
        throw new Error("TODO");
      }
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var obj = createObject(operands[0]);
      var address = ag.object(application, time);
      var allocResult = c.e.allocAval(address, obj, stack, store, state, c);
      store = allocResult.store;
      state = allocResult.state;
      return cont.execute(stack2.addFirst(c.l.abst1(address)), store, time, state, c);
    }    
    
    function objectGetPrototypeOf(application, operands, objectAddress, stack, benva, store, time, state, c)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var operand = operands[0];
      if (operand.user === BOT)
      {
        var addresses = operand.addresses();
        var object = addresses.map(store.lookupAval, store).reduce(Lattice.join);
        return cont.execute(stack2.addFirst(object.Prototype), store, time, state, c);
      }
      throw new Error("TODO");
    }    
    
    function arrayConstructor(application, operands, objectAddress, stack, benva, store, time, state, c)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var arrayBenv = createArray();
      var arrayAddress = ag.array(application, time);
      var l = operands[0];
      var lengthAddress = ag.objectProperty(arrayAddress, "length");
      arrayBenv = arrayBenv.add(lattice.U_LENGTH, lengthAddress);
      var allocResult = c.e.allocAval(lengthAddress, l, stack, store, state, c);
      allocResult = c.e.allocAval(arrayAddress, arrayBenv, stack, allocResult.store, allocResult.state);
      store = allocResult.store;
      state = allocResult.state;
      return cont.execute(stack2.addFirst(c.l.abst1(arrayAddress)), store, time, state, c);
    }    
    
    function arrayPush(application, operands, objectAddress, stack, benva, store, time, state, c)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
     
      var arg0aa = operands[0];
                    
      var lookupResult = c.e.lookupAval(objectAddress, stack, store, state, c);
      var receiver = lookupResult.value;
      state = lookupResult.state;
      var lreceiveraa = receiver.lookup(c.l.U_LENGTH).addresses;
      if (lreceiveraa.length === 0)
      {
        // this branch is untested (need apply or call)
        var newPropertyAddress = ag.objectProperty(objectAddress, c.l.U_0.ToString());
        receiver = receiver.add(lattice.U_0.ToString(), newPropertyAddress);
        var allocResult = c.e.allocAval(newPropertyAddress, arg0aa, stack, store, state, c);
        store = allocResult.store;
        state = allocResult.state;
        var lengthPropertyAddress = ag.objectPropery(objectAddress, c.l.U_LENGTH);
        receiver = receiver.add(lattice.U_LENGTH, lengthPropertyAddress);
        allocResult = c.e.allocAval(lengthPropertyAddress, c.l.J_0, stack, store, state, c);
        store = allocResult.store;
        state = allocResult.state;
        var updateResult = c.e.sideEffectAval(objectAddress, receiver, stack, store, state, c);
        store = updateResult.store;
        state = updateResult.state;
        return cont.execute(stack2.addFirst(arg0aa), store, time, state, c);                                                                            
      }
      else
      {
        var laResult = c.e.doLookupAddresses(lreceiveraa, stack, store, state, c);
        var lreceiveru = laResult.value.user;
        var newPropertyAddress = ag.objectProperty(objectAddress, lreceiveru.ToString());
        receiver = receiver.add(lreceiveru.ToString(), newPropertyAddress);
        var allocResult = c.e.allocAval(newPropertyAddress, arg0aa, stack, store, laResult.state);
        store = allocResult.store;
        state = allocResult.state;
        var updateResult = c.e.sideEffectAval(objectAddress, receiver, stack, store, state, c);
        store = updateResult.store;
        state = updateResult.state;
        var newLength = c.l.userLattice.add(lreceiveru, c.l.U_1);
        lreceiveraa.forEach(
          function (lengthAddress) 
          {
            var updateResult = c.e.updateAval(lengthAddress, new JipdaValue(newLength, []), stack, store, state, c);
            store = updateResult.store;
            state = updateResult.state;
          });
        return cont.execute(stack2.addFirst(arg0aa), store, time, state, c);                                                                                  
      }
    }
    
    function arrayConcat(application, operands, objectAddress, stack, benva, store, time, state, c)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
     
      var arg0aa = operands[0];

      var lookupResult = c.e.lookupAval(objectAddress, stack, store, state, c);
      var receiver = lookupResult.value;
      state = lookupResult.state;
      var lreceiveraa = receiver.lookup(c.l.U_LENGTH).addresses;
      var laResult = c.e.doLookupAddresses(arg0aa.addresses(), stack, store, state, c);
      var arg0 = laResult.value;
      laResult = c.e.doLookupAddresses(lreceiveraa, stack, store, laResult.state, c);
      var lreceiveru = laResult.value.user;
      var larg0aa = arg0.lookup(c.l.U_LENGTH).addresses;
      laResult = c.e.doLookupAddresses(larg0aa, stack, store, laResult.state, c);
      var larg0 = laResult.value;
      var larg0u = larg0.user;
      var result = c.createArray();
      var resulta = c.a.array(application, time);
      return arrayCopy(receiver, c.l.U_0, result, resulta, c.l.U_0, lreceiveru, stack, store, laResult.state, c,
        function (result, index, store, state, c)
        {
          return arrayCopy(arg0, lattice.U_0, result, resulta, index, larg0u, stack, store, state, c, 
            function (result, index, store, state, c)
            {
              var lengthPropertya = ag.objectProperty(resulta, c.l.U_LENGTH);
              result = result.add(c.l.U_LENGTH, lengthPropertya);
              var allocResult = c.e.allocAval(lengthPropertya, new JipdaValue(index, []), stack, store, state, c);
              allocResult = c.e.allocAval(resulta, result, stack, allocResult.store, allocResult.state, c);
              store = allocResult.store;
              state = allocResult.state;
              return cont.execute(stack2.addFirst(c.l.abst1(resulta)), store, time, state, c);                                                                                  
            });
        });
    } 
    
    function arrayMap(application, operands, thisa, stack, benva, store, time, state, c)
    {
      // TODO ToObject(thisa)
      // TODO best way to solve this?
      var lookupResult = c.e.lookupAval(thisa, stack, store, state, c);
      var receiver = lookupResult.value;
      state = lookupResult.state;
      var lena = receiver.lookup(lattice.U_LENGTH).addresses;
      var laResult = c.e.doLookupAddresses(lena, stack, store, state, c);
      var lenValue = laResult.value;
      state = laResult.state;
      
      function arrayMapToUInt32Cont()
      {
        return new Cont("arrayMapToUInt32-"+application.tag, benva,
          function (stack, store, time, state, c)
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
            
            function arrayMapLoop(k, numAllocedProperties, arr, stack, store, time, state, c)
            {
              while (c.l.userLattice.isTrue(c.l.userLattice.lt(k, lenPrim)))
              {
                var indexAs = receiver.lookup(k.ToString()).addresses;
                if (indexAs.length > 0)
                {
                  var laResult = c.e.doLookupAddresses(indexAs, stack, store, state, c);
                  var indexValue = laResult.value;
                  state = laResult.state;
                  return applyProc2(application, operands[0].addresses(), [indexValue, new JipdaValue(k, []), thisa], t, stack.addFirst(arrayMapCont(k, numAllocedProperties, arr)), benva, store, time, state, c);          
                }
                k = c.l.userLattice.add(k, lattice.U_1);
              }
              
              var lenPropAddr = ag.objectProperty(arrAddr, lattice.U_LENGTH);
              arr = arr.add(lattice.U_LENGTH, lenPropAddr);
              var allocResult = c.e.allocAval(lenPropAddr, new JipdaValue(lenPrim, []), stack, store, state, c);
              store = allocResult.store;
              state = allocResult.state;
              //stack[0..numAllocedProperties] property addresses GC 
              //stack[numAllocedProperties+1] GC
              //stack[numAllocedProperties+2] GC
              var cont = stack[numAllocedProperties + 3];
              var stack2 = stack.slice(numAllocedProperties + 4);
              var allocResult = c.e.allocAval(arrAddr, arr, stack, store, state, c);
              return cont.execute(stack2.addFirst(new JipdaValue(BOT, [arrAddr])), allocResult.store, time, allocResult.state, c);            
            }
            
            function arrayMapCont(k, numAllocedProperties, arr)
            {
              return new Cont("arrayMap-"+application.tag+"-"+k, benva,
                function (stack, store, time, state, c)
                {
                  var value = stack[0];
                  var stack2 = stack.slice(1);
                  var valuePropAddr = ag.objectProperty(arrAddr, k.ToString());
                  arr = arr.add(k.ToString(), valuePropAddr);
                  var allocResult = c.e.allocAval(valuePropAddr, value, stack, store, state, c);
                  store = allocResult.store;
                  state = allocResult.state;
                  return arrayMapLoop(c.l.userLattice.add(k, lattice.U_1), numAllocedProperties + 1, arr, stack2.addFirst(valuePropAddr), store, time, state, c);
                });
            }
            
            return arrayMapLoop(lattice.U_0, 0, arr, stack, store, time, state, c);            
          });
      }
      
      // add receiver, mapped function to rootset
      var stack2 = stack.addFirst(thisa).addFirst(operands[0]);
      return ToUInt32(lenValue, application, stack2.addFirst(arrayMapToUInt32Cont()), benva, store, time, state, c);
    }
    
    function arrayReduce(application, operands, thisa, stack, benva, store, time, state, c)
    {
      // TODO ToObject(thisa)
      // TODO best way to solve this?
      var lookupResult = c.e.lookupAval(thisa, stack, store, state, c);
      var receiver = lookupResult.value;
      state = lookupResult.state;
      var lena = receiver.lookup(lattice.U_LENGTH).addresses;
      var laResult = c.e.doLookupAddresses(lena, stack, store, state, c);
      var lenValue = laResult.value;
      state = laResult.state;
      
      function arrayReduceToUInt32Cont()
      {
        return new Cont("arrayReduceToUInt32-"+application.tag, benva,
          function (stack, store, time, state, c)
          {
            var lenPrim = stack[0].user;
            var k = lattice.U_0;
            if (operands[1])
            {
              return arrayReduceLoop(k, operands[1], stack, store, time, state, c);
            }
            else
            {
              if (c.l.userLattice.isTrue(c.l.userLattice.eqq(lenPrim, lattice.U_0)))
              {
                var stack2 = stack.slice(1);
                return performThrow(c.l.abst1("Type error"), application, stack2, benva, store, time, state, c);
              }
              while (c.l.userLattice.isTrue(c.l.userLattice.lt(k, lenPrim)))
              {
                var indexAs = receiver.lookup(k.ToString()).addresses;
                if (indexAs.length > 0)
                {
                  var laResult = c.e.doLookupAddresses(indexAs, stack, store, state, c);
                  initial = laResult.value;
                  state = laResult.state;
                  return arrayReduceLoop(c.l.userLattice.add(k, lattice.U_1), initial, stack, store, time, state, c);
                }
                k = c.l.userLattice.add(k, lattice.U_1);
              }              
            }
            
            function arrayReduceLoop(k, result, stack, store, time, state, c)
            {
              while (c.l.userLattice.isTrue(c.l.userLattice.lt(k, lenPrim)))
              {
                var indexAs = receiver.lookup(k.ToString()).addresses;
                if (indexAs.length > 0)
                {
                  var laResult = c.e.doLookupAddresses(indexAs, stack, store, state, c);
                  var indexValue = laResult.value;
                  state = laResult.state;
                  var stack2 = stack.slice(1);
                  return applyProc2(application, operands[0].addresses(), [result, indexValue, new JipdaValue(k, []), thisa], undefined/*this*/, stack2.addFirst(arrayReduceCont(k)), benva, store, time, state, c);          
                }
                k = c.l.userLattice.add(k, lattice.U_1);
              }
              //stack[0] index value
              //stack[1] GC
              //stack[2] GC
              var cont = stack[3];
              var stack2 = stack.slice(4);
              return cont.execute(stack2.addFirst(result), store, time, state, c);            
            }
            
            function arrayReduceCont(k)
            {
              return new Cont("arrayReduce-"+application.tag+"-"+k, benva,
                function (stack, store, time, state, c)
                {
                  var result = stack[0];
                  return arrayReduceLoop(c.l.userLattice.add(k, lattice.U_1), result, stack, store, time, state, c);
                });
            }
          });
      }
      
      // add receiver, reducer to rootset
      var stack2 = stack.addFirst(thisa).addFirst(operands[0]);
      return ToUInt32(lenValue, application, stack2.addFirst(arrayReduceToUInt32Cont()), benva, store, time, state, c);
    }

    function arrayFilter(application, operands, thisa, stack, benva, store, time, state, c)
    {
      // TODO ToObject(thisa)
      // TODO best way to solve this?
      var lookupResult = c.e.lookupAval(thisa, stack, store, state, c);
      var receiver = lookupResult.value;
      state = lookupResult.state;
      var lena = receiver.lookup(lattice.U_LENGTH).addresses;
      var laResult = c.e.doLookupAddresses(lena, stack, store, state, c);
      var lenValue = laResult.value;
      state = laResult.state;
      
      function arrayFilterToUInt32Cont() // TODO numAllocedProperties is concrete integer (used as index), k is abstract???
      { // but numAP is also used to slice stuff of stack... make two counters: concrete and abst?
        // Points against: every JS conc value should be abstractable
        return new Cont("arrayFilterToUInt32-"+application.tag, benva,
          function (stack, store, time, state, c)
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
            
            function arrayFilterLoop(k, numAllocedProperties, arr, stack, store, time, state, c)
            {
              while (c.l.userLattice.isTrue(c.l.userLattice.lt(k, lenPrim)))
              {
                var indexAs = receiver.lookup(k.ToString()).addresses;
                if (indexAs.length > 0)
                {
                  var laResult = c.e.doLookupAddresses(indexAs, stack, store, state, c);
                  var indexValue = laResult.value;
                  state = laResult.state;
                  return applyProc2(application, operands[0].addresses(), [indexValue, new JipdaValue(k, []), thisa], t, stack.addFirst(arrayFilterCont(k, indexValue, numAllocedProperties, arr)), benva, store, time, state, c);          
                }
                k = c.l.userLattice.add(k, c.l.U_1);
              }
              
              var lenPropAddr = ag.objectProperty(arrAddr, c.l.U_LENGTH);
              arr = arr.add(lattice.U_LENGTH, lenPropAddr);
              var allocResult = c.e.allocAval(lenPropAddr, c.l.abst1(numAllocedProperties), stack, store, state, c);
              store = allocResult.store;
              state = allocResult.state;
              //stack[0..numAllocedProperties] property addresses GC 
              //stack[numAllocedProperties+1] GC
              //stack[numAllocedProperties+2] GC
              var cont = stack[numAllocedProperties + 3];
              var stack2 = stack.slice(numAllocedProperties + 4);
              var allocResult = c.e.allocAval(arrAddr, arr, stack, store, state, c);
              return cont.execute(stack2.addFirst(new JipdaValue(BOT, [arrAddr])), allocResult.store, time, allocResult.state, c);            
            }
            
            function arrayFilterCont(k, indexValue, numAllocedProperties, arr)
            {
              return new Cont("arrayFilter-"+application.tag+"-"+k, benva,
                function (stack, store, time, state, c)
                {
                  var value = toUserBoolean(stack[0]);
                  var stack2 = stack.slice(1);
                  if (c.l.userLattice.isTrue(value))
                  {
                    var propName = c.l.userLattice.abst1(String(numAllocedProperties));
                    var valuePropAddr = ag.objectProperty(arrAddr, propName);
                    arr = arr.add(propName, valuePropAddr);
                    var allocResult = c.e.allocAval(valuePropAddr, indexValue, stack, store, state, c);
                    store = allocResult.store;
                    state = allocResult.state;
                    return arrayFilterLoop(c.l.userLattice.add(k, lattice.U_1), numAllocedProperties + 1, arr, stack2.addFirst(valuePropAddr), store, time, state, c);                    
                  }
                  if (c.l.userLattice.isFalse(value))
                  {
                    return arrayFilterLoop(c.l.userLattice.add(k, lattice.U_1), numAllocedProperties, arr, stack2, store, time, state, c);
                  }
                  return [new Task("Array.prototype.filter true",
                            function ()
                            { // copied
                              var propName = c.l.userLattice.abst1(String(numAllocedProperties));
                              var valuePropAddr = ag.objectProperty(arrAddr, propName);
                              arr = arr.add(propName, valuePropAddr);
                              var allocResult = c.e.allocAval(valuePropAddr, indexValue, stack, store, state, c);
                              store = allocResult.store;
                              state = allocResult.state;
                              return arrayFilterLoop(c.l.userLattice.add(k, lattice.U_1), numAllocedProperties + 1, arr, stack2.addFirst(valuePropAddr), store, time, state, c);                                        
                            }),
                          new Task("Array.prototype.filter false",
                            function ()
                            { // copied
                              return arrayFilterLoop(c.l.userLattice.add(k, lattice.U_1), numAllocedProperties, arr, stack2, store, time, state, c);                            
                            })];
                });
            }
            return arrayFilterLoop(c.l.U_0, 0, arr, stack, store, time, state, c);            
          });
      }
      
      // add receiver, filter function to rootset
      var stack2 = stack.addFirst(thisa).addFirst(operands[0]);
      return ToUInt32(lenValue, application, stack2.addFirst(arrayFilterToUInt32Cont()), benva, store, time, state, c);
    }    
    
    function mathSqrt(application, operands, objectAddress, stack, benva, store, time, state, c)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var u = toUserNumber(operands[0], store);
      var r = c.l.userLattice.sqrt(u);
      var j = new JipdaValue(r, []);
      return cont.execute(stack2.addFirst(j), store, time, state, c);
    }
    
    function $meta(application, operands, objectAddress, stack, benva, store, time, state, c)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var str = operands[0].conc()[0];
      var value = c.l.abst1(eval(str));
      return cont.execute(stack2.addFirst(value), store, time, state, c);
    }
    
    function $join(application, operands, thisa, stack, benva, store, time, state, c)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var value = operands.reduce(Lattice.join, BOT);
      print(value);
      return cont.execute(stack2.addFirst(value), store, time, state, c);
    }    
    
    function _print(application, operands, objectAddress, stack, benva, store, time, state, c)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      print.apply(null, operands);
      return cont.execute(stack2.addFirst(lattice.J_UNDEFINED), store, time, state, c);
    }    
    // END PRIMITIVES
    
    // BEGIN HELPERS
    function arrayCopy(srcBenv, srcPos, dstBenv, dsta, dstPos, l, stack, store, state, c, fcont)
    {
      var i = c.l.U_0;
      while (c.l.userLattice.isTrue(c.l.userLattice.lt(i, l)))
      {
        var srcvalueaa = srcBenv.lookup(c.l.userLattice.add(i, srcPos).ToString()).addresses;
        var laResult = c.e.doLookupAddresses(srcvalueaa, stack, store, state, c);
        var srcvalue = laResult.value;
        var dstName = c.l.userLattice.add(i, dstPos).ToString();
        var dstindexa = c.a.objectProperty(dsta, dstName);
        dstBenv = dstBenv.add(dstName, dstindexa);
        var allocResult = c.e.allocAval(dstindexa, srcvalue, stack, store, laResult.state, c);
        store = allocResult.store;
        state = allocResult.state;
        i = c.l.userLattice.add(i, c.l.U_1);
      }
      return fcont(dstBenv, c.l.userLattice.add(i, dstPos), store, state, c);
    }
    // END HELPERS
    
    return store;
  }
  
  
  function evalGlobal(node, config)
  {
    var result = [];
    
    var exitCont = new Cont("exit-" + node.tag, GLOBALA,
    function (stack, store, time, state, c0)
    {
      var state2 = state.returnsResult(stack[0], store); 
      result = result.addFirst(state2); 
      return [];
    });
    
    var store = config.store || store0;
    var time = config.time || time0;
    var state = config.state || new State();
    var benv = config.benv || GLOBALA;
    var c0 = 
    { l:lattice,
      v:visited, 
      a:ag, 
      k:k, 
      e:evaluator, 
      OBJECTPA:OBJECTPA, 
      GLOBALA:GLOBALA, 
      createObject:createObject, 
      createClosure:createClosure, 
      createEnvironment:createEnvironment, 
      createArray:createArray}
    
    var tasks = [new Task("evalGlobal", function () { return evaluator.evalNode(node, [exitCont], benv, store, time, state, c0);})];
    taskRunner(tasks);
    return result;
  }
  
  function toString()
  {
    return "JIPDA [performGc " + performGc + " k " + k + " primLattice " + userLattice + " ag " + ag + " visited " + visited + " benvFactory " + benvFactory + "]";
  }
      
  var store0 = new Store();
  store0 = createGlobal(store0);
  var time0 = new Time(); 
  return {lattice:lattice, globalObject:GLOBALA, globalStore: store0, evalGlobal: evalGlobal, toString:toString};
}

function jipdaRepl(k, n)
{
  var lat = new LatN(n === undefined ? 1 : n);
  var jipda = new Jipda({k:k||4, lattice:lat, ag: timeDefaultAg});
  var store = undefined;
  print("I am Jipda!");
  while (true)
  {
    putstr("jipda> ");
    var src = readline();
    if (":q".equals(src))
    {
      print("Bye!");
      break;
    }
    var state = new ResultState();
    try
    {
      jipda.evalGlobal(createAst(src), {state:state, store:store});    
      value = state.result;
      print(value);
      store = state.store;
    }
    catch (e)
    {
      print(e);
      print(e.stack);
    }
  }
}

function concRepl()
{
  var lat = new CpLattice();
  var concreteVisited = {};
  concreteVisited.visited = function (node, stack, benva, store, time) { return store };
  var jipda = new Jipda({k:0, lattice:lat, ag: concreteAg, visited: concreteVisited});
  var store = undefined;
  print("I am Jipda!");
  while (true)
  {
    putstr("conc> ");
    var src = readline();
    if (":q".equals(src))
    {
      print("Bye!");
      break;
    }
    var state = new ResultState();
    try
    {
      jipda.evalGlobal(createAst(src), {state:state, store:store});    
      var printer = new ConcretePrinter(lat, state.store);
      print(state.result.accept(printer));
      store = state.store;
    }
    catch (e)
    {
      print(e);
      print(e.stack);
    }
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



