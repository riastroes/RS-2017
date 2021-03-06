function Gcode(settings){
    this.bedtemp = settings.bedtemp;
    this.nozzletemp = settings.nozzletemp;
    this.filement = settings.filement;
    this.extrude = 0;
    this.commands = new Array(";Project: AddOn",";Ria Stroes");
}

Gcode.prototype.startCode = function(){
    append(this.commands, ";start code");
    append(this.commands, "M140 S"+ this.bedtemp);
    append(this.commands, "M109 T0 S" + this.nozzletemp);
    append(this.commands, "T0");

    append(this.commands, "M190 S" + this.bedtemp + "           ;bed temperature on");
    append(this.commands, "M109 S" + this.nozzletemp + "          ;extruder temperature on");
    append(this.commands, "G21                ;metric values");
    append(this.commands, "G90                ;absolute positioning");
    append(this.commands, "M107               ;start with the fan off");
    append(this.commands, "G28 X0 Y0          ;move X/Y to min endstops, so the head is out of the way");
    append(this.commands, "G28 Z0             ;move Z to min endstops");
    append(this.commands, "G0 Z15.0           ;move the platform up 15mm");
    append(this.commands, "G92 E0             ;zero the extruded");
    append(this.commands, "G1 F200 E10        ;extrude 10mm of feed stock");
    append(this.commands, "G92 E0             ;zero the extruded length again");
    append(this.commands, "G0 Z10             ;move the platform up 15mm");
    append(this.commands, "G0 F800            ;speed");
    //append(this.commands, "M106            ;fan on");
    append(this.commands, "M117 Printing...");
}
Gcode.prototype.getCode = function(commands){
    this.commands = concat(this.commands, commands);
}
Gcode.prototype.endCode = function(){
    append(this.commands, ";end code");
    //append(this.commands, "M107               ;fan off");
    append(this.commands, "G1 Z15 F200        ;move Z up a bit");
    append(this.commands, "G91                ;relative positioning");
    append(this.commands, "M104 S0            ;extruder heater off");
    append(this.commands, "M140 S0            ;heated bed heater off");
    append(this.commands, "G1 Z+5 F200        ;move Z up a bit");
    append(this.commands, "G28 X0 Y0          ;move X/Y to min endstops, so the head is out of the way");
    append(this.commands, "M84                ;steppers off");
    append(this.commands, "G90                ;absolute positioning");
}
Gcode.prototype.getCodeToStart = function(start, first, layer){
  
  var tostart = new Array("");

  append(tostart, ";tostart");
  append(tostart, "G1 F" + layer.speed );

  var v = p5.Vector.sub(start, first);
  v.mult(layer.scale);
  this.extrude += (v.mag() * layer.layerheight * layer.thickness);
  tostart = append(tostart, "G0  Z3");
  tostart = append(tostart, "G1  X"+  (first.x*layer.scale) + " Y"+ (first.y* layer.scale) );
  tostart = append(tostart, "G0  Z"+ ((layer.layer + 1) * layer.layerheight));
  this.commands.concat(tostart);
}


Gcode.prototype.save = function(name){

    save(this.commands,name + ".gcode");
    console.log(name + " is saved.");
}
Gcode.prototype.generate = function(layers){
  this.startCode();
  this.getCodeToStart(createVector(0,0), layers[0].p[0], layers[0]);
  

  for(var l = 0; l < layers.length; l++){
    this.getCode(layers[l].commands);
  }
  this.endCode();
}
