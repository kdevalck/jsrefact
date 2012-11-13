(ns jsrefact.tests.asttest
	(:use-macros [cljs.core.logic.macros :only [run*]])
	(:require-macros [cljs.core.logic.macros :as l])
	(:use [jsrefact.core :only [js-print esprimaParser ast-kind ast-property-value
		ast-properties ast? program child parsed has progrm]]))


; Parse a sample program
(def parsedTest (.parse esprimaParser "var x = 43"))
(def progrmTest (.pop (.-body parsedTest)))
; Swap the progrm from jsrefact.core to the programTest
;  parsed inside jsrefact.tests.asttest to provide a 
;  ast object to the unittests.
(swap! progrm (fn [progrmT] progrmTest))

(defn run []
  (js-print "AST Unit tests started.")

  (assert (= (ast-kind parsedTest) "Program"))

  (assert (= (ast-property-value parsedTest "type") "Program"))

  (assert (= (first (ast-properties parsedTest)) "type"))

  (let [fakeAst 5]
  	(assert (not= (ast? fakeAst) true))
  	(assert (= (ast? parsedTest) true)))

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