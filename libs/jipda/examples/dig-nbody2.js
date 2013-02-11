// reworked "ReLooper" example: instead of reducing using Particle, just update vars outside loop

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
    this.x = this.x + dx;
    this.y = this.y + dy;
  };

var bodies = new Array(100000);

for (let i=0; i<bodies.length; i++)
{
  bodies[i] = Particle.createRandom();
}

for (let i=0; i< bodies.length; i++)
{
  bodies[i].moveBy(1, 7);
}

var cmm = 0, cmx = 0, cmy = 0;
for (let i=0; i<bodies.length; i++)
{
  var cmm2 = cmm + bodies[i].m;
  cmx = (cmx * cmm + bodies[i].x * bodies[i].m) / cmm2;
  cmy = (cmy * cmm + bodies[i].y * bodies[i].m) / cmm2;
  cmm = cmm2;
}
var cm2 = new Particle(cmx, cmy, cmm);
