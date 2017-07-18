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
  this.grid.draw();
}
Lapje.prototype.create = function(showgrid, ischanged, institches, inrows, inlayers, linepath, func, a, b){
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
  this.skirt.gcode(this.gcode, this.layers[0]);12
  this.knittings = [];
  for(var i = 0; i < this.maxlayers; i++){

    if(i == 0){                   //biggrid, stitchnr,row, stitches,rows
      this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.stitches,this.rows);
      
      if(func == "circlesin"){
        this.knitgrid.disorderRadiusIn(linepath, a, b);
      }
      else if(func == "circlesout"){
        this.knitgrid.disorderRadiusOut(linepath, a, b);
      }
      else if(func == "sin"){
        this.knitgrid.disorderSin(linepath, a, b);
      }
      else if(func == "cos"){
        this.knitgrid.disorderCos(linepath, a, b);
      }
      else if(func == "vert"){
        this.knitgrid.disorderVert(linepath, a);
      }
      else if(func == "hor"){
        this.knitgrid.disorderHor(linepath, a);
      }
       else if(func == "delete"){
        this.knitgrid.disorderDelete(linepath, a);
      }
    
      if(showgrid){
        this.knitgrid.draw(offset);
      }
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
    this.knittings[i].gcode(this.gcode, this.layers[i]);

  
  }


}
Lapje.prototype.save = function(){
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
  this.isSaved = true;
}
