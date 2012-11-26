(ns jsrefact.core
  ^{:doc "TO BE UPDATED"
    :author "Coen De Roover & Kevin De Valck"}
	(:refer-clojure :exclude [==])
  	(:use-macros
   		[cljs.core.logic.macros
    		:only [run run* == conde conda condu fresh defne matche all project trace-lvars log]])
  	(:require-macros [cljs.core.logic.macros :as l]
                   [clojure.tools.macro :as mu])
  	(:use
		   [cljs.core.logic
    		:only [membero]][clojure.walk 
           :only [walk]])
	(:require [esp :as es]
            [clojure.browser.repl :as repl]))

;; browser connected REPL
(repl/connect "http://localhost:9000/repl")

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
;(def parsed (.parse esprimaParser " var x = 42"))
;(def parsed (.parse esprimaParser "var ar = []; for (var i = 0; i < 1000; i++){ar[i] = i;}; ar;"))
(def parsed (.parse esprimaParser "var i = 0; function Inc(){i = i++}; function Dec(){i = i--}; Inc(); Dec(); Dec();" (js* "{ loc: true }")))
(def progrm (atom (.-body parsed)))

;; Debug prints
(js-print parsed)
(js-print @progrm)



(defn
  ast-property-value
  "Retrieve the value of the specified property
    from the ast"
  [ast property]
  (aget ast property))

(defn
  ast-properties
  "Return a Seq of all properties of ast node using 
    javacscripts Object.keys(ast) function"
  [ast]
  (seq (.keys js/Object ast)))

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
    ;(l/== ?node @progrm)
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
      (l/== ?kind (ast-kind ?node)))
    ))

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
  thisexpressions
  ""
  [?this]
  (ast "ThisExpression" ?this))

(defn
  functiondeclarations
  ""
  [?functs]
  (ast "FunctionDeclaration" ?functs))

(defn
  expressionstatement
  ""
  [?exp]
  (ast "ExpressionStatement" ?exp))

(defn
  name-l
  ""
  [?a ?name]
  (l/project [?a]
             (l/== ?name (.-name ?a))))

(defn
  func-name
  "?func is a FunctionDeclaration object"
  [?func ?funcname]
  (name-l (.-id ?func) ?funcname))

(defn
  functioncalls
  "?func is an AST containing a function declaration
  ?calls is an AST which contains a callee of above function declaration"
  [?func ?calls]
  (fresh [?funcName ?allCalls ?expressions ?callees ?allCallNames]
         (func-name ?func ?funcName)
         (expressionstatement ?allCalls)
         (has "expression" ?allCalls ?expressions)
         (has "callee" ?expressions ?callees)
         (name-l ?callees ?allCallNames)
         (l/== ?allCallNames ?funcName)
         (l/== ?calls ?allCalls)))

(def one (first (l/run* [?n] (functiondeclarations ?n))))
(l/run* [?calls] (functioncalls one ?calls))

(defn
  location
  "Unify ?loc with the location object from ?ast"
  [?ast ?loc]
  (l/project [?ast]
  (l/== ?loc (.-loc ?ast))))

(defn
  ast-location
  "Location object parameters from ?ast AST to collection
  Collection elements:
    - Start line
    - End line
    - Start column
    - End column "
  [?ast ?locationParams]
  (l/fresh [?locObject]
         (location ?ast ?locObject)
         (l/log ?ast)
         (l/project [?locObject]
                    (l/== ?locationParams (let [startLine (.-line (.-start ?locObject))
                                                endLine (.-line (.-end ?locObject))
                                                startCol (.-column (.-start ?locObject))
                                                endCol (.-column (.-end ?locObject))]
                                            [startLine endLine startCol endCol]
                                            )))
         )
  )

(defn
  lines
  "Reifies ?lines with the amount of lines of this ast object"
  [?ast ?lines]
  (l/fresh [?loc]
           (location ?ast ?loc)
           (l/project [?loc]
                      (l/== ?lines
                            (let [startLine (.-line (.-start ?loc))
                                  endLine (.-line (.-end ?loc))]
                              (- endLine startLine -1))))))

(defn
  function-lines
  "Reifies ?lines with the length of all functions"
  [?lines]
  (fresh [?n]
         (functiondeclarations ?n)
         (lines ?n ?lines)))

(defn
  average-function-lines
  "Calculate average of all function lines"
  []
  (let [lines (l/run* [?vals] (function-lines ?vals))]
    (/ (walk #(* 1 %) 
             #(apply + %) 
             lines)
       (count lines))))

;(def sec (second (l/run* [?p] (program ?p))))
;(l/run* [?vals] (ast-location sec ?vals))
;(l/run* [?vals] (function-lines ?vals))
;(average-function-lines)