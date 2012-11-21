goog.provide('jsrefact.tests.asttest');
goog.require('cljs.core');
goog.require('jsrefact.core');
goog.require('jsrefact.core');
jsrefact.tests.asttest.parsedTest = jsrefact.core.esprimaParser.parse("var x = 43");
jsrefact.tests.asttest.progrmTest = jsrefact.tests.asttest.parsedTest.body;
cljs.core.swap_BANG_.call(null,jsrefact.core.progrm,(function (progrmT){
return jsrefact.tests.asttest.progrmTest;
}));
jsrefact.tests.asttest.one = cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_value = cljs.core.logic.lvar.call(null,"\uFDD1'?value");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_node = cljs.core.logic.lvar.call(null,"\uFDD1'?node");
var _QMARK_prop = cljs.core.logic.lvar.call(null,"\uFDD1'?prop");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_node)),jsrefact.core.child.call(null,_QMARK_prop,_QMARK_node,_QMARK_value));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_value),cljs.core.List.EMPTY);
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
jsrefact.tests.asttest.sec = cljs.core.second.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_v = cljs.core.logic.lvar.call(null,"\uFDD1'?v");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_n = cljs.core.logic.lvar.call(null,"\uFDD1'?n");
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_n,jsrefact.tests.asttest.one);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),jsrefact.core.child.call(null,_QMARK_p,_QMARK_n,_QMARK_v));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_v),cljs.core.List.EMPTY);
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
jsrefact.tests.asttest.run = (function run(){
cljs.core.println.call(null,"AST Unit tests started.");
if(cljs.core._EQ_.call(null,jsrefact.core.ast_property_value.call(null,jsrefact.tests.asttest.parsedTest,"type"),"Program"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-property-value","\uFDD1'parsedTest","type"),cljs.core.hash_map("\uFDD0'line",29)),"Program"),cljs.core.hash_map("\uFDD0'line",29))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_property_value.call(null,cljs.core.first.call(null,cljs.core.deref.call(null,jsrefact.core.progrm)),"type"),"VariableDeclaration"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-property-value",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.list("\uFDD1'clojure.core/deref","\uFDD1'progrm")),cljs.core.hash_map("\uFDD0'line",31)),"type"),cljs.core.hash_map("\uFDD0'line",31)),"VariableDeclaration"),cljs.core.hash_map("\uFDD0'line",31))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.instance_QMARK_.call(null,Array,jsrefact.core.ast_property_value.call(null,cljs.core.deref.call(null,jsrefact.core.progrm),"declarations")),true))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'instance?","\uFDD1'js/Array",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-property-value",cljs.core.list("\uFDD1'clojure.core/deref","\uFDD1'progrm"),"declarations"),cljs.core.hash_map("\uFDD0'line",33))),cljs.core.hash_map("\uFDD0'line",33)),true),cljs.core.hash_map("\uFDD0'line",33))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,jsrefact.core.ast_properties.call(null,jsrefact.tests.asttest.parsedTest)),"type"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-properties","\uFDD1'parsedTest"),cljs.core.hash_map("\uFDD0'line",35))),cljs.core.hash_map("\uFDD0'line",35)),"type"),cljs.core.hash_map("\uFDD0'line",35))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,jsrefact.core.ast_properties.call(null,cljs.core.first.call(null,cljs.core.deref.call(null,jsrefact.core.progrm)))),"type"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-properties",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.list("\uFDD1'clojure.core/deref","\uFDD1'progrm")),cljs.core.hash_map("\uFDD0'line",37))),cljs.core.hash_map("\uFDD0'line",37))),cljs.core.hash_map("\uFDD0'line",37)),"type"),cljs.core.hash_map("\uFDD0'line",37))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,jsrefact.core.ast_properties.call(null,cljs.core.first.call(null,cljs.core.deref.call(null,jsrefact.core.progrm)))),3))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'count",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-properties",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.list("\uFDD1'clojure.core/deref","\uFDD1'progrm")),cljs.core.hash_map("\uFDD0'line",39))),cljs.core.hash_map("\uFDD0'line",39))),cljs.core.hash_map("\uFDD0'line",39)),3),cljs.core.hash_map("\uFDD0'line",39))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_kind.call(null,jsrefact.tests.asttest.parsedTest),"Program"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-kind","\uFDD1'parsedTest"),cljs.core.hash_map("\uFDD0'line",41)),"Program"),cljs.core.hash_map("\uFDD0'line",41))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_kind.call(null,cljs.core.first.call(null,cljs.core.deref.call(null,jsrefact.core.progrm))),"VariableDeclaration"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-kind",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.list("\uFDD1'clojure.core/deref","\uFDD1'progrm")),cljs.core.hash_map("\uFDD0'line",43))),cljs.core.hash_map("\uFDD0'line",43)),"VariableDeclaration"),cljs.core.hash_map("\uFDD0'line",43))))].join('')));
}
var fakeAst = 5;
if(cljs.core.not_EQ_.call(null,jsrefact.core.ast_QMARK_.call(null,fakeAst),true))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast?","\uFDD1'fakeAst"),cljs.core.hash_map("\uFDD0'line",46)),true),cljs.core.hash_map("\uFDD0'line",46))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_QMARK_.call(null,jsrefact.tests.asttest.parsedTest),true))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast?","\uFDD1'parsedTest"),cljs.core.hash_map("\uFDD0'line",47)),true),cljs.core.hash_map("\uFDD0'line",47))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_QMARK_.call(null,cljs.core.first.call(null,cljs.core.deref.call(null,jsrefact.core.progrm))),true))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast?",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.list("\uFDD1'clojure.core/deref","\uFDD1'progrm")),cljs.core.hash_map("\uFDD0'line",49))),cljs.core.hash_map("\uFDD0'line",49)),true),cljs.core.hash_map("\uFDD0'line",49))))].join('')));
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'.-type",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?p"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",51))),cljs.core.hash_map("\uFDD0'line",51))),cljs.core.hash_map("\uFDD0'line",51))),cljs.core.hash_map("\uFDD0'line",51)),"VariableDeclaration"),cljs.core.hash_map("\uFDD0'line",51))))].join('')));
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
})())),cljs.core.first.call(null,cljs.core.deref.call(null,jsrefact.core.progrm))))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?p"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",54))),cljs.core.hash_map("\uFDD0'line",54))),cljs.core.hash_map("\uFDD0'line",54)),cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.list("\uFDD1'clojure.core/deref","\uFDD1'progrm")),cljs.core.hash_map("\uFDD0'line",54))),cljs.core.hash_map("\uFDD0'line",54))))].join('')));
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?prop"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?node","\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?node"),cljs.core.hash_map("\uFDD0'line",59)),cljs.core.with_meta(cljs.core.list("\uFDD1'child","\uFDD1'?prop","\uFDD1'?node","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",60))),cljs.core.hash_map("\uFDD0'line",58))),cljs.core.hash_map("\uFDD0'line",57))),cljs.core.hash_map("\uFDD0'line",57)),"declarations"),cljs.core.hash_map("\uFDD0'line",57))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_kind.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_va = cljs.core.logic.lvar.call(null,"\uFDD1'?va");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_no = cljs.core.logic.lvar.call(null,"\uFDD1'?no");
var _QMARK_pr = cljs.core.logic.lvar.call(null,"\uFDD1'?pr");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_no)),jsrefact.core.child.call(null,_QMARK_pr,_QMARK_no,_QMARK_va));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_va),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})()))),"VariableDeclarator"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-kind",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?va"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?no","\uFDD1'?pr"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?no"),cljs.core.hash_map("\uFDD0'line",65)),cljs.core.with_meta(cljs.core.list("\uFDD1'child","\uFDD1'?pr","\uFDD1'?no","\uFDD1'?va"),cljs.core.hash_map("\uFDD0'line",66))),cljs.core.hash_map("\uFDD0'line",64))),cljs.core.hash_map("\uFDD0'line",63))),cljs.core.hash_map("\uFDD0'line",63))),cljs.core.hash_map("\uFDD0'line",63)),"VariableDeclarator"),cljs.core.hash_map("\uFDD0'line",63))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_pr = cljs.core.logic.lvar.call(null,"\uFDD1'?pr");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_no = cljs.core.logic.lvar.call(null,"\uFDD1'?no");
var _QMARK_va = cljs.core.logic.lvar.call(null,"\uFDD1'?va");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_no,jsrefact.tests.asttest.one);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),jsrefact.core.child.call(null,_QMARK_pr,_QMARK_no,_QMARK_va));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_pr),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),"id"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?pr"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?no","\uFDD1'?va"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/==","\uFDD1'?no","\uFDD1'one"),cljs.core.hash_map("\uFDD0'line",71)),cljs.core.with_meta(cljs.core.list("\uFDD1'child","\uFDD1'?pr","\uFDD1'?no","\uFDD1'?va"),cljs.core.hash_map("\uFDD0'line",72))),cljs.core.hash_map("\uFDD0'line",70))),cljs.core.hash_map("\uFDD0'line",69))),cljs.core.hash_map("\uFDD0'line",69)),"id"),cljs.core.hash_map("\uFDD0'line",69))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_pr = cljs.core.logic.lvar.call(null,"\uFDD1'?pr");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_no = cljs.core.logic.lvar.call(null,"\uFDD1'?no");
var _QMARK_va = cljs.core.logic.lvar.call(null,"\uFDD1'?va");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_no,jsrefact.tests.asttest.sec);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),jsrefact.core.child.call(null,_QMARK_pr,_QMARK_no,_QMARK_va));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_pr),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})()),cljs.core.List.EMPTY))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?pr"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?no","\uFDD1'?va"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/==","\uFDD1'?no","\uFDD1'sec"),cljs.core.hash_map("\uFDD0'line",76)),cljs.core.with_meta(cljs.core.list("\uFDD1'child","\uFDD1'?pr","\uFDD1'?no","\uFDD1'?va"),cljs.core.hash_map("\uFDD0'line",77))),cljs.core.hash_map("\uFDD0'line",75))),cljs.core.hash_map("\uFDD0'line",74)),cljs.core.List.EMPTY),cljs.core.hash_map("\uFDD0'line",74))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_va = cljs.core.logic.lvar.call(null,"\uFDD1'?va");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_no = cljs.core.logic.lvar.call(null,"\uFDD1'?no");
var _QMARK_pr = cljs.core.logic.lvar.call(null,"\uFDD1'?pr");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_no,jsrefact.tests.asttest.sec);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),jsrefact.core.child.call(null,_QMARK_pr,_QMARK_no,_QMARK_va));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_va),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})()),cljs.core.List.EMPTY))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?va"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?no","\uFDD1'?pr"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/==","\uFDD1'?no","\uFDD1'sec"),cljs.core.hash_map("\uFDD0'line",81)),cljs.core.with_meta(cljs.core.list("\uFDD1'child","\uFDD1'?pr","\uFDD1'?no","\uFDD1'?va"),cljs.core.hash_map("\uFDD0'line",82))),cljs.core.hash_map("\uFDD0'line",80))),cljs.core.hash_map("\uFDD0'line",79)),cljs.core.List.EMPTY),cljs.core.hash_map("\uFDD0'line",79))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.ast_kind.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_va = cljs.core.logic.lvar.call(null,"\uFDD1'?va");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_no = cljs.core.logic.lvar.call(null,"\uFDD1'?no");
var _QMARK_pr = cljs.core.logic.lvar.call(null,"\uFDD1'?pr");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_no,jsrefact.tests.asttest.one);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),jsrefact.core.child.call(null,_QMARK_pr,_QMARK_no,_QMARK_va));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_va),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})()))),"Identifier"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'ast-kind",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?va"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?no","\uFDD1'?pr"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/==","\uFDD1'?no","\uFDD1'one"),cljs.core.hash_map("\uFDD0'line",86)),cljs.core.with_meta(cljs.core.list("\uFDD1'child","\uFDD1'?pr","\uFDD1'?no","\uFDD1'?va"),cljs.core.hash_map("\uFDD0'line",87))),cljs.core.hash_map("\uFDD0'line",85))),cljs.core.hash_map("\uFDD0'line",84))),cljs.core.hash_map("\uFDD0'line",84))),cljs.core.hash_map("\uFDD0'line",84)),"Identifier"),cljs.core.hash_map("\uFDD0'line",84))))].join('')));
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'count",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?props"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p","\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",96)),cljs.core.with_meta(cljs.core.list("\uFDD1'has","\uFDD1'?props","\uFDD1'?p","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",97))),cljs.core.hash_map("\uFDD0'line",95))),cljs.core.hash_map("\uFDD0'line",94))),cljs.core.hash_map("\uFDD0'line",94)),3),cljs.core.hash_map("\uFDD0'line",93))))].join('')));
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?props"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p","\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",103)),cljs.core.with_meta(cljs.core.list("\uFDD1'has","\uFDD1'?props","\uFDD1'?p","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",104))),cljs.core.hash_map("\uFDD0'line",102))),cljs.core.hash_map("\uFDD0'line",101))),cljs.core.hash_map("\uFDD0'line",101)),"type"),cljs.core.hash_map("\uFDD0'line",100))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_value = cljs.core.logic.lvar.call(null,"\uFDD1'?value");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
var _QMARK_props = cljs.core.logic.lvar.call(null,"\uFDD1'?props");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_p)),jsrefact.core.has.call(null,_QMARK_props,_QMARK_p,_QMARK_value));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_value),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),"VariableDeclaration"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p","\uFDD1'?props"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",110)),cljs.core.with_meta(cljs.core.list("\uFDD1'has","\uFDD1'?props","\uFDD1'?p","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",111))),cljs.core.hash_map("\uFDD0'line",109))),cljs.core.hash_map("\uFDD0'line",108))),cljs.core.hash_map("\uFDD0'line",108)),"VariableDeclaration"),cljs.core.hash_map("\uFDD0'line",107))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.instance_QMARK_.call(null,Array,cljs.core.second.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_value = cljs.core.logic.lvar.call(null,"\uFDD1'?value");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
var _QMARK_props = cljs.core.logic.lvar.call(null,"\uFDD1'?props");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_p)),jsrefact.core.has.call(null,_QMARK_props,_QMARK_p,_QMARK_value));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_value),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})()))),true))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'instance?","\uFDD1'js/Array",cljs.core.with_meta(cljs.core.list("\uFDD1'second",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?value"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p","\uFDD1'?props"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",117)),cljs.core.with_meta(cljs.core.list("\uFDD1'has","\uFDD1'?props","\uFDD1'?p","\uFDD1'?value"),cljs.core.hash_map("\uFDD0'line",118))),cljs.core.hash_map("\uFDD0'line",116))),cljs.core.hash_map("\uFDD0'line",115))),cljs.core.hash_map("\uFDD0'line",115))),cljs.core.hash_map("\uFDD0'line",115)),true),cljs.core.hash_map("\uFDD0'line",114))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_chld = cljs.core.logic.lvar.call(null,"\uFDD1'?chld");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_p)),jsrefact.core.child_PLUS_.call(null,_QMARK_p,_QMARK_chld));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_chld),cljs.core.List.EMPTY);
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'count",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?chld"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",124)),cljs.core.with_meta(cljs.core.list("\uFDD1'child+","\uFDD1'?p","\uFDD1'?chld"),cljs.core.hash_map("\uFDD0'line",125))),cljs.core.hash_map("\uFDD0'line",123))),cljs.core.hash_map("\uFDD0'line",122))),cljs.core.hash_map("\uFDD0'line",122)),3),cljs.core.hash_map("\uFDD0'line",122))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.last.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_chld = cljs.core.logic.lvar.call(null,"\uFDD1'?chld");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_p)),jsrefact.core.child_PLUS_.call(null,_QMARK_p,_QMARK_chld));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_chld),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())).type,"Literal"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'.-type",cljs.core.with_meta(cljs.core.list("\uFDD1'last",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?chld"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",130)),cljs.core.with_meta(cljs.core.list("\uFDD1'child+","\uFDD1'?p","\uFDD1'?chld"),cljs.core.hash_map("\uFDD0'line",131))),cljs.core.hash_map("\uFDD0'line",129))),cljs.core.hash_map("\uFDD0'line",128))),cljs.core.hash_map("\uFDD0'line",128))),cljs.core.hash_map("\uFDD0'line",128)),"Literal"),cljs.core.hash_map("\uFDD0'line",128))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.second.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_chld = cljs.core.logic.lvar.call(null,"\uFDD1'?chld");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_p)),jsrefact.core.child_PLUS_.call(null,_QMARK_p,_QMARK_chld));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_chld),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())).type,"Identifier"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'.-type",cljs.core.with_meta(cljs.core.list("\uFDD1'second",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?chld"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",136)),cljs.core.with_meta(cljs.core.list("\uFDD1'child+","\uFDD1'?p","\uFDD1'?chld"),cljs.core.hash_map("\uFDD0'line",137))),cljs.core.hash_map("\uFDD0'line",135))),cljs.core.hash_map("\uFDD0'line",134))),cljs.core.hash_map("\uFDD0'line",134))),cljs.core.hash_map("\uFDD0'line",134)),"Identifier"),cljs.core.hash_map("\uFDD0'line",134))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_chld = cljs.core.logic.lvar.call(null,"\uFDD1'?chld");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_p = cljs.core.logic.lvar.call(null,"\uFDD1'?p");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.program.call(null,_QMARK_p)),jsrefact.core.child_PLUS_.call(null,_QMARK_p,_QMARK_chld));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_chld),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())).type,"VariableDeclarator"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'.-type",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?chld"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?p"]),cljs.core.with_meta(cljs.core.list("\uFDD1'program","\uFDD1'?p"),cljs.core.hash_map("\uFDD0'line",142)),cljs.core.with_meta(cljs.core.list("\uFDD1'child+","\uFDD1'?p","\uFDD1'?chld"),cljs.core.hash_map("\uFDD0'line",143))),cljs.core.hash_map("\uFDD0'line",141))),cljs.core.hash_map("\uFDD0'line",140))),cljs.core.hash_map("\uFDD0'line",140))),cljs.core.hash_map("\uFDD0'line",140)),"VariableDeclarator"),cljs.core.hash_map("\uFDD0'line",140))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_kind = cljs.core.logic.lvar.call(null,"\uFDD1'?kind");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_node = cljs.core.logic.lvar.call(null,"\uFDD1'?node");
return cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.ast.call(null,_QMARK_kind,_QMARK_node));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_kind),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),4))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'count",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?kind"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?node"]),cljs.core.with_meta(cljs.core.list("\uFDD1'ast","\uFDD1'?kind","\uFDD1'?node"),cljs.core.hash_map("\uFDD0'line",149))),cljs.core.hash_map("\uFDD0'line",148))),cljs.core.hash_map("\uFDD0'line",147))),cljs.core.hash_map("\uFDD0'line",147)),4),cljs.core.hash_map("\uFDD0'line",147))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_node = cljs.core.logic.lvar.call(null,"\uFDD1'?node");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.ast.call(null,"Identifier",_QMARK_node)),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_node),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())).type,"Identifier"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'.-type",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?node"]),cljs.core.with_meta(cljs.core.list("\uFDD1'ast","Identifier","\uFDD1'?node"),cljs.core.hash_map("\uFDD0'line",153))),cljs.core.hash_map("\uFDD0'line",152))),cljs.core.hash_map("\uFDD0'line",152))),cljs.core.hash_map("\uFDD0'line",152)),"Identifier"),cljs.core.hash_map("\uFDD0'line",152))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_node = cljs.core.logic.lvar.call(null,"\uFDD1'?node");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,jsrefact.core.ast.call(null,"Identifier",_QMARK_node)),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_node),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),1))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'count",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?node"]),cljs.core.with_meta(cljs.core.list("\uFDD1'ast","Identifier","\uFDD1'?node"),cljs.core.hash_map("\uFDD0'line",157))),cljs.core.hash_map("\uFDD0'line",156))),cljs.core.hash_map("\uFDD0'line",156)),1),cljs.core.hash_map("\uFDD0'line",156))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_kind = cljs.core.logic.lvar.call(null,"\uFDD1'?kind");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_node = cljs.core.logic.lvar.call(null,"\uFDD1'?node");
return cljs.core.logic._bind.call(null,a__2897__auto____$1,jsrefact.core.ast.call(null,_QMARK_kind,_QMARK_node));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_kind),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),"VariableDeclaration"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?kind"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?node"]),cljs.core.with_meta(cljs.core.list("\uFDD1'ast","\uFDD1'?kind","\uFDD1'?node"),cljs.core.hash_map("\uFDD0'line",162))),cljs.core.hash_map("\uFDD0'line",161))),cljs.core.hash_map("\uFDD0'line",160))),cljs.core.hash_map("\uFDD0'line",160)),"VariableDeclaration"),cljs.core.hash_map("\uFDD0'line",160))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_kind = cljs.core.logic.lvar.call(null,"\uFDD1'?kind");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_nodeOut = cljs.core.logic.lvar.call(null,"\uFDD1'?nodeOut");
var _QMARK_no = cljs.core.logic.lvar.call(null,"\uFDD1'?no");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_no,jsrefact.tests.asttest.one);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),jsrefact.core.ast_with_input.call(null,_QMARK_kind,_QMARK_no,_QMARK_nodeOut));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_kind),cljs.core.List.EMPTY);
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'count",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?kind"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?nodeOut","\uFDD1'?no"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/==","\uFDD1'?no","\uFDD1'one"),cljs.core.hash_map("\uFDD0'line",169)),cljs.core.with_meta(cljs.core.list("\uFDD1'ast-with-input","\uFDD1'?kind","\uFDD1'?no","\uFDD1'?nodeOut"),cljs.core.hash_map("\uFDD0'line",170))),cljs.core.hash_map("\uFDD0'line",168))),cljs.core.hash_map("\uFDD0'line",167))),cljs.core.hash_map("\uFDD0'line",167)),3),cljs.core.hash_map("\uFDD0'line",167))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_kind = cljs.core.logic.lvar.call(null,"\uFDD1'?kind");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_nodeOut = cljs.core.logic.lvar.call(null,"\uFDD1'?nodeOut");
var _QMARK_no = cljs.core.logic.lvar.call(null,"\uFDD1'?no");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_no,jsrefact.tests.asttest.one);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),jsrefact.core.ast_with_input.call(null,_QMARK_kind,_QMARK_no,_QMARK_nodeOut));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_kind),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),"VariableDeclarator"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?kind"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?nodeOut","\uFDD1'?no"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/==","\uFDD1'?no","\uFDD1'one"),cljs.core.hash_map("\uFDD0'line",175)),cljs.core.with_meta(cljs.core.list("\uFDD1'ast-with-input","\uFDD1'?kind","\uFDD1'?no","\uFDD1'?nodeOut"),cljs.core.hash_map("\uFDD0'line",176))),cljs.core.hash_map("\uFDD0'line",174))),cljs.core.hash_map("\uFDD0'line",173))),cljs.core.hash_map("\uFDD0'line",173)),"VariableDeclarator"),cljs.core.hash_map("\uFDD0'line",173))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_kind = cljs.core.logic.lvar.call(null,"\uFDD1'?kind");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_nodeOut = cljs.core.logic.lvar.call(null,"\uFDD1'?nodeOut");
var _QMARK_no = cljs.core.logic.lvar.call(null,"\uFDD1'?no");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_no,jsrefact.tests.asttest.sec);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),jsrefact.core.ast_with_input.call(null,_QMARK_kind,_QMARK_no,_QMARK_nodeOut));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_kind),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),"Literal"))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'first",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?kind"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?nodeOut","\uFDD1'?no"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/==","\uFDD1'?no","\uFDD1'sec"),cljs.core.hash_map("\uFDD0'line",181)),cljs.core.with_meta(cljs.core.list("\uFDD1'ast-with-input","\uFDD1'?kind","\uFDD1'?no","\uFDD1'?nodeOut"),cljs.core.hash_map("\uFDD0'line",182))),cljs.core.hash_map("\uFDD0'line",180))),cljs.core.hash_map("\uFDD0'line",179))),cljs.core.hash_map("\uFDD0'line",179)),"Literal"),cljs.core.hash_map("\uFDD0'line",179))))].join('')));
}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.doall.call(null,(function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var _QMARK_kind = cljs.core.logic.lvar.call(null,"\uFDD1'?kind");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto__,(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var _QMARK_nodeOut = cljs.core.logic.lvar.call(null,"\uFDD1'?nodeOut");
var _QMARK_no = cljs.core.logic.lvar.call(null,"\uFDD1'?no");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__2885__auto__,_QMARK_no,jsrefact.tests.asttest.sec);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),jsrefact.core.ast_with_input.call(null,_QMARK_kind,_QMARK_no,_QMARK_nodeOut));
})));
})),(function (a__2906__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__2906__auto__,_QMARK_kind),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})())),1))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'count",cljs.core.with_meta(cljs.core.list("\uFDD1'l/run*",cljs.core.vec(["\uFDD1'?kind"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/fresh",cljs.core.vec(["\uFDD1'?nodeOut","\uFDD1'?no"]),cljs.core.with_meta(cljs.core.list("\uFDD1'l/==","\uFDD1'?no","\uFDD1'sec"),cljs.core.hash_map("\uFDD0'line",187)),cljs.core.with_meta(cljs.core.list("\uFDD1'ast-with-input","\uFDD1'?kind","\uFDD1'?no","\uFDD1'?nodeOut"),cljs.core.hash_map("\uFDD0'line",188))),cljs.core.hash_map("\uFDD0'line",186))),cljs.core.hash_map("\uFDD0'line",185))),cljs.core.hash_map("\uFDD0'line",185)),1),cljs.core.hash_map("\uFDD0'line",185))))].join('')));
}
return cljs.core.println.call(null,"AST Unit tests finished.");
});
