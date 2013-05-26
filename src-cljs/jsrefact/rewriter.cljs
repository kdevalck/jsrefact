(ns jsrefact.rewriter
  ^{:doc "Basis Javascript AST rewriting utilities"
    :author "Kevin De Valck"}
  (:use [esp :only [esprima parse]]
        [cljs.core.logic :only [membero lvaro nonlvaro conda conde conso flatteno failed?]])
  (:require-macros [cljs.core.logic.macros :as l])
  (:use-macros [jsrefact.macros.jsr :only [jsr refactor]][jsrefact.macros.logic :only [equals succeeds fails projectlvars]])
  	(:require 
     [jsrefact.project :as proj]
     [jsrefact.predicates :as pred]
     [jsrefact.analysis :as analysis]
     [jsrefact.misc :as misc]))

; Main container of smaller rewrite fragments. 
; A rewrite fragment consist out of 3 parts
;   1 part of the ast
;   2 kind of rewrite: string
;   3 list of extra parameters
(def rewrites (atom []))

(defn 
  scheduleRewrite
  "TODO: doc"
  [rewrite]
  (swap! rewrites (fn [x] (conj @rewrites rewrite))))

(defn
  removeRewrite
  "TODO: doc"
  []
  (swap! rewrites (fn [x] (rest @rewrites))))

(defn
  ast-property-value
  "Retrieve the value of the specified property
  from the ast"
  [ast property]
  (aget ast property))

(defn
  ast-add-property
  "Set the value of the specified property
  int the ast"
  [ast property value]
  (aset ast property value)
  ast)

(defn
  ast-change-property
  "Change value of specified property"
  [ast property value]
  (if (.hasOwnProperty ast property)
    (ast-add-property ast property value))
  ast)

(defn
  create-empty-object
  "Create & return empty Javascript Object"
  []
  (new js/Object))

(defn
  insertAt
  "Insert element at specific index"
  [coll idx el]
  (.splice coll idx 0 el)
  coll)

(defn
  removeAt
  "Remove element at specific index"
  [coll idx]
  (.splice coll idx 1)
  coll)

(defn
  removeNode
  "Remove specific node"
  [coll element]
  (let [idx (.indexOf coll element)]
    (if (>= idx 0)
      (removeAt coll idx)
      coll)))

(defn
  insertBefore
  "Insert newElement before occurence of 'element' "
  [coll element newElement]
  (let [idx (.indexOf coll element)]
    (if (>= idx 0)
      (insertAt coll idx newElement)
      coll)))

(defn
  insertAfter
  "Insert newElement after occurence of 'element' "
  [coll element newElement]
  (let [idx (.indexOf coll element)]
    (if (>= idx 0)
      (insertAt coll (+ idx 1) newElement))
    coll))

(defn
  createIdentifier
  "Create an identifier node.
  Should contain: 
  - type: 'Identifier'
  - name: newname"
  [newname]
  (let [obj (create-empty-object)]
    (ast-add-property obj "type" "Identifier")
    (ast-add-property obj "name" newname)))

(defn
  createVariableDeclaration
  "Create a VariableDeclaration AST-node."
  [id-name init]
  (let [declaration (create-empty-object)
      id (createIdentifier id-name)
      declarator (create-empty-object)]
    (ast-add-property declaration "type" "VariableDeclaration")
    (ast-add-property declaration "kind" "var")
    (ast-add-property declarator "type" "VariableDeclarator")
    (ast-add-property declarator "id" id)
    (ast-add-property declarator "init" init)
    (ast-add-property declaration "declarations" (js/Array declarator))
    declaration))

(defn
  createExpressionStatement
  "Create an 'ExpressionStatement' AST-node"
  [expression]
  (let [obj (create-empty-object)]
    (ast-add-property obj "type" "ExpressionStatement")
    (ast-add-property obj "expression" expression)
    obj))

(defn
  createAssignmentExpression
  "Create an 'AssignmentExpression' AST-node"
  [operator aLeft aRight]
  (let [obj (create-empty-object)]
    (ast-add-property obj "type" "AssignmentExpression")
    (ast-add-property obj "operator" operator)
    (ast-add-property obj "left" aLeft)
    (ast-add-property obj "right" aRight)
    obj))

(defn
  createMemberExpression
  "Create a 'MemberExpression' AST-node"
  [object property]
  (let [obj (create-empty-object)]
    (ast-add-property obj "type" "MemberExpression")
    (ast-add-property obj "computed" false)
    (ast-add-property obj "object" object)
    (ast-add-property obj "property" property)
    obj))

(defn
  createFunctionExpression
  "Create a 'FunctionExpression' AST-node"
  [id params someDefaults body aRest generator expression]
  (let [obj (create-empty-object)]
    (ast-add-property obj "type" "FunctionExpression")
    (ast-add-property obj "id" id)
    (ast-add-property obj "params" params)
    (ast-add-property obj "defaults" someDefaults)
    (ast-add-property obj "body" body)
    (ast-add-property obj "rest" aRest)
    (ast-add-property obj "generator" generator)
    (ast-add-property obj "expression" expression)
    obj))

(defn
  createBlockStatement
  "Create a 'BlockStatement' AST-node"
  [body]
  (let [obj (create-empty-object)]
    (ast-add-property obj "type" "BlockStatement")
    (ast-add-property obj "body" body)
    obj))

(defn
  createReturnStatement
  "Create a 'ReturnStatement' AST-node"
  [argument]
  (let [obj (create-empty-object)]
    (ast-add-property obj "type" "ReturnStatement")
    (ast-add-property obj "argument" argument)
    obj))

(defn
  createThisExpression
  "Create a 'ThisEXpression' AST-node"
  []
  (let [obj (create-empty-object)]
    (ast-add-property obj "type" "ThisExpression")
    obj))

(defn
  createCallExpression
  "Create a 'CallExpression' AST-node"
  [callee arguments]
  (let [obj (create-empty-object)]
    (ast-add-property obj "type" "CallExpression")
    (ast-add-property obj "callee" callee)
    (ast-add-property obj "arguments" arguments)
    obj))

(defn
  createCallExpressionToGetter
  "Create a Callexpression AST-node which is used in the
  encapsulate proeprty refactoring"
  [object getterName]
  (let [getterIde (createIdentifier getterName)
    memberexp (createMemberExpression object getterIde)]
    (createCallExpression memberexp (js/Array))))


(defn
  createGetterProperty
  "Create a new getter function for a specified property"
  [property-name]
  (let [getz (createIdentifier (+ "get" property-name))
    thisexp (createThisExpression)
    memberexp (createMemberExpression thisexp getz)
    z (createIdentifier property-name)
    returnstat (createReturnStatement z)
    block (createBlockStatement (js/Array returnstat))
    funcexpr (createFunctionExpression js/null (js/Array) (js/Array) block js/null false false)
    assignexpr (createAssignmentExpression "=" memberexp funcexpr)]
    (createExpressionStatement assignexpr)))


(defn
  scheduleEncapsulateProperty+Getter
  "Schedule an encapsulate property rewrite."
  [p property-name]
  (let [rewr (list p "encapsulateproperty" property-name)]
    (scheduleRewrite rewr)))

(defn
  rewriteEncapsulateProperty+Getter
  "This function is called when an encapsulate propert rewrite is performed.
  3 steps:  1. Insert a local variable declaration.
            2. Insert a getter method the variable declaration.
            3. Remove previously declared property."
  [p property-name]
  (let [vardecl (createVariableDeclaration property-name (.-right p))
    getter (createGetterProperty property-name)
    exprstat (js/parent p (proj/parsed))
    block (js/parent exprstat (proj/parsed))
    bodyblock (.-body block)]
    (insertAfter bodyblock exprstat vardecl)
    (insertAfter bodyblock vardecl getter)
    (removeNode bodyblock exprstat)
    ))

(defn
  scheduleRewriteToGetter
  "Schedule RewriteToGetter rewrite. This rewite will change the 
  property accesses to the correct 'get'-callexpressiong."
  [candidate property-name]
  (let [rewr (list candidate "rewritetogetter" property-name)]
    (scheduleRewrite rewr)))

(defn
  rewriteToGetter
  "Perform the 'RewriteToGetter transformation. This transformation will 
  transform the candidate from a property access to a callexpression. This
  callexpression will be a getter function of that particular property."
  [candidate property-name]
  (cond
    (= (.-type candidate) "VariableDeclarator")
      (let [obj (.-object (.-init candidate))
        callexpr (createCallExpressionToGetter obj (+ "get" property-name))]
        (ast-change-property candidate "init" callexpr))
      ))

(defn
  renameIdentifier
  "Input: a identifier AST-node, a newname and the oldname.
  This function will change the name of the identifier ast-node."
  [ide oldname newname]
  (if 
    (and
      (== (pred/ast-kind ide) "Identifier")
      (== (ast-property-value ide "name") oldname))
    (ast-change-property ide "name" newname)
    ))

(defn
  renameMemberExpression
  "Function to rename a memberexpression AST.
  It's necessary to check if it is the baseobject that needs
  to be renamed or the member access.
  If the property part is computed we need to create a 
  new identifier with the new name and set it as the property."
  [ast oldValue newValue]
  (if (== (.-name (.-object ast)) oldValue)
    (renameIdentifier (.-object ast) oldValue newValue)
    (if (== (.-computed ast) false)
      (renameIdentifier (.-property ast) oldValue newValue)
      (do 
        (ast-change-property ast "property" (createIdentifier newValue))
        (ast-change-property ast "computed" false)))))

(defn 
  scheduleRename
  "Schedule a rename transformation."
  [ast oldname newname & other]
  (let [rewr (list ast "rename" (list oldname newname other))]
    (scheduleRewrite rewr)
    true))

(defn
  astRename
  "Perform a scheduled rename transformation."
  [ast oldName newName]
  (let [kind (pred/ast-kind ast)]
    (cond
      (== kind "Identifier") (renameIdentifier ast oldName newName)
      (== kind "Property") (do (renameIdentifier (.-key ast) oldName newName)(renameIdentifier (.-value ast) oldName newName))
      (== kind "VariableDeclarator") (do (renameIdentifier (.-id ast) oldName newName)(renameIdentifier (.-init ast) oldName newName))
      (== kind "MemberExpression") (renameMemberExpression ast oldName newName)
      ;invocations
      (= kind "CallExpression") (renameIdentifier (.-callee ast) oldName newName)
      (= kind "NewExpression") (renameIdentifier (.-callee ast) oldName newName)
      ;functiondefinition
      (= kind "FunctionDeclaration") (renameIdentifier (.-id ast) oldName newName)
      :else (println "type unknown"))))

(defn
  doRewrite
  "Performs a scheduled rewrite."
  [aRewrite]
  (let [kind (second aRewrite)]
    (cond
      (= kind "rename") 
        (astRename (first aRewrite) (first (last aRewrite)) (second (last aRewrite)))
      (= kind "encapsulateproperty") 
        (rewriteEncapsulateProperty+Getter (first aRewrite) (last aRewrite))
      (= kind "rewritetogetter")
        (rewriteToGetter (first aRewrite) (last aRewrite))
      :else (println "kind unknown"))))

(defn
  doRewrites
  "doRewrites will loop over the collection of scheduled rewrites
  and perform and delete them one after another."
  []
  (while (not (empty? @rewrites))
    (let [current (first @rewrites)] 
      (doRewrite current)
      (removeRewrite))))


;; The refactor function is implemented in the file jsr.clj because this is 
;;  a macro which must be declared in clojure not in clojurescript.
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;
;; Refactoring examples
;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;voorbeeld
(proj/analyze "function a(){}; a();")
(proj/analyze "function a(){}; a(); var x = a; x();")
(proj/analyze "function a(){}; a(); var x = a; x(); var z = {p : a}")
(proj/analyze "function a(){}; a(); var x = a; x(); var z = {p : a, z : 8}; var y = a();")
(proj/analyze "function a(){}; a(); var x = a; x(); var z = {p : a, z : 8}; var y = a(); var w = {a : 5};")
(proj/analyze "function a(){}; a(); var x = a; x(); var z = {p : a, z : 8}; var y = a(); var w = {a : {a : 6}};")
(proj/analyze "function a(){}; a(); var x = a; x(); var z = {p : a, z : 8}; var y = a(); var w = {a : function(){return 5;}};")
; retrieve function to be renamed from the AST.
(def funDec (first (l/run* [?f] (pred/functiondeclaration-name ?f "a"))))

(defn 
  rename-funcDec
  "The rename function declaration refactoring"
  [funcDec oldname newname]
  (refactor
    (jsr [?par] 
         (l/fresh [?id ?address ?name ?expr] 
                  (analysis/functiondeclaration-id-address funcDec ?id ?address)
                  (analysis/expression-address ?expr ?address)
                  (pred/child-parent ?expr ?par)))
    (fn [f] (scheduleRename f oldname newname)))
  )
(rename-funcDec funDec "a" "b")
(doRewrites)


(proj/analyze "var x = {a:5}; var y = function(){this.z = x;}; var yyy = new y();")
(proj/analyze "var x = {a:5}; var y = function(){this.z = x;}; var yyy = new y(); var bbb = yyy.z;")
(proj/analyze "var x = {a:5}; var y = function(){this.z = x;}; var yyy = new y(); var bbb = yyy.z; var c = function(){ var p = yyy.z;}; var ccc = new c();")
(proj/analyze "var x = {a:5}; var y = function(){this.z = x;}; var yyy = new y(); var bbb = yyy.z; var c = function(){ var z =0; var p = z;}; var ccc = new c();")
; retrieve the assignment expression to be encapsulated from the AST.
(def z-property (first (first (jsr [?x] 
                                   (l/fresh [?ide] 
                                            (pred/assignmentexpression ?x)
                                            (pred/ast "Identifier" ?x ?ide)
                                            (pred/identifier-name ?ide "z"))))))

(defn 
  encapsulateProperty
  "The encapsulate property refactoring"
  [property property-name]
  (refactor
    (list property)
    (fn [p] (scheduleEncapsulateProperty+Getter p property-name)))
  (refactor
    (jsr [?candidate] 
         (l/fresh [?oaddress ?pname ?propaddress ?expression ?ide] 
                  (analysis/oaddress-pname-pstring-paddress ?oaddress ?pname property-name ?propaddress)
                  (analysis/expression-address ?expression ?propaddress)
                  (pred/child-parent ?expression ?candidate)
                  (fails (= ?candidate property))
                  (pred/ast "Identifier" ?candidate ?ide)
                  (pred/identifier-name ?ide property-name)))
    (fn [c] (scheduleRewriteToGetter c property-name)))
  )
(encapsulateProperty z-property "z")
(doRewrites)
