function LatTajs()
{
  return (function ()
  {
    var module = Object.create(new Lattice());
    
    // WARNING: correct semantics only when BOT is used instead of 'new Value(BOT,BOT,BOT,BOT,BOT)
    // (otherwise 'isTrue' and 'isFalse' will misbehave!)
    function Value(undef, nll, bool, num, str)
    {
      this.undef = undef;
      this.nll = nll;
      this.bool = bool;
      this.num = num;
      this.str = str;
    }
    Value.prototype = new LatticeValue();

    Value.prototype.toString =
      function (printer)
      {
        return "(" + this.undef.toString(printer) + "," + this.nll.toString(printer) + "," + this.bool.toString(printer)
         + "," + this.num.toString(printer) + "," + this.str.toString(printer) + ")";         
      };
      
    var UNDEFTOP = Object.create(new LatticeValue());
    UNDEFTOP.toString = function () { return "^Undef"; };
    UNDEFTOP.value = undefined;
    UNDEFTOP.hasValue = true;
    UNDEFTOP.join = function (other) { return UNDEFTOP };
    UNDEFTOP.compareTo = function (other) { return other === UNDEFTOP ? 0 : 1 };
    UNDEFTOP.ToString = function () { return module.UndefinedStr };
    UNDEFTOP.ToBoolean = function () { return module.False };
    UNDEFTOP.ToUint32 = function () { return UndefUint };
    UNDEFTOP.ToInt32 = function () { return UndefInt32 };
    UNDEFTOP.ToNumber = function () { return UndefNumber };
            
    var NULLTOP = Object.create(new LatticeValue());
    NULLTOP.toString = function () { return "^Null"; };
    NULLTOP.value = null;
    NULLTOP.hasValue = true;
    NULLTOP.join = function (other) { return NULLTOP };
    NULLTOP.compareTo = function (other) { return other === NULLTOP ? 0 : 1 };
    NULLTOP.ToString = function () { return module.NullStr };
    NULLTOP.ToBoolean = function () { return module.False };
    NULLTOP.ToUint32 = function () { return NullUInt };
    NULLTOP.ToInt32 = function () { return NullInt32 };
    NULLTOP.ToNumber = function () { return NullNumber };
                  
    var BOOLTOP = Object.create(new LatticeValue());
    BOOLTOP.toString = function () { return "^Bool"; };
    BOOLTOP.join = function (other) { return BOOLTOP };
    BOOLTOP.compareTo = function (other) { return other === BOOLTOP ? 0 : 1 };
    BOOLTOP.ToString = function () { return new Value(BOT, BOT, BOT, BOT, NotUIntStr) };
    BOOLTOP.ToBoolean = function () { return module.Bool };
    BOOLTOP.ToUint32 = function () { return module.UInt }; // 0 join 1 (Ecma.ToUint32 behavior)    
    BOOLTOP.ToUint32 = function () { return BoolInt32 };    
    BOOLTOP.ToNumber = function () { return BoolNumber };    
              
    var True = {};
    True.value = true;
    True.hasValue = true;
    True.toString = function () { return "True" };
    True.compareTo =
      function (x)
      { 
        if (x === this) 
        {
          return 0;
        }
        if (x === BOT)
        {
          return 1;
        }
        if (x === BOOLTOP)
        {
          return -1;
        }
        return undefined;
      }
    True.join =
      function (x)
      {
        if (x === BOT || x === this)
        {
          return this;
        }
        return BOOLTOP;
      }
    True.ToString =
      function ()
      {
        return module.TrueStr;
      }
    True.ToBoolean =
      function ()
      {
        return module.True;
      }
    True.ToUint32 =
      function ()
      {
        return TrueUInt;
      }
    True.ToInt32 =
      function ()
      {
        return TrueInt32;
      }
    True.ToNumber =
      function ()
      {
        return TrueNumber;
      }
    
    var False = {};
    False.value = false;
    False.hasValue = true;
    False.toString = function () { return "False" };
    False.compareTo =
      function (x)
      { 
        if (x === this) 
        {
          return 0;
        }
        if (x === BOT)
        {
          return 1;
        }
        if (x === BOOLTOP)
        {
          return -1;
        }
        return undefined;
      }
    False.join =
      function (x)
      {
        if (x === BOT || x === this)
        {
          return this;
        }
        return BOOLTOP;
      }
    False.ToString =
      function ()
      {
        return module.FalseStr;
      }
    False.ToBoolean =
      function ()
      {
        return module.False;
      }
    False.ToUint32 =
      function ()
      {
        return FalseUInt;
      }
    False.ToInt32 =
      function ()
      {
        return FalseInt32;
      }
    False.ToNumber =
      function ()
      {
        return FalseNumber;
      }
    
    var NUMTOP = Object.create(new LatticeValue());
    NUMTOP.toString = function () { return "^Num"; };
    NUMTOP.join = function (other) { return NUMTOP };
    NUMTOP.compareTo = function (other) { return other === NUMTOP ? 0 : 1 }; 
    NUMTOP.ToString = function () { return new Value(BOT, BOT, BOT, BOT, STRTOP) };
    NUMTOP.ToBoolean = function () { return module.Bool };
    NUMTOP.ToUint32 = function () { return module.UInt };
    NUMTOP.ToInt32 = function () { return module.Num };
    NUMTOP.ToNumber = function () { return module.Num };
        
    var NegInf = {};
    NegInf.value = -Infinity;
    NegInf.hasValue = true;
    NegInf.toString =
      function () 
      { 
        return "-Inf"
      }
    NegInf.compareTo =
      function (x)
      {
        if (x === this)
        {
          return 0;
        }
        if (x === BOT)
        {
          return 1;
        }
        if (x === Inf || x === NUMTOP)
        {
          return -1;
        }
        return undefined;
      }
    NegInf.join =
      function (x)
      {
        if (x === BOT || x === this)
        {
          return this;
        }
        if (x === PosInf || x === Inf)
        {
          return Inf;
        }
        return NUMTOP;
      }
    NegInf.ToString =
      function ()
      {
        return module.NegInfStr;
      }
    NegInf.ToBoolean =
      function ()
      {
        return module.True;
      }
    NegInf.ToUint32 = function () { return NegInfUInt };
    NegInf.ToInt32 = function () { return NegInfInt32 };
    NegInf.ToNumber = function () { return module.NegInf };
    
    var PosInf = {};
    PosInf.value = Infinity;
    PosInf.hasValue = true;
    PosInf.toString =
      function ()
      {
        return "+Inf"
      }
    PosInf.compareTo =
      function (x)
      {
        if (x === this)
        {
          return 0;
        }
        if (x === BOT)
        {
          return 1;
        }
        if (x === Inf || x === NUMTOP)
        {
          return -1;
        }
        return undefined;
      }
    PosInf.join =
      function (x)
      {
        if (x === BOT || x === this)
        {
          return this;
        }
        if (x === NegInf || x === Inf)
        {
          return Inf;
        }
        return NUMTOP;
      }
    PosInf.ToString =
      function ()
      {
        return module.PosInfStr;
      }
    PosInf.ToBoolean =
      function ()
      {
        return module.True;
      }
    PosInf.ToUint32 = function () { return PosInfUInt };
    PosInf.ToInt32 = function () { return PosInfInt32 };
    PosInf.ToNumber = function () { return module.PosInf };

    var NotANumber = {};
    NotANumber.value = NaN;
    NotANumber.hasValue = true;
    NotANumber.toString =
      function () 
      { 
        return "NaN"
      }
    NotANumber.compareTo =
      function (x)
      {
        if (x === this)
        { 
          return 0;
        }
        if (x === BOT)
        {
          return 1;
        }
        if (x === NUMTOP)
        {
          return -1;
        }
        return undefined;
      }
    NotANumber.join =
      function (x)
      {
        if (x === BOT || x === this)
        {
          return this;
        }
        return NUMTOP;
      }    
    NotANumber.ToString =
      function ()
      {
        return module.NaNStr;
      }
    NotANumber.ToBoolean =
      function ()
      {
        return NaNBoolean;
      }
    NotANumber.ToUint32 =
      function ()
      {
        return NaNUInt;
      }
    NotANumber.ToInt32 =
      function ()
      {
        return NaNInt32;
      }
    NotANumber.ToNumber =
      function ()
      {
        return module.NaN;
      }
    
    function UIntInstance(value)
    {
      this.value = value;
    } 
    UIntInstance.isUInt = 
      function (n)
      {
        return n >= 0 && n < Ecma.POW_2_32 - 1 && n === Math.round(n); // also implemented (sort of) in 'Ecma'      
      }
    UIntInstance.prototype.hasValue = true;
    UIntInstance.prototype.toString =
      function ()
      {
        return this.value.toString(); 
      }
    UIntInstance.prototype.compareTo =
      function (x)
      {
        if (x === BOT)
        {
          return 1;
        }
        if (x === UInt || x === NUMTOP)
        {
          return -1;
        }
        if (x.value === this.value)
        {
          return 0;
        }
        return undefined;
      }
    UIntInstance.prototype.join =
      function (x)
      {
        if (x === BOT || x.value === this.value)
        {
          return this;
        }
        if (x instanceof UIntInstance || x === UInt)
        {
          return UInt;
        }
        return NUMTOP;
      }
    UIntInstance.prototype.ToString =
      function ()
      {
        return new Value(BOT, BOT, BOT, BOT, new UIntStrInstance(this.value.toString())); // Ecma.ToString behavior
      }
    UIntInstance.prototype.ToBoolean =
      function ()
      {
        return this.value ? module.True : module.False; // Ecma.ToBoolean behavior
      }
    UIntInstance.prototype.ToUint32 =
      function ()
      {
        return new Value(BOT, BOT, BOT, this, BOT); 
      }
    UIntInstance.prototype.ToInt32 =
      function ()
      {
        return new Value(BOT, BOT, BOT, this, BOT); 
      }
    UIntInstance.prototype.ToNumber =
      function ()
      {
        return new Value(BOT, BOT, BOT, this, BOT);
      }

    function NotUIntInstance(value)
    {
      this.value = value;
    } 
    NotUIntInstance.prototype.hasValue = true;
    NotUIntInstance.prototype.toString =
      function ()
      {
        return this.value.toString(); 
      }
    NotUIntInstance.prototype.compareTo =
      function (x)
      {
        if (x === BOT)
        {
          return 1;
        }
        if (x === NotUInt || x === NUMTOP)
        {
          return -1;
        }
        if (x.value === this.value)
        {
          return 0;
        }
        return undefined;
      }
    NotUIntInstance.prototype.join =
      function (x)
      {
        if (x === BOT || x.value === this.value)
        {
          return this;
        }
        if (x instanceof NotUIntInstance || x === NotUInt)
        {
          return NotUInt;
        }
        return NUMTOP;
      }
    NotUIntInstance.prototype.ToString =
      function ()
      {
        return new Value(BOT, BOT, BOT, BOT, new NotUIntStrInstance(this.value.toString())); // Ecma.ToString behavior
      }
    NotUIntInstance.prototype.ToBoolean = // in principle 0 is never a NotUInt
      function ()
      {
        //return this.value ? module.True : module.False; // Ecma.ToBoolean behavior
        return module.True;
      }
    NotUIntInstance.prototype.ToUint32 =
      function ()
      {
        return new Value(BOT, BOT, BOT, new UIntInstance(Ecma.ToUint32(this.value)), BOT);
      }
    NotUIntInstance.prototype.ToInt32 =
      function ()
      {
        var r = Ecma.ToInt32(this.value);
        return new Value(BOT, BOT, BOT, r < 0 ? new NotUIntInstance(r) : new UIntInstance(r), BOT);
      }
    NotUIntInstance.prototype.ToNumber =
      function ()
      {
        return new Value(BOT, BOT, BOT, this, BOT);
      }

    var Inf = {};
    Inf.toString =
      function ()
      {
        return "Inf";
      }
    Inf.compareTo =
      function (x)
      {
        if (x === this)
        {
          return 0;
        }
        if (x === BOT || x === NegInf || x === PosInf)
        {
          return 1;
        }
        if (x === NUMTOP)
        {
          return -1;
        }
        return undefined;
      }
    Inf.ToString =
      function ()
      {
        return module.NotUIntStr;
      }
    Inf.ToBoolean =
      function ()
      {
        return module.True;
      }
    Inf.ToUint32 =
      function ()
      {
        return InfUInt;
      }
    Inf.ToInt32 =
      function ()
      {
        return InfInt32;
      }
    Inf.ToNumber =
      function ()
      {
        return module.Inf;
      }
    
    var UInt = {};
    UInt.toString =
      function ()
      {
        return "UInt";
      }
    UInt.isUInt =
      function (n)
      { // also implemented (sort of) in 'Ecma'
        return n >= 0 && n < Ecma.POW_2_32 - 1 && n === Math.round(n)
      }
    UInt.compareTo =
      function (x)
      {
        if (x === this)
        {
          return 0;
        }
        if (x === BOT || x instanceof UIntInstance)
        {
          return 1;
        }
        if (x === NUMTOP)
        {
          return -1;
        }
        return undefined;
      }
    UInt.join =
      function (x)
      {
        if (x === this || x === BOT || x instanceof UIntInstance)
        {
          return this;
        }
        return NUMTOP;
      }
    UInt.ToString =
      function ()
      {
        return module.UIntStr;
      }
    UInt.ToBoolean =
      function ()
      {
        return module.Bool;
      }
    UInt.ToUint32 =
      function ()
      {
        return module.UInt;
      }
    UInt.ToInt32 =
      function ()
      {
        return module.UInt;
      }
    UInt.ToNumber =
      function ()
      {
        return module.UInt;
      }

    var NotUInt = {}
    NotUInt.toString =
      function ()
      {
        return "NotUInt";
      }
    NotUInt.compareTo =
      function (x)
      {
        if (x === this)
        {
          return 0;
        }
        if (x === BOT || x instanceof NotUIntInstance)
        {
          return 1;
        }
        if (x === NUMTOP)
        {
          return -1;
        }
        return undefined;
      }
    NotUInt.join =
      function (x)
      {
        if (x === this || x === BOT || x instanceof NotUIntInstance)
        {
          return this;
        }
        return NUMTOP;
      }  
    NotUInt.ToString =
      function ()
      {
        return module.NotUIntStr;
      }
    NotUInt.ToBoolean =
      function ()
      {
         // 0 is a UInt
        return module.True;
      }
    NotUInt.ToUint32 =
      function ()
      {
        return module.UInt;
      }
    NotUInt.ToInt32 =
      function ()
      {
        return module.Num;
      }
    NotUInt.ToNumber =
      function ()
      {
        return module.NotUInt;
      }
    
    var STRTOP = Object.create(new LatticeValue());
    STRTOP.toString = function () { return "^Str"; };
    STRTOP.join = function (other) { return STRTOP };
    STRTOP.compareTo = function (other) { return other === STRTOP ? 0 : 1 };
    STRTOP.ToString = function () { return module.Str };
    STRTOP.ToBoolean = function () { return module.True };
    STRTOP.ToUint32 = function () { return module.UInt };
    STRTOP.ToInt32 = function () { return module.Num };
    STRTOP.ToNumber = function () { return module.Num };
    
    function UIntStrInstance(value)
    {
      this.value = value;
    }
    UIntStrInstance.prototype.hasValue = true;    
    UIntStrInstance.prototype.toString =
      function ()
      {
        return this.value.toString(); 
      }
    UIntStrInstance.prototype.compareTo =
      function (x)
      {
        if (x === BOT)
        {
          return 1;
        }
        if (x === UIntStr || x === STRTOP)
        {
          return -1;
        }
        if (x.value === this.value)
        {
          return 0;
        }
        return undefined;
      }
    UIntStrInstance.prototype.join =
      function (x)
      {
        if (x === BOT || x.value === this.value)
        {
          return this;
        }
        if (x === UIntStr || x instanceof UIntStrInstance)
        {
          return UIntStr;
        }
        return STRTOP;
      }
    UIntStrInstance.prototype.ToString =
      function ()
      {
        return new Value(BOT, BOT, BOT, BOT, this);
      }
    UIntStrInstance.prototype.ToBoolean =
      function ()
      {
        return module.True;
      }
    UIntStrInstance.prototype.ToUint32 =
      function ()
      {
        return new Value(BOT, BOT, BOT, new UIntInstance(Ecma.ToUint32(this.value)), BOT);
      }
    UIntStrInstance.prototype.ToInt32 =
      function ()
      {
        return new Value(BOT, BOT, BOT, new UIntInstance(Ecma.ToInt32(this.value)), BOT);
      }
    UIntStrInstance.prototype.ToNumber =
      function ()
      {
        return new Value(BOT, BOT, BOT, new UIntInstance(Ecma.ToNumber(this.value)), BOT);
      }
    
    function NotUIntStrInstance(value)
    {
      this.value = value;
    }
    NotUIntStrInstance.prototype.hasValue = true;
    NotUIntStrInstance.prototype.toString =
      function ()
      {
        return this.value.toString(); 
      }
    NotUIntStrInstance.prototype.compareTo =
      function (x)
      {
        if (x === BOT)
        {
          return 1;
        }
        if (x === NotUIntStr || x === STRTOP)
        {
          return -1;
        }
        if (x.value === this.value)
        {
          return 0;
        }
        return undefined;
      }
    NotUIntStrInstance.prototype.join =
      function (x)
      {
        if (x === BOT || x.value === this.value)
        {
          return this;
        }
        if (x === NotUIntStr || x instanceof NotUIntStrInstance)
        {
          return NotUIntStr;
        }
        return STRTOP;
      }
    NotUIntStrInstance.prototype.ToString =
      function ()
      {
        return new Value(BOT, BOT, BOT, BOT, this);
      }
    NotUIntStrInstance.prototype.ToBoolean =
      function ()
      {
        return this.value ? module.True : module.False;
      }
    NotUIntStrInstance.prototype.ToUint32 =
      function ()
      {
        return new Value(BOT, BOT, BOT, new UIntInstance(Ecma.ToUint32(this.value)), BOT);
      }
    NotUIntStrInstance.prototype.ToInt32 =
      function ()
      {
        var r = Ecma.ToInt32(this.value);
        return new Value(BOT, BOT, BOT, r < 0 ? new NotUIntInstance(r) : new UIntInstance(r), BOT);
      }
    NotUIntStrInstance.prototype.ToNumber =
      function ()
      {
        return new Value(BOT, BOT, BOT, new NotUIntInstance(Ecma.ToNumber(this.value)), BOT);
      }

    var UIntStr = {};
    UIntStr.toString =
      function ()
      {
        return "UIntStr";
      }
    UIntStr.compareTo =
      function (x)
      {
        if (x === this)
        {
          return 0;
        }
        if (x === BOT || x instanceof UIntStrInstance)
        {
          return 1;
        }
        if (x === STRTOP)
        {
          return -1;
        }
        return undefined;
      }
    UIntStr.join =
      function (x)
      {
        if (x === this || x === BOT || x instanceof UIntStrInstance)
        {
          return this;
        }
        return STRTOP;
      }
    UIntStr.ToString =
      function ()
      {
        return module.UIntStr;
      }
    UIntStr.ToString =
      function ()
      {
        return module.True;
      }
    UIntStr.ToUint32 =
      function ()
      {
        return module.UInt;
      }
    UIntStr.ToInt32 =
      function ()
      {
        return module.UInt;
      }
    UIntStr.ToNumber =
      function ()
      {
        return module.UInt;
      }

    var NotUIntStr = {};
    NotUIntStr.toString =
      function ()
      {
        return "NotUIntStr";
      }
    NotUIntStr.compareTo =
      function (x)
      {
        if (x === this)
        {
          return 0;
        }
        if (x === BOT || x instanceof NotUIntStrInstance)
        {
          return 1;
        }
        if (x === STRTOP)
        {
          return -1;
        }
        return undefined;
      }
    NotUIntStr.join =
      function (x)
      {
        if (x === this || x === BOT || x instanceof NotUIntStrInstance)
        {
          return this;
        }
        return STRTOP;
      }
    NotUIntStr.ToString =
      function ()
      {
        return module.NotUIntStr;
      }
    NotUIntStr.ToBoolean =
      function ()
      {
        return module.True;
      }
    NotUIntStr.ToUint32 =
      function ()
      {
        return module.UInt;
      }
    NotUIntStr.ToInt32 =
      function ()
      {
        return module.Num;
      }
    NotUIntStr.ToNumber =
      function ()
      {
        return module.NotUInt;
      }
          
    Value.prototype.compareTo =
      function (x)
      {
        if (x === this)
        {
          return 0;
        }
        
        if (x === BOT)
        {
          return 1;
        }
        
//        if (x === TOP)
//        {
//          return -1;
//        }
          
        if (!(x instanceof Value))
        {
          return undefined;
        }
                
        var c = this.undef.compareTo(x.undef);  
        c = Lattice.joinCompareResults(c, this.nll.compareTo(x.nll));
        c = Lattice.joinCompareResults(c, this.bool.compareTo(x.bool));
        if (c === undefined)
        {
          return undefined;
        }
        c = Lattice.joinCompareResults(c, this.num.compareTo(x.num));
        if (c === undefined)
        {
          return undefined;
        }
        c = Lattice.joinCompareResults(c, this.str.compareTo(x.str));
        if (c === undefined)
        {
          return undefined;
        }
        
        return c;
      }
    
    Value.prototype.join =
      function (other)
      {      
        if (other === BOT)
        {
          return this;
        }
        if (other === BOOLTOP)
        {
          return BOOLTOP;
        }
        if (this === other)
        {
          return this;
        }
        
        return new Value(this.undef.join(other.undef), this.nll.join(other.nll), this.bool.join(other.bool), this.num.join(other.num), this.str.join(other.str));
      };

//    Value.prototype.isAddress =
//      function ()
//      {
//        return this.undef === BOT && this.nll === BOT  && this.bool === BOT && this.num === BOT && this.str === BOT && this.as.length > 0;
//      }
//    
//    Value.prototype.addresses =
//      function ()
//      {
//        if (this.as.length === 0)
//        {
//          return false;
//        }
//        return this.as.slice(0);
//      }
        
    Value.prototype.splice =
      function ()
      {
        var result = [];
        if (this.undef !== BOT)
        {
          result = result.addLast(this.undef);
        }
        if (this.nll !== BOT)
        {
          result = result.addLast(this.nll);
        }
        if (this.bool !== BOT)
        {
          result = result.addLast(this.bool);
        }
        if (this.num !== BOT)
        {
          result = result.addLast(this.num);
        }
        if (this.str !== BOT)
        {
          result = result.addLast(this.str);
        }
        return result;
      }
    
    Value.prototype.ToString =
      function ()
      {
        return this.splice().map(function (x) { return x.ToString()}).reduce(Lattice.join, BOT);
      }
      
    Value.prototype.ToUint32 =
      function ()
      {
        return this.splice().map(function (x) { return x.ToUint32() }).reduce(Lattice.join, BOT);
      }
      
    Value.prototype.ToInt32 =
      function ()
      {
        return this.splice().map(function (x) { return x.ToInt32() }).reduce(Lattice.join, BOT);
      }
      
    Value.prototype.ToNumber =
      function ()
      {
        return this.splice().map(function (x) { return x.ToNumber() }).reduce(Lattice.join, BOT);
      }
      
    Value.prototype.ToBoolean =
      function ()
      {
        return this.splice().map(function (x) { return x.ToBoolean()}).reduce(Lattice.join, BOT);
      }
      
    Value.prototype.toValues =
      function ()
      {
        return this.splice().map(function (x) { return x.hasValue ? x.value : x });
      }
      
    function abst1(x)
      {
        if (x === undefined)
        {
          return new Value(UNDEFTOP, BOT, BOT, BOT, BOT);
        }
        if (x === null)
        {
          return new Value(BOT, NULLTOP, BOT, BOT, BOT);
        }
        if (x === true)
        {
          return new Value(BOT, BOT, True, BOT, BOT);
        }
        else if (x === false)
        {
          return new Value(BOT, BOT, False, BOT, BOT);
        }
        if (x === Infinity)
        {
          return new Value(BOT, BOT, BOT, PosInf, BOT);
        }
        if (x === -Infinity)
        {
          return new Value(BOT, BOT, BOT, NegInf, BOT);
        }
        if (typeof x === "number")
        {
          if (isNaN(x))
          {
            return new Value(BOT, BOT, BOT, NotANumber, BOT);
          }
          if (UInt.isUInt(x))
          {
            return new Value(BOT, BOT, BOT, new UIntInstance(x), BOT);
          }
          return new Value(BOT, BOT, BOT, new NotUIntInstance(x), BOT);
        }
        if (typeof x === "string")
        {
          if (Ecma.isArrayIndex(x))
          {
            return new Value(BOT, BOT, BOT, BOT, new UIntStrInstance(x));
          }
          return new Value(BOT, BOT, BOT, BOT, new NotUIntStrInstance(x));        
        }
        throw new Error("cannot handle value " + x);
      }
          
    module.abst = // this could become default impl in Lattice.prototype
      function (cvalues)
      {
        return cvalues.map(abst1).reduce(Lattice.join, BOT);
      }
    
    module.isFalse =
      function (aval)
      {
        return aval.undef === BOT && aval.nll === BOT && aval.bool === False && aval.num === BOT && aval.str === BOT;
      }
      
    // this means 'new Value(BOT,BOT,BOT,BOT,BOT).isTrue()' is true, in other words use BOT for BOT Value!
    module.isTrue =
      function (aval)
      {
        return aval.bool !== False && aval.bool !== BOOLTOP;
      }
    
    module.add =
      function (x, y)
      {
        if (x === BOT || y === BOT)
        {
          return BOT;
        }
        var left = x.splice();
        var right = y.splice();
        var combs = [left, right].combinations();
        var fcombs = combs.flatMap(
          function (p)
          {
            var left = p[0];
            var right = p[1];
            if (left.hasValue && right.hasValue)
            {
              return abst1(left.value + right.value);
            }
            if (left === NUMTOP || right === NUMTOP)
            {
              return module.Num;
            }
            if (left === NotANumber || right === NotANumber)
            {
              return module.NaN;
            }
            if (left === Inf)
            {
              if (right === Inf)
              {
                return InfAddInf;
              }
              if (right === PosInf)
              {
                return InfAddPosInf;
              }
              if (right === NegInf)
              {
                return InfAddNegInf;
              }
              return module.Inf;
            }
            if (right === Inf)
            {
              if (left === NegInf)
              {
                return InfAddNegInf;
              }
              if (left === PosInf)
              {
                return InfAddPosInf;
              }
              return module.Inf;
            }
            if (left === NegInf || right === NegInf)
            {
              return module.NegInf;
            }
            if (left === PosInf || right === PosInf)
            {
              return module.PosInf;
            }
            if (left.value === 0)
            {
              return new Value(BOT, BOT, BOT, right, BOT);
            }
            if (right.value === 0)
            {
              return new Value(BOT, BOT, BOT, left, BOT);
            }
            return module.Num;
          });
        return fcombs.reduce(Lattice.join, BOT);
      }

    module.sub =
      function (x, y)
      {
        if (x === BOT || y === BOT)
        {
          return BOT;
        }
        var left = x.splice();
        var right = y.splice();
        var combs = [left, right].combinations();
        var fcombs = combs.flatMap(
          function (p)
          {
            var left = p[0];
            var right = p[1];
            if (left.hasValue && right.hasValue)
            {
              return abst1(left.value - right.value);
            }
            if (left === NUMTOP || right === NUMTOP)
            {
              return module.Num;
            }
            if (left === NotANumber || right === NotANumber)
            {
              return module.NaN;
            }
            if (left === Inf)
            {
              if (right === Inf || right === PosInf || right === NegInf)
              {
                return module.Num;
              }
              return module.Inf;
            }
            if (right === Inf)
            {
              if (right === PosInf || right === NegInf)
              {
                return module.Num;
              }
              return module.Inf;
            }
            if (left === NegInf || right === PosInf)
            {
              return module.NegInf;
            }
            if (left === PosInf || right === NegInf)
            {
              return module.PosInf;
            }
            if (right.value === 0)
            {
              return new Value(BOT, BOT, BOT, left, BOT);
            }
            if (left.value === 0 && right.value === UInt)
            {
              return module.NotUInt;
            }
            return module.Num;
          });
        return fcombs.reduce(Lattice.join, BOT);
      }
    
    module.mul =
      function (x, y)
      {
        if (x === BOT || y === BOT)
        {
          return BOT;
        }
        var left = x.splice();
        var right = y.splice();
        var combs = [left, right].combinations();
        var fcombs = combs.flatMap(
          function (p)
          {
            var left = p[0];
            var right = p[1];
            if (left.hasValue && right.hasValue)
            {
              return abst1(left.value * right.value);
            }
            if (left === NUMTOP || right === NUMTOP)
            {
              return module.Num;
            }
            if (left === NotANumber || right === NotANumber)
            {
              return module.NaN;
            }
            if (left === Inf)
            {
              if (right.value === 0)
              {
                return module.NaN;
              }
              if (right === UInt)
              {
                return module.Num;
              }
              return module.Inf;
            }
            if (right === Inf)
            {
              if (left.value === 0)
              {
                return module.NaN;
              }
              if (left === UInt)
              {
                return module.Num;
              }
              return module.Inf;
            }
            if (left === NegInf || left === PosInf)
            {
              if (right === NotUInt)
              {
                return module.Inf;
              }
              return module.Num;
            }
            if (right === NegInf || right === PosInf)
            {
              if (left === NotUInt)
              {
                return module.Inf;
              }
              return module.Num;
            }
            if (left.value === 0 || right.value === 0)
            {
              return module.Zero;
            }
            if (left.value === 1)
            {
              return right;
            }
            if (right.value === 1)
            {
              return left;
            }
            return module.Num;
          });
        return fcombs.reduce(Lattice.join, BOT);
      }

    module.div =
      function (x, y)
      {
        if (x === BOT || y === BOT)
        {
          return BOT;
        }
        var left = x.splice();
        var right = y.splice();
        var combs = [left, right].combinations();
        var fcombs = combs.flatMap(
          function (p)
          {
            var left = p[0];
            var right = p[1];
            if (left.hasValue && right.hasValue)
            {
              return abst1(left.value / right.value);
            }
            if (left === NUMTOP || right === NUMTOP)
            {
              return module.Num;
            }
            if (left === NotANumber || right === NotANumber)
            {
              return module.NaN;
            }
            if (left === Inf)
            {
              if (right === Inf || right === PosInf || right === NegInf)
              {
                return module.NaN;
              }
              return module.Inf;
            }
            if (left === NegInf)
            {
              if (right === Inf)
              {
                return module.NaN;
              }
              if (right === UInt)
              {
                return module.NegInf;
              }
              return module.Inf;
            }
            if (left === PosInf)
            {
              if (right === Inf)
              {
                return module.NaN;
              }
              if (right === UInt)
              {
                return module.PosInf;
              }
              return module.Inf;
            }
            if (right === NegInf || right === PosInt || right === Inf)
            {
              return module.Zero; // actually -0 in some cases
            }
            if (left.value === 0)
            {
              return module.Zero;
            }
            if (right.value === 0 && left === NotUInt)
            {
              return module.Inf;
            }
            return module.Num;
          });
        return fcombs.reduce(Lattice.join, BOT);
      }

    module.eqq =
      function (x, y)
      {
        if (x === BOT || y === BOT)
        {
          return BOT;
        }
        var left = x.splice();
        var right = y.splice();
        var combs = [left, right].combinations();
        var fcombs = combs.flatMap(
          function (p)
          {
            var left = p[0];
            var right = p[1];
            if (left.hasValue && right.hasValue)
            {
              return abst1(left.value === right.value);
            }
            if (left === NotANumber || right === NotANumber)
            {
              return module.False;
            }
            if (right === Inf)
            {
              if (left === NegInf || left === PosInf || left === Inf || left === NUMTOP)
              {
                return module.Bool;                
              }
              return module.False
            }
            if (left === Inf)
            {
              if (right === NegInf || right === PosInf || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (left === UInt)
            {
              if (right instanceof UIntInstance || right === UInt || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (right === UInt)
            {
              if (left instanceof UIntInstance || left === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (left === NotUInt)
            {
              if (right instanceof NotUIntInstance || right === NotUInt || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (right === NotUInt)
            {
              if (right instanceof NotUIntInstance || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (left === NUMTOP)
            {
              if (right === NegInf || right === PosInf || right instanceof UIntInstance || right instanceof NotUIntInstance || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (right === NUMTOP)
            {
              if (left === NegInf || left === PosInf || left instanceof UIntInstance || left instanceof NotUIntInstance)
              {
                return module.Bool;
              }
              return module.False;
            }
            throw new Error("eqq: unsupported (spliced) operands " + left +  " " + right);
          });
        return fcombs.reduce(Lattice.join, BOT);
      }

    module.neqq =
      function (x, y)
      {
        if (x === BOT || y === BOT)
        {
          throw new Error("neqq: illegal arguments: " + x + ", " + y);
        }
        var r = module.eqq(x, y);
        if (r.equals(module.True))
        {
          return module.False;
        }
        if (r.equals(module.False))
        {
          return module.True;
        }
        return module.Bool;
      }
    
    function compareRel(x, y, ltTrue, ltFalse, op)
    {
      if (x === BOT || y === BOT)
      {
        return BOT;
      }
      var left = x.splice();
      var right = y.splice();
      var combs = [left, right].combinations();
      var fcombs = combs.flatMap(
        function (p)
        {
          var left = p[0];
          var right = p[1];
          if (left.hasValue && right.hasValue)
          {
            return abst1(op(left.value, right.value));
          }
          if (left === NUMTOP || right === NUMTOP)
          {
            return module.Bool;
          }
          if (left === NotANumber || right === NotANumber)
          {
            return module.False;
          }
          if (left === Inf)
          {
            return module.Bool;
          }
          if (right === Inf)
          {
            return module.Bool;
          }
          if (left === NegInf || right === PosInf)
          {
            return ltTrue;
          }
          if (left === PosInf || right === NegInf)
          {
            return ltFalse;
          }
          return module.Bool;
        });
      return fcombs.reduce(Lattice.join, BOT);
    }
    
    module.eq =
      function (x, y)
      {
        if (x === BOT || y === BOT)
        {
          return BOT;
        }
        var left = x.splice();
        var right = y.splice();
        var combs = [left, right].combinations();
        var fcombs = combs.flatMap(
          function (p)
          {
            var left = p[0];
            var right = p[1];
            if (left.hasValue && right.hasValue)
            {
              return abst1(left.value == right.value);
            }
            if (left === NotANumber || right === NotANumber)
            {
              return module.False;
            }
            if (right === Inf)
            {
              if (left === NegInf || left === PosInf || left === Inf || left === NUMTOP)
              {
                return module.Bool;                
              }
              return module.False
            }
            if (left === Inf)
            {
              if (right === NegInf || right === PosInf || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (left === UInt)
            {
              if (right instanceof UIntInstance || right === UInt || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (right === UInt)
            {
              if (left instanceof UIntInstance || left === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (left === NotUInt)
            {
              if (right instanceof NotUIntInstance || right === NotUInt || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (right === NotUInt)
            {
              if (right instanceof NotUIntInstance || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (left === NUMTOP)
            {
              if (right === NegInf || right === PosInf || right instanceof UIntInstance || right instanceof NotUIntInstance || right === NUMTOP)
              {
                return module.Bool;
              }
              return module.False;
            }
            if (right === NUMTOP)
            {
              if (left === NegInf || left === PosInf || left instanceof UIntInstance || left instanceof NotUIntInstance)
              {
                return module.Bool;
              }
              return module.False;
            }
            throw new Error("eq: unsupported (spliced) operands " + left +  " " + right);
          });
        return fcombs.reduce(Lattice.join, BOT);
      }
    
    module.neq =
      function (x, y)
      {
        if (x === BOT || y === BOT)
        {
          throw new Error("neq: illegal arguments: " + x + ", " + y);
        }
        var r = module.eq(x, y);
        if (r.equals(module.True))
        {
          return module.False;
        }
        if (r.equals(module.False))
        {
          return module.True;
        }
        return module.Bool;
      }
    
    module.lt =
      function (x, y)
      {
        return compareRel(x, y, module.True, module.False, function (a, b) { return a < b});
      }
    
    module.lte =
      function (x, y)
      {
        return compareRel(x, y, module.True, module.False, function (a, b) { return a <= b});
      }
    
    module.gt =
      function (x, y)
      {
        return compareRel(x, y, module.False, module.True, function (a, b) { return a > b});
      }
    
    module.gte =
      function (x, y)
      {
        return compareRel(x, y, module.False, module.True, function (a, b) { return a >= b});
      }
    
    module.binand = 
      function (x, y) // (Int32, Int32)
      {
        if (x === BOT || y === BOT)
        {
          return BOT;
        }
        var left = x.splice();
        var right = y.splice();
        var combs = [left, right].combinations();
        var fcombs = combs.flatMap(
          function (p)
          {
            var left = p[0];
            var right = p[1];
            if (left.hasValue && right.hasValue)
            {
              return abst1(left.value & right.value);
            }
            if (left instanceof NotUIntInst)
            {
              if (right === NotUInt)
              {
                return module.NotUInt;
              }
              return module.UInt;
            }
            if (left === NotUInt)
            {
              if (right instanceof NotUIntInstance || right === NotUInt)
              {
                return module.NotUInt;
              }
              return module.UInt;
            }
            return module.UInt;
          });
        return fcombs.reduce(Lattice.join, BOT);
      }
    
    module.binor = 
      function (x, y) // (Int32, Int32)
      {
        if (x === BOT || y === BOT)
        {
          return BOT;
        }
        var left = x.splice();
        var right = y.splice();
        var combs = [left, right].combinations();
        var fcombs = combs.flatMap(
          function (p)
          {
            var left = p[0];
            var right = p[1];
            if (left.hasValue && right.hasValue)
            {
              return abst1(left.value | right.value);
            }
            if (left instanceof UIntInstance)
            {
              if (right === UInt)
              {
                return module.UInt;
              }
              return module.NotUInt;
            }
            if (left === UInt)
            {
              if (right instanceof UIntInstance || right === UInt)
              {
                return module.UInt;
              }
              return module.NotUInt;
            }
            return module.NotUInt;
          });
        return fcombs.reduce(Lattice.join, BOT);
      }
    
    module.neg =
      function (x)
      {
        return x.splice().map(
          function (a)
          {
            if (a.value)
            {
              return abst1(-a.value);
            }
            if (x === UInt)
            {
              return module.NotUInt;
            }
            if (x === Inf)
            {
              return module.Inf;
            }
            return module.Num;
          }).reduce(Lattice.join, BOT);
      }
      
    module.sqrt =
      function (x)
      {
        return x.splice().map(
          function (a)
          {
            if (a.value)
            {
              return abst1(Math.sqrt(a.value));
            }
            if (x === PosInf)
            {
              return module.PosInf;
            }
            return module.Num;
          }).reduce(Lattice.join, BOT);
      }
      
    module.abst1 = abst1;
    module.True = new Value(BOT, BOT, True, BOT, BOT);
    module.False = new Value(BOT, BOT, False, BOT, BOT);
    module.Bool = new Value(BOT, BOT, BOOLTOP, BOT, BOT);
    module.NaN = new Value(BOT, BOT, BOT, NotANumber, BOT);
    module.PosInf = new Value(BOT, BOT, BOT, PosInf, BOT);
    module.NegInf = new Value(BOT, BOT, BOT, NegInf, BOT);
    module.Inf = new Value(BOT, BOT, BOT, Inf, BOT);
    module.Zero = abst1(0);
    module.UInt = new Value(BOT, BOT, BOT, UInt, BOT);
    module.NotUInt = new Value(BOT, BOT, BOT, NotUInt, BOT);
    module.Num = new Value(BOT, BOT, BOT, NUMTOP, BOT);
    module.Str = new Value(BOT, BOT, BOT, STRTOP, BOT);
    module.UndefinedStr = abst1(Ecma.ToString(undefined));
    module.NullStr = abst1(Ecma.ToString(null));
    module.TrueStr = abst1(Ecma.ToString(true));
    module.FalseStr = abst1(Ecma.ToString(false));
    module.UIntStr = new Value(BOT, BOT, BOT, BOT, UIntStr);
    module.NotUIntStr = new Value(BOT, BOT, BOT, BOT, NotUIntStr);

    const NaNBoolean = abst1(Ecma.ToBoolean(NaN)); // TODO do this for other ToBooleans as well
    
    const UndefUInt = abst1(Ecma.ToUint32(undefined));
    const NullUInt = abst1(Ecma.ToUint32(null));
    const TrueUInt = abst1(Ecma.ToUint32(true));
    const FalseUInt = abst1(Ecma.ToUint32(false));
    const NegInfUInt = abst1(Ecma.ToUint32(-Infinity));
    const PosInfUInt = abst1(Ecma.ToUint32(+Infinity));
    const InfUInt = NegInfUInt.join(PosInfUInt);
    const NaNUInt = abst1(Ecma.ToUint32(NaN));

    const UndefNumber = abst1(Ecma.ToNumber(undefined));
    const NullNumber = abst1(Ecma.ToNumber(null));
    const TrueNumber = abst1(Ecma.ToNumber(true));
    const FalseNumber = abst1(Ecma.ToNumber(false));
    const BoolNumber = TrueNumber.join(FalseNumber);
    
    const UndefInt32 = abst1(Ecma.ToInt32(undefined));
    const NullInt32 = abst1(Ecma.ToInt32(null));
    const TrueInt32 = abst1(Ecma.ToInt32(true));
    const FalseInt32 = abst1(Ecma.ToInt32(false));
    const BoolInt32 = TrueInt32.join(FalseInt32);
    const NegInfInt32 = abst1(Ecma.ToInt32(-Infinity));
    const PosInfInt32 = abst1(Ecma.ToInt32(+Infinity));
    const NaNInt32 = abst1(Ecma.ToInt32(NaN));
    
    const InfAddInf = module.NaN.join(module.Inf);
    const InfAddPosInf = module.NaN.join(module.PosInf);
    const InfAddNegInf = module.NaN.join(module.NegInf);
          
    return module;
  })();
}
