(ns jsrefact.rewriter
  ^{:doc "Basis Javascript AST rewriting utilities"
    :author "Kevin De Valck"}
  (:use [esp :only [esprima parse]]
        [cljs.core.logic :only [membero lvaro nonlvaro conda conde conso flatteno failed?]])
  (:require-macros [cljs.core.logic.macros :as l])
  	(:require 
     [jsrefact.project :as proj]
     [jsrefact.predicates :as pred]
     [jsrefact.analysis :as analysis]
     [jsrefact.misc :as misc]))

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
  renameIdentifier
  "TODO: doc"
  [ide oldname newname]
  (if 
    (and
      (== (pred/ast-kind ide) "Identifier")
      (== (ast-property-value ide "name") oldname))
    (ast-change-property ide "name" newname)
    (println (+ (ast-property-value ide "name") " is not " oldname))))

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
  astRename
  [ast oldName newName]
  (let [kind (pred/ast-kind ast)]
    (cond
      (== kind "Identifier") (renameIdentifier ast oldName newName)
      (== kind "Property") (renameIdentifier (.-key ast) oldName newName)
      (== kind "VariableDeclarator") (renameIdentifier (.-id ast) oldName newName)
      (== kind "MemberExpression") (renameMemberExpression ast oldName newName)
      ;invocations
      (= kind "CallExpression") (renameIdentifier (.-callee ast) oldName newName)
      (= kind "NewExpression") (renameIdentifier (.-callee ast) oldName newName)
      ;functiondefinition
      (= kind "FunctionDeclaration") (renameIdentifier (.-id ast) oldName newName)
      )))


(defn
  refactor
  "transformation should be a lambda which shall receive the result of 
   the preconditions and transform them."
  [preconditions transformation]
        ; result of evaluation of preconditions should be put into resultOfPrec
  (let [resultOfPrec []]
    ; foreach of the result elements received from the preconditions
    ;  the transformation should be performed.
    (transformation resultOfPrec)
  ))