function ColorStrip(pos, w, h) {
    colorMode(HSB, 360, 100, 100, 1);
    this.pos = pos.copy(); // posititie van de kleurenstrip
    this.palwidth = w;     // de breedte van de kleurenstrip
    this.palheight = h;    // de hoogte van de kleurenstrip 
    this.palette = new Color();   // alle kleurfuncties
    this.colors = this.palette.colors;
    this.color =this.colors[0];        // de gekozen kleur
    this.max = this.colors.length;      // het aantal kleuren
    this.alpha = 1;
    
}
ColorStrip.prototype.create = function(max,name){
    
    this.max = max;
    switch(name){
        
        case "basis_kleuren":{
            if(max>10){max = 10;}
            this.palette.create(max);
            this.colors = this.palette.colors;
            break;
        }
        case "grijze_kleuren":{
            if(max>10){max = 10;}
            this.palette.addGrayPalette(max);
            this.colors = this.palette.colors;
            break;
        }
        case "random_kleuren":{
            if(max>10){max = 10;}
            this.palette.random(max, 1);
            this.colors = this.palette.colors;
            break;
        }
        case "rode_kleuren":{
            this.palette.addHuePalette(max, 0);
            this.colors = this.palette.colors;
            break;
        }
        case "oranje_kleuren":{
            this.palette.addHuePalette(max, 30);
            this.colors = this.palette.colors;
            break;
        }
        
        case "gele_kleuren":{
            this.palette.addHuePalette(max, 60);
            this.colors = this.palette.colors;
            break;
        }
        case "groene_kleuren":{
            this.palette.addHuePalette(max, 90);
            this.colors = this.palette.colors;
            break;
        }
        case "blauwe_kleuren":{
            this.palette.addHuePalette(max, 220);
            this.colors = this.palette.colors;
            break;
        }
        case "paarse_kleuren":{
            this.palette.addHuePalette(max, 270);
            this.colors = this.palette.colors;
            break;
        }
        case "violet_kleuren":{
            this.palette.addHuePalette(max, 330);
            this.colors = this.palette.colors;
            break;
        }
        case "lichte_kleuren":{
            this.colors = this.palette.addLightnessPalette(max, 90);
            break;
        }
        case "felle_kleuren":{
            this.colors = this.palette.addLightnessPalette(max, 50);
            break;
        }
        case "donkere_kleuren":{
            this.colors =this.palette.addLightnessPalette(max, 20);
            break;
        }
        
        default:{
            this.colors = this.palette.colors;  // black and white
        }

    }
    this.color = this.colors[0];
    this.max = this.colors.length;
    
}
ColorStrip.prototype.show = function(){
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.palwidth, this.palheight);
    for(var i = 0; i < this.max; i++){
        
        fill(this.colors[i]);
        if(this.palwidth < this.palheight){
            //vertikaal
            rect(this.pos.x, this.pos.y + (i * this.palheight/this.max), this.palwidth, this.palheight);

        }
        else{
            //horizontaal
            rect(this.pos.x  + (i * this.palwidth/this.max), this.pos.y, (this.palwidth/this.colors.length)-1, this.palheight);
        }
    }
}
ColorStrip.prototype.get = function(x, y){

    return this.color;
}
ColorStrip.prototype.randomColor = function(show){
    var max = this.colors.length;
    var index = floor(random(max));

    if(show){
        this.show();
        stroke(0);
        fill(this.colors[index]);
        rect(this.pos.x  + (index * this.palwidth/this.max)-1, this.pos.y, (this.palwidth/this.colors.length), this.palheight-1);
    }
    return this.colors[index];
}
ColorStrip.prototype.setTransparency = function(alpha){
    this.alpha = alpha;
    this.palette.setTransparency(alpha);
    for(var i = 0; i < this.colors.length; i++){
        this.colors[i]= color(hue(this.colors[i]), saturation(this.colors[i]),lightness(this.colors[i]),this.alpha);
    }
}
ColorStrip.prototype.isClicked = function(show){
    var index=0;
    var isclicked = false;
    if(mouseX > this.pos.x && mouseX < this.pos.x + this.palwidth && mouseY > this.pos.y && mouseY < this.pos.y + this.palheight){
        isclicked = true;
        if(this.palwidth < this.palheight){
            //vertikaal
            index = floor((mouseY - this.pos.y) / (this.palheight / this.colors.length));
        }
        else{
            //horizontaal
            index = floor((mouseX - this.pos.x) / (this.palwidth / this.colors.length));
        }
        this.color = this.colors[index];
    }
    
    if(isclicked && show){
        this.show();
        stroke(0);
        fill(this.color);
        if(this.palwidth < this.palheight){
            //vertikaal
            rect(this.pos.x, this.pos.y +  (index * this.palheight/this.max)-1, this.palwidth-1, (this.palheight/this.colors.length));
        }else{
            //horizontaal
            rect(this.pos.x  + (index * this.palwidth/this.max)-1, this.pos.y, (this.palwidth/this.colors.length), this.palheight-1);
        }
    }
    return isclicked;
    
}
ColorStrip.prototype.getIndex = function(acolor){
    var index = 0
    for(var i = 0; i < this.colors.length; i++){
        if(this.palette.compare(acolor, this.colors[i], 10)){
            index = i;
            break;
        }
    }
    return index;
}
ColorStrip.prototype.clearBackground = function(show){
    background(255);
    if(show){
        this.show();
        stroke(0);
        fill(this.color);
        var index = this.getIndex(this.color);
        rect(this.pos.x  + (index * this.palwidth/this.max)-1, this.pos.y, (this.palwidth/this.colors.length), this.palheight-1);
    }
}