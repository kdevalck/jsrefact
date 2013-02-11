var suiteLatTajsTests = 
  
(function () 
{
  var module = new TestSuite("latTajsTests"); 

  function compareEqual(x, y)
  {
    assertEquals(0, x.compareTo(y));
    assertEquals(0, y.compareTo(x));
  }

  function compareGt(x, y)
  {
    assertEquals(1, x.compareTo(y));
    assertEquals(-1, y.compareTo(x));
  }

  function compareUndefined(x, y)
  {
    assertEquals(undefined, x.compareTo(y));
    assertEquals(undefined, y.compareTo(x));
  }

  function ascendingChain(xs)
  {
    for (var i = 1; i < xs.length; i++)
    {
      compareGt(xs[i], xs[i-1]);
    }
  }
  
  function notComparable(x, ys)
  {
    ys.forEach(function (y) { compareUndefined(x, y); compareUndefined(y, x)});
  }

  module.test1a =
    function ()
    {
      var lat = new LatTajs();
      var c = undefined;
      var a = lat.abst1(c);
      assertEquals("(^Undef,_,_,_,_)", a);
    };
    
  module.test1b =
    function ()
    {
      var lat = new LatTajs();
      var c = null;
      var a = lat.abst1(c);
      assertEquals("(_,^Null,_,_,_)", a);
    };
      
  module.test1c =
    function ()
    {
      var lat = new LatTajs();
      var c = true;
      var a = lat.abst1(c);
      assertEquals("(_,_,True,_,_)", a);
      var a2 = lat.abst1(false);
      var j2 = a.join(a2);
      assertEquals("(_,_,^Bool,_,_)", j2);
      compareUndefined(a, a2);
      compareGt(j2, a);
      var a3 = lat.abst1(123);
      var j3 = a.join(a3);
      assertEquals("(_,_,True,123,_)", j3);
      compareUndefined(a3, a);
      compareGt(j3, a);
    };
      
  module.test1d =
    function ()
    {
      var lat = new LatTajs();
      var c = false;
      var a = lat.abst1(c);
      assertEquals("(_,_,False,_,_)", a);
    };
    
  module.test1e =
    function ()
    {
      var lat = new LatTajs();
      var c = +Infinity
      var a = lat.abst1(c);
      assertEquals("(_,_,_,+Inf,_)", a);
    };
    
  module.test1f =
    function ()
    {
      var lat = new LatTajs();
      var c = -Infinity
      var a = lat.abst1(c);
      assertEquals("(_,_,_,-Inf,_)", a);
    };
    
  module.test1g =
    function ()
    {
      var lat = new LatTajs();
      var c = NaN;
      var a = lat.abst1(c);
      assertEquals("(_,_,_,NaN,_)", a);
  };
    
  module.test1h =
    function ()
    {
      var lat = new LatTajs();
      var a = lat.abst1(0);
      assertEquals("(_,_,_,0,_)", a);
      var b = lat.abst1(1);
      var ab = a.join(b);
      compareUndefined(a, b);
      assertEquals("(_,_,_,UInt,_)", ab);
      compareGt(ab, a);
      var c = lat.abst1(123);
      var ac = a.join(c);
      assertEquals("(_,_,_,UInt,_)", ac);
      compareEqual(ab, ac);
      var abac = ab.join(ac);
      assertEquals("(_,_,_,UInt,_)", abac);
      var d = lat.abst1(-42)
      var ad = a.join(d);
      assertEquals("(_,_,_,^Num,_)", ad);
      compareGt(ad, a);
      compareGt(ad, ab);
    };
    
  module.test1i =
    function ()
    {
      var lat = new LatTajs();
      var c = 10024324;
      var a = lat.abst1(c);
      assertEquals("(_,_,_,10024324,_)", a);
    };
    
  module.test1j =
    function ()
    {
      var lat = new LatTajs();
      var a = lat.abst1(-42);
      assertEquals("(_,_,_,-42,_)", a);
      var b = lat.abst1(1.23);
      var ab = a.join(b);
      compareUndefined(a, b);
      assertEquals("(_,_,_,NotUInt,_)", ab);
      compareGt(ab, a);
      var c = lat.abst1(-1.87);
      var ac = a.join(c);
      assertEquals("(_,_,_,NotUInt,_)", ac);
      compareEqual(ab, ac);
      var abac = ab.join(ac);
      assertEquals("(_,_,_,NotUInt,_)", abac);
      var d = lat.abst1(42)
      var ad = a.join(d);
      assertEquals("(_,_,_,^Num,_)", ad);
      compareGt(ad, a);
      compareGt(ad, ab);
    };
    
  module.test1k =
    function ()
    {
      var lat = new LatTajs();
      var c = -1.87;
      var a = lat.abst1(c);
      assertEquals("(_,_,_,-1.87,_)", a);
    };
    
  module.test1l =
    function ()
    {
      var lat = new LatTajs();
      var c = 1.2;
      var a = lat.abst1(c);
      assertEquals("(_,_,_,1.2,_)", a);
    };
    
  module.test1m =
    function ()
    {
      var lat = new LatTajs();
      var c = "0";
      var a = lat.abst1(c);
      assertEquals("(_,_,_,_,0)", a);
    };
    
  module.test1n =
    function ()
    {
      var lat = new LatTajs();
      var c = "12345";
      var a = lat.abst1(c);
      assertEquals("(_,_,_,_,12345)", a);
    };
    
  module.test1o =
    function ()
    {
      var lat = new LatTajs();
      var c = "NaN";
      var a = lat.abst1(c);
      assertEquals("(_,_,_,_,NaN)", a);
    };
    
  module.test1p =
    function ()
    {
      var lat = new LatTajs();
      var c = "foo";
      var a = lat.abst1(c);
      assertEquals("(_,_,_,_,foo)", a);
    };
      
  module.test1q =
    function ()
    {
      var lat = new LatTajs();
      var c = new ContextAddr(1,2);
      try
      {
        var a = lat.abst1(c);        
      }
      catch (e)
      {
        // expected
        return;
      }
      assertTrue(false);
    };

  module.testNum =
    function ()
    {
      var lat = new LatTajs();
      var a = lat.abst1(-Infinity);
      var b = lat.abst1(+Infinity);
      var c = lat.abst1(NaN);
      var d1 = lat.abst1(0);
      var d2 = lat.abst1(123);
      var e1 = lat.abst1(1.23);
      var e2 = lat.abst1(-42);
      var f = a.join(b);
      var g = d1.join(d2); 
      var h = e1.join(e2);
      var i = g.join(h);
      assertEquals("(_,_,_,-Inf,_)", a);
      assertEquals("(_,_,_,+Inf,_)", b);
      assertEquals("(_,_,_,NaN,_)", c);
      assertEquals("(_,_,_,0,_)", d1);
      assertEquals("(_,_,_,123,_)", d2);
      assertEquals("(_,_,_,1.23,_)", e1);
      assertEquals("(_,_,_,-42,_)", e2);
      assertEquals("(_,_,_,Inf,_)", f);
      assertEquals("(_,_,_,UInt,_)", g);
      assertEquals("(_,_,_,NotUInt,_)", h);
      assertEquals("(_,_,_,^Num,_)", i);
      ascendingChain([BOT, a, f, i]);
      ascendingChain([BOT, b, f, i]);
      ascendingChain([BOT, c, i]);
      ascendingChain([BOT, d1, g, i]);
      ascendingChain([BOT, d2, g, i]);
      ascendingChain([BOT, e1, h, i]);
      ascendingChain([BOT, e2, h, i]);
      [a,b,c,d1,d2,e1,e2,f,g,h,i].forEach(function(x) {compareEqual(x, x)});
      notComparable(a, [b, c, d1, d2, e1, e2, g, h]);
      notComparable(b, [a, c, d1, d2, e1, e2, g, h]);
      notComparable(c, [a, b, d1, d2, e1, e2, f, g, h]);
      notComparable(d1, [a, b, c, d2, e1, e2, f, h]);
      notComparable(d2, [a, b, c, d1, e1, e2, f, h]);
      notComparable(e1, [a, b, c, d1, d2, e2, f, g]);
      notComparable(e2, [a, b, c, d1, d2, e1, f, g]);
      notComparable(f, [g, h]);
      notComparable(g, [f, h]);
      notComparable(h, [f, g]);
    }
  
  module.testPlus =
    function ()
    {
      var lat = new LatTajs();
      var x1 = lat.abst1(1);
      var x2 = lat.abst1(2);
      var x3 = lat.add(x1, x2);
      assertEquals("(_,_,_,3,_)", x3);
      var x4 = lat.abst1(-1);
      var x5 = lat.add(x3, x4);
      assertEquals(x2, x5);
      var x6 = lat.abst1(-42);
      var x7 = lat.add(x5, x6);
      assertEquals("(_,_,_,-40,_)", x7);      
      var x8 = lat.abst1(-2);
      var x9 = lat.add(x7, x8);
      assertEquals("(_,_,_,-42,_)", x9);
      var j1 = x1.join(x2);
      assertEquals("(_,_,_,UInt,_)", j1);
      var j2 = x6.join(x7);
      assertEquals("(_,_,_,NotUInt,_)", j2);
      var j3 = x9.join(x1);
      assertEquals("(_,_,_,^Num,_)", j3);
      assertEquals("(_,_,_,^Num,_)", lat.add(j1, j1));      
      assertEquals("(_,_,_,^Num,_)", lat.add(j2, j2));      
      assertEquals("(_,_,_,^Num,_)", lat.add(j3, j3));      
    };
        
  module.testLt =
    function ()
    {
      var lat = new LatTajs();
      var x1 = lat.abst1(1);
      var x2 = lat.abst1(2);
      assertEquals(lat.abst1(true), lat.lt(x1, x2));
      assertEquals(lat.abst1(false), lat.lt(x2, x1));
    };
    
  module.testAddZeroBug =
    function ()
    {
      var lat = new LatTajs();
      var x1 = lat.abst1(1);
      var x2 = lat.abst1(0);
      assertEquals(lat.abst1(1), lat.add(x1, x2));      
      assertEquals(lat.abst1(1), lat.add(x2, x1));      
    }
            
  module.testEqqZeroBug =
    function ()
    {
      var lat = new LatTajs();
      var x1 = lat.UInt;
      var x2 = lat.Zero;
      assertEquals(lat.Bool, lat.eqq(x1, x2));      
    }
            
  return module;
})();

