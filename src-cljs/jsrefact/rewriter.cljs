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

; Main container of smaller rewrite fragments. 
;	FIFO-based.
;	A rewrite fragment consist out of 3 parts
;		1 part of the ast
;		2 kind of rewrite: string
;		3 list of extra parameters
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
  	scheduleRename
  	"TODO: doc"
  	[ast oldname newname & other]
  	(let [rewr (list ast "rename" (list oldname newname other))]
     		(scheduleRewrite rewr)
     		true))

(defn 
  	renameIdentifier
  	"TODO: doc"
  	[ast oldValue newValue]
  	(if (= (pred/ast-kind ast) "Identifier")
     	(if (= (pred/ast-property-value ast "name") oldValue)
        		(pred/ast-property-set-value ast "name" newValue)
        		(println (+ (pred/ast-property-value ast "name") " is not " oldValue)))))

(defn
  	createIdentifier
  	"TODO: doc"
  	[newname]
  	(let [obj (new js/Object)]
     		(pred/ast-property-set-value obj "type" "Identifier")
     		(pred/ast-property-set-value obj "name" newname)))

(defn
  	renameMemberExpression
  	"TODO: doc"
  	[ast oldValue newValue choice]
  	(if (= choice "object")
     		(renameIdentifier (.-object ast) oldValue newValue)
     		(if (= (.-computed ast) false)
         			(renameIdentifier (.-property ast) oldValue newValue)
         			(pred/ast-property-set-value ast "property" (createIdentifier newValue)))))

(defn
  	doRewriteRename
  	"TODO: doc"
  	[Rename]
  	(let 
     		[ast (first Rename)
        		oldValue (first (last Rename))
        		newValue (second (last Rename))
        		kind (pred/ast-kind ast)]
     		(println (+ "Rename " oldValue " to " newValue))
     		(cond
         			(= kind "Identifier") (renameIdentifier ast oldValue newValue)
         			(= kind "Property") (renameIdentifier (.-key ast) oldValue newValue)
         			(= kind "VariableDeclarator") (renameIdentifier (.-id ast) oldValue newValue)
         			(= kind "MemberExpression") (renameMemberExpression ast oldValue newValue (first (nth (last Rename) 2)))
         			;invocations
         			(= kind "CallExpression") (renameIdentifier (.-callee ast) oldValue newValue) ; to be tested
         			(= kind "NewExpression") (renameIdentifier (.-callee ast) oldValue newValue); to be tested
         			;functiondefinition
         			(= kind "FunctionDeclaration") (renameIdentifier (.-id ast) oldValue newValue); to be tested
         			:else ast)))

(defn
  	doRewrite
  	"TODO: doc"
  	[aRewrite]
  	(let [kind (second aRewrite)]
     		(cond
         			(= kind "rename") (doRewriteRename aRewrite))))

(defn
  	doRewrites
  	"TODO: doc"
  	[]
  	(while (not (empty? @rewrites))
     		(let [current (first @rewrites)] 
         			(doRewrite current)
         			(removeRewrite)))
  	(proj/recreateCode)
  	(proj/analyze (proj/code)))

;;; TEST
; (proj/analyze "var x = 42;")
; (l/run* [?res] (l/fresh [?x] (pred/identifier ?x) (l/project [?x] (l/== ?res (scheduleRename ?x "x" "y")))))
; (doRewrites)