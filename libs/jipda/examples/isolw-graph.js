

//////


function Graph(w,h)
{
	this.w = w;
	this.h = h;
	this.nodes = [];
	this.links = [];
}

function addNode(node)
{
	this.nodes.push(node);
}

function addLink(source, target)
{
	this.links.push({source: source, target: target});
}

function draw()
{
	for (var i = 0; i < links.length; i++)
	{
		var link = links[i];
		// ...
	}

	for (var j = 0; j < nodes.length; j++)
	{
		var node = nodes[i];
		// ...
	}
}

//////

