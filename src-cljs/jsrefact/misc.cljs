(ns jsrefact.misc
	^{:doc "Miscellaneous function"
    :author "Kevin De Valck"}
  	(:refer-clojure :exclude [==])
	(:require-macros [cljs.core.logic.macros :as l]))

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