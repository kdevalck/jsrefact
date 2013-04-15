(ns jsrefact.tests.analysistest
  (:use-macros [cljs.core.logic.macros :only [run*]])
  (:require-macros [cljs.core.logic.macros :as l])
  (:use [jsrefact.analysis :only [jsanalysis globala ast-scope oaddress-protoaddress expression-address
                                  object-propertyObject mayHaveProp functionaddress-returnaddress 
                                  functionaddress-i-argumentaddress functionaddress-receiveraddress oaddress-pname-paddress
                                  oaddress-pname-pstring-paddress address-ovalue address-fvalue address-value
                                  oaddress-protoaddress+ oaddress-pname-pstring-paddress+]])
  (:require 
    [jsrefact.predicates :as pred]
    [jsrefact.project :as proj])
  )
 

(defn run []
  (println "  Analysis predicates unit tests started.")
 
  ;;; analysis TESTS
  ;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = 42")
  (assert (= (proj/jsa) (first (l/run* [?p] (jsanalysis ?p)))))
  (assert (= (.-globala (proj/jsa)) (first (l/run* [?gl] (globala ?gl)))))


  ;;; expression-address TEST
  ;;;;;;;;;;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = function () {};")
  (assert (= 1 (count (l/run* [?ad] 
                              (l/fresh [?x]
                                       (pred/functionexpression ?x)
                                       (expression-address ?x ?ad))))))
  (assert (= (first (l/run* [?ad] (l/fresh [?x] (expression-address ?x ?ad))))
             (first (l/run* [?ad] 
                     (l/fresh [?x]
                              (pred/functionexpression ?x)
                              (expression-address ?x ?ad))))))

  (proj/analyze "var x = {}; var y = {}; var z = { p : x, o : y };")
  (assert (= 3 (count (l/run* [?x] (l/fresh [?n] (expression-address ?x ?n))))))
  (assert (= (first (l/run* [?varxObj] 
                     (l/fresh [?varX ?ide]
                              (pred/variabledeclaration-name ?varX "x")
                              (pred/has "id" ?varX ?ide)
                              (expression-address ?ide ?varxObj))))
             (first (l/run* [?n] (l/fresh [?x] (expression-address ?x ?n))))))

  (proj/analyze "function F() {}; var f = new F();")
  (assert (= 3 (count (l/run* [?x] (l/fresh [?n] (expression-address ?x ?n))))));-
  (def addresses (l/run* [?n] (l/fresh [?x] (expression-address ?x ?n))))
  (assert (last addresses) (second addresses))

 
  ;;; address-value TESTS
  ;;;;;;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = {};")
  (def varX (first  (l/run* [?varxObj] 
                     (l/fresh [?varX ?ide]
                              (pred/variabledeclaration-name ?varX "x")
                              (pred/has "id" ?varX ?ide)
                              (expression-address ?ide ?varxObj)))))
  (assert (= varX (first (l/run* [?x] (l/fresh [?y] (address-value ?x ?y))))))

  ;;; address-ovalue TESTS
  ;;;;;;;;;;;;;;;;;;;;;;;;
  (assert (= varX (first (l/run* [?x] (l/fresh [?y] (address-ovalue ?x ?y))))))

  ;;; address-fvalue TEST
  ;;;;;;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = {}; function z(){}")
  (def varX (first  (l/run* [?varxObj] 
                     (l/fresh [?varX ?ide]
                              (pred/variabledeclaration-name ?varX "x")
                              (pred/has "id" ?varX ?ide)
                              (expression-address ?ide ?varxObj)))))
  (assert (= (list) (l/run* [?x] (address-fvalue varX ?x))))


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
  
  (proj/analyze "function add1(n){return n+1}; add1(5);")
  (def funcdecl (first (l/run* [?func] (pred/functiondeclaration ?func))))

  (def aScope (first (l/run* [?sc] (ast-scope funcdecl ?sc))))

  (assert (= (list funcdecl) (l/run* [?f] (ast-scope ?f aScope))))

  (proj/analyze "var x = 5; function a(){return x}; a(); var b = function(){return x}; b();")
  (def funcdecl (first (l/run* [?func] (pred/functiondeclaration ?func))))
  (def funcexp (first (l/run* [?func] (pred/functionexpression ?func))))

  (assert (= 2 (count (l/run* [?scope] (l/fresh [?func] (ast-scope ?func ?scope))))))
  
  (assert (= (list funcdecl funcexp) (l/run* [?f] (l/fresh [?s] (ast-scope ?f ?s)))))
  

  ;;; oaddress-protoaddress TESTS
  ;;;;;;;;;;;;;;;
  (proj/analyze "function F() {}; var f = new F();")
  (def protoAddr (first (l/run* [?protoaddr]
                                (l/fresh [?varf ?varfObj]
                                         (pred/newexpression ?varf)
                                         (expression-address ?varf ?varfObj)
                                         (oaddress-protoaddress ?varfObj ?protoaddr)))))
  (assert (= protoAddr (first (l/run* [?protoaddr]
                                      (l/fresh [?varf ?varfObj ?ide]
                                               (pred/variabledeclaration-name ?varf "f")
                                               (pred/has "id" ?varf ?ide)
                                               (expression-address ?ide ?varfObj)
                                               (oaddress-protoaddress ?varfObj ?protoaddr))))));-
  (def newFAddress (first (l/run* [?varfObj]
                                  (l/fresh [?varf]
                                           (pred/newexpression ?varf)
                                           (expression-address ?varf ?varfObj)))))
  (assert (= newFAddress (first (l/run* [?objectAddr] (oaddress-protoaddress ?objectAddr protoAddr)))))
  
  (proj/analyze "function F() {}; F.prototype = 123; var f = new F();")
  (assert (= () (l/run* [?protoaddr]
                        (l/fresh [?varf ?varfObj]
                                 (pred/newexpression ?varf)
                                 (expression-address ?varf ?varfObj)
                                 (oaddress-protoaddress ?varfObj ?protoaddr)))))
  

  ;;; oaddress-protoaddress+ TESTS
  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  (proj/analyze "function F() {}; var f = new F();")
  (def varF (first (l/run* [?varxObj] 
                           (l/fresh [?varX ?ide]
                                    (pred/variabledeclaration-name ?varX "f")
                                    (pred/has "id" ?varX ?ide)
                                    (expression-address ?ide ?varxObj)))))
  (def protos (first (l/run* [?protos] (oaddress-protoaddress+ varF ?protos))))
  (def protoF (first (l/run* [?proto] (oaddress-protoaddress varF ?proto))))

  (assert (= 3 (count protos)))

  (assert (= (second protos) protoF))

  (assert (= (nth protos 2) (first (l/run* [?proto] (oaddress-protoaddress protoF ?proto)))))

  
  ;;; oaddress-pname-paddress & oaddress-pname-pstring-paddress TESTS
  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = {}; var z = { p : x };")
  (def objectX (first (l/run* [?varxObj]
                              (l/fresh [?varX ?ide]
                                       (pred/variabledeclaration-name ?varX "x")
                                       (pred/has "id" ?varX ?ide)
                                       (expression-address ?ide ?varxObj)))))
  (assert (= objectX (first (l/run* [?prop]
                                    (l/fresh [?varZ ?varzObj ?ide ?pname]
                                             (pred/variabledeclaration-name ?varZ "z")
                                             (pred/has "id" ?varZ ?ide)
                                             (expression-address ?ide ?varzObj)
                                             (oaddress-pname-paddress ?varzObj ?pname ?prop))))))
  (def objectZ (first (l/run* [?varzObj]
                              (l/fresh [?varZ ?ide]
                                       (pred/variabledeclaration-name ?varZ "z")
                                       (pred/has "id" ?varZ ?ide)
                                       (expression-address ?ide ?varzObj)))))
  (assert (= objectZ (first (l/run* [?varzObj]
                                    (l/fresh [?pname] 
                                      (oaddress-pname-paddress ?varzObj ?pname objectX))))))
  
  (assert (= objectZ (first (l/run* [?x] (l/fresh [?y ?z] (oaddress-pname-paddress ?x ?y ?z))))))

  (assert (= objectX (first (l/run* [?y] (l/fresh [?x ?z] (oaddress-pname-paddress ?x ?z ?y))))))
  
  (proj/analyze "var x = {}; var y = {}; var z = { p : x, o : y };")
  (def objectX (first (l/run* [?varxObj]
                              (l/fresh [?varX ?ide]
                                       (pred/variabledeclaration-name ?varX "x")
                                       (pred/has "id" ?varX ?ide)
                                       (expression-address ?ide ?varxObj)))))
  (def objectY (first (l/run* [?varyObj]
                              (l/fresh [?varY ?ide]
                                       (pred/variabledeclaration-name ?varY "y")
                                       (pred/has "id" ?varY ?ide)
                                       (expression-address ?ide ?varyObj)))))
  (def objectZ (first (l/run* [?varzObj]
                              (l/fresh [?varZ ?ide]
                                       (pred/variabledeclaration-name ?varZ "z")
                                       (pred/has "id" ?varZ ?ide)
                                       (expression-address ?ide ?varzObj)))))
  (assert (= objectZ (first (l/run* [?x] (l/fresh [?y ?z] (oaddress-pname-paddress ?x ?z ?y))))))

  (assert (= objectY (first (l/run* [?y] (l/fresh [?x ?z] (oaddress-pname-paddress ?x ?z ?y))))))

  (assert (= (list objectY objectX) (l/run* [?y] (l/fresh [?z] (oaddress-pname-paddress objectZ ?z ?y)))))

  (assert (= (list objectZ) (l/run* [?x] (l/fresh [?z] (oaddress-pname-paddress ?x ?z objectX)))))

  (assert (= 0 (count (l/run* [?y] (l/fresh [?z] (oaddress-pname-paddress objectX ?z ?y))))))

  (assert (= 2 (count (l/run* [?y] (l/fresh [?z] (oaddress-pname-paddress objectZ ?z ?y))))))

  (assert (= (list objectX) (l/run* [?y] (l/fresh [?z ?x] (oaddress-pname-pstring-paddress ?x ?z "p" ?y)))))

  (assert (= (list objectY) (l/run* [?y] (l/fresh [?z ?x] (oaddress-pname-pstring-paddress ?x ?z "o" ?y)))))

  (assert (= true (empty? (l/run* [?y] (l/fresh [?z ?x] (oaddress-pname-pstring-paddress ?x ?z "nothere" ?y))))))


  ;;; oaddress-pname-pstring-paddress+ TESTS
  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  (proj/analyze "var x = {}; function F() {this.z = x}; var f = new F(); F.prototype.w = x")
  (def newF (first (l/run* [?x] (l/fresh [?y] (pred/newexpression ?y) (expression-address ?y ?x)))))
  (def varX (first (l/run* [?xaddr]
                        (l/fresh [?x ?ide]
                                 (pred/variabledeclaration-name ?x "x")
                                 (pred/has "id" ?x ?ide)
                                 (expression-address ?ide ?xaddr)))))
  (assert (= varX (first (l/run* [?z] (l/fresh [?x] (oaddress-pname-pstring-paddress+ newF ?x "z" ?z))))));-

  (assert (= varX (first (l/run* [?z] (l/fresh [?x] (oaddress-pname-pstring-paddress+ newF ?x "w" ?z))))));-

  (assert (empty? (l/run* [?z] (l/fresh [?x] (oaddress-pname-pstring-paddress+ newF ?x "q" ?z)))))

  (assert (= "z" (first (l/run* [?y] (l/fresh [?x ?z] (oaddress-pname-pstring-paddress+ newF ?x ?y ?z))))));-

  (assert (= "w" (second (l/run* [?y] (l/fresh [?x ?z] (oaddress-pname-pstring-paddress+ newF ?x ?y ?z))))));-


  ;;; functionaddress-returnaddress TESTS
  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = function (y) { return y }; x(x);")
  (def functionX (first (l/run* [?funcXaddr]
                                (l/fresh [?funcX]
                                         (pred/functionexpression ?funcX)
                                         (expression-address ?funcX ?funcXaddr)))))
  (assert (= functionX (first (l/run* [?returnAddr]
                                      (functionaddress-returnaddress functionX ?returnAddr)))))
  (assert (= functionX (first (l/run* [?funcXaddr]
                                      	(functionaddress-returnaddress ?funcXaddr functionX)))))
  
  (proj/analyze "var z = {y : 5}; var x = function (y) { return y }; x(x); x(z);")
  (def x (first (l/run* [?funcXaddr]
                        (l/fresh [?funcX]
                                 (pred/functionexpression ?funcX)
                                 (expression-address ?funcX ?funcXaddr)))))
  (def z (first (l/run* [?Zaddr]
                        (l/fresh [?Z ?ide]
                                 (pred/variabledeclaration-name ?Z "z")
                                 (pred/has "id" ?Z ?ide)
                                 (expression-address ?ide ?Zaddr)))))
  (assert (= x (first (l/run* [?returnAddr]
                              (functionaddress-returnaddress x ?returnAddr)))))
  (assert (= z (second (l/run* [?returnAddr]
                               (functionaddress-returnaddress x ?returnAddr)))))
  (assert (= x (first (l/run* [?funcXaddr]
                              (functionaddress-returnaddress ?funcXaddr x)))))
  
  (proj/analyze "function x(y) { return y }; x(x); var w = function (z) { return z }; w(w);")
  (def returnAddresses (l/run* [?returnAddr] (l/fresh [?o] (functionaddress-returnaddress ?o ?returnAddr))))
  (def functiondeclarReturn (first returnAddresses))
  (def functionexprReturn (second returnAddresses))
  (assert (= returnAddresses (l/run* [?o] (l/fresh [?returnAddr] (functionaddress-returnaddress ?o ?returnAddr)))))
  
  (assert (= functionexprReturn (first (l/run* [?objs] 
                                               (l/fresh [?expr] 
                                                        (pred/functionexpression ?expr) 
                                                        (expression-address ?expr ?objs))))));-
  
  (assert (= functiondeclarReturn (first (l/run* [?objs] 
                                                 (l/fresh [?expr ?ide] 
                                                          (pred/functiondeclaration ?expr) 
                                                          (pred/has "id" ?expr ?ide) 
                                                          (expression-address ?ide ?objs))))));-

(assert (= (l/run* [?objs] 
                   (l/fresh [?expr] 
                            (pred/functionexpression ?expr) 
                            (expression-address ?expr ?objs)))
           (l/run* [?func] 
                   (l/fresh [?expr ?objs] 
                            (pred/functionexpression ?expr) 
                            (expression-address ?expr ?objs)
                            (functionaddress-returnaddress ?func ?objs)))))

(assert (= (l/run* [?objs] 
                   (l/fresh [?expr ?ide] 
                            (pred/functiondeclaration ?expr) 
                            (pred/has "id" ?expr ?ide) 
                            (expression-address ?ide ?objs)))
           (l/run* [?func] 
                   (l/fresh [?expr ?ide ?objs] 
                            (pred/functiondeclaration ?expr) 
                            (pred/has "id" ?expr ?ide) 
                            (expression-address ?ide ?objs)
                            (functionaddress-returnaddress ?func ?objs)))))


  ;;; functionaddress-i-argumentaddress TESTS
  ;;;;;;;;;;;;;
  (proj/analyze "var x = function (y) { return y }; x(x);")
  (def x (first (l/run* [?objs]
                        (l/fresh [?node ?ide]
                                 (pred/variabledeclaration-name ?node "x")
                                 (pred/has "id" ?node ?ide)
                                 (expression-address ?ide ?objs)))))
  (assert (= x (first (l/run* [?argaddr]
                              (l/fresh [?funcX ?funcXaddr]
                                       (pred/functionexpression ?funcX)
                                       (expression-address ?funcX ?funcXaddr)
                                       (functionaddress-i-argumentaddress ?funcXaddr 1 ?argaddr))))))
  
  (assert (= x (first (l/run* [?func] (l/fresh [?i] (functionaddress-i-argumentaddress ?func ?i x))))))
  (assert (= 1 (first (l/run* [?i] (l/fresh [?func] (functionaddress-i-argumentaddress ?func ?i x))))))

  (proj/analyze "var x = function (y, z) { return y }; x(x,x);")
  (def x (first (l/run* [?objs]
                        (l/fresh [?node]
                                 (pred/functionexpression ?node)
                                 (expression-address ?node ?objs)))))
  (assert (= x (first (l/run* [?argaddr]
                              (functionaddress-i-argumentaddress x 1 ?argaddr)))))
  (assert (= x (first (l/run* [?argaddr]
                              (functionaddress-i-argumentaddress x 2 ?argaddr))))) 
  
  (assert (= 2 (count (l/run* [?func] (l/fresh [?i] (functionaddress-i-argumentaddress ?func ?i x))))))
  
  (assert (= '(1 2) (l/run* [?i] (l/fresh [?func] (functionaddress-i-argumentaddress ?func ?i x)))))
  
  (assert (= '(1 2) (l/run* [?i] (functionaddress-i-argumentaddress x ?i x))))

  (proj/analyze "var x = function (y, z) { return y }; x(x,x); function foo(y){return y}; foo(x)")

  (def x (first (l/run* [?objs]
                        (l/fresh [?node ?ide]
                                 (pred/variabledeclaration-name ?node "x")
                                 (pred/has "id" ?node ?ide)
                                 (expression-address ?ide ?objs)))))

(def foo (first (l/run* [?obj] 
                        (l/fresh [?node ?id] 
                                 (pred/functiondeclaration ?node) 
                                 (pred/has "id" ?node ?id) 
                                 (expression-address ?id ?obj)))))

  (assert (= (list x x x) (l/run* [?y] (l/fresh [?i ?x] (functionaddress-i-argumentaddress ?x ?i ?y)))));-

  (assert (= (list 1 1 2) (l/run* [?i] (l/fresh [?y ?x] (functionaddress-i-argumentaddress ?x ?i ?y)))));-

  (assert (= (list foo x x) (l/run* [?x] (l/fresh [?y ?i] (functionaddress-i-argumentaddress ?x ?i ?y)))));-
  

  ;;; functionaddress-receiveraddress TESTS
  ;;;;;;;;;;;;;;;;;;
  (proj/analyze "var x = function (y) { return y }; x(x);")
  (assert (= (l/run* [?gl] (globala ?gl))
             (l/run* [?receiveraddr]
                     (l/fresh [?funcaddr]
                              (functionaddress-receiveraddress ?funcaddr ?receiveraddr)))))
  
  (proj/analyze "var x = { y : function (z) { return z }}; x.y(x);")
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node ?ide]
                                    (pred/variabledeclaration-name ?node "x")
                                    (pred/has "id" ?node ?ide)
                                    (expression-address ?ide ?objs)))))
  (def funcY (first (l/run* [?funcYaddr]
                            (l/fresh [?funcY]
                                     (pred/functionexpression ?funcY)
                                     (expression-address ?funcY ?funcYaddr)))))
  (assert (= varx (first (l/run* [?receiveraddr]
                                 (functionaddress-receiveraddress funcY ?receiveraddr)))))
  
  (assert (= funcY (first (l/run* [?funcaddr]
                                  (functionaddress-receiveraddress ?funcaddr varx)))))
  
  (proj/analyze "var x = { y : function (z) { return z }};")
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node ?ide]
                                    (pred/variabledeclaration-name ?node "x")
                                    (pred/has "id" ?node ?ide)
                                    (expression-address ?ide ?objs)))))
  (def funcY (first (l/run* [?funcYaddr]
                            (l/fresh [?funcY]
                                     (pred/functionexpression ?funcY)
                                     (expression-address ?funcY ?funcYaddr)))))
  (assert (= true (empty? (l/run* [?receiveraddr]
                                  (functionaddress-receiveraddress funcY ?receiveraddr)))))
  
  (assert (= true (empty? (l/run* [?funcaddr]
                                  (functionaddress-receiveraddress ?funcaddr varx)))))

  (proj/analyze "var x = { y : function (z) { return z }, a : function (b) {return b}}; x.y(x); x.a(x);")
  (def varx (first (l/run* [?objs]
                           (l/fresh [?node ?ide]
                                    (pred/variabledeclaration-name ?node "x")
                                    (pred/has "id" ?node ?ide)
                                    (expression-address ?ide ?objs)))))
  (assert (= 2 (count (l/run* [?funcaddr]
                              (functionaddress-receiveraddress ?funcaddr varx)))))
  (def funcs (l/run* [?funcYaddr]
                            (l/fresh [?funcY]
                                     (pred/functionexpression ?funcY)
                                     (expression-address ?funcY ?funcYaddr))))
  (def funcY (first funcs))
  (def funcA (second funcs))
  (assert (= funcY (first (l/run* [?funcaddr]
                              (functionaddress-receiveraddress ?funcaddr varx)))))
  (assert (= funcA (second (l/run* [?funcaddr]
                              (functionaddress-receiveraddress ?funcaddr varx)))))

    (proj/analyze "function x (y) { return y }; x(x);")
  (assert (= (l/run* [?gl] (globala ?gl))
             (l/run* [?receiveraddr]
                     (l/fresh [?funcaddr]
                              (functionaddress-receiveraddress ?funcaddr ?receiveraddr)))))
   
  (println "  Analysis predicates unit tests ended.")
  )