function Grid(cellwidth, cellheight, wstitchpercell, hstitchpercell, marge){
  //voorbeeld 50 x 50, 2x2 = 4 steken per cm2
  this.wstitchpercell = wstitchpercell;
  this.hstitchpercell = hstitchpercell;

  this.cellwidth = cellwidth / wstitchpercell;
  this.cellheight = cellheight/ hstitchpercell;

  this.wmax = floor((width-offset.x) / this.cellwidth);
  this.hmax = floor((height-offset.y) / this.cellheight);

  this.marge = marge;

  this.grid = [];
  //freeform
  this.px = [];
  this.py = [];
  this.first;
  this.last;
  this.ab =[];
  this.cd =[];

  //this.createGrid();
  //println(this.cellwidth, this.cellheight);
}
Grid.prototype.createFreeFormGrid = function(){
  this.createCurves();
}
Grid.prototype.createHalfFreeFormGrid = function(){
  this.createCurveAndLine();
}


Grid.prototype.createCurves = function(){
  this.first = createVector(width/2, random(height/2));
  this.last = createVector(width/2, random(height/2, height));

  append(this.px, this.first);
  append(this.px, createVector(random(0,(width/2)), random(0, height/2)));
  append(this.px, createVector(random(0,(width/2)), random(height/2, height)));
  append(this.px, this.last);
  append(this.py, this.first);
  append(this.py, createVector(random((width/2),width), random(0, height/2)));
  append(this.py, createVector(random((width/2),width), random(height/2, height)));
  append(this.py, this.last);
}

Grid.prototype.createCurveAndLine = function(){
  this.first = createVector(width/3, random(height/2));
  this.last = createVector(width/3, random(height/2, height));

  append(this.px, this.first);
  append(this.px, this.last);
  append(this.py, this.first);
  append(this.py, createVector(random((width/4*3),width), random(0, height/2)));
  append(this.py, createVector(random((width/4*3),width), random(height/2, height)));
  append(this.py, this.last);
}
Grid.prototype.createBetweenTwoLines = function(stitches, rows, a, b, c, d, show){
  var maxy = (rows*4);
  var maxx = (stitches*4) + 1;
  if(show){
    stroke(255,0,0);
    strokeWeight(5);
    point(a.x, a.y);
    point(b.x, b.y);
    stroke(0,255,0);
    strokeWeight(5);
    point(c.x, c.y);
    point(d.x, d.y);
  }

  for (var t = 0; t <maxy; t++){
    this.ab[t] = createVector(0,0);
    this.ab[t].x = bezierPoint(a.x,a.x,b.x,b.x,map(t,0,maxy,0,1)); //line
    this.ab[t].y = bezierPoint(a.y,a.y,b.y,b.y,map(t,0,maxy,0,1)); //line

    this.cd[t] = createVector(0,0);
    this.cd[t].x = bezierPoint(c.x,c.x,d.x,d.x,map(t,0,maxy,0,1)); //line
    this.cd[t].y = bezierPoint(c.y,c.y,d.y,d.y,map(t,0,maxy,0,1)); //line


  }
  this.grid = [];
   for(var x = 0; x < maxx; x++){
     this.grid[x] = [];
     for(var y = 0; y < maxy; y++){
         stroke(0);
         strokeWeight(1);
         this.grid[x][y] = createVector(0,0);
         this.grid[x][y].x = curvePoint(a.x,this.ab[y].x,this.cd[y].x,b.x,map(x,0,maxx,0,1));
         this.grid[x][y].y = curvePoint(a.y,this.ab[y].y,this.cd[y].y,b.y,map(x,0,maxx,0,1));
         if(show){
            point(this.grid[x][y].x, this.grid[x][y].y);
          }
       }
   }
}
Grid.prototype.createBetweenLineAndCurve = function(stitches, rows, a, b, c, e, f, d, show){
  var maxy = (rows*4);
  var maxx = (stitches*4) + 1;
  if(show){
    stroke(255,0,0);
    strokeWeight(5);
    point(a.x, a.y);
    point(b.x, b.y);
    stroke(0,255,0);
    strokeWeight(5);
    point(c.x, c.y);
    point(d.x, d.y);
    stroke(0,255,0);
    strokeWeight(5);
    point(e.x, e.y);
    point(d.x, d.y);
  }

  for (var t = 0; t <maxy; t++){
    this.ab[t] = createVector(0,0);
    this.ab[t].x = bezierPoint(a.x,a.x,b.x,b.x,map(t,0,maxy,0,1)); //line
    this.ab[t].y = bezierPoint(a.y,a.y,b.y,b.y,map(t,0,maxy,0,1)); //line

    this.cd[t] = createVector(0,0);
    this.cd[t].x = bezierPoint(c.x,e.x,f.x,d.x,map(t,0,maxy,0,1)); //curve
    this.cd[t].y = bezierPoint(c.y,e.y,f.y,d.y,map(t,0,maxy,0,1)); //curve


  }
  this.grid = [];
   for(var x = 0; x < maxx; x++){
     this.grid[x] = [];
     for(var y = 0; y < maxy; y++){
         stroke(0);
         strokeWeight(1);
         this.grid[x][y] = createVector(0,0);
         this.grid[x][y].x = curvePoint(a.x,this.ab[y].x,this.cd[y].x,b.x,map(x,0,maxx,0,1));
         this.grid[x][y].y = curvePoint(a.y,this.ab[y].y,this.cd[y].y,b.y,map(x,0,maxx,0,1));
         if(show){
            point(this.grid[x][y].x, this.grid[x][y].y);
          }
       }
   }
}
Grid.prototype.drawFreeFormGrid = function(stitches,rows, structure){

  var maxy = rows + 10;
  var maxx = stitches;
  stroke(0,255,255);
  strokeWeight(1);
  noFill();
  if(structure){
    stroke(255,0,0);
    strokeWeight(1);
    ellipse(this.first.x, this.first.y, 10,10);
    ellipse(this.last.x, this.last.y, 10,10);
    stroke(0,255,255);
    strokeWeight(1);
    noFill();
     bezier(this.px[0].x,this.px[0].y,this.px[1].x,this.px[1].y,this.px[2].x,this.px[2].y,this.px[3].x,this.px[3].y);
     bezier(this.py[0].x,this.py[0].y,this.py[1].x,this.py[1].y,this.py[2].x,this.py[2].y,this.py[3].x,this.py[3].y);
  }
  stroke(0);
  strokeWeight(1);
  for (var t = 0; t <maxy; t++){
    this.ab[t] = createVector(0,0);
    this.ab[t].x = bezierPoint(this.px[0].x,this.px[1].x,this.px[2].x,this.px[3].x,map(t,0,maxy,0,1));
    this.ab[t].y = bezierPoint(this.px[0].y,this.px[1].y,this.px[2].y,this.px[3].y,map(t,0,maxy,0,1));
    if(structure){
      ellipse(this.ab[t].x, this.ab[t].y,5,5);
    }

    this.cd[t] = createVector(0,0);
    this.cd[t].x = bezierPoint(this.py[0].x,this.py[1].x,this.py[2].x,this.py[3].x,map(t,0,maxy,0,1));
    this.cd[t].y = bezierPoint(this.py[0].y,this.py[1].y,this.py[2].y,this.py[3].y,map(t,0,maxy,0,1));
    if(structure){
      ellipse(this.cd[t].x, this.cd[t].y,5,5);
    }
  }
 this.grid = [];
  for(var t = 1; t <maxy; t++){
    if(structure){
      stroke(255,0,0);
      curve(this.first.x, this.first.y,this.ab[t].x, this.ab[t].y, this.cd[t].x, this.cd[t].y, this.last.x, this.last.y);
    }
    if(t >= 5 &&  t < maxy-5){
      this.grid[t-5] = [];
      for(var l = 0; l < maxx; l++){
        stroke(0);
        strokeWeight(1);
        this.grid[t-5][l] = createVector(0,0);
        this.grid[t-5][l].x = curvePoint(this.first.x,this.ab[t].x,this.cd[t].x,this.last.x,map(l,0,maxx,0,1));
        this.grid[t-5][l].y = curvePoint(this.first.y,this.ab[t].y,this.cd[t].y,this.last.y,map(l,0,maxx,0,1));
        point(this.grid[t-5][l].x, this.grid[t-5][l].y);
      }
    }
  }
}
Grid.prototype.drawHalfFreeFormGrid = function(rows, stitches, structure){
  var maxy = rows + 10;
  var maxx = stitches;
  stroke(0,255,255);
  strokeWeight(1);
  noFill();
  if(structure){
    stroke(255,0,0);
    strokeWeight(1);
    ellipse(this.first.x, this.first.y, 10,10);
    ellipse(this.last.x, this.last.y, 10,10);
    stroke(0,255,255);
    strokeWeight(1);
    noFill();
     line(this.px[0].x,this.px[0].y,this.px[1].x,this.px[1].y);
     bezier(this.py[0].x,this.py[0].y,this.py[1].x,this.py[1].y,this.py[2].x,this.py[2].y,this.py[3].x,this.py[3].y);
  }
  stroke(0);
  strokeWeight(1);
  for (var t = 0; t <maxy; t++){
    this.ab[t] = createVector(0,0);
    this.ab[t].x = bezierPoint(this.px[0].x,this.px[0].x,this.px[1].x,this.px[1].x,map(t,0,maxy,0,1));
    this.ab[t].y = bezierPoint(this.px[0].y,this.px[1].y,this.px[2].y,this.px[3].y,map(t,0,maxy,0,1));
    if(structure){
      ellipse(this.ab[t].x, this.ab[t].y,5,5);
    }

    this.cd[t] = createVector(0,0);
    this.cd[t].x = bezierPoint(this.py[0].x,this.py[1].x,this.py[2].x,this.py[3].x,map(t,0,maxy,0,1));
    this.cd[t].y = bezierPoint(this.py[0].y,this.py[1].y,this.py[2].y,this.py[3].y,map(t,0,maxy,0,1));
    if(structure){
      ellipse(this.cd[t].x, this.cd[t].y,5,5);
    }
  }
 this.grid = [];
  for(var t = 1; t <maxy; t++){
    if(structure){
      stroke(255,0,0);
      curve(this.first.x, this.first.y,this.ab[t].x, this.ab[t].y, this.cd[t].x, this.cd[t].y, this.last.x, this.last.y);
    }
    if(t >= 5 &&  t < maxy-5){
      this.grid[t-5] = [];
      for(var l = 0; l < maxx; l++){
        stroke(0);
        strokeWeight(1);
        this.grid[t-5][l] = createVector(0,0);
        this.grid[t-5][l].x = curvePoint(this.first.x,this.ab[t].x,this.cd[t].x,this.last.x,map(l,0,maxx,0,1));
        this.grid[t-5][l].y = curvePoint(this.first.y,this.ab[t].y,this.cd[t].y,this.last.y,map(l,0,maxx,0,1));
        point(this.grid[t-5][l].x, this.grid[t-5][l].y);
      }
    }
  }
}

Grid.prototype.createGrid = function(){
for(s = 0; s <= this.wmax; s++){
  this.grid[s] = [];
  for(r = 0; r<= this.hmax; r++){
          this.grid[s][r] = createVector((s * this.cellwidth), (r * this.cellheight));
     }
  }
}

Grid.prototype.draw = function(){

  //forbidden area
  stroke(0);
  fill(200);
  strokeWeight(1);
  rect(offset.x,offset.y, (this.wmax * this.cellwidth)-1,(this.hmax * this.cellheight)-1);
  fill(255);
  rect((this.cellwidth * this.marge) + offset.x, (this.cellheight* this.marge) + offset.y, (this.wmax * this.cellwidth)-(2* this.marge * this.cellwidth),  (this.hmax * this.cellheight) - (2* this.marge *this.cellheight));

  //vertical lines
  for(var s = 0; s <= this.wmax; s++){
      if(s % this.wstitchpercell == 0){
       //black vertical lines
        stroke(0);
        strokeWeight(1);
      }
      else{
        //red vertical lines
        stroke(255,0,0,100);
        strokeWeight(1);
      }
      line(this.grid[s][0].x + offset.x, this.grid[s][0].y+ offset.y, this.grid[s][this.hmax].x+ offset.x, this.grid[s][this.hmax].y+ offset.y);
  }

  for(r = 0; r<= this.hmax; r++){
        if(r % 2 == 0 ){
          //even regels
          stroke(0);
          strokeWeight(3);
          point(this.grid[0][r].x+ offset.x, this.grid[0][r].y+ offset.y);
        }
        else {
            stroke(0);
            strokeWeight(3);
            point(this.grid[this.wmax][r].x+ offset.x, this.grid[this.wmax][r].y+ offset.y);
        }

    if(r % this.hstitchpercell == 0){
      stroke(0);
      strokeWeight(1);
        }
    else{
      stroke(255,0,0,100);
      strokeWeight(1);
        }
    line(this.grid[0][r].x+ offset.x, this.grid[0][r].y+ offset.y , this.grid[this.wmax][r].x+ offset.x, this.grid[this.wmax][r].y + offset.y);
  }
}
Grid.prototype.testPos = function(x, y, z){
  stroke(255,0,0);
  strokeWeight(10);
  point(this.grid[x][y].x + offset.x, this.grid[x][y].y + offset.y);
  
}
Grid.prototype.getPos = function(stitchnr,row){
  var pos = createVector(0,0,0);
  pos.x = (stitchnr * (this.cellwidth/4));
  pos.y = (row * (this.cellheight/4));
  pos.z = 0;
  return pos;
}
Grid.prototype.error = function(msg){
  stroke(0);
  fill(255,0,0);
  textSize(30);
  textAlign(CENTER);
  text(msg, width/2, height/2);
}

Grid.prototype.first = function( stitchnr, row){
  var pos = createVector(offset.x, offset.y);
  var ok = true;


  if(stitchnr < this.marge || stitchnr > this.wmax - this.marge){
    this.error("Error Grid: stitchnr ("+ stitchnr + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }
  else if(row < this.marge || row > this.hmax - this.marge){
    this.error("Error Grid: row ("+ row + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }

  if(ok){

    if(this.knitgrid.length > 0){
      stroke(255,0,0);
      strokeWeight(8);
      point(this.knitgrid[0][0].x, this.knitgrid[0][0].y);
    }
  }
  return pos;
}
Grid.prototype.drawKnitGrid = function(knitgrid,  stitchnr, row){

  var rows = knitgrid.length;
  var stitches = knitgrid[0].length;
for(var s = 0; s < stitches; s++){
  for(var r = 0; r < rows; r++){

      stroke(0);
      strokeWeight(1);
      point(knitgrid[s][r].x, knitgrid[s][r].y);
    }
  }

  stroke(0, 0,255);
  strokeWeight(1);
  fill(0,0,255,10);
  quad( knitgrid[0][0].x, knitgrid[0][0].y,
        knitgrid[stitches-1][0].x, knitgrid[stitches-1][0].y,
        knitgrid[stitches-1][rows-1].x, knitgrid[stitches-1][rows-1].y,
        knitgrid[0][rows-1].x, knitgrid[0][rows-1].y);

}
