function Settings(printer, material, style){
  this.printer = printer;
  this.material = material;
  this.materialcode ="";
  this.style = style;
  this.width = width;
  this.height = height;
  this.scale = 0;
  this.layerheight = 0;
  this.thickness = 0;
  this.speed = 0;
  this.nozzletemp = 0;
  this.bedtemp = 0;
  this.filement = 0;
  this.init();


}
Settings.prototype.init = function(){
  this.initPrinter();
  this.initMaterial();

}
Settings.prototype.initMaterial = function(){
  switch(this.printer){
    case "Anet":{
      this.scale = 0.2;         //canvas = 2200 px, bed = 220 mm
      this.filement = 1.75;

      switch(this.material){
        case "PLA":{
            this.materialcode ="PLA";
            if(this.style == "fine"){
              this.initStyle(0.4, 0.07, 800); //test OK 0.3, 0.07, 800
            }
            else if(this.style == "normal"){
              this.initStyle(0.4, 0.12, 800); //test OK
            }
            break;
          }
        case "TPCFLEX":{
          this.materialcode ="TPCFLEX";
          if(this.style == "normal"){
            this.initStyle(1.3, 0.15, 800); //0.4 0.2 800 OK // 0.4 0.15. 80 niet getest - TE DUN 0.1
          }
          else if(this.material == "Messing" && this.style == "normal"){
            this.materialcode ="PLAMES";
            this.initStyle(0.4, 0.12, 800);//test OK
          }
          break;
        }
        case "PLABRO":{
          this.materialcode ="PLABRO";
          if(this.style == "normal"){
            this.initStyle(0.4, 0.12, 800); //test
            //this.initStyle(0.4, 0.15, 800); //test ok armband.
          }
          break;
        }
        case "PURECOPER":{
          this.materialcode ="PURECOPER";
          if(this.style == "normal"){
            this.initStyle(0.25, 0.18, 800);//
          }
          break;
        }
        case "PETGCARBON":{
          this.materialcode ="PETGCARBON";
          if(this.style == "normal"){
            this.initStyle(0.4, 0.15, 800);//
          }
          break;
        }
        case "SATIN":{
          this.materialcode ="SATIN";
          if(this.style == "fine"){
            this.initStyle(0.3, 0.1, 600);//test ok 0.25, 0.1, 600
          }
          else if(this.style == "normal"){
            this.initStyle(0.5, 0.2, 800);//test ok (iphone etui)
          }
          break;
        }
        case "BRICK":{
          this.materialcode ="BRICK";
          if(this.style == "normal"){
            this.initStyle(0.5, 0.2, 800);//
          }
          if(this.style == "fine"){
            this.initStyle(0.18, 0.1, 800);//
          }
          if(this.style == "extrafine"){
            this.initStyle(0.08, 0.07, 800);//
          }
          break;
        }
        case "ABS":{
          this.materialcode ="ABS";
          if(this.style == "normal"){
            this.initStyle(0.5, 0.2, 800);//NIET GETEST
          }
          if(this.style == "fine"){
            this.initStyle(0.2, 0.1, 800);//NIET GETEST
          }
          if(this.style == "extrafine"){
            this.initStyle(0.08, 0.07, 800);//NIET GETEST
          }
          break;
        }

        case "REFILLTRANSPARENT":{
          this.materialcode ="RTRANS";
          if(this.style == "normal"){
            this.initStyle(0.5, 0.2, 800);//TEST OK
          }
          if(this.style == "fine"){
            this.initStyle(0.18, 0.1, 800);//NIET GETEST
          }
          if(this.style == "extrafine"){
            this.initStyle(0.08, 0.07, 800);//NIET GETEST
          }
          break;
        }
        
      }
      break;
    }
    case "Ultimaker2+":{ //nozzle 0.4

      this.scale = 0.1;         //canvas = 2300 px, bed = 230 mm
      this.filement = 2.85;
      if(this.material == "PLA" && this.style == "normal" ){
        this.initStyle(0.4, 0.03, 1600);  //0.4, 0.03, 1600 ok
      }
      if(this.material == "PETGCARBON" && this.style == "normal" ){
        this.initStyle(0.4, 0.03, 1200);  //0.4, 0.03, 1600 ok
      }
      else if(this.material == "PETGCARBON" && this.style == "fat" ){
        this.initStyle(0.3, 1, 1200);  //0.4, 0.03, 1600 ok
      }
      else if(this.material == "PETGCARBON" && this.style == "fine" ){
        this.initStyle(0.2, 0.3, 1200);  //0.4, 0.03, 1600 ok
      }
      else if(this.material == "PLABRO" && this.style == "normal" ){
          this.initStyle(0.4, 0.03, 1200); //test ok armband.
      }
      else if(this.material == "PLABRO" && this.style == "fine" ){
          this.initStyle(0.3, 0.02, 1200); //test ok armband.
      }
      else if(this.material == "PLAHennep" && this.style == "fat" ){
          this.initStyle(0.3, 0.1, 1200); //test ok armband.
      }
    }
    case "Ultimaker2++":{ //nozzle 0.8
      this.scale = 0.23;         //canvas = 1000 px, bed = 230 mm
      this.filement = 2.85;
      if(this.material == "PLA" && this.style == "fine"){
        //this.initStyle(1, 0.03, 600);   //test  OK// 1  0.05   1000 test OK
        this.initStyle(0.8, 0.05, 600);   //test
      }
      else if(this.material == "PLA" && this.style == "grof" ){
        //nozzle 0.08
        this.initStyle(1.5, 1, 800);  //not tested
      }
      else if(this.material == "PETGCARBON" && this.style == "normal" ){
        //nozzle 0.08
        this.initStyle(0.4, 0.05, 800);  //ok
      }
      break;
    }
  }
}
Settings.prototype.initPrinter = function(){
    switch(this.material){
    case "PLA":{
      this.nozzletemp = 210;
      this.bedtemp = 50;
      break;
    }
    case "TPCFLEX":{
      this.nozzletemp = 210;
      this.bedtemp = 80; //80 is goed, niet meer veranderen!!
      break;
    }
    case "PLAHennep":{
      this.nozzletemp = 200;
      this.bedtemp = 30;
      break;
    }
    case "Messing":{
      this.nozzletemp = 160;
      this.bedtemp = 40;
      break;
    }
    case "PLABRO":{
      this.nozzletemp = 190;
      this.bedtemp = 50;
      break;
    }
    case "PURECOPER":{
      this.nozzletemp = 161;
      this.bedtemp = 70;
      break;
    }
    case "PETGCARBON":{
      this.nozzletemp = 255;
      this.bedtemp = 30;
      break;
    }
    case "SATIN":{
      this.nozzletemp =200;
      this.bedtemp = 0;
      break;
    }
    case "BRICK":{
      this.nozzletemp =245;
      this.bedtemp = 100;
      break;
    }
    case "ABS":{
      this.nozzletemp =250;
      this.bedtemp = 60;
      break;
    }
    case "REFILLTRANSPARENT":{
      this.nozzletemp =200;
      this.bedtemp = 30;
      break;
    }
  }
}

Settings.prototype.initStyle = function( layerheight,thickness,speed){
  this.layerheight = layerheight;
  this.thickness = thickness;
  this.speed = speed;
}
Settings.prototype.report = function(gcode){
  console.log("nozzletemp :   " + this.nozzletemp);
  console.log("bedtemp :   " + this.bedtemp);
  console.log("layers :   " + layers.length);
  console.log("layerheight :   " + this.layerheight);
  console.log("thickness :   " + this.thickness);
  console.log("speed :   " + this.speed);
  console.log("extrude :   " + gcode.extrude);
  console.log("filement "+ this.filement + ":   " + floor(gcode.extrude*10)/ 10/this.filement + "cm");

}
