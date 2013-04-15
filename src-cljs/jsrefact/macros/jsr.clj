(ns jsrefact.macros.jsr
    ^{:doc "JSRefact macros"
    :author "Kevin De Valck"}
    (:use [jsrefact.macros.logic])
    )

(defmacro
  	jsr
  	[logicvars & goals]
  	`(l/run* [resultvar#] 
            (l/fresh [~@logicvars]
                   (equals resultvar# [~@logicvars])
                   ~@goals)))


;(jsr [?x ?y] (identifier ?x) (identifier-name ?x ?y))