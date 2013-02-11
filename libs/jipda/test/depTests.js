var suiteDepTests = new TestSuite("depTests");

suiteDepTests.test1 =
	function ()
	{
		var ast = createAst("var z = []; var appender=function (h, a, b) {return h(a).concat(h(b))}; var lister=function (g) {return function (x) { return [g(x)]; };}; var conser=function (x) { z = [x, z]; return z;}; appender(lister(conser), 42, 43);");
		var lat = new LatN(1);
		var state = new DepState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		var ha = $$$(ast).findExpression("h(a)").toNode();
		var hb = $$$(ast).findExpression("h(b)").toNode();
		assertEquals([], lexDependencies(ha, hb, ast));
		var varZ = $$$(ast).nodes().filterDeclarationIdentifiers("z").toNode();
		var abstractZ = new ContextAddr(varZ, new Time());
		var deps = [new Dependency("rw", "ip", [abstractZ]), new Dependency("wr", "ip", [abstractZ]), new Dependency("ww", "ip", [abstractZ])];
		assertSetEquals(deps, ipDependencies(ha, hb, state));
		assertSetEquals(deps, ipDependencies(hb, ha, state));
		assertSetEquals(deps, dependencies(ha, hb, ast, state));
		assertSetEquals(deps, dependencies(hb, ha, ast, state));
		assertTrue(areDependent(ha, hb, ast, state));
		assertTrue(areDependent(hb, ha, ast, state));
		assertFalse(areIndependent([ha, hb], ast, state));
		assertFalse(areIndependent([hb, ha], ast, state));
	};
	
suiteDepTests.test1b =
	function ()
	{
		var ast = createAst("var z = []; var appender=function (h1, h2, a, b) {return h1(a).concat(h2(b));}; var lister=function (g) {return function (x) { return [g(x)]; };}; var c1=function (x) { z = [x, 4]; return 3;}; var c2=function (x) { return z;}; appender(lister(c1), lister(c2), 42, 43);");
		var lat = new LatN(1);
    var state = new DepState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		var ha = $$$(ast).findExpression("h1(a)").toNode();
		var hb = $$$(ast).findExpression("h2(b)").toNode();
		assertEquals([], lexDependencies(ha, hb, ast));
		var varZ = $$$(ast).nodes().filterDeclarationIdentifiers("z").toNode();
		var abstractZ = new ContextAddr(varZ, new Time());
		var depsab = [new Dependency("wr", "ip", [abstractZ])];
		var depsba = [new Dependency("rw", "ip", [abstractZ])];
		assertEquals(depsab, ipDependencies(ha, hb, state));
		assertEquals(depsba, ipDependencies(hb, ha, state));
		assertSetEquals(depsab, dependencies(ha, hb, ast, state));
		assertSetEquals(depsba, dependencies(hb, ha, ast, state));
		assertTrue(areDependent(ha, hb, ast, state));
		assertTrue(areDependent(hb, ha, ast, state));
		assertFalse(areIndependent([ha, hb], ast, state));
		assertFalse(areIndependent([hb, ha], ast, state));
	};
	
suiteDepTests.test2 =
	function ()
	{
		var ast = createAst("var z = []; var appender=function (h, a, b) {return h(a).concat(h(b))}; var lister=function (g) {return function (x) { return [g(x)]; };}; var conser=function (x) { z = [x, 4]; return 3;}; appender(lister(conser), 42, 43);");
		var lat = new LatN(1);
    var state = new DepState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		var ha = $$$(ast).findExpression("h(a)").toNode();
		var hb = $$$(ast).findExpression("h(b)").toNode();
		assertEquals([], lexDependencies(ha, hb, ast));
		var varZ = $$$(ast).nodes().filterDeclarationIdentifiers("z").toNode();
		var abstractZ = new ContextAddr(varZ, new Time());
		var deps = [new Dependency("ww", "ip", [abstractZ])];
		assertSetEquals(deps, ipDependencies(ha, hb, state));
		assertSetEquals(deps, ipDependencies(hb, ha, state));
		assertSetEquals(deps, dependencies(ha, hb, ast, state));
		assertSetEquals(deps, dependencies(hb, ha, ast, state));
		assertTrue(areDependent(ha, hb, ast, state));
		assertTrue(areDependent(hb, ha, ast, state));
		assertFalse(areIndependent([ha, hb], ast, state));
		assertFalse(areIndependent([hb, ha], ast, state));
	};
	
suiteDepTests.test3 =
	function ()
	{
		var ast = createAst("var z = []; var appender=function (h, a, b) {return h(a).concat(h(b))}; var lister=function (g) {return function (x) { return [g(x)]; };}; var square=function (x) { return x*x;}; appender(lister(square), 42, 43);");
		var lat = new LatN(1);
    var state = new DepState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		var ha = $$$(ast).findExpression("h(a)").toNode();
		var hb = $$$(ast).findExpression("h(b)").toNode();
		assertEquals([], lexDependencies(ha, hb, ast));
		assertEquals([], lexDependencies(hb, ha, ast));
		assertEquals([], ipDependencies(ha, hb, state));
		assertEquals([], ipDependencies(hb, ha, state));
		assertFalse(areDependent(ha, hb, ast, state));
		assertFalse(areDependent(hb, ha, ast, state));
		assertTrue(areIndependent([ha, hb], ast, state));
		assertTrue(areIndependent([hb, ha], ast, state));
	};
	
suiteDepTests.test4 =
	function ()
	{
		var ast = createAst("var x=1, y=2, z=3; var a=x+y; var b=y+z;");
		var lat = new LatN(1);
    var state = new DepState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		var expXY = $$$(ast).findExpression("x+y").toNode();
		var expYZ = $$$(ast).findExpression("y+z").toNode();
		assertEquals([], ipDependencies(expXY, expYZ, state));
		assertEquals([], ipDependencies(expYZ, expXY, state));
		assertEquals([], lexDependencies(expXY, expYZ, ast));
		assertEquals([], lexDependencies(expYZ, expXY, ast));
		assertFalse(areDependent(expXY, expYZ, ast, state));
		assertFalse(areDependent(expYZ, expXY, ast, state));
		assertTrue(areIndependent([expXY, expYZ], ast, state));
		assertTrue(areIndependent([expYZ, expXY], ast, state));
	};
	
suiteDepTests.test5 =
	function ()
	{
		var ast = createAst("var x=1, y=2, z=3; x=y; y=z; y=x;");
		var lat = new LatN(1);
    var state = new DepState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		var varY = $$$(ast).nodes().filterDeclarationIdentifiers("y").toNode();
		var assXY = $$$(ast).findExpression("x=y").toNode();
		var assYZ = $$$(ast).findExpression("y=z").toNode();
		var assYX = $$$(ast).findExpression("y=x").toNode();
		assertEquals([], ipDependencies(assXY, assYZ, state));
		assertEquals([], ipDependencies(assYZ, assXY, state));
		assertEquals([new Dependency("rw", "lex", [varY])], lexDependencies(assXY, assYZ, ast));
		assertEquals([new Dependency("wr", "lex", [varY])], lexDependencies(assYZ, assXY, ast));
		assertEquals([new Dependency("ww", "lex", [varY])], lexDependencies(assYZ, assYX, ast));
		assertEquals([new Dependency("ww", "lex", [varY])], lexDependencies(assYX, assYZ, ast));
		assertTrue(areDependent(assXY, assYZ, ast, state));
		assertTrue(areDependent(assYZ, assXY, ast, state));
		assertTrue(areDependent(assYX, assYZ, ast, state));
		assertTrue(areDependent(assYZ, assYX, ast, state));
		assertFalse(areIndependent([assXY, assYZ], ast, state));
		assertFalse(areIndependent([assYZ, assXY], ast, state));
		assertFalse(areIndependent([assYX, assYZ], ast, state));
		assertFalse(areIndependent([assYZ, assYX], ast, state));
	};

suiteDepTests.DDDtest6 =
  function ()
  {
    var src = read("test/resources/dig-nbody2.js");
    var ast = createAst(src);
    var state = new DepState();
    var lat = new LatN(1);
    var ipda = ipdaEval(ast, lat, state, 4);
  };
	

