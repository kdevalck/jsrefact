// Tool-supported Refactoring for JavaScript, Feldthaus et al., OOPSLA'11
// Shapes example

/// stubbing jsdraw2d
function jsColor(c)
{
}

jsColor.prototype.rgbToHex =
  function (r, g, b)
  {
  }

function jsPoint(x, y)
{
}

function jsGraphics(canvas)
{
}

jsGraphics.prototype.fillCircle =
  function (color, point, radius)
  {
  }

jsGraphics.prototype.fillRectangle =
  function (color, point, width, height)
  {
  }

///

/// stubbing browser env

var document = { getElementById : function (id) { } };
function alert(msg)
{
}
///


function Circle(x, y, r, c) {
  this.x = x;
  this.y = y;
  this.radius = r;
  this.color = c;
  this.drawShape = function (gr) {
    gr.fillCircle(new jsColor(this.color),
                  new jsPoint(this.x,this.y),
                  this.radius);
  };
}

function Rectangle(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.color = c;
  this.drawShape = function (gr) {
    gr.fillRectangle(new jsColor(this.color),
                     new jsPoint(this.x,this.y),
                     this.width, this.height);
  };
}

Rectangle.prototype.getArea = function() {
  return this.width * this.height;
};

function r(n) { return Math.round(Math.random() * n); }

function drawAll(sh) {
  var gr =
    new jsGraphics(document.getElementById("canvas"));
  sh.map(function (s) { s.drawShape(gr); });
}

var shapes = [];
for (var i = 0; i < 500; i++) {
  var o = new jsColor().rgbToHex(r(255),r(255),r(255));
  switch(r(2)){
    case 0:
      shapes[i] = new Circle(r(500),r(500),r(50),o);
      break;
    case 1:
      shapes[i] = new Rectangle(r(500),r(500),r(50),r(50),o);
      alert(shapes[i].getArea());
      break;
  }
}
drawAll(shapes);