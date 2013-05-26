(ns jsrefact.analysis
  ^{:doc "Logic layer above JIPDA Javascript analysis
            These queries are mainly based on the paper: Tool-supported
            Refactoring for Javascript by Asger Feldthaus."}
  (:use [esp :only [esprima parse]]
    [cljs.core.logic :only [membero lvaro nonlvaro conda conde conso flatteno failed?]])
  (:require-macros [cljs.core.logic.macros :as l])
  (:use-macros [jsrefact.macros.logic :only
                [equals succeeds fails projectlvars]])
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
           (equals ?glob (.-globala ?jsan))))


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
    (succeeds (js/isReferenceIdentifier ?ide (proj/parsed)))))

(defn
  expression-address
  "Reification of the relation between an expression ?node and 
  the set of objects ?objects it can evaluate to"
  ; TODO: add and test referenceidentifier
  ; newexpression, functionexpression, ~referenceidentifier
  [?node ?objects]
  (l/fresh [?jsan ?n ?decl ?par ?key]
           (jsanalysis ?jsan)
           (l/conde ;-
             [(pred/functionexpression ?node)]
             [(pred/variabledeclaration-name ?decl ?n)(pred/has "id" ?decl ?node)]
             [(pred/functiondeclaration ?decl) (pred/has "id" ?decl ?node)]
             [(pred/newexpression ?node)]
             [(referenceidentifier ?node)
              (pred/child-parent ?node ?par)
              (pred/property-key ?par ?key)
              (fails (= ?key ?node))])
           (projectlvars (membero ?objects (seq (.objects ?jsan ?node))))))

(defn
  store
  "Unify ?store with the store of Javascript analysis"
  [?store]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (equals ?store (.-entries (.-store ?jsan)))))

(defn
  store-element
  "Reification of the relation between the store from the analysis
  and one of its elements."
  [?store ?el]
  (l/all
    (store ?store)
    (projectlvars (membero ?el (seq ?store)))))

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
           (equals ?address (first ?element))
           (equals ?value (.-aval (second ?element)))))

(defn 
  address-ovalue
  "Reification of the relation between an address and 
  ?ovalue : a binding environment from an object."
  [?address ?ovalue]
  (l/all 
    (address-value ?address ?ovalue)
    (succeeds (.-isBenv ?ovalue))
    (succeeds (.isObject ?ovalue))))


(defn
  objectaddress-ovalue
  "Refies ?objaddr with an objectaddress except the global address.
  Necessary for oaddress-pname-paddress which cannot handle
  the global address."
  [?objaddr ?ovalue]
  (l/fresh [?glob]
    (address-ovalue ?objaddr ?ovalue)
    (globala ?glob)
    (fails (.equals ?glob ?objaddr))))


(defn 
  address-fvalue
  "?fvalue : a binding environment from a function."
  [?address ?value]
  (l/all 
    (address-value ?address ?value)
    (succeeds (.-isBenv ?value))
    (succeeds (.isFunction ?value))))


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
  "Reification of the relation between a functiondefinition (or catchclause)
  and its scope ?scope
  Notice that a functiondefinition is either a functionExpression
  or a functiondeclaration."
  [?node ?scope]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (scopenode ?node)
           (projectlvars (membero ?scope (seq (.scope ?jsan ?node))))))


(defn
  oaddress-protoaddress
  "The reification of the relation between any object ?objectaddr 
  and its possible prototype object, ?protoaddr, at runtime.
  
  param ?objectaddr is an address representing an object.
  param ?protoaddr is an address representing a prototype object."
  [?objectaddr ?protoaddr]
  (l/fresh [?jsan ?oval ?g]
           (jsanalysis ?jsan)
           (address-ovalue ?objectaddr ?oval)
           (projectlvars (membero ?protoaddr (seq (.proto ?jsan ?objectaddr))))))


(defn
  protochain
  "Non-relational
  Given an objectaddress, protochain will construct the chain
  of prototype objects starting from objectaddress"
  [objectaddress protolist]
    (let [proto (seq (.proto (proj/jsa) objectaddress))
          protos (cons protolist proto)]
      (if (== proto (list))
        protos
        (flatten (cons protos (map (fn [x] (protochain x (list))) proto))))))


(defn
  oaddress-protoaddress+
  "Transitive version of oaddress-protoaddress. 
  Reification of the relation between an objectaddress and its prototypechain."
  [?objectaddr ?protochain]
  (l/fresh [?oval]
    (address-ovalue ?objectaddr ?oval)
    (equals ?protochain (cons ?objectaddr (distinct (protochain ?objectaddr (list)))))))


(defn
  oaddress-pname-paddress
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
                                 (projectlvars (membero ?paddr (seq (.-as (.lookup (proj/jsa) ?propa)))))))))


(defn
  avalue-cvalue
  "Conversion from abstract value to concrete value.
  abstract value should be bound"
  ; TODO: (.conc ?avalue) can return false
  [?avalue ?cvalue]
  (projectlvars (membero ?cvalue (seq (.conc ?avalue)))))
             ; (misc/lprint ?cvalue)
             ; (l/conde
             ;   [(l/== ?cvalue false)]
             ;   [(l/project [?cvalue] (membero ?cvalue (seq (.conc ?avalue))) (misc/lprint ?cvalue))])))


(defn 
  oaddress-pname-pstring-paddress
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


(defn
  oaddress-pname-pstring-paddress+
  "Reification of the relation between ?oaddress, one of its properties
  addresses ?paddress, the abstractname of the property and its concrete name ?pstring.
  Transitive version of oaddress-pname-pstring-paddress. It will search
  up the prototypechain."
  [?oaddress ?pname ?pstring ?paddress]
  (l/fresh [?protos ?proto ?ovalue]
    (objectaddress-ovalue ?oaddress ?ovalue)
    (oaddress-protoaddress+ ?oaddress ?protos)
    (membero ?proto ?protos)
    (oaddress-pname-pstring-paddress ?proto ?pname ?pstring ?paddress)))


(defn
  functionaddress-i-argumentaddress
  "param ?objectaddr is an address of a functiondefinition
  param ?i is the i-th argument passed to the function.
  param ?argaddr is the address of one of the objects that may be 
  passed as ith argument to the functiondefinition."
  [?objectaddr ?i ?argaddr]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/fresh [?func ?decl ?argLength]
                    (l/conde;-
                      [(pred/functionexpression ?func)]
                      [(pred/functiondeclaration ?decl) (pred/has "id" ?decl ?func)])
                    (expression-address ?func ?objectaddr)
                    (projectlvars (l/conda 
                                    [(pred/functionexpression ?func)(l/== ?argLength (.-length (.-params ?func)))]
                                    [(l/== ?argLength (.-length (.-params ?decl)))]))
                    (projectlvars (membero ?i (range 1 (+ ?argLength 1))))
                    (projectlvars (membero ?argaddr (seq (.arg ?jsan ?objectaddr ?i)))))))


(defn
  functionaddress-receiveraddress
  "Reification of the relation between a functiondefinition
  and one of the receivers of it.
  
  param ?functionaddress is an address of a functionexpression or functiondeclaration.
  param ?receiveraddress is the receiver address."
  [?functionaddress ?receiveraddress]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/fresh [?func]
                    (functiondefinition ?func)
                    (expression-address ?func ?functionaddress)
                    (projectlvars (membero ?receiveraddress (seq (.arg ?jsan ?functionaddress 0)))))))


(defn
  functionaddress-returnaddress
  "Reification of the relation between a functiondefinition and one of its
  objectaddresses it may return.
  param ?functionaddress is an address which points to a functiondefinition
  param ?returnaddress is an object that may be returned as result from
  the function. 
  "
  [?functionaddress ?returnaddress]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/fresh [?decl ?func]
                    (functiondefinition ?func)
                    (expression-address ?func ?functionaddress)
                    (projectlvars (membero ?returnaddress (seq (.ret ?jsan ?functionaddress)))))))


(defn
  functiondeclaration-id-address
  "Reification of the relation between a functiondeclaration, its 'id' property and
  the address to the object to which it might evaluate at runtime."
  [?funcDec ?id ?address]
  (l/all
    (pred/functiondeclaration ?funcDec)
    (pred/has "id" ?funcDec ?id)
    (expression-address ?id ?address)))

(defn
  variabledeclarator-id-address
  "Reification of the relation between a variabledeclaration, its 'id' property and
  the address to the object to which it might evaluate at runtime."
  [?varDec ?id ?address]
  (l/all
    (pred/variabledeclarator ?varDec)
    (pred/has "id" ?varDec ?id)
    (expression-address ?id ?address)))
