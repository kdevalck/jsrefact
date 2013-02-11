function State()
{
  this.returnsResult =
    function (value, store)
    {
      return this;
    }
    
  this.readsAddress =
    function (address, value, stack)
    {
      return this;
    }
    
  this.writesAddress =
    function (address, value, stack)
    {
      return this;
    }
    
  this.allocsAddress =
    function (address, value, stack)
    {
      return this;
    }
  
  this.createsEnvironment =
    function (sourceNode, declarationNode, env)
    {
      return this;
    }
  
  this.appliesFunction =
    function (app, func, env, ths)
    {
      return this;
    }
  
  this.leavesFunction =
    function (app, func, env, ths)
    {
      return this;
    }
  
  this.returns =
    function (value, application)
    {
      return this;
    }
}

function ProductState(states)
{
  this.states = states;
}
ProductState.prototype = new State();

ProductState.prototype.join =
  function (state)
  {
    var newStates = [];
    if (state === BOT)
    {
      return this;
    }
    for (var i = 0; i < this.states.length; i++)
    {
      newStates[i] = this.states[i].join(state.states[i]);
    }
    return new ProductState(newStates);
  }

ProductState.prototype.returnsResult = 
  function (value, store)
  {
    var newStates = this.states.map(
      function (state)
      {
        return state.returnsResult(value, store);
      });
    return new ProductState(newStates);
  };
    
ProductState.prototype.readsAddress = 
  function (address, value, stack)
  {
    var newStates = this.states.map(
      function (state)
      {
        return state.readsAddress(address, value, stack);
      });
    return new ProductState(newStates);
  };
      
ProductState.prototype.writesAddress = 
  function (address, value, stack)
  {
    var newStates = this.states.map(
      function (state)
      {
        return state.writesAddress(address, value, stack);
      });
    return new ProductState(newStates);
  };
            
ProductState.prototype.allocsAddress = 
  function (address, value, stack)
  {
    var newStates = this.states.map(
      function (state)
      {
        return state.allocsAddress(address, value, stack);
      });
    return new ProductState(newStates);
  };
                
ProductState.prototype.createsEnvironment = 
  function (sourceNode, declarationNode, env)
  {
    var newStates = this.states.map(
      function (state)
      {
        return state.createsEnvironment(sourceNode, declarationNode, env);
      });
    return new ProductState(newStates);
  };
                  
ProductState.prototype.appliesFunction = 
  function (app, func, env, ths)
  {
    var newStates = this.states.map(
      function (state)
      {
        return state.appliesFunction(app, func, env, ths);
      });
    return new ProductState(newStates);
  };
                    
ProductState.prototype.returns = 
  function (value, application)
  {
    var newStates = this.states.map(
      function (state)
      {
        return state.returns(value, application);
      });
    return new ProductState(newStates);
  };
                      

function ResultState(result, store)
{
  this.result = result || BOT;
  this.store = store || BOT;
}
ResultState.prototype = new State();

ResultState.prototype.join =
  function (state)
  {
//    if (state === BOT)
//    {
//      return this;
//    }
//    return new ResultState(this.result.join(state.result), this.store.join(state.store));
    return this; // side-effecting states don't need element-wise join
  }

ResultState.prototype.returnsResult =
  function (value, store)
  {
    if (!this.result.join)
    {
      print("no join", this.result, this.result.constructor);
    }
    assertDefinedNotNull(value.join);
    this.result = this.result.join(value);
    this.store = this.store.join(store);
    return this;
  };  
  
function DepState()
{
  this.reads = [];
  this.writes = [];
}
DepState.prototype = new State();

function stackApplications(stack)
{
  var applications = [];
  for (var i = 0; i < stack.length; i++)
  {
    var elem = stack[i];
    if (elem instanceof Cont)
    {
      applications = applications.concat(elem.applications);
    }
  }
  return applications;
}

DepState.prototype.readsAddress = 
  function (address, value, stack)
  {
    stackApplications(stack).forEach(
      function (application) 
      {
        this.reads = this.reads.updateSetEntry(application, address);        
      }, this);
    return this;
  };
    
DepState.prototype.writesAddress = 
  function (address, value, stack)
  {
    stackApplications(stack).forEach(
      function (application) 
      {
        this.writes = this.writes.updateSetEntry(application, address);
      }, this);
    return this;
  };
      
DepState.prototype.addressesRead =
  function (application)
  {
    return this.reads.getSetEntry(application);
  };

DepState.prototype.addressesWritten =
  function (application)
  {
    return this.writes.getSetEntry(application);
  };
      
      
DepState.prototype.varReadBy =
  function (vr)
  {
    return this.reads.flatMap(
      function (entry)
      {
        return entry[1].flatMap(
          function (varAddress)
          {
            return (varAddress.base === vr) ? [entry[0]] : [];
          });
      });
  };

DepState.prototype.varWrittenBy =
  function (vr)
  {
    return this.writes.flatMap(
      function (entry)
      {
        return entry[1].flatMap(
          function (varAddress)
          {
            return (varAddress.base === vr) ? [entry[0]] : [];
          });
      });
  };
      
DepState.prototype.readVars =
  function (node)
  {
    var vsthis = isCallExpression(node) ? this.addressesRead(node) : [];
    var cs = children(node).filter(function (n) { return !isFunctionExpression(n) });
    var vscs = cs.flatMap(this.readVars, this);
    return append(vsthis, vscs);
  };

DepState.prototype.writtenVars =
  function (node)
  {
    var vsthis = isCallExpression(node) ? this.addressesWritten(node) : [];
    var cs = children(node).filter(function (n) { return !isFunctionExpression(n) });
    var vscs = cs.flatMap(this.writtenVars, this);
    return append(vsthis, vscs);
  };

