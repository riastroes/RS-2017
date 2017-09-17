function Color() {
    this.colors = [];
    this.colors = [];
    this.colors[0] = color(0);
    this.colors[1] = color(255);

}
Color.prototype.random = function(max, alpha) {
    if (alpha == undefined) {
        alpha = 255;
    }
    for (var i = 2; i < max; i++) {
        this.colors[i] = color(random(255), random(255), random(255), alpha);
    }
}