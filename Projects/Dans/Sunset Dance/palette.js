function Palette(){
    
    this.colors = [];
    colorMode(HSB,360,100,100,100);
    this.colors[0] = color(0);
    this.colors[1] = color(255);
    this.colors;
}
Palette.prototype.add = function(pcolor){
    this.colors.push(pcolor);
}
Palette.prototype.get= function(index, perc){
    var acolor = color(0);//black
   
    if(index < this.colors.length){
        var h = hue(this.colors[index]);
        var s = saturation(this.colors[index]);
        var b = brightness(this.colors[index]);
        var a = perc;
        acolor = color(h,s,b,a);
    }
    return acolor;
}
Palette.prototype.createRandom = function(max, saturation, brightness, transparency){
    if(saturation == undefined){
        saturation = 100;
    }
    if(brightness == undefined){
        brightness = 100;
    }
    if(transparency == undefined){
        transparency = 100;
    }
    for(var i = 2 ; i < 10; i++){
        this.colors.push(color(random(360), saturation, brightness,transparency ));
    }
}