function Knitting(biggrid, knitgrid, layer,stitchnr, row, pstitches){
  this.commands = new Array(";knitting");
  this.biggrid = biggrid;
  this.grid = knitgrid.grid;
  this.layer = layer;
  this.row = row;
  this.rows =  knitgrid.rows;

  this.last =0;
  this.strpattern = "";

  this.stitches =  pstitches;
  this.stitchnr =  stitchnr;
  this.z =[];
  
  this.pos = createVector(0,0);


}

Knitting.prototype.createStitch = function(type, z){
  var stitch = new Stitch(type).stitch;
  var i
  var kr, ks, kz;
  if(this.last == 0){
    this.last = createVector(this.stitchnr * 4,this.row);

  }

  for(i = 0; i < stitch.length; i++){
    var ok = true
    //test on the knitgrid;
    kr = this.last.y + stitch[i].y;
    ks = this.last.x + stitch[i].x;
    kz = z;
    if(ks < 0 || ks >= this.grid.length){
      ok = false;
    }
    if(kr < 0 || kr >= this.grid[0].length){
      ok = false;
    }

    if(ok ){
      append(this.layer.p, createVector(this.grid[ks][kr].x,
                                 this.grid[ks][kr].y,
                                 kz).copy());

    }
  }
  if(ok ){
    this.last = createVector(ks, kr);
  }
}
Knitting.prototype.testPattern = function(){
    this.patternToGrid(this.strpattern);
}
Knitting.prototype.createPattern = function(patternname, from, to){
  var pos = this.grid[0][0];
  if(patternname == "setup"){
    //OPZETTEN
    var B = "B";
    this.strpattern = this.strpattern.concat("A",B.repeat(this.stitches-2),"C");
     for(var i = 0; i < this.stitches; i++){
      append(this.z, 1);
    }
  }

  if(patternname == "straight"){
      for(var r = from; r < to; r+=1){
        if(r % 2 == 1){
            //oneven
            var L = "L";
            this.strpattern = this.strpattern.concat(L.repeat(this.stitches-1),"K");
            for(var i = 0; i < this.stitches; i++){
              append(this.z, 1);
            }
          }
          else {
            //oneven
            var R = "R";
            this.strpattern = this.strpattern.concat(R.repeat(this.stitches-1),"S");
            for(var i = 0; i < this.stitches; i++){
              append(this.z, 1);
            }
          }
      }

  }
  if(patternname == "less"){
    for(var r = from; r < to; r+=1){

        if(r % 2 == 1){
            //onEVEN
            var L = "L";
            this.strpattern = this.strpattern.concat(L.repeat(this.stitches),"/");
            for(var i = 0; i < this.stitches; i++){
              append(this.z, 1);
            }
          }
          else {
            //EVEN
            var R = "R";
            this.strpattern = this.strpattern.concat(R.repeat(this.stitches),"|");
            for(var i = 0; i < this.stitches; i++){
              append(this.z, 1);
            }

          }
       this.stitches--;
    }

  }
  if(patternname == "more"){
    for(var r = from; r < to; r+=1){
       this.stitches++;
        if(r % 2 == 0){
            //ONEVEN
            var L = "L";
            this.strpattern = this.strpattern.concat(L.repeat(this.stitches-1),"M");
            for(var i = 0; i < this.stitches; i++){
              append(this.z, 1);
            }

          }
          else {
            //EVEN
            var R = "R";
            this.strpattern = this.strpattern.concat(R.repeat(this.stitches-1),"T");
            for(var i = 0; i < this.stitches; i++){
              append(this.z, 1);
            }

          }

    }

  }
  if(patternname == "end"){

      //AFHECHTEN
      if(from % 2 == 0){
        //ONEVEN
        var Y = "Y";
        this.strpattern = this.strpattern.concat("X",Y.repeat(this.stitches-2),"Z");
           for(var i = 0; i < this.stitches; i++){
              append(this.z, 1);
            }

      }
      else{
        //EVEN
        var V = "V";
        this.strpattern = this.strpattern.concat("U",V.repeat(this.stitches-2),"W");
           for(var i = 0; i < this.stitches; i++){
              append(this.z, 1);
            }

      }

  }
  console.log(this.strpattern);
}
Knitting.prototype.patternToGrid = function( ){

  var type, z;
  for(var i = 0; i < this.strpattern.length; i++){
    type = this.strpattern.substring(i,i+1);
    z = this.z[i];
    this.createStitch(type,z);
  }
}

Knitting.prototype.gotoStart = function(pos, offset){
      var last = this.layer.p.length-1;
      var lastp = this.layer.p[last].copy();
      lastp.y += 50;
      lastp.y = constrain(lastp.y, 0, height - offset.y );
      lastp.z =0;
       point(lastp.x + offset.x, lastp.y + offset.y);
       append(this.layer.p, lastp);
       lastp = lastp.copy();
       lastp.x = 10;
       lastp.z =0;
       point(lastp.x + offset.x, lastp.y + offset.y);
       append(this.layer.p, lastp);
       lastp = lastp.copy();
       lastp.y = this.biggrid.grid[pos.x][pos.y].y;
       lastp.z =0;

       point(lastp.x + offset.x, lastp.y + offset.y);
       append(this.layer.p, lastp);
       strokeWeight(10);

       point(this.biggrid.grid[pos.x][pos.y].x  + offset.x,this.biggrid.grid[pos.x][pos.y].y + offset.y);
       append(this.layer.p, createVector(this.biggrid.grid[pos.x][pos.y].x,this.biggrid.grid[pos.x][pos.y].y,0));

}
Knitting.prototype.drawPattern = function(offset){
  for(var i = 1; i < this.layer.p.length; i++){

    if(this.layer.p[i-1].x == this.layer.p[i].x && this.layer.p[i-1].y == this.layer.p[i].y){
      //double
      stroke(255,0,0);
      strokeWeight(5);
     // point(this.layer.p[i].x + offset.x, this.layer.p[i].y + offset.y);
    }
    else{
      if(this.layer.p[i].z > 0){
        stroke(0);
      }
      else{
        stroke(255,0,255);
      }
      strokeWeight(1);
      line(this.layer.p[i-1].x + offset.x, this.layer.p[i-1].y + offset.y,this.layer.p[i].x + offset.x, this.layer.p[i].y + offset.y);
    }
  }
}

Knitting.prototype.gcode = function(gcode, newscale){

  append(this.commands, "G0 F" + this.layer.speed);
  append(this.commands, "G0 Z" + this.layer.totallayerheight);
  append(this.commands, "G0 X" + this.layer.p[0].x * this.layer.scale * newscale + " Y" + this.layer.p[0].y * this.layer.scale * newscale );

  for(var i = 1; i < this.layer.p.length; i++){


    var x = this.layer.p[i].x * this.layer.scale * newscale ;
    x = floor(x * 100)/100;
    var y = this.layer.p[i].y * this.layer.scale  * newscale;
    y = floor(y * 100)/100;
    var z = this.layer.p[i].z;

    var dvector = p5.Vector.sub(this.layer.p[i], this.layer.p[i-1]);
    var d = dvector.mag()* this.layer.scale  * newscale;


    var kz = this.layer.totallayerheight * z;
    if(z == 0){
      append(this.commands, "G0 X" + x + " Y" + y );
    }
    else{
      gcode.extrude += (d * this.layer.thickness);
      append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude );
    }
  }


}
Knitting.prototype.draw = function(){
    stroke(0);
    fill(255);
    rect(0,0,width-1, height-1);

      for(var i = 1; i < this.layer.p.length; i++){
        var x =  this.layer.p[i].x;
        var y =  this.layer.p[i].y;
        var z =  this.layer.p[i].z;

        x = floor(x * 100)/100;
        y = floor(y * 100)/100;
        z = floor(z * 100)/100;

        stroke(this.layer.thickness);
        line( this.layer.p[i-1].x,  layer.p[i-1].y,x,y);

    }
}
Knitting.prototype.test = function(pos){
  stroke(0,255,0);
  strokeWeight(5);
  point(pos.x, pos.y);
}
