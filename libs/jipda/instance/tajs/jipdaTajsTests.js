var suiteJipdaTajsTests = new TestSuite("jipdaTajsTests");

  
suiteJipdaTajsTests.test1a =
  function ()
  {
    var ast = createAst("42");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(42), state.result);
  };
  
suiteJipdaTajsTests.test1b =
  function ()
  {
    var ast = createAst("undefined");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  };
      
suiteJipdaTajsTests.test2a =
  function ()
  {
    var ast = createAst("41; 42;");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(42), state.result);
  };
  
suiteJipdaTajsTests.test2b = // 12.1
  function ()
  {
    var ast = createAst("1;;;;;");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(1), state.result);
  };

suiteJipdaTajsTests.test2c = // 12.1
  function ()
  {
    var ast = createAst("1;{}");
    var lat = new LatTajs();
    var state = new ResultState();

    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(1), state.result);
  };
          
suiteJipdaTajsTests.test2d = // 12.1
  function ()
  {
    var ast = createAst("1;var a;");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(1), state.result);
  };
          
suiteJipdaTajsTests.test3 =
	function ()
	{
		var ast = createAst("var a = 1;");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(undefined), state.result);
	};
	
suiteJipdaTajsTests.test4 =
	function ()
	{
		var ast = createAst("var a = 1; a;");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(1), state.result);
	};
	
suiteJipdaTajsTests.test5 =
	function ()
	{
		var ast = createAst("var a = 2; a+a;");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTajsTests.test6 =
	function ()
	{
		var ast = createAst("var a = 2, b = 3; a*b;");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(6), state.result);
	};
	
suiteJipdaTajsTests.test7 =
	function ()
	{
		var ast = createAst("var a = 3, b = 4, c = 5; a-b-c;");
    var lat = new LatTajs();
    var state = new ResultState();

    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(-6), state.result);
	};
	
suiteJipdaTajsTests.test8a =
	function ()
	{
		var ast = createAst("var sq = function (x) {return x * x;}; sq;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertTrue(state.result.isAddress());
		assertEquals(1, state.result.addresses().length);
	};

suiteJipdaTajsTests.test8b =
	function ()
	{
		var ast = createAst("function sq(x) {return x * x;}; sq;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertTrue(state.result.isAddress());
    assertEquals(1, state.result.addresses().length);
	};

suiteJipdaTajsTests.test9 =
	function ()
	{
		var ast = createAst("var a = 4; a = 5; a;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(5), state.result);
	};
	
suiteJipdaTajsTests.test10a =
	function ()
	{
		var ast = createAst("var pi = function () {return 3;}; pi(); pi();");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTajsTests.test10b =
	function ()
	{
		var ast = createAst("function pi() {return 3;}; pi(); pi();");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTajsTests.test11a =
	function ()
	{
		var ast = createAst("var sq = function (x) {return x * x;}; sq(5);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(25), state.result);
	};

suiteJipdaTajsTests.test11b =
	function ()
	{
		var ast = createAst("function sq(x) {return x * x;}; sq(5);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(25), state.result);
	};

suiteJipdaTajsTests.test12a =
  function ()
  {
    var ast = createAst("var sq = function (x) {return x * x;}; sq(5); sq(6);");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg, performGc: false});
    var x = lat.abst1(5).join(lat.abst1(6));
    assertEquals(lat.mul(x, x), state.result.user);
    assertEquals([], state.result.as);
  };

suiteJipdaTajsTests.test12aa =
  function ()
  {
    var ast = createAst("var sq = function (x) {return x * x;}; sq(5); sq(6);");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg, performGc: false});
    assertEquals(ipda.lattice.abst1(36), state.result);
  };

suiteJipdaTajsTests.test12b =
	function ()
	{
		var ast = createAst("var sq = function (x) {return x * x;}; sq(5); sq(6);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(36), state.result);
	};

suiteJipdaTajsTests.test13 =
	function ()
	{
		var ast = createAst("var sq = function (x) {return x * x;}; sq(5); sq(6);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(36), state.result);
	};

suiteJipdaTajsTests.test14 =
	function ()
	{
		var ast = createAst("var f = function () { 123; }; f();");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(undefined), state.result);
	};

suiteJipdaTajsTests.test15 =
	function ()
	{
		var ast = createAst("var z = false; var writez = function () { z = 123; }; var readz = function() { return z; }; [writez(), readz()];");
		var lat = new LatTajs();
    var state = new ResultState();
    var result = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("[_, [[[(^Undef,_,_,_,_), []],[(_,_,_,123,_), []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};

suiteJipdaTajsTests.test16 =
	function ()
	{
		var ast = createAst("var f = function (x) { return function (y) { return x + y; }; }; f(1)(2);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTajsTests.test17a =
	function ()
	{
		var arrayStr = "[0 === 0, 0 !== 0, 1 === 0, 1 !== 0]";
		var ast = createAst(arrayStr);
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		var arrayAddress = state.result.addresses()[0];
		var expected = eval(arrayStr);
		assertEquals("[_, [[[(_,_,True,_,_), []],[(_,_,False,_,_), []],[(_,_,False,_,_), []],[(_,_,True,_,_), []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};		
	
suiteJipdaTajsTests.test17b =
	function ()
	{
		var arrayStr = "[3<4,3<=4,3>4,3>=4,3<3,3<=3,3>3,3>=3,4<3,4<=3,4>3,4>=3]";
		var ast = createAst(arrayStr);
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		var arrayAddress = state.result.addresses()[0];
		var expected = eval(arrayStr);
    assertEquals("[_, [[[(_,_,True,_,_), []],[(_,_,True,_,_), []],[(_,_,False,_,_), []],[(_,_,False,_,_), []],[(_,_,False,_,_), []],[(_,_,True,_,_), []],[(_,_,False,_,_), []],[(_,_,True,_,_), []],[(_,_,False,_,_), []],[(_,_,False,_,_), []],[(_,_,True,_,_), []],[(_,_,True,_,_), []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};		
	
suiteJipdaTajsTests.test18a =
	function ()
	{
		var ast = createAst("var f = function() { if (0 === 0) { return 'true'; } else { return 'false' }}; f();");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("true"), state.result);
	};			
	
suiteJipdaTajsTests.test18b =
	function ()
	{
		var ast = createAst("var f = function() { if (0 !== 0) { return 'true'; } else { return 'false' }}; f();");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("false"), state.result);
	};
	
suiteJipdaTajsTests.test18c =
	function ()
	{
		var ast = createAst("var f = function() { if (0 === 0) { if (0 === 1) { return 'true1';} else { return 'false1';}} else { return 'false';}}; f();");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("false1"), state.result);
	};

suiteJipdaTajsTests.test18d =
	function ()
	{
		var ast = createAst("var f = function() { if (0 === 0) { return 'true'; } return 'false'}; f();");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("true"), state.result);
	};			
	
suiteJipdaTajsTests.test18e =
	function ()
	{
		var ast = createAst("var f = function() { if (0 !== 0) { return 'true'; } return 'false'}; f();");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("false"), state.result);
	};
	
	
suiteJipdaTajsTests.test19a =
	function ()
	{
		var ast = createAst("var count = function (n) {if (n===0) {return 'done';} else {return count(n-1);}}; count(200);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("done"), state.result);
	};
	
suiteJipdaTajsTests.test19b =
	function ()
	{
		var ast = createAst("var count = function (n) {if (n===0) {return 'done';} else {return count(n-1);}}; count(200);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("done"), state.result);
	};
	
suiteJipdaTajsTests.test20 =
	function ()
	{
		var ast = createAst("var t = function (x) {return t(x+1);}; t(0);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(BOT, state.result);
	};
	
suiteJipdaTajsTests.test21 =
	function ()
	{
		var ast = createAst("var fib = function (n) {if (n<2) {return n;} return fib(n-1)+fib(n-2);}; fib(4);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTajsTests.test22a =
	function ()
	{
		var ast = createAst("[1,2,3].concat([4,5]);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("[_, [[[(_,_,_,1,_), []],[(_,_,_,2,_), []],[(_,_,_,3,_), []],[(_,_,_,4,_), []],[(_,_,_,5,_), []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	
	
suiteJipdaTajsTests.test22b =
	function ()
	{
		var ast = createAst("function f() { return [1,2] }; f().concat([3,4,5]);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals("[_, [[[(_,_,_,1,_), []],[(_,_,_,2,_), []],[(_,_,_,3,_), []],[(_,_,_,4,_), []],[(_,_,_,5,_), []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	
	

suiteJipdaTajsTests.test23 =
	function ()
	{
		var ast = createAst("var appender=function (h, a, b) {return h(a).concat(h(b))}; var lister=function (g) {return function (x) { return [g(x)]; };}; var square=function (y) { return y*y;}; appender(lister(square), 42, 43);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals("[_, [[[(_,_,_,1764,_), []],[(_,_,_,1849,_), []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	

	
suiteJipdaTajsTests.test24 =
	function ()
	{
		var ast = createAst("var z = []; var appender=function (h, a, b) {return h(a).concat(h(b));}; var lister=function (g) {return function (x) { return [g(x)]; };}; var conser=function (y) { z = [y, z]; return z;}; appender(lister(conser), 42, 43);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals("[_, [[[_, [[[(_,_,_,42,_), []],[_, [[]]]]]],[_, [[[(_,_,_,43,_), []],[_, [[[(_,_,_,42,_), []],[_, [[]]]]]]]]]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	
	

suiteJipdaTajsTests.test25 =
	function ()
	{
		var ast = createAst("var z=0; var f=function () {z=z+1;}; f(); f(); f(); f(); z;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTajsTests.test26a =
	function ()
	{
		var ast = createAst("var z=0; var f=function (i) { if (i<4) {z=z+1;f(i+1);}}; f(0); z;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:3, ag: timeDefaultAg});
		assertEquals(lat.Num, state.result.user); // concrete: 4
		assertEquals([], state.result.as);
	};
	
suiteJipdaTajsTests.test26b =
	function ()
	{
		var ast = createAst("var z=0; var f=function (i) { if (i<4) {z=z+1;f(i+1);}}; f(0); z;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTajsTests.test27a =
	function ()
	{
		var ast = createAst("var z=0; var s=0; var f=function (i) {if (z === 7) {s=s+1} if (i<10) {z=z+1;f(i+1);}}; f(0); s;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		// concrete: 1 (but k === 0 !!!)
		assertEquals(lat.Num, state.result.user);
		assertEquals([], state.result.as);
	};
	
suiteJipdaTajsTests.test27b =
	function ()
	{
		var ast = createAst("var z=0; var c=false; var f=function (i) {if (z === 7) {c=true} if (i<10) {z=z+1;f(i+1);}}; f(0); c;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    // concrete: true
		assertEquals(lat.Bool, state.result.user);
		assertEquals([], state.result.as);
		
	};
	
suiteJipdaTajsTests.test27c =
	function ()
	{
		var ast = createAst("var z=0; var c=false; var f=function (i) {if (z === 7) {c=true} if (i<10) {z=z+1;f(i+1);}}; f(0); z;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:999, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(10), state.result);
		var varC = $$$(ast).findDeclarationIdentifiers("c").toNode();
    var actual = state.store.entries.flatMap(function (entry) { if (entry[0].base === varC) { return entry[1].aval; } return []}).reduce(Lattice.join); 
		assertEquals(ipda.lattice.abst1(true), actual);
	};
	
suiteJipdaTajsTests.test28 =
	function ()
	{
		var ast = createAst("var o = {}; o;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertTrue(state.result.isAddress());
    assertEquals(1, state.result.addresses().length);
		var address = state.result.addresses()[0];
		assertTrue(address instanceof Addr);
		var objs = state.store.lookupAval(address);
		assertEquals(1, objs.conc().length);
		var obj = objs.conc()[0];
		assertTrue(obj instanceof Benv);
		assertEquals([], obj.addresses());
	};
	
suiteJipdaTajsTests.test29 =
	function ()
	{
		var ast = createAst("var o = {x:3,y:4}; o;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertTrue(state.result.isAddress());
		assertEquals(1, state.result.addresses().length);
		var address = state.result.addresses()[0];
		assertTrue(address instanceof Addr);
		var objs = state.store.lookupAval(address);
		assertEquals(1, objs.conc().length);
		var obj = objs.conc()[0];
		assertTrue(obj instanceof Benv);
		assertEquals(2, obj.addresses().length);
		assertEquals(["(_,_,_,_,y)","(_,_,_,_,x)"], obj.frame.map(function (entry) { return entry[0].toString()}));
		var xAddrs = obj.lookup(lat.abst(["x"])).addresses;
		assertEquals(1, xAddrs.length);
		assertEquals(ipda.lattice.abst1(3), state.store.lookupAval(xAddrs[0]));
		var yAddrs = obj.lookup(lat.abst(["y"])).addresses;
		assertEquals(1, yAddrs.length);
		assertEquals(ipda.lattice.abst1(4), state.store.lookupAval(yAddrs[0]));
	};
	
suiteJipdaTajsTests.test30 =
	function ()
	{
		var ast = createAst("var o = {x:3,y:4}; o.y;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTajsTests.test31 =
	function ()
	{
		var ast = createAst("var o = {square:function (x) {return x*x;}}; o.square(4);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(16), state.result);
	};
	
suiteJipdaTajsTests.test32 =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x=4; o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTajsTests.test33 =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x=4; o.x=5; o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(5), state.result);
	};
	
suiteJipdaTajsTests.test34 =
	function ()
	{
		var ast = createAst("var o = {x:3}; var p = {y:o}; p.y.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTajsTests.test35 =
	function ()
	{
		var ast = createAst("var o = {x:3}; var p = o; p.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTajsTests.test36 =
	function ()
	{
		var ast = createAst("var o={z:[]}; var appender=function (h, a, b) {return h(a).concat(h(b))}; var lister=function (g) {return function (x) { return [g(x)]; };}; var conser=function (y) { o.z = [y, o.z]; return o.z;}; appender(lister(conser), 42, 43);");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals("[_, [[[_, [[[(_,_,_,42,_), []],[_, [[]]]]]],[_, [[[(_,_,_,43,_), []],[_, [[[(_,_,_,42,_), []],[_, [[]]]]]]]]]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	
	
suiteJipdaTajsTests.test37 =
	function ()
	{
		var ast = createAst("var x=0; var o = {x:3, f:function() {return x;}}; o.f();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(0), state.result);
	};
	
	
suiteJipdaTajsTests.test38 =
	function ()
	{
		var ast = createAst("function sq(x) {return x*x;}; sq(5); sq(6);");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(36), state.result);
	};	
	
suiteJipdaTajsTests.test39 =
	function ()
	{
		var ast = createAst("function C() { this.x = 42; } var o = new C(); o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(42), state.result);
	};
	
suiteJipdaTajsTests.test40 =
	function ()
	{
		var ast = createAst("function C(xx) { this.x = xx; } var o = new C(43); o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(43), state.result);
	};
	
suiteJipdaTajsTests.test41 =
	function ()
	{
		var ast = createAst("function C(xx) { this.x = xx; } var o = new C(43); var oo = new C(42); oo.x + o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(85), state.result);
	};
	
suiteJipdaTajsTests.test42 =
	function ()
	{
		var ast = createAst("function C(xx) { this.x = xx; } var o = new C(43); var oo = new C(42); o.x = oo.x; o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(42), state.result);
	};	

suiteJipdaTajsTests.test43a = // http://jsperf.com/access-object-properties-via-closure-vs-this/2
	function ()
	{
		var ast = createAst("function C(n) {var nn=n; this.f=function () {nn=nn+1;return nn;}}; var o=new C(3); o.f(); o.f(); o.f();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(6), state.result);
	};	

suiteJipdaTajsTests.test43b =
	function ()
	{
		var ast = createAst("function C(n) {this.nn=n; this.f=function () {this.nn=this.nn+1;return this.nn;}}; var o=new C(30); o.f(); o.f(); o.f();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(33), state.result);
	};	

suiteJipdaTajsTests.test43c =
	function ()
	{
		var ast = createAst("function C(n) {var self=this; self.nn=n; self.f=function () {self.nn=self.nn+1;return this.nn;}}; var o=new C(300); o.f(); o.f(); o.f();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(303), state.result);
	};	

suiteJipdaTajsTests.test44a =
	function ()
	{
		var ast = createAst("var n = 123;function HotDog(){this.n = 456;this.getN = function () { return n; };}; var myHotDog = new HotDog(); myHotDog.getN();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(123), state.result);
	};	

suiteJipdaTajsTests.test44b =
	function ()
	{
		var ast = createAst("var n = 123;function HotDog(){this.n = 456;this.getN = function () { return this.n; };}; var myHotDog = new HotDog(); myHotDog.getN();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(456), state.result);
	};	

suiteJipdaTajsTests.test44c =
	function ()
	{
		var ast = createAst("var n = 123;function HotDog(){this.n = 456;this.getN = function () { return this.n; };}; var myHotDog = new HotDog(); var x = myHotDog.getN;x();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(123), state.result);
	};	
	
suiteJipdaTajsTests.test45a =
	function ()
	{
		var ast = createAst("var o={f:function() { return this;}}; o.f() === o;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTajsTests.test45b =
	function ()
	{
		var ast = createAst("var o={f:function() { return this;}}; ((function() {return o;})()).f() === o;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTajsTests.test45c =
	function ()
	{
		var ast = createAst("var o={f:function() { return this;}}; var x = o.f; x() === this;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTajsTests.test46x =
	function ()
	{
		var ast = createAst("var H = function () {this.f=function () {this.getN=function () {return 999;}}};var m=new H(); var m2=new m.f(); m2.getN();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(999), state.result);
	};	

suiteJipdaTajsTests.test46a =
	function ()
	{
		var ast = createAst("var n=123;function H() {this.n=456;this.f=function () {this.n=789;this.getN=function () {return this.n;}}};var m=new H();var m2=new m.f();m2.getN();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(789), state.result);
	};	

suiteJipdaTajsTests.test46b =
	function ()
	{
		var ast = createAst("var n=123;function H(){this.n=456;this.f=function () {this.n=789;this.getN=function () {return this.n;}};this.m=new this.f();this.x=this.m.getN;this.nn=this.x()};var m2=new H();m2.nn;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(456), state.result);
	};	

suiteJipdaTajsTests.test47a =
	function ()
	{
		var ast = createAst("var Foo = {}; Foo.method = function() { function test() { return this; }; return test();}; this === Foo.method();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTajsTests.test47b =
	function ()
	{
		var ast = createAst("var Foo = {}; Foo.method = function() { var that=this; function test() { return that; }; return test();}; this === Foo.method();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(false), state.result);
	};	

suiteJipdaTajsTests.test47c =
	function ()
	{
		var ast = createAst("var Foo = {}; Foo.method = function() { var that=this; function test() { return that; }; return test() === this;}; Foo.method();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTajsTests.test48a =
	function ()
	{
		var ast = createAst("function C() { var x=3; this.y=4; }; var o = new C(); o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(undefined), state.result);
	};	

suiteJipdaTajsTests.test48b =
	function ()
	{
		var ast = createAst("function C() { var x=3; this.y=4; this.f=function() { return x + this.y}}; var o = new C(); o.f();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(7), state.result);
	};	

suiteJipdaTajsTests.test48c =
	function ()
	{
		var ast = createAst("function C() { var x=3; this.y=4; this.f=function() { return x + y}}; var o = new C(); o.f();");
		var lat = new LatTajs();
    var state = new ResultState();
		try
		{
			var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		}
		catch (e)
		{
			assertEquals("Error: no addresses for y", e.toString()); // TODO not stable
			return;
		}
		assertTrue(false); // fail
	};	

suiteJipdaTajsTests.test48d =
	function ()
	{
		var ast = createAst("function C() { var x=3; this.y=4; this.f=function() { return this.x}}; var o = new C(); o.f();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(undefined), state.result);
	};	

suiteJipdaTajsTests.test49 =
	function ()
	{
		var ast = createAst("var o={}; var i=5; o[0]=1;o[2*3]=2; o[i+1]+o[0];");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(3), state.result);
	};	

suiteJipdaTajsTests.test50 =
	function ()
	{
		var ast = createAst("var o={}; var i=5; function f1() {o[0]=1}; function f2() {return o[2*3]=2}; f1(); f2();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(2), state.result);
	};	

suiteJipdaTajsTests.test51 =
	function ()
	{
		var ast = createAst("var o=[]; var i=5; function f1() {o[0]=1}; function f2() {return o[2*3]=2}; f1(); f2();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(2), state.result);
	};
	
suiteJipdaTajsTests.test52a =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		var cvalues = state.result.addresses();
		assertEquals(1, cvalues.length);
		assertTrue(cvalues[0] instanceof Addr);
		var protoObjs = state.store.lookupAval(cvalues[0]).conc();
		assertEquals(1, protoObjs.length);
		assertTrue(protoObjs[0] instanceof Benv);
	}	

suiteJipdaTajsTests.test52b =
	function ()
	{
		var ast = createAst("function Circle(radius) {this.radius = radius;}; Circle.prototype;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		var cvalues = state.result.addresses();
		assertEquals(1, cvalues.length);
		assertTrue(cvalues[0] instanceof Addr);
		var protoObjs = state.store.lookupAval(cvalues[0]).conc();
		assertEquals(1, protoObjs.length);
		assertTrue(protoObjs[0] instanceof Benv);
	}	

suiteJipdaTajsTests.test53a =
	function ()
	{
		var ast = createAst("function Circle(radius) {this.radius = radius;}; Circle.prototype.y=123;Circle.prototype.y;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTajsTests.test53b =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.y=123;Circle.prototype.y;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTajsTests.test54 =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.n=123;var x=new Circle(1); x.n;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTajsTests.test55a =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.n=123;var x=new Circle(1);var y=new Circle(2);");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg}); // not k=0: two circle objects (with address [constructor, time] merge to top with LatN(1)
    assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTajsTests.test55b =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.n=123;var x=new Circle(1);var y=new Circle(2);x.radius+y.radius;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(3), state.result);
	}	

suiteJipdaTajsTests.test55c =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.n=123;var x=new Circle(1);x.n;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTajsTests.test56 =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.area=function () { return 3*this.radius*this.radius;}; var x=new Circle(3), y=new Circle(4); [x.area(), y.area()];");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
		assertEquals("[_, [[[(_,_,_,27,_), []],[(_,_,_,48,_), []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	}	

suiteJipdaTajsTests.test57 =
	function ()
	{
    var ast = createAst("var Circle=function (radius) {return function() {return radius}}; var x=new Circle(432);x();");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(432), state.result);
	}	

suiteJipdaTajsTests.test58a =
	function ()
	{
		var ast = createAst("var z = 0; z++;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(0), state.result);
	}	

suiteJipdaTajsTests.test58b =
	function ()
	{
		var ast = createAst("var z = 0; ++z;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(1), state.result);
	}	

suiteJipdaTajsTests.test58c =
	function ()
	{
		var ast = createAst("var z = 0; z++; z;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(1), state.result);
	}	

suiteJipdaTajsTests.test58d =
	function ()
	{
		var ast = createAst("var z = 0; ++z; z;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(1), state.result);
	}	

suiteJipdaTajsTests.test58e =
	function ()
	{
		var ast = createAst("var z = 3; z++ + z;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(7), state.result);
	}
	
suiteJipdaTajsTests.test58f =
	function ()
	{
		var ast = createAst("var z = 3; ++z + z;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(8), state.result);
	}	


suiteJipdaTajsTests.test59a =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x++;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(3), state.result);
	}	

suiteJipdaTajsTests.test59b =
	function ()
	{
		var ast = createAst("var o = {x:3}; ++o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(4), state.result);
	}	

suiteJipdaTajsTests.test59c =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x++; o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(4), state.result);
	}	

suiteJipdaTajsTests.test59d =
	function ()
	{
		var ast = createAst("var o = {x:3}; ++o.x; o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(4), state.result);
	}	

suiteJipdaTajsTests.test59e =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x++ + o.x;");
		var lat = new LatTajs();
    var state = new ResultState();

		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(7), state.result);
	}	

suiteJipdaTajsTests.test59f =
	function ()
	{
		var ast = createAst("var o = {x:3}; ++o.x + o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(8), state.result);
	}	

suiteJipdaTajsTests.test60a =
	function ()
	{
		var ast = createAst("var o={x:3}; var f=function() {return o}; f()['x']++ + o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(7), state.result);
	}	

suiteJipdaTajsTests.test60b =
	function ()
	{
		var ast = createAst("var o={x:3}; var f=function() {return o}; ++f()['x'] + o.x;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(8), state.result);
	}	

suiteJipdaTajsTests.test61a =
	function ()
	{
		var ast = createAst("for (var i=0; i<3; i++) i;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:2, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(2), state.result);
	}	

suiteJipdaTajsTests.test61aa =
	function ()
	{
		var ast = createAst("for (var i=0; i<3; i++) i;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
		assertEquals(lat.Num, state.result.user);
		assertEquals([], state.result.as);
		// time is limiting factor: 3 iterations have same var i, but timestamps [], [x], [x,y]
	}	

suiteJipdaTajsTests.test61b =
	function ()
	{
		var ast = createAst("for (var i=0; i<3; i++) i; i;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:2, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(3), state.result);
	}	

suiteJipdaTajsTests.test61bb =
	function ()
	{
		var ast = createAst("for (var i=0; i<3; i++) i; i;");
		var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
    assertEquals(lat.Num, state.result.user);
    assertEquals([], state.result.as);
	}	

suiteJipdaTajsTests.test62 =
	function ()
	{
		var ast = createAst("for (var i=0; false; i++) 123; i;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(0), state.result);
	}	

suiteJipdaTajsTests.test63 =
	function ()
	{
		var ast = createAst("for (var i=0; false; i++) 123;");
		var lat = new LatTajs();
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(undefined), state.result);
	}	

suiteJipdaTajsTests.test64 =
  function ()
  {
    var ast = createAst("for (var i=0; true; i++) i; i;");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(BOT, state.result);
  } 

suiteJipdaTajsTests.test65 =
  function ()
  {
    var ast = createAst("var ar = []; for (var i = 0; i < 1000; i++) {ar[i] = i;}; ar;");
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    //assertEquals("{100}", state.result);
  } 

suiteJipdaTajsTests.test66 =
  function ()
  {
    var src = "function Xyz(n) { this.n = n }; var p = Xyz; p(123); n;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(123), state.result);
  }

suiteJipdaTajsTests.test67 =
  function ()
  {
    var src = "Object.prototype === Function.prototype";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(false), state.result);
  }

suiteJipdaTajsTests.test68 =
  function ()
  {
    var src = "var o = new Object(); Object.prototype.a = 123; o.a;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(123), state.result);
  }

suiteJipdaTajsTests.test69 =
  function ()
  {
    var src = read("resources/tajs2009.js");
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1("jens"), state.result);
  }

suiteJipdaTajsTests.test70a =
  function ()
  {
    var src = "[].xyz;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  }

suiteJipdaTajsTests.test70b =
  function ()
  {
    var src = "({}).xyz;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  }

suiteJipdaTajsTests.test70c =
  function ()
  {
    var src = "(function () {}).xyz;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  }

suiteJipdaTajsTests.test71a =
  function ()
  {
    var src = "var x = []; x.push(1); x;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals("[_, [[[(_,_,_,1,_), []]]]]", state.result.toString(createJipdaPrinter(lat, state.store))); 
  }

suiteJipdaTajsTests.test71b =
  function ()
  {
    var src = "var x = []; x.push(1); x.length;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(1), state.result);
  }

suiteJipdaTajsTests.test72 =
  function ()
  {
    var src = "var x;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  }

suiteJipdaTajsTests.test73a =
  function ()
  {
    var src = "var b = 3; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(1), state.result);
  }

suiteJipdaTajsTests.test73b =
  function ()
  {
    var src = "var b; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result);
  }

suiteJipdaTajsTests.test73c =
  function ()
  {
    var src = "var b = 0; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result);
  }

suiteJipdaTajsTests.test73d =
  function ()
  {
    var src = "var b = null; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result);
  }

suiteJipdaTajsTests.test73e =
  function ()
  {
    var src = "var b = NaN; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result);
  }

suiteJipdaTajsTests.test73f =
  function ()
  {
    var src = "var b = ''; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result);
  }

suiteJipdaTajsTests.test73g =
  function ()
  {
    var src = "var b = 'gvd'; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(1), state.result);
  }

suiteJipdaTajsTests.test74 =
  function ()
  {
    var src = "var b = -23; b;";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(-23), state.result);
  }

suiteJipdaTajsTests.test75a =
  function ()
  {
    var src = "try { throw 42 } catch (e) { 43 };";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(43), state.result);
  }

suiteJipdaTajsTests.test75b =
  function ()
  {
    var src = "try { throw 42 } catch (e) { e };";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(42), state.result);
  }

suiteJipdaTajsTests.test75c =
  function ()
  {
    var src = "try { 123 } catch (e) { e };";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(123), state.result);
  }

suiteJipdaTajsTests.test76a =
  function ()
  {
    var src = "var a = new Array(10); a.length";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(10), state.result);
  }

suiteJipdaTajsTests.test76b =
  function ()
  {
    var src = "var a = new Array(10); a[3] = 3; a.length";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(10), state.result);
  }

suiteJipdaTajsTests.test77 =
  function ()
  {
    var src = "[0 || 1, 1 || 0, 0 && 1, 1 && 0, true || false, false || true, true && false, false && true]";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals("[_, [[[(_,_,_,1,_), []],[(_,_,_,1,_), []],[(_,_,_,0,_), []],[(_,_,_,0,_), []],[(_,_,True,_,_), []],[(_,_,True,_,_), []],[(_,_,False,_,_), []],[(_,_,False,_,_), []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));    
  }

suiteJipdaTajsTests.test78a =
  function ()
  {
    var src = "var a = 0; for (var i = 0; i < 1000; i++); a = 1; a";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(1), state.result); // threaded heap: {1}, single-threaded heap: {1,0}
  }

suiteJipdaTajsTests.test79a =
  function ()
  {
    var src = read("resources/loopy1.js");
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
  }

suiteJipdaTajsTests.test79b =
  function ()
  {
    var src = read("resources/loopy2.js");
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(true), state.result);
  }

suiteJipdaTajsTests.test80 =
  function ()
  {
    // bug: widening happened even when stacks where not compatible (major)
    // fix: move widening into else-part of 'if (store.equals(contextStore))' 
    var src = read("resources/nssetup.js");
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(true), state.result);
  }

suiteJipdaTajsTests.DDDtest81 =
  function ()
  {
    var vs = ["0", "1", "2.2", "-3", "null", "undefined", "-Infinity", "Infinity", "NaN", "'23'", "'foo'", "''", "true", "false"];//, "({x:3})", "({y:4})"];
    var ps = [vs, vs].combinations();
    var ops = ["+", "-", "*", "/", "===", "!==", "==", "!=", "<", "<=", ">", ">=", "&&", "||", "|", "&"];
    var lat = new LatTajs();
    ps.forEach(
      function (p)
      {
        var p0 = p[0];
        var p1 = p[1];
        
        return ops.forEach(
          function (op)
          {
            var exp = p0 + " " + op + " " + p1;
            try
            {
              var expected = eval(exp);
            }
            catch (e)
            {
              // TODO: error cases !!!!!!!!!!!!!
              print("error case", exp);
              return;
            }
            var ast = createAst(exp);
            var state = new ResultState();
            var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
            assertEquals(ipda.lattice.abst1(expected), state.result, exp + " " + ipda.lattice.abst1(expected) + " " + state.result);              
          });        
      });
    
  }

/* TODO const not supported yet
suiteJipdaTajsTests.DDD78 =
  function ()
  {
    var src = "function f() { const x = 3; x = 5; return x; }; f()";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();

    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals("{3}", state.result); // const semantics (no error)
    assertEquals(0, state.reads); // const do not register
    assertEquals(0, state.writes); // const do not register    
  }
 */

suiteJipdaTajsTests.DDDtestXX =
  function ()
  {
    var src = "var i = 123; i.toString();";
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(123), state.result);
  }


/*
suiteJipdaTajsTests.DDDtest66 =
  function ()
  { 
    var src = 0;
    var ast = createAst("var ar = []; for (var i = 0; i < 1000; i++) {ar[i] = i;}; ar;");
  }


suiteJipdaTajsTests.DDDtest66 =
  function ()
  {
    var ast = createAst("var ar = new Array(100); ar.length;");
    var lat = new LatTajs();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals("{100}", state.result);
  }


suiteJipdaTajsTests.DDDtest61 =
	function ()
	{
		var ast = createAst("var x=0; for (let x=1; x<2; x++) {print(x)}; x;");
		var lat = new LatTajs();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("{0}", state.result);
	}	

suiteJipdaTajsTests.DDDtest62 =
	function ()
	{
		var ast = createAst("var z = 0; for (var i = 0; i < 10; i++) { z = z + 2;} z;");
		var lat = new LatTajs();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("{20}", state.result);
	}	

suiteJipdaTajsTests.DDDtest63a =
	function ()
	{
		var ast = createAst("var s=0; for(let i = 0; i < 4; i++) {s=s+i}; s;");
		var lat = new LatTajs();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("{6}", state.result);
	}	

suiteJipdaTajsTests.DDDtest63b =
	function ()
	{
		var ast = createAst("var s=0; for(let i = 0; i < 4; i++) {let i = 3; s=s+i}; s;");
		var lat = new LatTajs();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("{12}", state.result);
	}	
*/


/*
    var src = read("test/resources/v8/v7/CURRENTnavier-stokes.js");
    var ast = createAst(src);
    var lat = new LatTajs();
    var state = new ResultState();

    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    

*/
