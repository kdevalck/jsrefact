function Particle(x, y, m)
{
  this.x = x;
  this.y = y;
  this.m = m;
}

Particle.createRandom =
  function()
  {
    return new Particle(Math.random(), Math.random(), Math.random() * 100); 
  };
  
Particle.prototype.moveBy =
  function (dx, dy)
  {
    return new Particle(this.x + dx, this.y + dy);
  };

Particle.prototype.toString =
  function ()
  {
    return "<" + this.x + ", " + this.y + ">";
  };

var bodies = new Array(100);

for (var i=0; i<bodies.length; i++)
{
  bodies[i] = Particle.createRandom();
}

var pbodies = new ParallelArray(100, function (i) {return Particle.createRandom()});
var pbodies2 = pbodies.map(function (p) {return p.moveBy(1, 7);});

var cmm = 0, cmx = 0, cmy = 0;
for (var i=0; i<bodies.length; i++)
{
  var cmm2 = cmm + bodies[i].m;
  cmx = (cmx * cmm + bodies[i].x * bodies[i].m) / cmm2;
  cmy = (cmy * cmm + bodies[i].y * bodies[i].m) / cmm2;
  cmm = cmm2;
}
var cm2 = new Particle(cmx, cmy, cmm);
