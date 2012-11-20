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
    		:only [membero]])
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
;(js-print (.-version y ))
(def parsed (.parse esprimaParser " var x = 42"))

(def progrm (atom (.pop (.-body parsed))))

;; Debug prints
;(js-print parsed)
;js-print @progrm)



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
    (l/== ?node @progrm)))

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
    Uses ?nodeIn as input ast"
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
      (l/log ?foundvals)
      (l/conde
        [(l/== true (ast? ?foundvals))
         (l/log "1" ?foundvals)
         (l/== ?val ?foundvals)]
        [(l/== true (instance? js/Array ?foundvals))
         (l/log "2" ?foundvals)
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
