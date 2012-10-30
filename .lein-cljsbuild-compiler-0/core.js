goog.provide('cltest');
goog.require('cljs.core');
goog.require('cljs.core.logic');
goog.require('esp');
goog.require('cljs.core.logic');
cltest.x = cljs.core.doall.cljs$lang$arity$1((function (){var xs__2897__auto__ = cljs.core.logic._take_STAR_((new cljs.core.logic.Inc((function (){
return (function (a__2889__auto__){
return (new cljs.core.logic.Inc((function (){
var q = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'q");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2889__auto__,cljs.core.logic.membero(q,cljs.core.with_meta(cljs.core.list("\uFDD0'cat","\uFDD0'dog","\uFDD0'bird","\uFDD0'bat","\uFDD0'debra"),cljs.core.hash_map("\uFDD0'line",8)))),(function (a__2898__auto__){
return cljs.core.cons(cljs.core.logic._reify(a__2898__auto__,q),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(1)
{return cljs.core.take(1,xs__2897__auto__);
} else
{return xs__2897__auto__;
}
})());
console.log(cltest.x);
cltest.y = esprima;
console.log(cltest.y.version);
cltest.parsed = cltest.y.parse("var z = 42");
console.log(cltest.parsed);
