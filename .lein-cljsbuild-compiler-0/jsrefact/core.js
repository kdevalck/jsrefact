goog.provide('jsrefact.core');
goog.require('cljs.core');
goog.require('cljs.core.logic');
goog.require('esp');
goog.require('cljs.core.logic');
/**
* Print function to write to browser's console
*/
jsrefact.core.js_print = (function js_print(arg){
return console.log(arg);
});
/**
* @param {...*} var_args
*/
jsrefact.core.add_some_numbers = (function() { 
var add_some_numbers__delegate = function (numbers){
return cljs.core.apply.call(null,cljs.core._PLUS_,numbers);
};
var add_some_numbers = function (var_args){
var numbers = null;
if (goog.isDef(var_args)) {
  numbers = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return add_some_numbers__delegate.call(this, numbers);
};
add_some_numbers.cljs$lang$maxFixedArity = 0;
add_some_numbers.cljs$lang$applyTo = (function (arglist__6162){
var numbers = cljs.core.seq(arglist__6162);;
return add_some_numbers__delegate(numbers);
});
add_some_numbers.cljs$lang$arity$variadic = add_some_numbers__delegate;
return add_some_numbers;
})()
;
jsrefact.core.esprimaParser = esprima;
jsrefact.core.parsed = jsrefact.core.esprimaParser.parse(" var x = 42");
jsrefact.core.progrm = jsrefact.core.parsed.body.pop();
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
return cljs.core.not_EQ_.call(null,null,(ast["type"]));
});
/**
* Reifies ?node to the javascript program's ast object
* 
* Example: (js-print (l/run*
* [?p]
* (program ?p)))
* 
*/
jsrefact.core.program = (function program(_QMARK_node){
return (function (a__2949__auto__){
return cljs.core.logic._bind.call(null,a__2949__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_node,jsrefact.core.progrm);
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
*/
jsrefact.core.ast = (function ast(_QMARK_kind,_QMARK_node){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_root = cljs.core.logic.lvar.call(null,"\uFDD1'?root");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.program.call(null,_QMARK_root)),(function (a6165){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a6165,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_root,_QMARK_node);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a6165,jsrefact.core.child_PLUS_.call(null,_QMARK_root,_QMARK_node));
}))));
})));
})),(function (a6166){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a6166,_QMARK_node);
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
}).call(null,a6166);
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a6169){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a6169,_QMARK_node);
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
}).call(null,a6169);
})),cljs.core.logic.membero.call(null,_QMARK_property,_QMARK_properties)),(function (a6170){
var _QMARK_property__$1 = cljs.core.logic._walk_STAR_.call(null,a6170,_QMARK_property);
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_.call(null,a6170,_QMARK_node);
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
}).call(null,a6170);
}));
})));
});
});
/**
* Reification of the relation between an ast ?node
* and its astnode ?value that has a property
* named ?property
*/
jsrefact.core.child = (function child(_QMARK_property,_QMARK_node,_QMARK_value){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_actual_value = cljs.core.logic.lvar.call(null,"\uFDD1'?actual-value");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.has.call(null,_QMARK_property,_QMARK_node,_QMARK_actual_value)),(function (a6173){
var _QMARK_actual_value__$1 = cljs.core.logic._walk_STAR_.call(null,a6173,_QMARK_actual_value);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a6174){
return cljs.core.logic._ifa.call(null,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,jsrefact.core.ast_QMARK_.call(null,_QMARK_actual_value__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}).call(null,a6174),cljs.core.PersistentVector.fromArray([(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_value,_QMARK_actual_value__$1);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})], true),(new cljs.core.Delay(cljs.core.atom.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'done","\uFDD0'value"],{"\uFDD0'done":false,"\uFDD0'value":null})),(function (){
return cljs.core.logic._ifa.call(null,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,true,cljs.core.instance_QMARK_.call(null,Array,_QMARK_actual_value__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}).call(null,a6174),cljs.core.PersistentVector.fromArray([cljs.core.logic.membero.call(null,_QMARK_value,cljs.core.seq.call(null,_QMARK_actual_value__$1))], true),null);
}))));
}));
})));
}).call(null,a6173);
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
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.child.call(null,_QMARK_prop,_QMARK_node,_QMARK_ch)),(function (a6176){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a6176,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_child,_QMARK_ch);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a6176,child_PLUS_.call(null,_QMARK_ch,_QMARK_child));
}))));
})));
}));
})));
});
});
