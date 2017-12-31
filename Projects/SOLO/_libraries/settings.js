function Settings(printer, material, style) {
    this.printer = printer;
    this.material = material;
    this.materialcode = "";
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
Settings.prototype.init = function() {
    this.initPrinter();
    this.initMaterial();

}
Settings.prototype.initMaterial = function() {
    switch (this.printer) {
        case "Anet":
            {
                this.scale = 0.2; //canvas = 1100 px, bed = 220 mm
                this.filement = 1.75;

                switch (this.material) {
                    case "PLA":
                        {
                            this.materialcode = "PLA";
                            if (this.style == "fine") {
                                this.initStyle(0.4, 0.07, 800); //test OK 0.3, 0.07, 800
                            } else if (this.style == "normal") {
                                this.initStyle(0.4, 0.12, 800); //test OK
                            } else if (this.style == "kant") {
                                this.initStyle(0.4, 0.04, 800); //test OK 0.3, 0.07, 800
                            }
                            break;
                        }
                    case "PLAw":
                        {
                            this.materialcode = "PLAw";
                            if (this.style == "fine") {
                                this.initStyle(0.4, 0.07, 800); //test OK 0.3, 0.07, 800
                            } else if (this.style == "normal") {
                                this.initStyle(0.4, 0.12, 800); //test OK
                            }
                            break;
                        }
                    case "PLAFLEX":
                        {
                            this.materialcode = "PLAFLEX";
                            if (this.style == "normal") {
                                this.initStyle(0.4, 0.15, 800); //0.4 0.2 800 OK // 0.4 0.15. 80 niet getest - TE DUN 0.1
                            } else if (this.style == "fine") {

                                this.initStyle(0.4, 0.12, 800); //test OK
                            } else if (this.style == "dik") {

                                this.initStyle(0.3, 0.2, 800); //test OK
                            }
                            break;
                        }
                    case "PLABRO":
                        {
                            this.materialcode = "PLABRO";
                            if (this.style == "fine") {
                                this.initStyle(0.4, 0.12, 800); //test
                                this.initStyle(0.3, 0.12, 800); //OK in second layer
                                //this.initStyle(0.4, 0.15, 800); //test ok armband.
                            }
                            if (this.style == "normal") {
                                this.initStyle(0.2, 0.12, 800); //ok
                                //this.initStyle(0.4, 0.15, 800); //test ok armband.
                            }
                            break;
                        }
                    case "PURECOPER":
                        {
                            this.materialcode = "PURECOPER";
                            if (this.style == "normal") {
                                this.initStyle(1, 0.18, 800); //
                            }
                            break;
                        }
                    case "PETGCARBON":
                        {
                            this.materialcode = "PETGCARBON";
                            if (this.style == "normal") {
                                this.initStyle(0.4, 0.15, 800); //
                            }
                            break;
                        }
                    case "PETG":
                        {
                            this.materialcode = "PETG";
                            if (this.style == "fine") {
                                this.initStyle(0.4, 0.05, 800); //
                            }
                            break;
                        }
                    case "SAT1N":
                        {
                            this.materialcode = "SAT1N";
                            if (this.style == "fine") {
                                this.initStyle(0.5, 0.10, 800); //test OK mooi
                                //this.initStyle(0.5, 0.12, 600); //test OK mooi  
                                //this.initStyle(0.5, 0.15, 600); //test OK
                                //this.initStyle(0.4, 0.1, 600);//test ok 
                                //this.initStyle(0.3, 0.1, 600);//test ok 
                                //this.initStyle(0.25, 0.15, 600);//test ok  
                            } else if (this.style == "normal") {
                                this.initStyle(0.5, 0.12, 800) //1.5
                                    //this.initStyle(0.2, 0.2, 800); //getest met knittingapp
                                    // this.initStyle(0.5, 0.2, 800); //test ok (iphone etui)
                                    //this.initStyle(0.2, 0.2, 800); //test te vet

                            }
                            break;
                        }
                    case "SAT2N":
                        {
                            this.materialcode = "SAT2N";
                            if (this.style == "fine") {
                                this.initStyle(0.5, 0.1, 600); //niet getest
                                // this.initStyle(0.5, 0.15, 600); //test OK
                                //this.initStyle(0.4, 0.1, 600);//test ok 
                                /// this.initStyle(0.3, 0.1, 600);//test ok 
                                // this.initStyle(0.25, 0.15, 600);//test ok  
                            } else if (this.style == "normal") {
                                // this.initStyle(0.5, 0.2, 800); //test ok (iphone etui)
                                this.initStyle(0.3, 0.15, 800); //getest met knittingapp
                            }
                            break;
                        }
                    case "SAT3N":
                        {
                            this.materialcode = "SAT3N";
                            if (this.style == "fine") {
                                this.initStyle(0.5, 0.1, 600); //niet getest
                                //this.initStyle(0.5, 0.15, 600); //test OK
                                //this.initStyle(0.4, 0.1, 600);//test ok 
                                /// this.initStyle(0.3, 0.1, 600);//test ok 
                                // this.initStyle(0.25, 0.15, 600);//test ok  
                            } else if (this.style == "normal") {
                                // this.initStyle(0.5, 0.2, 800); //test ok (iphone etui)
                                this.initStyle(0.3, 0.15, 800); //getest met knittingapp
                            }
                            break;
                        }
                    case "BRICK":
                        {
                            this.materialcode = "BRICK";
                            if (this.style == "extrafine") {
                                this.initStyle(0.08, 0.07, 800); //
                            }
                            if (this.style == "fine") {
                                this.initStyle(0.5, 0.15, 600); //
                            }
                            if (this.style == "normal") {
                                this.initStyle(0.3, 0.2, 800); //
                            }

                            break;
                        }
                    case "ABS":
                        {
                            this.materialcode = "ABS";
                            if (this.style == "normal") {
                                this.initStyle(0.4, 0.08, 800); //TEST IN LineControl
                                //this.initStyle(0.4, 0.1, 800); //TEST OK getest met knittingapp
                                //this.initStyle(0.2, 0.05, 800);  te dun
                                //this.initStyle(0.2, 0.2, 800);te laag , te vet 
                                //this.initStyle(0.2, 0.1, 800); te vet 
                                //this.initStyle(0.3, 0.05, 800); te hoog
                            }
                            if (this.style == "fine") {
                                this.initStyle(0.2, 0.1, 800); //NIET GETEST
                            }
                            if (this.style == "extrafine") {
                                this.initStyle(0.08, 0.07, 800); //NIET GETEST
                            }
                            break;
                        }

                    case "REFILLTRANSPARENT":
                        {
                            this.materialcode = "RTRANS";
                            if (this.style == "normal") {
                                this.initStyle(0.5, 0.2, 800); //TEST OK
                            }
                            if (this.style == "fine") {
                                this.initStyle(0.18, 0.1, 800); //NIET GETEST
                            }
                            if (this.style == "extrafine") {
                                this.initStyle(0.08, 0.07, 800); //NIET GETEST
                            }
                            break;
                        }
                    case "NYLON":
                        {
                            this.materialcode = "RTRANS";
                            if (this.style == "normal") {
                                this.initStyle(0.4, 0.2, 800); //TEST OK
                            }
                            if (this.style == "fine") {
                                this.initStyle(0.3, 0.05, 600); //NIET GETEST
                            }
                            if (this.style == "extrafine") {
                                this.initStyle(0.2, 0.04, 800); //NIET GETEST
                            }
                            break;
                        }

                }
                break;
            }
        case "Ultimaker2+":
            { //nozzle 0.4

                this.scale = 0.20; //canvas = 1100 px, bed = 220 mm
                this.filement = 2.85;
                if ((this.material == "PLA" || this.material == "PLAz") && this.style == "fine") {
                    this.initStyle(0.3, 0.04, 1600); // test dunner
                }
                if ((this.material == "PLA" || this.material == "PLAz") && this.style == "normal") {
                    this.initStyle(0.3, 0.1, 2400); // ok getest in knitting app  // ok getest in DUBAI KNITTING APP
                }
                if (this.material == "PLAFLEX" && this.style == "fine") {
                    this.initStyle(0.2, 0.5, 800); // ok getest in knitting app  // ok getest in DUBAI KNITTING APP
                }
                if (this.material == "PLAFLEX" && this.style == "normal") {
                    this.initStyle(0.2, 1, 1600); // ok getest in knitting app  // ok getest in DUBAI KNITTING APP
                }
                if (this.material == "PLAFLEX" && this.style == "blob") {
                    this.initStyle(0.2, 2, 1800); // 
                }
                if (this.material == "PETGCARBON" && this.style == "fine") {
                    this.initStyle(0.4, 0.03, 800); //0.4, 0.03, 1600 ok
                }
                if (this.material == "PETGCARBON" && this.style == "normal") {
                    this.initStyle(0.4, 0.04, 800); //0.4, 0.03, 1600 ok
                }
                if (this.material == "PETGCARBON" && this.style == "fat") {
                    this.initStyle(0.3, 1, 1200); //0.4, 0.03, 1600 ok
                }
                if (this.material == "TRANS" && this.style == "normal") {
                    this.initStyle(0.3, 2, 1600); // test dunner
                }

                if (this.material == "PLABRO" && this.style == "fine") {
                    this.initStyle(0.5, 0.04, 800); //test ok armband.
                }
                if (this.material == "PLABRO" && this.style == "normal") {
                    this.initStyle(0.4, 0.05, 800); //test ok armband.
                }

                if (this.material == "PLAHENNEP" && this.style == "fine") {
                    this.initStyle(0.5, 0.04, 800); //this is with a 0.6 nozzle // ok getest in DUBAI KNITTING APP
                }
                if (this.material == "PLAHENNEP" && this.style == "normal") {
                    this.initStyle(0.4, 0.05, 800); //this is with a 0.6 nozzle // ok getest in DUBAI KNITTING APP
                }

                break;
            }
        case "JellyBox":
            { //nozzle 0.4

                this.scale = 0.20; //canvas = 1100 px, bed = 220 mm
                this.filement = 1.85;
                if (this.material == "MAXXFLEX" && this.style == "normal") {
                    this.initStyle(0.2, 0.5, 800); // ok getest in knitting app  // ok getest in DUBAI KNITTING APP
                }
            }

    }
}
Settings.prototype.initPrinter = function() {
    switch (this.material) {
        case "PLA":
            {
                this.nozzletemp = 210;
                this.bedtemp = 30;
                break;
            }
        case "PLAw":
            {
                this.nozzletemp = 210;
                this.bedtemp = 50;
                break;
            }
        case "PLAz":
            {
                this.nozzletemp = 210;
                this.bedtemp = 40;
                break;
            }
        case "PLAFLEX":
            {
                this.nozzletemp = 220;
                this.bedtemp = 50;
                break;
            }
        case "TPCFLEX":
            {
                this.nozzletemp = 210;
                this.bedtemp = 80; //80 is goed, niet meer veranderen!!
                break;
            }
        case "PLAHENNEP":
            {
                this.nozzletemp = 220;
                this.bedtemp = 30;
                break;
            }
        case "Messing":
            {
                this.nozzletemp = 160;
                this.bedtemp = 40;
                break;
            }
        case "PLABRO":
            {
                this.nozzletemp = 200; // MAKERVERSITY   //(ANET: 160, 40)
                this.bedtemp = 50;
                break;
            }
        case "PURECOPER":
            {
                this.nozzletemp = 177; // 161
                this.bedtemp = 50; // 70
                break;
            }
        case "PETGCARBON":
            {
                this.nozzletemp = 230; // (230-250)
                this.bedtemp = 30;
                break;
            }
        case "PETG":
            {
                this.nozzletemp = 230; // (230-250)
                this.bedtemp = 50;
                break;
            }
        case "SAT1N":
            { //SATIN   temp 190 - 200
                this.nozzletemp = 190;
                this.bedtemp = 50;
                break;
            }
        case "SAT2N":
            { //SATIN   temp 190 - 200
                this.nozzletemp = 190;
                this.bedtemp = 50;
                break;
            }
        case "SAT3N":
            { //SATIN   temp 190 - 200
                this.nozzletemp = 190;
                this.bedtemp = 50;
                break;
            }
        case "BRICK":
            {
                this.nozzletemp = 245;
                this.bedtemp = 100;
                break;
            }
        case "ABS":
            {
                this.nozzletemp = 240;
                this.bedtemp = 60;
                break;
            }
        case "REFILLTRANSPARENT":
            {
                this.nozzletemp = 200;
                this.bedtemp = 30;
                break;
            }
        case "NYLON":
            {
                this.nozzletemp = 260;
                this.bedtemp = 50;
                break;
            }
        case "TRANS":
            {
                this.nozzletemp = 200;
                this.bedtemp = 30;
                break;

            }
        case "MAXXFLEX":
            {
                this.nozzletemp = 210;
                this.bedtemp = 0;
                break;
            }
    }
}

Settings.prototype.initStyle = function(layerheight, thickness, speed) {
    this.layerheight = layerheight;
    this.thickness = thickness;
    this.speed = speed;
}
Settings.prototype.report = function(gcode) {
    console.log("nozzletemp :   " + this.nozzletemp);
    console.log("bedtemp :   " + this.bedtemp);
    console.log("layers :   " + layers.length);
    console.log("layerheight :   " + this.layerheight);
    console.log("thickness :   " + this.thickness);
    console.log("speed :   " + this.speed);
    console.log("extrude :   " + gcode.extrude);
    console.log("filement " + this.filement + ":   " + floor(gcode.extrude * 10) / 10 / this.filement + "cm");

}