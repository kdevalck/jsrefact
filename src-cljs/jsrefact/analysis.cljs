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
                       (pred/functionexpression ?node)
                       (l/project [?node ?jsan]
                                  (membero ?scope (seq (.scope ?jsan ?node)))))
             )


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
  param ?i is the i-th argument passed to the object.
  param ?argadd is the set of objects that may be passed as
  ith argument to the function expression"
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
  "Reification of the relation between the functionExpression
   and the receiver of it.

  param ?objectaddr is an address of a functionExpression.
  param ?receiveraddr is the receiver address."
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


















;;; allObjects TESTS
(pred/parseCode  "var o1 = {}; var o2 = {}")
(doAnalysis)
(l/run* [?obj]
  (l/fresh [?jsan]
    (jsanalysis ?jsan)
    (l/project [?jsan]
      (membero ?obj (seq (.allObjects ?jsan))))))
