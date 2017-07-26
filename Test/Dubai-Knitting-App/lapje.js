function Lapje(pprinter, material,style,  pstitches, prows,  showgrid){
  //TEST OK VOOR:
  //printer:   Anet
  //materiaal: BRICK
  //style:     normal, fine
  //TEST NIET OK VOOR:
  //  style:     extrafine
  this.printer = pprinter
  this.name = "Lapje";
  this.rows = prows;
  this.stitches = pstitches;
  this.filename = "";
  
  this.isSaved = false;
  this.settings =new Settings(this.printer, material, style);
  this.gcode = new Gcode(this.settings);
  this.createGrid(2,2,3);
  this.grid.testPos(pos.x,pos.y); //row, stitches
  

}
Lapje.prototype.createGrid = function(w, h, marge){
  this.grid = new Grid(50,50,w,h,marge); 
  this.grid.createGrid();
  
}
Lapje.prototype.showGrid = function(){
  
  background(255);
  this.grid.draw();
  
}
Lapje.prototype.create = function(showgrid, ischanged, institches, inrows, inlayers){
  newscale = parseFloat(sliderScale.value);
  this.stitches = institches;
  this.rows = inrows;
  this.layers = [];
  this.maxlayers= inlayers;
  totlayerheight = 0;
  for(var i = 0; i < this.maxlayers; i++){
    if(i == 1){
      this.settings.style ="fine";
      this.settings.initMaterial();
    }
    this.layers[i] = new Layer(i, this.settings);
  }
  this.skirt = new Skirt(this.grid, 2,30, 5);
  this.skirt.draw(offset);
  this.skirt.gcode(this.gcode, this.layers[0]);
  this.knittings = [];
  for(var i = 0; i < this.maxlayers; i++){

    if(i == 0){                   //biggrid, stitchnr,row, stitches,rows
      this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.stitches,this.rows, newscale);



      
      this.manipuleer();
     
      //this.knitgrid.disorderCosWave(1,this.rows,2, -TWO_PI/70);
      //this.knitgrid.disorderCosWave(32,43,2, TWO_PI/70);
      //this.knitgrid.disorderShrinkWidth(11,37, 0.7)
      //this.knitgrid.disorderSinWave(41,51, 2, 0.4);
      //this.knitgrid.disorderSinWave(53,60, 2, 0.4);
      //this.knitgrid.disorderGrowWidth(4,35,3);
      //this.knitgrid.disorderHeight(0,100, 20, 50);
      //this.knitgrid.disorderHeight(0,100, 20, 34);
      //this.knitgrid.disorderHeight(0,100, -20, 14);
    }
    
    
    this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],0,0,this.stitches);
     
    this.knittings[i].createPattern("setup", 0,1);
    this.knittings[i].createPattern("straight", 1,this.rows);
    this.knittings[i].createPattern("end",this.rows,this.rows);
    this.knittings[i].patternToGrid();
    this.knittings[i].gotoStart(pos, offset);
    this.knittings[i].drawPattern(offset);
    this.knittings[i].gcode(this.gcode);
    
      
    
  }
}
Lapje.prototype.manipuleer = function( ){
  for(var i = 0 ; i < manip.length; i++){

    if(manip[i].func == "circlesin"  && manip[i].v != undefined && manip[i].a >=0 && manip[i].b >=0){
          this.knitgrid.disorderRadiusIn(manip[i].v, manip[i].a, manip[i].b);
    }
    else if(manip[i].func == "circlesout"&& manip[i].v != undefined && manip[i].a >=0 && manip[i].b >=0){
      this.knitgrid.disorderRadiusOut(manip[i].v, manip[i].a, manip[i].b);
    }
    else if(manip[i].func == "cos" && manip[i].a >=0 && manip[i].b >=0){
      this.knitgrid.disorderCosWave( manip[i].a, manip[i].b, 2, 0.4);
    }
    else if(manip[i].func == "vert" && manip[i].v != undefined && manip[i].a >=0 ){
      this.knitgrid.disorderVert(manip[i].v,  manip[i].a);
    }
    else if(manip[i].func == "hor" && manip[i].v != undefined && manip[i].a >=0 ){
      this.knitgrid.disorderHor(manip[i].v,  manip[i].a);
    }
    else if(manip[i].func == "delete" && manip[i].v != undefined && manip[i].a >=0){
      this.knitgrid.disorderDelete(manip[i].v,  manip[i].a);
    }
  }
  
/******dit nog verwijderen */
  // if(true){
  //   this.knitgrid.draw(offset, newscale);
  // }
/******dit nog verwijderen */
}
Lapje.prototype.save = function(){
  if(!this.isSaved){
    this.gcode.generate(this.layers,this.skirt, this.knittings);
    var code ="";
    if(this.printer =="Anet"){
      code = "A";
    }
    else{
      code = "U";
    }
    this.filename = code + material + this.rows + "x"+ this.stitches + "x" + this.maxlayers;
    var hide = document.getElementById("hidgcode");
    hide.value = this.filename;
    this.gcode.save(this.filename);
  }
  this.isSaved = true;
}
