goog.provide('jsrefact.tests');
goog.require('cljs.core');
goog.require('jsrefact.tests.asttest');
jsrefact.tests.success = 0;
jsrefact.tests.run = (function run(){
jsrefact.tests.asttest.run.call(null);
cljs.core.println.call(null,"All test succeeded.");
return jsrefact.tests.success;
});
goog.exportSymbol('jsrefact.tests.run', jsrefact.tests.run);
