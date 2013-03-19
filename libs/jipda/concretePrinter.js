goog.provide('concreteprinter');

/**
 * ConcretePrinter tries to print values as concrete values where possible,
 * but also handles "true" abstract values. 
 * @param lattice primitive lattice used to iterate over array indices
 * @param store
 * @returns
 */

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
      if (x.addresses().length === 1)
      {
        var printedAddress = x.addresses()[0].accept(this);
        return printedAddress;        
      }
      return "{" + x.addresses().map(Visitor.accept(this)).join(",") + "}";
    }
    var printedUser = x.user.accept(this);
    if (x.addresses().length === 0)
    {
      return printedUser;
    }
    return "{" + printedUser + "," + x.addresses().map(Visitor.accept(this)).join(",") + "}"; 
  }

ConcretePrinter.prototype.visitBOT =
  function (x)
  {
    return "_";
  }

ConcretePrinter.prototype.visitTop =
  function (x)
  {
    return "^";
  }

ConcretePrinter.prototype.visitContextAddr =
  function (x)
  {
    var value = this.store.lookupAval(x);
    return value.accept(this);
  }

ConcretePrinter.prototype.visitAddresses =
  function (x)
  {
    if (x.length === 1)
    {
      return x[0].accept(this);
    }
    if (x.length > 1)
    {
      return "{" + x.map(Visitor.accept(this)).join(",") + "}";
    }
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
    if (x.Class.length === 1 && x.isObject())
    {
      return "{" + x.frame.map(
        function (entry)
        {
          return entry[0].accept(this) + ":" + this.visitAddresses(entry[1])
        }, this).join(",") + "}";
    }
    return x.toString();      
  }

ConcretePrinter.prototype.visitSome =
  function (x)
  {
    return String(x.cvalue);
  }
