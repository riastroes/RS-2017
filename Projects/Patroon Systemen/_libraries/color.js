/*De basis voor deze classe is de HSLuv library van Rune Madson
 */

function Color() {
    this.colors = [];

}
Color.prototype.add = function(acolor) {
    append(this.colors, acolor);
}
Color.prototype.random = function(max, alpha) {
    if (alpha == undefined) {
        alpha = 255;
    }
    for (var i = 2; i < max; i++) {
        this.colors[i] = color(random(255), random(255), random(255), alpha);
    }
}
Color.prototype.create= function() {
    //create your colors here
    this.add(color(0));
    this.add(color(255));
    this.add(color(0, 50, 50));
    this.add(color(255, 0, 0));
    this.add(color(0, 0, 255));
    this.add(color(0, 255, 0));
    return this.colors;
}
Color.prototype.addHuePalette = function(count, saturation, lightness) {
    var hue;
    var from = this.colors.length;
    var to = from + count;
    var step = 0;
    for (var i = from; i < to; i++) {
        hue = step * (360 / count);
        var rgb = hsluv.hsluvToRgb([hue, saturation, lightness]);
        this.colors[i] = color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
        step++;
    }
    return this.colors;
}
Color.prototype.addSaturationPalette = function(count, hue, lightness) {
    var saturation;
    var from = this.colors.length;
    var to = from + count;
    var step = 0;
    for (var i = from; i < to; i++) {
        saturation = step * (100 / count);
        var rgb = hsluv.hsluvToRgb([hue, saturation, lightness]);
        this.colors[i] = color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
        step++;
    }
    return this.colors;
}
Color.prototype.addLightnessPalette = function(count, hue, saturation) {
    var lightness;
    var from = this.colors.length;
    var to = from + count;
    var step = 0;
    for (var i = from; i < to; i++) {
        lightness = step * (100 / count);
        var rgb = hsluv.hsluvToRgb([hue, saturation, lightness]);
        this.colors[i] = color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
        step++
    }
    return this.colors;
}
Color.prototype.setTransparency = function(alpha) {
    for (var i = 0; i < this.colors.length; i++) {
        this.colors[i] = color(red(this.colors[i]), green(this.colors[i]), blue(this.colors[i]), alpha);
    }
}

Color.prototype.fill = function(h, s, l) {
    var rgb = hsluv.hsluvToRgb([h, s, l]);
    fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}
Color.prototype.stroke = function(h, s, l) {
    var rgb = hsluv.hsluvToRgb([h, s, l]);
    stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}