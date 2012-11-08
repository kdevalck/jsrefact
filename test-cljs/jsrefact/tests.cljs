(ns jsrefact.tests
  (:require [jsrefact.tests.asttest :as ast]))

(def success 0)

(defn ^:export run []
  (ast/run)
  ; ... list all tests here
  (.log js/console "All test succeeded.")
  success)