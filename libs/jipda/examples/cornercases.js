// push adds length field to objects if not present, but they do not become arrays

var y = {};
y.length; // undefined
Array.prototype.push.call(y, 1, 2); // 2
y // ({0:1, 1:2, length:2}) 
y instanceof Array //false


////////////
 
NaN === NaN // false
NaN !== NaN // true


/////////////

[1,2,3,4,5,6,7,8,9,10].sort() // [1, 10, 2, 3, 4, 5, 6, 7, 8, 9] (lexicographical)

/////////////

var o = {x:0};
var o2 = Object.create(o); // so that o2.__proto__ === o
o2.x++; // 0
o2.x // 1
o.x // 0

/////////////

true + false // 1

/////////////

