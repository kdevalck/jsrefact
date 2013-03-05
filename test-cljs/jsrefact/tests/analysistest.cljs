(ns jsrefact.tests.analysistest
  (:use-macros [cljs.core.logic.macros :only [run*]])
  (:require-macros [cljs.core.logic.macros :as l])
  (:use [jsrefact.analysis :only [jsanalysis globala scope proto objects props mayHaveProp ret arg receiver]])
  (:require 
    [jsrefact.predicates :as pred]
    [jsrefact.project :as proj])
  )


(defn run []
  (println "  Analysis predicates unit tests started.")
  
  ;;; ANALYSIS TESTS
  ;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = 42")
  (assert (= (proj/jsa) (first (l/run* [?p] (jsanalysis ?p)))))
  (assert (= (.-globala (proj/jsa)) (first (l/run* [?gl] (globala ?gl)))))
  ;;; SCOPE TESTS
  ;;;;;;;;;;;;;;;
  (proj/analyze "var x = function () {}; x();")
  (def funcexpr (first (l/run* [?scope] (pred/functionexpression ?scope))))
  (assert (= (first (l/run* [?gl] (globala ?gl))) 
             (first 
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
  
  (proj/analyze "function add1(n){return n+1};")
  ; TODO does not work with functiondeclarations yet.
  
  
  ;;; PROTO TESTS
  ;;;;;;;;;;;;;;;
  (proj/analyze "function F() {}; var f = new F();")
  (def protoAddr (first (l/run* [?protoaddr]
                                (l/fresh [?varf ?varfObj]
                                         (pred/newexpression ?varf)
                                         (objects ?varf ?varfObj)
                                         (proto ?varfObj ?protoaddr)))))
  (assert (= protoAddr (first (l/run* [?protoaddr]
                                      (l/fresh [?varf ?varfObj ?ide]
                                               (pred/variabledeclaration-name ?varf "f")
                                               (pred/has "id" ?varf ?ide)
                                               (objects ?ide ?varfObj)
                                               (proto ?varfObj ?protoaddr))))))
  (def newFAddress (first (l/run* [?varfObj]
                                  (l/fresh [?varf]
                                           (pred/newexpression ?varf)
                                           (objects ?varf ?varfObj)))))
  (assert (= newFAddress (first (l/run* [?objectAddr] (proto ?objectAddr protoAddr)))))
  
  (proj/analyze "function F() {}; F.prototype = 123; var f = new F();")
  (assert (= () (l/run* [?protoaddr]
                        (l/fresh [?varf ?varfObj]
                                 (pred/newexpression ?varf)
                                 (objects ?varf ?varfObj)
                                 (proto ?varfObj ?protoaddr)))))
  
 
  ;;; PROPS TESTS
  ;;;;;;;;;;;;;;;
  (proj/analyze "var x = { y : 123 }; var z = { p : x };")
  (def objectX (first (l/run* [?varxObj]
                              (l/fresh [?varX ?ide]
                                       (pred/variabledeclaration-name ?varX "x")
                                       (pred/has "id" ?varX ?ide)
                                       (objects ?ide ?varxObj)))))
  (assert (= objectX (first (l/run* [?props]
                                    (l/fresh [?varZ ?varzObj ?ide]
                                             (pred/variabledeclaration-name ?varZ "z")
                                             (pred/has "id" ?varZ ?ide)
                                             (objects ?ide ?varzObj)
                                             (props ?varzObj ?props))))))
  (def objectZ (first (l/run* [?varzObj]
                              (l/fresh [?varZ ?ide]
                                       (pred/variabledeclaration-name ?varZ "z")
                                       (pred/has "id" ?varZ ?ide)
                                       (objects ?ide ?varzObj)))))
  (assert (= objectZ (first (l/run* [?varzObj]
                                    (props ?varzObj objectX)))))
  
  
  ;;; MAYHAVEPROP TESTS
  ;;;;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = { y : 123 };")
  (def objectX (first (l/run* [?objs]
                              (l/fresh [?node ?ide]
                                       (pred/variabledeclaration-name ?node "x")
                                       (pred/has "id" ?node ?ide)
                                       (objects ?ide ?objs)))))
  (assert (= false (first (l/run* [?v] (l/== ?v (mayHaveProp objectX "x"))))))
  (assert (= true (first (l/run* [?v] (l/== ?v (mayHaveProp objectX "y"))))))

  (proj/analyze "var x = {}; x.y = 123;")
  (def newObjectX (first (l/run* [?objs]
                                 (l/fresh [?node ?ide]
                                          (pred/variabledeclaration-name ?node "x")
                                          (pred/has "id" ?node ?ide)
                                          (objects ?ide ?objs)))))
  (assert (= false (first (l/run* [?v] (l/== ?v (mayHaveProp newObjectX "x"))))))
  (assert (= true (first (l/run* [?v] (l/== ?v (mayHaveProp newObjectX "y"))))))
  
  
  ;;; RET TESTS
  (proj/analyze "var x = function (y) { return y }; x(x);")
  (def functionX (first (l/run* [?funcXaddr]
                                (l/fresh [?funcX]
                                         (pred/functionexpression ?funcX)
                                         (objects ?funcX ?funcXaddr)))))
  (assert (= functionX (first (l/run* [?returnAddr]
                                      (ret functionX ?returnAddr)))))
  (assert (= functionX (first (l/run* [?funcXaddr]
                                      	(ret ?funcXaddr functionX)))))
  
  (proj/analyze "var z = {y : 5}; var x = function (y) { return y }; x(x); x(z);")
  (def x (first (l/run* [?funcXaddr]
                        (l/fresh [?funcX]
                                 (pred/functionexpression ?funcX)
                                 (objects ?funcX ?funcXaddr)))))
  (def z (first (l/run* [?Zaddr]
                        (l/fresh [?Z ?ide]
                                 (pred/variabledeclaration-name ?Z "z")
                                 (pred/has "id" ?Z ?ide)
                                 (objects ?ide ?Zaddr)))))
  (assert (= x (first (l/run* [?returnAddr]
                              (ret x ?returnAddr)))))
  (assert (= z (second (l/run* [?returnAddr]
                               (ret x ?returnAddr)))))
  (assert (= x (first (l/run* [?funcXaddr]
                              (ret ?funcXaddr x)))))
  
  
  ;;; ARG TESTS
  ;;;;;;;;;;;;;
  (proj/analyze "var x = function (y) { return y }; x(x);")
  (def x (first (l/run* [?objs]
                        (l/fresh [?node ?ide]
                                 (pred/variabledeclaration-name ?node "x")
                                 (pred/has "id" ?node ?ide)
                                 (objects ?ide ?objs)))))
  (assert (= x (first (l/run* [?argaddr]
                              (l/fresh [?funcX ?funcXaddr]
                                       (pred/functionexpression ?funcX)
                                       (objects ?funcX ?funcXaddr)
                                       (arg ?funcXaddr 1 ?argaddr))))))
  
  (assert (= x (first (l/run* [?func] (l/fresh [?i] (arg ?func ?i x))))))
  (assert (= 1 (first (l/run* [?i] (l/fresh [?func] (arg ?func ?i x))))))
  
  (proj/analyze "var x = function (y, z) { return y }; x(x,x);")
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
  (proj/analyze "var x = function (y) { return y }; x(x);")
  (assert (= (first (l/run* [?gl] (globala ?gl)))
             (first (l/run* [?receiveraddr]
                            (l/fresh [?funcY ?funcYaddr]
                                     (pred/functionexpression ?funcY)
                                     (objects ?funcY ?funcYaddr)
                                     (receiver ?funcYaddr ?receiveraddr))))))
  
  (proj/analyze "var x = { y : function (z) { return z }}; x.y(x);")
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node ?ide]
                                    (pred/variabledeclaration-name ?node "x")
                                    (pred/has "id" ?node ?ide)
                                    (objects ?ide ?objs)))))
  (def funcY (first (l/run* [?funcYaddr]
                            (l/fresh [?funcY]
                                     (pred/functionexpression ?funcY)
                                     (objects ?funcY ?funcYaddr)))))
  (assert (= varx (first (l/run* [?receiveraddr]
                                 (receiver funcY ?receiveraddr)))))
  
  (assert (= funcY (first (l/run* [?funcaddr]
                                  (receiver ?funcaddr varx)))))

  (proj/analyze "var x = { y : function (z) { return z }};")
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node ?ide]
                                    (pred/variabledeclaration-name ?node "x")
                                    (pred/has "id" ?node ?ide)
                                    (objects ?ide ?objs)))))
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