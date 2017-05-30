/* Ria Stroes */
/* @updated: mei 2017 */

function Grid(pos, maxwidth, maxheight, wmax, hmax){
    this.position = pos;
    this.wmax = wmax;
    this.hmax = hmax;
    this.cellwidth = maxwidth / this.wmax;
    this.cellheight =maxheight / this.hmax;
    this.center = pos.copy();
    this.center.add(createVector(this.maxwidth/2, this.maxheight/2));
    this.pos = [];

    var  x, y;
    for(var h = 0; h < this.hmax; h++){
      for( var w = 0 ; w < this.wmax; w++){
        x = ( w * this.cellwidth) + (this.cellwidth/2);
        y = ( h * this.cellheight) + (this.cellheight/2);
        this.pos[(h* this.wmax)+ w] = createVector(x,y);
        this.pos[(h* this.wmax)+ w].add(this.position);
      }
    }

}
Grid.prototype.show =function(show){
    strokeWeight(1);
    stroke(0);
    noFill();
    
    rect(this.position.x, this.position.y, this.cellwidth * this.wmax, this.cellheight * this.hmax);
    if(show){
        for(var i = 0; i < this.pos.length; i++){
        
            point(this.pos[i].x, this.pos[i].y);
        
        }
    }
}

Grid.prototype.disorderRow = function(row,factor){
    //factor can be an float or vector
    for(var x = 0 ; x < this.wmax; x++){
     this.pos[(row*this.wmax) + x].add(factor);
   }
     
  }
 Grid.prototype.disorderCol = function(col, factor){
   //factor can be an float or vector     
    for(var y = 0 ; y < this.hmax; y++){
     this.pos[(y*this.wmax) + col].add(factor);
   }
     
  }
  
  Grid.prototype.disorderSin = function(force){
    var up = createVector(0,-force);
    var down = createVector(0,force);
    
    for(var h = 0; h < this.hmax; h++){
      for( var w = 0 ; w < this.wmax; w++){
        if((w + h) % 4 == 1){
          this.pos[(h* this.wmax)+ w].add(up);
        }
        else if((w + h) % 4 == 3){
          this.pos[(h* this.wmax)+ w].add(down);
        }
      }
    }  
  }
  Grid.prototype.disorderRadius= function(center, radius,  force){
    var dis;
    var distance = 0;
    
    
    for(var h = 0; h < this.hmax; h++){
      for( var w = 0 ; w < this.wmax; w++){
        distance = dist(center.x, center.y, this.pos[(h* this.wmax)+ w].x, this.pos[(h* this.wmax)+ w].y);
        
        if(distance < radius){
          dis = center.copy();
          dis.sub(this.pos[(h* this.wmax)+ w]);
          dis.normalize();
          dis.mult(force);
          this.pos[(h* this.wmax)+ w].add(dis);
        }
      }
    }  
  }
  Grid.prototype.disorderByVector= function( center,  force){
    var dis;
    
    for(var h = 0; h < this.hmax; h++){
      for( var w = 0 ; w < this.wmax; w++){
        
        
          dis = center.copy();
          dis.sub(this.pos[(h* this.wmax)+ w]);
          dis.normalize();
          dis.mult(force);
          this.pos[(h* this.wmax)+ w].add(dis);
        
      }
    }  
  }
Grid.prototype.move= function(to){
    var move = to.sub(this.pos[0]);
    for(var h = 0; h < this.hmax; h++){
      for( var w = 0 ; w < this.wmax; w++){
          this.pos[(h* this.wmax)+ w].add(move);       
      }
    }  
  }
Grid.prototype.scale = function( factor){
    
    for(var h = 0; h < this.hmax; h++){
      for( var w = 0 ; w < this.wmax; w++){
        this.pos[(h* this.wmax)+ w].x *= factor;
        this.pos[(h* this.wmax)+ w].y *= factor;
      }
    } 
     
  }
  Grid.prototype.getRandomPos = function(){
    var a = int(random(this.pos.length));
    return this.pos[a];
  }
  Grid.prototype.getRandomIndex = function(){
    var a = int(random(this.pos.length));
    return a;
  }
  Grid.prototype.mouse = function( x,  y){
    var xx = floor((x-(this.position.x)) /( this.cellwidth));
    var yy = floor((y-(this.position.y)) / (this.cellheight));
    return (yy * this.wmax) + xx;
  }
  Grid.prototype.get = function( x,  y){
    var i = (y * this.wmax) + x;
    return this.pos[i];
  }

/*
class Grid{
  PVector position;
  int wmax;
  int hmax;
  float cellwidth;
  float cellheight;
  PVector center;
  
  PVector[] pos;
  
  
  
   Grid(PVector pos, float maxwidth, float maxheight, int wmax, int hmax){
    this.wmax = wmax;
    this.hmax = hmax;
    this.cellwidth = maxwidth / this.wmax;
    this.cellheight = maxheight / this.hmax;
    this.position = pos;
    this.center = pos.copy();
    this.center.add(new PVector(maxwidth/2, maxheight/2));
    
   
    
    this.pos = new PVector[this.hmax * this.wmax];
    float x, y;
    for(int h = 0; h < this.hmax; h++){
      for( int w = 0 ; w < this.wmax; w++){
        x = ( w * this.cellwidth) + (this.cellwidth/2);
        y = ( h * this.cellheight) + (this.cellheight/2);
        this.pos[(h* this.wmax)+ w] = new PVector(x,y);
        this.pos[(h* this.wmax)+ w].add(this.position);
      }
    }
  }
  
  
  
  
  void show(){
    strokeWeight(1);
    stroke(0);
    noFill();
    rect(this.position.x, this.position.y, this.cellwidth, this.cellheight);
    strokeWeight(3);
    for(PVector p : pos){
      
      point(p.x, p.y);
      
    }
  }
  
}
*/