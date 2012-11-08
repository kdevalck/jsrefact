goog.provide('jsrefact.tests.numb');
goog.require('cljs.core');
goog.require('jsrefact.core');
goog.require('jsrefact.core');
jsrefact.tests.numb.run = (function run(){
if(cljs.core._EQ_.call(null,jsrefact.core.add_some_numbers.call(null,2,2),4))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'add-some-numbers",2,2),cljs.core.hash_map("\uFDD0'line",5)),4),cljs.core.hash_map("\uFDD0'line",5))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.add_some_numbers.call(null,1,2,3),6))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'add-some-numbers",1,2,3),cljs.core.hash_map("\uFDD0'line",6)),6),cljs.core.hash_map("\uFDD0'line",6))))].join('')));
}
if(cljs.core._EQ_.call(null,jsrefact.core.add_some_numbers.call(null,4,5,6),15))
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'=",cljs.core.with_meta(cljs.core.list("\uFDD1'add-some-numbers",4,5,6),cljs.core.hash_map("\uFDD0'line",7)),15),cljs.core.hash_map("\uFDD0'line",7))))].join('')));
}
});
