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
  objectexpression
  "Reify ?exp with an 'ObjectExpression' from the ast"
  [?exp]
  (ast "ObjectExpression" ?exp))

(defn
  catchclause
  "Reify ?clau with an 'CatchClause' from the ast"
  [?clau]
  (ast "CatchClause" ?clau))

(defn
  withstatement
  "Reify ?with with a with statement from the ast"
  [?with]
  (ast "WithStatement" ?with))

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


(defn
  ast-name
  "Reification of the relation between an ast ?ast and
  its property name ?name."
  [?ast ?name]
  (l/fresh [?kind]
    (ast ?kind ?ast)
    (has "name" ?ast ?name)))


(defn
  variabledeclaration-name
  "Reification of the relation between an variabledeclaration ?decl and
  its name ?name."
  [?decl ?name]
  (l/fresh [?ide]
    (variabledeclarator ?decl) 
    (has "id" ?decl ?ide)
    (has "name" ?ide ?name)))


(defn
  functiondeclaration-name
  "Reification of the relation between a functiondeclaration ?decl and
  its name ?name."
  [?decl ?name]
  (l/fresh [?id]
    (functiondeclaration ?decl)
    (has "id" ?decl ?id)
    (has "name" ?id ?name)))


(defn 
  callexpression-callee
  "Reification of the relation between a callexpression and its
   callee."
  [?ca ?cal]
  (l/all
    (callexpression ?ca)
    (has "callee" ?ca ?cal)))


(defn
  callexpression-arguments
  "Reification of the relation between a callexpression and 
  its arguments."
  [?callexpr ?arguments]
  (l/fresh [?array]
  (callexpression ?callexpr)
  (has "arguments" ?callexpr ?array)
  (l/project [?array] (l/== ?arguments (seq ?array)))))


(defn
  callexpression-argument
  "Reification of the relation between a callexpression and 
  one of its arguments"
  [?callexpr ?argument]
  (l/fresh [?args]
    (callexpression-arguments ?callexpr ?args)
    (membero ?argument ?args)))


(defn
  functiondefinition-callexpression
  "Reification of the relation between a functiondefinition and
  one of its callexpressions.
  Functiondefinition is either an functiondeclaration or functionexpression."
  [?decl ?callexpr]
  (l/fresh [?fname ?callee ?cname]
    (l/conde 
      [(variabledeclaration-name ?decl ?fname)]
      [(functiondeclaration-name ?decl ?fname)])
    (callexpression-callee ?callexpr ?callee)
    (has "name" ?callee ?cname)
    (l/== ?fname ?cname)))


(defn 
  countTypes
  "Return a hashmap with AST-types as key
    and a number how many times it appears"
  []
  (let [entries (l/run* [?k] (l/fresh [?n] (ast ?k ?n)))]
     (into {} (frequencies entries))))
;(countTypes)