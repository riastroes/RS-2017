function Loop(){

    this.pg = createGraphics(200,200);
    
}


Loop.prototype.draw = function(x,y){ 
    blendMode(OVERLAY);
    this.pg.background(0,0);
    
    this.pg.fill(255);
    this.pg.noStroke();
    this.pg.ellipse(50,50,100,100);
    var selloopmode = document.getElementById("selectloopmode").value;
    blendMode(selloopmode);
    image(this.pg,x-100,y-100);
}
