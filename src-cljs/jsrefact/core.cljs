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
;(def parsed (.parse esprimaParser "var i = 0; var x = null; var patt='true'; function Inc(){i = i++}; function Dec(){i = i--}; Inc(); Dec(); Dec();" (js* "{ loc: true }")))
(def parsed (.parse esprimaParser "var k = true; var l = 0; var m = 'test'; var n = [1,2];" (js* "{ loc: true }")))
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
  "Reify ?exp with all the 'ThisExpression's from the ast"
  [?this]
  (ast "ThisExpression" ?this))

(defn
  functiondeclarations
  "Reify ?exp with all the 'FunctionDeclaration's from the ast"
  [?functs]
  (ast "FunctionDeclaration" ?functs))

(defn
  expressionstatement
  "Reify ?exp with all the 'ExpressionStatement's from the ast"
  [?exp]
  (ast "ExpressionStatement" ?exp))

(defn
  name-l
  "Reification between ?name and the name property of ?ast"
  [?ast ?name]
  (l/project [?ast]
             (l/== ?name (.-name ?ast))))

(defn
  func-name
  "Reify ?funcname with the name property of functiondeclaration ?func
    ?func is a FunctionDeclaration object"
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

;(def one (first (l/run* [?n] (functiondeclarations ?n))))
;(l/run* [?calls] (functioncalls one ?calls))

(defn
  location
  "Reify ?loc with the location object from ?ast"
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


;(def z {})
;(def z (conj z ["test" 2]))

(defn
  inc-in-hash-map
  "Increase the value from a-key with one inside a-hash map
   If it doenst exist, create it with value 1"
  [a-hash a-key]
  (let [entry (a-hash a-key)]
    (if nil? entry)
      (conj a-hash [a-key 1])
      (conj a-hash [a-key (+ entry 1)])))

;(inc-in-hash-map z "test")
;z

; array = ArrayExpression
; string = Literal & value = string
; boolean = Literal & value = boolean
; number = Literal & value = number
; RegExp = Literal & value = RegExp

(defn
  array-expression
  "Reify ?arr with all arrayexpressions from input ?ast"
  [?ast ?arr]
  (ast-with-input "ArrayExpression" ?ast ?arr))

(defn
  literal
  "Reify ?lit with all literals from input ?ast"
  [?ast ?lit]
  (ast-with-input "Literal" ?ast ?lit))

(defn
  value
  "Reification of ?value with poperty 'value' of input ?ast"
  [?ast ?value]
  (l/project [?ast]
             (l/== ?value (.-value ?ast))))

(defn
  boolean?
  "Boolean type check"
  [val]
  (if (or (= val true) (= val false))
    true
    false))

; Result of all-object-kinds will appear in this hash map
(def all-object-kinds-result {})

(defn 
  register-object-kind
  "Register object kind in all-object-kinds-result hash map"
  [kind]
  (def all-object-kinds-result
    (inc-in-hash-map all-object-kinds-result kind)))


(defn
  literal-kinds
  "Check and registers all literal object kinds possible"
  [?lit]
  (l/fresh [?val]
           (value ?lit ?val)
           (l/project [?val]
                      (l/log ?val)
                      (l/conda [(l/== true (number? ?val)) (l/log "number") (l/== nil (register-object-kind "number"))]
                               [(l/== true (nil? ?val)) (l/log "nil") (l/== nil (register-object-kind "nil"))]
                               [(l/== true (string? ?val)) (l/log "string") (l/== nil (register-object-kind "string"))]
                               [(l/== true (boolean? ?val)) (l/log "bool") (l/== nil (register-object-kind "bool"))]))))

(defn
  all-object-kinds
  "Count different object kinds. 
   Result will be available in variable all-object-kinds-result"
  []
  (l/fresh [?p ?arr ?lit ?varDec] 
           (program ?p)
           (ast-with-input "VariableDeclarator" ?p ?varDec)
           (l/conde [(array-expression ?varDec ?arr)(l/log "an array")(l/project [?arr] (def all-object-kinds-result (inc-in-hash-map all-object-kinds-result "array")))]
                    [(literal ?varDec ?lit) (literal-kinds ?lit)]
                    )))

;(l/run* [?m] (all-object-kinds))
;all-object-kinds-result