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
; move to unit tests
;pred/js-print (first (l/run* [?p] (jsanalysis ?p))))


(defn
  objects
  "Reification of the relation between an expression ?node and 
  the set of objects ?objects it can evaluate to"
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
             ; if ?node is unground
             [(l/lvaro ?node)
              ;TODO
              ]
             ; if ?node is ground
             [(l/project [?node ?jsan]
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
  and its possible prototype objects, ?protos, of the objects ?objectaddr can
  represent at runtime.
  
  param ?objectaddr is an address representing an object."
  [?objectaddr ?protos]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/project [?jsan ?objectaddr]
                      (membero ?protos (seq (.proto ?jsan ?objectaddr))))))


(defn
    props
    "Refication of the relation between any object ?obj and
     the set of objects, ?props, that could be stored in the
     properties of object ?obj.

     param ?obj is an address representing an object"
    [?obj ?props]
    (l/fresh [?jsan]
        (jsanalysis ?jsan)
        (l/project [?obj ?jsan]
            (membero ?props (seq (.props ?jsan ?obj))))))

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
   param ?arg is the set of objects that may be passed as
    ith argument to the object from ?objectaddr, or is the
    receiver if i = 0."
   [?objectaddr ?i ?argadr]
   ;TODO
   )




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
(l/run* [?protoaddr]
  (l/fresh [?varf ?varfObj]
    (pred/newexpression ?varf)
    (objects ?varf ?varfObj)
    (proto ?varfObj ?protoaddr)))

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


