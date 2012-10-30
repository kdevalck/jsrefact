(ns cltest
	(:require-macros [cljs.core.logic.macros :as m])
  	(:use [cljs.core.logic :only [membero]])
	(:require [esp :as es]))

; Testing core.logic in Clojurescript
(def x (m/run 1 [q]
  (membero q '(:cat :dog :bird :bat :debra))))
(.log js/console x)


; Testing the esprima parser in Clojurescript
(def y js/esprima)
(.log js/console (.-version y ))
(def parsed (.parse y "var z = 42"))
(.log js/console parsed)


;(.log js/console "test" 1 2 3 4)
