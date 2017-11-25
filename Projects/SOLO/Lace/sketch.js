/* Ria Stroes */
/* @updated: november 2017  */
/* Project 'SOLO', The Opera Dress
/* Co-creation with Jolanta Izabela Pawlak
*/


var grid;
var palette;
var colors;
var margew, margeh;

var print3D;
var layer;
var maxlayers;
var show;

var issaved;
var model;
var name;



function preload() {
    model = [];
   
    model[1] = loadImage("images/Lace01.jpg");
    model[2] = loadImage("images/Lace02.jpg");
    model[3] = loadImage("images/Lace03.jpg");
    model[4] = loadImage("images/Lace04.jpg");
    model[5] = loadImage("images/Lace05.jpg");
    model[6] = loadImage("images/Lace06.jpg");
    model[7] = loadImage("images/Lace07.jpg");
    model[8] = loadImage("images/Lace08.jpg");
    model[9] = loadImage("images/Lace09.jpg");


}

function setup() {

    var canvas = createCanvas(1100, 1100);
    for(var i = 1; i <10; i++){
        model[i].resize(500,500);
    }
   
    windowscale = 1;


    palette = new Color();
    colors = palette.create();
    strokeWeight(2);


    layer = 0;
    maxlayers = 4;
    var startlayerheight = 0; // 1
    var maxskirt = 3; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    print3D = new Print3D("Anet", "SAT1N", "fine", maxlayers, startlayerheight, maxskirt);
    

    maxw =60;
    maxh =60;
    margew = 300;
    margeh = 300;


    print3D.start();

    issaved = false;




}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save(name);
        issaved = true;
    }
}

function draw() {

    if (layer == 0) {


        show = true;
        grid = new Grid();
        grid.init2(margew, margeh, maxw, maxh);
        grid.showMargin2(margew, margeh);
        //grid.maskImage2(margew, margeh, model1, colors[0]);
        grid.collectColors(margew, margeh, model[3], colors[0]);
        grid.reorder();
        grid.reorderc();
        grid.showErrors();
        
        stroke(0);
        text(grid.gridwidth + " x " + grid.gridheight,50, 50 )

        createLace(colors[0], color(0,255,0));


        name = "Lace03"
        print3D.print(layer);
       



    } else if (layer < maxlayers) {


        //     show = true;
        //     grid = new Grid();
        //     grid.init(marge, maxw, maxh);
        //    // grid.showMargin(marge);
        //     grid.maskColorImage(marge, model2, colors[0]);
        //     grid.reorder();
        //     grid.draw(colors[2]);




        //     createPattern2();
        //     print3D.print(layer);



    } else {
        print3D.stop();
        noLoop();
    }
    layer++;

}



function createLace(acolor, bcolor) {
    
    var path = [];
    for(var i = 0; i < grid.c.length - 1;i++){
        if(grid.c[i].p.x <= grid.c[i+1].p.x && grid.c[i].p.y == grid.c[i].p.y){    //van links naar rechts
            if(this.palette.compare(grid.c[i].color,acolor,grid.colormarge)){
                createPattern01(path, grid.c[i].p);
            }
            else if(this.palette.compare(grid.c[i].color,bcolor,grid.colormarge)){
                //createPattern01(path, grid.c[i].p);
            }
            else{
                append(path, grid.c[i].p.copy());
            }
        }else{
            if(this.palette.compare(grid.c[i].color,acolor,grid.colormarge)){
             createPattern02(path, grid.c[i].p);
            }
            else if(this.palette.compare(grid.c[i].color,bcolor,grid.colormarge)){
                //createPattern01(path, grid.c[i].p);
            }
            else{
                append(path, grid.c[i].p.copy());
            }
        }
    }
    print3D.addToLayer(layer, path);
   
}
function createPattern01(path, p){
    //van links naar rechts
    append(path, p.copy().add(-10,10));
    append(path, p.copy().add(-3,0));
    append(path, p.copy().add(0,-10));
    append(path, p.copy().add(3,0));
    append(path, p.copy().add(10,10));
   
}
function createPattern02(path, p){
    //van rechts naar links
   append(path, p.copy().add(10,-10));
   append(path, p.copy().add(3,0));
   append(path, p.copy().add(0,10));
   append(path, p.copy().add(-3,0));
   append(path, p.copy().add(-10,-10));
}

function createPattern03(path, p){
    //breisteek
    //van links naar rechts
    append(path, p.copy().add(-10,10));
    append(path, p.copy().add(-3,7));
    append(path, p.copy().add(-7,-7));
    append(path, p.copy().add(0,-10));
    append(path, p.copy().add(7,-7));
    append(path, p.copy().add(3,7));
    append(path, p.copy().add(10,10));
    
   
}
function createPattern04(path, p){
    //breisteek
    //van rechts naar links
    append(path, p.copy().add(10,-10));
    append(path, p.copy().add(3,-7));
    append(path, p.copy().add(7,7));
    append(path, p.copy().add(0,10));
    append(path, p.copy().add(-7,7));
    append(path, p.copy().add(-3,-7));
    append(path, p.copy().add(-10,-10));
}
//rond
function createPattern05(path, p){
    
    //van links naar rechts
    append(path, p.copy());
    append(path, p.copy().add(-7,0));
    append(path, p.copy().add(-5,-5));
    append(path, p.copy().add(0,-7));
    append(path, p.copy().add(5,-5));
    append(path, p.copy().add(7,0));
    append(path, p.copy().add(5,5));
    append(path, p.copy().add(0,7));
    append(path, p.copy().add(-5,5));
    append(path, p.copy().add(-7,0));
    
   
}
function createPattern06(path, p){
    
    //van rechts naar links
    append(path, p.copy());
    append(path, p.copy().add(7,0));
    append(path, p.copy().add(5,5));
    append(path, p.copy().add(0,7));
    append(path, p.copy().add(-5,5));
    append(path, p.copy().add(-7,0));
    append(path, p.copy().add(-5,-5));
    append(path, p.copy().add(0,-7));
    append(path, p.copy().add(5,-5));
    append(path, p.copy().add(7,0));
}
//zigzag
function createPattern07(path, p){
    //van links naar rechts
    append(path, p.copy().add(-7,0));
    append(path, p.copy().add(0,-7));
    append(path, p.copy().add(0,-7));
    append(path, p.copy().add(7,0));
   
}
function createPattern08(path, p){
    //van rechts naar links
    append(path, p.copy().add(7,0));
    append(path, p.copy().add(0,7));
    append(path, p.copy().add(0,7));
    append(path, p.copy().add(-7,0));
}