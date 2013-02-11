var suiteJipdaTests = new TestSuite("jipdaTests");

  
suiteJipdaTests.test1a =
  function ()
  {
    var ast = createAst("42");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(42), state.result);
  };
  
suiteJipdaTests.test1b =
  function ()
  {
    var ast = createAst("undefined");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  };
      
suiteJipdaTests.test2a =
  function ()
  {
    var ast = createAst("41; 42;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(42), state.result);
  };
  
suiteJipdaTests.test2b = // 12.1
  function ()
  {
    var ast = createAst("1;;;;;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(1), state.result);
  };

suiteJipdaTests.test2c = // 12.1
  function ()
  {
    var ast = createAst("1;{}");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(1), state.result);
  };
          
suiteJipdaTests.test2d = // 12.1
  function ()
  {
    var ast = createAst("1;var a;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(1), state.result);
  };
          
suiteJipdaTests.test3 =
	function ()
	{
		var ast = createAst("var a = 1;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(undefined), state.result);
	};
	
suiteJipdaTests.test4 =
	function ()
	{
		var ast = createAst("var a = 1; a;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(1), state.result);
	};
	
suiteJipdaTests.test5 =
	function ()
	{
		var ast = createAst("var a = 2; a+a;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTests.test6 =
	function ()
	{
		var ast = createAst("var a = 2, b = 3; a*b;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(6), state.result);
	};
	
suiteJipdaTests.test7 =
	function ()
	{
		var ast = createAst("var a = 3, b = 4, c = 5; a-b-c;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(-6), state.result);
	};
	
suiteJipdaTests.test8a =
	function ()
	{
		var ast = createAst("var sq = function (x) {return x * x;}; sq;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertTrue(state.result.as[0] instanceof Addr);
	};

suiteJipdaTests.test8b =
	function ()
	{
		var ast = createAst("function sq(x) {return x * x;}; sq;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertTrue(state.result.as[0] instanceof Addr);
	};

suiteJipdaTests.test9 =
	function ()
	{
		var ast = createAst("var a = 4; a = 5; a;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(5), state.result);
	};
	
suiteJipdaTests.test10a =
	function ()
	{
		var ast = createAst("var pi = function () {return 3;}; pi(); pi();");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTests.test10b =
	function ()
	{
		var ast = createAst("function pi() {return 3;}; pi(); pi();");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTests.test11a =
	function ()
	{
		var ast = createAst("var sq = function (x) {return x * x;}; sq(5);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(25), state.result);
	};

suiteJipdaTests.test11b =
	function ()
	{
		var ast = createAst("function sq(x) {return x * x;}; sq(5);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(25), state.result);
	};

suiteJipdaTests.test12a =
	function ()
	{
		var ast = createAst("var sq = function (x) {return x * x;}; sq(5); sq(6);");
		var lat = new LatN(4);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg, performGc: false});
		assertEquals(ipda.lattice.abst([25, 30, 36]), state.result);
	};

suiteJipdaTests.test12b =
	function ()
	{
		var ast = createAst("var sq = function (x) {return x * x;}; sq(5); sq(6);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(36), state.result);
	};

suiteJipdaTests.test13 =
	function ()
	{
		var ast = createAst("var sq = function (x) {return x * x;}; sq(5); sq(6);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(36), state.result);
	};

suiteJipdaTests.test14 =
	function ()
	{
		var ast = createAst("var f = function () { 123; }; f();");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(undefined), state.result);
	};

suiteJipdaTests.test15 =
	function ()
	{
		var ast = createAst("var z = false; var writez = function () { z = 123; }; var readz = function() { return z; }; [writez(), readz()];");
		var lat = new LatN(1);
    var state = new ResultState();
    var result = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("[_, [[[{undefined}, []],[{123}, []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};

suiteJipdaTests.test16 =
	function ()
	{
		var ast = createAst("var f = function (x) { return function (y) { return x + y; }; }; f(1)(2);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTests.test17a =
	function ()
	{
		var arrayStr = "[0 === 0, 0 !== 0, 1 === 0, 1 !== 0]";
		var ast = createAst(arrayStr);
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		var arrayAddress = state.result.addresses()[0];
		var expected = eval(arrayStr);
		assertEquals("[_, [[[{true}, []],[{false}, []],[{false}, []],[{true}, []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};		
	
suiteJipdaTests.test17b =
	function ()
	{
		var arrayStr = "[3<4,3<=4,3>4,3>=4,3<3,3<=3,3>3,3>=3,4<3,4<=3,4>3,4>=3]";
		var ast = createAst(arrayStr);
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		var arrayAddress = state.result.addresses()[0];
		var expected = eval(arrayStr);
    assertEquals("[_, [[[{true}, []],[{true}, []],[{false}, []],[{false}, []],[{false}, []],[{true}, []],[{false}, []],[{true}, []],[{false}, []],[{false}, []],[{true}, []],[{true}, []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};		
	
suiteJipdaTests.test18a =
	function ()
	{
		var ast = createAst("var f = function() { if (0 === 0) { return 'true'; } else { return 'false' }}; f();");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("true"), state.result);
	};			
	
suiteJipdaTests.test18b =
	function ()
	{
		var ast = createAst("var f = function() { if (0 !== 0) { return 'true'; } else { return 'false' }}; f();");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("false"), state.result);
	};
	
suiteJipdaTests.test18c =
	function ()
	{
		var ast = createAst("var f = function() { if (0 === 0) { if (0 === 1) { return 'true1';} else { return 'false1';}} else { return 'false';}}; f();");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("false1"), state.result);
	};

suiteJipdaTests.test18d =
	function ()
	{
		var ast = createAst("var f = function() { if (0 === 0) { return 'true'; } return 'false'}; f();");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("true"), state.result);
	};			
	
suiteJipdaTests.test18e =
	function ()
	{
		var ast = createAst("var f = function() { if (0 !== 0) { return 'true'; } return 'false'}; f();");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("false"), state.result);
	};
	
	
suiteJipdaTests.test19a =
	function ()
	{
		var ast = createAst("var count = function (n) {if (n===0) {return 'done';} else {return count(n-1);}}; count(200);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("done"), state.result);
	};
	
suiteJipdaTests.test19b =
	function ()
	{
		var ast = createAst("var count = function (n) {if (n===0) {return 'done';} else {return count(n-1);}}; count(200);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1("done"), state.result);
	};
	
suiteJipdaTests.test20 =
	function ()
	{
		var ast = createAst("var t = function (x) {return t(x+1);}; t(0);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(BOT, state.result);
	};
	
suiteJipdaTests.test21 =
	function ()
	{
		var ast = createAst("var fib = function (n) {if (n<2) {return n;} return fib(n-1)+fib(n-2);}; fib(4);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTests.test22a =
	function ()
	{
		var ast = createAst("[1,2,3].concat([4,5]);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("[_, [[[{1}, []],[{2}, []],[{3}, []],[{4}, []],[{5}, []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	
	
suiteJipdaTests.test22b =
	function ()
	{
		var ast = createAst("function f() { return [1,2] }; f().concat([3,4,5]);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    assertEquals("[_, [[[{1}, []],[{2}, []],[{3}, []],[{4}, []],[{5}, []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	
	

suiteJipdaTests.test23 =
	function ()
	{
		var ast = createAst("var appender=function (h, a, b) {return h(a).concat(h(b))}; var lister=function (g) {return function (x) { return [g(x)]; };}; var square=function (y) { return y*y;}; appender(lister(square), 42, 43);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals("[_, [[[{1764}, []],[{1849}, []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	

	
suiteJipdaTests.test24 =
	function ()
	{
		var ast = createAst("var z = []; var appender=function (h, a, b) {return h(a).concat(h(b));}; var lister=function (g) {return function (x) { return [g(x)]; };}; var conser=function (y) { z = [y, z]; return z;}; appender(lister(conser), 42, 43);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals("[_, [[[_, [[[{42}, []],[_, [[]]]]]],[_, [[[{43}, []],[_, [[[{42}, []],[_, [[]]]]]]]]]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	
	

suiteJipdaTests.test25 =
	function ()
	{
		var ast = createAst("var z=0; var f=function () {z=z+1;}; f(); f(); f(); f(); z;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTests.test26a =
	function ()
	{
		var ast = createAst("var z=0; var f=function (i) { if (i<4) {z=z+1;f(i+1);}}; f(0); z;");
		var lat = new LatN(4);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:3, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst([4,5]), state.result); // concrete: 4
	};
	
suiteJipdaTests.test26b =
	function ()
	{
		var ast = createAst("var z=0; var f=function (i) { if (i<4) {z=z+1;f(i+1);}}; f(0); z;");
		var lat = new LatN(4);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTests.test27a =
	function ()
	{
		var ast = createAst("var z=0; var s=0; var f=function (i) {if (z === 7) {s=s+1} if (i<10) {z=z+1;f(i+1);}}; f(0); s;");
		var lat = new LatN(4);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		// concrete: 1 (but k === 0 !!!)
		assertEquals(lat.Top, state.result.user); /// mmm...
		assertEquals([], state.result.as);
	};
	
suiteJipdaTests.test27b =
	function ()
	{
		var ast = createAst("var z=0; var c=false; var f=function (i) {if (z === 7) {c=true} if (i<10) {z=z+1;f(i+1);}}; f(0); c;");
		var lat = new LatN(4);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    // concrete: true
		assertEquals(ipda.lattice.abst([false, true]), state.result);
		
	};
	
suiteJipdaTests.test27c =
	function ()
	{
		var ast = createAst("var z=0; var c=false; var f=function (i) {if (z === 7) {c=true} if (i<10) {z=z+1;f(i+1);}}; f(0); z;");
		var lat = new LatN(4);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:999, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(10), state.result);
		var varC = $$$(ast).findDeclarationIdentifiers("c").toNode();
		var actual = state.store.entries.flatMap(function (entry) { if (entry[0].base === varC) { return entry[1].aval; } return []}).reduce(Lattice.join); 
		assertEquals(ipda.lattice.abst1(true), actual);
	};
	
suiteJipdaTests.test28 =
	function ()
	{
		var ast = createAst("var o = {}; o;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(1, state.result.addresses().length);
		var address = state.result.addresses()[0];
		assertTrue(address instanceof Addr);
		//assertEquals(new Time(), address.context);
		var objs = state.store.lookupAval(state.result.addresses()[0]);
		assertEquals(1, objs.conc().length);
		var obj = objs.conc()[0];
		assertTrue(obj.isBenv);
		assertEquals([], obj.addresses());
	};
	
suiteJipdaTests.test29 =
	function ()
	{
		var ast = createAst("var o = {x:3,y:4}; o;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(1, state.result.addresses().length);
		var address = state.result.addresses()[0];
		assertTrue(address instanceof Addr);
		//assertEquals(new Time(), address.context);
		var objs = state.store.lookupAval(state.result.addresses()[0]);
		assertEquals(1, objs.conc().length);
		var obj = objs.conc()[0];
		assertTrue(obj.isBenv);
		assertEquals(2, obj.addresses().length);
		assertEquals(["{y}","{x}"], obj.frame.map(function (entry) { return entry[0].toString()}));
		var xAddrs = obj.lookup(lat.abst(["x"])).addresses;
		assertEquals(1, xAddrs.length);
		assertEquals(ipda.lattice.abst1(3), state.store.lookupAval(xAddrs[0]));
		var yAddrs = obj.lookup(lat.abst(["y"])).addresses;
		assertEquals(1, yAddrs.length);
		assertEquals(ipda.lattice.abst1(4), state.store.lookupAval(yAddrs[0]));
	};
	
suiteJipdaTests.test30 =
	function ()
	{
		var ast = createAst("var o = {x:3,y:4}; o.y;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTests.test31 =
	function ()
	{
		var ast = createAst("var o = {square:function (x) {return x*x;}}; o.square(4);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});

		assertEquals(ipda.lattice.abst1(16), state.result);
	};
	
suiteJipdaTests.test32 =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x=4; o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	};
	
suiteJipdaTests.test33 =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x=4; o.x=5; o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(5), state.result);
	};
	
suiteJipdaTests.test34 =
	function ()
	{
		var ast = createAst("var o = {x:3}; var p = {y:o}; p.y.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTests.test35 =
	function ()
	{
		var ast = createAst("var o = {x:3}; var p = o; p.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};
	
suiteJipdaTests.test36 =
	function ()
	{
		var ast = createAst("var o={z:[]}; var appender=function (h, a, b) {return h(a).concat(h(b))}; var lister=function (g) {return function (x) { return [g(x)]; };}; var conser=function (y) { o.z = [y, o.z]; return o.z;}; appender(lister(conser), 42, 43);");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals("[_, [[[_, [[[{42}, []],[_, [[]]]]]],[_, [[[{43}, []],[_, [[[{42}, []],[_, [[]]]]]]]]]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	};	
	
suiteJipdaTests.test37 =
	function ()
	{
		var ast = createAst("var x=0; var o = {x:3, f:function() {return x;}}; o.f();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(0), state.result);
	};
	
	
suiteJipdaTests.test38 =
	function ()
	{
		var ast = createAst("function sq(x) {return x*x;}; sq(5); sq(6);");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(36), state.result);
	};	
	
suiteJipdaTests.test39 =
	function ()
	{
		var ast = createAst("function C() { this.x = 42; } var o = new C(); o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(42), state.result);
	};
	
suiteJipdaTests.test40 =
	function ()
	{
		var ast = createAst("function C(xx) { this.x = xx; } var o = new C(43); o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(43), state.result);
	};
	
suiteJipdaTests.test41 =
	function ()
	{
		var ast = createAst("function C(xx) { this.x = xx; } var o = new C(43); var oo = new C(42); oo.x + o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(85), state.result);
	};
	
suiteJipdaTests.test42 =
	function ()
	{
		var ast = createAst("function C(xx) { this.x = xx; } var o = new C(43); var oo = new C(42); o.x = oo.x; o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(42), state.result);
	};	

suiteJipdaTests.test43a = // http://jsperf.com/access-object-properties-via-closure-vs-this/2
	function ()
	{
		var ast = createAst("function C(n) {var nn=n; this.f=function () {nn=nn+1;return nn;}}; var o=new C(3); o.f(); o.f(); o.f();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(6), state.result);
	};	

suiteJipdaTests.test43b =
	function ()
	{
		var ast = createAst("function C(n) {this.nn=n; this.f=function () {this.nn=this.nn+1;return this.nn;}}; var o=new C(30); o.f(); o.f(); o.f();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(33), state.result);
	};	

suiteJipdaTests.test43c =
	function ()
	{
		var ast = createAst("function C(n) {var self=this; self.nn=n; self.f=function () {self.nn=self.nn+1;return this.nn;}}; var o=new C(300); o.f(); o.f(); o.f();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(303), state.result);
	};	

suiteJipdaTests.test44a =
	function ()
	{
		var ast = createAst("var n = 123;function HotDog(){this.n = 456;this.getN = function () { return n; };}; var myHotDog = new HotDog(); myHotDog.getN();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(123), state.result);
	};	

suiteJipdaTests.test44b =
	function ()
	{
		var ast = createAst("var n = 123;function HotDog(){this.n = 456;this.getN = function () { return this.n; };}; var myHotDog = new HotDog(); myHotDog.getN();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(456), state.result);
	};	

suiteJipdaTests.test44c =
	function ()
	{
		var ast = createAst("var n = 123;function HotDog(){this.n = 456;this.getN = function () { return this.n; };}; var myHotDog = new HotDog(); var x = myHotDog.getN;x();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(123), state.result);
	};	
	
suiteJipdaTests.test45a =
	function ()
	{
		var ast = createAst("var o={f:function() { return this;}}; o.f() === o;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTests.test45b =
	function ()
	{
		var ast = createAst("var o={f:function() { return this;}}; ((function() {return o;})()).f() === o;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTests.test45c =
	function ()
	{
		var ast = createAst("var o={f:function() { return this;}}; var x = o.f; x() === this;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTests.test46x =
	function ()
	{
		var ast = createAst("var H = function () {this.f=function () {this.getN=function () {return 999;}}};var m=new H(); var m2=new m.f(); m2.getN();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(999), state.result);
	};	

suiteJipdaTests.test46a =
	function ()
	{
		var ast = createAst("var n=123;function H() {this.n=456;this.f=function () {this.n=789;this.getN=function () {return this.n;}}};var m=new H();var m2=new m.f();m2.getN();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(789), state.result);
	};	

suiteJipdaTests.test46b =
	function ()
	{
		var ast = createAst("var n=123;function H(){this.n=456;this.f=function () {this.n=789;this.getN=function () {return this.n;}};this.m=new this.f();this.x=this.m.getN;this.nn=this.x()};var m2=new H();m2.nn;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(456), state.result);
	};	

suiteJipdaTests.test47a =
	function ()
	{
		var ast = createAst("var Foo = {}; Foo.method = function() { function test() { return this; }; return test();}; this === Foo.method();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTests.test47b =
	function ()
	{
		var ast = createAst("var Foo = {}; Foo.method = function() { var that=this; function test() { return that; }; return test();}; this === Foo.method();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(false), state.result);
	};	

suiteJipdaTests.test47c =
	function ()
	{
		var ast = createAst("var Foo = {}; Foo.method = function() { var that=this; function test() { return that; }; return test() === this;}; Foo.method();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(true), state.result);
	};	

suiteJipdaTests.test48a =
	function ()
	{
		var ast = createAst("function C() { var x=3; this.y=4; }; var o = new C(); o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(undefined), state.result);
	};	

suiteJipdaTests.test48b =
	function ()
	{
		var ast = createAst("function C() { var x=3; this.y=4; this.f=function() { return x + this.y}}; var o = new C(); o.f();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(7), state.result);
	};	

suiteJipdaTests.test48c =
	function ()
	{
		var ast = createAst("function C() { var x=3; this.y=4; this.f=function() { return x + y}}; var o = new C(); o.f();");
		var lat = new LatN(1);
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

suiteJipdaTests.test48d =
	function ()
	{
		var ast = createAst("function C() { var x=3; this.y=4; this.f=function() { return this.x}}; var o = new C(); o.f();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(undefined), state.result);
	};	

suiteJipdaTests.test49 =
	function ()
	{
		var ast = createAst("var o={}; var i=5; o[0]=1;o[2*3]=2; o[i+1]+o[0];");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	};	

suiteJipdaTests.test50 =
	function ()
	{
		var ast = createAst("var o={}; var i=5; function f1() {o[0]=1}; function f2() {return o[2*3]=2}; f1(); f2();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(2), state.result);
	};	

suiteJipdaTests.test51 =
	function ()
	{
		var ast = createAst("var o=[]; var i=5; function f1() {o[0]=1}; function f2() {return o[2*3]=2}; f1(); f2();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(2), state.result);
	};
	
suiteJipdaTests.test52a =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		var cvalues = state.result.addresses();
		assertEquals(1, cvalues.length);
		assertTrue(cvalues[0] instanceof Addr);
		var protoObjs = state.store.lookupAval(cvalues[0]).conc();
		assertEquals(1, protoObjs.length);
		assertTrue(protoObjs[0].isBenv);
	}	

suiteJipdaTests.test52b =
	function ()
	{
		var ast = createAst("function Circle(radius) {this.radius = radius;}; Circle.prototype;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		var cvalues = state.result.addresses();
		assertEquals(1, cvalues.length);
		assertTrue(cvalues[0] instanceof Addr);
		var protoObjs = state.store.lookupAval(cvalues[0]).conc();
		assertEquals(1, protoObjs.length);
		assertTrue(protoObjs[0].isBenv);
	}	

suiteJipdaTests.test53a =
	function ()
	{
		var ast = createAst("function Circle(radius) {this.radius = radius;}; Circle.prototype.y=123;Circle.prototype.y;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTests.test53b =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.y=123;Circle.prototype.y;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTests.test54 =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.n=123;var x=new Circle(1); x.n;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTests.test55a =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.n=123;var x=new Circle(1);var y=new Circle(2);");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg}); // not k=0: two circle objects (with address [constructor, time] merge to top with LatN(1)
		assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTests.test55b =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.n=123;var x=new Circle(1);var y=new Circle(2);x.radius+y.radius;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	}	

suiteJipdaTests.test55c =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.n=123;var x=new Circle(1);x.n;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(123), state.result);
	}	

suiteJipdaTests.test56 =
	function ()
	{
		var ast = createAst("var Circle=function (radius) {this.radius = radius;}; Circle.prototype.area=function () { return 3*this.radius*this.radius;}; var x=new Circle(3), y=new Circle(4); [x.area(), y.area()];");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
		assertEquals("[_, [[[{27}, []],[{48}, []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
	}	

suiteJipdaTests.test57 =
	function ()
	{
    var ast = createAst("var Circle=function (radius) {return function() {return radius}}; var x=new Circle(432);x();");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(432), state.result);
	}	

suiteJipdaTests.test58a =
	function ()
	{
		var ast = createAst("var z = 0; z++;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(0), state.result);
	}	

suiteJipdaTests.test58b =
	function ()
	{
		var ast = createAst("var z = 0; ++z;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(1), state.result);
	}	

suiteJipdaTests.test58c =
	function ()
	{
		var ast = createAst("var z = 0; z++; z;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(1), state.result);
	}	

suiteJipdaTests.test58d =
	function ()
	{
		var ast = createAst("var z = 0; ++z; z;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(1), state.result);
	}	

suiteJipdaTests.test58e =
	function ()
	{
		var ast = createAst("var z = 3; z++ + z;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(7), state.result);
	}
	
suiteJipdaTests.test58f =
	function ()
	{
		var ast = createAst("var z = 3; ++z + z;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(8), state.result);
	}	


suiteJipdaTests.test59a =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x++;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	}	

suiteJipdaTests.test59b =
	function ()
	{
		var ast = createAst("var o = {x:3}; ++o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	}	

suiteJipdaTests.test59c =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x++; o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	}	

suiteJipdaTests.test59d =
	function ()
	{
		var ast = createAst("var o = {x:3}; ++o.x; o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(4), state.result);
	}	

suiteJipdaTests.test59e =
	function ()
	{
		var ast = createAst("var o = {x:3}; o.x++ + o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(7), state.result);
	}	

suiteJipdaTests.test59f =
	function ()
	{
		var ast = createAst("var o = {x:3}; ++o.x + o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(8), state.result);
	}	

suiteJipdaTests.test60a =
	function ()
	{
		var ast = createAst("var o={x:3}; var f=function() {return o}; f()['x']++ + o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(7), state.result);
	}	

suiteJipdaTests.test60b =
	function ()
	{
		var ast = createAst("var o={x:3}; var f=function() {return o}; ++f()['x'] + o.x;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(8), state.result);
	}	

suiteJipdaTests.test61a =
	function ()
	{
		var ast = createAst("for (var i=0; i<3; i++) i;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:2, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(2), state.result);
	}	

suiteJipdaTests.test61aa =
	function ()
	{
		var ast = createAst("for (var i=0; i<3; i++) i;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
    assertEquals(lat.Top, state.result.user);
    assertEquals([], state.result.as);
		// time is limiting factor: 3 iterations have same var i, but timestamps [], [x], [x,y]
	}	

suiteJipdaTests.test61b =
	function ()
	{
		var ast = createAst("for (var i=0; i<3; i++) i; i;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:2, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(3), state.result);
	}	

suiteJipdaTests.test61bb =
	function ()
	{
		var ast = createAst("for (var i=0; i<3; i++) i; i;");
		var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});
    assertEquals(lat.Top, state.result.user);
    assertEquals([], state.result.as);
	}	

suiteJipdaTests.test62 =
	function ()
	{
		var ast = createAst("for (var i=0; false; i++) 123; i;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(0), state.result);
	}	

suiteJipdaTests.test63 =
	function ()
	{
		var ast = createAst("for (var i=0; false; i++) 123;");
		var lat = new LatN(1);
    var state = new ResultState();
		var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(undefined), state.result);
	}	

suiteJipdaTests.test64 =
  function ()
  {
    var ast = createAst("for (var i=0; true; i++) i; i;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(BOT, state.result);
  } 

suiteJipdaTests.test65 =
  function ()
  {
    var ast = createAst("var ar = []; for (var i = 0; i < 1000; i++) {ar[i] = i;}; ar;");
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    //assertEquals("{100}", state.result);
  } 

suiteJipdaTests.test66 =
  function ()
  {
    var src = "function Xyz(n) { this.n = n }; var p = Xyz; p(123); n;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(123), state.result);
  }

suiteJipdaTests.test67 =
  function ()
  {
    var src = "Object.prototype === Function.prototype";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(false), state.result);
  }

suiteJipdaTests.test68 =
  function ()
  {
    var src = "var o = new Object(); Object.prototype.a = 123; o.a;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(123), state.result);
  }

suiteJipdaTests.test69 =
  function ()
  {
    var src = read("resources/tajs2009.js");
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1("jens"), state.result);
  }

suiteJipdaTests.test70a =
  function ()
  {
    var src = "[].xyz;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  }

suiteJipdaTests.test70b =
  function ()
  {
    var src = "({}).xyz;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  }

suiteJipdaTests.test70c =
  function ()
  {
    var src = "(function () {}).xyz;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  }

suiteJipdaTests.test71a =
  function ()
  {
    var src = "var x = []; x.push(1); x;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals("[_, [[[{1}, []]]]]", state.result.toString(createJipdaPrinter(lat, state.store))); 
  }

suiteJipdaTests.test71b =
  function ()
  {
    var src = "var x = []; x.push(1); x.length;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(1), state.result); 
  }

suiteJipdaTests.test72 =
  function ()
  {
    var src = "var x;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(undefined), state.result); 
  }

suiteJipdaTests.test73a =
  function ()
  {
    var src = "var b = 3; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(1), state.result); 
  }

suiteJipdaTests.test73b =
  function ()
  {
    var src = "var b; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result); 
  }

suiteJipdaTests.test73c =
  function ()
  {
    var src = "var b = 0; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result); 
  }

suiteJipdaTests.test73d =
  function ()
  {
    var src = "var b = null; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result); 
  }

suiteJipdaTests.test73e =
  function ()
  {
    var src = "var b = NaN; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result); 
  }

suiteJipdaTests.test73f =
  function ()
  {
    var src = "var b = ''; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result); 
  }

suiteJipdaTests.test73g =
  function ()
  {
    var src = "var b = 'gvd'; if (b) 1; else 2;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(1), state.result); 
  }

suiteJipdaTests.test74 =
  function ()
  {
    var src = "var b = -23; b;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(-23), state.result); 
  }

suiteJipdaTests.test75a =
  function ()
  {
    var src = "try { throw 42 } catch (e) { 43 };";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(43), state.result); 
  }

suiteJipdaTests.test75b =
  function ()
  {
    var src = "try { throw 42 } catch (e) { e };";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(42), state.result); 
  }

suiteJipdaTests.test75c =
  function ()
  {
    var src = "try { 123 } catch (e) { e };";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(123), state.result); 
  }

suiteJipdaTests.test76a =
  function ()
  {
    var src = "var a = new Array(10); a.length";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(10), state.result); 
  }

suiteJipdaTests.test76b =
  function ()
  {
    var src = "var a = new Array(10); a[3] = 3; a.length";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(10), state.result); 
  }

suiteJipdaTests.test77 =
  function ()
  {
    var src = "[0 || 1, 1 || 0, 0 && 1, 1 && 0, true || false, false || true, true && false, false && true]";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals("[_, [[[{1}, []],[{1}, []],[{0}, []],[{0}, []],[{true}, []],[{true}, []],[{false}, []],[{false}, []]]]]", state.result.toString(createJipdaPrinter(lat, state.store)));
  }

suiteJipdaTests.test78a =
  function ()
  {
    var src = "var a = 0; for (var i = 0; i < 1000; i++); a = 1; a";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(1), state.result); // threaded heap: {1}, single-threaded heap: {1,0}
  }

suiteJipdaTests.test79a =
  function ()
  {
    var src = read("resources/loopy1.js");
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
  }

suiteJipdaTests.test79b =
  function ()
  {
    var src = read("resources/loopy2.js");
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(true), state.result);
  }

suiteJipdaTests.test80 =
  function ()
  {
    // bug: widening happened even when stacks where not compatible (major)
    // fix: move widening into else-part of 'if (store.equals(contextStore))' 
    var src = read("resources/nssetup.js");
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(true), state.result);
  }

function toExpectedArray(concrete, lat)
{
  var result = "[_, [[" + concrete.map(function (v) { return new JipdaValue(lat.abst1(v), []).toString()}).join(",") + "]]]";
  return result;
}

suiteJipdaTests.test81a =
  function ()
  {
    var src = "var x = {x:1, valueOf: function () { return 3 }, toString: function () { return '3'}}; var y = {y:1, valueOf: function () { return 4 }}; var z = {y:1, toString: function () { return '5' }}; " + 
      "[undefined==undefined,null==null,NaN==3,4==NaN,NaN==NaN,3==3,+0==-0,-0==+0,3==4,3==3.0,3==3.01," +
      "'abc'=='abc',''=='','abc'=='ab',true==true,false==false,true==false,false==true," +
      "x==x,x==y,null==undefined,undefined==null,3=='3','3'==3,3=='4','4'==3," +
      "true==0,true==1,false==0,false==1,0==true,0==false,1==true,1==false," + 
      "x==3,x==4,y==3,y==4,z==4,z==5,3==x,4==x,3==y,4==y,4==z,5==z,x==null,y==undefined,z==NaN,null==z,undefined==y,NaN==x," +
      "x==x,x==y]";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    var concrete = eval(src);
    var expected = toExpectedArray(concrete, lat);
    assertEquals(expected, state.result.toString(createJipdaPrinter(lat, state.store)));
  }

suiteJipdaTests.test81b =
  function ()
  {
    var src = "var x = {x:1, valueOf: function () { return 3 }, toString: function () { return '3'}}; var y = {y:1, valueOf: function () { return 4 }}; var z = {y:1, toString: function () { return '5' }}; " + 
      "[undefined!=undefined,null!=null,NaN!=3,4!=NaN,NaN!=NaN,3!=3,+0!=-0,-0!=+0,3!=4,3!=3.0,3!=3.01," +
      "'abc'!='abc',''!='','abc'!='ab',true!=true,false!=false,true!=false,false!=true," +
      "x!=x,x!=y,null!=undefined,undefined!=null,3!='3','3'!=3,3!='4','4'!=3," +
      "true!=0,true!=1,false!=0,false!=1,0!=true,0!=false,1!=true,1!=false," + 
      "x!=3,x!=4,y!=3,y!=4,z!=4,z!=5,3!=x,4!=x,3!=y,4!=y,4!=z,5!=z,x!=null,y!=undefined,z!=NaN,null!=z,undefined!=y,NaN!=x," +
      "x!=x,x!=y]";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    var concrete = eval(src);
    var expected = toExpectedArray(concrete, lat);
    assertEquals(expected, state.result.toString(createJipdaPrinter(lat, state.store)));
  }

suiteJipdaTests.test81c =
  function ()
  {
    var src = "var x = {x:1, valueOf: function () { return 3 }, toString: function () { return '3'}}; var y = {y:1, valueOf: function () { return 4 }}; var z = {y:1, toString: function () { return '5' }}; " + 
      "[undefined===undefined,null===null,NaN===3,4===NaN,NaN===NaN,3===3,+0===-0,-0===+0,3===4,3===3.0,3===3.01," +
      "'abc'==='abc',''==='','abc'==='ab',true===true,false===false,true===false,false===true," +
      "x===x,x===y,null===undefined,undefined===null,3==='3','3'===3,3==='4','4'===3," +
      "true===0,true===1,false===0,false===1,0===true,0===false,1===true,1===false," + 
      "x===3,x===4,y===3,y===4,z===4,z===5,3===x,4===x,3===y,4===y,4===z,5===z,x===null,y===undefined,z===NaN,null===z,undefined===y,NaN===x," +
      "x===x,x===y]";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    var concrete = eval(src);
    var expected = toExpectedArray(concrete, lat);
    assertEquals(expected, state.result.toString(createJipdaPrinter(lat, state.store)));
  }

suiteJipdaTests.test81d =
  function ()
  {
    var src = "var x = {x:1, valueOf: function () { return 3 }, toString: function () { return '3'}}; var y = {y:1, valueOf: function () { return 4 }}; var z = {y:1, toString: function () { return '5' }}; " + 
    "[undefined!==undefined,null!==null,NaN!==3,4!==NaN,NaN!==NaN,3!==3,+0!==-0,-0!==+0,3!==4,3!==3.0,3!==3.01," +
    "'abc'!=='abc',''!=='','abc'!=='ab',true!==true,false!==false,true!==false,false!==true," +
    "x!==x,x!==y,null!==undefined,undefined!==null,3!=='3','3'!==3,3!=='4','4'!==3," +
    "true!==0,true!==1,false!==0,false!==1,0!==true,0!==false,1!==true,1!==false," + 
    "x!==3,x!==4,y!==3,y!==4,z!==4,z!==5,3!==x,4!==x,3!==y,4!==y,4!==z,5!==z,x!==null,y!==undefined,z!==NaN,null!==z,undefined!==y,NaN!==x," +
    "x!==x,x!==y]";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    var concrete = eval(src);
    var expected = toExpectedArray(concrete, lat);
    assertEquals(expected, state.result.toString(createJipdaPrinter(lat, state.store)));
  }

suiteJipdaTests.test81e =
  function ()
  {
    var src = "var x = {x:1, valueOf: function () { return 3 }, toString: function () { return '3'}}; var y = {y:1, valueOf: function () { return 4 }}; var z = {y:1, toString: function () { return '5' }}; " + 
    "[undefined+undefined,null+null,NaN+3,4+NaN,NaN+NaN,3+3,+0+-0,-0+(+0),3+4,3+3.0,3+3.01," +
    "'abc'+'abc',''+'','abc'+'ab',true+true,false+false,true+false,false+true," +
    "null+undefined,undefined+null,3+'3','3'+3,3+'4','4'+3," +
    "true+0,true+1,false+0,false+1,0+true,0+false,1+true,1+false," + 
    "x+3,x+4,y+3,y+4,z+4,z+5,3+x,4+x,3+y,4+y,4+z,5+z,x+null,y+undefined,z+NaN,null+z,undefined+y,NaN+x," +
    "x+x,x+y,x+z,y+x,z+x,y+z,z+y]";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    var concrete = eval(src);
    var expected = toExpectedArray(concrete, lat);
    assertEquals(expected, state.result.toString(createJipdaPrinter(lat, state.store)));
  }

suiteJipdaTests.test82a =
  function ()
  {
    var src = "function F() { }; F.prototype.constructor === F";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(true), state.result);
  }

suiteJipdaTests.test82b =
  function ()
  {
    var src = "function F(x) { this.x = x }; var f = new F(123); f.constructor === F.prototype.constructor";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(true), state.result);
  }

suiteJipdaTests.test83 =
  function ()
  {
    var src = "var o = {}; o.constructor === Object";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(true), state.result);
  }

suiteJipdaTests.test84a =
  function ()
  {
    var src = "switch (123) {}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(undefined), state.result);
  }

suiteJipdaTests.test84b =
  function ()
  {
    var src = "switch (1) {case 1: 999}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test84c =
  function ()
  {
    var src = "switch (1) {case 0: 888; case 1: 999}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test84d =
  function ()
  {
    var src = "switch (1) {case 0: 888; case 1: 999; case 2: 666}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(666), state.result);
  }

suiteJipdaTests.test84e =
  function ()
  {
    var src = "switch (1) {default: 999}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test84f =
  function ()
  {
    var src = "switch (1) {case 0: 888; default: 999}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test84g =
  function ()
  {
    var src = "switch (1) {case 0: 888; default: 999; case 2: 666}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(666), state.result);
  }

suiteJipdaTests.test85a =
  function ()
  {
    var src = "switch (1) {case 1: 999; break;}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test85b =
  function ()
  {
    var src = "switch (1) {case 1: 999; case 2: break;}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test85c =
  function ()
  {
    var src = "switch (1) {case 1: 999; case 2: break; default: 666}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test85d =
  function ()
  {
    var src = "switch (1) {case 0: 888; default: 999; break; case 1: 666;} ";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(666), state.result);
  }

suiteJipdaTests.test86a =
  function ()
  {
    var src = "function f() {switch(1) {case 1: return 999 }}; f();";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test86b =
  function ()
  {
    var src = "function f() {switch(1) {case 0: return 888; case 1: return 999 }}; f();";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test87a =
  function ()
  {
    var src = "{999}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(999), state.result);
  }

suiteJipdaTests.test87b =
  function ()
  {
    var src = "{42; 43;}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(43), state.result);
  }

suiteJipdaTests.test87c =
  function ()
  {
    var src = "ll:{42; break ll; 43;}";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(42), state.result);
  }

suiteJipdaTests.test88a =
  function ()
  {
    var src = "function f(){return a;function a(){return 1};var a=4;function a(){return 2;}}; f()();";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result);
  }

suiteJipdaTests.test88b =
  function ()
  {
    var src = "function f(){return a;var a=4;function a(){return 1};function a(){return 2;}}; f()();";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(2), state.result);
  }

suiteJipdaTests.test88c =
  function ()
  {
    var src = "function f(){var a=4;function a(){return 1};function a(){return 2;};return a;}; f();";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(4), state.result);
  }

suiteJipdaTests.test88d =
  function ()
  {
    var src = "var foo = 1; function bar() { if (!foo) { var foo = 10; } return foo;} bar();";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(10), state.result);
  }

suiteJipdaTests.test88e =
  function ()
  {
    var src = "var a = 1; function b() { a = 10; return; function a() {}}; b(); a;";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:1, ag: timeDefaultAg});    
    assertEquals(ipda.lattice.abst1(1), state.result);
  }





/* TODO const not supported yet
suiteJipdaTests.DDD78 =
  function ()
  {
    var src = "function f() { const x = 3; x = 5; return x; }; f()";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});    
    assertEquals("{3}", state.result); // const semantics (no error)
  }
 */

suiteJipdaTests.DDDtestXX =
  function ()
  {
    var src = "var i = 123; i.toString();";
    var ast = createAst(src);
    var lat = new LatN(1);
    var state = new ResultState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals(ipda.lattice.abst1(123), state.result);
  }


/*
suiteJipdaTests.DDDtest66 =
  function ()
  { 
    var src = 0;
    var ast = createAst("var ar = []; for (var i = 0; i < 1000; i++) {ar[i] = i;}; ar;");
  }


suiteJipdaTests.DDDtest66 =
  function ()
  {
    var ast = createAst("var ar = new Array(100); ar.length;");
    var lat = new LatN(1);
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
    assertEquals("{100}", state.result);
  }


suiteJipdaTests.DDDtest61 =
	function ()
	{
		var ast = createAst("var x=0; for (let x=1; x<2; x++) {print(x)}; x;");
		var lat = new LatN(1);
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("{0}", state.result);
	}	

suiteJipdaTests.DDDtest62 =
	function ()
	{
		var ast = createAst("var z = 0; for (var i = 0; i < 10; i++) { z = z + 2;} z;");
		var lat = new LatN(1);
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("{20}", state.result);
	}	

suiteJipdaTests.DDDtest63a =
	function ()
	{
		var ast = createAst("var s=0; for(let i = 0; i < 4; i++) {s=s+i}; s;");
		var lat = new LatN(1);
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("{6}", state.result);
	}	

suiteJipdaTests.DDDtest63b =
	function ()
	{
		var ast = createAst("var s=0; for(let i = 0; i < 4; i++) {let i = 3; s=s+i}; s;");
		var lat = new LatN(1);
		var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
		assertEquals("{12}", state.result);
	}	
*/


