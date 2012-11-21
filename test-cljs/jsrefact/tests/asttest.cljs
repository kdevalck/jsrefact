(ns jsrefact.tests.asttest
	(:use-macros [cljs.core.logic.macros :only [run*]])
	(:require-macros [cljs.core.logic.macros :as l])
	(:use [jsrefact.core :only [js-print esprimaParser ast-kind ast-property-value
		ast-properties ast? program child parsed has progrm child+ ast ast-with-input]]))


; Parse a sample program
(def parsedTest (.parse esprimaParser "var x = 43"))
(def progrmTest (.-body parsedTest))
; Swap the progrm from jsrefact.core to the programTest
;  parsed inside jsrefact.tests.asttest to provide a 
;  ast object to the unittests.
(swap! progrm (fn [progrmT] progrmTest))

(def one (first (l/run* [?value]
 (l/fresh [?node ?prop]
  (program ?node)
  (child ?prop ?node ?value)))))

(def sec (second (l/run* [?v]
  (l/fresh [?n ?p]
    (l/==  ?n  one)
    (child ?p ?n ?v)))))

(defn run []
  (println "AST Unit tests started.")

  (assert (= (ast-property-value parsedTest "type") "Program"))

  (assert (= (ast-property-value (first @progrm) "type") "VariableDeclaration"))

  (assert (= (instance? js/Array (ast-property-value @progrm "declarations")) true))

  (assert (= (first (ast-properties parsedTest)) "type"))

  (assert (= (first (ast-properties (first @progrm))) "type"))

  (assert (= (count (ast-properties (first @progrm))) 3))

  (assert (= (ast-kind parsedTest) "Program")) 

  (assert (= (ast-kind (first @progrm)) "VariableDeclaration"))
           
  (let [fakeAst 5]
  	(assert (not= (ast? fakeAst) true))
  	(assert (= (ast? parsedTest) true)))

  (assert (= (ast? (first @progrm)) true))

  (assert (= (.-type (first (l/run* [?p] (program ?p)))) "VariableDeclaration"))

  ; program
  (assert (= (first (l/run* [?p] (program ?p))) (first @progrm))) 

  ; child
  (assert (= (first (l/run* [?prop]
   (l/fresh [?node ?value]
     (program ?node)
     (child ?prop ?node ?value))))
  "declarations"))

  (assert (= (ast-kind (first (l/run* [?va]
            (l/fresh [?no ?pr]
              (program ?no)
              (child ?pr ?no ?va))))) 
           "VariableDeclarator"))

  (assert (= (first (l/run* [?pr]
    (l/fresh [?no ?va]
      (l/==  ?no  one)
      (child ?pr ?no ?va)))) "id"))

  (assert (= (l/run* [?pr]
    (l/fresh [?no ?va]
      (l/==  ?no  sec)
      (child ?pr ?no ?va))) ()))

  (assert (= (l/run* [?va]
    (l/fresh [?no ?pr]
      (l/==  ?no  sec)
      (child ?pr ?no ?va))) ()))

  (assert (= (ast-kind (first (l/run* [?va]
    (l/fresh [?no ?pr]
      (l/==  ?no  one)
      (child ?pr ?no ?va)))))
  "Identifier"))



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

  (assert (= 
           (first (l/run* [?value]
            (l/fresh [?p ?props]
              (program ?p)
              (has ?props ?p ?value))))
            "VariableDeclaration"))

  (assert (= 
           (instance? js/Array (second (l/run* [?value]
                                          (l/fresh [?p ?props]
                                            (program ?p)
                                            (has ?props ?p ?value)))))
            true))

  ;child+
  (assert (= (count (l/run* [?chld]
                       (l/fresh [?p]
                         (program ?p)
                         (child+ ?p ?chld))))
          3))

  (assert (= (.-type (last (l/run* [?chld]
                             (l/fresh [?p]
                               (program ?p)
                               (child+ ?p ?chld)))))
          "Literal"))

  (assert (= (.-type (second (l/run* [?chld]
                               (l/fresh [?p]
                                 (program ?p)
                                 (child+ ?p ?chld))))) 
          "Identifier"))

  (assert (= (.-type (first (l/run* [?chld]
                             (l/fresh [?p]
                               (program ?p)
                               (child+ ?p ?chld))))) 
          "VariableDeclarator"))

  ; ast
  (assert (= (count (l/run* [?kind]
                      (l/fresh [?node]
                        (ast ?kind ?node))))
          4))

  (assert (= (.-type (first (l/run* [?node]
                                (ast "Identifier" ?node))))
          "Identifier"))

  (assert (= (count (l/run* [?node] 
                      (ast "Identifier" ?node)))
           1))

  (assert (= (first (l/run* [?kind]
                       (l/fresh [?node]
                        (ast ?kind ?node))))
          "VariableDeclaration"))

  ; ast-with-input

  (assert (= (count (l/run* [?kind]
                      (l/fresh [?nodeOut ?no]
                        (l/== ?no one)
                        (ast-with-input ?kind ?no ?nodeOut))))
          3))

  (assert (= (first (l/run* [?kind]
                      (l/fresh [?nodeOut ?no]
                        (l/== ?no one)
                        (ast-with-input ?kind ?no ?nodeOut))))
          "VariableDeclarator"))

  (assert (= (first (l/run* [?kind]
                      (l/fresh [?nodeOut ?no]
                        (l/== ?no sec)
                        (ast-with-input ?kind ?no ?nodeOut))))
          "Literal"))

  (assert (= (count (l/run* [?kind]
                      (l/fresh [?nodeOut ?no]
                        (l/== ?no sec)
                        (ast-with-input ?kind ?no ?nodeOut))))
          1))


  (println "AST Unit tests finished."))