goog.provide('common')

// methods

/*
Object.prototype.equals = 
	function (object)
	{
		return this === object; 
	};
	
Object.toString = 
	function (x)
	{
		return "{" + Object.keys(x).map(
			function (key)
			{
				return key + ":" + x[key];
			}).join(",") + "}";
	};

Object.prototype.toString =
	function ()
	{
		return Object.toString(this);
	};
 */

var Eq =
  {
    equals:function (x, y)
    {
      if (x === y)
      {
        return true;
      }
      if (x === undefined || y === undefined || x === null || y === null)
      {
        return false;
      }
      if (x.equals)
      {
        return x.equals(y);
      }
      return false;
    }
  };

Eq.checker =
  function (x)
  {
    return function (y) { return Eq.equals(x,y); }; 
  };
  
var Visitor = {};
Visitor.accept = function (visitor) {return function (x) {return x.accept ? x.accept(visitor) : String(x)}};
  
Boolean.prototype.equals =
	function (x)
	{
		return this.valueOf() === x.valueOf();
	};
	
Array.prototype.toString =
	function ()
	{
		// return "[" + this.join(",") + "]"; doesn't work for [undefined]
		if (this.length === 0)
		{
			return "[]";
		}
		var s = "[";
		for (var i = 0; i < this.length - 1; i++)
		{
			s += this[i] + ","; 
		}
		s += this[i] + "]";
		return s;		
	};

Array.prototype.memberAt =
	function (x)
	{
		for (var i = 0; i < this.length; i++)
		{
			var el = this[i];
			if (Eq.equals(x, el))
			{
				return i;
			}
		}
		return -1;
	};

Array.prototype.flatten =
	function ()
	{
		return this.reduce(function (p, c) { return p.concat(c); }, []);
	};

Array.prototype.flatMap =
	function (f, th)
	{
		return this.map(f, th).flatten();
	};
	
Array.prototype.addFirst =
	function (x)
	{
		return [x].concat(this);
	};		

Array.prototype.addLast =
	function (x)
	{
		if (Array.isArray(x))
		{
			return this.concat([x]);
		}
		return this.concat(x);
	};		
	
Array.prototype.addUniqueLast =
	function (x)
	{
		if (this.memberAt(x) > -1)
		{
			return this;
		}
		return this.addLast(x);
	};
	
Array.prototype.remove =
  function (x)
  {
    var i = this.memberAt(x);
    if (i === -1)
    {
      return this.slice(0);
    }
    return this.slice(0, i).concat(this.slice(i+1));
  }
  
Array.prototype.removeAll =
  function (xs)
  {
    return this.flatMap(
      function (el)
      {
        if (xs.memberAt(el) > -1)
        {
          return [];
        }
        return [el];
      });
  }

Array.prototype.keepAll =
  function (xs)
  {
    return this.flatMap(
      function (el)
      {
        if (xs.memberAt(el) === -1)
        {
          return [];
        }
        return [el];
      });
  }

Array.prototype.toSet = 
  function ()
  {
    var result = [];
    for (var i = 0; i < this.length; i++)
    {
      result = result.addUniqueLast(this[i]);
    }
    return result;
  }
  
//Array.prototype.union =
//	function (xs)
//	{
//    return this.concat(xs).toSet();
//	}
//	
//Array.prototype.intersection =
//	function (xs)
//	{
//		return this.keepAll(xs);
//	};
	
Array.prototype.equals =
	function (x)
	{
		if (this === x)
		{
			return true;
		}
		if (x === undefined || x === null)
		{
			return false;
		}
		var length = x.length;
		if (this.length != length)
		{
			return false;
		}
		for (var i = 0; i < length; i++)
		{
			var xi = x[i];
			var thisi = this[i];
			if (!Eq.equals(xi, thisi))
			{
				return false;
			}
		}
		return true;
	};
	
Array.prototype.subsumes =
  function (xs)
  {
    for (var i = 0; i < xs.length; i++)
    {
      if (this.memberAt(xs[i]) === -1)
      {
        return false;
      }
    }
    return true;
  };
	  
Array.prototype.setEquals =
	function (x)
	{
		var length = x.length;
		if (this.length != length)
		{
			return false;
		}
		for (var i = 0; i < length; i++)
		{
			var xi = x[i];
			if (this.memberAt(xi) === -1)
			{
				return false;
			}
		}
		return true;
	}

Array.prototype.addEntry =
	function (key, value)
	{
		return this.addFirst([key, value]);	
	};
	
Array.prototype.getEntry =
	function (key)
	{
		for (var i = 0; i < this.length; i++)
		{
			var entry = this[i];
			var entryKey = entry[0];
			if (Eq.equals(key, entryKey))
			{
				return entry;
			}
		}
		return false;
	}

Array.prototype.getValue =
  function (key)
  {
    return this.getEntry(key)[1];
  }

/*
Array.prototype.removeEntry =
	function (key)
	{
		for (var i = 0; i < this.length; i++)
		{
			var entry = this[i];
			var entryKey = entry[0];
			if (entryKey === key || entryKey.equals(key))
			{
				return this.slice(0, i).concat(this.slice(i));
			}
		}
		return false;
	};
*/

Array.prototype.updateEntry =
	function (key, value)
	{
		for (var i = 0; i < this.length; i++)
		{
			var entry = this[i];
			var entryKey = entry[0];
			if (Eq.equals(entryKey, key))
			{
				return this.slice(0, i).concat([[entryKey, value]]).concat(this.slice(i + 1));
			}
		}
		return this.concat([[key, value]]);
	};
	
	
Array.prototype.entryKeys =
  function ()
  {
    return this.map(
      function (entry)
      {
        return entry[0];
      });
  } 
  
Array.prototype.entryValues =
  function ()
  {
    return this.map(
      function (entry)
      {
        return entry[1];
      });
  } 

Array.prototype.getSetEntry =
	function (key)
	{
		var entry = this.getEntry(key);
		if (entry)
		{
			return entry[1];
		}
		return [];
	}	
	
Array.prototype.updateSetEntry =
	function (key, value)
	{
		for (var i = 0; i < this.length; i++)
		{
			var entry = this[i];
			var entryKey = entry[0];
			if (Eq.equals(entryKey, key))
			{
				return this.slice(0, i).concat([[key, entry[1].addUniqueLast(value)]]).concat(this.slice(i + 1));
			}
		}
		return this.concat([[key, [value]]]);
	};
	
Array.prototype.combinations =
	function ()
	{
		if (this.length === 0)
		{
			return [];
		}
		if (this.length === 1)
		{
			 return this[0].map(
			 	function (x)
			 	{
			 		return [x];
			 	});
		}
		var rest = this.slice(1).combinations();
		return this[0].flatMap(
			function (x)
			{
				return rest.map(
					function (y) 
					{ 
						return y.addFirst(x);
					});
			});
	};

Array.prototype.forAll =
	function (predicate)
	{
		for (var i = 0; i < this.length; i++)
		{
			if (!(predicate(this[i])))
			{
				return false;
			}
		}
		return true;
	}
	
String.prototype.startsWith =
	function (s)
	{
		return this.lastIndexOf(s, 0) === 0;
	};
	
String.prototype.endsWith = 
	function (s)
	{
		return this.indexOf(s, this.length - s.length) !== -1;
	};
	
String.prototype.equals =
	function (x)
	{
		return this.localeCompare(x) === 0;	
	};
	
Function.prototype.toString =
	function ()
	{
		return this.name + "()";
	};

Number.prototype.equals =
  function (x)
  {
    return this.valueOf() === x; 
  };
	  
	
// functions

function append()
{
	var result = [];
	for (var i = 0; i < arguments.length; i++)
	{
		result = result.concat(arguments[i]);
	}
	return result;
}

function cons(x, l)
{
	return [x].concat(l);
}


// debug
function d(value) { 
	//print(Array.prototype.slice.call(arguments)); 
	return value; }
function dreadline() { var str = readline(); if (str === ":b") { throw new Error(":b"); }}

// assertions
function assertEquals(expected, actual, msg)
{
  if (expected === undefined && actual === undefined)
  {
    return;
  }
  if (expected !== undefined && (expected === actual || (expected.equals && expected.equals(actual))))
  {
    return;
  }
  throw new Error(msg || "assertEquals: expected " + expected + ", got " + actual);
}

function assertSetEquals(expected, actual)
{
  if (expected.toSet().setEquals(actual.toSet()))
  {
    return;
  }
  throw new Error("assertSetEquals: expected " + expected + ", got " + actual); 
}

function assertNotEquals(expected, actual)
{
  if (expected !== actual && !expected.equals(actual))
  {
    return;
  }
  throw new Error("assertNotEquals: not expected " + expected + ", got " + actual);
}

function assertTrue(actual, msg)
{
  if (actual === true)
  {
    return;
  }
  throw new Error(msg || "assertTrue: got " + actual);
}

function assertFalse(actual)
{
  if (actual === false)
  {
    return;
  }
  throw new Error("assertFalse: got " + actual);
}

function assertDefinedNotNull(actual, msg)
{
  if (actual === undefined || actual === null)
  {
    throw new Error(msg || "assertDefinedNotNull: got " + actual);
  }
}


function visitOperator(operatorStr, visitor)
{
  switch (operatorStr)
  {
    case "+": visitor.add(function (x,y) { return x + y }); break;
    case "*": visitor.visitSub(function (x,y) { return x * y }); break;
    case "-": visitor.visitMult(function (x,y) { return x - y }); break;
    case "/": visitor.visitDiv(function (x,y) { return x / y }); break;
    case "===": visitor.visitEqq(function (x,y) { return x === y }); break;
    case "!==": visitor.visitNeqq(function (x,y) { return x !== y }); break;
    case "==": visitor.visitEq(function (x,y) { return x == y }); break;
    case "!=": visitor.visitNeq(function (x,y) { return x != y }); break;
    case "<": visitor.visitLt(function (x,y) { return x < y }); break;
    case "<=": visitor.visitLte(function (x,y) { return x <= y }); break;
    case ">": visitor.visitGt(function (x,y) { return x > y }); break;
    case ">=": visitor.visitGte(function (x,y) { return x >= y }); break;
    throw new Error("cannot handle operator " + operatorStr);
  }  
}


// ECMA
var Ecma = { POW_2_31 : Math.pow(2,31), POW_2_32 : Math.pow(2,32)};

// 5.2 (not included here are equivalent Math.* functions)
Ecma.sign =
  function (x)
  {
    // per 5.2: "sign is never used in standard for x = 0"
    return (x < 0 ? -1 : 1);
  };

// 8.6.2
Ecma.Class =
  {
    OBJECT: "Object", 
    FUNCTION: "Function", 
    ARRAY: "Array", 
    ARGUMENTS: "Arguments", 
    STRING: "String", 
    BOOLEAN: "Boolean", 
    NUMBER: "Number",
    MATH: "Math",
    DATE: "Date",
    REGEXP: "RegExp",
    ERROR: "Error",
    JSON: "JSON"
  };
