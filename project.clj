(defproject jsrefact "0.0.1"
  :plugins [[lein-cljsbuild "0.3.0"]]
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/tools.macro "0.1.1"]
                 [org.clojure/core.logic "0.8.3"]
		         [org.clojure/core.match "0.2.0-alpha12"]]
  :source-paths ["src-cljs"]
  :cljsbuild {
    :builds {

        :dev
        {; The path to the top-level ClojureScript source directory:
          :source-paths ["src-cljs"]
          ; The standard ClojureScript compiler options:
          :compiler {
            :output-to "jsrefact.js"  
            :optimizations :whitespace 
            ;:optimizations :advanced 
            :libs["libs/esprima.js"
            "libs/escodegen.js" 
            ; jipda javascript analysis import
            "libs/jipda/common.js"
            "libs/jipda/lattice/lattice.js"
            "libs/jipda/lattice/topLattice.js"
            "libs/jipda/lattice/setLattice.js"
            "libs/jipda/lattice/cpLattice.js"
            "libs/jipda/address/address.js"
            "libs/jipda/address/timeDefaultAg.js"
            "libs/jipda/address/tagAg.js"
            "libs/jipda/address/concreteAg.js"
            "libs/jipda/benv/defaultBenv.js"
            "libs/jipda/state.js"
            "libs/jipda/ast.js"
            "libs/jipda/visited.js"
            "libs/jipda/concretePrinter.js"
            "libs/jipda/eval.js"
            "libs/jipda/jipda.js"
            "libs/jipda/dep.js"
            "libs/jipda/transform.js"
            "libs/jipda/instance/jsAnalysis.js"
            ]
          }
        }
        :test
        {
          :source-paths ["test-cljs"]
          :compiler {
            :optimizations :whitespace
            :output-to "unittests.js"
            :libs["libs/esprima.js" 
            "libs/escodegen.js"
            ; jipda javascript analysis import
            "libs/jipda/common.js"
            "libs/jipda/lattice/lattice.js"
            "libs/jipda/lattice/topLattice.js"
            "libs/jipda/lattice/setLattice.js"
            "libs/jipda/lattice/cpLattice.js"
            "libs/jipda/address/address.js"
            "libs/jipda/address/timeDefaultAg.js"
            "libs/jipda/address/tagAg.js"
            "libs/jipda/address/concreteAg.js"
            "libs/jipda/benv/defaultBenv.js"
            "libs/jipda/state.js"
            "libs/jipda/ast.js"
            "libs/jipda/visited.js"
            "libs/jipda/concretePrinter.js"
            "libs/jipda/eval.js"
            "libs/jipda/jipda.js"
            "libs/jipda/dep.js"
            "libs/jipda/transform.js"
            "libs/jipda/instance/jsAnalysis.js"
            ]
          }
        }
      }


    })


; USAGE: lein cljsbuild once dev
; USAGE: lein cljsbuild auto dev
