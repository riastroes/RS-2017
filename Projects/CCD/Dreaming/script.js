var texture;
var loop;
var bubbles;
function preload(){
   texture = loadImage("resources/egg-water-glass.jpg")
   
}
function setup(){
  
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.getElementById("divcanvas") );
  fullscreen();
  texture.resize(width,height);
  
  loop = new Loop(); 
  bubbles = [];
  imageMode(CENTER);
  bubbles.push(new Bubble(random(width), random(height)));
  bubbles.push(new Bubble(random(width), random(height)));
  bubbles.push(new Bubble(random(width), random(height)));
  bubbles.push(new Bubble(random(width), random(height)));
  bubbles.push(new Bubble(random(width), random(height)));
  
  
}
function draw(){
  blendMode(BLEND);
  image(texture, width/2, height/2);
  for(var b = 0; b < bubbles.length; b++){
    bubbles[b].move();
    bubbles[b].draw();
  }
  
}
function mousePressed(){
  bubbles.push(new Bubble(mouseX, mouseY));

}