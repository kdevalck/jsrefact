(ns jsrefact.tests
  (:require [jsrefact.tests.predicatestest :as pred]
  			[jsrefact.tests.analysistest :as analysis]
  			[jsrefact.tests.refacttest :as refa]))

(def success 0)


(defn ^:export run []
  (println "Start all tests")
  (pred/run)
  (analysis/run)
  ;(refa/run)
  ; ... list all tests here
  (println "All tests succeeded.")
  (js/alert "All tests succeeded.")
  success)