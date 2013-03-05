(ns jsrefact.predicates
  ^{:doc "Javascript AST predicates"
    :author "Coen De Roover & Kevin De Valck"}
  	(:refer-clojure :exclude [==])
  	(:use-macros
     		[cljs.core.logic.macros
        		:only [run run* == conde conda condu fresh defne matche all project trace-lvars log]])
  	(:require-macros [cljs.core.logic.macros :as l]
                    [clojure.tools.macro :as mu])
  	(:use
     		   [cljs.core.logic :only [membero]]
     [clojure.walk :only [walk]]
     [clojure.set :only [index]]
     [esp :only [esprima parse]])
    (:require [jipdaast :as as]
              [jsrefact.misc :as misc]
              [jsrefact.project :as proj])
  	)

(set! *print-fn* misc/js-print)

;(proj/analyze "var x = 42;")

(defn
  ast-property-value
  "Retrieve the value of the specified property
    from the ast"
  [ast property]
  (aget ast property))

(defn
  ast-property-set-value
  "Set the value of the specified property
    int the ast"
  [ast property value]
  (aset ast property value)
  ast)

(defn
  ast-properties
  "Return a Seq of all properties of ast node using 
  javacscripts Object.keys(ast) function"
  [ast]
  (let [temp (seq (.keys js/Object ast))
        ; remove tag and toString properties from the list
        ;  because they are not native properties from the
        ;  ast. They are added by the JS parser used in JIPDA.
        mintag (remove #{"tag"} temp)]
    (remove #{"toString"} mintag)))

(defn
  ast-kind
  "Retrieve the ast kind by querying the value
    of the property 'type' "
  [ast]
  (ast-property-value ast "type"))

(defn
  ast?
  "Check for an AST (if it has a 'type' property) "
  [ast]
  (and (instance? js/Object ast)
       (not= nil (aget ast "type"))))

(defn
  program
  "Reifies ?node to the javascript program's ast object

  Example: (l/run* 
             [?p]
             (program ?p))
  "
  [?node]
  (l/all 
    ; @program is Array of AST's
    (membero ?node (seq (proj/program)))
    ))

; Forward declaration of child+
(declare child+)

(defn
  ast
  "With 2 params: Reification of the relation between an ast node ?node
  and its kind ?kind, uses program root.
  With 3 params: Same as with two params but param ?nodeIn can be a subtree
  of program root."
  ([?kind ?node]
    (l/fresh [?p]
           (program ?p)
           (ast ?kind ?p ?node)))
  ([?kind ?nodeIn ?nodeOut]
    (l/fresh [?root]
      (l/conda [(l/lvaro ?nodeIn)
               (l/fresh [?p] (program ?p)
                        (l/== ?root ?p))]
               [(l/== ?root ?nodeIn)])
      (l/conde
             [(l/== ?root ?nodeOut)]
             [(child+ ?root ?nodeOut)])
           (l/project [?nodeOut]
                      (l/== ?kind (ast-kind ?nodeOut)))
      )))


(defn
  ast-property
  "With 2 params: Reification of the relation between an ast node ?node
  and its property ?prop, uses program root.
  With 3 params: Same as with two params but param ?input can be subtree
  of program root"
  ([?prop ?node]
   (l/fresh [?p]
            (program ?p)
            (ast-property ?prop ?p ?node)))
  ([?prop ?input ?node]
   (l/fresh [?root]
            (l/conda 
              [(l/lvaro ?input)
               (l/fresh [?p] (program ?p)
                        (l/== ?root ?p))]
              [(l/== ?root ?input)])
            (l/conde
              [(l/== ?root ?node)]
              [(child+ ?root ?node)])
            (l/project [?node]
                       (membero ?prop (ast-properties ?node)))))
  )


(defn
  has
  "Reification of the relation between a node and the value
    of its property.

    ?node : ast object
    ?property : a possible property of node
    ?value : value of the property ?property of ?node"
  [?property ?node ?value]
  (l/fresh [?kind ?properties]
    ;(ast ?kind ?node)
    (l/project [?node]
      (l/== ?properties (ast-properties ?node)))
    (membero ?property ?properties)
    (l/project [?property ?node]
      (l/== ?value (ast-property-value ?node ?property)))
    ))


(defn 
  child
  "Reification of the relation between an ast ?node
  and its astnode ?value that has a property 
  named ?property"
  [?prop ?node ?val]
  (l/fresh [?foundvals]
           (has ?prop ?node ?foundvals)
           (l/project [?foundvals]
                      (l/conde
                        [(l/== true (ast? ?foundvals))
                         (l/== ?val ?foundvals)]
                        [(l/== true (instance? js/Array ?foundvals))
                         (fresh [?s]
                                (l/== ?s (seq ?foundvals))
                                (membero ?val ?s))])
                      )))


(defn
  child+
  "?child is contained within ?node at a certain depth"
  [?node ?child]
  (l/fresh [?prop ?ch]
           (child ?prop ?node ?ch)
           (l/conde
             [(l/== ?child ?ch)]
             [(child+ ?ch ?child)])))


(defn
  thisexpression
  "Reify ?exp with a 'ThisExpression' from the ast"
  [?this]
  (ast "ThisExpression" ?this))

(defn
  objectexpression
  "Reify ?exp with an 'ObjectExpression' from the ast"
  [?object]
  (ast "ObjectExpression" ?object))

(defn
  functiondeclaration
  "Reify ?exp with a 'FunctionDeclaration' from the ast"
  [?funct]
  (ast "FunctionDeclaration" ?funct))

(defn
  expressionstatement
  "Reify ?exp with an 'ExpressionStatement' from the ast"
  [?exp]
  (ast "ExpressionStatement" ?exp))

(defn 
  functionexpression
  "Reify ?exp with a 'FunctionExpression' from the ast"
  [?exp]
  (ast "FunctionExpression" ?exp))

(defn
  newexpression
  "Reify ?exp with a 'NewExpression' from the ast"
  [?exp]
  (ast "NewExpression" ?exp))

(defn
  arrayexpression
  "Reify ?exp with an 'ArrayExpression' from the ast"
  [?exp]
  (ast "ArrayExpression" ?exp))

(defn
  callexpression
  "Reify ?exp with an 'CallExpression' from the ast"
  [?exp]
  (ast "CallExpression" ?exp))

(defn
  memberexpression
  "Reify ?exp with an 'MemberExpression' from the ast"
  [?exp]
  (ast "MemberExpression" ?exp))

(defn
  variabledeclarator
  "Reify ?exp with an 'ArrayExpression' from the ast"
  [?decl]
  (ast "VariableDeclarator" ?decl))

(defn
  literal
  "Reify ?lit with a 'Literal' from the ast"
  [?lit]
  (ast "Literal" ?lit))


(defn
  literal-value
  "Reification of the relation between a literal ast ?ast and
  its value ?value."
  [?ast ?value]
  (all 
    (literal ?ast)
    (l/project [?ast]
               (l/== ?value (.-value ?ast)))))
;;; tests
; (l/run* [?v] (l/fresh [?l] (literal-value ?l ?v))) 42
; (l/run* [?l] (l/fresh [?v] (literal-value ?l ?v))) #<42>
; (l/run* [?l] (literal-value ?l 42)) #<42>
; (def xxx (first (l/run* [?l] (literal-value ?l 42)))) #<42>
; (l/run* [?l] (literal-value xxx ?l)) 42


(defn
  ast-name
  "Reification of the relation between an ast ?ast and
  its property name ?name."
  [?ast ?name]
  (l/fresh [?kind]
    (ast ?kind ?ast)
    (has "name" ?ast ?name)))

;;;tests
; (l/run* [?n] (ast-name ?n "x"))  (#<x>)
; (l/run* [?n] (ast-name ?n "y")) (#<y>)
; (l/run* [?n] (l/fresh [?x] (ast-name ?n ?x)))  (#<x> #<y>)
; (l/run* [?x] (l/fresh [?n] (ast-name ?n ?x)))  ("x" "y")
; (def namex (first (l/run* [?n] (l/fresh [?x] (ast-name ?n ?x)))))
; (l/run* [?n] (ast-name namex ?n)) ("x")


(defn
  variabledeclaration-name
  "Reification of the relation between an variabledeclaration ?decl and
  its name ?name."
  [?decl ?name]
  (l/fresh [?ide]
    (variabledeclarator ?decl) 
    (has "id" ?decl ?ide)
    (has "name" ?ide ?name)))

;;;tests
;(l/run* [?name] (l/fresh [?d] (variabledeclaration-name ?d ?name)))  "x"
; (l/run* [?d] (l/fresh [?name] (variabledeclaration-name ?d ?name))) #<x=42>
; (def varx (first (l/run* [?d] (l/fresh [?name] (variabledeclaration-name ?d ?name)))))
;(l/run* [?name] (variabledeclaration-name varx ?name))  "x"
; (l/run* [?d] (variabledeclaration-name ?d "x")) == varx


(defn
  functiondeclaration-name
  "Reification of the relation between a functiondeclaration ?decl and
  its name ?name."
  [?decl ?name]
  (l/fresh [?id]
    (functiondeclaration ?decl)
    (has "id" ?decl ?id)
    (has "name" ?id ?name)))

;;; tests
; (proj/analyze "function add1(n){return n+1}; function inc(f, p){return f(p)};")
; (l/run* [?x] (l/fresh [?n] (functiondeclaration-name ?n ?x)))  "add1" "inc"
; (l/run* [?n] (l/fresh [?x] (functiondeclaration-name ?n ?x)))  (#<function add1(n) {return n+1;};> #<function inc(f,p) {return f(p);};>)
; (l/run* [?x] (functiondeclaration-name ?x "inc")) #<function inc(f,p) {return f(p);};>
; (def xxx (first (l/run* [?n] (l/fresh [?x] (functiondeclaration-name ?n ?x)))))
; (l/run* [?x] (functiondeclaration-name xxx ?x)) "add1"


(defn 
  callexpression-callee
  "Reification of the relation between a callexpression and its
   callee."
  [?ca ?cal]
  (l/all
    (callexpression ?ca)
    (has "callee" ?ca ?cal)))

;tests
; (proj/analyze "function add1(n){return n+1}; function inc(f, p){return f(p)}; add1(5)")
; (l/run* [?x] (l/fresh [?n] (callexpression-callee ?n ?x))) (#<add1> #<f>)
; (def xxx (first (l/run* [?x] (l/fresh [?n] (callexpression-callee ?n ?x)))))  #<add1>
; (l/run* [?n] (callexpression-callee ?n xxx))  (#<add1(5)>)
; (def yyy (second (l/run* [?n] (callexpression ?n)))) #<f(p)>
; (l/run* [?n] (callexpression-callee yyy ?n))  (#<f>)

; (proj/analyze "var a = function () {}; var x = {a : a}; a(); this.a(); x.a();")
; (l/run* [?x] (l/fresh [?n] (callexpression-callee ?n ?x))) (#<a> #<this.a> #<x.a>)
; (def aaa (first (l/run* [?n] (l/fresh [?x] (callexpression-callee ?n ?x))))) #<a()>
; (l/run* [?x] (callexpression-callee aaa ?x)) (#<a>)


(defn
  callexpression-arguments
  "Reification of the relation between a callexpression and 
  its arguments."
  [?callexpr ?arguments]
  (l/fresh [?array]
  (callexpression ?callexpr)
  (has "arguments" ?callexpr ?array)
  (l/project [?array] (l/== ?arguments (seq ?array)))))

;;; tests
; (proj/analyze "var a = function (x, y, z) {}; a(1, 2, 3);")
; (l/run* [?arg] (l/fresh [?n] (callexpression-arguments ?n ?arg)))  ((#<1> #<2> #<3>))
; (def args (first (l/run* [?arg] (l/fresh [?n] (callexpression-arguments ?n ?arg)))))
; (l/run* [?n] (callexpression-arguments ?n args)) (#<a(1,2,3)>)
; (def callexpr (first (l/run* [?callexpr] (callexpression ?callexpr))))
; (l/run* [?args] (callexpression-arguments callexpr ?args)) ((#<1> #<2> #<3>))


(defn
  callexpression-argument
  "Reification of the relation between a callexpression and 
  one of its arguments"
  [?callexpr ?argument]
  (l/fresh [?args]
    (callexpression-arguments ?callexpr ?args)
    (membero ?argument ?args)))

;;; tests
; (l/run* [?arg] (l/fresh [?n] (callexpression-argument ?n ?arg))) (#<1> #<2> #<3>)
; (def firstarg (first (l/run* [?id] (literal ?id)))) #<1>
; (l/run* [?n] (callexpression-argument ?n firstarg)) (#<a(1,2,3)>)
; 


(defn
  functiondeclaration-callexpression
  "Reification of the relation betweeen a functiondeclaration and
  one of its callexpressions"
  [?decl ?callexpr]
  (l/fresh [?fname ?callee ?cname]
    (functiondeclaration-name ?decl ?fname)
    (callexpression-callee ?callexpr ?callee)
    (has "name" ?callee ?cname)
    (l/== ?fname ?cname)))

;;; tests
; (proj/analyze "function add1(n){return n+1}; add1(2);")
; (l/run* [?f] (l/fresh [?c] (functiondeclaration-callexpression ?f ?c)))  (#<function add1(n) {return n+1;};>)
; (l/run* [?c] (l/fresh [?f] (functiondeclaration-callexpression ?f ?c)))  (#<add1(2)>)
; (proj/analyze "function add1(n){return n+1}; add1(2); add1(3);")
; (def funcdecl (first (l/run* [?decl] (functiondeclaration ?decl))))  #<function add1(n) {return n+1;};>
; (l/run* [?c] (functiondeclaration-callexpression funcdecl ?c))  (#<add1(2)> #<add1(3)>)
; (def aCallExpr (first (l/run* [?exp] (callexpression ?exp))))
; (l/run* [?d] (functiondeclaration-callexpression ?d aCallExpr)) funcdecl
; (proj/analyze "function add1(n){return n+1}; add1(2); function b(n) {}; b(1)")
; (def b (second (l/run* [?f] (l/fresh [?c] (functiondeclaration-callexpression ?f ?c))))) #<function b(n) {};>
; (def bCall (first (l/run* [?c] (functiondeclaration-callexpression b ?c)))  (#<b(1)>)
; (l/run* [?f] (functiondeclaration-callexpression ?f bCall)) b


(defn 
  countTypes
  "Return a hashmap with AST-types as key
    and a number how many times it appears"
  []
  (let [entries (l/run* [?k] (l/fresh [?n] (ast ?k ?n)))]
     (into {} (frequencies entries))))
;(countTypes)