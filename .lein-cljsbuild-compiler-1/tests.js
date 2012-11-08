goog.provide('jsrefact.tests');
goog.require('cljs.core');
goog.require('jsrefact.tests.numb');
jsrefact.tests.success = 0;
jsrefact.tests.run = (function run(){
console.log("Example test started.");
jsrefact.tests.numb.run.call(null);
console.log("Example test finished.");
return jsrefact.tests.success;
});
goog.exportSymbol('jsrefact.tests.run', jsrefact.tests.run);
