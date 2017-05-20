//maincontroller.js

app.controller("MainController", function($scope, DataSource){
    
    //This is the callback function
    /*
    setData = function(data) {
        $scope.dataSet = data;
    }
         
    DataSource.get(setData);
    */
     
     $scope.acanvas=document.getElementById("acanvas");
     $scope.actx=$scope.acanvas.getContext("2d");
        $("#acanvas").attr("width", 800);
        $("#acanvas").attr("height", 100);
    $scope.bcanvas=document.getElementById("bcanvas");
     $scope.bctx=$scope.bcanvas.getContext("2d");
        $("#bcanvas").attr("width", 800);
        $("#bcanvas").attr("height", 150);
    $scope.message = "start de zoekmachine-poezie";
    $scope.sentence = "";
    $scope.combiwords = "";
    $scope.words = new Array();
    $scope.newSentence = null;
    $scope.newWord = null;
    $scope.no = 0;
    $scope.drawno = 0;
    
    $("#insearch").keyup(function(event){
        if(event.keyCode == 13){
           $scope.addNew();
        }
    });
    
    $("body").click(function(event){
        $("#insearch").val("");
        $("#insearch").focus();
    });

    $scope.addNew = function() {
       
        
        if ($scope.newSentence != null && $scope.newSentence != "") {
           
            var str = $scope.newSentence.toLowerCase();
            $scope.sentence = str.split(" ");
            for(var i = 0; i < $scope.sentence.length; i++){
                
                var badword = false;
                $scope.newWord = $scope.sentence[i];
                 for(var j = 0; j < $scope.words.length; j++){
                    
                    if( $scope.newWord === $scope.words[j].name){
                        //bestaat het woord al?
                        badword =true;
                        break;
                    }
                 }
                 for(var k = 0; k < $scope.notinteresting.length; k++){
                    
                    if( $scope.newWord === $scope.notinteresting[k]){
                        //geen ineteressant woord?
                        badword =true;
                        break;
                    }
                 }
                 if(!badword){
                    if($scope.combiwords.length === 0){
                        $scope.combiwords = $scope.newWord;
                    }
                    else{
                        $scope.combiwords += "," + $scope.newWord;
                    }
                    
                     
                     
                 }
            }
            $scope.words.push({
                        id: $scope.words.length + 1,
                        sentence: $scope.newSentence,
                        combiwords: $scope.combiwords
                        });
           
        }
        if($scope.words != null){
                $scope.search($scope.words[$scope.words.length - 1].combiwords);
                $scope.combiwords = "";
                $scope.clearCanvas();
                $("#insearch").val("");
                $("#insearch").focus();
                
        
        }
        else{
                $scope.message = "helaas, er is geen geldige zin gevonden.";
                $scope.clearCanvas();
                $("#insearch").val("");
                $("#insearch").focus();
                
        }
    }


    $scope.search = function(term)
    {
        console.log(term);
        
        $("#insearch").html("");
        var key = "AIzaSyAyJaL6ItlfokNC0UzLjfht2xpbF6FGFK8";
        var cx = "003113593302088471436:-rhnuh42i0u";
        var url = "https://www.googleapis.com/customsearch/v1?key=" + key + "&num=1&cx=" + cx + "&fields=items&hl=nl" + "&q=" + escape(term) + "&callback=?";
        $.getJSON(url, '', $scope.searchCompleted);
        
        
    }

    $scope.searchCompleted = function ( response)
    {
        $scope.clearCanvas();
        if(response.error != null && response.error.code === 403){
            $scope.message = "helaas, vandaag kun je geen zoekmachine-poezie meer maken.";
        }
        else if( response.error != null){
              $scope.message = "Ga door met de volgende zin.";
              
              $scope.drawText("Wilt u adverteren op Zoekmachine Poezie?", 800, 1);
              $scope.drawText("Bel 06 27070594 voor meer informatie.", 800, 2);
              $scope.newSentence = "";
              
              $("#insearch").val("");
              $("#insearch").focus();
        }
        else{
           if(response.items){
           for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                if(item.pagemap.cse_thumbnail != null){
                        var img = new Image();
                        img.onload = function(){
                            try{
                                    var scale = $scope.calcScale(img.width,img.height);
                                    var width =  parseInt(img.width * scale);
                                    var height =  parseInt(img.height * scale);
                                    $("#acanvas").attr("width", width);
                                    $("#acanvas").attr("height", height);
                                    
                                     $scope.actx.drawImage(this,0,0, width, height);
                                
                                    
                                
                                    $scope.setBGcolor();
                                    $scope.drawText($scope.newSentence, 800, 1);
                                
                                    $scope.message = "Ga door met de volgende zin.";
                                 
                               
                            }
                            catch(e){
                                console.log("drawing failed: " + e);   
                            }
                                
                            
                            var str ="<img src=" + item.pagemap.cse_thumbnail[0].src + " width='" +  item.pagemap.cse_thumbnail[0].width + "'";
                            str +=  " $ght='" + item.pagemap.cse_thumbnail[0].height + "'><br/>";
                            $("#content").prepend( str );
                            
                        }
                        if(item.pagemap.cse_image[0]){
                            img.src = item.pagemap.cse_image[0].src;
                        }
                        else{
                            img.src = item.pagemap.cse_thumbnail[0].src;
                        }
                        img.width =  item.pagemap.cse_thumbnail[0].width;
                        img.height =  item.pagemap.cse_thumbnail[0].height;
                       
                        
                    
                     
                  }
                  else{
                     
                      $scope.message = "Helaas, er is niets gevonden.";
                      $scope.drawText("Uw reclame had hier kunnen staan.", 800, 1);
                      $scope.drawText("Bel 06 27070594 voor meer informatie.", 800, 2);
                      $scope.newSentence = "";
                      $("#insearch").val("");
                      $("#insearch").focus();
                  }  
                  
                    
              }
             
           }
           else{
               
               
                $scope.message = "Helaas, er is niets gevonden.";
                $scope.drawText("U kunt hier nog adverteren.", 800, 1);
                $scope.drawText("Bel 06 27070594 voor meer informatie.", 800, 2);
                $scope.newSentence = "";
                $("#insearch").val("");
                $("#insearch").focus();
                
            }
        }
                
    }
  
    $scope.drawText = function(zin, width, h){
        
       
       
        $scope.bctx.fillStyle = "white";
        $scope.bctx.font = "36px sans-serif";
        $scope.bctx.textBaseline = 'top';
        var x = parseInt((width - $scope.bctx.measureText(zin).width)/2)
        if( x < 0 ){
            $scope.bctx.font = "24px sans-serif";
            x = parseInt((width - $scope.bctx.measureText(zin).width)/2);
        }
        $scope.bctx.fillText(zin, x, h * 50);
       
    }
    
    $scope.setBGcolor = function(){
       var color = "#0033ff"
       $("body").css("backgroundColor:" + color + ";");
    }

$scope.clearCanvas = function(){
    $scope.actx.clearRect(0,0,$scope.acanvas.width,$scope.acanvas.height);
    $scope.bctx.clearRect(0,0,$scope.bcanvas.width,$scope.bcanvas.height);
}

$scope.calcScale = function(w,h){
    var scale = (screen.availHeight - 280) / h;
    return scale;
}

 id="insearch" 
 $scope.notinteresting = new Array();
    $scope.notinteresting.push("de", "het", "een")
    $scope.notinteresting.push("en","maar","omdat", "zodat", "nadat", "toen", "voordat");
    $scope.notinteresting.push("is", "zijn", "heb", "hebben","heeft","wil","kan","willen","kunnen", "had","kon", "was", "waren", "hadden");
    $scope.notinteresting.push("in", "op", "achter", "voor", "onder", "boven", "naast", "over", "naar", "te", "uit", "niet", "om");
    $scope.notinteresting.push("van", "mij","ik","jij", "wij", "zij", "hen", "hun", "ons", "mijn" ,"je", "me", "ze", "u");
    $scope.notinteresting.push("dit", "dat","deze","die");
    //$scope.notinteresting.push("sex", "lul", "vagina","tiet", "tieten", "anus", "kut", "neuken", "neukt" );


    
});

$( document ).ready(function() {
    makeUnselectable = function(node) {
        if (node.nodeType == 1) {
            node.setAttribute("unselectable", "on");
        }
        var child = node.firstChild;
        while (child) {
            makeUnselectable(child);
            child = child.nextSibling;
        }
    }
    makeUnselectable(document.getElementById('abody'));
});
