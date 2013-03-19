(ns jsrefact.analysis
  ^{:doc "Logic layer above JIPDA Javascript analysis
            These queries are mainly based on the paper: Tool-supported
            Refactoring for Javascript by Asger Feldthaus."}
  (:use [esp :only [esprima parse]]
    [cljs.core.logic :only [membero lvaro nonlvaro conda conde conso flatteno failed?]])
  (:require-macros [cljs.core.logic.macros :as l])
  (:require 
            [jsrefact.project :as proj]
            [jsrefact.predicates :as pred]
            [jsrefact.misc :as misc]
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
            [jipdaeval :as jie]
            [jipda :as ji]
            [depend :as dep]
            [transform :as tra]
            ))


(defn
  jsanalysis
  "Unifies ?jsan with the Javascript analysis object"
  [?jsan]
  (l/== ?jsan (proj/jsa)))


(defn 
  globala
  "Unifies ?glob with the globaladdress received from
  the analysis."
  [?glob]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/project [?jsan]
                      (l/== ?glob (.-globala ?jsan)))))


(defn
  functiondefinition
  "Reifies ?fdef with functiondefinition from ast.
  Notice that a functiondefinition is either a functionExpression
  or a functiondeclaration."
  [?fdef]
  (l/fresh [?decl]
           (l/conde 
             [(pred/functionexpression ?fdef)]
             [(pred/functiondeclaration ?decl) (pred/has "id" ?decl ?fdef)])))

(defn
  referenceidentifier
  "Reification of ?ide with a referenceidentifier."
  [?ide]
  (l/all
    (pred/identifier ?ide)
    (l/project [?ide] (l/== true (js/isReferenceIdentifier ?ide (proj/parsed))))))

(defn
  expression-address
  "Reification of the relation between an expression ?node and 
  the set of objects ?objects it can evaluate to"
  ; TODO: add and test referenceidentifier
  ; newexpression, functionexpression, ~referenceidentifier

  [?node ?objects]
  (l/fresh [?jsan ?n ?decl]
           (jsanalysis ?jsan)
           (l/conde 
            [(pred/functionexpression ?node)]
            [(pred/variabledeclaration-name ?decl ?n)(pred/has "id" ?decl ?node)]
            [(pred/functiondeclaration ?decl) (pred/has "id" ?decl ?node)]
            [(pred/newexpression ?node)])
           (l/project [?node ?jsan]
                      (membero ?objects (seq (.objects ?jsan ?node))))))

(defn
  store
  "Unify ?store with the store of Javascript analysis"
  [?store]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/project [?jsan]
                      (l/== ?store (.-entries (.-store ?jsan))))))

(defn
  store-element
  "Reification of the relation between the store from the analysis
  and one of its elements."
  [?store ?el]
  (l/all
    (store ?store)
    (l/project [?store]
               (membero ?el (seq ?store)))))

(defn 
  address-value
  ; TODO : add tests
  "Reification of the relation between an address ?address and its
  binding environment (Benv) ?value.
  ?address : address assigned by Jipda.
  ?value : Binding environment."
  [?address ?value]
  (l/fresh [?jsan ?store ?element]
           (store-element ?store ?element)
           (l/project [?element]
                      (l/== ?address (first ?element))
                      (l/== ?value (.-aval (second ?element))))))

(defn 
  address-ovalue
  ;TODO : add tests
  "Reification of the relation between an address and 
  ?ovalue : a binding environment from an object."
  [?address ?ovalue]
  (l/all 
    (address-value ?address ?ovalue)
    (l/project [?ovalue]
      (l/== true (.-isBenv ?ovalue))
      (l/== true (.isObject ?ovalue)))))


(defn
  objectaddress-ovalue
  "Refies ?objaddr with an objectaddress except the global address.
  Necessary for oaddress-pname-paddress which cannot handle
  the global address."
  [?objaddr ?ovalue]
  (l/fresh [?glob]
    (address-ovalue ?objaddr ?ovalue)
    (globala ?glob)
    (l/project [?glob ?objaddr]
      (l/== false (.equals ?glob ?objaddr)))))


(defn 
  address-fvalue
  ;TODO : add tests
  "?fvalue : a binding environment from a function."
  [?address ?value]
  (l/all 
    (address-value ?address ?value)
    (l/project [?value]
      (l/== true (.-isBenv ?value))
      (l/== true (.isFunction ?value)))))


(defn
  scopenode
  "Reification of a scopenode. Where a scopenode is either a functionexpression,
  functiondeclaration or a catchclause."
  [?exp]
  (l/all
    (l/conde 
      [(pred/functionexpression ?exp)]
      ;[(pred/catchclause ?exp)]
      [(pred/functiondeclaration ?exp)])))

(defn
  ast-scope
  "Reification of the relation between a functiondefinition or catchclause
  and its scope ?scope
  Notice that a functiondefinition is either a functionExpression
  or a functiondeclaration."
  [?node ?scope]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (scopenode ?node)
           (l/project [?node ?jsan]
                      (membero ?scope (seq (.scope ?jsan ?node))))))

;;; CATCH Clause
; (proj/analyze "function x() {}; try { x(); } catch (error) { alert(error.message); }")
; (proj/analyze "try { throw 42 } catch (e) { e };")
; (proj/analyze "try { 123 } catch (e) { e };")
; (proj/analyze "try { throw 42 } catch (e) { 43 };")
; (l/run* [?d] (catchclause ?d))


(defn
  oaddress-protoaddress
  "The reification of the relation between any object ?objectaddr 
  and its possible prototype objects, ?protoaddr, of the objects ?objectaddr can
  represent at runtime.
  
  param ?objectaddr is an address representing an object."
  [?objectaddr ?protoaddr]
  (l/fresh [?jsan ?oval ?g]
           (jsanalysis ?jsan)
           (l/project [?jsan] 
                      (address-ovalue ?objectaddr ?oval)
                      (l/project [?objectaddr]
                                 (membero ?protoaddr (seq (.proto ?jsan ?objectaddr)))))))


(defn
  protochain
  "TODO : doc + test"
  [objectaddress protolist]
    (let [proto (seq (.proto (proj/jsa) objectaddress))
          protos (cons protolist proto)]
      (if (== proto (list))
        protos
        (flatten (cons protos (map (fn [x] (protochain x (list))) proto))))))


(defn
  oaddress-protoaddress+
  "TODO : doc + test"
  [?objectaddr ?protochain]
  (l/fresh [?oval]
    (address-ovalue ?objectaddr ?oval)
    (l/project [?objectaddr]
      (l/== ?protochain (distinct (protochain ?objectaddr (list)))))))

; (proj/analyze "function F() {}; var f = new F();")
; (def xxx (last (l/run* [?x] (l/fresh [?y] (address-ovalue ?x ?y)))))
; (l/run* [?protos] (oaddress-protoaddress+ xxx ?protos))
; => (#<proto-483@[]> #<Object.prototype@0>)


(defn
  oaddress-pname-paddress
  ; TODO: write test cases
  "Reification of the relation between an object address, one of its
  property addresses and its abstract property name.

  ?oaddr : an object address.
  ?pname : abstract property name.
  ?paddr : property address of one of the properties from object from ?oaddress."
  [?oaddr ?pname ?paddr]
  (l/fresh [?ovalue ?frame ?binding ?propa]
           (objectaddress-ovalue ?oaddr ?ovalue)
           (l/project [?ovalue]
                      (l/== ?frame (seq (.-frame ?ovalue)))
                      (membero ?binding ?frame)
                      (l/project [?binding]
                                 (l/== ?pname (first ?binding))
                                 (membero ?propa (seq (second ?binding)))
                                 (l/project [?propa]
                                  (membero ?paddr (seq (.-as (.lookup (proj/jsa) ?propa)))))))))


(defn
  avalue-cvalue
  ; TODO write test cases
  "Conversion from abstract value to concrete value.
  abstract value should be bound"
  ; TODO: (.conc ?avalue) can return false
  [?avalue ?cvalue]
  (l/project [?avalue]
             (membero ?cvalue (seq (.conc ?avalue)))))
             ; (misc/lprint ?cvalue)
             ; (l/conde
             ;   [(l/== ?cvalue false)]
             ;   [(l/project [?cvalue] (membero ?cvalue (seq (.conc ?avalue))) (misc/lprint ?cvalue))])))



(defn 
  oaddress-pname-pstring-paddress
  ; TODO; write test cases
  "Reification of the relation between ?oaddress, one of its properties
  addresses ?paddress, the abstractname of the property and its concrete name ?pstring.
  ?oaddr : an object address.
  ?pname : abstract property name.
  ?pstring : concrete property name.
  ?paddr : property address of one of the properties from object from ?oaddress."
  [?oaddress ?pname ?pstring ?paddress]
  (l/all 
    (oaddress-pname-paddress ?oaddress ?pname ?paddress)
    (avalue-cvalue ?pname ?pstring)))

; TODO: write property+ : 


(defn
  function-i-argument
  "param ?objectaddr is an address of a functiondefinition
  param ?i is the i-th argument passed to the function.
  param ?argaddr is one of the objects that may be passed as
  ith argument to the functiondefinition"
  [?objectaddr ?i ?argaddr]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/fresh [?func ?decl ?argLength]
                    (l/conde 
                      [(pred/functionexpression ?func)]
                      [(pred/functiondeclaration ?decl) (pred/has "id" ?decl ?func)])
                    (expression-address ?func ?objectaddr)
                    (l/project [?func ?decl] (l/conda 
                                               [(pred/functionexpression ?func)(l/== ?argLength (.-length (.-params ?func)))]
                                               [(l/== ?argLength (.-length (.-params ?decl)))]))
                    (l/project [?argLength] (membero ?i (range 1 (+ ?argLength 1))))
                    (l/project [?jsan ?objectaddr ?i] (membero ?argaddr (seq (.arg ?jsan ?objectaddr ?i)))))))


(defn
  function-receiver
  "Reification of the relation between a functiondefinition
  and the receiver of it.
  
  param ?objectaddr is an address of a functionexpression or functiondeclaration.
  param ?receiveraddr is the receiver address."
  [?objectaddr ?receiveraddr]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/fresh [?func]
                    (functiondefinition ?func)
                    (expression-address ?func ?objectaddr)
                    (l/project [?jsan ?objectaddr]
                               (membero ?receiveraddr (seq (.arg ?jsan ?objectaddr 0)))))))


(defn
  function-return
  "param ?objectaddr is an address which points to a functiondefinition
  param ?return is an object that may be returned as result from
  the function. 
  "
  [?objectaddr ?return]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/fresh [?decl ?func]
                    (l/conde 
                      [(pred/functionexpression ?func)]
                      [(pred/functiondeclaration ?decl) (pred/has "id" ?decl ?func)])
                    (expression-address ?func ?objectaddr)
                    (l/project [?jsan ?objectaddr]
                               (membero ?return (seq (.ret ?jsan ?objectaddr)))))))
