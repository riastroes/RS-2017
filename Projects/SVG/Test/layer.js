function Layer(layer, settings, totlayerheight){
  this.layer = layer;
  this.layerheight = settings.layerheight;
  this.totallayerheight = this.layerheight + totlayerheight;
  this.thickness = settings.thickness;
  this.speed = settings.speed;
  this.scale = settings.scale;
  this.commands = new Array(";Layer " + this.layer);
  append(this.commands, ";param layerheight: " + this.layerheight);
  append(this.commands, ";param total layerheight: " + this.totallayerheight);
  append(this.commands, ";param thickness:   " + this.thickness);
  append(this.commands, ";param speed:       " + this.speed);
  append(this.commands, "G0 F" + this.speed);


  this.p = [];
}
Layer.prototype.generate = function(gcode){
  append(this.commands, "G0 Z" + this.totallayerheight);
  append(this.commands, "G0 X" + this.p[0].x * this.scale + " Y" + this.p[0].y * this.scale  );

  for(var i = 1; i < this.p.length; i++){


    var x = this.p[i].x * this.scale;
    x = floor(x * 100)/100;
    var y = this.p[i].y * this.scale;
    y = floor(y * 100)/100;
    var z = this.p[i].z;

    var dvector = p5.Vector.sub(this.p[i], this.p[i-1]);
    var d = dvector.mag()* this.scale;


    var kz = this.totallayerheight * z;
    if(z == 0){
      append(this.commands, "G0 X" + x + " Y" + y );
    }
    else{
      gcode.extrude += (d * this.thickness);
      append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude );
    }
  }
}
Layer.prototype.draw = function(){
  stroke(0);
  strokeWeight(1);
  for( var i = 0; i < this.p.length - 1; i++){
    if(this.p[i].z == 1){
        line(this.p[i].x ,this.p[i].y,this.p[i+1].x ,this.p[i+1].y);
    }
  }
}
