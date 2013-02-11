var suiteStateTests = new TestSuite("stateTests");

suiteStateTests.test1 =
	function ()
	{
		var ast = createAst("42;");
		var lat = new LatN(1);
		var result = new ResultState();
		var product = new ProductState([result]);
    var ipda = ipdaEval(ast, product, {lattice: lat, k:4, ag: timeDefaultAg});
		assertEquals(ipda.lattice.abst1(42), result.result);
	};
	
