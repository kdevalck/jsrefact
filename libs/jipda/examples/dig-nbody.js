// example from "ReLooper" by Dig et al.

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

var cm = new Particle(0, 0, 0);
for (let i=0; i<bodies.length; i++)
{
  let cmm = cm.m + bodies[i].m;
  let cmx = (cm.x * cm.m + bodies[i].x * bodies[i].m) / cmm;
  let cmy = (cm.y * cm.m + bodies[i].y * bodies[i].m) / cmm;
  cm = new Particle(cmx, cmy, cmm);
}
