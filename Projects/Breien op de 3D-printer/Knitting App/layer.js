function Layer(layer, settings){
  this.layer = layer;
  this.layerheight = settings.layerheight;
  this.totallayerheight = (this.layer * this.layerheight) + this.layerheight;
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
