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
            :libs["esprima.js"]
          }
        }
        :test
        {
          :source-path "test-cljs"
          :compiler {
            :optimizations :whitespace
            :output-to "unittests.js"
            :libs["esprima.js"]
          }
        }
      }


    })


; USAGE: lein cljsbuild once dev
; USAGE: lein cljsbuild auto dev
