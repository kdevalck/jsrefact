goog.provide('jsrefact.core');
goog.require('cljs.core');
goog.require('cljs.core.logic');
goog.require('clojure.walk');
goog.require('clojure.browser.repl');
goog.require('esp');
goog.require('clojure.walk');
goog.require('cljs.core.logic');
clojure.browser.repl.connect.call(null,"http://localhost:9000/repl");
/**
* Print function to write to browser's console
*/
jsrefact.core.js_print = (function js_print(arg){
return console.log(arg);
});
/**
* Logical browser console print
*/
jsrefact.core.lprint = (function lprint(_QMARK_val){
return (function (a14148){
var _QMARK_val__$1 = cljs.core.logic._walk_STAR_.call(null,a14148,_QMARK_val);
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,null,jsrefact.core.js_print.call(null,_QMARK_val__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14148);
});
});
cljs.core._STAR_print_fn_STAR_ = jsrefact.core.js_print;
jsrefact.core.esprimaParser = esprima;
jsrefact.core.parsed = jsrefact.core.esprimaParser.parse("var k = true; var l = 0; var m = 'test'; var n = [1,2];",{ loc: true });
jsrefact.core.progrm = cljs.core.atom.call(null,jsrefact.core.parsed.body);
jsrefact.core.js_print.call(null,jsrefact.core.parsed);
jsrefact.core.js_print.call(null,cljs.core.deref.call(null,jsrefact.core.progrm));
/**
* Retrieve the value of the specified property
* from the ast
*/
jsrefact.core.ast_property_value = (function ast_property_value(ast,property){
return (ast[property]);
});
/**
* Return a Seq of all properties of ast node using
* javacscripts Object.keys(ast) function
*/
jsrefact.core.ast_properties = (function ast_properties(ast){
return cljs.core.seq.call(null,Object.keys(ast));
});
/**
* Retrieve the ast kind by querying the value
* of the property 'type'
*/
jsrefact.core.ast_kind = (function ast_kind(ast){
return jsrefact.core.ast_property_value.call(null,ast,"type");
});
/**
* Check for an AST (if it has a 'type' property)
*/
jsrefact.core.ast_QMARK_ = (function ast_QMARK_(ast){
var and__3822__auto__ = cljs.core.instance_QMARK_.call(null,Object,ast);
if(and__3822__auto__)
{return cljs.core.not_EQ_.call(null,null,(ast["type"]));
} else
{return and__3822__auto__;
}
});
/**
* Reifies ?node to the javascript program's ast object
* 
* Example: (l/run*
* [?p]
* (program ?p))
* 
*/
jsrefact.core.program = (function program(_QMARK_node){
return (function (a__2949__auto__){
return cljs.core.logic._bind.call(null,a__2949__auto__,cljs.core.logic.membero.call(null,_QMARK_node,cljs.core.seq.call(null,cljs.core.deref.call(null,jsrefact.core.progrm))));
});
});
/**
* Reification of the relation between an ast node ?node
* and its kind ?kind
* Uses program root
*/
jsrefact.core.ast = (function ast(_QMARK_kind,_QMARK_node){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_root = cljs.core.logic.lvar.call(null,"\uFDD1'?root");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.program.call(null,_QMARK_root)),(function (a14151){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a14151,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_root,_QMARK_node);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a14151,jsrefact.core.child_PLUS_.call(null,_QMARK_root,_QMARK_node));
}))));
})));
})),(function (a14152){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a14152,_QMARK_node);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_kind,jsrefact.core.ast_kind.call(null,_QMARK_node__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14152);
}));
})));
});
});
/**
* Reification of the relation between an ast node ?node
* and its kind ?kind
* Uses ?nodeIn as input AST
*/
jsrefact.core.ast_with_input = (function ast_with_input(_QMARK_kind,_QMARK_nodeIn,_QMARK_nodeOut){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_root = cljs.core.logic.lvar.call(null,"\uFDD1'?root");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_root,_QMARK_nodeIn);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a14155){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a14155,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_root,_QMARK_nodeOut);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a14155,jsrefact.core.child_PLUS_.call(null,_QMARK_root,_QMARK_nodeOut));
}))));
})));
})),(function (a14156){
var _QMARK_nodeOut__$1 = cljs.core.logic._walk_STAR_.call(null,a14156,_QMARK_nodeOut);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_kind,jsrefact.core.ast_kind.call(null,_QMARK_nodeOut__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14156);
}));
})));
});
});
/**
* Reification of the relation between a node and the value
* of its property.
* 
* ?node : ast object
* ?property : a possible property of node
* ?value : value of the property ?property of ?node
*/
jsrefact.core.has = (function has(_QMARK_property,_QMARK_node,_QMARK_value){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_kind = cljs.core.logic.lvar.call(null,"\uFDD1'?kind");
var _QMARK_properties = cljs.core.logic.lvar.call(null,"\uFDD1'?properties");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a14159){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a14159,_QMARK_node);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_properties,jsrefact.core.ast_properties.call(null,_QMARK_node__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14159);
})),cljs.core.logic.membero.call(null,_QMARK_property,_QMARK_properties)),(function (a14160){
var _QMARK_property__$1 = cljs.core.logic._walk_STAR_.call(null,a14160,_QMARK_property);
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a14160,_QMARK_node);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_value,jsrefact.core.ast_property_value.call(null,_QMARK_node__$1,_QMARK_property__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14160);
}));
})));
});
});
/**
* Reification of the relation between an ast ?node
* and its astnode ?value that has a property
* named ?property
*/
jsrefact.core.child = (function child(_QMARK_prop,_QMARK_node,_QMARK_val){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_foundvals = cljs.core.logic.lvar.call(null,"\uFDD1'?foundvals");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.has.call(null,_QMARK_prop,_QMARK_node,_QMARK_foundvals)),(function (a14163){
var _QMARK_foundvals__$1 = cljs.core.logic._walk_STAR_.call(null,a14163,_QMARK_foundvals);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a14164){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a14164,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,jsrefact.core.ast_QMARK_.call(null,_QMARK_foundvals__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_val,_QMARK_foundvals__$1);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a14164,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,cljs.core.instance_QMARK_.call(null,Array,_QMARK_foundvals__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2897__auto____$2){
return (new cljs.core.logic.Inc((function (){
var _QMARK_s = cljs.core.logic.lvar.call(null,"\uFDD1'?s");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$2,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_s,cljs.core.seq.call(null,_QMARK_foundvals__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),cljs.core.logic.membero.call(null,_QMARK_val,_QMARK_s));
})));
}));
}))));
})));
}));
})));
}).call(null,a14163);
}));
})));
});
});
/**
* ?child is contained within ?node at a certain depth
*/
jsrefact.core.child_PLUS_ = (function child_PLUS_(_QMARK_node,_QMARK_child){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_prop = cljs.core.logic.lvar.call(null,"\uFDD1'?prop");
var _QMARK_ch = cljs.core.logic.lvar.call(null,"\uFDD1'?ch");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.child.call(null,_QMARK_prop,_QMARK_node,_QMARK_ch)),(function (a14166){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a14166,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_child,_QMARK_ch);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a14166,child_PLUS_.call(null,_QMARK_ch,_QMARK_child));
}))));
})));
}));
})));
});
});
/**
* Reify ?exp with all the 'ThisExpression's from the ast
*/
jsrefact.core.thisexpressions = (function thisexpressions(_QMARK_this){
return jsrefact.core.ast.call(null,"ThisExpression",_QMARK_this);
});
/**
* Reify ?exp with all the 'FunctionDeclaration's from the ast
*/
jsrefact.core.functiondeclarations = (function functiondeclarations(_QMARK_functs){
return jsrefact.core.ast.call(null,"FunctionDeclaration",_QMARK_functs);
});
/**
* Reify ?exp with all the 'ExpressionStatement's from the ast
*/
jsrefact.core.expressionstatement = (function expressionstatement(_QMARK_exp){
return jsrefact.core.ast.call(null,"ExpressionStatement",_QMARK_exp);
});
/**
* Reification between ?name and the name property of ?ast
*/
jsrefact.core.name_l = (function name_l(_QMARK_ast,_QMARK_name){
return (function (a14168){
var _QMARK_ast__$1 = cljs.core.logic._walk_STAR_.call(null,a14168,_QMARK_ast);
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_name,_QMARK_ast__$1.name);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14168);
});
});
/**
* Reify ?funcname with the name property of functiondeclaration ?func
* ?func is a FunctionDeclaration object
*/
jsrefact.core.func_name = (function func_name(_QMARK_func,_QMARK_funcname){
return jsrefact.core.name_l.call(null,_QMARK_func.id,_QMARK_funcname);
});
/**
* ?func is an AST containing a function declaration
* ?calls is an AST which contains a callee of above function declaration
*/
jsrefact.core.functioncalls = (function functioncalls(_QMARK_func,_QMARK_calls){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_funcName = cljs.core.logic.lvar.call(null,"\uFDD1'?funcName");
var _QMARK_allCalls = cljs.core.logic.lvar.call(null,"\uFDD1'?allCalls");
var _QMARK_expressions = cljs.core.logic.lvar.call(null,"\uFDD1'?expressions");
var _QMARK_callees = cljs.core.logic.lvar.call(null,"\uFDD1'?callees");
var _QMARK_allCallNames = cljs.core.logic.lvar.call(null,"\uFDD1'?allCallNames");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.func_name.call(null,_QMARK_func,_QMARK_funcName)),jsrefact.core.expressionstatement.call(null,_QMARK_allCalls)),jsrefact.core.has.call(null,"expression",_QMARK_allCalls,_QMARK_expressions)),jsrefact.core.has.call(null,"callee",_QMARK_expressions,_QMARK_callees)),jsrefact.core.name_l.call(null,_QMARK_callees,_QMARK_allCallNames)),(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_allCallNames,_QMARK_funcName);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_calls,_QMARK_allCalls);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
});
});
/**
* Reify ?loc with the location object from ?ast
*/
jsrefact.core.location = (function location(_QMARK_ast,_QMARK_loc){
return (function (a14170){
var _QMARK_ast__$1 = cljs.core.logic._walk_STAR_.call(null,a14170,_QMARK_ast);
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_loc,_QMARK_ast__$1.loc);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14170);
});
});
/**
* Location object parameters from ?ast AST to collection
* Collection elements:
* - Start line
* - End line
* - Start column
* - End column
*/
jsrefact.core.ast_location = (function ast_location(_QMARK_ast,_QMARK_locationParams){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_locObject = cljs.core.logic.lvar.call(null,"\uFDD1'?locObject");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.location.call(null,_QMARK_ast,_QMARK_locObject)),(function (a__2955__auto__){
cljs.core.println.call(null,_QMARK_ast);
return a__2955__auto__;
})),(function (a14172){
var _QMARK_locObject__$1 = cljs.core.logic._walk_STAR_.call(null,a14172,_QMARK_locObject);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_locationParams,(function (){var startLine = _QMARK_locObject__$1.start.line;
var endLine = _QMARK_locObject__$1.end.line;
var startCol = _QMARK_locObject__$1.start.column;
var endCol = _QMARK_locObject__$1.end.column;
return cljs.core.PersistentVector.fromArray([startLine,endLine,startCol,endCol], true);
})());
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14172);
}));
})));
});
});
/**
* Reifies ?lines with the amount of lines of this ast object
*/
jsrefact.core.lines = (function lines(_QMARK_ast,_QMARK_lines){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_loc = cljs.core.logic.lvar.call(null,"\uFDD1'?loc");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.location.call(null,_QMARK_ast,_QMARK_loc)),(function (a14174){
var _QMARK_loc__$1 = cljs.core.logic._walk_STAR_.call(null,a14174,_QMARK_loc);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_lines,(function (){var startLine = _QMARK_loc__$1.start.line;
var endLine = _QMARK_loc__$1.end.line;
return ((endLine - startLine) - -1);
})());
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14174);
}));
})));
});
});
/**
* Reifies ?lines with the length of all functions
*/
jsrefact.core.function_lines = (function function_lines(_QMARK_lines){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_n = cljs.core.logic.lvar.call(null,"\uFDD1'?n");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.functiondeclarations.call(null,_QMARK_n)),jsrefact.core.lines.call(null,_QMARK_n,_QMARK_lines));
})));
});
});
/**
* Calculate average of all function lines
*/
jsrefact.core.average_function_lines = (function average_function_lines(){
var lines = cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_vals = cljs.core.logic.lvar.call(null,"\uFDD1'?vals");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.function_lines.call(null,_QMARK_vals)),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_vals),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})());
return (clojure.walk.walk.call(null,(function (p1__14175_SHARP_){
return (1 * p1__14175_SHARP_);
}),(function (p1__14176_SHARP_){
return cljs.core.apply.call(null,cljs.core._PLUS_,p1__14176_SHARP_);
}),lines) / cljs.core.count.call(null,lines));
});
/**
* Increase the value from a-key with one inside a-hash map
* If it doenst exist, create it with value 1
*/
jsrefact.core.inc_in_hash_map = (function inc_in_hash_map(a_hash,a_key){
var entry = a_hash.call(null,a_key);
if(cljs.core.nil_QMARK_)
{entry;
} else
{}
cljs.core.conj.call(null,a_hash,cljs.core.PersistentVector.fromArray([a_key,1], true));
return cljs.core.conj.call(null,a_hash,cljs.core.PersistentVector.fromArray([a_key,(entry + 1)], true));
});
/**
* Reify ?arr with all arrayexpressions from input ?ast
*/
jsrefact.core.array_expression = (function array_expression(_QMARK_ast,_QMARK_arr){
return jsrefact.core.ast_with_input.call(null,"ArrayExpression",_QMARK_ast,_QMARK_arr);
});
/**
* Reify ?lit with all literals from input ?ast
*/
jsrefact.core.literal = (function literal(_QMARK_ast,_QMARK_lit){
return jsrefact.core.ast_with_input.call(null,"Literal",_QMARK_ast,_QMARK_lit);
});
/**
* Reification of ?value with poperty 'value' of input ?ast
*/
jsrefact.core.value = (function value(_QMARK_ast,_QMARK_value){
return (function (a14178){
var _QMARK_ast__$1 = cljs.core.logic._walk_STAR_.call(null,a14178,_QMARK_ast);
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_value,_QMARK_ast__$1.value);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a14178);
});
});
/**
* Boolean type check
*/
jsrefact.core.boolean_QMARK_ = (function boolean_QMARK_(val){
if((function (){var or__3824__auto__ = cljs.core._EQ_.call(null,val,true);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return cljs.core._EQ_.call(null,val,false);
}
})())
{return true;
} else
{return false;
}
});
jsrefact.core.all_object_kinds_result = cljs.core.ObjMap.EMPTY;
/**
* Register object kind in all-object-kinds-result hash map
*/
jsrefact.core.register_object_kind = (function register_object_kind(kind){
jsrefact.core.all_object_kinds_result = jsrefact.core.inc_in_hash_map.call(null,jsrefact.core.all_object_kinds_result,kind);
});
/**
* Check and registers all literal object kinds possible
*/
jsrefact.core.literal_kinds = (function literal_kinds(_QMARK_lit){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_val = cljs.core.logic.lvar.call(null,"\uFDD1'?val");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.value.call(null,_QMARK_lit,_QMARK_val)),(function (a14181){
var _QMARK_val__$1 = cljs.core.logic._walk_STAR_.call(null,a14181,_QMARK_val);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2955__auto__){
cljs.core.println.call(null,_QMARK_val__$1);
return a__2955__auto__;
})),(function (a14182){
return cljs.core.logic._ifa.call(null,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,cljs.core.number_QMARK_.call(null,_QMARK_val__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}).call(null,a14182),cljs.core.PersistentVector.fromArray([(function (a__2955__auto__){
cljs.core.println.call(null,"number");
return a__2955__auto__;
}),(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,null,jsrefact.core.register_object_kind.call(null,"number"));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})], true),(new cljs.core.Delay(cljs.core.atom.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'done","\uFDD0'value"],{"\uFDD0'done":false,"\uFDD0'value":null})),(function (){
return cljs.core.logic._ifa.call(null,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,(_QMARK_val__$1 == null));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}).call(null,a14182),cljs.core.PersistentVector.fromArray([(function (a__2955__auto__){
cljs.core.println.call(null,"nil");
return a__2955__auto__;
}),(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,null,jsrefact.core.register_object_kind.call(null,"nil"));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})], true),(new cljs.core.Delay(cljs.core.atom.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'done","\uFDD0'value"],{"\uFDD0'done":false,"\uFDD0'value":null})),(function (){
return cljs.core.logic._ifa.call(null,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,cljs.core.string_QMARK_.call(null,_QMARK_val__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}).call(null,a14182),cljs.core.PersistentVector.fromArray([(function (a__2955__auto__){
cljs.core.println.call(null,"string");
return a__2955__auto__;
}),(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,null,jsrefact.core.register_object_kind.call(null,"string"));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})], true),(new cljs.core.Delay(cljs.core.atom.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'done","\uFDD0'value"],{"\uFDD0'done":false,"\uFDD0'value":null})),(function (){
return cljs.core.logic._ifa.call(null,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,jsrefact.core.boolean_QMARK_.call(null,_QMARK_val__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}).call(null,a14182),cljs.core.PersistentVector.fromArray([(function (a__2955__auto__){
cljs.core.println.call(null,"bool");
return a__2955__auto__;
}),(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,null,jsrefact.core.register_object_kind.call(null,"bool"));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})], true),null);
}))));
}))));
}))));
}));
})));
}).call(null,a14181);
}));
})));
});
});
/**
* Count different object kinds.
* Result will be available in variable all-object-kinds-result
*/
jsrefact.core.all_object_kinds = (function all_object_kinds(){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
var _QMARK_arr = cljs.core.logic.lvar.call(null,"\uFDD1'?arr");
var _QMARK_lit = cljs.core.logic.lvar.call(null,"\uFDD1'?lit");
var _QMARK_varDec = cljs.core.logic.lvar.call(null,"\uFDD1'?varDec");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.program.call(null,_QMARK_p)),jsrefact.core.ast_with_input.call(null,"VariableDeclarator",_QMARK_p,_QMARK_varDec)),(function (a14185){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a14185,jsrefact.core.array_expression.call(null,_QMARK_varDec,_QMARK_arr)),(function (a__2955__auto__){
cljs.core.println.call(null,"an array");
return a__2955__auto__;
})),(function (a14186){
var _QMARK_arr__$1 = cljs.core.logic._walk_STAR_.call(null,a14186,_QMARK_arr);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.all_object_kinds_result = jsrefact.core.inc_in_hash_map.call(null,jsrefact.core.all_object_kinds_result,"array"));
})));
}).call(null,a14186);
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a14185,jsrefact.core.literal.call(null,_QMARK_varDec,_QMARK_lit)),jsrefact.core.literal_kinds.call(null,_QMARK_lit));
}))));
})));
}));
})));
});
});
