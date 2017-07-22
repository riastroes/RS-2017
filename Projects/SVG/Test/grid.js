function Grid(maxx, maxy){
  this.p = [];
  for(var y = height/(maxy+1); y < maxy; y += height/(maxy+1)){
    for(var x = width/(maxx+1); x < maxx; x += width/(maxx+1)){
      var pos = createVector(x,y,0);
      this.p.push(pos);

    }
  } 
}