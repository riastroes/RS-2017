
function Skirt(grid, skirtwidth, skirtheight, stitchnr){

  this.commands = new Array(";skirt");
  this.grid = grid.grid;
  this.gridmarge = grid.marge;
  this.stitchnr = stitchnr;
  this.length = skirtwidth;
  this.height = skirtheight;
  
  append(this.commands,";param length: " + this.length);
  append(this.commands,";param height: " + this.height);
  this.skirt = [];
  this.createRect();
}
Skirt.prototype.createRect = function(){

    this.skirt[0] = this.grid[this.gridmarge][this.gridmarge];
    this.skirt[1] = this.grid[this.gridmarge][this.gridmarge + this.height];
    this.skirt[2] = this.grid[this.gridmarge + this.length][this.gridmarge + this.height];
    this.skirt[3] = this.grid[this.gridmarge + this.length][pos.y].copy();
    this.skirt[4] = this.grid[pos.x][pos.y].copy();
    this.skirt[4].x *= newscale;
    this.skirt[4].y *= newscale;
    //this.skirt[5] = layer[0].p[0].copy();
    
}
Skirt.prototype.createZigZag = function(){
  //first check size
  var ok = true
  var maxlength = this.grid[0].length - (2* this.gridmarge);
  var maxheight = this.grid.height - (2* this.gridmarge);
  if(this.length < this.gridmarge || this.length > maxlength){
    this.error("Error Skirt: skirtlength ("+ this.length + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }
  if(this.height < this.gridmarge || this.height > maxheight){
    this.error("Error Skirt: skirtheight ("+ this.height + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }
  if(ok){
    this.skirt[0] = this.grid[this.gridmarge][0];
    this.skirt[1] = this.grid[this.gridmarge][ this.gridmarge].copy();
    this.skirt[2] = this.grid[this.gridmarge][ this.gridmarge + this.length].copy();
    var next = 3;
    for(var l = this.length; l >= 0; l--){
      var zig = this.gridmarge + 1;
      var zag = this.gridmarge + this.height;
      var end = this.grid[0].length ;

      if(l % 2 == 0  && zig % 2 == 0) {
        this.skirt[next] = this.grid[zig][this.gridmarge+l].copy();
      }
      else if(l % 2 == 0 && zig % 2 == 1){
        //this.skirt[next] = this.grid[zig][end - (this.gridmarge+l)].copy();
        this.skirt[next] = this.grid[zig][this.gridmarge+l].copy();
      }
      else if(l % 2 != 0  && zag % 2 == 0) {
        this.skirt[next] = this.grid[zag][this.gridmarge+l].copy();
      }
      else if(l % 2 != 0  && zag % 2 == 1) {
        //this.skirt[next] = this.grid[zag][end - (this.gridmarge+l)].copy();
        this.skirt[next] = this.grid[zag][this.gridmarge+l].copy();
      }
      next++;
    }
    if(this.length % 2 ==1){
      this.skirt[this.skirt.length] = this.grid[this.gridmarge + this.height][ this.gridmarge + this.length].copy();
     }
  }
}
Skirt.prototype.showFirst = function(){
  stroke(0,0,255);
  strokeWeight(3);
  point(this.skirt[0].x + offset.x, this.skirt[0].y + offset.y);
}
Skirt.prototype.error = function(msg){
  stroke(0);
  fill(255,0,0);
  textSize(30);
  textAlign(CENTER);
  text(msg, width/2, height/2);
}
Skirt.prototype.draw = function(){
  //this.showFirst();
  for(var l = 1; l < this.skirt.length; l++){
    stroke(0,0,255);
    strokeWeight(2);
    line(this.skirt[l-1].x + offset.x, this.skirt[l-1].y+ offset.y, this.skirt[l].x + offset.x, this.skirt[l].y + offset.y);
  }
}

Skirt.prototype.gcode = function(gcode, layer, newscale){
  append(this.commands,";skirt");
  append(this.commands, "G0 X" + (this.skirt[0].x * layer.scale) + " Y" + (this.skirt[0].y * layer.scale) + " Z" + layer.layerheight );
  append(this.commands, "G0 F1200");

  for(var i = 1; i < this.skirt.length; i++){
    var x = this.skirt[i].x * layer.scale;
    x = floor(x * 100)/100;
    var y = this.skirt[i].y * layer.scale;
    y = floor(y * 100)/100;

    var dvector = p5.Vector.sub(this.skirt[i], this.skirt[i-1]);
    var d = dvector.mag()* layer.scale  ;


    gcode.extrude += (d * layer.thickness);
    if(this.skirt.length - 2 == i){
      append(this.commands, "G0 X" + this.skirt[0].x * layer.scale  + " Y" + this.skirt[0].y * layer.scale + " Z" + layer.layerheight  + " E" + gcode.extrude);
    }
    else{
      append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude );
    }
    

  }
  append(this.commands,";end skirt");
}
