goog.provide('clojure.reflect');
goog.require('cljs.core');
goog.require('clojure.browser.event');
goog.require('clojure.browser.net');
clojure.reflect.evaluate_javascript = (function evaluate_javascript(block){
var result = (function (){try{return eval(block);
}catch (e3275){if(cljs.core.instance_QMARK_.call(null,Error,e3275))
{var e = e3275;
return console.log(e);
} else
{if("\uFDD0'else")
{throw e3275;
} else
{return null;
}
}
}})();
return result;
});
/**
* Issues a GET to /reflect with a single query-parameter string.
* Calls cb with the result.
*/
clojure.reflect.query_reflection = (function query_reflection(query_param,cb){
var conn = clojure.browser.net.xhr_connection.call(null);
var url = [cljs.core.str("/reflect?"),cljs.core.str(query_param)].join('');
clojure.browser.event.listen.call(null,conn,"\uFDD0'success",(function (e){
var resp = e.currentTarget.getResponseText(cljs.core.List.EMPTY);
return cb.call(null,resp);
}));
clojure.browser.event.listen.call(null,conn,"\uFDD0'error",(function (){
return cljs.core.println.call(null,"Reflection query failed.");
}));
return clojure.browser.net.transmit.call(null,conn,url);
});
/**
* Queries the reflection api with a fully qualified symbol, then calls
* callback fn cb with the evaluated cljs map containing that symbol's
* meta information.
*/
clojure.reflect.meta = (function meta(sym,cb){
return clojure.reflect.query_reflection.call(null,[cljs.core.str("var="),cljs.core.str(encodeURIComponent([cljs.core.str(sym)].join('')))].join(''),(function (p1__3276_SHARP_){
return cb.call(null,clojure.reflect.evaluate_javascript.call(null,p1__3276_SHARP_));
}));
});
/**
* Queries the reflection api with a quoted macro form, then calls the
* callback function with the macroexpanded form, as a string.
*/
clojure.reflect.macroexpand = (function macroexpand(form){
return clojure.reflect.query_reflection.call(null,[cljs.core.str("macroform="),cljs.core.str(encodeURIComponent([cljs.core.str(form)].join('')))].join(''),cljs.core.println);
});
clojure.reflect.print_doc = (function print_doc(p__3277){
var map__3279 = p__3277;
var map__3279__$1 = ((cljs.core.seq_QMARK_.call(null,map__3279))?cljs.core.apply.call(null,cljs.core.hash_map,map__3279):map__3279);
var doc = cljs.core._lookup.call(null,map__3279__$1,"\uFDD0'doc",null);
var method_params = cljs.core._lookup.call(null,map__3279__$1,"\uFDD0'method-params",null);
var name = cljs.core._lookup.call(null,map__3279__$1,"\uFDD0'name",null);
if(cljs.core.empty_QMARK_.call(null,name))
{return null;
} else
{cljs.core.println.call(null,name);
cljs.core.println.call(null,method_params);
return cljs.core.println.call(null,doc);
}
});
/**
* Queries the reflection api with a fully qualified symbol, then prints
* documentation information at the repl.
*/
clojure.reflect.doc = (function doc(sym){
return clojure.reflect.meta.call(null,sym,clojure.reflect.print_doc);
});
