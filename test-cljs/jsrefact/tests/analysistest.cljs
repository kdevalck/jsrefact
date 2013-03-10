(ns jsrefact.tests.analysistest
  (:use-macros [cljs.core.logic.macros :only [run*]])
  (:require-macros [cljs.core.logic.macros :as l])
  (:use [jsrefact.analysis :only [jsanalysis globala ast-scope object-proto expression-object object-propertyObject mayHaveProp function-return arg function-receiver]])
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
  
  
  ;;; ast-scope TESTS
  ;;;;;;;;;;;;;;;
  (proj/analyze "var x = function () {}; x();")
  (def funcexpr (first (l/run* [?e] (pred/functionexpression ?e))))
  (assert (= (first (l/run* [?gl] (globala ?gl))) 
             (first 
               (l/run* [?scope]
                       (l/fresh [?func]
                                (pred/functionexpression ?func)
                                (ast-scope ?func ?scope))))))
  (def aScope (first (l/run* 
                       [?scope]
                       (l/fresh [?func]
                                (pred/functionexpression ?func)
                                (ast-scope ?func ?scope)))))
  (assert (= funcexpr (first (l/run* [?func]
                                     (ast-scope ?func aScope)))))
  
  (proj/analyze "function add1(n){return n+1};")
  ; TODO does not work with functiondeclarations yet.
  
  
  ;;; object-proto TESTS
  ;;;;;;;;;;;;;;;
  (proj/analyze "function F() {}; var f = new F();")
  (def protoAddr (first (l/run* [?protoaddr]
                                (l/fresh [?varf ?varfObj]
                                         (pred/newexpression ?varf)
                                         (expression-object ?varf ?varfObj)
                                         (object-proto ?varfObj ?protoaddr)))))
  (assert (= protoAddr (first (l/run* [?protoaddr]
                                      (l/fresh [?varf ?varfObj ?ide]
                                               (pred/variabledeclaration-name ?varf "f")
                                               (pred/has "id" ?varf ?ide)
                                               (expression-object ?ide ?varfObj)
                                               (object-proto ?varfObj ?protoaddr))))))
  (def newFAddress (first (l/run* [?varfObj]
                                  (l/fresh [?varf]
                                           (pred/newexpression ?varf)
                                           (expression-object ?varf ?varfObj)))))
  (assert (= newFAddress (first (l/run* [?objectAddr] (object-proto ?objectAddr protoAddr)))))
  
  (proj/analyze "function F() {}; F.prototype = 123; var f = new F();")
  (assert (= () (l/run* [?protoaddr]
                        (l/fresh [?varf ?varfObj]
                                 (pred/newexpression ?varf)
                                 (expression-object ?varf ?varfObj)
                                 (object-proto ?varfObj ?protoaddr)))))
  
  
  ;;; object-propertyObject TESTS
  ;;;;;;;;;;;;;;;
  (proj/analyze "var x = {}; var z = { p : x };")
  (def objectX (first (l/run* [?varxObj]
                              (l/fresh [?varX ?ide]
                                       (pred/variabledeclaration-name ?varX "x")
                                       (pred/has "id" ?varX ?ide)
                                       (expression-object ?ide ?varxObj)))))
  (assert (= objectX (first (l/run* [?prop]
                                    (l/fresh [?varZ ?varzObj ?ide]
                                             (pred/variabledeclaration-name ?varZ "z")
                                             (pred/has "id" ?varZ ?ide)
                                             (expression-object ?ide ?varzObj)
                                             (object-propertyObject ?varzObj ?prop))))))
  (def objectZ (first (l/run* [?varzObj]
                              (l/fresh [?varZ ?ide]
                                       (pred/variabledeclaration-name ?varZ "z")
                                       (pred/has "id" ?varZ ?ide)
                                       (expression-object ?ide ?varzObj)))))
  (assert (= objectZ (first (l/run* [?varzObj]
                                    (object-propertyObject ?varzObj objectX)))))
  
  (assert (= objectZ (first (l/run* [?x] (l/fresh [?y] (object-propertyObject ?x ?y))))))

  (assert (= objectX (first (l/run* [?y] (l/fresh [?x] (object-propertyObject ?x ?y))))))
  
  (proj/analyze "var x = {}; var y = {}; var z = { p : x, o : y };")
  (def objectX (first (l/run* [?varxObj]
                              (l/fresh [?varX ?ide]
                                       (pred/variabledeclaration-name ?varX "x")
                                       (pred/has "id" ?varX ?ide)
                                       (expression-object ?ide ?varxObj)))))
  (def objectY (first (l/run* [?varyObj]
                              (l/fresh [?varY ?ide]
                                       (pred/variabledeclaration-name ?varY "y")
                                       (pred/has "id" ?varY ?ide)
                                       (expression-object ?ide ?varyObj)))))
  (def objectZ (first (l/run* [?varzObj]
                              (l/fresh [?varZ ?ide]
                                       (pred/variabledeclaration-name ?varZ "z")
                                       (pred/has "id" ?varZ ?ide)
                                       (expression-object ?ide ?varzObj)))))
  (assert (= (list objectZ objectZ) (l/run* [?x] (l/fresh [?y] (object-propertyObject ?x ?y)))))

  (assert (= (list objectY objectX) (l/run* [?y] (l/fresh [?x] (object-propertyObject ?x ?y)))))

  (assert (= (list objectY objectX) (l/run* [?y] (object-propertyObject objectZ ?y))))

  (assert (= (list objectZ) (l/run* [?x] (object-propertyObject ?x objectX))))

  (assert (= 0 (count (l/run* [?y] (object-propertyObject objectX ?y)))))

  (assert (= 2 (count (l/run* [?y] (object-propertyObject objectZ ?y)))))


  ;;; MAYHAVEPROP TESTS
  ;;;;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = { y : 123 };")
  (def objectX (first (l/run* [?objs]
                              (l/fresh [?node ?ide]
                                       (pred/variabledeclaration-name ?node "x")
                                       (pred/has "id" ?node ?ide)
                                       (expression-object ?ide ?objs)))))
  (assert (= false (first (l/run* [?v] (l/== ?v (mayHaveProp objectX "x"))))))
  (assert (= true (first (l/run* [?v] (l/== ?v (mayHaveProp objectX "y"))))))
  
  (proj/analyze "var x = {}; x.y = 123;")
  (def newObjectX (first (l/run* [?objs]
                                 (l/fresh [?node ?ide]
                                          (pred/variabledeclaration-name ?node "x")
                                          (pred/has "id" ?node ?ide)
                                          (expression-object ?ide ?objs)))))
  (assert (= false (first (l/run* [?v] (l/== ?v (mayHaveProp newObjectX "x"))))))
  (assert (= true (first (l/run* [?v] (l/== ?v (mayHaveProp newObjectX "y"))))))
  
  
  ;;; function-return TESTS
  (proj/analyze "var x = function (y) { return y }; x(x);")
  (def functionX (first (l/run* [?funcXaddr]
                                (l/fresh [?funcX]
                                         (pred/functionexpression ?funcX)
                                         (expression-object ?funcX ?funcXaddr)))))
  (assert (= functionX (first (l/run* [?returnAddr]
                                      (function-return functionX ?returnAddr)))))
  (assert (= functionX (first (l/run* [?funcXaddr]
                                      	(function-return ?funcXaddr functionX)))))
  
  (proj/analyze "var z = {y : 5}; var x = function (y) { return y }; x(x); x(z);")
  (def x (first (l/run* [?funcXaddr]
                        (l/fresh [?funcX]
                                 (pred/functionexpression ?funcX)
                                 (expression-object ?funcX ?funcXaddr)))))
  (def z (first (l/run* [?Zaddr]
                        (l/fresh [?Z ?ide]
                                 (pred/variabledeclaration-name ?Z "z")
                                 (pred/has "id" ?Z ?ide)
                                 (expression-object ?ide ?Zaddr)))))
  (assert (= x (first (l/run* [?returnAddr]
                              (function-return x ?returnAddr)))))
  (assert (= z (second (l/run* [?returnAddr]
                               (function-return x ?returnAddr)))))
  (assert (= x (first (l/run* [?funcXaddr]
                              (function-return ?funcXaddr x)))))
  
  (proj/analyze "function x(y) { return y }; x(x); var w = function (z) { return z }; w(w);")
  (def returnAddresses (l/run* [?returnAddr] (l/fresh [?o] (function-return ?o ?returnAddr))))
  (def functiondeclarReturn (first returnAddresses))
  (def functionexprReturn (second returnAddresses))
  (assert (= returnAddresses (l/run* [?o] (l/fresh [?returnAddr] (function-return ?o ?returnAddr)))))
  
  (assert (= functionexprReturn (first (l/run* [?objs] 
                                               (l/fresh [?expr] 
                                                        (pred/functionexpression ?expr) 
                                                        (expression-object ?expr ?objs))))))
  
  (assert (= functiondeclarReturn (first (l/run* [?objs] 
                                                 (l/fresh [?expr ?ide] 
                                                          (pred/functiondeclaration ?expr) 
                                                          (pred/has "id" ?expr ?ide) 
                                                          (expression-object ?ide ?objs))))))

(assert (= (l/run* [?objs] 
                   (l/fresh [?expr] 
                            (pred/functionexpression ?expr) 
                            (expression-object ?expr ?objs)))
           (l/run* [?func] 
                   (l/fresh [?expr ?objs] 
                            (pred/functionexpression ?expr) 
                            (expression-object ?expr ?objs)
                            (function-return ?func ?objs)))))

(assert (= (l/run* [?objs] 
                   (l/fresh [?expr ?ide] 
                            (pred/functiondeclaration ?expr) 
                            (pred/has "id" ?expr ?ide) 
                            (expression-object ?ide ?objs)))
           (l/run* [?func] 
                   (l/fresh [?expr ?ide ?objs] 
                            (pred/functiondeclaration ?expr) 
                            (pred/has "id" ?expr ?ide) 
                            (expression-object ?ide ?objs)
                            (function-return ?func ?objs)))))

  
  ;;; ARG TESTS
  ;;;;;;;;;;;;;
  (proj/analyze "var x = function (y) { return y }; x(x);")
  (def x (first (l/run* [?objs]
                        (l/fresh [?node ?ide]
                                 (pred/variabledeclaration-name ?node "x")
                                 (pred/has "id" ?node ?ide)
                                 (expression-object ?ide ?objs)))))
  (assert (= x (first (l/run* [?argaddr]
                              (l/fresh [?funcX ?funcXaddr]
                                       (pred/functionexpression ?funcX)
                                       (expression-object ?funcX ?funcXaddr)
                                       (arg ?funcXaddr 1 ?argaddr))))))
  
  (assert (= x (first (l/run* [?func] (l/fresh [?i] (arg ?func ?i x))))))
  (assert (= 1 (first (l/run* [?i] (l/fresh [?func] (arg ?func ?i x))))))
  
  (proj/analyze "var x = function (y, z) { return y }; x(x,x);")
  (def x (first (l/run* [?objs]
                        (l/fresh [?node]
                                 (pred/functionexpression ?node)
                                 (expression-object ?node ?objs)))))
  (assert (= x (first (l/run* [?argaddr]
                              (arg x 1 ?argaddr)))))
  (assert (= x (first (l/run* [?argaddr]
                              (arg x 2 ?argaddr))))) 
  
  (assert (= 2 (count (l/run* [?func] (l/fresh [?i] (arg ?func ?i x))))))
  
  (assert (= '(1 2) (l/run* [?i] (l/fresh [?func] (arg ?func ?i x)))))
  
  (assert (= '(1 2) (l/run* [?i] (arg x ?i x))))

  (proj/analyze "var x = function (y, z) { return y }; x(x,x); function foo(y){return y}; foo(x)")

  (def x (first (l/run* [?objs]
                        (l/fresh [?node ?ide]
                                 (pred/variabledeclaration-name ?node "x")
                                 (pred/has "id" ?node ?ide)
                                 (expression-object ?ide ?objs)))))

(def foo (first (l/run* [?obj] 
                        (l/fresh [?node ?id] 
                                 (pred/functiondeclaration ?node) 
                                 (pred/has "id" ?node ?id) 
                                 (expression-object ?id ?obj)))))

  (assert (= (list x x x) (l/run* [?y] (l/fresh [?i ?x] (arg ?x ?i ?y)))))
  
  (assert (= (list 1 2 1) (l/run* [?i] (l/fresh [?y ?x] (arg ?x ?i ?y)))))

  (assert (= (list x x foo) (l/run* [?x] (l/fresh [?y ?i] (arg ?x ?i ?y)))))
  
  ;;; function-receiver TESTS
  ;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = function (y) { return y }; x(x);")
  (assert (= (l/run* [?gl] (globala ?gl))
             (l/run* [?receiveraddr]
                     (l/fresh [?funcaddr]
                              (function-receiver ?funcaddr ?receiveraddr)))))
  
  (proj/analyze "var x = { y : function (z) { return z }}; x.y(x);")
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node ?ide]
                                    (pred/variabledeclaration-name ?node "x")
                                    (pred/has "id" ?node ?ide)
                                    (expression-object ?ide ?objs)))))
  (def funcY (first (l/run* [?funcYaddr]
                            (l/fresh [?funcY]
                                     (pred/functionexpression ?funcY)
                                     (expression-object ?funcY ?funcYaddr)))))
  (assert (= varx (first (l/run* [?receiveraddr]
                                 (function-receiver funcY ?receiveraddr)))))
  
  (assert (= funcY (first (l/run* [?funcaddr]
                                  (function-receiver ?funcaddr varx)))))
  
  (proj/analyze "var x = { y : function (z) { return z }};")
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node ?ide]
                                    (pred/variabledeclaration-name ?node "x")
                                    (pred/has "id" ?node ?ide)
                                    (expression-object ?ide ?objs)))))
  (def funcY (first (l/run* [?funcYaddr]
                            (l/fresh [?funcY]
                                     (pred/functionexpression ?funcY)
                                     (expression-object ?funcY ?funcYaddr)))))
  (assert (= true (empty? (l/run* [?receiveraddr]
                                  (function-receiver funcY ?receiveraddr)))))
  
  (assert (= true (empty? (l/run* [?funcaddr]
                                  (function-receiver ?funcaddr varx)))))

  (proj/analyze "var x = { y : function (z) { return z }, a : function (b) {return b}}; x.y(x); x.a(x);")
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node ?ide]
                                    (pred/variabledeclaration-name ?node "x")
                                    (pred/has "id" ?node ?ide)
                                    (expression-object ?ide ?objs)))))
  (assert (= 2 (count (l/run* [?funcaddr]
                              (function-receiver ?funcaddr varx)))))
  (def funcs (l/run* [?funcYaddr]
                            (l/fresh [?funcY]
                                     (pred/functionexpression ?funcY)
                                     (expression-object ?funcY ?funcYaddr))))
  (def funcY (first funcs))
  (def funcA (second funcs))
  (assert (= funcY (first (l/run* [?funcaddr]
                              (function-receiver ?funcaddr varx)))))
  (assert (= funcA (second (l/run* [?funcaddr]
                              (function-receiver ?funcaddr varx)))))

    (proj/analyze "function x (y) { return y }; x(x);")
  (assert (= (l/run* [?gl] (globala ?gl))
             (l/run* [?receiveraddr]
                     (l/fresh [?funcaddr]
                              (function-receiver ?funcaddr ?receiveraddr)))))
   
  (println "  Analysis predicates unit tests ended.")
  )