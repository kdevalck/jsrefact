(ns jsrefact.tests.analysistest
  (:use-macros [cljs.core.logic.macros :only [run*]])
  (:require-macros [cljs.core.logic.macros :as l])
  (:use [jsrefact.analysis :only [doAnalysis jsa scope proto objects props mayHaveProp ret arg receiver]])
  (:require 
    [jsrefact.predicates :as pred]
    [jsrefact.analysis :as analysis])
  )



(defn run []
  (println "  Analysis predicates unit tests started.")
  
  
  ;;; SCOPE TESTS
  ;;;;;;;;;;;;;;;
  (pred/parseCode "var x = function () {}; x();")
  (doAnalysis)
  (def funcexpr (first (l/run* [?scope] (pred/functionexpression ?scope))))
  (def globalscope (.-globala @jsa))
  (assert (= globalscope (first 
                           (l/run* [?scope]
                                   (l/fresh [?func]
                                            (pred/functionexpression ?func)
                                            (scope ?func ?scope))))))
  (def aScope (first (l/run* 
                       [?scope]
                       (l/fresh [?func]
                                (pred/functionexpression ?func)
                                (scope ?func ?scope)))))
  (assert (= funcexpr (first (l/run* [?func]
                                     (scope ?func aScope)))))
  
  (pred/parseCode "function add1(n){return n+1};")
  (doAnalysis)
  ; TODO does not work with functiondeclarations yet.
  
  
  ;;; PROTO TESTS
  ;;;;;;;;;;;;;;;
  (pred/parseCode "function F() {}; var f = new F();")
  (doAnalysis)
  (def protoAddr (first (l/run* [?protoaddr]
                                (l/fresh [?varf ?varfObj]
                                         (pred/newexpression ?varf)
                                         (objects ?varf ?varfObj)
                                         (proto ?varfObj ?protoaddr)))))
  (assert (= protoAddr (first (l/run* [?protoaddr]
                                      (l/fresh [?varf ?varfObj]
                                               (pred/ast-variabledeclarationwithname ?varf "f")
                                               (objects ?varf ?varfObj)
                                               (proto ?varfObj ?protoaddr))))))
  (def newFAddress (first (l/run* [?varfObj]
                                  (l/fresh [?varf]
                                           (pred/newexpression ?varf)
                                           (objects ?varf ?varfObj)))))
  (assert (= newFAddress (first (l/run* [?objectAddr] (proto ?objectAddr protoAddr)))))
  
  (pred/parseCode "function F() {}; F.prototype = 123; var f = new F();")
  (doAnalysis)
  (assert (= () (l/run* [?protoaddr]
                        (l/fresh [?varf ?varfObj]
                                 (pred/newexpression ?varf)
                                 (objects ?varf ?varfObj)
                                 (proto ?varfObj ?protoaddr)))))
  
  
  ;;; PROPS TESTS
  ;;;;;;;;;;;;;;;
  (pred/parseCode "var x = { y : 123 }; var z = { p : x };")
  (doAnalysis)
  (def objectX (first (l/run* [?varxObj]
                              (l/fresh [?varX]
                                       (pred/ast-variabledeclarationwithname ?varX "x")
                                       (objects ?varX ?varxObj)))))
  (assert (= objectX (first (l/run* [?props]
                                    (l/fresh [?varZ ?varzObj]
                                             (pred/ast-variabledeclarationwithname ?varZ "z")
                                             (objects ?varZ ?varzObj)
                                             (props ?varzObj ?props))))))
  (def objectZ (first (l/run* [?varzObj]
                              (l/fresh [?varZ]
                                       (pred/ast-variabledeclarationwithname ?varZ "z")
                                       (objects ?varZ ?varzObj)))))
  (assert (= objectZ (first (l/run* [?varzObj]
                                    (props ?varzObj objectX)))))
  
  
  ;;; MAYHAVEPROP TESTS
  (pred/parseCode "var x = { y : 123 };")
  (doAnalysis)
  (def objectX (first (l/run* [?objs]
                              (l/fresh [?node]
                                       (pred/ast-variabledeclarationwithname ?node "x")
                                       (objects ?node ?objs)))))
  (assert (= false (first (l/run* [?v] (l/== ?v (mayHaveProp objectX "x"))))))
  (assert (= true (first (l/run* [?v] (l/== ?v (mayHaveProp objectX "y"))))))
  (pred/parseCode "var x = {}; x.y = 123;")
  (doAnalysis)
  (def newObjectX (first (l/run* [?objs]
                                 (l/fresh [?node]
                                          (pred/ast-variabledeclarationwithname ?node "x")
                                          (objects ?node ?objs)))))
  (assert (= false (first (l/run* [?v] (l/== ?v (mayHaveProp newObjectX "x"))))))
  (assert (= true (first (l/run* [?v] (l/== ?v (mayHaveProp newObjectX "y"))))))
  
  
  ;;; RET TESTS
  (pred/parseCode "var x = function (y) { return y }; x(x);")
  (doAnalysis)
  (def functionX (first (l/run* [?funcXaddr]
                                (l/fresh [?funcX]
                                         (pred/functionexpression ?funcX)
                                         (objects ?funcX ?funcXaddr)))))
  (assert (= functionX (first (l/run* [?returnAddr]
                                      (ret functionX ?returnAddr)))))
  (assert (= functionX (first (l/run* [?funcXaddr]
                                      	(ret ?funcXaddr functionX)))))
  
  (pred/parseCode "var z = {y : 5}; var x = function (y) { return y }; x(x); x(z);")
  (doAnalysis)
  (def x (first (l/run* [?funcXaddr]
                        (l/fresh [?funcX]
                                 (pred/functionexpression ?funcX)
                                 (objects ?funcX ?funcXaddr)))))
  (def z (first (l/run* [?Zaddr]
                        (l/fresh [?Z]
                                 (pred/ast-variabledeclarationwithname ?Z "z")
                                 (objects ?Z ?Zaddr)))))
  (assert (= x (first (l/run* [?returnAddr]
                              (ret x ?returnAddr)))))
  (assert (= z (second (l/run* [?returnAddr]
                               (ret x ?returnAddr)))))
  (assert (= x (first (l/run* [?funcXaddr]
                              (ret ?funcXaddr x)))))
  
  
  ;;; ARG TESTS
  ;;;;;;;;;;;;;
  (pred/parseCode "var x = function (y) { return y }; x(x);")
  (doAnalysis)
  (def x (first (l/run* [?objs]
                        (l/fresh [?node]
                                 (pred/ast-variabledeclarationwithname ?node "x")
                                 (objects ?node ?objs)))))
  (assert (= x (first (l/run* [?argaddr]
                              (l/fresh [?funcX ?funcXaddr]
                                       (pred/functionexpression ?funcX)
                                       (objects ?funcX ?funcXaddr)
                                       (arg ?funcXaddr 1 ?argaddr))))))
  
  (assert (= x (first (l/run* [?func] (l/fresh [?i] (arg ?func ?i x))))))
  (assert (= 1 (first (l/run* [?i] (l/fresh [?func] (arg ?func ?i x))))))
  
  (pred/parseCode "var x = function (y, z) { return y }; x(x,x);")
  (doAnalysis)
  (def x (first (l/run* [?objs]
                        (l/fresh [?node]
                                 (pred/functionexpression ?node)
                                 (objects ?node ?objs)))))
  (assert (= x (first (l/run* [?argaddr]
                              (arg x 1 ?argaddr)))))
  (assert (= x (first (l/run* [?argaddr]
                              (arg x 2 ?argaddr))))) 
  
  (assert (= 2 (count (l/run* [?func] (l/fresh [?i] (arg ?func ?i x))))))
  
  (assert (= '(1 2) (l/run* [?i] (l/fresh [?func] (arg ?func ?i x)))))
  
  (assert (= '(1 2) (l/run* [?i] (arg x ?i x))))
  
  
  ;;; RECEIVER TESTS
  ;;;;;;;;;;;;;;;;;;
  (pred/parseCode "var x = function (y) { return y }; x(x);")
  (doAnalysis)
  (def globala (.-globala @jsa))
  (assert (= globala (first (l/run* [?receiveraddr]
                                    (l/fresh [?funcY ?funcYaddr]
                                             (pred/functionexpression ?funcY)
                                             (objects ?funcY ?funcYaddr)
                                             (receiver ?funcYaddr ?receiveraddr))))))
  
  (pred/parseCode "var x = { y : function (z) { return z }}; x.y(x);")
  (doAnalysis)
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node]
                                    (pred/ast-variabledeclarationwithname ?node "x")
                                    (objects ?node ?objs)))))
  (def funcY (first (l/run* [?funcYaddr]
                            (l/fresh [?funcY]
                                     (pred/functionexpression ?funcY)
                                     (objects ?funcY ?funcYaddr)))))
  (assert (= varx (first (l/run* [?receiveraddr]
                                 (receiver funcY ?receiveraddr)))))
  
  (assert (= funcY (first (l/run* [?funcaddr]
                                  (receiver ?funcaddr varx)))))

  (pred/parseCode "var x = { y : function (z) { return z }};")
  (doAnalysis)
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node]
                                    (pred/ast-variabledeclarationwithname ?node "x")
                                    (objects ?node ?objs)))))
  (def funcY (first (l/run* [?funcYaddr]
                            (l/fresh [?funcY]
                                     (pred/functionexpression ?funcY)
                                     (objects ?funcY ?funcYaddr)))))
  (assert (= true (empty? (l/run* [?receiveraddr]
                                 (receiver funcY ?receiveraddr)))))
  
  (assert (= true (empty? (l/run* [?funcaddr]
                                  (receiver ?funcaddr varx)))))
  
  (println "  Analysis predicates unit tests ended.")
  )