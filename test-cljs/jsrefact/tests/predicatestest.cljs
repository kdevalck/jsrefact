(ns jsrefact.tests.predicatestest
  	(:use-macros [cljs.core.logic.macros :only [run*]])
  	(:require-macros [cljs.core.logic.macros :as l])
  	(:use [jsrefact.predicates :only [ast-kind ast-property-value ast-property-set-value
                                     		ast-properties ast? program child has child+ ast ast-name
                                     literal-value variabledeclaration-name callexpression
                                     functiondeclaration-name callexpression-callee callexpression-arguments
                                     callexpression-argument literal functiondeclaration 
                                     functiondefinition-callexpression]])
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
  
  ; literal-value
  (proj/analyze "var x = 42;")

  (def lit (first (l/run* [?l] (literal-value ?l 42))))
  
  (assert (= 42 (first (l/run* [?v] (l/fresh [?l] (literal-value ?l ?v))))))
  
  (assert (= (list lit) (l/run* [?l] (l/fresh [?v] (literal-value ?l ?v)))))
  
  (assert (= (list lit) (l/run* [?l] (literal-value ?l 42))))
  
  (assert (= 42 (first (l/run* [?l] (literal-value lit ?l)))))
  
  
  ; ast-name
  (assert (= (count (l/run* [?n] (ast-name ?n "x"))) 1))
  
  (assert (= (.-name (first (l/run* [?n] (ast-name ?n "x"))))
             "x"))
  (assert (= (count (l/run* [?v] 
                            (l/fresh [?n] 
                                     (ast-name ?n ?v))))
             1))
  (assert (= (count (l/run* [?n] (ast-name ?n "y"))) 0))
  
  (proj/analyze "var x = 42; var y = 43")
  
  (def xx (first (l/run* [?n] (ast-name ?n "x"))))
  (def yy (first (l/run* [?n] (ast-name ?n "y"))))
  
  (assert (= (list xx yy) (l/run* [?n] (l/fresh [?x] (ast-name ?n ?x)))))
  
  (assert (= (list "x" "y") (l/run* [?x] (l/fresh [?n] (ast-name ?n ?x)))))
  
  (def x (first (l/run* [?n] (l/fresh [?x] (ast-name ?n ?x)))))
  (def y (second (l/run* [?n] (l/fresh [?x] (ast-name ?n ?x)))))
  
  (assert (= (list "x") (l/run* [?n] (ast-name x ?n))))
  
  
  ; variabledeclaration-name
  (proj/analyze "var x = 42;")
  (def varx (first (l/run* [?d] (l/fresh [?name] (variabledeclaration-name ?d ?name)))))
  
  (assert (= "x" (first (l/run* [?name] (l/fresh [?d] (variabledeclaration-name ?d ?name))))))
  
  (assert (= varx (first (l/run* [?d] (l/fresh [?name] (variabledeclaration-name ?d ?name))))))
  
  (assert (= "x" (first (l/run* [?name] (variabledeclaration-name varx ?name)))))
  
  (assert (= (list varx) (l/run* [?d] (variabledeclaration-name ?d "x"))))
  
  
  ; functiondeclaration-name
  (proj/analyze "function add1(n){return n+1}; function inc(f, p){return f(p)};")
  
  (assert (= (list "add1" "inc") (l/run* [?x] (l/fresh [?n] (functiondeclaration-name ?n ?x)))))
  
  (def add1F (first (l/run* [?n] (l/fresh [?x] (functiondeclaration-name ?n ?x)))))
  (def incF (second (l/run* [?n] (l/fresh [?x] (functiondeclaration-name ?n ?x)))))
  (assert 2 (count (l/run* [?n] (l/fresh [?x] (functiondeclaration-name ?n ?x)))))
  
  (assert (= (list incF) (l/run* [?x] (functiondeclaration-name ?x "inc"))))
  
  (assert (= "add1" (first (l/run* [?x] (functiondeclaration-name add1F ?x)))))
  
  
  ;callexpression-callee
  (proj/analyze "function add1(n){return n+1}; function inc(f, p){return f(p)}; add1(5)")
  
  (assert (= 2 (count (l/run* [?x] (l/fresh [?n] (callexpression-callee ?n ?x))))))
  (def add1F (first (l/run* [?x] (l/fresh [?n] (callexpression-callee ?n ?x)))))
  
  (assert (= 
            (first (l/run* [?x](callexpression ?x)))
            (first (l/run* [?n] (callexpression-callee ?n add1F)))))
  
  (def incF (second (l/run* [?n] (callexpression ?n))))
  (assert (= (l/run* [?x] (has "callee" incF ?x)) (l/run* [?n] (callexpression-callee incF ?n))))
  
  (proj/analyze "var a = function () {}; var x = {a : a}; a(); this.a(); x.a();")
  
  (assert (= 3 (count (l/run* [?x] (l/fresh [?n] (callexpression-callee ?n ?x))))))
  
  (def ACallee (first (l/run* [?n] (l/fresh [?x] (callexpression-callee ?n ?x)))))
  
  (assert (= 
            (first (l/run* [?x] (l/fresh [?y] (callexpression ?y)(has "callee" ?y ?x))))
            (first (l/run* [?x] (callexpression-callee ACallee ?x)))))
  

  ;callexpression-arguments
  (proj/analyze "var a = function (x, y, z) {}; a(1, 2, 3);")

  (assert (= 3 (count (first (l/run* [?arg] (l/fresh [?n] (callexpression-arguments ?n ?arg)))))))

  (def args (first (l/run* [?arg] (l/fresh [?n] (callexpression-arguments ?n ?arg)))))

  (assert (= (l/run* [?x] (callexpression ?x)) (l/run* [?n] (callexpression-arguments ?n args))))

  (def callexpr (first (l/run* [?callexpr] (callexpression ?callexpr))))

  (assert (= (list args) (l/run* [?args] (callexpression-arguments callexpr ?args))))


  ;callexpression-argument
  (assert (= args (l/run* [?arg] (l/fresh [?n] (callexpression-argument ?n ?arg)))))

  (def firstarg (first (l/run* [?id] (literal ?id))))

  (assert (= callexpr (first (l/run* [?n] (callexpression-argument ?n firstarg)))))


  ; functiondefinition-callexpression
  (proj/analyze "function add1(n){return n+1}; add1(2);")
  (assert (= (l/run* [?x] (functiondeclaration ?x)) (l/run* [?f] (l/fresh [?c] (functiondefinition-callexpression ?f ?c)))))

  (assert (= (l/run* [?x] (callexpression ?x)) (l/run* [?c] (l/fresh [?f] (functiondefinition-callexpression ?f ?c)))))

  (proj/analyze "function add1(n){return n+1}; add1(2); add1(3);")
  (def funcdecl (first (l/run* [?decl] (functiondeclaration ?decl))))

  (assert (= (count (l/run* [?c] (functiondefinition-callexpression funcdecl ?c)))))  ;(#<add1(2)> #<add1(3)>)

  (def aCallExpr (first (l/run* [?exp] (callexpression ?exp))))

  (assert (= (list funcdecl) (l/run* [?d] (functiondefinition-callexpression ?d aCallExpr))))

  (proj/analyze "function add1(n){return n+1}; add1(2); function b(n) {}; b(1)")
  (def b (second (l/run* [?f] (l/fresh [?c] (functiondefinition-callexpression ?f ?c)))))
  (def bCall (first (l/run* [?c] (functiondefinition-callexpression b ?c))))

  (assert (= (list b) (l/run* [?f] (functiondefinition-callexpression ?f bCall))))



  (println "  AST predicates Unit tests finished."))

