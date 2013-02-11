var suiteTransformTests = new TestSuite("transformTests");

/* LET EXPRESSION not supported (appears in rewrite)
suiteTransformTests.test1 =
	function ()
	{
		var ast = createAst("var fib = function (n) {if (n<2) {return n;} return fib(n-1)+fib(n-2);}; fib(4);");
		var lat = new LatN(1);
		var state = new JipdaState(lat);
		var ipda = ipdaEval(ast, lat, state, 4);
		var r = parallelizeBinaryExpressions(ast, state);
		print(r);
	};
*/
	
suiteTransformTests.test2 =
	function ()
	{
		var ast = createAst("var fib=function (n) {if (n<2) {return n;} var a=fib(n-1); var b=fib(n-2); return a+b;}; fib(4);");
		var lat = new LatN(1);
    var state = new DepState();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:4, ag: timeDefaultAg});
		var r = parallelizeBinaryExpressions(ast, state);
//		print(r);
	}	
	
	
var fib = 
	function (n) 
	{
		if (n<2)
		{
			return n;
		}
		var a = fib(n-1);
		var b = fib(n-2);
		return a+b;
	};
fib(4);	


//"var fib=function (n) {if (n<2) {return n;} var a=fib(n-1); var b=fib(n-2); return a+b;}; fib(4);"	



//printTree(createAst("let (x=future(l),y=fib(r)) touch(x)+y"))
//printTree(createAst("let (x=future($1),y=$2) touch(x)+y"))