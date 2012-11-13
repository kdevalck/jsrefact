goog.provide('jsrefact.tests.asttest');
goog.require('cljs.core');
goog.require('jsrefact.core');
goog.require('jsrefact.core');
jsrefact.tests.asttest.parsedTest = jsrefact.core.esprimaParser.parse("var x = 43");
jsrefact.tests.asttest.progrmTest = jsrefact.tests.asttest.parsedTest.body.pop();
cljs.core.swap_BANG_.call(null,jsrefact.core.progrm,(function (progrmT){
return jsrefact.tests.asttest.progrmTest;
}));
jsrefact.tests.asttest.run = (function run(){
jsrefact.core.js_print.call(null,"AST Unit tests started.");
if(cljs.core._EQ_.call(null,jsrefact.core.ast_kind.call(null,jsrefact.tests.asttest.parsedTest),"Program"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-kind","\uFDD1'parsedTest"),cljs.core.hash_map("\uFDD0'line",19)),"Program"),cljs.core.hash_map("\uFDD0'line",19))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_property_value.call(null,jsrefact.tests.asttest.parsedTest,"type"),"Program"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-property-value","\uFDD1'parsedTest","type"),cljs.core.hash_map("\uFDD0'line",21)),"Program"),cljs.core.hash_map("\uFDD0'line",21))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,jsrefact.core.ast_properties.call(null,jsrefact.tests.asttest.parsedTest)),"type"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-properties","\uFDD1'parsedTest"),cljs.core.hash_map("\uFDD0'line",23))),cljs.core.hash_map("\uFDD0'line",23)),"type"),cljs.core.hash_map("\uFDD0'line",23))))].join('')));
}
var fakeAst = 5;
if(cljs.core.not_EQ_.call(null,jsrefact.core.ast_QMARK_.call(null,fakeAst),true))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast?","\uFDD1'fakeAst"),cljs.core.hash_map("\uFDD0'line",26)),true),cljs.core.hash_map("\uFDD0'line",26))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_QMARK_.call(null,jsrefact.tests.asttest.parsedTest),true))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast?","\uFDD1'parsedTest"),cljs.core.hash_map("\uFDD0'line",27)),true),cljs.core.hash_map("\uFDD0'line",27))))].join('')));
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'.-type",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?p"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",29))),cljs.core.hash_map("\uFDD0'line",29))),cljs.core.hash_map("\uFDD0'line",29))),cljs.core.hash_map("\uFDD0'line",29)),"VariableDeclaration"),cljs.core.hash_map("\uFDD0'line",29))))].join('')));
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?prop"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?node","\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?node"),cljs.core.hash_map("\uFDD0'line",36)),cljs.core.with_meta(cljs.core.list("\uFDD1'child","\uFDD1'?prop","\uFDD1'?node","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",37))),cljs.core.hash_map("\uFDD0'line",35))),cljs.core.hash_map("\uFDD0'line",34))),cljs.core.hash_map("\uFDD0'line",34)),"declarations"),cljs.core.hash_map("\uFDD0'line",34))))].join('')));
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'count",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?props"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p","\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",45)),cljs.core.with_meta(cljs.core.list("\uFDD1'has","\uFDD1'?props","\uFDD1'?p","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",46))),cljs.core.hash_map("\uFDD0'line",44))),cljs.core.hash_map("\uFDD0'line",43))),cljs.core.hash_map("\uFDD0'line",43)),3),cljs.core.hash_map("\uFDD0'line",42))))].join('')));
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?props"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p","\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",51)),cljs.core.with_meta(cljs.core.list("\uFDD1'has","\uFDD1'?props","\uFDD1'?p","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",52))),cljs.core.hash_map("\uFDD0'line",50))),cljs.core.hash_map("\uFDD0'line",49))),cljs.core.hash_map("\uFDD0'line",49)),"type"),cljs.core.hash_map("\uFDD0'line",48))))].join('')));
}
return jsrefact.core.js_print.call(null,"AST Unit tests finished.");
});
