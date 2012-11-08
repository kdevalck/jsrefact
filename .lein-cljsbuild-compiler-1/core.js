goog.provide('jsrefact');
goog.require('cljs.core');
goog.require('cljs.core.logic');
goog.require('esp');
goog.require('cljs.core.logic');
jsrefact.js_print = (function js_print(arg){
return console.log(arg);
});
jsrefact.x = cljs.core.doall.cljs$lang$arity$1((function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_((new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var q = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'q");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,cljs.core.logic.membero(q,cljs.core.with_meta(cljs.core.list("\uFDD0'cat","\uFDD0'dog","\uFDD0'bird","\uFDD0'bat","\uFDD0'debra"),cljs.core.hash_map("\uFDD0'line",20)))),(function (a__2906__auto__){
return cljs.core.cons(cljs.core.logic._reify(a__2906__auto__,q),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take(false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})());
var aaa = cljs.core.doall.cljs$lang$arity$1((function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_((new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var q = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'q");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,4,q);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2906__auto__){
return cljs.core.cons(cljs.core.logic._reify(a__2906__auto__,q),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(1)
{return cljs.core.take(1,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})());
jsrefact.y = esprima;
jsrefact.parsed = jsrefact.y.parse(" var x = 42");
jsrefact.js_print(jsrefact.parsed);
jsrefact.progrm = jsrefact.parsed.body.pop();
jsrefact.js_print(jsrefact.progrm);
jsrefact.ast_property_value = (function ast_property_value(ast,property){
return (ast[property]);
});
jsrefact.ast_properties = (function ast_properties(ast){
return cljs.core.seq(Object.keys(ast));
});
jsrefact.ast_kind = (function ast_kind(ast){
return jsrefact.ast_property_value(ast,"type");
});
jsrefact.ast_QMARK_ = (function ast_QMARK_(ast){
return cljs.core.not_EQ_.cljs$lang$arity$2(null,(ast["type"]));
});
jsrefact.program = (function program(_QMARK_node){
return (function (a__2949__auto__){
return cljs.core.logic._bind(a__2949__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,_QMARK_node,jsrefact.progrm);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
});
});
jsrefact.ast = (function ast(_QMARK_kind,_QMARK_node){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_root = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'?root");
return cljs.core.logic._bind(cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,jsrefact.program(_QMARK_root)),(function (a3233){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus(cljs.core.logic._bind(a3233,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,_QMARK_root,_QMARK_node);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(a3233,(jsrefact.child_PLUS_.cljs$lang$arity$2 ? jsrefact.child_PLUS_.cljs$lang$arity$2(_QMARK_root,_QMARK_node) : jsrefact.child_PLUS_.call(null,_QMARK_root,_QMARK_node)));
}))));
})));
})),(function (a3234){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_(a3234,_QMARK_node);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,_QMARK_kind,jsrefact.ast_kind(_QMARK_node__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a3234);
}));
})));
});
});
jsrefact.has = (function has(_QMARK_property,_QMARK_node,_QMARK_value){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_kind = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'?kind");
var _QMARK_properties = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'?properties");
return cljs.core.logic._bind(cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,(function (a3237){
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_(a3237,_QMARK_node);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,_QMARK_properties,jsrefact.ast_properties(_QMARK_node__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a3237);
})),cljs.core.logic.membero(_QMARK_property,_QMARK_properties)),(function (a3238){
var _QMARK_property__$1 = cljs.core.logic._walk_STAR_(a3238,_QMARK_property);
var _QMARK_node__$1 = cljs.core.logic._walk_STAR_(a3238,_QMARK_node);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,_QMARK_value,jsrefact.ast_property_value(_QMARK_node__$1,_QMARK_property__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}).call(null,a3238);
}));
})));
});
});
jsrefact.child = (function child(_QMARK_property,_QMARK_node,_QMARK_value){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_actual_value = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'?actual-value");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,jsrefact.has(_QMARK_property,_QMARK_node,_QMARK_actual_value)),(function (a3241){
var _QMARK_actual_value__$1 = cljs.core.logic._walk_STAR_(a3241,_QMARK_actual_value);
return (function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(a__2897__auto____$1,(function (a3242){
return cljs.core.logic._ifa((function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,true,jsrefact.ast_QMARK_(_QMARK_actual_value__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}).call(null,a3242),cljs.core.PersistentVector.fromArray([(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,_QMARK_value,_QMARK_actual_value__$1);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})], true),(new cljs.core.Delay(cljs.core.atom.cljs$lang$arity$1(cljs.core.ObjMap.fromObject(["\uFDD0'done","\uFDD0'value"],{"\uFDD0'done":false,"\uFDD0'value":null})),(function (){
return cljs.core.logic._ifa((function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,true,cljs.core.instance_QMARK_(Array,_QMARK_actual_value__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}).call(null,a3242),cljs.core.PersistentVector.fromArray([cljs.core.logic.membero(_QMARK_value,cljs.core.seq(_QMARK_actual_value__$1))], true),null);
}))));
}));
})));
}).call(null,a3241);
}));
})));
});
});
jsrefact.child_PLUS_ = (function child_PLUS_(_QMARK_node,_QMARK_child){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_prop = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'?prop");
var _QMARK_ch = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'?ch");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,jsrefact.child(_QMARK_prop,_QMARK_node,_QMARK_ch)),(function (a3244){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus(cljs.core.logic._bind(a3244,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,_QMARK_child,_QMARK_ch);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(a3244,child_PLUS_(_QMARK_ch,_QMARK_child));
}))));
})));
}));
})));
});
});
jsrefact.js_print(cljs.core.first(cljs.core.doall.cljs$lang$arity$1((function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_((new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_propertyname = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'?propertyname");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_node = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'?node");
var _QMARK_value = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'?value");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto____$1,jsrefact.program(_QMARK_node)),jsrefact.child(_QMARK_propertyname,_QMARK_node,_QMARK_value));
})));
})),(function (a__2906__auto__){
return cljs.core.cons(cljs.core.logic._reify(a__2906__auto__,_QMARK_propertyname),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take(false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())));
