(ns jsrefact.core
	(:refer-clojure :exclude [==])
  	(:use-macros
   		[cljs.core.logic.macros
    		:only [run run* == conde conda condu fresh defne matche all project]])
  	(:require-macros [cljs.core.logic.macros :as l]
                   [clojure.tools.macro :as mu])
  	(:use
		   [cljs.core.logic
    		:only [membero]])
	(:require [esp :as es]))

; Debug print in the javascript console
(defn 
  js-print
  "Print function to write to browser's console"
  [arg]
	(.log js/console arg))

; Function to test unit testing
(defn 
  add-some-numbers 
  [& numbers]
  (apply + numbers))


; Parsing Javascript using the Esprima parser
; http://esprima.org/
(def esprimaParser js/esprima)
;(js-print (.-version y ))
(def parsed (.parse esprimaParser " var x = 42"))
;(js-print parsed)
(def progrm (.pop (.-body parsed)))
;(js-print progrm)
;(js-print (.keys (js* "Object") "test"))
;(js-print (.keys js/Object program))



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

;(js-print (ast-kind parsed))
;(js-print (=  nil (aget (js* "5") "type")))

(defn
  ast?
  "Check for an AST (if it has a 'type' property) "
  [ast]
  (not= nil (aget ast "type")))

(defn
  program
  "Reifies ?node to the javascript program's ast object

  Example: (js-print (l/run* 
                       [?p]
                       (program ?p)))
  "
  [?node]
  (l/all 
    (l/== ?node progrm)))

; Forward declaration of child+
(declare child+)

(defn
  ast
  "Reification of the relation between an ast node ?node
    and its kind ?kind"
  [?kind ?node]
  (l/fresh [?root]
    (program ?root)
    (l/conde
      [(l/== ?root ?node)]
      [(child+ ?root ?node)
        ])
    (l/project [?node]
      (l/== ?kind (ast-kind ?node)))
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
  [?property ?node ?value]
  (l/fresh [?actual-value]
    (has ?property ?node ?actual-value)
    (l/project [?actual-value]
      (l/conda
        [(l/== true (ast? ?actual-value))
          (l/== ?value ?actual-value)]
        [(l/== true (instance? js/Array ?actual-value))
         (membero ?value (seq ?actual-value))])
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



;(js-print 
;   (first (l/run* [?child]
;    (l/fresh [?p]
;      (program ?p)
;      (child+ ?p ?child)))))
