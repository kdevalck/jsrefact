(ns jsrefact.project
	^{:doc "jsrefact.project support parsing and analyzation of Javascript
	code by using the Esprima parser and JIPDA analysis. "}
	(:use [esp :only [esprima parse]])
	(:require 
            [common :as comm]
            [lattice :as lat]
            [toplattice :as tlat]
            [setlattice :as slat]
            [cplattice :as clat]
            [jiaddress :as addr]
            [timedefa :as tdefa]
            [tagag :as tag]
            [concreteag :as conc]
            [benv.defaultBenv :as defb]
            [jistate :as sta]
            [jipdaast :as as]
            [visited :as vis]
            [concreteprinter :as concp]
            [jipda :as ji]
            [depend :as dep]
            [transform :as tra]
            [jijsanalysis :as jijsa]))

(def data (atom (hash-map)))

(defn-
	parseCode
	"Non-public.
	Parse the Javascript code and put it in the data atom."
  	[yourCode]
  	(let [parsed (js/createAst yourCode)
         		progrm (.-body parsed)]
         		(swap! data (fn [x] (assoc @data :code yourCode :parsed parsed :progrm progrm)))))

(defn-
	doAnalysis
	"Non-public.
	Do the analysis of the parsed code and put it in the data atom."
	[]
	(let [parsed (get @data :parsed)
		analysis (new js/JsAnalysis parsed)]
		(swap! data (fn [x] (assoc @data :jsa analysis)))))

(defn
	analyze
	"Do both the parsing and the analysis."
	[code]
	(parseCode code)
	(doAnalysis))

(defn
	jsa
	"Return the javascritp analysis object"
	[]
	(get @data :jsa))

(defn
	code
	"Return the original code that was parsed"
	[]
	(get @data :code))

(defn
	parsed
	"Return the parsed program"
	[]
	(get @data :parsed))

(defn
	program
	"Return the body of the parsed program"
	[]
	(get @data :progrm))