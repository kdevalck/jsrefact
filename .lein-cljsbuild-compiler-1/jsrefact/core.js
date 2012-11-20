goog.provide('jsrefact.core');
goog.require('cljs.core');
goog.require('cljs.core.logic');
goog.require('clojure.browser.repl');
goog.require('esp');
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
return (function (a11202){
var _QMARK_val__$1 = cljs.core.logic._walk_STAR_.call(null,a11202,_QMARK_val);
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
}).call(null,a11202);
});
});
cljs.core._STAR_print_fn_STAR_ = jsrefact.core.js_print;
jsrefact.core.esprimaParser = esprima;
jsrefact.core.parsed = jsrefact.core.esprimaParser.parse(" var x = 42");
jsrefact.core.progrm = cljs.core.atom.call(null,jsrefact.core.parsed.body.pop());
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
return cljs.core.logic._bind.call(null,a__2949__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_node,cljs.core.deref.call(null,jsrefact.core.progrm));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.program.call(null,_QMARK_root)),(function (a11205){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a11205,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_root,_QMARK_node);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a11205,jsrefact.core.child_PLUS_.call(null,_QMARK_root,_QMARK_node));
}))));
})));
})),(function (a11206){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a11206,_QMARK_node);
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
}).call(null,a11206);
}));
})));
});
});
/**
* Reification of the relation between an ast node ?node
* and its kind ?kind
* Uses ?nodeIn as input ast
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
})),(function (a11209){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a11209,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_root,_QMARK_nodeOut);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a11209,jsrefact.core.child_PLUS_.call(null,_QMARK_root,_QMARK_nodeOut));
}))));
})));
})),(function (a11210){
var _QMARK_nodeOut__$1 = cljs.core.logic._walk_STAR_.call(null,a11210,_QMARK_nodeOut);
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
}).call(null,a11210);
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a11213){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a11213,_QMARK_node);
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
}).call(null,a11213);
})),cljs.core.logic.membero.call(null,_QMARK_property,_QMARK_properties)),(function (a11214){
var _QMARK_property__$1 = cljs.core.logic._walk_STAR_.call(null,a11214,_QMARK_property);
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a11214,_QMARK_node);
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
}).call(null,a11214);
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.has.call(null,_QMARK_prop,_QMARK_node,_QMARK_foundvals)),(function (a11217){
var _QMARK_foundvals__$1 = cljs.core.logic._walk_STAR_.call(null,a11217,_QMARK_foundvals);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2955__auto__){
cljs.core.println.call(null,_QMARK_foundvals__$1);
return a__2955__auto__;
})),(function (a11218){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a11218,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,jsrefact.core.ast_QMARK_.call(null,_QMARK_foundvals__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2955__auto__){
cljs.core.println.call(null,"1",_QMARK_foundvals__$1);
return a__2955__auto__;
})),(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_val,_QMARK_foundvals__$1);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a11218,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,cljs.core.instance_QMARK_.call(null,Array,_QMARK_foundvals__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2955__auto__){
cljs.core.println.call(null,"2",_QMARK_foundvals__$1);
return a__2955__auto__;
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
}).call(null,a11217);
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.child.call(null,_QMARK_prop,_QMARK_node,_QMARK_ch)),(function (a11220){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a11220,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_child,_QMARK_ch);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a11220,child_PLUS_.call(null,_QMARK_ch,_QMARK_child));
}))));
})));
}));
})));
});
});
