var z = []; 
var appender=function (h, a, b) {return append(h(a), h(b));}; 
var lister=function (g) {return function (x) { return [g(x)]; };}; 
var conser=function (x) { z = cons(x, z); return z;}; 
appender(lister(conser), 42, 43);