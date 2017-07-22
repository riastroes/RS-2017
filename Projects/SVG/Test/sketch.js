
/*
EXAMPLES    http://zenozeng.github.io/p5.js-svg/test/
*/

var grid;

function setup(){
  createCanvas(1200,1200, SVG);
  //parent("divcanvas");

  grid = new Grid(10,10);
  background(100);
  stroke(0);
  fill(255);
}
function draw(){
    for(var i = 0 ; i < grid.p.length; i++){
        rect(grid.p[i].x, grid.p[i].y, 80,80);
    }
   
}