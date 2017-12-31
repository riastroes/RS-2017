/*De basis voor deze classe is de HSL
 */

function Color() {
    colorMode(HSL, 360, 100, 100, 1)
    this.colors = [];
    this.alpha = 1;

}
Color.prototype.add = function(hue, saturation, lightness) {
    var i = this.colors.length;
    
    this.colors[i] = color(hue, saturation, lightness,this.alpha);
}
Color.prototype.random = function(count, alpha) {
    this.alpha = alpha;
    if (alpha == undefined) {
        this.alpha = 1;
    }
    var hue;
    var saturation;
    var lightness;
    var from = this.colors.length;
    var to = from + count;
    var step = 0;
    for (var i = from; i <= to; i++) {
        hue = random(360);
        saturation = random(100);
        lightness = random(100);
        this.colors[i] = color(hue, saturation, lightness,this.alpha);
        step++;
    }
    return this.colors;
}
Color.prototype.create = function(count) {
    //create your colors here   //basis kleuren
    this.add(color(0,100,50, this.alpha));  //rood
    if(count > 1){ this.add(color(30,100,50, this.alpha));}   //oranje
    if(count > 2){ this.add(color(60,100,50, this.alpha));}   //geel
    if(count > 3){ this.add(color(90,100,50, this.alpha));} //groen
    if(count > 4){ this.add(color(180,100,50, this.alpha));} //licht blauw
    if(count > 5){ this.add(color(240,100,50, this.alpha));} //blauw
    if(count > 6){ this.add(color(270,100,50, this.alpha));}    //paars
    if(count > 7){ this.add(color(330,100,50, this.alpha));}   //violet
    if(count > 8){ this.add(color(90,30,50, this.alpha));}   //mosgroen
    if(count > 9){ this.add(color(0,30,50, this.alpha));} //bruin
    
    return this.colors;
}
Color.prototype.addGrayPalette = function(count) {
    var hue = 0;
    var saturation = 0;
    var lightness;
    var from = this.colors.length;
    var to = from + count;
    var step = 0;
    for (var i = from; i <= to; i++) {
        lightness = step * (100 / count);
        this.colors[i] = color(hue, saturation, lightness,this.alpha);
        step++;
    }
    return this.colors;
}
Color.prototype.addHuePalette = function(count, hue) {
    var saturation;
    var lightness;
    var from = this.colors.length;
    var to = from + count;
    var step = 0;
    for (var i = from; i <= to; i++) {
        lightness = 5 + ( step * (85 / count));
        this.colors[i] = color(hue, 100, lightness, this.alpha);
        step++;
    }
    return this.colors;
}
Color.prototype.addLightnessPalette = function(count, lightness) {
    var hue;
    var saturation = 100;
    var from = this.colors.length;
    var to = from + count;
    var step = 0;
    for (var i = from; i <= to; i++) {
        hue = random(360);
        this.colors[i] = color(hue, saturation, lightness, this.alpha);
        step++;
    }
    return this.colors;
}

Color.prototype.setTransparency = function(alpha) {
    this.alpha = alpha;
}


Color.prototype.compare = function (acolor, bcolor, colormarge){
    var ok = false;
    if(abs(hue(acolor) -  hue(bcolor)) <= colormarge && 
    abs(saturation(acolor) - saturation(bcolor)) <= colormarge && 
    abs(lightness(acolor) - lightness(bcolor))  <= colormarge){
        ok = true;
    }
    return ok;
}