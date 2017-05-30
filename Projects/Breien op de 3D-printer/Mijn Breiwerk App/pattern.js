function Pattern(name, first, stitches, rows){
  this.commands =[];
  this.p = [];
  this.p[0] = first.copy();
  this.rows = rows;
  this.stitches = stitches;
  this.design = [];
  this.scale = 0;
  this.grid = [];
  this.gridwidth =width/this.stitches;
  this.gridheight =height/this.rows;
  this.stitchwscale = this.gridwidth / 4.3;//4
  this.stitchhscale = this.gridwidth / 4.3;   //2.15
  
  this.create(name);
}
Pattern.prototype.create =function(name){
  if(name == "6xknoopje-random50"){
    for(var x = 0; x < 6; x++){
      var start = this.p.length;
      for(var i = 0; i < 20; i++){
        this.p[start + i] = createVector(this.p[start-1].x + 120 + random(-50,50), this.p[start-1].y + random(-50,50));
      }
      this.p[this.p.length] = this.p[start].copy();
    }
  }
  if(name == "1xknoopje-random80"){
    for(var x = 0; x < 1; x++){
      var start = this.p.length;
      for(var i = 0; i < 25; i++){
        this.p[start + i] = createVector(this.p[start-1].x + 120 + random(-80,80), this.p[start-1].y + random(-80,80));
      }
      this.p[this.p.length] = this.p[start].copy();
    }
  }
  if(name == "straight"){
    this.skirt(this.p[0], 600);
    this.designPattern("straight", this.rows, this.stitches);
    //this.testDesign("UVVVVVW");
    var start = this.p.length ;
    for(var r = 0 ; r < this.design.length; r++){
      for(var s = 0; s < this.design[r].length; s++){
        var type = this.design[r].charAt(s);
        var astitch = new Stitch(type);
        var start = this.p.length ;
        for (var i = 0 ; i < astitch.stitch.length; i++){
          var next = start + i;
          var last = start;
          this.p[next] = this.p[next-1].copy();
          this.p[next].x = this.p[last].x + astitch.stitch[i].x * this.stitchwscale ;
          this.p[next].y = this.p[last].y + astitch.stitch[i].y * this.stitchhscale ;
          this.p[next].z = this.p[last].z + astitch.stitch[i].z * 10;
        }
      }
      this.commands[r] = ";" + this.design[r];
    }

  }

}
Pattern.prototype.skirt = function(pos, len){
  var next = this.p.length-1;
  this.p[next] = pos.copy();
  this.p[next].x += 5;
  this.p[next].y = this.p[next].y/2;
  for(var i = 1; i < len/10; i++){
    this.p[next + i] = pos.copy();
    this.p[next + i].x += 10;
    this.p[next + i].y = this.p[next].y/2;
  }
  next = this.p.length;
  for(var i = 0; i < len/10; i++){

    this.p[next] = pos.copy();
    this.p[next].x -= 10;
    this.p[next].y = this.p[next].y/2;
    next = next + 1;
  }


  this.p[next] = pos.copy();
  this.p[next].y =  ( this.p[next].y/2) -1;
  this.p[next+1] = pos.copy();
}
Pattern.prototype.testDesign = function(strDesign){
  this.design=[];
  this.design[0] = strDesign;
}
Pattern.prototype.designPattern = function(name, row, stitches){

  var r = 0;
  this.stitches = stitches;
  if(name == "straight"){
     var s = "B"
     this.design[r] ="A" + s.repeat(this.stitches - 2) + "C";
     for( r = 1; r < row+1; r++){
       if(r % 2 == 1){
         s = "L"
         this.design[r] = s.repeat(this.stitches -1) + "K";
       }
       else{
         s = "R";
         this.design[r] = s.repeat(this.stitches -1) + "S";
       }
     }
     if(row % 2 == 1){
       s = "Y"
       this.design[r] ="X" + s.repeat(this.stitches - 1) + "Z";
     }
     else{
       s = "V";
       this.design[r] ="U" + s.repeat(this.stitches -1) + "W";
     }
  }

}
Pattern.prototype.drawGrid = function(name, rows, stitches){
  this.rows = rows;
  this.stitches = stitches;
  this.grid = [];
  this.gridwidth = width/this.stitches ;
  this.gridheight = width/this.rows ;
  stroke(0);
  noFill();
  strokeWeight(5);
  rect(0,0, this.scale * this.stitches, this.scale * this.rows);
  strokeWeight(1);
  for(x = 0; x <= this.stitches; x++){
    this.grid[x] =[];
    line( (x*this.gridwidth), 0,0 + (x*this.gridwidth) , (this.rows * this.gridheight));
  }
  for(y = 0; y<= this.rows; y++){
    this.grid[y] =[];
    for(x = 0; x <= this.stitches; x++){
      line((x*this.gridwidth), 0, (x*this.gridwidth) ,  (this.rows * this.gridheight));
      this.grid[y][x] = 255;
    }
    line(0,  (y*this.gridheight),  (this.stitches * this.gridwidth) , (y*this.gridheight) );
  }
}
Pattern.prototype.designStitch = function(mousex,mousey, acolor){
  var x = floor((mousex) / this.gridwidth);
  var y = floor((mousey) / this.gridheight);

  if (x >=0 && x < this.stitches && y >= 0 && y < this.rows ){
      noStroke();
      fill(0);
      rect(1 + (x * this.gridwidth), 1 + (y * this.gridheight),this.gridwidth-2, this.gridheight-2);
      this.grid[y][x] = acolor;
    }

}
Pattern.prototype.gridToPattern = function(){

  this.designPattern("straight", this.rows, this.stitches);
  for(y = 1; y<= this.rows-1; y++){
      for(x = 1; x < this.stitches-1; x++){
      // if(y == 0 || x == 0 || x == this.stitches-2 || y == this.rows-1){
      //   if(y % 2== 0){
      //     var apart = this.design[y].substr(0, x);
      //     var bpart = this.design[y].substr(x+1, this.design[y].length);
      //     this.design[y] = apart.concat("-").concat(bpart);
      //   }
      //   else{
      //     var q = (this.design[y].length-1) - x;
      //     var apart = this.design[y].substr(0, q);
      //     var bpart = this.design[y].substr(q+1, this.design[y].length);
      //     this.design[y] = apart.concat("_").concat(bpart);
      //   }
      //}
      //else{
      if(this.grid[y][x]== 0 && this.grid[y-1][x]!= 0 &&  (y % 2)== 0){

        var apart = this.design[y].substr(0, x);
        var bpart = this.design[y].substr(x+1, this.design[y].length)
        if(this.grid[y][x-1] !=0 && this.grid[y][x+1] ==0){
          this.design[y] = apart.concat("M").concat(bpart);
        }
        else if(this.grid[y][x-1] !=0 && this.grid[y][x+1] !=0){
          this.design[y] = apart.concat("-").concat(bpart);
        }
        else if(this.grid[y][x+1] !=0 ){
          this.design[y] = apart.concat("O").concat(bpart);
        }
        else{
          this.design[y] = apart.concat("Y").concat(bpart);
        }

      }
      else if(this.grid[y][x]== 0 && this.grid[y-1][x]!= 0 && (y % 2)== 1){
        var q = (this.design[y].length-1) - x;
        var apart = this.design[y].substr(0, q);
        var bpart = this.design[y].substr(q+1, this.design[y].length)
        if(this.grid[y][x-1] !=0 && this.grid[y][x+1] ==0){
          this.design[y] = apart.concat("G").concat(bpart);
        }
        else if(this.grid[y][x-1] !=0 && this.grid[y][x+1] !=0){
          this.design[y] = apart.concat("_").concat(bpart);
        }
        else if(this.grid[y][x+1] !=0 ){
          this.design[y] = apart.concat("D").concat(bpart);
        }
        else{
          this.design[y] = apart.concat("E").concat(bpart);
        }

      }
      else if(this.grid[y][x]== 0 && this.grid[y-1][x]== 0 && (y % 2)== 0){

        var apart = this.design[y].substr(0, x);
        var bpart = this.design[y].substr(x+1, this.design[y].length)
        if(this.grid[y][x-1] !=0){
          this.design[y] = apart.concat("-").concat(bpart);
        }
        else if(this.grid[y][x+1] !=0){
          this.design[y] = apart.concat("-").concat(bpart);
        }
        else{
          this.design[y] = apart.concat("-").concat(bpart);
        }

      }
      else if(this.grid[y][x]== 0 && this.grid[y-1][x]== 0 &&  (y % 2)== 1){
        q = (this.design[y].length-1) - x;
        var apart = this.design[y].substr(0, q);
        var bpart = this.design[y].substr(q+1, this.design[y].length);
        if(this.grid[y][x-1] !=0){
          this.design[y] = apart.concat("_").concat(bpart);
        }
        else if(this.grid[y][x+1] !=0){
          this.design[y] = apart.concat("_").concat(bpart);
        }
        else{
          this.design[y] = apart.concat("_").concat(bpart);
        }

      }
      else if(this.grid[y][x] != 0 && this.grid[y-1][x]== 0 && (y%2) == 0){
          //als dit een even regel
          var apart = this.design[y].substr(0, x);
          var bpart = this.design[y].substr(x+1, this.design[y].length)
          if(this.grid[y-1][x-1]!= 0 && this.grid[y-1][x+1]== 0){
            this.design[y] = apart.concat("I").concat(bpart);
          }
          else if(this.grid[y-1][x-1]!= 0 && this.grid[y-1][x+1]!=0){
            //this.design[y] = apart.concat("-").concat(bpart);
          }
          else if(this.grid[y-1][x+1]!= 0){
            this.design[y] = apart.concat("J").concat(bpart);
          }
          else{
            this.design[y] = apart.concat("H").concat(bpart);
          }
        }
      else if(this.grid[y][x] != 0 && this.grid[y-1][x]== 0 && (y%2) ==1){
        //look at de vorige regel
        q = (this.design[y].length-1) - x;
        var apart = this.design[y].substr(0, q);
        var bpart = this.design[y].substr(q+1, this.design[y].length);

          if(this.grid[y-1][x-1]!= 0 && this.grid[y-1][x+1]== 0){
            this.design[y] = apart.concat("T").concat(bpart);
          }
          else if(this.grid[y-1][x-1]!= 0 && this.grid[y-1][x+1]!= 0){
            //this.design[y] = apart.concat("_").concat(bpart);
          }
          else if(this.grid[y-1][x+1]!= 0){
            this.design[y] = apart.concat("P").concat(bpart);
          }
          else{
            this.design[y] = apart.concat("Q").concat(bpart);
          }
      }
    //}


    }

  }
  this.createPatternCommands();
  //var stitchwscale = ((width -100)/4) /this.stitches;
  //var stitchhscale = ((height -100)/2.15)/(this.rows);
  this.skirt(this.p[0],900);

  var start = this.p.length ;
  for(var r = 0 ; r < this.design.length; r++){
    for(var s = 0; s < this.design[r].length; s++){
      var type = this.design[r].charAt(s);
      var astitch = new Stitch(type);
      var start = this.p.length ;
      for (var i = 0 ; i < astitch.stitch.length; i++){
        var next = start + i;
        var last = start;
        this.p[next] = this.p[next-1].copy();
        this.p[next].x =  this.p[last].x + astitch.stitch[i].x * this.stitchwscale;
        this.p[next].y = this.p[last].y + astitch.stitch[i].y  * this.stitchhscale;
        if(astitch.type == "-" || astitch.type =="_"){
          this.p[next].z = 0;
        }
        else{
          this.p[next].z = 1;
        }

      }
    }
  }

  console.log(this.showDesign());


}
Pattern.prototype.showDesign = function(){
  var showdesign =[];
  for(var y = 0; y < this.design.length; y++){
    if(y % 2 == 0){
      showdesign[y] = this.design[y];
    }
    else{
      showdesign[y] = this.design[y].split("").reverse().join("");
    }
  }
  return showdesign;
}

Pattern.prototype.createPatternCommands = function(){

  for(var y =0; y < this.rows; y++){
    for(var x = 0; x < this.stitches; x++){
      if(x > 0 && x < this.stitches-1 && y>0 && y < this.rows-1){
        if(this.design[y].charAt(x) ==  "-" && (this.design[y-1].charAt(x) =="L" || this.design[y-1].charAt(x) =="B") ){
          q = (this.design[y-1].length-1) - x;
          var apart = this.design[y-1].substr(0, q);
          var bpart = this.design[y-1].substr(q+1, this.design[y-1].length);
        }
        else if(this.design[y].charAt(x) ==  "_" && (this.design[y-1].charAt(x) =="R" || this.design[y-1].charAt(x) =="B") ){
          var apart = this.design[y-1].substring(0,x);
          var bpart = this.design[y-1].substring(x+1,this.design[y-1].length);
        }
      }
    }
    this.commands[y] = ";" + this.design[y];
  }
}
