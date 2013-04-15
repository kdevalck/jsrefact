(ns jsrefact.tests.rewritertest
  	(:use-macros [cljs.core.logic.macros :only [run*]])
  	(:require-macros [cljs.core.logic.macros :as l])
    (:use [jsrefact.rewriter :only 
      [ast-add-property ast-change-property removeNode create-empty-object
      insertBefore insertAfter createIdentifier renameIdentifier astRename]])
  (:require 
    [jsrefact.project :as proj]
    [jsrefact.predicates :as pred]))

(defn run []
  (println "  AST Rewriter unit tests started.")

  ;;; ast-add-property/ast-change-property TESTS
  ;;;;;;;;;;;;;;;;;;;;;;;;;;

  (def t1 (create-empty-object))
  (ast-add-property t1 "x" 5)
  (assert (.-x t1) 5)
  (ast-change-property t1 "x" 6)
  (assert (.-x t1) 6)

  ;;; removeNode TESTS
  ;;;;;;;;;;;;;;;;;;;;
  (def t2 (new js/Array 1 2 3))
  (removeNode t2 3)
  (assert (= (count t2) 2))
  (assert (= 1 (first t2)))
  (assert (= 2 (second t2)))

  ;;; insertBefore / insertAfter
  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  (def t3 (new js/Array 1 3 5))
  (insertBefore t3 3 2)
  (insertAfter t3 3 4)
  (assert (= 2 (nth t3 1)))
  (assert (= 4 (nth t3 3)))

  ;;; createIdentifier
  ;;;;;;;;;;;;;;;;;;;;
  (def t4 (createIdentifier "hello"))
  (assert (= "Identifier" (.-type t4)))
  (assert (= "hello" (.-name t4)))

  ;;; renameIdentifier
  ;;;;;;;;;;;;;;;;;;;;
  (def t5 (createIdentifier "a"))
  (renameIdentifier t5 "a" "b")
  (assert (= "b" (.-name t5)))

  ;;; renameMemberExpression
  ;;;;;;;;;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = {y : 5}; x.y")
  (def t6 (first (l/run* [?x] (pred/memberexpression ?x))))
  (astRename t6 "y" "z")
  (assert (= "z" (.-name (.-property t6))))
  (astRename t6 "x" "a")
  (assert (= "a" (.-name (.-object t6))))
  (proj/analyze "var x = {y : 5}; x['y']")
  (def t7 (first (l/run* [?x] (pred/memberexpression ?x))))
  (astRename t7 "y" "z")
  (assert (= "z" (.-name (.-property t7))))
  (assert (= false (.-computed t7)))


  ;;; astRename
  ;;;;;;;;;;;;;
  ; identifier
  (proj/analyze "var x = 42;")
  (def t8 (first (l/run* [?x] (pred/identifier ?x))))
  (astRename t8 "x" "y")
  (assert (= "y" (.-name t8)))
  ; property descriptor

  ; TODO

  ; variabledeclarator
  (proj/analyze "var x = 42;")
  (def t10 (first (l/run* [?x] (pred/variabledeclarator ?x))))
  (astRename t10 "x" "y")
  (assert (= "y" (.-name (.-id t10))))
  ; callexpression
  (proj/analyze "var x = function(){}; x();")
  (def t11 (first (l/run* [?x] (pred/callexpression ?x))))
  (astRename t11 "x" "y")
  (assert (= "y" (.-name (.-callee t11))))
  ; newexpression
  (proj/analyze "function F() {}; var f = new F();")
  (def t12 (first (l/run* [?x] (pred/newexpression ?x))))
  (astRename t12 "F" "x")
  (assert (= "x" (.-name (.-callee t12))))
  ; functiondeclaration
  (proj/analyze "function A(){};")
  (def t13 (first (l/run* [?x] (pred/functiondeclaration ?x))))
  (astRename t13 "A" "x")
  (assert (= "x" (.-name (.-id t13))))

  (println "  AST Rewriter unit tests ended."))