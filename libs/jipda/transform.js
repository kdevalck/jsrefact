function createFromChildren(node, ncs)
{
	function copy(node, mixin)
	{
		var newNode = {type:node.type, kind:node.kind, loc:node.loc, toString:node.toString};
		tagNode(newNode);
		for (var name in mixin)
		{
			newNode[name] = mixin[name];
		}
		return newNode;
	}

	switch (node.type)
	{
		case "Literal":
			return copy(node, {value: node.value});
		case "Identifier":
			return copy(node, {name: node.name});
		case "BinaryExpression": 
			return copy(node, {left: ncs[0], right: ncs[1]});
		case "CallExpression": 
			return copy(node, {callee: ncs[0], arguments: ncs.slice(1)});
		case "FunctionExpression": 
			return copy(node, {params: ncs.slice(0, -1), body: ncs[ncs.length - 1]});
		case "LetExpression":
			return copy(node, {head: ncs.slice(0, -1), body: ncs[ncs.length - 1]});
		case "AssignmentExpression":
			return copy(node, {left: ncs[0], right: ncs[1]});
		case "ArrayExpression":
			return copy(node, {elements: ncs});
		case "MemberExpression":
			return copy(node, {object: ncs[0], property: ncs[1]});
		case "ObjectExpression":
			return copy(node, {properties: ncs});
		case "ExpressionStatement": 
			return copy(node, {expression: ncs[0]});
		case "ReturnStatement": 
			return copy(node, {argument: ncs[0]});
		case "IfStatement": 
			if (ncs.length === 2)
			{
				return copy(node, {test: ncs[0], consequent: ncs[1]});
			}
			else
			{
				return copy(node, {test: ncs[0], consequent: ncs[1], alternate: ncs[2]});
			}
		case "WhileStatement": 
			return copy(node, {test: ncs[0], body: ncs[1]});
		case "DoWhileStatement": 
			return copy(node, {body: ncs[0], test: ncs[1]});
		case "FunctionDeclaration":
			return copy(node, {params: ncs.slice(0, -1), body: ncs[ncs.length - 1]});
		case "VariableDeclaration": 
			return copy(node, {declarations: ncs});
		case "VariableDeclarator":
			return copy(node, {id: ncs[0], init: ncs[1]});
		case "PropertyDeclarator":
			return copy(node, {key: node.key, value: ncs[0]});
		case "Program": 
		case "BlockStatement": 
			return copy(node, {body: ncs});
		default: 
			throw new Error("createFromChildren: cannot handle " + node); 
	}
}


function rewrite(node, strategy)
{
	var rewritten = strategy(node);
	if (rewritten)
	{
		return rewritten;
	}
	var cs = children(node);
	var ncs = cs.map(
		function (c)
		{
			return rewrite(c, strategy);
		});
	if (cs.equals(ncs))
	{
		return node;
	}
	return createFromChildren(node, ncs);
}

function replace(ast, mapping)
{
	return rewrite(ast, function (node)
		{
			return mapping[node.toString()];
		});
}


// refactorings

function parallelizeBinaryExpressions(ast, ipda)
{
	return rewrite(ast,
		function (node)
		{
			if (isBinaryExpression(node))
			{
				var left = node.left;
				var right = node.right;
				var operator = node.operator;
				if (isCallExpression(left)
					&& isCallExpression(right)
					&& areIndependent([left, right], ast, ipda))
				{
					return replace(createAst("let (x=future($1),y=$2) touch(x)"+operator+"y"), {"$1":left,"$2":right}); 
				}
			}
		});
}
