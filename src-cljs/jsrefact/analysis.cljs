(ns jsrefact.analysis
  ^{:doc "Logic layer above JIPDA Javascript analysis
            These queries are mainly based on the paper: Tool-supported
            Refactoring for Javascript by Asger Feldthaus."}
  (:use [esp :only [esprima parse]]
    [cljs.core.logic :only [membero lvaro nonlvaro conda conde conso]])
  (:require-macros [cljs.core.logic.macros :as l])
  (:require 
            [jsrefact.project :as proj]
            [jsrefact.predicates :as pred]
            [jsrefact.misc :as misc]
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
  objectaddress
  [?addr]
  (l/fresh [?address ?jsan ?glob]
           (jsanalysis ?jsan)
           (l/project [?jsan] 
                      (l/== ?address (seq (.allObjects ?jsan)))
                      (globala ?glob)
                      (l/project [?glob ?address]
                                 (membero ?addr (filter (fn [x] (false? (= ?glob x))) ?address))))))

(defn
  expression
  "Reification of the relation between a kind of expression ?kind
    and its expression ast ?exp."
  [?kind ?exp]
  (let [types 
        ["ThisExpression"
         "ArrayExpression"
         "ObjectExpression"
         "FunctionExpression"
         "SequenceExpression"
         "UnaryExpression"
         "BinaryExpression"
         "AssignmentExpression"
         "UpdateExpression"
         "LogicalExpression"
         "ConditionalExpression"
         "NewExpression"
         "CallExpression"
         "MemberExpression"
         "YieldExpression"
         "ComprehensionExpression"
         "GeneratorExpression"
         "LetExpression"]]
         (l/all
          (membero ?kind types)
          (pred/ast ?kind ?exp))))

(defn
  expression-object
  "Reification of the relation between an expression ?node and 
  the set of objects ?objects it can evaluate to"

  ; What objects should accept: any expression, any functiondeclaration (werkt, maar met id property)

  [?node ?objects]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           ;(l/conde 
           ; [(expression ?node)]
           ; [(functiondeclaration ?node)])
           (l/project [?node ?jsan]
                      (membero ?objects (seq (.objects ?jsan ?node))))))

; (proj/analyze "var x = { y : function (z) { return z }};")
; (l/run* [?k] (l/fresh [?n] (expression ?k ?n)))
; (l/run* [?objs] (l/fresh [?exp] (pred/objectexpression ?exp) (objects ?exp ?objs)))  ==> cannot handle object expression
; (l/run* [?objs] (l/fresh [?exp] (pred/functionexpression ?exp) (objects ?exp ?objs)))

(defn
  functiondefinition
  "Reifies ?fdef with functiondefinition from ast.
  Notice that a functiondefinition is either a functionExpression
  or a functiondeclaration."
  [?fdef]
  (l/conde 
    [(pred/functionexpression ?fdef)]
    [(pred/functiondeclaration ?fdef)])
  )

(defn
  ast-scope
  "Reification of the relation between a functiondefinition or catchclause
  and its scope ?scope
  Notice that a functiondefinition is either a functionExpression
  or a functiondeclaration.
  For every with-statement : (ast-scope withStatement ?scope) = (expression-object withStatement ?scope)"
  [?node ?scope]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (pred/functionexpression ?node) ;TODO: to be replaced with functiondefinition & catch clause (catchclause ?clau) & with-statement
           (l/project [?node ?jsan]
                      (membero ?scope (seq (.scope ?jsan ?node)))))
  )

;;; CATCH Clause
; (proj/analyze "function x() {}; try { x(); } catch (error) { alert(error.message); }")
; (l/run* [?d] (catchclause ?d))

;;; WITH Statement (not yet supported in the analysis)
; (proj/analyze "var x = { y : 123, z : 456}; with (x) { y = 234; };")

;;; FUNCTIONDECLARATION
; (proj/analyze "function add1(n){return n+1};")

(defn
  object-proto
  "The reification of the relation between any object ?objectaddr 
  and its possible prototype objects, ?protoaddr, of the objects ?objectaddr can
  represent at runtime.
  
  param ?objectaddr is an address representing an object."
  [?objectaddr ?protoaddr]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/project [?jsan] 
                      (objectaddress ?objectaddr)
                      (l/project [?objectaddr]
                                 (membero ?protoaddr (seq (.proto ?jsan ?objectaddr)))))))

(defn
  object-propertyObject
  "Refication of the relation between any object ?obj and
  the set of objects, ?props, that could be stored in the
  properties of object ?obj.
  
  param ?obj is an address representing an object
  param ?prop is an address representing a property of ?obj"
  [?obj ?prop]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/project [?jsan]
                      (objectaddress ?obj)
                      (l/project [?obj]
                                 (membero ?prop (seq (.props ?jsan ?obj)))))))

(defn
    mayHaveProp
    "Non relational

    param prop is a property (string)
    param obj is an address pointing to an object"
    [obj prop]
    (.mayHaveProp (proj/jsa) obj prop))

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
                (pred/functionexpression ?func)     ; functiondeclarations can be added using the has "id" trick
                (expression-object ?func ?funcAddr)
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
  "Reification of the relation between a function
  and the receiver of it.
  
  param ?objectaddr is an address of a functionexpression or functiondeclaration.
  param ?receiveraddr is the receiver address."
  [?objectaddr ?receiveraddr]
  (l/fresh [?jsan]
           (jsanalysis ?jsan)
           (l/fresh [?func ?decl]
                    (l/conde 
                      [(pred/functionexpression ?func)]
                      [(pred/functiondeclaration ?decl) (pred/has "id" ?decl ?func)])
                    (expression-object ?func ?objectaddr)
                    (l/project [?jsan ?objectaddr]
                               (membero ?receiveraddr (seq (.arg ?jsan ?objectaddr 0)))))))

(defn
  ret
  "param ?objectaddr is an address which points to a function
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
                    (expression-object ?func ?objectaddr)
                    (l/project [?jsan ?objectaddr]
                               (membero ?return (seq (.ret ?jsan ?objectaddr)))))))



;;; TESTS
;; TODO: move tests in separate file

;;; expression-object TESTS
; (proj/analyze "var x = { foo: 42 };")
; (l/run* [?objs]
;         (l/fresh [?node]
;                  (pred/ast-variabledeclarationwithname ?node "x")
;                  (expression-object ?node ?objs)))
; (.isObject (.lookup (proj/jsa) (first (l/run* [?objs]
;                                                  (l/fresh [?node]
;                                                           (pred/ast-name ?node "x")
;                                                           (expression-object ?node ?objs))))))
; (l/run* [?node] (pred/ast-name ?node "x"))

