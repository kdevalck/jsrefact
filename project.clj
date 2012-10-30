(defproject cltest "1.2.3"
  :plugins [[lein-cljsbuild "0.2.9"]]
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [org.clojure/tools.macro "0.1.1"]
                 [org.clojure/core.logic "0.7.5"]]
  :cljsbuild {
    :builds [{
        ; The path to the top-level ClojureScript source directory:
        :source-path "src-cljs"
        ; The standard ClojureScript compiler options:
        ; (See the ClojureScript compiler documentation for details.)
        :compiler {
          :output-to "jsrefact.js"  ;
          :optimizations :advanced ;
	  :libs["esprima.js"] }}]})
