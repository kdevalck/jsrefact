(ns jsrefact.tests.refacttest
  	(:use-macros [cljs.core.logic.macros :only [run*]])
  	(:require-macros [cljs.core.logic.macros :as l])
  	(:use [jsrefact.predicates :only [js-print esprimaParser ast-kind ast-property-value ast-property-set-value
                               		ast-property ast-properties ast? program child parsed has progrm child+ ast ast-with-input]])
  )


; Small tryouts for refactorings

;(def parsedTest (js/createAst "var x = 1;"))
;(def parsedTest (js/createAst "var x = 1; var y = 7;"))
;(def progrmTest (.-body parsedTest))
;(swap! progrm (fn [progrmT] progrmTest))

; (js-print parsedTest)
; (js-print (count (l/run* [?r] 
; 	(l/fresh [?node]
; 		(ast "Identifier" ?node)
; 		(l/conde [
; 			(l/project [?node]
; 				(l/== "x" (ast-property-value ?node "name"))
; 				)
; 			(l/== ?r ?node)])))))


(defn
  ast-property-set-value
  "Set the value of the specified property
    int the ast"
  [ast property value]
  (aset ast property value)
  ast)

(defn
  ast-tag
  "Retrieve the ast tag by querying the value
    of the property 'tag' "
  [ast]
  (ast-property-value ast "tag"))

(defn
	ast-tagged
  	""
  	 [tag-number]
  	 (first (l/run* [?node]
  	 	(ast-property "tag" ?node)
  	 	(l/project [?node]
  	 		(l/== tag-number (ast-property-value ?node "tag"))))))

(defn 
	jsr-ast-replace-property
	""
	[tag-number property new-value]
	(l/run* [?out]
		(l/fresh [?node]
			(l/== ?node (ast-tagged tag-number))
			(l/project [?node] 
				(l/== ?out (ast-property-set-value ?node property new-value))))))

;(js-print (.-name (first (jsr-ast-replace-property 24 "name" "y"))))
;(js-print parsedTest)
;(ast-tagged 24)
; debug run to see the tag numbers of ast's
; (l/run* [?r]
; 		(l/fresh [?node]
; 			(ast-property "tag" ?node)
; 			(l/project [?node]
; 				(l/== ?r (ast-tag ?node))
; 				)))



