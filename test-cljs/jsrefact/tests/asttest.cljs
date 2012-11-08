(ns jsrefact.tests.asttest
	(:use-macros [cljs.core.logic.macros :only [run*]])
	(:require-macros [cljs.core.logic.macros :as l])
	(:use [jsrefact.core :only [js-print esprimaParser ast-kind ast-property-value
		ast-properties ast? program child parsed has]]))


; Parse a sample program
;(def parsed (.parse esprimaParser "var x = 42"))
;(def progrm (.pop (.-body parsed)))

(defn run []
  (js-print "AST Unit tests started.")

  (assert (= (ast-kind parsed) "Program"))

  (assert (= (ast-property-value parsed "type") "Program"))

  (assert (= (first (ast-properties parsed)) "type"))

  (let [fakeAst 5]
  	(assert (not= (ast? fakeAst) true))
  	(assert (= (ast? parsed) true)))

  (assert (= (.-type (first (l/run* [?p] (program ?p)))) "VariableDeclaration"))



  ; child
  (assert (= (first (l/run* [?prop]
    					(l/fresh [?node ?value]
     						(program ?node)
     						(child ?prop ?node ?value))))
  				"declarations"))


  ;has
  (assert (= 
   (count (l/run* [?props]
    (l/fresh [?p ?value]
      (program ?p)
      (has ?props ?p ?value))))
   3))
  (assert (= 
   (first (l/run* [?props]
    (l/fresh [?p ?value]
      (program ?p)
      (has ?props ?p ?value))))
   "type"))


  (js-print "AST Unit tests finished."))