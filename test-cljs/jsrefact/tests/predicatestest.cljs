(ns jsrefact.tests.predicatestest
  	(:use-macros [cljs.core.logic.macros :only [run*]])
  	(:require-macros [cljs.core.logic.macros :as l])
  	(:use [jsrefact.predicates :only [ast-kind ast-property-value ast-property-set-value
                                     		ast-properties ast? program child has child+ ast ast-name]])
    (:require [jsrefact.project :as proj]))

;(parseCode "var x = 43")
;(parseCode "var ar = []; for (var i = 0; i < 1000; i++){ar[i] = i;}; ar;")
;(parseCode "var i = 0; var x = null; var patt='true'; function Inc(){i = i++}; function Dec(){i = i--}; Inc(); Dec(); Inc();" (js* "{ loc: true }"))
;(parseCode "function add1(n){return n+1}; var i = 0; function inc(f, p){return f(p)}; inc(add1,i);" (js* "{ loc: true }"))
;(parseCode "var k = true; var l = 0; var m = 'test'; var n = [1,2];" (js* "{ loc: true }"))

(defn run []
  (proj/analyze "var x = 43")
  
  (def one (first 
             (l/run* [?value]
                     (l/fresh [?node ?prop]
                              (program ?node)
                              (child ?prop ?node ?value)))))
  
  (def sec (second 
             (l/run* [?v]
                     (l/fresh [?n ?p]
                              (l/==  ?n  one)
                              (child ?p ?n ?v)))))
  
  
  
  (println "  AST predicates Unit tests started.")
  
  (assert (= (ast-property-value (proj/parsed) "type") "Program"))
  
  (assert (= (ast-property-value (first (proj/program)) "type") "VariableDeclaration"))
  
  (assert (= (instance? js/Array (ast-property-value (first (proj/program)) "declarations")) true))
  
  (assert (= (first (ast-properties (proj/parsed))) "type"))
  
  (assert (= (first (ast-properties (first (proj/program)))) "type"))
  
  (assert (= (count (ast-properties (first (proj/program)))) 3))
  
  (assert (= (ast-kind (proj/parsed)) "Program"))
  
  (assert (= (ast-kind (first (proj/program))) "VariableDeclaration"))
  
  (let [fakeAst 5]
    	(assert (not= (ast? fakeAst) true))
    	(assert (= (ast? (proj/parsed)) true)))
  
  (assert (= (ast? (first (proj/program))) true))
  
  (assert (= (.-type (first (l/run* [?p] (program ?p)))) "VariableDeclaration"))
  
  ; program
  (assert (= (first (l/run* [?p] (program ?p))) (first (proj/program))))
  
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
  

  
  ; ast-name
  (assert (= (count (l/run* [?n] (ast-name ?n "x"))) 1))
  
  (assert (= (.-name (first (l/run* [?n] (ast-name ?n "x"))))
             "x"))
  
  (assert (= (count (l/run* [?v] 
                            (l/fresh [?n] 
                                     (ast-name ?n ?v))))
             1))

  (assert (= (count (l/run* [?n] (ast-name ?n "y"))) 0))
  
  
  (println "  AST predicates Unit tests finished."))

