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

;example
;(jsr [?x ?y] (identifier ?x) (identifier-name ?x ?y))
;(jsr [?x ?y] (pred/identifier-name ?x ?y))

(defmacro
  refactor
  [preconditions transformations]
  `(let [resultOfPrec# ((fn [] ~preconditions))]
    (doall (map ~transformations (distinct (flatten resultOfPrec#))))))