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
return (function (a15196){
var _QMARK_val__$1 = cljs.core.logic._walk_STAR_.call(null,a15196,_QMARK_val);
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
}).call(null,a15196);
});
});
cljs.core._STAR_print_fn_STAR_ = jsrefact.core.js_print;
jsrefact.core.esprimaParser = esprima;
jsrefact.core.parsed = jsrefact.core.esprimaParser.parse("var i = 0; function Inc(){i = i++}; function Dec(){i = i--}; Inc(); Dec(); Dec();",{ loc: true });
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.program.call(null,_QMARK_root)),(function (a15199){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a15199,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_root,_QMARK_node);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a15199,jsrefact.core.child_PLUS_.call(null,_QMARK_root,_QMARK_node));
}))));
})));
})),(function (a15200){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a15200,_QMARK_node);
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
}).call(null,a15200);
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
})),(function (a15203){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a15203,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_root,_QMARK_nodeOut);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a15203,jsrefact.core.child_PLUS_.call(null,_QMARK_root,_QMARK_nodeOut));
}))));
})));
})),(function (a15204){
var _QMARK_nodeOut__$1 = cljs.core.logic._walk_STAR_.call(null,a15204,_QMARK_nodeOut);
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
}).call(null,a15204);
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a15207){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a15207,_QMARK_node);
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
}).call(null,a15207);
})),cljs.core.logic.membero.call(null,_QMARK_property,_QMARK_properties)),(function (a15208){
var _QMARK_property__$1 = cljs.core.logic._walk_STAR_.call(null,a15208,_QMARK_property);
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a15208,_QMARK_node);
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
}).call(null,a15208);
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.has.call(null,_QMARK_prop,_QMARK_node,_QMARK_foundvals)),(function (a15211){
var _QMARK_foundvals__$1 = cljs.core.logic._walk_STAR_.call(null,a15211,_QMARK_foundvals);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a15212){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a15212,(function (a__2885__auto__){
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a15212,(function (a__2885__auto__){
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
}).call(null,a15211);
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.child.call(null,_QMARK_prop,_QMARK_node,_QMARK_ch)),(function (a15214){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a15214,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_child,_QMARK_ch);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a15214,child_PLUS_.call(null,_QMARK_ch,_QMARK_child));
}))));
})));
}));
})));
});
});
/**
* 
*/
jsrefact.core.thisexpressions = (function thisexpressions(_QMARK_this){
return jsrefact.core.ast.call(null,"ThisExpression",_QMARK_this);
});
/**
* 
*/
jsrefact.core.functiondeclarations = (function functiondeclarations(_QMARK_functs){
return jsrefact.core.ast.call(null,"FunctionDeclaration",_QMARK_functs);
});
/**
* 
*/
jsrefact.core.expressionstatement = (function expressionstatement(_QMARK_exp){
return jsrefact.core.ast.call(null,"ExpressionStatement",_QMARK_exp);
});
/**
* 
*/
jsrefact.core.name_l = (function name_l(_QMARK_a,_QMARK_name){
return (function (a15216){
var _QMARK_a__$1 = cljs.core.logic._walk_STAR_.call(null,a15216,_QMARK_a);
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_name,_QMARK_a__$1.name);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a15216);
});
});
/**
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
jsrefact.core.one = cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_n = cljs.core.logic.lvar.call(null,"\uFDD1'?n");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.functiondeclarations.call(null,_QMARK_n)),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_n),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})()));
cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_calls = cljs.core.logic.lvar.call(null,"\uFDD1'?calls");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.functioncalls.call(null,jsrefact.core.one,_QMARK_calls)),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_calls),cljs.core.List.EMPTY);
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
/**
* Unify ?loc with the location object from ?ast
*/
jsrefact.core.location = (function location(_QMARK_ast,_QMARK_loc){
return (function (a15218){
var _QMARK_ast__$1 = cljs.core.logic._walk_STAR_.call(null,a15218,_QMARK_ast);
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
}).call(null,a15218);
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
})),(function (a15220){
var _QMARK_locObject__$1 = cljs.core.logic._walk_STAR_.call(null,a15220,_QMARK_locObject);
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
}).call(null,a15220);
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.location.call(null,_QMARK_ast,_QMARK_loc)),(function (a15222){
var _QMARK_loc__$1 = cljs.core.logic._walk_STAR_.call(null,a15222,_QMARK_loc);
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
}).call(null,a15222);
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
return (clojure.walk.walk.call(null,(function (p1__15223_SHARP_){
return (1 * p1__15223_SHARP_);
}),(function (p1__15224_SHARP_){
return cljs.core.apply.call(null,cljs.core._PLUS_,p1__15224_SHARP_);
}),lines) / cljs.core.count.call(null,lines));
});
