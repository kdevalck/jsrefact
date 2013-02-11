load("lib/esprima.js");

var console = {log:print}

function b()
{
	load("common.js");
    load("lattice/lattice.js");
    load("lattice/topLattice.js");
    load("lattice/setLattice.js");
    load("lattice/cpLattice.js");
    load("address/address.js");
      load("address/timeDefaultAg.js");
      load("address/tagAg.js");
      load("address/concreteAg.js");
    load("benv/defaultBenv.js");
    load("state.js");
		load("ast.js");
		load("visited.js");
		load("concretePrinter.js");
			load("jipda.js");
				load("dep.js");
					load("transform.js");
				load("instance/jsAnalysis.js");
	load("test.js");
	
  load("test/astTests.js");
  load("test/benvTests.js");
  load("test/concreteTests.js");
  load("test/jipdaTests.js");
  load("test/depTests.js");
  load("test/transformTests.js");
  load("test/stateTests.js");	
  load("test/jsAnalysisTests.js");	
  
  load("benchmark/benchmarks.js");
}

b();