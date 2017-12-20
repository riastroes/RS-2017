function Log(logpos, kaderwidth, kaderheight){
    this.start = logpos.copy();
    this.pos = logpos.copy();
    this.kaderwidth = kaderwidth;
    this.kaderheight = kaderheight;
    this.kader();

}
Log.prototype.kader = function(){
    stroke(0);
    fill(255);
    rect(this.start.x, this.start.y, this.kaderwidth, this.kaderheight);
}
Log.prototype.write = function(atext){
    fill(0);
    stroke(0);
    this.pos.y += 20;
    text(atext, this.pos.x + 10, this.pos.y);
    if(this.pos.y > 1000){
        this.kader(this.start,this.kaderwidth, this.kaderheight);
        this.pos= this.start.copy();
        
    }
    
}