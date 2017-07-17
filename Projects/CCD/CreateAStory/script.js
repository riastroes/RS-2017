var canvas;
var app;
var loop;
var images;
var mode;
var loopmode;
var inimage1;
var inimage2;
var inimage3;
var loadimage1;
var loadimage2;
var loadimage3;




function setup(){
  canvas = createCanvas(900,600);
  canvas.parent(document.getElementById("divcanvas") );
  fullscreen();
  images = [];
  inimage1 = "";
  inimage2 = "";
  inimage3 = "";
  app = new App();
  loop = new Loop(); 
  mode = BURN;

  
 
}
function draw(){
  
    if(inimage1 == "" && inimage2 == "" && inimage3 == ""){
        fill(0);
        textSize(30);
        text("Here is the space for your story.", 50, height/2);
    
    }
    else{
    
        blendMode(BLEND);
        app.draw();
        loop.draw(mouseX, mouseY);
    }
}
/********INTERFACE******/

function selectImage1(){
    inimage1 = document.getElementById("inImage1").value;
    loadimage1 = document.getElementById("loadimage1");
    if(inimage1 != "" ){
        loadimage1.innerHTML = " loading ...";
        loadImage("https://source.unsplash.com/1200x800/?" + inimage1, 
            function(img) {
                 images[0]= img;
                clear();
                image(images[0], 0, 0);
                loadimage1.innerHTML = " ok";
                app.draw();
                },
            function(img){ 
            if(img == undefined){
            loadimage1.innerHTML = " please, try again.";
            }
        });
    }
   
   
}
function selectImage2(){
    inimage2 = document.getElementById("inImage2").value;
    loadimage2 = document.getElementById("loadimage2");
    if(inimage2 != "" ){
        loadimage2.innerHTML = " loading ...";
        loadImage("https://source.unsplash.com/1200x800/?" + inimage2, 
            function(img) {
                
                images[1] = img;
                clear();
                image(images[1], 0, 0);
                loadimage2.innerHTML = " ok";
                app.draw();
                },
                
            function(img){ 
            if(img == undefined){
            loadimage2.innerHTML = " please, try again.";
            }
        });
    }
    
}
function selectImage3(){
     inimage3 = document.getElementById("inImage3").value;
     loadimage3 = document.getElementById("loadimage3");
     if(inimage3 != ""){
        loadimage3.innerHTML = " loading ...";
        loadImage("https://source.unsplash.com/1200x800/?" + inimage3, 
            function(img) {
                
                images[2] = img;
                clear();
                image(images[2], 0, 0);
                loadimage3.innerHTML = " ok";
                app.draw();
                },
        function(img){ 
            if(img == undefined){
            loadimage3.innerHTML = " please, try again.";
            }
        });
     }
    

}
function selectMode(){
   app.draw();
  
}
function selectLoopMode(){
   app.draw();
  
}
function download(){
    save(inimage1  +"-"+ inimage2 +"-"+ inimage3 +".jpg");

    var f = canvas.elt.toBlob(function(blob) {
      var newImg = document.createElement('img'),
      url = URL.createObjectURL(blob);

    //   uriContent = "data:application/octet-stream," + encodeURIComponent(content);
    //   location.href = uriContent;
      
  //f.save("https://drive.google.com/drive/folders/0Bwz0_HF7ZKGHYUdRT2FwMjZZVG8/" + inimage1  +"-"+ inimage2 +"-"+ inimage3 +".jpg");
    newImg.onload = function() {
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(url);
  };

  newImg.src = url;
  document.body.appendChild(newImg);
});

}
function App(){
     this.mode = 2;
}
App.prototype.style = function(){
    stroke(0);
    fill(255);
}
App.prototype.draw = function(){
    clear();
    var selmode = document.getElementById("selectmode").value;
    blendMode(selmode);
    if(images[0] != undefined){
        image(images[0], 0,0);
    }
    if(images[1] != undefined){
        image(images[1], 0,0);
    }
    if(images[2] != undefined){
        image(images[2], 0,0);
    }
    
    
}


