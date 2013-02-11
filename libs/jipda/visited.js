function DefaultVisitedStrategy(gc)
{
  this.gc = gc;
  this.visitedContexts = [];
}

DefaultVisitedStrategy.prototype.visited =
  function (node, stack, benva, store, time) // TODO rename/rework (does too much? awkward return values)
  // maybe clients should 'return visited()' with a cont on the stack, and this proc can decide to return [] tasks?
  {
  
    store = this.gc(store, stack, benva);
  
    var kstack = stack.filter(function (x) { return x instanceof Cont});
    var vstack = stack.filter(function (x) { return !(x instanceof Cont)});
    
    var contextStackStoreValue = this.visitedContexts.getEntry([node, benva, time]);
    if (contextStackStoreValue)
    {
      // context stack:       5  4  3  2  1  
      // kstack       : 5  4  5  4  3  2  1
      var contextStack = contextStackStoreValue[1][0];
      var contextVstack = contextStackStoreValue[1][1];
      var contextStore = contextStackStoreValue[1][2];
      
//      print("current kstack", kstack);
//      print("context kstack", contextStack);
//      print("current vstack", vstack);
//      print("context vstack", contextVstack);
      if (true)//stackElementsSubsume(contextVstack, vstack))
      {
        var deltaL = kstack.length - contextStack.length;
        
        // kprefix      : 5  4 (5  4  3  2  1)
        var kprefix = kstack.slice(deltaL);
        if (kprefix.equals(contextStack))
        {
          // ksuffix           : (5  4) 5  4  3  2  1
          // context suffix    :  5  4 (5  4) 3  2  1
          var ksuffix = kstack.slice(0, deltaL);
          var contextSuffix = kstack.slice(deltaL, deltaL * 2);
          if (ksuffix.equals(contextSuffix))
          { // "always" widening on backedge with disregard for stack eq does not seem to + or - impact test results 
//            if (stackElementsSubsume(contextStack, kprefix) && stackElementsSubsume(contextSuffix, ksuffix) && contextStore.subsumes(store))
            if (/*stackElementsSubsume(contextVstack, vstack) &&*/ contextStore.subsumes(store))
            {
//              print("## already visited", node, stack, benva, time);
//              print(store.diff(contextStore));
//              print(store.nice(), "\n", contextStore.nice());
//              print(store.nice());
//              dreadline();
              return null; // special return value
            }
            else
            {
//              print("## not visited", node, stack, benva, time, "\n", store.diff(contextStore));
//              dreadline();
//              print("## before widening", store.nice(), "context\n", contextStore.nice());
//              print("## widening with kstack", kstack, "\n-- context kstack", contextStack, "\n - deltaL", deltaL, "-- kprefix", kprefix, "-- ksuffix", ksuffix, "-- contextSuffix", contextSuffix);
              var store2 = store.join(contextStore);
              store2 = this.gc(store2, stack, benva); // original stack
//              print("## after widening and gc", store2.diff(store));
//              dreadline();
//              print("## updating", node, benva, time, "\nwith kstack", kstack, "vstack", vstack);
              this.visitedContexts = this.visitedContexts.updateEntry([node, benva, time], [kstack, vstack, store2]);
              return store2;              
            }
          }
        }        
      }
    }
    else // debug
    {
//        print("## no context store value for", node, benva, time);
//        print(this.visitedContexts.entryKeys().join("\n"));
//        dreadline();
    }       

//    print("## context", node, benva, time, "\nkstack", kstack, "vstack", vstack);
    this.visitedContexts = this.visitedContexts.updateEntry([node, benva, time], [kstack, vstack, store]);
    return store;
  }
