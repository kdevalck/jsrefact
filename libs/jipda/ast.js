goog.provide('jipdaast');

function nodeToString(node)
{
  if (node === null)
  {
    return "";
  }
	switch (node.type)
	{
  	case "Literal":
  		return ""+node.value;
    case "Identifier": 
      return node.name;
    case "BinaryExpression": 
    case "LogicalExpression": 
  		return nodeToString(node.left) + node.operator + nodeToString(node.right);
  	case "CallExpression": 
  		return nodeToString(node.callee) + "(" + node.arguments.map(nodeToString).join() + ")";
  	case "FunctionExpression":
  		return "function (" + node.params.map(nodeToString).join() + ") " + nodeToString(node.body);
  	case "LetExpression":
  		return "let (" + node.head.map(nodeToString).join() + ") " + nodeToString(node.body);
  	case "AssignmentExpression":
  		return nodeToString(node.left) + node.operator + nodeToString(node.right);
  	case "ArrayExpression":
  		return "[" + node.elements.map(nodeToString).join(",") + "]";
  	case "MemberExpression":
  		if (node.computed)
  		{
  			return nodeToString(node.object) + "[" + nodeToString(node.property) + "]";
  		}
  		else
  		{
  			return nodeToString(node.object) + "." + nodeToString(node.property)
  		}
  	case "ObjectExpression":
  		return "{" +  node.properties.map(nodeToString).join(",") + "}";
  	case "ThisExpression":
  		return "this";
  	case "NewExpression":
  		return "new " + nodeToString(node.callee) + "(" + node.arguments.map(nodeToString).join() + ")";
    case "UpdateExpression":
      return node.prefix ? node.operator + nodeToString(node.argument) : nodeToString(node.argument) + node.operator;
    case "UnaryExpression":
      return node.operator + nodeToString(node.argument);
  	case "ExpressionStatement":
  		return nodeToString(node.expression) + ";";
    case "ReturnStatement":
      if (node.argument === null)
      {
        return "return;";
      }
      return "return " + nodeToString(node.argument) + ";";
    case "BreakStatement":
      if (node.label)
      {
        return "break " + nodeToString(node.label) + ";";
      }
      return "break;";
    case "LabeledStatement":
      return nodeToString(node.label) + ":" + nodeToString(node.body); 
    case "IfStatement":
      if (node.alternate === null)
      {
        return "if (" + nodeToString(node.test) + ") " + nodeToString(node.consequent);
      }
      else
      {
        return "if (" + nodeToString(node.test) + ") " + nodeToString(node.consequent) + " " + nodeToString(node.alternate);
      }
    case "ConditionalExpression":
      return nodeToString(node.test) + " ? " + nodeToString(node.consequent) + " " + nodeToString(node.alternate);
		case "SwitchStatement":
		  return "switch (" + nodeToString(node.discriminant) + ") {" + (node.cases ? node.cases.map(nodeToString).join("") : "") + "}";
		case "SwitchCase":
		  if (node.test === null)
		  {
		    return "default: " + node.consequent.map(nodeToString).join(" ");
		  }
		  return "case " + nodeToString(node.test) + ": " + node.consequent.map(nodeToString).join(" ");
		case "WhileStatement": 
			return "while (" + nodeToString(node.test) + ") " + nodeToString(node.body);
		case "DoWhileStatement": 
			return "do " + nodeToString(node.body) + " while (" + nodeToString(node.test) + ")";
		case "ForStatement":
			return "for (" + nodeToString(node.init) + ";" + nodeToString(node.test) + ";" + nodeToString(node.update) + ") " + nodeToString(node.body) + ";";
		case "FunctionDeclaration": 
			return "function " + nodeToString(node.id) + "(" + node.params.map(nodeToString).join() + ") " + nodeToString(node.body) + ";";
		case "VariableDeclaration": 
			return node.kind + " " + node.declarations.map(nodeToString).join() + ";";
		case "VariableDeclarator": 
			return nodeToString(node.id) + (node.init ? "=" + nodeToString(node.init) : "");
		case "Property": 
			return nodeToString(node.key) + ":" + nodeToString(node.value);
		case "Program": 
			return node.body.map(nodeToString).join(" ");
		case "BlockStatement": 
			return "{" + node.body.map(nodeToString).join(" ") + "}";
    case "TryStatement":
      return "try " + nodeToString(node.block) + " " + node.handlers.map(nodeToString).join(" ");
    case "CatchClause":
      return "catch (" + nodeToString(node.param) + ") " + nodeToString(node.body);
    case "ThrowStatement":
      return "throw " + nodeToString(node.argument);
		case "EmptyStatement":
			return ";";
		default:
			throw new Error("nodeToString: cannot handle " + node.type); 
  	}
}

function isIdentifier(n)
{
	return n.type === "Identifier";
}

/*
function isVariable(n, ast)
{
	if (isIdentifier(n))
	{
	  var p = parent(n, ast);
	  return isVariableDeclarator(p) || isFunctionExpressio(p) || isFunctionDeclaration(p);
	}
	return false;
}
*/

function isObjectExpression(n)
{
  return n.type === "ObjectExpression";
}

function isReturnStatement(n)
{
  return n.type === "ReturnStatement";
}

function isBreakStatement(n)
{
  return n.type === "BreakStatement";
}

function isLabeledStatement(n)
{
  return n.type === "LabeledStatement";
}

function isCallExpression(n)
{
	return n.type === "CallExpression";
}

function isVariableDeclaration(n)
{
	return n.type === "VariableDeclaration";
}

function isVariableDeclarator(n)
{
	return n.type === "VariableDeclarator";
}

function isAssignmentExpression(n)
{
	return n.type === "AssignmentExpression";
}

function isBinaryExpression(n)
{
  return n.type === "BinaryExpression";
}

function isLogicalExpression(n)
{
  return n.type === "BinaryExpression";
}

function isUnaryExpression(n)
{
  return n.type === "UnaryExpression";
}

function isFunctionExpression(n)
{
  return n.type === "FunctionExpression";
}

function isNewExpression(n)
{
  return n.type === "NewExpression";
}

function isFunctionDeclaration(n)
{
	return n.type === "FunctionDeclaration";
}

function isProgram(n)
{
	return n.type === "Program";
}

function isBlockStatement(n)
{
	return n.type === "BlockStatement";
}

function isThisExpression(n)
{
	return n.type === "ThisExpression";
}

function isMemberExpression(n)
{
	return n.type === "MemberExpression";
}

function isUpdateExpression(n)
{
  return n.type === "UpdateExpression";
}

function isTryStatement(n)
{
  return n.type === "TryStatement";
}

function isCatchClause(n)
{
  return n.type === "CatchClause";
}

function isIfStatement(n)
{
  return n.type === "IfStatement";
}

function isConditionalExpression(n)
{
  return n.type === "ConditionalExpression";
}

function isSwitchStatement(n)
{
  return n.type === "SwitchStatement";
}

function children(node)
{
	switch (node.type)
	{
		case "Literal": 
		case "Identifier":
			return [];
    case "BinaryExpression": 
    case "LogicalExpression": 
			return [node.left, node.right];
		case "CallExpression": 
			return [node.callee].concat(node.arguments);
		case "FunctionExpression": 
			return node.params.concat([node.body]);
		case "LetExpression":
    		return node.head.concat([node.body]);
		case "AssignmentExpression":
			return [node.left, node.right];
		case "ArrayExpression":
			return node.elements;
		case "MemberExpression":
			return [node.object, node.property];
		case "ObjectExpression":
			return node.properties;
		case "ExpressionStatement": 
			return [node.expression];
		case "ThisExpression":
			return [];
		case "NewExpression":
			return [node.callee].concat(node.arguments);
    case "UpdateExpression":
      return [node.argument];
    case "UnaryExpression":
      return [node.argument];
    case "ReturnStatement":
      if (node.argument === null)
      {
        return [];
      }
      return [node.argument];
    case "BreakStatement": 
      if (node.label === null)
      {
        return [];
      }
      return [node.label];
    case "LabeledStatement":
      return [node.label, node.body];
    case "IfStatement": 
      if (node.alternate === null)
      {
        return [node.test, node.consequent];
      }
      return [node.test, node.consequent, node.alternate];
    case "ConditionalExpression": 
      return [node.test, node.consequent, node.alternate];
		case "SwitchStatement":
		  if (node.cases)
		  {
		    return [node.discriminant].concat(node.cases.flatMap(children));		    
		  }
		  return [node.discriminant];
		case "SwitchCase":
		  if (node.test)
		  {
		    return [node.test].concat(node.consequent);
		  }
		  return node.consequent;
		case "WhileStatement": 
			return [node.test, node.body];
		case "DoWhileStatement": 
			return [node.body, node.test];
		case "ForStatement":
			return [node.init, node.test, node.update, node.body];
		case "FunctionDeclaration":
			return [node.id].concat(node.params).concat([node.body]);
		case "VariableDeclaration": 
			return node.declarations;
		case "VariableDeclarator":
		  if (node.init === null)
		  {
		    return [node.id];
		  }
			return [node.id, node.init];
		case "Property":
			return [node.key, node.value];
		case "Program": 
    case "BlockStatement": 
      return node.body;
    case "TryStatement": 
      return [node.block].concat(node.handlers);
    case "CatchClause":
      return [node.param, node.body];
    case "ThrowStatement":
      return [node.argument];
		case "EmptyStatement":
			return [];
		default: 
			throw new Error("children: cannot handle " + node); 
	}
}

function descendants(n)
{
	if (Array.isArray(n))
	{
		return n.flatMap(descendants);
	}
	else
	{
		var cs = children(n);
		return cs.concat(descendants(cs));
	}
}

function nodes(n)
{
	if (Array.isArray(n))
	{
		return n.flatMap(nodes);
	}
	else
	{
		return [n].concat(nodes(children(n)));
	}
}

// debug
function printTree(n)
{
	nodes(n).forEach(
		function (n)
		{ 
			var props = [];
			for (var name in n)
			{
				if (n.hasOwnProperty(name) && name !== "loc" && name != "tag" && name != "toString")
				{
					props = props.addLast(name);
				}
			}
			print(nodeToString(n) + "\t#" + n.tag);
		});
}


var __nodeCounter__ = 0;
function tagNode(node)
{
	node.tag = ++__nodeCounter__;	
}

var __symCounter__ = 0;
function gensym(prefix)
{
	return prefix + ++__symCounter__;	
}

function createAst(source, context)
{
	function visitNode(node)
	{
	
		function toString()
		{
			return nodeToString(this);
		}

		function nodify(x)
		{
		  tagNode(x);
		  x.toString = toString;
		}
	
		function doVisit(node)
		{
		  if (node === null)
		  {
		    return;
		  }
			nodify(node);
			var cs = children(node);
			cs.forEach(function (child) { doVisit(child, node);});
		}		
		doVisit(node);
	}
	
  //var ast = Reflect.parse(source, {loc: false});
  var ast = esprima.parse(source, {loc: false});
  if (context === "Expression")
  {
    if (ast.body.length !== 1)
    {
      throw new Error("createAst: expected single expression, got " + ast.body);
    }
    if (!ast.body[0].hasOwnProperty("expression"))
    {
      throw new Error("createAst: expected expression, got " + ast.body[0].type);
    }
    ast = ast.body[0].expression;
  }
  else if (context === "Statement")
  {
    if (ast.body.length !== 1)
    {
      throw new Error("createAst: expected single statement, got " + ast.body);
    }
    ast = ast.body[0];
  }
	visitNode(ast);
	return ast;
}

function tagToNode(tag, ast)
{
  var ns = nodes(ast).filter(function (node) { return node.tag === tag });
  if (ns.length === 1)
  {
    return ns[0];
  }
  throw new Error("for tag " + tag + " got " + ns);
}

function isChild(node, parent)
{
	return children(parent).indexOf(node) > -1;
}

// createFromChildren

function parent(node, ast)
{
	var cs = children(ast);
	if (cs.indexOf(node) > -1)
	{
		return ast;
	}
	for (var i = 0; i < cs.length; i++)
	{
		if (p = parent(node, cs[i]))
		{
	  		return p;
		}
	}
	return false;
}

function isDeclarationIdentifier(n, ast)
{
  if (isIdentifier(n))
  {
    var p = parent(n, ast);
    return isVariableDeclarator(p) || isFunctionExpression(p) || isFunctionDeclaration(p) || isCatchClause(p);
  }
  return false;
}

function isVarDeclarationIdentifier(n, ast)
{
  if (isIdentifier(n))
  {
    var p = parent(n, ast);
    if (isVariableDeclarator(p))
    {
      var pp = parent(p, ast);
      return pp.kind === "var";
    }
    return isFunctionExpression(p) || isFunctionDeclaration(p);
  }
  return false;
}

function isConstDeclarationIdentifier(n, ast)
{
  if (isIdentifier(n))
  {
    var p = parent(n, ast);
    if (isVariableDeclarator(p))
    {
      var pp = parent(p, ast);
      return pp.kind === "const";
    }
  }
  return false;
}

function isAssignedIdentifier(n, ast)
{
  if (isIdentifier(n))
  {
    var p = parent(n, ast);
    if (isAssignmentExpression(p))
    {
      return p.left === n;
    }
  }
  return false;
}

function isReferenceIdentifier(n, ast)
{
  if (isIdentifier(n))
  {
    var p = parent(n, ast);
    if (isAssignmentExpression(p))
    {
      return p.left !== n;
    }
    return !(isVariableDeclarator(p) || isFunctionExpression(p) || isFunctionDeclaration(p) || isCatchClause(p));
  }
  return false;
}

function enclosingBlock(node, ast)
{
	var p = parent(node, ast);
	while (p)
	{
		if (isBlockStatement(p) || isProgram(p))
		{
			return p;
		}
		p = parent(p, ast);
	}
	return false;
}

function enclosingFunction(node, ast)
{
	var p = parent(node, ast);
	while (p)
	{
		if (isFunctionExpression(p) || isFunctionDeclaration(p))
		{
			return p;
		}
		p = parent(p, ast);
	}
	return false;
}
 
function scopeChain(node, ast)
{
	function varsInFunctionScope(node, vars)
	{
		//print("viFunS", node, vars);
		switch (node.type)
		{
			case "VariableDeclaration":
				if (node.kind === "var") // ES6: 'const' has block scope!
				{
					node.declarations.forEach(
						function (declaration)
						{
							vars = vars.addLast(declaration.id);
						});
				}
				break;
			case "FunctionExpression":
				return vars;
			case "FunctionDeclaration":
				return vars.addLast(node.id);
		}
		var cs = children(node);
		for (var i = 0; i < cs.length; i++)
		{
			vars = varsInFunctionScope(cs[i], vars);
		}
		return vars;
	}

	function varsInBlockScope(blockStatement)
	{
		//print("viBloS", blockStatement);
		var vars = [];
		var cs = children(blockStatement);
		for (var i = 0; i < cs.length; i++)
		{
			var node = cs[i];
			if (isVariableDeclaration(node) && (node.kind === "let" || node.kind === "const"))
			{
				node.declarations.forEach(
					function (declaration)
					{
						vars = vars.addLast(declaration.id);
					});
			}
		}
		return vars;	
	}
	
	function upVars(node, vars)
	{
		var p = parent(node, ast);
		//print("upVars", node, vars, p);
		if (!p)
		{
			return vars;
		}
		switch (p.type)
		{
			case "ForStatement":
			{
				var init1 = p.init;
				var letVars1 = [];
				if (isVariableDeclaration(init1) && init1.kind === "let")
				{
					init1.declarations.forEach(
						function (declaration)
						{
							letVars1 = letVars1.addLast(declaration.id);
						});
				}
				vars = vars.addLast(letVars1);
				break;
			}
			case "BlockStatement":
			{
				var blockScopeVars2 = varsInBlockScope(p);
				blockScopeVars2.kind = "block";
				vars = vars.addLast(blockScopeVars2);
				break;
			}
			case "FunctionExpression":
			case "FunctionDeclaration":
			{
				var funScopeVars3 = varsInFunctionScope(p.body, p.params.slice(0));
				funScopeVars3.kind = "fun";
				vars = vars.addLast(funScopeVars3);
				break;
			}
			case "CatchClause":
			{
			  var catchClauseVars = varsInFunctionScope(p.body, [p.param]);
			  catchClauseVars.kind = "catch";
			  vars = vars.addLast(catchClauseVars);
			  break;
			}
			case "LetExpression":
			{
				if (!isVariableDeclarator(node))
				{
					var letScopeVars4 = p.head.map(function (decl) { return decl.id; });
					letScopeVars4.kind = "let";
					vars = vars.addLast(letScopeVars4);
				}
				break;
			}
			case "Program":
			{
				var funScopeVars5 = varsInFunctionScope(p, []);
				// TODO review this:
				// for the moment, we will also allow top-level block-scoped vars for easy testing
				// (FireFox seems more forgiving about this than Chrome)
				funScopeVars5 = funScopeVars5.concat(varsInBlockScope(p));
				////
				funScopeVars5.kind = "fun";
				vars = vars.addLast(funScopeVars5);
				break;
			}
		}
		return upVars(p, vars);
	}
	
	return upVars(node, []);
}

function lookupDeclarationIdentifier(name, node, ast)
{
	var vars = scopeChain(node, ast).flatten().filter(
		function (n)
		{
			return name === n.name;
		});
	if (vars.length == 0)
	{
		return false;
	}
	else
	{
		return vars[0];
	}
}

function lookupNodeDeclarationIdentifier(node, ast)
{
  // TODO consider to support more types of nodes than the ones having .name
  return lookupDeclarationIdentifier(node.name, node, ast);
}

function declarationIdentifierKind(n, ast)
{
  var p = parent(n, ast);
  if (isVariableDeclarator(p))
  {
    var pp = parent(p, ast);
    return pp.kind;
  }
  if (isFunctionDeclaration(p) || isFunctionExpression(p))
  {
    return "var";
  }
  throw new Error("expected declaration identifier, got " + n);
}

function isConstReferenceIdentifier(n, ast)
{
  if (isReferenceIdentifier(n, ast))
  {
    var id = lookupDeclarationIdentifier(n.name, n, ast);
    return "const" === declarationIdentifierKind(id, ast);
  }
  return false;
}

function isVarReferenceIdentifier(n, ast)
{
  if (isReferenceIdentifier(n, ast))
  {
    var id = lookupDeclarationIdentifier(n.name, n, ast);
    return "var" === declarationIdentifierKind(id, ast);
  }
  return false;
}

/*
function lookupVarRefs(vr, ast)
{
	return nodes(ast).filter(
		function (n)
		{
			return n.kind === "Reference" && lookupIdentifierVar(n, ast) === vr;
		});
}
*/

/**
 * Returns the list of referenced variables for node.
 */
function lookupRefVars(n, ast)
{
	function doLookupRefVars(n)
	{
		if (isReferenceIdentifier(n, ast))
		{
			var vr = lookupDeclarationIdentifier(n.name, n, ast);
			if (vr)
			{
				return [vr];
			}
			return [];
		}
		else if (n.type === "FunctionDeclaration")
		{
			var vr = lookupDeclarationIdentifier(n.id.name, n, ast);
			if (vr)
			{
				return [vr];
			}
			return [];
		}
		var cs = children(n).filter(
			function (c)
			{
				return c.type !== "FunctionExpression" && c.type !== "FunctionDeclaration";
			});
		return cs.flatMap(doLookupRefVars);
	}
	
	return doLookupRefVars(n);
}

function lookupAssignmentVars(n, ast)
{
	function doLookupAssignmentVars(n)
	{
		if (isAssignmentExpression(n) && isIdentifier(n.left))
		{
			var vr = lookupDeclarationIdentifier(n.left.name, n, ast);
			if (vr)
			{
				return doLookupAssignmentVars(n.right).addFirst(vr);
			}
			return doLookupAssignmentVars(n.right);
		}
		else if (isUpdateExpression(n) && isIdentifier(n.argument))
		{
			var vr = lookupDeclarationIdentifier(n.argument.name, n, ast);
			if (vr)
			{
				return [vr];
			}
			return doLookupAssignmentVars(n.argument);			
		}
		var cs = children(n).filter(
			function (c)
			{
				return c.type !== "FunctionExpression" && c.type !== "FunctionDeclaration";
			});
		return cs.flatMap(doLookupAssignmentVars);
	}
	
	return doLookupAssignmentVars(n);
}

// (extra) filters


function filterNodesParse(ns, text, context)
{
	text = text.trim();
	var target = createAst(text, context).toString();
	var result = [];
	for (var i = 0; i < ns.length; i++)
	{
		var nsi = ns[i];
		if (target.equals(nsi.toString()))
		{
			result = result.addLast(nsi);
		}
	}
	return result;
}

function filterNodesText(ns, text)
{
	var target = text.trim();
	var result = [];
	for (var i = 0; i < ns.length; i++)
	{
		var nsi = ns[i];
		if (nsi.toString().startsWith(target))
		{
			result = result.addLast(nsi);
		}
	}
	return result;
}


/////////////////////////////////////////////////

function $$$(ns, ast)
{
	return new AstQuery(ns, ast);
}

function AstQuery(ns, ast)
{
	if (Array.isArray(ns))
	{	
		this.ns = ns;
		if (!ast)
		{
			throw new Error("ast required when passing array of nodes");
		}
		this.ast = ast;
	}
	else
	{
		this.ns = [ns];
		this.ast = ast || ns;
	}
}

AstQuery.prototype.toArray =
	function ()
	{
		return this.ns.slice(0);
	};
	
AstQuery.prototype.toNode =
	function ()
	{
		if (this.ns.length !== 1)
		{
			throw new Error("AstQuery.toNode: expected 1 node, got " + this.ns.length);
		}
		return this.ns[0];
	};
	
AstQuery.prototype.toString =
  function ()
  {
    return this.ns.toString();
  }

AstQuery.prototype.children =
	function ()
	{
		return $$$(this.ns.flatMap(children), this.ast);
	};
	
AstQuery.prototype.descendants =
	function ()
	{
		return $$$(descendants(this.ns), this.ast);
	};

AstQuery.prototype.nodes =
	function ()
	{
		return $$$(nodes(this.ns), this.ast);
	};

AstQuery.prototype.filter =
  function (pred_n, name)
  {
    var result = this.ns.filter(pred_n(this.ast));
    if (name)
    {
      result = result.filter(hasName_n(name));
    }
    return $$$(result, this.ast);
  };
  	
function isFunctionExpression_n(ast)
{
  return function (n) {return isFunctionExpression(n, ast)};
}

function isDeclarationIdentifier_n(ast)
{
  return function (n) {return isDeclarationIdentifier(n, ast)};
}

function isVarDeclarationIdentifier_n(ast)
{
  return function (n) {return isVarDeclarationIdentifier(n, ast)};
}

function isConstDeclarationIdentifier_n(ast)
{
  return function (n) {return isConstDeclarationIdentifier(n, ast)};
}

function isReferenceIdentifier_n(ast)
{
  return function (n) {return isReferenceIdentifier(n, ast)};
}

function isConstReferenceIdentifier_n(ast)
{
  return function (n) {return isConstReferenceIdentifier(n, ast)};
}

function isVarReferenceIdentifier_n(ast)
{
  return function (n) {return isConstReferenceIdentifier(n, ast)};
}

function hasName_n(name)
{
  return function (n) {return name.equals(n.name)};
}

AstQuery.prototype.filterDeclarationIdentifiers =
  function (name)
  {
    return this.filter(isDeclarationIdentifier_n, name);
  };
  
AstQuery.prototype.findDeclarationIdentifiers =
  function (name)
  {
    return this.nodes().filterDeclarationIdentifiers(name);
  };
    
AstQuery.prototype.filterConstDeclarationIdentifiers =
  function (name)
  {
    return this.filter(isConstDeclarationIdentifier_n, name);
  };
  
AstQuery.prototype.findConstDeclarationIdentifiers =
  function (name)
  {
    return this.nodes().filterConstDeclarationIdentifiers(name);
  };
    
AstQuery.prototype.filterVarDeclarationIdentifiers =
  function (name)
  {
    return this.filter(isVarDeclarationIdentifier_n, name);
  };
  
AstQuery.prototype.findVarDeclarationIdentifiers =
  function (name)
  {
    return this.nodes().filterVarDeclarationIdentifiers(name);
  };
  
AstQuery.prototype.filterReferenceIdentifiers =
  function (name)
  {
    return this.filter(isReferenceIdentifier_n, name);
  };
  
AstQuery.prototype.findReferenceIdentifiers =
  function (name)
  {
    return this.nodes().filterReferenceIdentifiers(name);
  };
    
AstQuery.prototype.filterConstReferenceIdentifiers =
  function (name)
  {
    return this.filter(isConstReferenceIdentifier_n, name);
  };
  
AstQuery.prototype.findConstReferenceIdentifiers =
  function (name)
  {
    return this.nodes().filterConstReferenceIdentifiers(name);
  };
    
AstQuery.prototype.filterVarReferenceIdentifiers =
  function (name)
  {
    return this.filter(isVarReferenceIdentifier_n, name);
  };
  
AstQuery.prototype.findVarReferenceIdentifiers =
  function (name)
  {
    return this.nodes().filterVarReferenceIdentifiers(name);
  };
      
  
AstQuery.prototype.withName =
	function (name)
	{
		return $$$(this.ns.filter(hasName_n(name)), this.ast);
	};

AstQuery.prototype.findExpression =
	function (text)
	{
		return $$$(filterNodesParse(nodes(this.ns), text, "Expression"), this.ast); 	
	}

AstQuery.prototype.findText =
	function (text)
	{
		return $$$(filterNodesText(nodes(this.ns), text), this.ast); 	
	}


// another attempt at an API

AstQuery.prototype.varsWithName =
  function (name)
  {
    return $$$(nodes(this.ns).filter(isVarDeclarationIdentifier_n(this.ast)).filter(hasName_n(name)), this.ast);  
  }

AstQuery.prototype.functionDeclarationsWithName =
  function (name)
  {
    return $$$(nodes(this.ns).filter(isFunctionDeclaration).filter(function (n) {return n.id.name === name}), this.ast);  
  }

AstQuery.prototype.functionExpressions =
  function ()
  {
    return $$$(nodes(this.ns).filter(isFunctionExpression), this.ast);
  }

AstQuery.prototype.newExpressions =
  function ()
  {
    return $$$(nodes(this.ns).filter(isNewExpression), this.ast);
  }
