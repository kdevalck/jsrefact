(ns jsrefact.tests
  (:require 
        [jsrefact.tests.predicatestest :as pred]
  			[jsrefact.tests.analysistest :as analysis]
        [jsrefact.tests.rewritertest :as rewriter]
        [jsrefact.misc :as misc]))

(def success 0)

(set! *print-fn* misc/js-print)

(defn ^:export run []
  (println "Start all tests")
  (pred/run)
  (analysis/run)
  (rewriter/run)
  ; ... list all tests here
  (println "All tests succeeded.")
  (js/alert "All tests succeeded.")
  success)