(ns jsrefact.macros.logic
    ^{:doc "Extra logic goals for the AST & Analysis predicate library.
    Some of them reused from the ekeko project: https://github.com/cderoove/damp.ekeko/"
    :author "Coen De Roover & Kevin De Valck"}
  (:refer-clojure :exclude [==]))

(defn- 
  lvar-sym?
  [s]
  (= (first (str s)) \?))
 
(defn
  extract-vars
  [p]
  (set (cond
         (lvar-sym? p) [p]
         (coll? p) (filter lvar-sym? (flatten p))
         :else nil)))

(defmacro
  equals
  "Non-relational. Projects all logic variables on the right-hand side
   that start with a question mark (e.g., ?x), evaluates the resulting
   Clojure expression and unifies the result with the left hand-side. "
  [lvar exp]
  (let [expvars#  (extract-vars exp)] 
    `(l/project [~@expvars#]
      (l/== ~lvar ~exp))))

(defmacro 
  succeeds
   "Non-relational. Projects all logic variables on the right-hand side
   that start with a question mark (e.g., ?x) and verifies that 
   the resulting Clojure expression evaluates to true."
  [exp]
  `(equals true ~exp))

(defmacro 
  fails
   "Non-relational. Projects all logic variables on the right-hand side
   that start with a question mark (e.g., ?x) and verifies that 
   the resulting Clojure expression evaluates to false."
  [exp]
  `(equals false ~exp))

(defmacro
  projectlvars
  "TODO"
  [exp]
  (let [expvars#  (extract-vars exp)] 
    `(l/project [~@expvars#]
      ~exp)))
 