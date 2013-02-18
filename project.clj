(defproject jsrefact "0.0.1"
  :plugins [[lein-cljsbuild "0.2.9"]]
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [org.clojure/tools.macro "0.1.1"]
                 [org.clojure/core.logic "0.8.0-beta2"]
		 [org.clojure/core.match "0.2.0-alpha9"]]
  :cljsbuild {
    :builds {

        :dev
        {; The path to the top-level ClojureScript source directory:
          :source-path "src-cljs"
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
            "libs/jipda/jipda.js"
            "libs/jipda/dep.js"
            "libs/jipda/transform.js"
            "libs/jipda/instance/jsAnalysis.js"
            ]
          }
        }
        :test
        {
          :source-path "test-cljs"
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
