goog.provide('jipdaeval');

var jseval = {} ;

jseval.allocAval =
  function (address, value, stack, store, state, c)
  {
    var store2 = store.allocAval(address, value);
    var state2 = state.allocsAddress(address, value, stack);
    return {store:store2, state:state2};
  }

jseval.lookupAval =
  function (address, stack, store, state, c)
  {
    var result = store.lookupAval(address);
    var state2 = state.readsAddress(address, result, stack);
    return {value:result, state:state2};
  }

jseval.updateAval =
  function (address, value, stack, store, state, c)
  {
    var store2 = store.updateAval(address, value);
    var state2 = state.writesAddress(address, value, stack);
    return {store:store2, state:state2};
  }

jseval.sideEffectAval =
  function (address, value, stack, store, state, c)
  {
    var store2 = store.updateAval(address, value);
    var state2 = state.writesAddress(address, value, stack);
    return {store:store2, state:state2};
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
  //  print("vds", vds);
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

jseval.doLookupAddresses =
  function (addresses, stack, store, state, c)
  {
    var result = BOT;
    addresses.forEach(
      function (address)
      {
        var lookupResult = c.e.lookupAval(address, stack, store, state, c);
        var aval = lookupResult.value;
        result = result.join(aval);
        state = lookupResult.state;
      });
    return {value:result, state:state};
  } 

// TODO this function returns addresses, while doProtoLookup returns values
jseval.doScopeLookup =
  function (name, stack, benva, store, state, c)
  {
    var resultas = [];
    var benvas = [benva];
    while (benvas.length !== 0)
    {
      var a = benvas[0];
      benvas = benvas.slice(1);
      var lookupResult = c.e.lookupAval(a, stack, store, state, c);
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

jseval.doProtoLookup =
  function (object, propertyName, stack, store, state, c)
  {
    var objects = [object];
    var result = BOT;
    while (objects.length > 0)
    {
      var object = objects[0];
      objects = objects.slice(1);
  //    print("protoLookup", propertyName, "in", object.names(), "for", object);
      var lookup = object.lookup(propertyName);
      var propertyAddresses = lookup.addresses;
      if (propertyAddresses.length === 0)
      {
        if (object.Prototype.equals(c.l.J_NULL))
        {
           result = result.join(c.l.J_UNDEFINED);
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
              var lookupResult = c.e.lookupAval(protoAddress, stack, store, state, c);
              var protoObject = lookupResult.value;
              state = lookupResult.state;
              objects = objects.addLast(protoObject);         
            });
        }
      }
      else
      {
        var laResult = c.e.doLookupAddresses(propertyAddresses, stack, store, state, c);
        result = result.join(laResult.value);
        state = laResult.state;
        if (lookup.directMatch)
        {
          break;
        }
      }
    }
    return {value:result, state:state};
  }
  
jseval.evalLiteral =
  function (node, stack, benva, store, time, state, c)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    return cont.execute(stack2.addFirst(c.l.abst1(node.value)), store, time, state, c);
  }

jseval.evalIdentifier =
  function (node, stack, benva, store, time, state, c)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    var scopeResult = c.e.doScopeLookup(c.l.userLattice.abst1(node.name), stack, benva, store, state, c);
    var as = scopeResult.as;
    state = scopeResult.state;
    if (as.length === 0)
    {
      throw new Error("no addresses for " + node);
      //return cont.execute(stack2.addFirst(c.l.abst([eval(node.name)])), time, state, c); SEMANTIC OVERLAP
    }
    var result = BOT;
    var laResult = c.e.doLookupAddresses(as, stack, store, state, c);
    return cont.execute(stack2.addFirst(laResult.value), store, time, laResult.state, c);
  }

jseval.evalBinaryExpression =
  function (node, stack, benva, store, time, state, c)
  {
    var leftNode = node.left;
    var rightNode = node.right;
  
    function leftCont()
    {
      function rightCont()
      {
        
        function mul(stack, store, time, state, c)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = c.l.userLattice.mul(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
        }
        function sub(stack, store, time, state, c)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = c.l.userLattice.sub(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
        }
        function div(stack, store, time, state, c)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = c.l.userLattice.div(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
        }
        function rem(stack, store, time, state, c)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = c.l.userLattice.rem(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
        }
        function lt(stack, store, time, state, c)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = c.l.userLattice.lt(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
        }
        function lte(stack, store, time, state, c)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = c.l.userLattice.lte(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
        }
        function gt(stack, store, time, state, c)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = c.l.userLattice.gt(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
        }
        function gte(stack, store, time, state, c)
        {
          var right = stack[0];
          var left = stack[1];
          var cont = stack[2];
          var stack2 = stack.slice(3);
          var result = c.l.userLattice.gte(left.user, right.user);
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
        }
        
        // 11.9.3
        function eq(eqFlag, stack, store, time, state, c)
        {
          var rightAval = stack[0];
          var leftAval = stack[1];
          var eqResult = BOT; // primitive value
          var lasl = leftAval.as.length;
          var rasl = rightAval.as.length;
          
          if (leftAval.user !== BOT && rightAval.user !== BOT)
          {
            eqResult = eqResult.join(eqFlag ? c.l.userLattice.eq(leftAval.user, rightAval.user) : c.l.userLattice.neq(leftAval.user, rightAval.user));
          }
          
          // only primitives: done (shortcut)
          if (lasl === 0 && rasl === 0)
          {
            var cont = stack[2];
            var stack2 = stack.slice(3);
            return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state, c);                                      
          }
          else if (lasl === 1 && rasl === 1)
          {
            if (leftAval.as[0].equals(rightAval.as[0]))
            {
              eqResult = eqResult.join(eqFlag ? c.l.U_TRUE : c.l.U_FALSE);
            }
            else
            {
              eqResult = eqResult.join(eqFlag ? c.l.U_FALSE : c.l.U_TRUE);
            }
          }
          else if (lasl > 0 && rasl > 0)
          {
            eqResult = eqResult.join(eqFlag ? c.l.U_FALSE : c.l.U_TRUE);
            var intersection = leftAval.as.keepAll(rightAval.as);
            if (intersection.length > 0)
            {
              eqResult = eqResult.join(eqFlag ? c.l.U_TRUE : c.l.U_FALSE);
            }
          }
          
          // only addresses: done (shortcut)
          if (leftAval.user === BOT && rightAval.user === BOT)
          {
            var cont = stack[2];
            var stack2 = stack.slice(3);
            return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state, c);                                                        
          }
          
          function eqLeftRightCont(leftStrNum, eqResult)
          {
            return new Cont("eqLeftRight-" + node.tag, benva,
              function (stack, store, time, state, c)
              {
                var rightPrim = stack[0];
                // [1] [2] rightAval leftAval
                var cont = stack[3];
                var stack2 = stack.slice(4);
                eqResult = eqResult.join(eqFlag ? c.l.userLattice.eq(leftStrNum, rightPrim.user) : c.l.userLattice.neq(leftStrNum, rightPrim.user));
                return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state, c);                                      
              });
          }                
          
          if (leftAval.as.length !== 0)
          {
            function eqRightCont(rightStrNum, eqResult)
            {
              return new Cont("eqRight-" + rightNode.tag, benva,
                function (stack, store, time, state, c)
                {                      
                  var leftPrim = stack[0];
                  eqResult = eqResult.join(eqFlag ? c.l.userLattice.eq(leftPrim.user, rightStrNum) : c.l.userLattice.neq(leftPrim.user, rightStrNum));
                  // start clone
                  if (rightAval.as.length !== 0) 
                  {
                    var leftStrNum = leftAval.user.limitStringNumber();
                    if (leftStrNum !== BOT)
                    {
                      var isOnlyStrNum = (leftStrNum.equals(leftAval.user));
                      if (!isOnlyStrNum)
                      {
                        eqResult = eqResult.join(eqFlag ? c.l.U_FALSE : c.l.U_TRUE);
                      }
                      var stack2 = stack.slice(1);
                      return c.e.DefaultValue(rightAval.as, undefined, rightNode, stack2.addFirst(eqLeftRightCont(eqResult, leftStrNum)), benv, store, time, state, c);                      
                    }
                    else
                    {
                      eqResult = eqResult.join(eqFlag ? c.l.U_FALSE : c.l.U_TRUE);
                    }
                  }
                  // end clone
                  
                  // [1] [2] rightAval leftAval
                  var cont = stack[3];
                  var stack2 = stack.slice(4);
                  return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state, c);                        
                });
            }
            
            var rightStrNum = rightAval.user.limitStringNumber();
            if (rightStrNum !== BOT)
            {
              var isOnlyStrNum = (rightStrNum.equals(rightAval.user));
              if (!isOnlyStrNum)
              {
                eqResult = eqResult.join(eqFlag ? c.l.U_FALSE : c.l.U_TRUE);
              }
              return c.e.DefaultValue(leftAval.as, undefined, leftNode, stack.addFirst(eqRightCont(rightStrNum, eqResult)), benva, store, time, state, c);                      
            }
            else
            {
              eqResult = eqResult.join(eqFlag ? c.l.U_FALSE : c.l.U_TRUE);
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
                eqResult = eqResult.join(eqFlag ? c.l.U_FALSE : c.l.U_TRUE);
              }
              return c.e.DefaultValue(rightAval.as, undefined, rightNode, stack.addFirst(eqLeftRightCont(leftStrNum, eqResult)), benva, store, time, state, c);                      
            }
            else
            {
              eqResult = eqResult.join(eqFlag ? c.l.U_FALSE : c.l.U_TRUE);
            }
          }
          var cont = stack[2];
          var stack2 = stack.slice(3);
          return cont.execute(stack2.addFirst(new JipdaValue(eqResult, [])), store, time, state, c);                                      
        }
  
        
        return new Cont("binr-" + rightNode.tag, benva,
          function (stack, store, time, state, c)
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
                  result = result.join(c.l.userLattice.add(leftAval.user, rightAval.user));
                }
                
                if (lasl === 0 && rasl === 0)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                  
                }
                
                if (lasl > 0)
                {
                  function addLeftCont(result)
                  {
                    return new Cont("addl-" + leftNode.tag, benva,
                      function (stack, store, time, state, c)
                      {
                        var lprim = stack[0].user;
  
                        if (rightAval.user !== BOT)
                        {
                          result = result.join(c.l.userLattice.add(lprim, rightAval.user));
                        }
                        if (rasl > 0)
                        {
                          function addLeftRightCont(result)
                          {
                            return new Cont("addlr-" + rightNode.tag, benva,
                              function (stack, store, time, state, c)
                              {
                                var rprim = stack[0].user;
                                if (leftAval.user !== BOT)
                                {
                                  result = result.join(c.l.userLattice.add(leftAval.user, rprim));
                                }
                                result = result.join(c.l.userLattice.add(lprim, rprim));
                                var cont = stack[4];
                                var stack2 = stack.slice(5);
                                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                                                  
                              });
                          }
                          return c.e.DefaultValue(rightAval.as, undefined, leftNode, stack.addFirst(addLeftRightCont(result)), benva, store, time, state, c);                          
                        }
                        var cont = stack[3];
                        var stack2 = stack.slice(4);
                        return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                                                                          
                      });
                  }
                  
                  return c.e.DefaultValue(leftAval.as, undefined, leftNode, stack.addFirst(addLeftCont(result)), benva, store, time, state, c);
                }
                
                if (rasl > 0)
                {
                  function addRightCont(result)
                  {
                    return new Cont("addr-" + rightNode.tag, benva,
                      function (stack, store, time, state, c)
                      {
                        var rprim = stack[0].user;
                        result = result.join(c.l.userLattice.add(leftAval.user, rprim)); // luser must be present when lasl == 0
                        var cont = stack[3];
                        var stack2 = stack.slice(4);
                        return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                                                  
                      });
                  }
                  return c.e.DefaultValue(rightAval.as, undefined, leftNode, stack.addFirst(addRightCont(result)), benva, store, time, state, c);                          
                }
                
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                
              }
              case "*":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return mul(stack, store, time, state, c);
                }
                throw new Error("TODO");
              }
              case "-":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return sub(stack, store, time, state, c);
                }
                throw new Error("TODO");
              }
              case "/":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return div(stack, store, time, state, c);
                }
                throw new Error("TODO");
              }
              case "%":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return rem(stack, store, time, state, c);
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
                  result = result.join(c.l.userLattice.eqq(leftAval.user, rightAval.user));
                }
                
                if (lasl === 0 && rasl === 0)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                  
                }
                
                if (lasl === 1 && rasl === 1)
                {
                  if (leftAval.as[0].equals(rightAval.as[0]))
                  {
                    result = result.join(c.l.U_TRUE);
                  }
                  else
                  {
                    result = result.join(c.l.U_FALSE);
                  }
                }
                else if (lasl > 0 && rasl > 0)
                {
                  result = result.join(c.l.U_FALSE);
                  if ((leftAval.as.intersect(rightAval.as)).length > 0)
                  {
                    result = result.join(c.l.U_TRUE);
                  }
                }
                
                if (leftAval.user === BOT && rightAval.user === BOT)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                  
                }
                
                result = result.join(c.l.U_FALSE);
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                
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
                  result = result.join(c.l.userLattice.neqq(leftAval.user, rightAval.user));
                }
                
                if (lasl === 0 && rasl === 0)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                  
                }
                
                if (lasl === 1 && rasl === 1)
                {
                  if (leftAval.as[0].equals(rightAval.as[0]))
                  {
                    result = result.join(c.l.U_FALSE);
                  }
                  else
                  {
                    result = result.join(c.l.U_TRUE);
                  }
                }
                else if (lasl > 0 && rasl > 0)
                {
                  result = result.join(c.l.U_TRUE);
                  if ((leftAval.as.intersect(rightAval.as)).length > 0)
                  {
                    result = result.join(c.l.U_FALSE);
                  }
                }
                
                if (leftAval.user === BOT && rightAval.user === BOT)
                {
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                  
                }
                
                result = result.join(c.l.U_TRUE);
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);                
  
              }
              case "==":
              {
                return eq(true, stack, store, time, state, c);
              }
              case "!=":
              {
                return eq(false, stack, store, time, state, c);
              }
              case "<":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return lt(stack, store, time, state, c);
                }
                throw new Error("TODO");
                // reduce with number!
              }
              case "<=":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return lte(stack, store, time, state, c);
                }
                throw new Error("TODO");
                // reduce with number!
              }
              case ">":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return gt(stack, store, time, state, c);
                }
                throw new Error("TODO");
                // reduce with number!
              }
              case ">=":
              {
                if (leftAval.as.length + rightAval.as.length === 0)
                {
                  return gte(stack, store, time, state, c);
                }
                throw new Error("TODO");
                // reduce with number!
              }
              case "&":
              {
                var lu = toUserInt32(leftAval);
                var ru = toUserInt32(rightAval);
                var result = c.l.userLattice.binand(lu, ru);
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
              }
              case "|":
              {
                var lu = toUserInt32(leftAval);
                var ru = toUserInt32(rightAval);
                var result = c.l.userLattice.binor(lu, ru);
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
              }
              default: throw new Error("cannot handle binary operator " + node.operator);
            }            
          });
      }
      
      return new Cont("binl-" + leftNode.tag, benva,
        function (stack, store, time, state, c)
        {
          return c.e.evalNode(rightNode, stack.addFirst(rightCont()), benva, store, time, state, c);
        });
    }
    
    return c.e.evalNode(leftNode, stack.addFirst(leftCont()), benva, store, time, state, c);
  }

jseval.evalProgram =
  function (node, stack, benva, store, time, state, c)
  {
    var bodyNodes = node.body;
    var hoisted = hoist(bodyNodes);
    if (hoisted.funs.length > 0 || hoisted.vars.length > 0)
    {
      var benv = store.lookupAval(benva);      
      hoisted.funs.forEach(
        function (funDecl)
        {
          var result = c.e.evalHoistedFunctionDeclaration(funDecl, stack, benva, benv, store, time, state, c);
          benv = result.benv;
          store = result.store;
          state = result.state;
        });
      hoisted.vars.forEach(
          function (varDecl)
          {
            var result = c.e.evalHoistedVariableDeclarator(varDecl, stack, benv, store, time, state, c);
            benv = result.benv;
            store = result.store;
            state = result.state;
          });
      var updateResult = c.e.sideEffectAval(benva, benv, stack, store, state, c);
      store = updateResult.store;
      state = updateResult.state;
    }
    
    return c.e.evalStatementList(bodyNodes, stack, benva, store, time, state, c);
  }

jseval.evalHoistedVariableDeclarator =
  function (node, stack, benv, store, time, state, c)
  { 
    var vr = node.id;    
    var address = c.a.variable(vr, time);
    benv = benv.add(c.l.userLattice.abst1(vr.name), address);
    var allocResult = c.e.allocAval(address, c.l.J_UNDEFINED, stack, store, state, c);
    store = allocResult.store;
    state = allocResult.state;
    return {benv: benv, store: store, state: state};      
  } 

  // with last value on stack
jseval.evalStatementList =
  function (nodes, stack, benva, store, time, state, c)
  {
    function statementListCont(i)
    {
      return new Cont("slist-" + nodes[i - 1].tag, benva,
        function (stack, store, time, state, c)
        {
          var statementValue = stack[0];
          var value = stack[1];
          
          // keep track of last value-producing statement (ECMA 12.1 Block, 14 Program)
          if (!statementValue.equals(c.l.J_UNDEFINED))
          {
            value = statementValue;
            var str = value.toString(); value.toString = function () {return str + "|"}; //DEBUG
          }
          
          if (i === nodes.length)
          {
            var cont = stack[2];
            var stack2 = stack.slice(3);
            return cont.execute(stack2.addFirst(value), store, time, state, c);
          }
          var stack2 = stack.slice(2);
          return c.e.evalNode(nodes[i], stack2.addFirst(value).addFirst(statementListCont(i + 1)), benva, store, time, state, c);
        });
    };
    
    if (nodes.length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(c.l.J_UNDEFINED), store, time, state, c);
    }
    if (nodes.length === 1)
    {
      return c.e.evalNode(nodes[0], stack, benva, store, time, state, c);
    }
    return c.e.evalNode(nodes[0], stack.addFirst(c.l.J_UNDEFINED).addFirst(statementListCont(1)), benva, store, time, state, c);
  }

jseval.evalVariableDeclarator =
  function (node, stack, benva, store, time, state, c)
  { 
    var vr = node.id;
  
    function variableDeclaratorCont()
    {
      return new Cont("decl-" + node.init.tag, benva,
        function (stack, store, time, state, c)
        {
          var value = stack[0];
          var cont = stack[1];
          var stack2 = stack.slice(2);
          var scopeResult = c.e.doScopeLookup(c.l.userLattice.abst1(vr.name), stack, benva, store, state, c);
          var as = scopeResult.as;
          state = scopeResult.state;
          if (as.length === 0)
          {
            throw new Error("no addresses for " + node);
          }
          as.forEach(
            function (address)
            {
              var updateResult = c.e.updateAval(address, value, stack, store, state, c);
              store = updateResult.store;
              state = updateResult.state;              
            });
          return cont.execute(stack2.addFirst(c.l.J_UNDEFINED), store, time, state, c);
        });
    }
    
    if (node.init === null)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      return cont.execute(stack2.addFirst(c.l.J_UNDEFINED), store, time, state, c);      
    }
    return c.e.evalNode(node.init, stack.addFirst(variableDeclaratorCont()), benva, store, time, state, c);
  } 

jseval.evalObjectExpression =
  function(node, stack, benv, store, time, state, c)
  {
    var properties = node.properties;
    
    function objectCont(i)
    {
      return new Cont("obj-" + properties[i - 1].value.tag, benv,
        function (stack, store, time, state, c)
        {
          if (i === properties.length)
          {
            var rexps = stack.slice(0, properties.length);
            var cont = stack[properties.length];
            var stack2 = stack.slice(properties.length + 1);
            var obj = c.createObject(c.OBJECTPA);
            var objectAddress = c.a.object(node, time);
            for (var k = properties.length - 1; k > -1; k--)
            {
              var propertyName = c.l.userLattice.abst1(properties[properties.length - k - 1].key.name);
              var propertyAddress = c.a.objectProperty(objectAddress, propertyName);
              obj = obj.add(propertyName, propertyAddress);
              var allocResult = c.e.allocAval(propertyAddress, rexps[k], stack, store, state, c);
              store = allocResult.store;
              state = allocResult.state;
            }
            var allocResult = c.e.allocAval(objectAddress, obj, stack, store, state, c);
            store = allocResult.store;
            state = allocResult.state;
            return cont.execute(stack2.addFirst(c.l.abst1(objectAddress)), store, time, state, c);
          }
          return c.e.evalNode(properties[i].value, stack.addFirst(objectCont(i + 1)), benv, store, time, state, c);
        });
    }
    
    if (properties.length === 0)
    { 
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var obj = c.createObject(c.OBJECTPA);
      var objectAddress = c.a.object(node, time);
      var allocResult = c.e.allocAval(objectAddress, obj, stack, store, state, c);
      store = allocResult.store;
      state = allocResult.state;
      return cont.execute(stack2.addFirst(c.l.abst1(objectAddress)), store, time, state, c);
      //return objectCont(0).execute(stack, time);
    }
    return c.e.evalNode(properties[0].value, stack.addFirst(objectCont(1)), benv, store, time, state, c);
  }

jseval.evalHoistedFunctionDeclaration =
  function (node, stack, benva, benv, store, time, state, c)
  {
    var vr = node.id;
    
    var closure = c.createClosure(node, benva);
    var closureAddress = c.a.closure(node, time);
  
    var prototype = c.createObject(c.OBJECTPA);
    var prototypeObjectAddress = c.a.closureProtoObject(node, time); /*node.body*/
    
    var constructorPropertyAddress = c.a.objectProperty(prototypeObjectAddress, c.l.userLattice.abst1("constructor"));
    var allocResult = c.e.allocAval(constructorPropertyAddress, c.l.abst1(closureAddress), stack, store, state, "constructor");
    store = allocResult.store;
    state = allocResult.state;
    prototype = prototype.add(c.l.userLattice.abst1("constructor"), constructorPropertyAddress);
  
    allocResult = c.e.allocAval(prototypeObjectAddress, prototype, stack, store, state, c);
    store = allocResult.store;
    state = allocResult.state;
  
    var prototypePropertyAddress = c.a.objectProperty(closureAddress, "prototype");
    closure = closure.add(c.l.U_PROTOTYPE, prototypePropertyAddress);
    allocResult = c.e.allocAval(prototypePropertyAddress, c.l.abst1(prototypeObjectAddress), stack, store, state, c);
    allocResult = c.e.allocAval(closureAddress, closure, stack, allocResult.store, allocResult.state, c);
    store = allocResult.store;
    state = allocResult.state;
    
    var vr = node.id;
    var declarationAddress = c.a.variable(vr,time);
    benv = benv.add(c.l.userLattice.abst1(vr.name), declarationAddress);
    allocResult = c.e.allocAval(declarationAddress, c.l.abst1(closureAddress), stack, store, state, c);
    store = allocResult.store;
    state = allocResult.state;
  
    return {benv:benv, store: store, state: state};
  }

jseval.evalFunctionDeclaration =
  function (node, stack, benva, store, time, state, c)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);    
    return cont.execute(stack2.addFirst(c.l.J_UNDEFINED), store, time, state, c);
  }  

jseval.evalFunctionExpression =
  function (node, stack, benva, store, time, state, c)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
  
    var closure = c.createClosure(node, benva);
    var closureAddress = c.a.closure(node, time);
  
    var prototype = c.createObject(c.OBJECTPA);
    var prototypeObjectAddress = c.a.closureProtoObject(node, time); /*node.body*/
    
    var constructorPropertyAddress = c.a.objectProperty(prototypeObjectAddress, c.l.userLattice.abst1("constructor"));
    var allocResult = c.e.allocAval(constructorPropertyAddress, c.l.abst1(closureAddress), stack, store, state, c);
    store = allocResult.store;
    state = allocResult.state;
    prototype = prototype.add(c.l.userLattice.abst1("constructor"), constructorPropertyAddress);
    
    allocResult = c.e.allocAval(prototypeObjectAddress, prototype, stack, store, state, c);
    store = allocResult.store;
    state = allocResult.state;
  
    var prototypePropertyAddress = c.a.objectProperty(closureAddress, "prototype");
    closure = closure.add(c.l.U_PROTOTYPE, prototypePropertyAddress);
    allocResult = c.e.allocAval(prototypePropertyAddress, c.l.abst1(prototypeObjectAddress), stack, store, state, c);
    store = allocResult.store;
    state = allocResult.state;
  
    allocResult = c.e.allocAval(closureAddress, closure, stack, store, state, c);
    store = allocResult.store;
    state = allocResult.state;
    
    return cont.execute(stack2.addFirst(c.l.abst1(closureAddress)), store, time, state, c);
  }

jseval.evalNewExpression =
  function (node, stack, benva, store, time, state, c)
  {
    var calleeNode = node.callee;
    
    function constructorCont()
    {
      var operands = node.arguments;
  
      function operandsCont(i)
      {
        return new Cont("rand-" + operands[i - 1].tag, benva,
          function (stack, store, time, state, c)
          {
            if (operands.length === i)
            {
              return c.e.applyConstructor(node, stack, benva, store, time, state, c);
            }
            return c.e.evalNode(operands[i], stack.addFirst(operandsCont(i + 1)), benva, store, time, state, c);
          });
      }
  
      return new Cont("cons-" + calleeNode.tag, benva,
        function (stack, store, time, state, c)
        {
          if (operands.length === 0)
          {
            return c.e.applyConstructor(node, stack, benva, store, time, state, c);
          }
          return c.e.evalNode(operands[0], stack.addFirst(operandsCont(1)), benva, store, time, state, c);
        });
    }
    
    return c.e.evalNode(calleeNode, stack.addFirst(constructorCont()), benva, store, time, state, c);
  }

jseval.evalAssignmentExpression =
  function (node, stack, benva, store, time, state, c)
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
            function (stack, store, time, state, c)
            {
              var rvalues = stack[0];
              var cont = stack[1];
              var stack2 = stack.slice(2);
              var scopeResult = c.e.doScopeLookup(c.l.userLattice.abst1(left.name), stack, benva, store, state, c);
              var as = scopeResult.as;
              state = scopeResult.state;
              if (as.length === 0)
              {
                throw new Error("no addresses for left-hand side " + left);
              }
              as.forEach(
                  function (address)
                  {
                    var updateResult = c.e.updateAval(address, rvalues, stack, store, state, c);
                    store = updateResult.store;
                    state = updateResult.state;
                  });
              return cont.execute(stack2.addFirst(rvalues), store, time, state, c);
            });
        }
        
        return c.e.evalNode(right, stack.addFirst(varAssignmentCont()), benva, store, time, state, c);
      }
      case "MemberExpression":
      {
        function rightCont()
        {
          function memberAssignmentCont()
          {
            return new Cont("=mem-" + right.tag, benva,
              function (stack, store, time, state, c)
              {
                var rvalues = stack[0];
                var propertyName = stack[1];
                var spn = toUserString(propertyName, store);
                var uspn = spn.ToUInt32();
                var suspn = uspn.ToString();
                var length;
                if (suspn.equals(spn) 
                    && c.l.userLattice.isTrue(c.l.userLattice.lt(uspn, c.l.userLattice.abst1(Ecma.POW_2_32))))
                {
                  length = c.l.userLattice.add(uspn, c.l.U_1);
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
                    var lookupResult = c.e.lookupAval(objectAddress, stack, store, state, c);
                    var object = lookupResult.value;
                    state = lookupResult.state;
                    assertDefinedNotNull(object.lookup, "not a benv at " + objectAddress + ": " + object + " " + object.constructor);
                    var propertyAddresses = object.lookup(spn).addresses;
                    if (propertyAddresses.length === 0)
                    {
                      var propertyAddress = c.a.objectProperty(objectAddress, spn); 
                      object = object.add(spn, propertyAddress);
                      var allocResult = c.e.allocAval(propertyAddress, rvalues, stack, store, state, c);
                      store = allocResult.store;
                      state = allocResult.state;
                      var updateResult = c.e.sideEffectAval(objectAddress, object, stack, store, state, c);
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
                          var updateResult = c.e.updateAval(propertyAddress, rvalues, stack, store, state, c);
                          store = updateResult.store;
                          state = updateResult.state;                                                 
                        });
                    }
                    if (length && object.isArray())
                    {
                      var lengthPropertyAs = object.lookup(c.l.U_LENGTH).addresses; // direct (local) lookup without protochain
                      var laResult = c.e.doLookupAddresses(lengthPropertyAs, stack, store, state, c);
                      state = laResult.state;
                      if (c.l.userLattice.isTrue(c.l.userLattice.lt(laResult.value.user, length)))
                      {
                        lengthPropertyAs.forEach(
                            function (lengthPropertyAddress)
                            {
                              var updateResult = c.e.updateAval(lengthPropertyAddress, new JipdaValue(length, []), stack, store, state, c);
                              store = updateResult.store;
                              state = updateResult.state;
                            }); 
                      }
                    }
                  });
                return cont.execute(stack2.addFirst(rvalues), store, time, state, c);
              });
          }
                
          return new Cont("=right-" + left.tag, benva,
            function (stack, store, time, state, c)
            {           
              return c.e.evalNode(right, stack.addFirst(memberAssignmentCont()), benva, store, time, state, c);
            });
        }
          
        return c.e.evalMemberAddressProperty(left, stack.addFirst(rightCont()), benva, store, time, state, c);
      }
      default:
        throw new Error("evalAssignment: cannot handle left hand side " + left); 
    }
  }

jseval.ToStringCont =
  function (stack, store, time, state, c)
  {
    var value = stack[0];
    if (value.addresses().length === 0)
    {
      var cont = stack[1];
      var stack2 = stack.slice(2);
      var stringValue = new JipdaValue(value.user.ToString(), []);
      return cont.execute(stack2.addFirst(stringValue), store, time, state, c);
    }
    var stack2 = stack.slice(1);
    return c.e.DefaultValueString(value.addresses(), function (value) {return value.ToString()}, this.node, stack2, this.benva, store, time, state, c);
  }

jseval.evalMemberAddressProperty =
  function (node, stack, benva, store, time, state, c) 
  {
    var object = node.object;
  
    function baseCont()
    {
      return new Cont("base-" + object.tag, benva,
        function (stack, store, time, state, c)
        {
          // stack: objectAddresses | cont
          var objectAddresses = stack[0];
          var cont = stack[1];
          var stack2 = stack.slice(2);
          var property = node.property;
          if (node.computed)
          {
            var cont2 = new Cont("ToString-"+node.tag, benva, c.e.ToStringCont);
            cont2.node = node;
            return c.e.evalNode(property, stack2.addFirst(objectAddresses).addFirst(cont).addFirst(cont2), benva, store, time, state, c);
          }
          // jipda value for property name to correspond with computed property's type
          return cont.execute(stack2.addFirst(objectAddresses).addFirst(c.l.abst1(property.name)), store, time, state, c);
        });
    }
    
    return c.e.evalNode(object, stack.addFirst(baseCont()), benva, store, time, state, c);
  }

jseval.evalThisExpression =
  function (node, stack, benva, store, time, state, c)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    //print("looking up 'this' in", benva);
    var scopeResult = c.e.doScopeLookup(c.l.U_THIS, stack, benva, store, state, c);
    var as = scopeResult.as;
    state = scopeResult.state;
    if (as.length !== 1)
    {
      throw new Error(as.length + " addresses (!== 1) for this: " + as);
    }
    return cont.execute(stack2.addFirst(c.l.abst1(as[0])), store, time, state, c); // TODO this doesn't feel right, right? probably should allow multiple thisses
  }

jseval.evalCallExpression =
  function (node, stack, benva, store, time, state, c)
  {
    var calleeNode = node.callee;
    var operands = node.arguments;
  
    function operandsCont(i)
    {
      return new Cont("rand-" + operands[i - 1].tag, benva,
        function (stack, store, time, state, c)
        {
          if (operands.length === i)
          {
            return c.e.applyProc(node, stack, benva, store, time, state, c);
          }
          return c.e.evalNode(operands[i], stack.addFirst(operandsCont(i + 1)), benva, store, time, state, c);
        });
    }
  
    function operatorCont()
    { 
      return new Cont("rator-" + calleeNode.tag, benva,
        function (stack, store, time, state, c)
        {
          if (operands.length === 0)
          {
            return c.e.applyProc(node, stack, benva, store, time, state, c);
          }
          return c.e.evalNode(operands[0], stack.addFirst(operandsCont(1)), benva, store, time, state, c);
        });
    }
    
    function methodOperatorCont()
    {
      return new Cont("meth-" + calleeNode.object.tag, benva,
        function (stack, store, time, state, c)
        {
          var objectAddresses = stack[0].addresses();
          assertTrue(Array.isArray(objectAddresses), "no addresses for " + stack[0]);
          var propertyName = calleeNode.property.name; // TODO: computed TODO 2 shouldn't this use evalMemberAddressProperty?
          var stack2 = stack.slice(1);
          return objectAddresses.flatMap( // 'map' if Tasks are created
            function (objectAddress)
            {
              var stack3 = stack2.addFirst(c.l.abst1(objectAddress)); // "this" (single address)
              //return new Task("apply method " + propertyName + " on " + objectAddress + " for " + node, //stack3,
              //  function () // TODO remove this task level? (see DefaultValue impl)
              //  {
                  var lookupResult = c.e.lookupAval(objectAddress, stack, store, state, c);
                  var objectAval = lookupResult.value;
                  state = lookupResult.state;
  //                print("objectAddress", objectAddress, "objectAval", objectAval);
                  var protoResult = c.e.doProtoLookup(objectAval, c.l.userLattice.abst1(propertyName), stack, store, state, c);
                  var memberAval = protoResult.value;
                  state = protoResult.state;
                  if (memberAval === null)
                  {
                    throw new Error("doProtoLookup: no addresses for " + propertyName + " on " + objectAval);
                  }
                  var stack4 = stack3.addFirst(memberAval);
                  if (operands.length === 0)
                  {
                    return c.e.applyProc(node, stack4, benva, store, time, state, c);
                  }
                  return c.e.evalNode(operands[0], stack4.addFirst(operandsCont(1)), benva, store, time, state, c);                    
                //});
            });
        });
    }
    
    if (isMemberExpression(calleeNode))
    {
      return c.e.evalNode(calleeNode.object, stack.addFirst(methodOperatorCont()), benva, store, time, state, c);
    }
    
    var stack2 = stack.addFirst(c.l.abst1(c.GLOBALA));  // global "this" (single address)
    return c.e.evalNode(calleeNode, stack2.addFirst(operatorCont()), benva, store, time, state, c);
  }

jseval.evalReturnStatement =
  function (node, stack, benva, store, time, state, c)
  {
    
    function doReturn(value, stack, store, time, state, c)
    {
      for (var i = 0; i < stack.length; i++)
      {
        var stackValue = stack[i];
        if (stackValue instanceof Cont)
        {
          if (stackValue.marks.length > 0)
          {
            var stack2 = stack.slice(i + 1);
            state = state.returns(value, stackValue.marks[0]);
            return stackValue.execute(stack2.addFirst(value), store, time, state, c);
          }
        }
      }
      throw new Error("return not in function: " + node);      
    }
    
    function returnCont()
    {
      return new Cont("ret-"+node.tag, benva,
        function (stack, store, time, state, c)
        {
          var value = stack[0];
          var stack2 = stack.slice(1);
          return doReturn(value, stack2, store, time, state, c);
        });
    }
    
    if (node.argument === null)
    {
      return doReturn(c.l.J_UNDEFINED, stack, store, time, state, c);
    }
  
    return c.e.evalNode(node.argument, stack.addFirst(returnCont()), benva, store, time, state, c);
  }

jseval.memberCont =
  function (stack, store, time, state, c)
  {
    var stringPropertyName = stack[0].user;
    var objectAddresses = stack[1].addresses();
    var cont = stack[2];
    var stack2 = stack.slice(3);
    
    var vals = objectAddresses.map(
      function (objectAddress)
      {
        var lookupResult = c.e.lookupAval(objectAddress, stack, store, state, c);
        var objectAval = lookupResult.value;
        state = lookupResult.state;
        var protoResult = c.e.doProtoLookup(objectAval, stringPropertyName, stack, store, state, c);
        var memberAval = protoResult.value;
        state = protoResult.state;
        if (memberAval === null)
        {
          throw new Error("doProtoLookup: no addresses for " + stringPropertyName + " on " + objectAval);
        }
        return memberAval;                      
      });
    var val = vals.reduce(Lattice.join, BOT);
    return cont.execute(stack2.addFirst(val), store, time, state, c);
  }

jseval.evalMemberExpression =
  function (node, stack, benva, store, time, state, c)
  {          
    return c.e.evalMemberAddressProperty(node, stack.addFirst(new Cont("member-" + node.tag, benva, c.e.memberCont)), benva, store, time, state, c);
  }

jseval.evalMemberExpression =
  function (node, stack, benva, store, time, state, c)
  {          
    var cont = new Cont("member-" + node.tag, benva, c.e.memberCont);
    cont.node = node;
    cont.benva = benva;
    return c.e.evalMemberAddressProperty(node, stack.addFirst(cont), benva, store, time, state, c);
  }

jseval.evalEmptyStatement =
  function (node, stack, benv, store, time, state, c)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    return cont.execute(stack2.addFirst(c.l.J_UNDEFINED), store, time, state, c);
  }

jseval.evalIfStatement =
  function (node, stack, benva, store, time, state, c)
  {
    var testNode = node.test;
    
    function ifCont()
    {
      return new Cont("if-" + testNode.tag, benva,
        function (stack, store, time, state, c)
        {
          var value = stack[0];
          var booleanValue = toUserBoolean(value);
          var stack2 = stack.slice(1);
          var consequent = node.consequent;
          var alternate = node.alternate;
          if (c.l.userLattice.isFalse(booleanValue))
          {
            if (alternate === null)
            {
              var cont = stack2[0];
              var stack3 = stack2.slice(1);
              return cont.execute(stack3.addFirst(c.l.J_UNDEFINED), store, time, state, c);
            }
            return c.e.evalNode(alternate, stack2, benva, store, time, state, c);
          }
          if (c.l.userLattice.isTrue(booleanValue))
          {
            return c.e.evalNode(consequent, stack2, benva, store, time, state, c);     
          }
          var tasks = [
            new Task("eval consequent of " + testNode.tag, //stack2, 
              function ()
              {
                var time2 = time.tick(consequent.tag, c.k);
                return c.e.evalNode(consequent, stack2, benva, store, time2, state, c);
              })];
          if (alternate === null)
          {
            tasks = tasks.addLast(
                new Task("eval empty alternate of " + testNode.tag,
                  function ()
                  {
                    var cont = stack2[0];
                    var stack3 = stack2.slice(1);
                    return cont.execute(stack3.addFirst(c.l.J_UNDEFINED), store, time, state, c);                  
                  }));
          }
          else
          {
            tasks = tasks.addLast(
                new Task("eval non-empty alternate of " + testNode.tag, //stack2, 
                  function ()
                  {
                    var time2 = time.tick(alternate.tag, c.k);
                    return c.e.evalNode(alternate, stack2, benva, store, time2, state, c);
                  }));
          }
          return tasks;
        });
    }
  
    return c.e.evalNode(testNode, stack.addFirst(ifCont()), benva, store, time, state, c);
  }
  
jseval.evalArrayExpression =
  function (node, stack, benv, store, time, state, c)
  {
    var elements = node.elements;
    
    function arrayCont(i)
    {
      return new Cont("array-" + elements[i - 1].tag, benv,
        function (stack, store, time, state, c)
        {
          if (i === elements.length)
          {
            var exps = stack.slice(0, elements.length).reverse();
            var cont = stack[elements.length];
            var stack2 = stack.slice(elements.length + 1);
            var arr = c.createArray();
            var objectAddress = c.a.array(node, time);
            exps.forEach(
              function (exp, ind)
              {
                var propertyName = c.l.userLattice.abst1(ind).ToString();
                var propertyAddress = c.a.objectProperty(objectAddress, propertyName);
                arr = arr.add(propertyName, propertyAddress);
                var allocResult = c.e.allocAval(propertyAddress, exp, stack, store, state, c);
                store = allocResult.store;
                state = allocResult.state;
              });
            var lengthPropertyAddress = c.a.objectProperty(objectAddress, c.l.U_LENGTH);
            arr = arr.add(c.l.U_LENGTH, lengthPropertyAddress);
            var allocResult = c.e.allocAval(lengthPropertyAddress, c.l.abst1(exps.length), stack, store, state, c);
            allocResult = c.e.allocAval(objectAddress, arr, stack, allocResult.store, allocResult.state, c);
            store = allocResult.store;
            state = allocResult.state;
            return cont.execute(stack2.addFirst(c.l.abst1(objectAddress)), store, time, state, c);
          }
          return c.e.evalNode(elements[i], stack.addFirst(arrayCont(i + 1)), benv, store, time, state, c);
        });
    }
    
    
    if (elements.length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var arr = c.createArray();
      var objectAddress = c.a.array(node, time);
      var lengthPropertyAddress = c.a.objectProperty(objectAddress, c.l.U_LENGTH);
      arr = arr.add(c.l.U_LENGTH, lengthPropertyAddress);
      var allocResult = c.e.allocAval(lengthPropertyAddress, c.l.J_0, stack, store, state, c);
      allocResult = c.e.allocAval(objectAddress, arr, stack, allocResult.store, allocResult.state, c);
      store = allocResult.store;
      state = allocResult.state;
      return cont.execute(stack2.addFirst(c.l.abst1(objectAddress)), store, time, state, c);
    }
    return c.e.evalNode(elements[0], stack.addFirst(arrayCont(1)), benv, store, time, state, c);
  }

jseval.evalForStatement =
  function (node, stack, benva, store, time, state, c)
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
              function (stack, store, time, state, c)
              {
                // discard updateAval = stack[0]
                var stack2 = stack.slice(1);
                return c.e.evalNode(test, stack2.addFirst(testCont()), benva, store, time, state, c);
              });
          }
          
          return new Cont("forb-" + body.tag, benva,
            function (stack, store, time, state, c)
            {
              return c.e.evalNode(update, stack.addFirst(updateCont()), benva, store, time, state, c);
            });
        }
      
        return new Cont("fort-" + test.tag, benva,
          function (stack, store, time, state, c)
          {
            var testAval = stack[0];
            if (c.l.userLattice.isFalse(toUserBoolean(testAval)))
            {
              var bodyAval = stack[1];
              var cont = stack[2];
              var stack2 = stack.slice(3);
              return cont.execute(stack2.addFirst(bodyAval), store, time, state, c);
            }
            var time2 = time.tick(node.tag, c.k);
            if (c.l.userLattice.isTrue(toUserBoolean(testAval)))
            {
              // discard bodyAval = stack[1]
              
              var store2 = c.v.visited(body, stack, benva, store, time); 
              if (store2 === null)
              {
                return [];
              }
  //              var store2 = store;
              
              var stack2 = stack.slice(2);
              return c.e.evalNode(body, stack2.addFirst(bodyCont()), benva, store2, time2, state, c);
            }
            var tasks = [
              new Task("exit for-loop " + node.tag, //stack, 
                function ()
                {
                  var bodyAval = stack[1];
                  var cont = stack[2];
                  var stack2 = stack.slice(3);
                  return cont.execute(stack2.addFirst(bodyAval), store, time2, state, c);
                }),
              new Task("eval body of for-loop " + node.tag, //stack, 
                function ()
                {
                  // discard bodyAval = stack[1]
  
                  var store2 = c.v.visited(body, stack, benva, store, time2); 
                  if (store2 === null)
                  {
                    return [];
                  }                                   
  //                var store2 = store;
                  
                  var stack2 = stack.slice(2);
                  return c.e.evalNode(body, stack2.addFirst(bodyCont()), benva, store2, time2, state, c);
                })];
            return tasks;
          });
      }
    
      return new Cont("fori-" + init.tag, benva,
        function (stack, store, time, state, c)
        {
          // discard stack[0]: init value
          var stack2 = stack.slice(1);
          // push 'undefined' as the 'result' of unexecuted node.body
          return c.e.evalNode(test, stack2.addFirst(c.l.J_UNDEFINED).addFirst(testCont()), benva, store, time, state, c);
        });
    }
    
    return c.e.evalNode(init, stack.addFirst(initCont()), benva, store, time, state, c);
  }

jseval.evalUpdateExpression =
  function (node, stack, benva, store, time, state, c)
  {
    var argument = node.argument;
    if (isIdentifier(argument))
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      var scopeResult = c.e.doScopeLookup(c.l.userLattice.abst1(argument.name), stack, benva, store, state, c);
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
          var lookupResult = c.e.lookupAval(address, stack, store, state, c);
          var aval = lookupResult.value;
          state = lookupResult.state;
          var uold = aval.user.ToNumber();
          var jold = new JipdaValue(uold, []);
          var jnew = new JipdaValue((node.operator === "++" ? c.l.userLattice.add(uold, c.l.U_1) : c.l.userLattice.sub(uold, U_1)), []);
          var updateResult = c.e.updateAval(address, jnew, stack, store, state, c);
          store = updateResult.store;
          state = updateResult.state;
          result = result.join(node.prefix ? jnew : jold);
        });
      return cont.execute(stack2.addFirst(result), store, time, state, c);        
    }
    else if (isMemberExpression(argument))
    {
      function updateMemberCont()
      {
        return new Cont("updMem-" + argument.tag, benva,
          function (stack, store, time, state, c)
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
                var lookupResult = c.e.lookupAval(objectAddress, stack, store, state, c);
                var object = lookupResult.value;
                state = lookupResult.state;
                var protoResult = c.e.doProtoLookup(object, propertyName, stack, store, state, c);
                var aval = protoResult.value;
                state = protoResult.state;
                if (aval === null)
                {
                  throw new Error("doProtoLookup: no addresses for " + propertyName + " on " + object);
                }
                var uold = toUserNumber(aval, store);
                var jold = new JipdaValue(uold, []);
                var jnew = new JipdaValue((node.operator === "++" ? c.l.userLattice.add(uold, c.l.U_1) : c.l.userLattice.sub(uold, c.l.U_1)), []);
                var pas = object.lookup(propertyName).addresses;
                if (pas.length === 0)
                {
                  object = object.add(propertyName, propertyAddress);
                  var allocResult = c.e.allocAval(propertyAddress, jnew, stack, store, state, c);
                  store = allocResult.store;
                  state = allocResult.state;
                  var updateResult = c.e.sideEffectAval(objectAddress, object, stack, store, state, c);
                  store = updateResult.store;
                  state = updateResult.state;
                }
                else
                {
                  pas.forEach(
                    function (propertyAddress) 
                    {
                      var updateResult = c.e.updateAval(propertyAddress, jnew, stack, store, state, c);
                      store = updateResult.store;
                      state = updateResult.state;
                    });
                }
                result = result.join(node.prefix ? jnew : jold);
              });
            return cont.execute(stack2.addFirst(result), store, time, state, c);
          });
      }
    
      return c.e.evalMemberAddressProperty(argument, stack.addFirst(updateMemberCont()), benva, store, time, state, c);
    }
    else
    {
      throw new Error("evalUpdateExpression: cannot handle " + argument);
    }
  }

jseval.evalUnaryExpression =
  function (node, stack, benva, store, time, state, c)
  {
    var argumentNode = node.argument;
    
    function rightCont()
    {
      return new Cont("unr-" + argumentNode.tag, benva,
        function (stack, store, time, state, c)
        {
          var rightAval = stack[0];
          var cont = stack[1];
          var stack2 = stack.slice(2);
          var robjs = rightAval.as.map(function (a) {var lookupResult = c.e.lookupAval(a, stack, store, state, c); state = lookupResult.state; return lookupResult.value});
          var result;
          switch (node.operator)
          {
            case "-":
            {
              var robjvals = robjs.map(function (o) {return o.DefaultValue()}).reduce(Lattice.join, BOT);
              var rprim = rightAval.user.join(robjvals);
              result = c.l.userLattice.neg(rprim);
              break;
            }
            case "!":
            {
              var robjvals = robjs.map(function (o) {return o.DefaultValue()}).reduce(Lattice.join, BOT);
              var rprim = rightAval.user.join(robjvals);
              result = c.l.userLattice.not(rprim);
              break;
            }
            case "~":
            {
              var robjvals = robjs.map(function (o) {return o.DefaultValue()}).reduce(Lattice.join, BOT);
              var rprim = rightAval.user.join(robjvals);
              result = c.l.userLattice.binnot(rprim);
              break;
            }
            case "+":
            {
              var robjvals = robjs.map(function (o) {return o.DefaultValue()}).reduce(Lattice.join, BOT);
              var rprim = rightAval.user.join(robjvals);
              result = c.l.userLattice.pos(rprim);
              break;
            }
            default: throw new Error("cannot handle unary operator " + node.operator);
          }
          return cont.execute(stack2.addFirst(new JipdaValue(result, [])), store, time, state, c);
        });
    }
    
    return c.e.evalNode(argumentNode, stack.addFirst(rightCont()), benva, store, time, state, c);
  }  

jseval.evalLabeledStatement =
  function (node, stack, benva, store, time, state, c)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    var handlerCont = cont.setHandler(node);
    return c.e.evalNode(node.body, stack2.addFirst(handlerCont), benva, store, time, state, c);
  }

jseval.evalBreakStatement =
  function (node, stack, benva, store, time, state, c)
  {
    var breakValue = c.l.J_UNDEFINED;
    
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
  //  print("breakValue", breakValue, stack);
    
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
              return value.execute(stack2.addFirst(breakValue), store, time, state, c);                              
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
            return value.execute(stack2.addFirst(breakValue), store, time, state, c);                              
          }
        }
      }
    }    
    throw new Error("no handler for " + node);      
  }
  
jseval.evalSwitchStatement =
  function (node, stack, benva, store, time, state, c)
  {
    var discriminantNode = node.discriminant;
    
    function switchCont()
    {
      return new Cont("switch-"+node.tag, benva,
        function (stack, store, time, state, c)
        {
          var discr = stack[0].user;
          
          function execCase(i, stack, store, time, state, c)
          {
            
            function execCaseCont()
            {
              return new Cont("checkcase-"+node.cases[i].tag, benva,
                  function (stack, store, time, state, c)
                  {
                    return execCase(i + 1, stack, store, time, state, c);
                  });
            }
            
            var statements = [];
            for (var j = i; j < node.cases.length; j++)
            {
              statements = statements.concat(node.cases[j].consequent);
            }
            
            var stack2 = stack.slice(1);
            return c.e.evalStatementList(statements, stack2, benva, store, time, state, c);
          }
          
          function scanCase(i, defaultI, stack, store, time, state, c)
          {
            function checkCaseCont()
            {
              return new Cont("checkcase-"+node.cases[i].tag, benva,
                function (stack, store, time, state, c)
                {
                  var selector = stack[0].user;
                  var stack2 = stack.slice(1);
                  if (c.l.userLattice.isTrue(c.l.userLattice.eqq(discr, selector)))
                  {
                    return execCase(i, stack2, store, time, state, c);
                  }
                  if (c.l.userLattice.isFalse(c.l.userLattice.eqq(discr, selector)))
                  {
                    return scanCase(i + 1, defaultI, stack2, store, time, state, c);
                  }
                  return [new Task("execute case " + i), function () {return execCase(i, stack2, store, time, state, c)},
                          new Task("scan case " + i), function() {return scanCase(i + 1, stack2, store, time, state, c)}];
                });
            }
            
            if (i === node.cases.length)
            {
              if (defaultI === null)
              {
                // var discr = stack[0];
                var cont = stack[1];
                var stack2 = stack.slice(2);
                return cont.execute(stack2.addFirst(c.l.J_UNDEFINED), store, time, state, c);                              
              }
              
              var statements = [];
              for (var j = defaultI; j < node.cases.length; j++)
              {
                statements = statements.concat(node.cases[j].consequent);
              }
              
              var stack2 = stack.slice(1);
              return c.e.evalStatementList(statements, stack2, benva, store, time, state, c);
            }
            
            var nodeTest = node.cases[i].test;
            if (nodeTest === null)
            {
              if (i + 1 === node.cases.length)
              {
                return execCase(i, stack, store, time, state, c);                
              }
              return scanCase(i + 1, i, stack, store, time, state, c);
            }
            return c.e.evalNode(nodeTest, stack.addFirst(checkCaseCont()), benva, store, time, state, c);
          }
          
          if (node.cases)
          {
            // push default result value (discr is also on the stack: should not be GCed because this can be object)
            return scanCase(0, null, stack, store, time, state, c);
          }
          
          var cont = stack[1];
          var stack2 = stack.slice(2);
          return cont.execute(stack2.addFirst(c.l.J_UNDEFINED), store, time, state, c);
        });
    }
       
    var cont = stack[0];
    var stack2 = stack.slice(1);
    var handlerCont = cont.setHandler(node);
    return c.e.evalNode(discriminantNode, stack2.addFirst(handlerCont).addFirst(switchCont()), benva, store, time, state, c);
  }

jseval.evalTryStatement =
  function (node, stack, benva, store, time, state, c)
  {
    var cont = stack[0];
    var stack2 = stack.slice(1);
    var handlerCont = cont.setHandler(node.handlers[0]);
    return c.e.evalNode(node.block, stack2.addFirst(handlerCont), benva, store, time, state, c);
  }

jseval.evalLogicalExpression =
  function (node, stack, benva, store, time, state, c)
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
          function (stack, store, time, state, c)
          {
            var right = stack[0];
            var cont = stack[1];
            var stack2 = stack.slice(2);
            return cont.execute(stack2.addFirst(right), store, time, state, c);
          });
      }
      
      return new Cont("logl-" + leftNode.tag, benva,
        function (stack, store, time, state, c)
        {
          var left = stack[0];
          switch (operator)
          {
            case "&&":
              if (c.l.userLattice.isFalse(toUserBoolean(left)))
              {
                var cont1 = stack[1];
                var stack2 = stack.slice(2);
                return cont1.execute(stack2.addFirst(left), store, time, state, c);
              }
              break;
            case "||":
              if (c.l.userLattice.isTrue(toUserBoolean(left)))
              {
                var cont2 = stack[1];
                var stack3 = stack.slice(2);
                return cont2.execute(stack3.addFirst(left), store, time, state, c);
              }
              break;
            default: throw new Error("cannot handle logical operator " + operator);
          }
          var stack4 = stack.slice(1);
          return c.e.evalNode(rightNode, stack4.addFirst(rightCont()), benva, store, time, state, c);
        });
    }
    
    return c.e.evalNode(leftNode, stack.addFirst(leftCont()), benva, store, time, state, c);
  }

jseval.performThrow =
  function (throwValue, node, stack, benva, store, time, state, c) // TODO move to top??? calls evalStatementList
  {
    for (var i = 0; i < stack.length; i++)
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
            var createResult = c.createEnvironment(benva, node, handler, state, c);
            var extendedBenv = createResult.benv;
            state = createResult.state;
            var param = handler.param;
            var address = c.a.variable(param, time);
            extendedBenv = extendedBenv.add(c.l.userLattice.abst1(param.name), address);
            var allocResult = c.e.allocAval(address, throwValue, stack, store, state, c);
            var extendedBenva = c.a.benv(handler, time);
            allocResult = c.e.allocAval(extendedBenva, extendedBenv, stack, allocResult.store, allocResult.state, "extended static env for handler with root " + benva);
            store = allocResult.store;
            state = allocResult.state;
            // ECMA 12.14:  [...] Return the result of evaluating Catch with parameter B.value.
            // which means we cannot eval catch block as block (which discards last val) ??? REVIEW AFTER evalStatList
            // therefore: eval as sequence
            var block = handler.body;
            return c.e.evalStatementList(block.body, stack2, extendedBenva, store, time, state, c);                              
          }
        }
      }
    }
    throw new Error("no handler for " + throwValue + " thrown by " + node);    
  }
  
jseval.evalThrowStatement =
  function (node, stack, benva, store, time, state, c)
  {
    
    function argumentCont()
    {
      return new Cont("throw-" + node.argument.tag, benva,
        function (stack, store, time, state, c)
        {
          var throwValue = stack[0];
          var stack2 = stack.slice(1);
          return c.e.performThrow(throwValue, node, stack2, benva, store, time, state, c);
        });
    }
    
    return c.e.evalNode(node.argument, stack.addFirst(argumentCont()), benva, store, time, state, c);
  }

jseval.DefaultValue =
  function (objectAddresses, primPostProcessor, node, stack, benva, store, time, state, c)
  {
    return c.e.DefaultValueNumber(objectAddresses, primPostProcessor, node, stack, benva, store, time, state, c)
  }
  
jseval.DefaultValueString =
  function (objectAddresses, primPostProcessor, node, stack, benva, store, time, state, c)
  {
    return c.e.defaultValue("toString", "valueOf", objectAddresses, primPostProcessor, node, stack, benva, store, time, state, c);
  }
  
jseval.DefaultValueNumber =
  function (objectAddresses, primPostProcessor, node, stack, benva, store, time, state, c)
  {
    return c.e.defaultValue("valueOf", "toString", objectAddresses, primPostProcessor, node, stack, benva, store, time, state, c);    
  }
  
  //8.12.8: returns JipdaValue with as = []
jseval.defaultValue =
  function (methodName1, methodName2, objectAddresses, primPostProcessor, node, stack, benva, store, time, state, c)
  {
    var throwTypeError = (methodName1 === null); 
    var propertyName = c.l.userLattice.abst1(throwTypeError ? methodName2 : methodName1);
    var application = node; // TODO 'synthetic' applications
    return objectAddresses.flatMap( // we do things differently here from regular applyProc (update: still holds?)
        // we create tasks for receiverAddress/Callable pairs (applyProc creates Tasks per receiverA and per Callable
      function (objectAddress)
      {
        var lookupResult = c.e.lookupAval(objectAddress, stack, store, state, c);
        var objectAval = lookupResult.value;
        state = lookupResult.state;
  //      print("objectAddress", objectAddress, "objectAval", objectAval);
        var protoResult = c.e.doProtoLookup(objectAval, propertyName, stack, store, state, c);
        var method = protoResult.value;
        state = protoResult.state;
        if (method === null)
        {
          throw new Error("TODO");
        }
        var methodFuns = method.as.map(function (a) { var lookupResult = c.e.lookupAval(a, stack, store, state, c); state = lookupResult.state; return lookupResult.value});
        var allCallable = method.user === BOT && methodFuns.map(function (benv) { return benv.Call.length > 0}).reduce(function (a, b) {return a && b});
        var Callables = methodFuns.flatMap(function (benv) { return benv.Call });
        var cont = defaultValueCont();
        var tasks = Callables.map(
          function (callable)
          {
            var markedCont = callable.mark(cont, application);
            markedCont.toString = cont.toString; // DEBUG
            return new Task("default value " + application, //stack, // orginal stack (not current) for GC purposes
                function ()
                {
                  return callable.applyFunction(application, [], objectAddress, stack.addFirst(markedCont), benva, store, time, state, c);
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
              return c.e.defaultValue(null, methodName2, objectAddresses, primPostProcessor, application, stack.addFirst(BOT), benva, store, time, state, c);
            }));
        }
        return tasks;
        
        function defaultValueCont()
        {
          return new Cont("defval-" + node.tag, benva,
            function (stack, store, time, state, c)
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
                  return cont.execute(stack2.addFirst(primPostProcessor ? primPostProcessor(aval) : aval), store, time, state, c);
                }
                
                if (aval.user === BOT)
                {
                  throw new Error("TODO: non-primitive second-chance object-to-value coercion must throw type error");
                }
                
                return [new Task("blah1",
                  function () 
                  {
                    return cont.execute(stack2.addFirst(primPostProcessor ? primPostProcessor(aval) : aval), store, time, state, c);
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
                return cont.execute(stack2.addFirst(primPostProcessor ? primPostProcessor(aval) : aval), store, time, state, c);
              }
              
              if (allCallable)
              {
                // all callables during first attempt: no second-chance Task has been created 
                return defaultValue(application, methodName2, objectAddresses, primPostProcessor, application, stack, benva, store, time, state, c);
              }
              
              // not all callables, but second attempt already launched
              return [];
            });
        }
        
      });
  }

jseval.evalConditionalExpression =
  function (node, stack, benva, store, time, state, c)
  {
    var testNode = node.test;
    
    function condCont()
    {
      return new Cont("cond-" + testNode.tag, benva,
        function (stack, store, time, state, c)
        {
          var value = stack[0];
          var booleanValue = toUserBoolean(value);
          var stack2 = stack.slice(1);
          var consequent = node.consequent;
          var alternate = node.alternate;
          if (c.l.userLattice.isFalse(booleanValue))
          {
            return c.e.evalNode(alternate, stack2, benva, store, time, state, c);
          }
          if (c.l.userLattice.isTrue(booleanValue))
          {
            return c.e.evalNode(consequent, stack2, benva, store, time, state, c);     
          }
          var tasks = [
            new Task("eval consequent of " + testNode.tag, //stack2, 
              function ()
              {
                var time2 = time.tick(consequent.tag, k);
                return c.e.evalNode(consequent, stack2, benva, store, time2, state, c);
              })];
          tasks = tasks.addLast(
              new Task("eval alternate of " + testNode.tag, //stack2, 
                function ()
                {
                  var time2 = time.tick(alternate.tag, k);
                  return c.e.evalNode(alternate, stack2, benva, store, time2, state, c);
                }));
          return tasks;
        });
    }
  
    return c.e.evalNode(testNode, stack.addFirst(condCont()), benva, store, time, state, c);
  }

jseval.evalWhileStatement =
  function (node, stack, benva, store, time, state, c)
  {
    var test = node.test;
    var body = node.body;
  
    function testCont()
    { 
      function bodyCont()
      {
        return new Cont("whileb-" + body.tag, benva,
          function (stack, store, time, state, c)
          {
            return c.e.evalNode(test, stack.addFirst(testCont()), benva, store, time, state, c);
          });
      }
    
      return new Cont("whilet-" + test.tag, benva,
        function (stack, store, time, state, c)
        {
          var testAval = stack[0];
          if (c.l.userLattice.isFalse(toUserBoolean(testAval)))
          {
            var bodyAval = stack[1];
            var cont = stack[2];
            var stack2 = stack.slice(3);
            return cont.execute(stack2.addFirst(bodyAval), store, time, state, c);
          }
          var time2 = time.tick(node.tag, k);
          if (c.l.userLattice.isTrue(toUserBoolean(testAval)))
          {
            // discard bodyAval = stack[1]
            
            var store2 = visited.visited(body, stack, benva, store, time); 
            if (store2 === null)
            {
              return [];
            }
  //              var store2 = store;
            
            var stack2 = stack.slice(2);
            return c.e.evalNode(body, stack2.addFirst(bodyCont()), benva, store2, time2, state, c);
          }
          var tasks = [
            new Task("exit while-loop " + node.tag, //stack, 
              function ()
              {
                var bodyAval = stack[1];
                var cont = stack[2];
                var stack2 = stack.slice(3);
                return cont.execute(stack2.addFirst(bodyAval), store, time2, state, c);
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
  //                var store2 = store;
                
                var stack2 = stack.slice(2);
                return c.e.evalNode(body, stack2.addFirst(bodyCont()), benva, store2, time2, state, c);
              })];
          return tasks;
        });
    }
  
    // push 'undefined' as the 'result' of unexecuted node.body
    return c.e.evalNode(test, stack.addFirst(c.l.J_UNDEFINED).addFirst(testCont()), benva, store, time, state, c);
  }



jseval.evalNode =
  function (node, stack, benva, store, time, state, c)
  {
//    print("===== evalNode", "#" + node.tag, node, "\n", stack, benva);
    assertTrue(benva instanceof Addr, "not an Addr for benva: " + benva);
    assertTrue(store instanceof Store, "not a Store: " + store);
    assertTrue(state instanceof State, "not a State: " + state);
    assertTrue(!!c, "no c: " + c);     
    switch (node.type)
    {
      case "Literal": 
        return c.e.evalLiteral(node, stack, benva, store, time, state, c);
      case "Identifier":
        return c.e.evalIdentifier(node, stack, benva, store, time, state, c);
      case "BinaryExpression":
        return c.e.evalBinaryExpression(node, stack, benva, store, time, state, c);
      case "LogicalExpression":
        return c.e.evalLogicalExpression(node, stack, benva, store, time, state, c);
      case "CallExpression":
        return c.e.evalCallExpression(node, stack, benva, store, time, state, c);
      case "FunctionExpression":
        return c.e.evalFunctionExpression(node, stack, benva, store, time, state, c);
      case "AssignmentExpression":
        return c.e.evalAssignmentExpression(node, stack, benva, store, time, state, c);
      case "ArrayExpression":
        return c.e.evalArrayExpression(node, stack, benva, store, time, state, c);
      case "MemberExpression":
        return c.e.evalMemberExpression(node, stack, benva, store, time, state, c);
      case "ObjectExpression":
        return c.e.evalObjectExpression(node, stack, benva, store, time, state, c);
      case "ThisExpression":
        return c.e.evalThisExpression(node, stack, benva, store, time, state, c);
      case "NewExpression":
        return c.e.evalNewExpression(node, stack, benva, store, time, state, c);
      case "UpdateExpression":
        return c.e.evalUpdateExpression(node, stack, benva, store, time, state, c);
      case "UnaryExpression":
        return c.e.evalUnaryExpression(node, stack, benva, store, time, state, c);
      case "ExpressionStatement":
        return c.e.evalNode(node.expression, stack, benva, store, time, state, c);
      case "ReturnStatement": 
        return c.e.evalReturnStatement(node, stack, benva, store, time, state, c);
      case "BreakStatement": 
        return c.e.evalBreakStatement(node, stack, benva, store, time, state, c);
      case "LabeledStatement": 
        return c.e.evalLabeledStatement(node, stack, benva, store, time, state, c);
      case "IfStatement": 
        return c.e.evalIfStatement(node, stack, benva, store, time, state, c);
      case "ConditionalExpression": 
        return c.e.evalConditionalExpression(node, stack, benva, store, time, state, c);
      case "SwitchStatement": 
        return c.e.evalSwitchStatement(node, stack, benva, store, time, state, c);
      case "ForStatement": 
        return c.e.evalForStatement(node, stack, benva, store, time, state, c);
      case "WhileStatement": 
        return c.e.evalWhileStatement(node, stack, benva, store, time, state, c);
      case "FunctionDeclaration": 
        return c.e.evalFunctionDeclaration(node, stack, benva, store, time, state, c);
      case "VariableDeclaration": 
        return c.e.evalStatementList(node.declarations, stack, benva, store, time, state, c);
      case "VariableDeclarator": 
        return c.e.evalVariableDeclarator(node, stack, benva, store, time, state, c);
      case "BlockStatement":
        return c.e.evalStatementList(node.body, stack, benva, store, time, state, c);
      case "EmptyStatement":
        return c.e.evalEmptyStatement(node, stack, benva, store, time, state, c);
      case "TryStatement": 
        return c.e.evalTryStatement(node, stack, benva, store, time, state, c);
      case "ThrowStatement": 
        return c.e.evalThrowStatement(node, stack, benva, store, time, state, c);
      case "Program":
        return c.e.evalProgram(node, stack, benva, store, time, state, c);
      default:
        throw "ipdaEval: cannot handle node " + node.type; 
    }
  }

jseval.applyProc =
  function (application, stack, benva, store, time, state, c)
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
  //  print("ths", ths, "operator", operatorValues, "operands", operandsValues);
    var stack2 = stack.slice(applicationLength);
    var cont = stack2[0];
    var stack3 = stack2.slice(1);
    var time2 = time.tick(application.tag, c.k);
  
    var store2 = c.v.visited(application, stack, benva, store, time);
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
        assertTrue(ths.as.length > 0, "'this'");
        return callConc.map(
          function (call) 
          {
            return new Task("#" + application.tag + " " + application + " stack length " + stack.length + " store size " + store.entries.length, //stack, // orginal stack (not current) for GC purposes
                function ()
                {
                  var markedCont = call.mark(cont, application); 
                  return call.applyFunction(application, operandsValues, ths.as[0], stack3.addFirst(markedCont), benva, store2, time2, state, c);
                })
          })
      });
  }

jseval.applyConstructor =
  function (application, stack, benva, store, time, state, c)
  {
  //  print("applyConstructor", application, "\n", stack, benva, time);
    if (stack.length > 128)
    {
      throw new Error("stack explosion");
    }
    var applicationLength = application.arguments.length + 1;
    var applicationValues = stack.slice(0, applicationLength).reverse();
    var constructorValues = applicationValues[0].addresses();
    var operandsValues = applicationValues.slice(1);
    var stack2 = stack.slice(applicationLength);
    var time2 = time.tick(application.tag, c.k);
    
    constructorValues = constructorValues.map(
        function (operatorValue)
        {
          var lookupResult = c.e.lookupAval(operatorValue, stack, store, state, c);
          var benv = lookupResult.value;
          state = lookupResult.state;
          return benv;
        }); 
    
    return constructorValues.flatMap(
      function (constructor)
      {
        // TODO move this closer to applyFunction call, and include declaration node?
        // (so c.e address generators can base themselves on application and declaration node)
        var objectAddress = c.a.constructor(application, time); // was (constructor, time)
  //      print("address", objectAddress, "for", application);
    
        function constructorObjectCont()
        {
          return new Cont("consObj-" + application.tag, benva,
            function (stack, store, time, state, c)
            {
              var objectAval = stack[0];
              var cont = stack[1];
              var stack2 = stack.slice(2);
  //            print("+ value", objectAval);
              if (objectAval.isAddress())
              {
                return cont.execute(stack2.addFirst(objectAval), store, time, state, c);
              }
              var caddresses = objectAval.addresses();
              return cont.execute(stack2.addFirst(c.l.abst([objectAddress].concat(caddresses))), store, time, state, c);
            });
        }                    
        
        var cont = constructorObjectCont();
        
        var prototypePropertyAs = constructor.lookup(c.l.U_PROTOTYPE).addresses; // seems that we don't require a protochain lookup here (TODO check with ECMA-262 spec)
        var laResult = c.e.doLookupAddresses(prototypePropertyAs, stack, store, state, c);
        // TODO 13.2.2 case when prototype isn't an object 
        var ths = c.createObject(laResult.value);
        var allocResult = c.e.allocAval(objectAddress, ths, stack, store, laResult.state, c);
        store = allocResult.store;
        state = allocResult.state;
        return constructor.Call.map(
            function (call) 
            {
              var markedCont = call.mark(cont, application);
              return new Task("#" + application.tag + " " + application + " stack length " + stack.length + " store size " + store.entries.length,//stack, // original stack (not current) for GC purposes
                  function ()
                  {
                    return call.applyFunction(application, operandsValues, objectAddress, stack2.addFirst(markedCont), benva, store, time2, state, c);
                  })
            })
      });
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
    var markedCont = cont.addMark(new CallMark(application, this));
    markedCont.toString = cont.toString; // DEBUG
    return markedCont;
  }

jseval.applyFunction =
  function (application, funNode, funScope, operandsValues, ths, stack, benva, store, time, state, c)
  {
    var bodyNodes = funNode.body.body;
    if (bodyNodes.length === 0)
    {
      var cont = stack[0];
      var stack2 = stack.slice(1);
      state = state.appliesFunction(application, funNode, funScope, ths);
      state = state.leavesFunction(application, funNode, funScope, ths);
      return cont.execute(stack2.addFirst(c.l.J_UNDEFINED), store, time, state, c);
    }
    
    var formalParameters = funNode.params;
  
    var createResult = c.createEnvironment(funScope, application, funNode, state, c);
    var extendedBenv = createResult.benv;
    state = createResult.state;
    
    if (ths === null || ths === undefined)
    {
      ths = c.GLOBALA;
    }
    extendedBenv = extendedBenv.add(c.l.U_THIS, ths);
    
    for (var i = 0; i < formalParameters.length; i++)
    {
      var param = formalParameters[i];
      var address = c.a.variable(param, time);
      extendedBenv = extendedBenv.add(c.l.userLattice.abst1(param.name), address);
      var allocResult = c.e.allocAval(address, operandsValues[i], stack, store, state, c);
      store = allocResult.store;
      state = allocResult.state;
    }
    
    var extendedBenva = c.a.benv(application, time);
  
    var hoisted = hoist(bodyNodes);
    if (hoisted.funs.length > 0 || hoisted.vars.length > 0)
    {
      hoisted.funs.forEach(
          function (funDecl)
          {
            var result = c.e.evalHoistedFunctionDeclaration(funDecl, stack, extendedBenva, extendedBenv, store, time, state, c);
            extendedBenv = result.benv;
            store = result.store;
            state = result.state;
          });
      hoisted.vars.forEach(
          function (varDecl)
          {
            var result = c.e.evalHoistedVariableDeclarator(varDecl, stack, extendedBenv, store, time, state, c);
            extendedBenv = result.benv;
            store = result.store;
            state = result.state;
          });
    }
    
    var allocResult = c.e.allocAval(extendedBenva, extendedBenv, stack, store, state, "extended static env for closure call with root " + funScope);
    store = allocResult.store;
    state = allocResult.state;
    
    state = state.appliesFunction(application, funNode, extendedBenva, ths);
    
    // ECMA 13.2.1: [[Code]] cannot be evaluated as Block,
    // therefore "custom" eval
  
    function fbodyCont(i)
    {
      return new Cont("fbody-" + bodyNodes[i - 1].tag, extendedBenva,
        function (stack, store, time, state, c)
        {
          if (i === bodyNodes.length)
          {
              // discard aval = stack[0]
            var cont = stack[1];
            var stack2 = stack.slice(2);
            state = state.leavesFunction(application, funNode, funScope, ths);
            return cont.execute(stack2.addFirst(c.l.J_UNDEFINED), store, time, state, c);
          }
          var stack3 = stack.slice(1);
          return c.e.evalNode(bodyNodes[i], stack3.addFirst(fbodyCont(i + 1)), extendedBenva, store, time, state, c);
        });
    }
  
    return c.e.evalNode(bodyNodes[0], stack.addFirst(fbodyCont(1)), extendedBenva, store, time, state, c);
  }

BenvClosureCall.prototype.applyFunction =
  function (application, operandsValues, ths, stack, benva, store, time, state, c)
  {
//    print("BenvClosureCall.applyFunction", application, "operandsValues", operandsValues, "ths", ths);

    var funNode = this.node;
    var funScope = this.scope;
    return c.e.applyFunction(application, funNode, funScope, operandsValues, ths, stack, benva, store, time, state, c);
  }

BenvClosureCall.prototype.addresses =
  function ()
  {
    return [this.scope];
  }
