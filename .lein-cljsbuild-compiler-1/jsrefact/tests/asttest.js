goog.provide('jsrefact.tests.asttest');
goog.require('cljs.core');
goog.require('jsrefact.core');
goog.require('jsrefact.core');
jsrefact.tests.asttest.run = (function run(){
jsrefact.core.js_print.call(null,"AST Unit tests started.");
if(cljs.core._EQ_.call(null,jsrefact.core.ast_kind.call(null,jsrefact.core.parsed),"Program"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-kind","\uFDD1'parsed"),cljs.core.hash_map("\uFDD0'line",15)),"Program"),cljs.core.hash_map("\uFDD0'line",15))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_property_value.call(null,jsrefact.core.parsed,"type"),"Program"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-property-value","\uFDD1'parsed","type"),cljs.core.hash_map("\uFDD0'line",17)),"Program"),cljs.core.hash_map("\uFDD0'line",17))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,jsrefact.core.ast_properties.call(null,jsrefact.core.parsed)),"type"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-properties","\uFDD1'parsed"),cljs.core.hash_map("\uFDD0'line",19))),cljs.core.hash_map("\uFDD0'line",19)),"type"),cljs.core.hash_map("\uFDD0'line",19))))].join('')));
}
var fakeAst = 5;
if(cljs.core.not_EQ_.call(null,jsrefact.core.ast_QMARK_.call(null,fakeAst),true))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast?","\uFDD1'fakeAst"),cljs.core.hash_map("\uFDD0'line",22)),true),cljs.core.hash_map("\uFDD0'line",22))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_QMARK_.call(null,jsrefact.core.parsed),true))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast?","\uFDD1'parsed"),cljs.core.hash_map("\uFDD0'line",23)),true),cljs.core.hash_map("\uFDD0'line",23))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.program.call(null,_QMARK_p)),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_p),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())).type,"VariableDeclaration"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'.-type",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?p"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",25))),cljs.core.hash_map("\uFDD0'line",25))),cljs.core.hash_map("\uFDD0'line",25))),cljs.core.hash_map("\uFDD0'line",25)),"VariableDeclaration"),cljs.core.hash_map("\uFDD0'line",25))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_prop = cljs.core.logic.lvar.call(null,"\uFDD1'?prop");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_node = cljs.core.logic.lvar.call(null,"\uFDD1'?node");
var _QMARK_value = cljs.core.logic.lvar.call(null,"\uFDD1'?value");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_node)),jsrefact.core.child.call(null,_QMARK_prop,_QMARK_node,_QMARK_value));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_prop),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),"declarations"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?prop"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?node","\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?node"),cljs.core.hash_map("\uFDD0'line",32)),cljs.core.with_meta(cljs.core.list("\uFDD1'child","\uFDD1'?prop","\uFDD1'?node","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",33))),cljs.core.hash_map("\uFDD0'line",31))),cljs.core.hash_map("\uFDD0'line",30))),cljs.core.hash_map("\uFDD0'line",30)),"declarations"),cljs.core.hash_map("\uFDD0'line",30))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_props = cljs.core.logic.lvar.call(null,"\uFDD1'?props");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
var _QMARK_value = cljs.core.logic.lvar.call(null,"\uFDD1'?value");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_p)),jsrefact.core.has.call(null,_QMARK_props,_QMARK_p,_QMARK_value));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_props),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),3))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'count",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?props"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p","\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",41)),cljs.core.with_meta(cljs.core.list("\uFDD1'has","\uFDD1'?props","\uFDD1'?p","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",42))),cljs.core.hash_map("\uFDD0'line",40))),cljs.core.hash_map("\uFDD0'line",39))),cljs.core.hash_map("\uFDD0'line",39)),3),cljs.core.hash_map("\uFDD0'line",38))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_props = cljs.core.logic.lvar.call(null,"\uFDD1'?props");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
var _QMARK_value = cljs.core.logic.lvar.call(null,"\uFDD1'?value");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_p)),jsrefact.core.has.call(null,_QMARK_props,_QMARK_p,_QMARK_value));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_props),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),"type"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?props"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p","\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",47)),cljs.core.with_meta(cljs.core.list("\uFDD1'has","\uFDD1'?props","\uFDD1'?p","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",48))),cljs.core.hash_map("\uFDD0'line",46))),cljs.core.hash_map("\uFDD0'line",45))),cljs.core.hash_map("\uFDD0'line",45)),"type"),cljs.core.hash_map("\uFDD0'line",44))))].join('')));
}
return jsrefact.core.js_print.call(null,"AST Unit tests finished.");
});
