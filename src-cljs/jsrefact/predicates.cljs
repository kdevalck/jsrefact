(ns jsrefact.predicates
  ^{:doc "Javascript AST predicates"
    :author "Coen De Roover & Kevin De Valck"}
  	(:refer-clojure :exclude [==])
  	(:use-macros
     		[cljs.core.logic.macros
        		:only [run run* == conde conda condu fresh defne matche all project trace-lvars log]])
  	(:require-macros [cljs.core.logic.macros :as l]
                    [clojure.tools.macro :as mu])
  	(:use
     		   [cljs.core.logic :only [membero]]
     [clojure.walk :only [walk]]
     [clojure.set :only [index]]
     [esp :only [esprima parse]])
    (:require [jipdaast :as as])
  	)

; Debug print in the javascript console
(defn 
  js-print
  "Print function to write to browser's console"
  [arg]
  (.log js/console arg))

(defn
  lprint
  "Logical browser console print"
  [?val]
  (l/project [?val]
    (l/== nil (js-print ?val))))

(set! *print-fn* js-print)

; Parsing Javascript using the Esprima parser
; http://esprima.org/
(def esprimaParser js/esprima)
(def code (atom ""))
(def parsed (atom (js/createAst @code)))
(def progrm (atom (.-body @parsed)))

(defn
  parseCode
  [paramcode]
  (swap! code (fn [progrmCode] paramcode))
  (swap! parsed (fn [parsedCode] (js/createAst @code)))
  (swap! progrm (fn [parsedprogramCode] (.-body @parsed))))

(parseCode "var x = 43")
;(parseCode "var ar = []; for (var i = 0; i < 1000; i++){ar[i] = i;}; ar;")
;(parseCode "var i = 0; var x = null; var patt='true'; function Inc(){i = i++}; function Dec(){i = i--}; Inc(); Dec(); Inc();" (js* "{ loc: true }"))
;(parseCode "function add1(n){return n+1}; var i = 0; function inc(f, p){return f(p)}; inc(add1,i);" (js* "{ loc: true }"))
;(parseCode "var k = true; var l = 0; var m = 'test'; var n = [1,2];" (js* "{ loc: true }"))




; Regenerating Javascript code from AST trees from the esprima parser
; https://github.com/Constellation/escodegen
;(def escodegenGenerator js/escodegen)
;(def versiontest (.-version escodegenGenerator))
; (def generated (.generate escodegenGenerator
;                           parsed
;                           (js* "{format: {
;                                     compact: true
;                                     }
;                            }")))


(defn
  ast-property-value
  "Retrieve the value of the specified property
    from the ast"
  [ast property]
  (aget ast property))

(defn
  ast-property-set-value
  "Set the value of the specified property
    int the ast"
  [ast property value]
  (aset ast property value)
  ast)

(defn
  ast-properties
  "Return a Seq of all properties of ast node using 
    javacscripts Object.keys(ast) function"
  [ast]
  (def temp (seq (.keys js/Object ast)))
  ; remove tag and toString properties from the list
  ;  because they are not native properties from the
  ;  ast. They are added by the JS parser used in JIPDA.
  (def mintag (remove #{"tag"} temp))
  (remove #{"toString"} mintag))

(defn
  ast-kind
  "Retrieve the ast kind by querying the value
    of the property 'type' "
  [ast]
  (ast-property-value ast "type"))

(defn
  ast?
  "Check for an AST (if it has a 'type' property) "
  [ast]
  (and (instance? js/Object ast)
       (not= nil (aget ast "type"))))

(defn
  program
  "Reifies ?node to the javascript program's ast object

  Example: (l/run* 
             [?p]
             (program ?p))
  "
  [?node]
  (l/all 
    ; @program is Array of AST's
    (membero ?node (seq @progrm))
    ))

; Forward declaration of child+
(declare child+)

(defn
  ast
  "Reification of the relation between an ast node ?node
  and its kind ?kind
  Uses program root"
  [?kind ?node]
  (l/fresh [?root]
           (program ?root)
           (l/conde
             [(l/== ?root ?node)]
             [(child+ ?root ?node)])
           (l/project [?node]
                      (l/== ?kind (ast-kind ?node)))))

(defn
  ast-property
  "Reification of the relation between an ast node ?node
  and its property ?prop
  Uses program root"
  [?prop ?node]
  (l/fresh [?root]
           (program ?root)
           (l/conde
             [(l/== ?root ?node)]
             [(child+ ?root ?node)])
           (l/project [?node]
                      (membero ?prop (ast-properties ?node)))))

(defn
  ast-property-with-input
  "Reification of the relation between an ast node ?node
  and its property ?prop
  Uses input as root node"
  [?prop ?input ?node]
  (l/fresh [?root]
           (l/== ?root ?input)
           (l/conde
             [(l/== ?root ?node)]
             [(child+ ?root ?node)])
           (l/project [?node]
                      (membero ?prop (ast-properties ?node)))))

(defn
  ast-with-input
  "Reification of the relation between an ast node ?node
    and its kind ?kind
    Uses ?nodeIn as input AST"
  [?kind ?nodeIn ?nodeOut]
  (l/fresh [?root]
    (l/== ?root ?nodeIn)
    (l/conde
      [(l/== ?root ?nodeOut)]
      [(child+ ?root ?nodeOut)])
    (l/project [?nodeOut]
      (l/== ?kind (ast-kind ?nodeOut)))
    ))


(defn
  has
  "Reification of the relation between a node and the value
    of its property.

    ?node : ast object
    ?property : a possible property of node
    ?value : value of the property ?property of ?node"
  [?property ?node ?value]
  (l/fresh [?kind ?properties]
    ;(ast ?kind ?node)
    (l/project [?node]
      (l/== ?properties (ast-properties ?node)))
    (membero ?property ?properties)
    (l/project [?property ?node]
      (l/== ?value (ast-property-value ?node ?property)))
    ))


(defn 
  child
  "Reification of the relation between an ast ?node
  and its astnode ?value that has a property 
  named ?property"
  [?prop ?node ?val]
  (l/fresh [?foundvals]
           (has ?prop ?node ?foundvals)
           (l/project [?foundvals]
                      (l/conde
                        [(l/== true (ast? ?foundvals))
                         (l/== ?val ?foundvals)]
                        [(l/== true (instance? js/Array ?foundvals))
                         (fresh [?s]
                                (l/== ?s (seq ?foundvals))
                                (membero ?val ?s))])
                      )))


(defn
  child+
  "?child is contained within ?node at a certain depth"
  [?node ?child]
  (l/fresh [?prop ?ch]
           (child ?prop ?node ?ch)
           (l/conde
             [(l/== ?child ?ch)]
             [(child+ ?ch ?child)])))


(defn
  thisexpression
  "Reify ?exp with all the 'ThisExpression's from the ast"
  [?this]
  (ast "ThisExpression" ?this))

(defn
  functiondeclaration
  "Reify ?exp with all the 'FunctionDeclaration's from the ast"
  [?funct]
  (ast "FunctionDeclaration" ?funct))

(defn
  expressionstatement
  "Reify ?exp with all the 'ExpressionStatement's from the ast"
  [?exp]
  (ast "ExpressionStatement" ?exp))

(defn 
  functionexpression
  "Reify ?exp with all the 'FunctionExpression's from the ast"
  [?exp]
  (ast "FunctionExpression" ?exp))

(defn
  newexpression
  "Reify ?exp with all the 'NewExpression's from the ast"
  [?exp]
  (ast "NewExpression" ?exp))

(defn
  ast-arrayexpression
  "Reify ?arr with all arrayexpressions from input ?ast"
  [?ast ?arr]
  (ast-with-input "ArrayExpression" ?ast ?arr))

(defn
  ast-literal
  "Reify ?lit with all literals from input ?ast"
  [?ast ?lit]
  (ast-with-input "Literal" ?ast ?lit))

(defn
  ast-value
  "Reification of ?value with poperty 'value' of input ?ast"
  [?ast ?value]
  (l/project [?ast]
             (l/== ?value (.-value ?ast))))

(defn
  ast-name
  [?ast ?name]
  (l/fresh [?p ?n]
    (ast-property "name" ?n)
    (l/project [?n]
      (l/== ?name (ast-property-value ?n "name"))
      (l/== ?n ?ast))))

(defn
  ast-name-with-input
  ""
  [?ast ?input ?name]
  (l/fresh [?p ?n]
    (ast-property-with-input "name" ?input ?n)
    (l/project [?n]
      (l/== ?name (ast-property-value ?n "name"))
      (l/== ?n ?ast))))

(defn
  ast-variabledeclarationwithname
  ""
  [?ast ?name]
  (l/conda
    [(l/lvaro ?name)
     (l/fresh [?x] (ast-name-with-input ?x ?ast ?name))]
    [(l/lvaro ?ast)
     (l/fresh [?vardec ?id]
              (ast "VariableDeclarator" ?vardec)
              (l/project [?vardec]
                         (l/== ?id (ast-property-value ?vardec "id"))
                         (l/project [?id]
                                    (l/conde 
                                      [(l/== ?name (ast-property-value ?id "name"))
                                       (l/== ?ast ?id)]))))]))
; TODO : add unit tests for ast-variabledeclarationwithname
;(def temp (first (l/run* [?x] (ast-variabledeclarationwithname ?x "x"))))
;(l/run* [?x] (ast-variabledeclarationwithname temp ?x)) ;result: "x"



(defn
  function-name
  "Reify ?funcname with the name property of functiondeclaration ?func
    ?func is a FunctionDeclaration object"
  [?func ?funcname]
  (ast-name (.-id ?func) ?funcname))

(defn
  invocationcall
  [?callee]
  (l/fresh [?expressionstatement ?expression]
           (expressionstatement ?expressionstatement)
           (has "expression" ?expressionstatement ?expression)
           (has "callee" ?expression ?callee)))

(defn
  function-invocation
  [?func ?invocation]
  (fresh [?funcName ?invoc ?invocName]
         (function-name ?func ?funcName)
         (invocationcall ?invoc)
         (ast-name ?invoc ?invocName)
         (l/== ?invocName ?funcName)
         (l/== ?invocation ?invoc)))

;; TODO : move to unit tests
;(def one (second (l/run* [?n] (pred/functiondeclaration ?n))))
; (l/run* 
;   [?calls]
;   (function-invocation one ?calls))

(defn
  ast-location
  ""
  [?ast ?startLine ?endLine ?startCol ?endCol]
  ; location params oppsplitsten in 4
  ; check for ast
  (l/project [?ast]
             ;(l/== true (ast? ?ast))
             (l/fresh [?loc]
                      (l/== ?loc (.-loc ?ast))
                      (l/project [?loc]
                                 (l/== ?startLine (.-line (.-start ?loc)))
                                 (l/== ?endLine (.-line (.-end ?loc)))
                                 (l/== ?startCol (.-column (.-start ?loc)))
                                 (l/== ?endCol (.-column (.-end ?loc)))
                                 ))))

;; TODO move to unittests
;; Tests for AST location
; (l/run* [?s] 
;        (l/fresh [?p ?e ?cs ?ce]
;                (program ?p)
;                (ast-location ?p ?s ?e ?cs ?ce)))
; (l/run* [?p] 
;         (l/fresh [?e ?cs ?ce]
;                (ast-location ?p 1 ?e ?cs ?ce)))
; (l/run* [?s]
;         (l/fresh [?p]
;                (program ?p)
;                (l/project [?p]
;                           (l/== ?s (ast? ?p)))))

(defn
  ast-length
  "Unify ?length with the length of ?ast"
  [?ast ?length]
  (l/fresh [?s ?e ?cs ?ce]
           (ast-location ?ast ?s ?e ?cs ?ce)
           (l/project [?e ?s]
                      (l/== ?length (- ?e ?s -1)))))

;; TODO : move into unittests
;; Test for AST-length
; (l/run* [?length] 
;         (l/fresh [?p]
;                (program ?p)
;                (ast-length ?p ?length)))

(defn
  functionlength
  ""
  [?length]
  (l/fresh [?f]
           (functiondeclaration ?f)
           (ast-length ?f ?length)))

;; TODO : move to unit tests
; (l/run* [?length] 
;                (functionlength ?length))

(defn
  average-function-lengths
  "Calculate average of all function lengths"
  []
  (let [lengths (l/run* [?length] (functionlength ?length))]
    (/ (walk #(* 1 %) 
             #(apply + %) 
             lengths)
       (count lengths))))

;(def sec (second (l/run* [?p] (program ?p))))
;(l/run* [?vals] (ast-location sec ?vals))
;(l/run* [?vals] (function-lines ?vals))
;(average-function-lengths)


;(def z {})
;(def z (conj z ["test" 2]))

(defn 
  countTypes
  "Return a hashmap with AST-type as key
    and a number how many times it appears"
  []
  (let [entries (l/run* [?k] (l/fresh [?n] (pred/ast ?k ?n)))]
     (into {} (frequencies entries))))
;(countTypes)