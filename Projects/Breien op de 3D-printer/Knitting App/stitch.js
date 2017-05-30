function Stitch(type){
     this.type = type;
     this.stitch =[];
     this.create();
}
Stitch.prototype.create =function(){
    switch(this.type){
       case 'A': {               //R opzetten, eerste steek
        //  this.stitch[0] = new Pos(-4,0,1,0);
        //  this.stitch[1] = new Pos(-4,3,1,0);
          this.stitch[0] = new Pos(0,0,1,0);
          this.stitch[1] = new Pos(1,0,1,0);
          this.stitch[2] = new Pos(4,1,1,0);
          this.stitch[3] = new Pos(4,3,1,0);
          this.stitch[4] = new Pos(3,4,1,0);
          this.stitch[5] = new Pos(2,4,1,0);
          this.stitch[6] = new Pos(1,3,1,0);
          this.stitch[7] = new Pos(1,1,1,0);
          this.stitch[8] = new Pos(4,0,1,0);
        //  this.stitch[9] = new Pos(4,3,1,0);
          break;
        }
       case 'B': {               //R opzetten
         this.stitch[0] = new Pos(1,0,1,0);
         this.stitch[1] = new Pos(4,1,1,0);
         this.stitch[2] = new Pos(4,3,1,0);
         this.stitch[3] = new Pos(3,4,1,0);
         this.stitch[4] = new Pos(2,4,1,0);
         this.stitch[5] = new Pos(1,3,1,0);
         this.stitch[6] = new Pos(1,1,1,0);
         this.stitch[7] = new Pos(4,0,1,0);
         //this.stitch[8] = new Pos(4,0,1,0);
         //this.stitch[9] = new Pos(4,3,1,0);
        break;
       }
       case 'C': {               //R opzetten, laatste steek
         this.stitch[0] = new Pos(1,0,1,0);
         this.stitch[1] = new Pos(4,1,1,0);
         this.stitch[2] = new Pos(4,3,1,0);
         this.stitch[3] = new Pos(3,4,1,0);
         this.stitch[4] = new Pos(2,4,1,0);
         this.stitch[5] = new Pos(1,3,1,0);
         this.stitch[6] = new Pos(1,1,1,0);
         this.stitch[7] = new Pos(4,0,1,0);
         this.stitch[8] = new Pos(4,1,1,0);

        break;
       }
       case 'D': {               //L opzetten eerste steek
         this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[1] = new Pos(-1,0,1,0);
         this.stitch[2] = new Pos(-4,3,1,0);
         this.stitch[3] = new Pos(-4,5,1,0);
         this.stitch[4] = new Pos(-3,6,1,0);
         this.stitch[5] = new Pos(-2,6,1,0);
         this.stitch[6] = new Pos(-1,5,1,0);
         this.stitch[7] = new Pos(-1,3,1,0);
         this.stitch[8] = new Pos(-4,0,1,0);
         break;
       }
       case 'E': {               //L opzetten
        this.stitch[0] = new Pos(0,0,1,0);
        this.stitch[1] = new Pos(-1,0,1,0);
        this.stitch[2] = new Pos(-4,3,1,0);
        this.stitch[3] = new Pos(-4,5,1,0);
        this.stitch[4] = new Pos(-3,6,1,0);
        this.stitch[5] = new Pos(-2,6,1,0);
        this.stitch[6] = new Pos(-1,5,1,0);
        this.stitch[7] = new Pos(-1,3,1,0);
        this.stitch[8] = new Pos(-4,0,1,0);
        this.stitch[9] = new Pos(-5,0,1,0);
        break;
        }
       case 'F': {               //L opzetten, laatste steek
        this.stitch[0] = new Pos(0,0,1,0);
        this.stitch[1] = new Pos(-1,0,1,0);
        this.stitch[2] = new Pos(-4,3,1,0);
        this.stitch[3] = new Pos(-4,5,1,0);
        this.stitch[4] = new Pos(-3,6,1,0);
        this.stitch[5] = new Pos(-2,6,1,0);
        this.stitch[6] = new Pos(-1,5,1,0);
        this.stitch[7] = new Pos(-1,3,1,0);
        this.stitch[8] = new Pos(-4,0,1,0);
        this.stitch[9] = new Pos(-5,0,1,0);
        this.stitch[10] = new Pos(-5,1,1,0);
        this.stitch[11] = new Pos(-4,1,1,0);


       break;
      }
      case 'L': {               //R naar links

        this.stitch[0] = new Pos(-1,1,1,0);
        this.stitch[1] = new Pos(-1,3,1,0);
        this.stitch[2] = new Pos(0,4,1,0);
        this.stitch[3] = new Pos(0,6,1,0);
        this.stitch[4] = new Pos(-1,7,1,0);
        this.stitch[5] = new Pos(-2,7,1,0);
        this.stitch[6] = new Pos(-3,6,1,0);
        this.stitch[7] = new Pos(-3,4,1,0);
        this.stitch[8] = new Pos(-2,3,1,0);
        this.stitch[9] = new Pos(-2,1,1,0);
        this.stitch[10] = new Pos(-3,0,1,0);
        this.stitch[11] = new Pos(-4,0,1,0);
       break;
      }
      case 'K': {               //R laatste links

        this.stitch[0] = new Pos(-1,1,1,0);
        this.stitch[1] = new Pos(-1,3,1,0);
        this.stitch[2] = new Pos(0,4,1,0);
        this.stitch[3] = new Pos(0,6,1,0);
        this.stitch[4] = new Pos(-1,7,1,0);
        this.stitch[5] = new Pos(-2,7,1,0);
        this.stitch[6] = new Pos(-3,6,1,0);
        this.stitch[7] = new Pos(-3,4,1,0);
        this.stitch[8] = new Pos(-2,3,1,0);
        this.stitch[9] = new Pos(-2,1,1,0);
        this.stitch[10] = new Pos(-3,0,1,0);
        this.stitch[11] = new Pos(-4,0,1,0);
        this.stitch[12] = new Pos(-4,4,1,0);
       break;
      }
      case 'M': {               //R laatste links
        this.stitch[0] = new Pos(-1,1,1,0);

        this.stitch[1] = new Pos(-1,2,1,0);
        this.stitch[2] = new Pos(-2,3,1,0);
        this.stitch[3] = new Pos(-3,4,1,0);
        this.stitch[4] = new Pos(-3,6,1,0);
        this.stitch[5] = new Pos(-2,7,1,0);
        this.stitch[6] = new Pos(-1,7,1,0);
        this.stitch[7] = new Pos( 0,6,1,0);
        this.stitch[8] = new Pos( 0,4,1,0);
        this.stitch[9] = new Pos(-1,3,1,0);
        this.stitch[10] = new Pos(-3,3,1,0);
        this.stitch[11] = new Pos(-4,4,1,0);
      //this.stitch[12] = new Pos(-4,4,1,0);

       break;
      }
       case 'R': {               //R naar rechts
         this.stitch[0] = new Pos(1,0,1,0);
         this.stitch[1] = new Pos(2,1,1,0);
         this.stitch[2] = new Pos(2,3,1,0);
         this.stitch[3] = new Pos(1,4,1,0);
         this.stitch[4] = new Pos(1,6,1,0);
         this.stitch[5] = new Pos(2,7,1,0);
         this.stitch[6] = new Pos(3,7,1,0);
         this.stitch[7] = new Pos(4,6,1,0);
         this.stitch[8] = new Pos(4,4,1,0);
         this.stitch[9] = new Pos(3,3,1,0);
         this.stitch[10] = new Pos(3,1,1,0);
         this.stitch[11] = new Pos(4,0,1,0);
         //this.stitch[12] = new Pos(4,0,1,0);
        break;
       }
       case 'S': {               //R laatste rechts
         this.stitch[0] = new Pos(1,0,1,0);
         this.stitch[1] = new Pos(2,1,1,0);
         this.stitch[2] = new Pos(2,3,1,0);
         this.stitch[3] = new Pos(1,4,1,0);
         this.stitch[4] = new Pos(1,6,1,0);
         this.stitch[5] = new Pos(2,7,1,0);
         this.stitch[6] = new Pos(3,7,1,0);
         this.stitch[7] = new Pos(4,6,1,0);
         this.stitch[8] = new Pos(4,4,1,0);
         this.stitch[9] = new Pos(3,3,1,0);
         this.stitch[10] = new Pos(3,1,1,0);
         this.stitch[11] = new Pos(4,0,1,0);
         this.stitch[12] = new Pos(4,4,1,0);

        break;
       }
       case 'T': {               //R naar rechts
         this.stitch[0] = new Pos(1,0,1,0);
         this.stitch[1] = new Pos(2,1,1,0);
         this.stitch[2] = new Pos(2,3,1,0);
         this.stitch[3] = new Pos(1,4,1,0);
         this.stitch[4] = new Pos(1,6,1,0);
         this.stitch[5] = new Pos(2,7,1,0);
         this.stitch[6] = new Pos(3,7,1,0);
         this.stitch[7] = new Pos(4,6,1,0);
         this.stitch[8] = new Pos(4,4,1,0);
         this.stitch[9] = new Pos(1,4,1,0)
        //  this.stitch[9] = new Pos(3,3,1,0);
        //  this.stitch[10] = new Pos(3,1,1,0);
        //  this.stitch[11] = new Pos(4,4,1,0);

      this.stitch[10] = new Pos(4,4,1,0);
        break;
       }

       case 'U': {               //naar links afhechten, eerste steek
         this.stitch[0] = new Pos(-1,1,1,0);
         this.stitch[1] = new Pos(-1,3,1,0);
         this.stitch[2] = new Pos( 0,4,1,0);
         this.stitch[3] = new Pos(-1,4,1,0);
        //  this.stitch[4] = new Pos(-5,3,1,0);
        //  this.stitch[5] = new Pos(-5,1,1,0);
        //  this.stitch[6] = new Pos(-4,0,1,0);
        //  this.stitch[7] = new Pos(-3,0,1,0);
        //  this.stitch[8] = new Pos(-2,1,1,0);
        //  this.stitch[9] = new Pos(-2,3,1,0);
        //  this.stitch[10] = new Pos(-4,4,1,0);

         break;
         }
       case 'V': {                //L afhechten
         //this.stitch[0] = new Pos(2,4,1,0);
        // this.stitch[0] = new Pos(0,0,1,0);
         this.stitch[0] = new Pos(-1,0,1,0);
         this.stitch[1] = new Pos(-4,-1,1,0);
         this.stitch[2] = new Pos(-4,-3,1,0);
         this.stitch[3] = new Pos(-3,-4,1,0);
         this.stitch[4] = new Pos(-2,-4,1,0);
         this.stitch[5] = new Pos(-1,-3,1,0);
         this.stitch[6] = new Pos(-1,-1,1,0);
         this.stitch[7] = new Pos(-4,0,1,0);


         break;
        }
       case 'W': {                //L afhechten, laatste steek

         this.stitch[0] = new Pos(-1,0,1,0);
         this.stitch[1] = new Pos(-4,-1,1,0);
         this.stitch[2] = new Pos(-4,-3,1,0);
         this.stitch[3] = new Pos(-3,-4,1,0);
         this.stitch[4] = new Pos(-2,-4,1,0);
         this.stitch[5] = new Pos(-1,-3,1,0);
         this.stitch[6] = new Pos(-1,-1,1,0);
         this.stitch[7] = new Pos(-4,0,1,0);
         this.stitch[8] = new Pos(-5,0,1,0);
         this.stitch[9] = new Pos(-7,-1,1,0);
          this.stitch[10] = new Pos(-7,-4,1,0);
          this.stitch[11] = new Pos(-6,-4,1,0);
          this.stitch[12] = new Pos(-5,-3,1,0);
          this.stitch[13] = new Pos(-5,-1,1,0);
            this.stitch[14] = new Pos(-7,0,1,0);
           break;
        }
       case 'X': {                //R afhechten, eerste steek

           this.stitch[0] = new Pos(1,0,1,0);
           this.stitch[1] = new Pos(2,1,1,0);
           this.stitch[2] = new Pos(2,4,1,0);


           break;
       }
       case 'Y': {                //R afhechten naar rechts
            this.stitch[0] = new Pos(1, 0,1,0);
           this.stitch[1] = new Pos(4,-1,1,0);
           this.stitch[2] = new Pos(4, -3,1,0);
           this.stitch[3] = new Pos(3,-4,1,0);
           this.stitch[4] = new Pos(2,-4,1,0);
           this.stitch[5] = new Pos(1,-3,1,0);
           this.stitch[6] = new Pos(1,-1,1,0);
           this.stitch[7] = new Pos(4, 0,1,0);

          break;
       }
       case 'Z': {                //R afhechten, laatste steek
          this.stitch[0] = new Pos(1, 0,1,0);
         this.stitch[1] = new Pos(4,-1,1,0);
         this.stitch[2] = new Pos(4, -3,1,0);
         this.stitch[3] = new Pos(3,-4,1,0);
         this.stitch[4] = new Pos(2,-4,1,0);
         this.stitch[5] = new Pos(1,-3,1,0);
         this.stitch[6] = new Pos(1,-1,1,0);
         this.stitch[7] = new Pos(4, 0,1,0);
         this.stitch[8] = new Pos(5, 0,1,0);
         this.stitch[9] = new Pos(6, 0,1,0);
         this.stitch[10] = new Pos(5, -1,1,0);
         this.stitch[11] = new Pos(5, -3,1,0);
          this.stitch[12] = new Pos(6, -4,1,0);
        break;
       }

       case '/': {                //2 zakken
         this.stitch[0] = new Pos(-1,1,0,0);
         this.stitch[1] = new Pos(-1,3,0,0);
         this.stitch[2] = new Pos(0,4,0,0);
        break;
       }
       case '|': {                //2 zakken
         this.stitch[0] = new Pos(1,0,0,0);
         this.stitch[1] = new Pos(2,1,0,0);
         this.stitch[2] = new Pos(2,3,0,0);
         this.stitch[3] = new Pos(0,4,0,0);
        break;
       }

     }
  }
