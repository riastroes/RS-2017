/* Ria Stroes */
/* @updated: september 2017  */



var issaved;
var acolor, bcolor;
var colorstrip;
var colShapes;

function setup() {

    var canvas = createCanvas(1000, 1000); 
 
    colorstrip = new ColorStrip(createVector(0,0), 1000, 50);
    colorstrip.setTransparency(0.2);

    colorstrip.create(10,"paarse_kleuren");
    colorstrip.create(10,"rode_kleuren");
    colorstrip.create(10,"gele_kleuren");
    colorstrip.show();
    
    
    colShapes = [];
    
    issaved = false;
}

function mousePressed() {
    if (!issaved) {
       
        issaved = true;
    }
    
    if (colorstrip.isClicked(true)){

    }
    else{
        var i = colShapes.length;
        
        colShapes[i] = new Shape(colorstrip.color);
        colShapes[i].createCircle(createVector(550,550), 6);

    }
}

function draw() {
    if(frameCount%50 == 0){
        for(var i = 0; i < colShapes.length; i++){
            colShapes[i].changeDirection();
            colShapes[i].change(8);
        }
    }
    if(frameCount%1 == 0){
        colorstrip.clearBackground(show);
        for(var i = 0; i < colShapes.length; i++){
            colShapes[i].move(1);
            colShapes[i].draw();
        }
    }
} 
