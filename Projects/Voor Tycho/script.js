var canvas;
var canvas1, canvas2, canvas3;
var img1,img2,img3;

var issaved;
function preload(){
    img1 = loadImage("https://source.unsplash.com/6000x4000/?Rocky mountains");
    img2 = loadImage("https://source.unsplash.com/6000x4000/?Tree");
    img3 = loadImage("https://source.unsplash.com/6000x4000/?Hawk");
}


function setup(){
  
  canvas = createCanvas(6000,4000);
  canvas.parent(document.getElementById("divcanvas") );
  
    blendMode(BLEND)
    image(img1, 0,0);
    blendMode(DIFFERENCE);
    image(img2, 0,0);
    blendMode(DIFFERENCE);
    image(img3, 0,0);


 
    
    var a = document.getElementById("image1")
    a.src = "https://source.unsplash.com/6000x4000/?Rocky mountains";
    
   
     var b = document.getElementById("image2")
    b.src = "https://source.unsplash.com/6000x4000/?Tree";
   

     var c = document.getElementById("image3")
    c.src = "https://source.unsplash.com/6000x4000/?Hawk";
   


    
    issaved = false;
}
function draw(){
   
}


function mousePressed(){
    if(!issaved){
        
        saveCanvas("result","jpg");
        issaved = true;
    }
}






