function Circle(x, y, r)
{
  this.x = x;
  this.y = y;
  this.r = r;
}

function area(s)
{
  return Math.PI * s.r * s.r;
}

var circles = [[10, 100, 4], [-10, -10, 3], [0, 50, 5]].map(
  function (xyr)
  {
    return new Circle(xyr[0], xyr[1], xyr[2]);
  });
var totalArea = circles.map(area).reduce(function (x, y) {return x+y});
totalArea
