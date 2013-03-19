goog.provide('depend');

function Dependency(type, source, target)
{
	this.type = type;
	this.source = source;
	this.target = target;
}

Dependency.prototype.toString =
	function ()
	{
		return [this.type, this.source, this.target].toString();
	};

Dependency.prototype.equals =
	function (x)
	{
		if (this === x)
		{
			return true;
		}
		return this.type.equals(x.type) && this.source.equals(x.source) && this.target.equals(x.target);
	}

function lexDependencies(e1, e2, ast)
{
	var dr1 = lookupRefVars(e1, ast).toSet();
	var dr2 = lookupRefVars(e2, ast).toSet();
	var dw1 = lookupAssignmentVars(e1, ast).toSet();
	var dw2 = lookupAssignmentVars(e2, ast).toSet();
	var rws = dr1.keepAll(dw2);
	var wrs = dw1.keepAll(dr2);
	var wws = dw1.keepAll(dw2);
	var deps = [];
	if (rws.length > 0)
	{
		deps = deps.addLast(new Dependency("rw", "lex", rws));
	}
	if (wrs.length > 0)
	{
		deps = deps.addLast(new Dependency("wr", "lex", wrs));
	}
	if (wws.length > 0)
	{
		deps = deps.addLast(new Dependency("ww", "lex", wws));
	}
	return deps;
}

function ipDependencies(e1, e2, depState)
{
	var dr1 = depState.readVars(e1);
	var dr2 = depState.readVars(e2);
	var dw1 = depState.writtenVars(e1);
	var dw2 = depState.writtenVars(e2);
	var rws = dr1.keepAll(dw2);
	var wrs = dw1.keepAll(dr2);
	var wws = dw1.keepAll(dw2);
	var deps = [];
	if (rws.length > 0)
	{
		deps = deps.addLast(new Dependency("rw", "ip", rws));
	}
	if (wrs.length > 0)
	{
		deps = deps.addLast(new Dependency("wr", "ip", wrs));
	}
	if (wws.length > 0)
	{
		deps = deps.addLast(new Dependency("ww", "ip", wws));
	}
	return deps;	
}

function dependencies(e1, e2, ast, depState)
{
	return lexDependencies(e1, e2, ast).concat(ipDependencies(e1, e2, depState));
}

function areDependent(e1, e2, ast, depState)
{	
	return dependencies(e1, e2, ast, depState).length > 0;
}

function areIndependent(es, ast, depState)
{
	return [es, es].combinations().map(
		function (e1e2)
		{
			var e1 = e1e2[0];
			var e2 = e1e2[1];
			return !(e1 !== e2 && areDependent(e1, e2, ast, depState));
		}).reduce(
			function (x, y)
			{
				return x && y;
			}, true);
}