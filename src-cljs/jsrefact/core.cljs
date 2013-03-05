(ns jsrefact.core
  ^{:doc "Core JSRefact file"
    :author "Kevin De Valck"}
  	(:refer-clojure :exclude [==])
  	(:use-macros
     		[cljs.core.logic.macros
        		:only [run run* == conde conda condu fresh defne matche all project trace-lvars log]])
  	(:require-macros [cljs.core.logic.macros :as l]
                    [clojure.tools.macro :as mu])
  	(:use [clojure.walk :only [walk]])
  	(:require [clojure.browser.repl :as repl]))


;; browser connected REPL
(repl/connect "http://localhost:9000/repl")


