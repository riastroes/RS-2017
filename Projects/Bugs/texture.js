function Texture(pgrid) {
  this.grid =pgrid;
  
  }
  Texture.prototype.style = function() {
    stroke(0);
    strokeWeight(1);
    noFill();
  }
  Texture.prototype.linesVert = function(){
    this.style();
    for (var x = 0; x < this.grid.wmax; x++) {
      beginShape();
      for (var y = 0; y < this.grid.hmax; y++) {
        vertex(this.grid.get(x, y).x, this.grid.get(x, y).y);
      }
      endShape();
    }
  }
  Texture.prototype.linesHor = function(){
    this.style();
    for (var y = 0; y < this.grid.hmax; y++) {
      beginShape();
     for(var x = 0; x < this.grid.wmax; x++) {
        vertex(this.grid.get(x, y).x, this.grid.get(x, y).y);
      }
      endShape();
    }
  }
  Texture.prototype.curvesVert = function(skip){
    this.style();
    for (var x = 0; x < this.grid.wmax; x+=skip) {
      beginShape();
      curveVertex(this.grid.get(x, 0).x, this.grid.get(x, 0).y);
      for (var y = 0; y < this.grid.hmax; y++) {
        curveVertex(this.grid.get(x, y).x, this.grid.get(x, y).y);
      }
      curveVertex(this.grid.get(x, this.grid.hmax-1).x, this.grid.get(x,this.grid.hmax-1).y);
      endShape();
    }
  }
  Texture.prototype.curvesHor = function(skip){
    this.style();
    for (var y = 0; y < this.grid.hmax; y+=skip) {
      beginShape();
      curveVertex(this.grid.get(0, y).x, this.grid.get(0, y).y);
      for (var x = 0; x < this.grid.wmax; x++) {
        curveVertex(this.grid.get(x, y).x, this.grid.get(x, y).y);
      }
      curveVertex(this.grid.get(this.grid.wmax-1,y).x, this.grid.get(this.grid.wmax-1,y).y);
      endShape();
    }
  }
  Texture.prototype.rect = function(skip){
    this.style();
    for (var y = 0; y < this.grid.hmax-1; y+=skip) {
      for (var x = 0; x < this.grid.wmax-1; x+=skip) {
    beginShape();
      vertex(this.grid.get(x, y).x, this.grid.get(x, y).y);
      vertex(this.grid.get(x+1, y).x, this.grid.get(x+1, y).y);
      vertex(this.grid.get(x+1, y+1).x, this.grid.get(x+1, y+1).y);
      vertex(this.grid.get(x, y+1).x, this.grid.get(x, y+1).y);
    endShape(CLOSE);
      }
    }
  }
  Texture.prototype.curvedrect = function(size,space){
    this.style();
    for (var y = 0; y < this.grid.hmax-size; y+=space) {
      for (var x = 0; x < this.grid.wmax-size; x+=space) {
    beginShape();
      curveVertex(this.grid.get(x, y).x, this.grid.get(x, y).y);
      curveVertex(this.grid.get(x+size, y).x, this.grid.get(x+size, y).y);
      curveVertex(this.grid.get(x+size, y+size).x, this.grid.get(x+size, y+size).y);
      curveVertex(this.grid.get(x, y+size).x, this.grid.get(x, y+size).y);
      //
      curveVertex(this.grid.get(x, y).x, this.grid.get(x, y).y);
      curveVertex(this.grid.get(x+size, y).x, this.grid.get(x+size, y).y);
      curveVertex(this.grid.get(x+size, y+size).x, this.grid.get(x+size, y+size).y);
    endShape(CLOSE);
      }
    }
  }
  Texture.prototype.triangle = function(size, space){
    this.style();
    for (var y = 0; y < this.grid.hmax-size; y+=space) {
      for (var x = 0; x < this.grid.wmax-size; x+=space) {
    beginShape();
      vertex(this.grid.get(x, y).x, this.grid.get(x, y+size).y +size);
      vertex(this.grid.get(x, y).x + size, this.grid.get(x, y).y);
      vertex(this.grid.get(x, y).x - size, this.grid.get(x, y).y);
    endShape(CLOSE);
      }
    }
  }
  Texture.prototype.sinus = function(size, space){
    this.style();
    var a= 0;
    for (var y = 0; y < this.grid.hmax-1; y+=space) {
      beginShape();
      for (var x = 0; x < this.grid.wmax-1; x+=space) {
    
      vertex(this.grid.get(x, y).x + (sin(a) *space), this.grid.get(x, y).y + (sin(a) *space));
      vertex(this.grid.get(x+1, y+1).x + (sin(a) *space), this.grid.get(x+1, y+1).y + (sin(a) *space));
       a += size;
      }
      endShape();
    }
  }
 Texture.prototype.vertexes = function(size, space){
    this.style();
    for (var x = 0; x < this.grid.wmax; x += space) {
      beginShape();
      for (var y = 0; y < this.grid.hmax; y += space) {
        
          for(var a = 0 ; a < TWO_PI; a += TWO_PI/size){
            
          vertex(this.grid.get(x, y).x + (sin(a)* size), this.grid.get(x, y).y+(sin(a)* size));
          }
      }
         
     endShape();
    }
  }
 Texture.prototype.horizontals = function(size, space){
    this.style();
    for (var y = 0; y < this.grid.hmax; y += space) {
      beginShape();
      for (var x = 0; x < this.grid.wmax; x += space) {
          if(x %2 == 0){
            vertex(this.grid.get(x, y).x +size, this.grid.get(x, y).y-size);
          }
          else{
            vertex(this.grid.get(x, y).x -size, this.grid.get(x, y).y+size);
          }
      }
         
     endShape();
    }
  }
Texture.prototype.horizontals2 = function(size,space){
    this.style();
    for (var y = 0; y < this.grid.hmax; y += space) {
      beginShape();
      for (var x = 0; x < this.grid.wmax; x += space) {
          if(x %2 == 0){
            curveVertex(this.grid.get(x, y).x +size, this.grid.get(x, y).y-size);
          }
          else{
            curveVertex(this.grid.get(x, y).x -size, this.grid.get(x, y).y+size);
          }
      }
         
     endShape();
    }
  }
 Texture.prototype.rect2 = function(size, space){
    this.style();
    for (var y = 0; y < this.grid.hmax-space; y+=size) {
      for (var x = 0; x < this.grid.wmax-space; x+=1) {
    beginShape();
      vertex(this.grid.get(x, y).x, this.grid.get(x, y).y);
      vertex(this.grid.get(x+space, y).x, this.grid.get(x+space, y).y);
      vertex(this.grid.get(x+space, y+space).x, this.grid.get(x+space, y+space).y);
      vertex(this.grid.get(x, y+space).x, this.grid.get(x, y+space).y);
    endShape(CLOSE);
      }
    }
  }
Texture.prototype.verticals2 = function(size, space){
    this.style();
    for (var x = 0; x < this.grid.hmax-space; x+=size) {
      beginShape();
      for (var y = 0; y < this.grid.wmax-space; y+=1) {
    
      vertex(this.grid.get(x, y).x, this.grid.get(x, y).y);
      vertex(this.grid.get(x+space, y).x, this.grid.get(x+space, y).y);
      vertex(this.grid.get(x+space, y+space).x, this.grid.get(x+space, y+space).y);
      vertex(this.grid.get(x, y+space).x, this.grid.get(x, y+space).y);
    
      }
      endShape(CLOSE);
    }
  }
 
