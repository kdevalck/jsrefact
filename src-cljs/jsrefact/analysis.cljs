(ns jsrefact.analysis
  ^{:doc "Logic layer above JIPDA Javascript analysis
            This queries is mainly based on the paper: Tool-supported
            Refactogin for Javascript by Asger Feldthaus."}
  (:use [esp :only [esprima parse]]
    [cljs.core.logic :only [membero lvaro nonlvaro conda conso]])
  (:require-macros [cljs.core.logic.macros :as l])
  (:require 
            [common :as comm]
            [lattice :as lat]
            [toplattice :as tlat]
            [setlattice :as slat]
            [cplattice :as clat]
            [jiaddress :as addr]
            [timedefa :as tdefa]
            [tagag :as tag]
            [concreteag :as conc]
            [benv.defaultBenv :as defb]
            [jistate :as sta]
            [jipdaast :as as]
            [visited :as vis]
            [concreteprinter :as concp]
            [jipda :as ji]
            [depend :as dep]
            [transform :as tra]
            [jijsanalysis :as jijsa]
            [jsrefact.predicates :as pred]
            ))


(def jsa (atom (new js/JsAnalysis @pred/parsed)))

(defn
  doAnalysis
  "Do the javascript analysis using JIPDA and put in atom jsa"
  []
  (def tempAnalysis (new js/JsAnalysis @pred/parsed))
  (swap! jsa (fn [analysis] tempAnalysis)))

(defn
  jsanalysis
  "Reifies ?jsan with the Javascript analysis object"
  [?jsan]
  (l/== ?jsan @jsa))
; TODO : move to unit tests
;pred/js-print (first (l/run* [?p] (jsanalysis ?p))))


(defn
  objects
  "Reification of the relation between an expression ?node and 
  the set of objects ?objects it can evaluate to"
  ; can only receive newexpressions and functionexpressions
  [?node ?objects]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/project [?node ?jsan]
                      (membero ?objects (seq (.objects ?jsan ?node))))))

; wip
(defn
  objectss
  "test"
  [?node ?objects]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/conda
             [(l/lvaro ?node)
              ;TODO
              ]
             [(l/lvaro ?objects)
              (l/project [?node ?jsan]
                         (membero ?objects (seq (.objects ?jsan ?node))))]
             )))

(defn
  scope
  "Reification of the relation between a functionExpression ?node
  and its scope ?scope"

  ;TODO : only works with functionExpressions not yet with functiondeclarations

  [?node ?scope]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/conda 
             [(l/lvaro ?node)
              (l/fresh [?func]
                       (pred/functionexpression ?func)
                       (l/project [?func ?jsan]
                                  (membero ?scope (seq (.scope ?jsan ?func))))
                       (l/== ?node ?func))
              ]
             [(l/lvaro ?scope)
              (l/project [?node ?jsan]
                         (membero ?scope (seq (.scope ?jsan ?node))))]
             )))


(defn
  proto
  "The reification of the relation between any object ?objectaddr 
  and its possible prototype objects, ?protoaddr, of the objects ?objectaddr can
  represent at runtime.
  
  param ?objectaddr is an address representing an object."
  [?objectaddr ?protoaddr]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/conda 
             [(l/lvaro ?objectaddr)
              (l/fresh [?anObject]
                       (l/project [?jsan] (membero ?anObject (seq (.allObjects ?jsan)))
                                  (l/project [?anObject]
                                             (membero ?protoaddr (seq (.proto ?jsan ?anObject)))
                                             (l/== ?objectaddr ?anObject))))]
             [(l/lvaro ?protoaddr)
              (l/project [?jsan ?objectaddr]
                         (membero ?protoaddr (seq (.proto ?jsan ?objectaddr))))])
           ))

(defn
    props
    "Refication of the relation between any object ?obj and
     the set of objects, ?props, that could be stored in the
     properties of object ?obj.

     param ?obj is an address representing an object
     param ?prop is an address representing a property of ?obj"
    [?obj ?prop]
    (l/fresh [?jsan]
        (jsanalysis ?jsan)
        (l/project [?jsan]
              (membero ?obj (rest (seq (.allObjects ?jsan))))
              ; use rest to remove globala from list of objects.
              (l/project [?obj]
                (membero ?prop (seq (.props ?jsan ?obj))))))
        )

(defn
    mayHaveProp
    "Non relational

    param prop is a property (string)
    param obj is an address pointing to an object"
    [obj prop]
    (.mayHaveProp @jsa obj prop))

(defn
  arg
  "param ?objectaddr is an address of a functionexpression
  param ?i is the i-th argument passed to the object
  (or i = 0 the receiver)
  param ?argadd is the set of objects that may be passed as
  ith argument to the object from ?objectaddr, or is the
  receiver if i = 0."
  [?objectaddr ?i ?argaddr]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/conda 
             [(l/lvaro ?i)
              (l/fresh [?func ?funcAddr ?argLength ?argNumb]
                (pred/functionexpression ?func)
                (objects ?func ?funcAddr)
                (l/project [?func] (l/== ?argLength (.-length (.-params ?func))))
                (l/project [?argLength] (membero ?argNumb (range 1 (+ ?argLength 1))))
                (l/project [?jsan ?funcAddr ?argNumb] (membero ?argaddr (seq (.arg ?jsan ?funcAddr ?argNumb))))
                (l/== ?objectaddr ?funcAddr)
                (l/== ?i ?argNumb)
                )
              ]
             [(l/lvaro ?argaddr)
              (l/project [?jsan ?objectaddr ?i]
                         (membero ?argaddr (seq (.arg ?jsan ?objectaddr ?i))))])))

(defn
  receiver
  ""
  [?objectaddr ?receiveraddr]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/conda
             [(l/lvaro ?objectaddr)
              (l/fresh [?func ?funcAddr]
                       (pred/functionexpression ?func)
                       (objects ?func ?funcAddr)
                       (l/project [?jsan ?funcAddr]
                          (membero ?receiveraddr (seq (.arg ?jsan ?funcAddr 0)))
                          (l/== ?objectaddr ?funcAddr)))
              ]
             [(l/lvaro ?receiveraddr)
              (l/project [?jsan ?objectaddr]
                         (membero ?receiveraddr (seq (.arg ?jsan ?objectaddr 0))))
              ])))

(defn
  ret
  "param ?objectaddr is an address which points to a function
  param ?return is an object that may be returned as result from
  the function. 
  "
  [?objectaddr ?return]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/conda 
             [(l/lvaro ?return)
              (l/project [?jsan ?objectaddr]
                         (membero ?return (seq (.ret ?jsan ?objectaddr))))]
             [(l/lvaro ?objectaddr)
              (l/fresh [?func ?funcAddr]
                       (pred/functionexpression ?func)
                       (objects ?func ?funcAddr)
                       (l/project [?func ?jsan ?funcAddr]
                                  (membero ?return (seq (.ret ?jsan ?funcAddr)))
                                  (l/== ?objectaddr ?funcAddr)
                                  ))]
             )))




;;; TESTS
;; TODO: move tests in separate file


; test1
; (def src "var x = 1; x = 2;")
; (def parsedast (js/createAst src))
; (def jsa (new js/JsAnalysis parsedast))
; (def varx (.toNode (.varsWithName (js/$$$ parsedast) "x")))
; (def valx (.value jsa varx))
; (pred/js-print varx)
; (pred/js-print valx)


; test 2
; (def src1 "var x = { foo: 42 };")
; (def parsedast1 (js/createAst src1))
; (def jsa1 (new js/JsAnalysis parsedast1))
; (def varx1 (.toNode (.varsWithName (js/$$$ parsedast1) "x")))
; (def objectadr (.objects jsa1 varx1))
; (def fir (first objectadr))
; (def obj (.lookup jsa1 fir))
; (pred/js-print varx1)
; (pred/js-print objectadr)
; (pred/js-print fir)
; (pred/js-print obj)

;;; OBJECTS TESTS
(pred/parseCode "var x = { foo: 42 };")
(doAnalysis)
(l/run* [?objs]
        (l/fresh [?node]
                 (pred/ast-variabledeclarationwithname ?node "x")
                 (objects ?node ?objs)))
(.isObject (.lookup @jsa (first (l/run* [?objs]
                                                 (l/fresh [?node]
                                                          (pred/ast-name ?node "x")
                                                          (objects ?node ?objs))))))
(l/run* [?node] (pred/ast-name ?node "x"))


;;; SCOPE TESTS
(pred/parseCode "var x = function () {}; x();")
(doAnalysis)
(l/run* [?scope]
  (l/fresh [?func]
    (pred/functionexpression ?func)
    (scope ?func ?scope)))
(def aScope (first (l/run* [?scope]
  (l/fresh [?func]
    (pred/functionexpression ?func)
    (scope ?func ?scope)))))
(l/run* [?func]
    (scope ?func aScope)) ;equals function () {}
(.-globala @jsa) ;global address

(pred/parseCode "function add1(n){return n+1};")
(doAnalysis)
; TODO does not work with functiondeclarations yet.

; test 3
; (def src2 "var x = function () {}; x();")
; (def parsedast2 (js/createAst src2))
; (def jsa2 (new js/JsAnalysis parsedast2))
; (def func (.toNode (.functionExpressions (js/$$$ parsedast2))))
; (def scopeadrs (.scope jsa2 func))
; (def scopeadr (first scopeadrs))
; (pred/js-print jsa2)
; (pred/js-print func)
; (pred/js-print scopeadr)
; (pred/js-print (.-globala jsa2))

;;; PROTO TEST
(pred/parseCode "function F() {}; var f = new F();")
(doAnalysis)
(l/run* [?protoaddr]
  (l/fresh [?varf ?varfObj]
    (pred/ast-variabledeclarationwithname ?varf "f")
    (objects ?varf ?varfObj)
    (proto ?varfObj ?protoaddr)))
(def protoAddr (first (l/run* [?protoaddr]
  (l/fresh [?varf ?varfObj]
    (pred/newexpression ?varf)
    (objects ?varf ?varfObj)
    (proto ?varfObj ?protoaddr)))))
(l/run* [?objectAddr] (proto ?objectAddr protoAddr))
; above same as underneath
(l/run* [?varfObj]
  (l/fresh [?varf]
    (pred/newexpression ?varf)
    (objects ?varf ?varfObj)))


(pred/parseCode "function F() {}; F.prototype = 123; var f = new F();")
(doAnalysis)
(l/run* [?protoaddr]
  (l/fresh [?varf ?varfObj]
    (pred/newexpression ?varf)
    (objects ?varf ?varfObj)
    (proto ?varfObj ?protoaddr))) ;should be empty

; (def src1 "function F() {}; var f = new F();")
; (def parsedast1 (js/createAst src1))
; (def jsa1 (new js/JsAnalysis parsedast1))
; (def newx (.toNode (.varsWithName (js/$$$ parsedast1) "f")))
; (def objectadrs (.objects jsa1 newx))
; (def fir (first objectadrs))
; (def protoaddr (.proto jsa1 fir))
; (pred/js-print newx)
; (pred/js-print objectadrs)
; (pred/js-print fir)
; (pred/js-print protoaddr)

;;; PROPS TESTS
(pred/parseCode "var x = { y : 123 }; var z = { p : x };")
(doAnalysis)
(l/run* [?props]
  (l/fresh [?varZ ?varzObj]
    (pred/ast-variabledeclarationwithname ?varZ "z")
    (objects ?varZ ?varzObj)
    (props ?varzObj ?props)
    ))
(l/run* [?varxObj]
  (l/fresh [?varX]
    (pred/ast-variabledeclarationwithname ?varX "x")
    (objects ?varX ?varxObj)))
(def varX (first (l/run* [?varxObj]
  (l/fresh [?varX]
    (pred/ast-variabledeclarationwithname ?varX "x")
    (objects ?varX ?varxObj)))))
(l/run* [?varzObj]
    (props ?varzObj varX))
(l/run* [?varzObj]
  (l/fresh [?varZ]
    (pred/ast-variabledeclarationwithname ?varZ "z")
    (objects ?varZ ?varzObj)))


;;; MAYHAVEPROP TESTS
(pred/parseCode "var x = { y : 123 };")
(doAnalysis)
(l/run* [?v]
        (l/fresh [?node ?objs]
                 (pred/ast-variabledeclarationwithname ?node "x")
                 (objects ?node ?objs)
                 (l/project [?objs]
                  (l/== ?v (mayHaveProp ?objs "x")))
                 ))
(pred/parseCode "var x = {}; x.y = 123;")
(doAnalysis)

;;; RET TESTS
(pred/parseCode "var x = function (y) { return y }; x(x);")
(doAnalysis)
(l/run* [?returnAddr]
  (l/fresh [?funcX ?funcXaddr]
    (pred/functionexpression ?funcX)
    (objects ?funcX ?funcXaddr)
    (ret ?funcXaddr ?returnAddr)))
(def functionX (first (l/run* [?funcXaddr]
  (l/fresh [?funcX]
    (pred/functionexpression ?funcX)
    (objects ?funcX ?funcXaddr)))))
(l/run* [?funcXaddr]
    (ret ?funcXaddr functionX))
(pred/parseCode "var z = {y : 5}; var x = function (y) { return y }; x(x); x(z);")
(doAnalysis)
(def x (first (l/run* [?funcXaddr]
  (l/fresh [?funcX]
    (pred/functionexpression ?funcX)
    (objects ?funcX ?funcXaddr)))))
(def z (second (l/run* [?returnAddr]
  (l/fresh [?funcX ?funcXaddr]
    (pred/functionexpression ?funcX)
    (objects ?funcX ?funcXaddr)
    (ret ?funcXaddr ?returnAddr)))))
(l/run* [?funcXaddr]
        (ret ?funcXaddr z)) ; ==> should return x as result
; TODO: test uitbreiden

; (def src1 "var x = function (y) { return y }; x(x);")
; (def parsedast1 (js/createAst src1))
; (def jsa1 (new js/JsAnalysis parsedast1))
; (def newx (.toNode (.varsWithName (js/$$$ parsedast1) "x")))
; (def func (.toNode (.functionExpressions (js/$$$ parsedast1))))
; (def objectadrs (.objects jsa1 newx))
; (def fir (first objectadrs))
; (def retur (.ret jsa1 fir))

;;; ARG TESTS
(pred/parseCode "var x = function (y) { return y }; x(x);")
(doAnalysis)
(l/run* [?argaddr]
        (l/fresh [?funcX ?funcXaddr]
                 (pred/functionexpression ?funcX)
                 (objects ?funcX ?funcXaddr)
                 (arg ?funcXaddr 1 ?argaddr)))
(def arg1 (first (l/run* [?objs]
        (l/fresh [?node]
                 (pred/ast-variabledeclarationwithname ?node "x")
                 (objects ?node ?objs)))))
(l/run* [?func] (l/fresh [?i] (arg ?func ?i arg1)))
(pred/parseCode "var x = function (y, z) { return y }; x(x,x);")
(doAnalysis)
(l/run* [?argaddr]
        (l/fresh [?funcX ?funcXaddr]
                 (pred/functionexpression ?funcX)
                 (objects ?funcX ?funcXaddr)
                 (arg ?funcXaddr 1 ?argaddr)))
(l/run* [?argaddr]
        (l/fresh [?funcX ?funcXaddr]
                 (pred/functionexpression ?funcX)
                 (objects ?funcX ?funcXaddr)
                 (arg ?funcXaddr 2 ?argaddr))) 
; both should be the same
(l/run* [?func] (l/fresh [?i] (arg ?func ?i arg1)))
; length should be two
(l/run* [?i] (l/fresh [?func] (arg ?func ?i arg1))) 
; should be (1 2)
(l/run* [?i] (arg arg1 ?i arg1)) ; should also be (1 2)


;;; RECEIVER TESTS
(pred/parseCode "var x = function (y) { return y }; x(x);")
(doAnalysis)
(l/run* [?receiveraddr]
        (l/fresh [?funcY ?funcYaddr]
                 (pred/functionexpression ?funcY)
                 (objects ?funcY ?funcYaddr)
                 (receiver ?funcYaddr ?receiveraddr)))
(.-globala @jsa)
(pred/parseCode "var x = { y : function (z) { return z }}; x.y(x);")
(doAnalysis)
(l/run* [?receiveraddr]
        (l/fresh [?funcY ?funcYaddr]
                 (pred/functionexpression ?funcY)
                 (objects ?funcY ?funcYaddr)
                 (receiver ?funcYaddr ?receiveraddr)))
; function Y as input
; returns var x as output
(def varx (first (l/run* [?objs]
        (l/fresh [?node]
                 (pred/ast-variabledeclarationwithname ?node "x")
                 (objects ?node ?objs)))))
(l/run* [?funcaddr]
        (receiver ?funcaddr varx))
;varx as input
; returns function y


;;; allObjects TESTS
(pred/parseCode  "var o1 = {}; var o2 = {}")
(doAnalysis)
(l/run* [?obj]
  (l/fresh [?jsan]
    (jsanalysis ?jsan)
    (l/project [?jsan]
      (membero ?obj (seq (.allObjects ?jsan))))))


; (pred/parseCode "var z = {y : 5}; var x = function (y) { return y }; x(x); x(z);")
; (doAnalysis)
; (l/run* [?out]
;   (l/fresh [?ex ?ne ?t]
;     (pred/functionexpression ?ex)
;     (pred/ast-variabledeclarationwithname ?ne "z")
;     (conso ?ex ?ne ?out)))