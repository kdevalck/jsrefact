var suiteModTests = 

(function () 
{
  var module = new TestSuite("modTests"); 
  
  module.test1 =
    function ()
    {
      var src = "var x = 1; x = 2;";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var varX = $$$(ast).varsWithName("x").toNode();
      assertEquals(jsa.lattice.abst1(undefined).join(jsa.lattice.abst1(1)).join(jsa.lattice.abst1(2)), jsa.value(varX));
    }
  
  module.test2 =
    function ()
    {
      var src = "var x = { foo: 42 }";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var varX = $$$(ast).varsWithName("x").toNode();
      var objectAddresses = jsa.addresses(varX);
      assertEquals(1, objectAddresses.length);
      var objectAddress = objectAddresses[0];
      assertTrue(objectAddress instanceof Addr);
      var object = jsa.lookup(objectAddress);
      assertTrue(object.isBenv);
      assertDefinedNotNull(object.lookup(jsa.primLattice.abst1("foo")));
    }
  
  module.test3 =
    function ()
    {
      var src = "var x = function () {}; x();";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var func = $$$(ast).functionExpressions().toNode();
      var scopeAddresses = jsa.scope(func);
      assertEquals(1, scopeAddresses.length);
      var scopeAddress = scopeAddresses[0]
      assertEquals(jsa.globala,scopeAddress);
    }
  
  module.test4a =
    function ()
    {
      var src = "function F() {}; var f = new F();";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var node = $$$(ast).newExpressions().toNode();
      var objectAddresses = jsa.addresses(node);
      assertEquals(1, objectAddresses.length);
      var objectAddress = objectAddresses[0];
      var protoAddresses = jsa.proto(objectAddress);
      assertEquals(1, protoAddresses.length);
      var protoAddress = protoAddresses[0];
      assertTrue(Addr.isAddress(protoAddress));
    }
  
  module.test4b =
    function ()
    {
      var src = "function F() {}; F.prototype = 123; var f = new F();";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var node = $$$(ast).newExpressions().toNode();
      var objectAddresses = jsa.addresses(node);
      var objectAddress = objectAddresses[0];
      var protoAddresses = jsa.proto(objectAddress);
      assertEquals(0, protoAddresses.length);
    }
  
  module.test5 =
    function ()
    {
      var src = "var x = { y : 123 }; var z = { p : x };";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var varX = $$$(ast).varsWithName("x").toNode();
      var varZ = $$$(ast).varsWithName("z").toNode();
      var objectAddressesZ = jsa.addresses(varZ);
      assertEquals(1, objectAddressesZ.length);
      var objectAddress = objectAddressesZ[0];
      var object = jsa.lookup(objectAddress);
      var props = jsa.props(objectAddress);
      var objectAddressesX = jsa.addresses(varX);
      assertEquals(objectAddressesX, props);
    }
  
  module.test6 =
    function ()
    {
      var src = "var x = { y : 123 };";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var varX = $$$(ast).varsWithName("x").toNode();
      var objectAddresses = jsa.addresses(varX);
      assertEquals(1, objectAddresses.length);
      var objectAddress = objectAddresses[0];
      assertTrue(jsa.mayHaveProp(objectAddress, "y"));
      assertFalse(jsa.mayHaveProp(objectAddress, "z"));
    }
  
  module.test8a =
    function ()
    {
      var src = "var x = function (y) { return y }; x(x);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var varX = $$$(ast).varsWithName("x").toNode();
      var objectAddresses = jsa.addresses(varX);
      assertEquals(1, objectAddresses.length);
      var objectAddress = objectAddresses[0];
      var arg = jsa.arg(objectAddress, 1);
      assertEquals(objectAddresses, arg);
    }
  
  module.test8b =
    function ()
    {
      var src = "var x = { y : function (z) { return z }}; x.y(x);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var func = $$$(ast).functionExpressions().toNode();
      var varX = $$$(ast).varsWithName("x").toNode();
      var objectAddresses = jsa.addresses(func);
      assertEquals(1, objectAddresses.length);
      var objectAddress = objectAddresses[0];
      var arg = jsa.arg(objectAddress, 0);
      var objectAddressesX = jsa.addresses(varX);
      assertEquals(objectAddressesX, arg);
    }
  
  module.test9 =
    function ()
    {
      var src = "var x = function (y) { return y }; x(x);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var varX = $$$(ast).varsWithName("x").toNode();
      var objectAddresses = jsa.addresses(varX);
      assertEquals(1, objectAddresses.length);
      var objectAddress = objectAddresses[0];
      var ret = jsa.ret(objectAddress);
      assertEquals(objectAddresses, ret);
    }

  
  module.test100 =
    function ()
    {
      var src = "function F(x) {this.x = x;}; function g(p) {return p.x}; var f = new F(123); g(f);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funF = $$$(ast).functionDeclarationsWithName("F").toNode();
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(1, g.reads().length);
      assertEquals(funF, g.reads()[0]);
      assertEquals(0, g.writes().length);
    }
  
  module.test101 =
    function ()
    {
      var src = "function F(x) {this.x = x;}; function g(p) {return p.x = 456}; var f = new F(123); g(f);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funF = $$$(ast).functionDeclarationsWithName("F").toNode();
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(0, g.reads().length);
      assertEquals(1, g.writes().length);
      assertEquals(funF, g.writes()[0]);
    }
  
  module.test102 =
    function ()
    {
      var src = "function F(x) {this.x = x;}; function FF() {this.y = 456;}; function g(pf) {return (pf()).x;}; var f = new F(123); g(function () { var ff = new FF(); ff.y; return f});";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funExp = $$$(ast).functionExpressions().toNode();
      var funF = $$$(ast).functionDeclarationsWithName("F").toNode();
      var funFF = $$$(ast).functionDeclarationsWithName("FF").toNode();
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var fexp = jsa.analyzeFunction(funExp);
      assertEquals(1, fexp.reads().length);
      assertEquals(funFF, fexp.reads()[0]);
      assertEquals(0, fexp.writes().length);
      var g = jsa.analyzeFunction(funG);
      assertEquals(1, g.reads().length);
      assertEquals(funF, g.reads()[0]);
      assertEquals(0, g.writes().length);
    }
  
  module.test103 =
    function ()
    {
      var src = "var module = (function () {var priv = 123; return {pub:priv+333}})(); function f() {return module.pub}; f();"
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funMod = $$$(ast).functionExpressions().toNode();
      var funf = $$$(ast).functionDeclarationsWithName("f").toNode();
      var f = jsa.analyzeFunction(funf);
      assertEquals(1, f.reads().length);
      assertTrue(isObjectExpression(f.reads()[0]));
      assertEquals(0, f.writes().length);
    }
  
  module.test104 =
    function ()
    {
      var src = "var module = (function () {var priv = 123; return {pub:priv+333}})(); function f() {return module.pub = 999}; f();"
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funMod = $$$(ast).functionExpressions().toNode();
      var funf = $$$(ast).functionDeclarationsWithName("f").toNode();
      var f = jsa.analyzeFunction(funf);
      assertEquals(0, f.reads().length);
      assertEquals(1, f.writes().length);
      assertTrue(isObjectExpression(f.writes()[0]));
    }
  
  module.test105 =
    function ()
    {
      var src = "function S() {}; function F() {}; S.prototype.x = 123; F.prototype = Object.create(S.prototype); var f = new F(); function g(p) { return p.x }; g(f);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funF = $$$(ast).functionDeclarationsWithName("F").toNode();
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(1, g.reads().length);
      assertEquals(funF, g.reads()[0]);
      assertEquals(0, g.writes().length);      
    }
  
  module.test106 =
    function ()
    {
      var src = "function F() {}; var o = {x:123}; F.prototype = o; var f = new F(); function g(p) { return p.x }; g(f);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funF = $$$(ast).functionDeclarationsWithName("F").toNode();
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(1, g.reads().length);
      assertEquals(funF, g.reads()[0]);
      assertEquals(0, g.writes().length);      
    }
  
  module.test107 =
    function ()
    {
      var src = "function F(x) {this.x = x;}; function g(p) {return p.x}; var C = F; var f = new C(123); g(f);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funF = $$$(ast).functionDeclarationsWithName("F").toNode();
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(1, g.reads().length);
      assertEquals(funF, g.reads()[0]);
      assertEquals(0, g.writes().length);
    }
  
  module.test108 =
    function ()
    {
      var src = "var o = {x:123}; function g(p) {return p.x}; g(o);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(1, g.reads().length);
      assertTrue(isObjectExpression(g.reads()[0]));
      assertEquals(0, g.writes().length);      
    }
  
  module.test109 =
    function ()
    {
      var src = "var o1 = {x:123}; var o2 = {x:456}; function g(p) {return p.x}; g(o1); g(o2);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(2, g.reads().length);
      assertTrue(g.reads().every(isObjectExpression));
      assertEquals(0, g.writes().length);      
    }
  
  module.test110 =
    function ()
    {
      var src = "function F(x) {this.x = x;}; function g(p) {return p.x}; var f = new F(123); g(f); F.prototype = {}; var ff = new F(123); g(ff);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funF = $$$(ast).functionDeclarationsWithName("F").toNode();
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(2, g.reads().length);
      assertEquals([funF, funF], g.reads());
      assertEquals(0, g.writes().length);
    }
  
  module.test111 =
    function ()
    {
      // looking up addresses of construction site name ('F' in 'new F(123)')
      // would return two 'F' functions
      // e.g. looking at actual .Prototype of object is more stable in the face of reassigning functions?
      var src = "function F(x) {this.x = x;}; function g(p) {return p.x}; var f = new F(123); F = function () {}; g(f);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funF = $$$(ast).functionDeclarationsWithName("F").toNode();
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(1, g.reads().length);
      assertEquals(funF, g.reads()[0]);
      assertEquals(0, g.writes().length);
    }
  
  module.test200 =
    function ()
    {
      var src = "function F(x) {this.x = x;}; function g(p) {return p.x}; var f = new F(123); F = function () {}; g(f);";
      var ast = createAst(src);
      var jsa = new ModAnalysis(ast);
      var funF = $$$(ast).functionDeclarationsWithName("F").toNode();
      var funG = $$$(ast).functionDeclarationsWithName("g").toNode();
      var g = jsa.analyzeFunction(funG);
      assertEquals(1, g.reads().length);
      assertEquals(funF, g.reads()[0]);
      assertEquals(0, g.writes().length);
    }
  
  return module;
})();
