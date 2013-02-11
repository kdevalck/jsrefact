

function benchmarksModule(_export)
{
  
  var concreteVisited = {};
  concreteVisited.visited = function (node, stack, benva, store, time) { return store };
  
  function nssetup()
  {
    var src = read("resources/nssetup.js");
    var ast = createAst(src);
    var lat = new CpLattice();
    var state = new ResultState();
    var start = Date.now();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    var end = Date.now();
    print("time", end - start, "ms");
  }

  function c_nssetup()
  {
    var src = read("resources/nssetup.js");
    var ast = createAst(src);
    var lat = new CpLattice();
    var state = new ResultState();
    var start = Date.now();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: concreteAg, visited: concreteVisited});
    var end = Date.now();
    print("time", end - start, "ms");
  }

  function navierStokes()
  {
    var src = read("resources/octane_v1/navier-stokes.js");
    var ast = createAst(src);
    var lat = new CpLattice();
    var state = new ResultState();
    var start = Date.now();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    var end = Date.now();
    print("time", end - start, "ms");
  }

  function richards()
  {
    var src = read("resources/octane_v1/richards.js");
    var ast = createAst(src);
    var lat = new CpLattice();
    var state = new ResultState();
    var start = Date.now();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    var end = Date.now();
    print("time", end - start, "ms");
  }

  function splay()
  {
    var src = read("resources/octane_v1/splay.js");
    var ast = createAst(src);
    var lat = new CpLattice();
    var state = new ResultState();
    var start = Date.now();
    var ipda = ipdaEval(ast, state, {lattice: lat, k:0, ag: timeDefaultAg});
    var end = Date.now();
    print("time", end - start, "ms");
  }

  if (!_export)
  {
    _export = {};
  }
  
  _export.nssetup = nssetup;
  _export.c_nssetup = c_nssetup;
  _export.navierStokes = navierStokes;
  _export.richards = richards;
  return _export;
}

var benchmarks = benchmarksModule(); 