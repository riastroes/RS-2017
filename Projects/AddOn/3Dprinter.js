//3D PRINTER
function Printer(){
   this.commands;
   
    
}
Printer.prototype.generate = function(gcode,layer){
  this.commands = [];
  append(this.commands, "G0 F" + layer.speed);
  append(this.commands, "G0 Z" + layer.totallayerheight);
  append(this.commands, "G0 X" + layer.p[0].x * layer.scale + " Y" + layer.p[0].y * layer.scale  );

  for(var i = 1; i < layer.p.length; i++){


    var x = layer.p[i].x * layer.scale;
    x = floor(x * 100)/100;
    var y = layer.p[i].y * layer.scale;
    y = floor(y * 100)/100;
    var z = layer.p[i].z;

    var dvector = p5.Vector.sub(layer.p[i], layer.p[i-1]);
    var d = dvector.mag()* layer.scale;


    var kz = layer.totallayerheight * z;
    if(z == 0){
      append(this.commands, "G0 X" + x + " Y" + y );
    }
    else{
      gcode.extrude += (d * layer.thickness);
      append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude );
    }
  }
  return this.commands;
}
Printer.prototype.draw = function(layer){
    stroke(0);
    strokeWeight(1);
    
    for( var i = 0; i < layer.p.length - 1; i++){
        if(layer.p[i].z == 1){
            line(layer.p[i].x ,layer.p[i].y,layer.p[i+1].x ,layer.p[i+1].y);
        }
    }
    
}

