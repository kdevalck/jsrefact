  function ConcretePrinter(lattice, store)
  {
    this.lattice = lattice;
    this.store = store;
  }
  ConcretePrinter.prototype.visitJipdaValue =
    function (x)
    {
      if (x.user === BOT)
      {
        assertTrue(x.addresses().length === 1);
        var printedAddress = x.addresses()[0].accept(this);
        return printedAddress;
      }
      assertTrue(x.addresses().length === 0);
      var printedUser = x.user.accept(this);
      return printedUser; 
    }
  
  ConcretePrinter.prototype.visitBOT =
    function (x)
    {
      return "_";
    }
  
  ConcretePrinter.prototype.visitContextAddr =
    function (x)
    {
      var value = this.store.lookupAval(x);
      return value.accept(this);
    }
  
  ConcretePrinter.prototype.visitBenv =
    function (x)
    {
      if (x.Class.length === 1 && x.isArray())
      {
        var i = this.lattice.abst1(0);
        var las = x.lookup(this.lattice.abst1("length")).addresses;
        var l = las.map(this.store.lookupAval, this.store).reduce(Lattice.join, BOT).user;
        var result = [];
        while (this.lattice.isTrue(this.lattice.lt(i, l)))
        {
          var ias = x.lookup(i.ToString()).addresses;
          var v = ias.map(this.store.lookupAval, this.store).reduce(Lattice.join, BOT);
          result = result.addLast(v.accept(this));
          i = this.lattice.add(i, this.lattice.abst1(1));
        }
        return result.toString();
      }
      return x.toString();      
    }
  
  ConcretePrinter.prototype.visitSome =
    function (x)
    {
      return String(x.cvalue);
    }
  
