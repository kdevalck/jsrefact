(ns jsrefact.tests
  (:require [jsrefact.tests.asttest :as ast]))

(def success 0)

(defn ^:export run []
  (ast/run)
  ; ... list all tests here
  (println "All test succeeded.")
  success)