//maincontroller.js

app.controller("MainController", function($scope, DataSource){
    
    //This is the callback function
    setData = function(data) {
        $scope.dataSet = data;
    }
         
    DataSource.get(setData);
    $scope.message = "start de zoekmachine-poezie";
    $scope.sentence = "";
    $scope.combiwords = "";
    $scope.words = new Array();
    $scope.newSentence = null;
    $scope.newWord = null;
    $scope.no = 0;
    $scope.drawno = 0;
    $scope.pics = new Array();
    $("#insearch").keyup(function(event){
    if(event.keyCode == 13){
       $scope.addNew();
    }
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
        }
        else{
                $scope.message = "helaas, er is geen geldige invoer gevonden.";
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
        if(response.error != null && response.error.code === 403){
            $scope.message = "helaas, vandaag kun je geen zoekmachine-poezie meer maken.";
        }
        else if( response.error != null){
             $scope.message = "Ga door met de volgende zin.";
        }
        else{
           if(response.items){
           for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                if(item.pagemap.cse_thumbnail != null){
                        var img = new Image();
                        img.onload = function(){
                            
                            
                             
                            
                            try{
                                    var canvas=document.getElementById("acanvas");
                                    var ctx=canvas.getContext("2d");
                                    var scale = $scope.calcScale(img.width,img.height);
                                    var width =  parseInt(img.width * scale);
                                    var height =  parseInt(img.height * scale);
                                    $("#acanvas").attr("width", width);
                                    $("#acanvas").attr("height", height);
                                
                                    ctx.drawImage(this,0,0, width, height);
                                
                                
                                    var canvas=document.getElementById("bcanvas");
                                    var bctx=canvas.getContext("2d");
                                    $("#bcanvas").attr("width", 800);
                                    $("#bcanvas").attr("height", 100);
                                
                                    $scope.setBGcolor();
                                    $scope.drawText(bctx, 800);
                                    
                            }
                            catch(e){
                                console.log("drawing failed: " + e);   
                            }
                                
                            
                            var str ="<img src=" + item.pagemap.cse_thumbnail[0].src + " width='" +  item.pagemap.cse_thumbnail[0].width + "'";
                            str +=  " $ght='" + item.pagemap.cse_thumbnail[0].height + "'>";
                            $("#content").prepend( str );
                        }
                        img.src = item.pagemap.cse_image[0].src;
                        img.width =  item.pagemap.cse_thumbnail[0].width;
                        img.height =  item.pagemap.cse_thumbnail[0].height;
                       
                        $scope.message = "Ga door met de volgende zin.";
                    
                     
                  }
                  else{
                        $scope.message = "helaas, er is niets gevonden.";
                  }  
                    $scope.combiwords = "";
                    
              }
             
           }
           else{
                $scope.message = "helaas, er is niets gevonden.";
              
            }
        }
        $scope.no += 1;
        $("#insearch").val("");
        $("#insearch").focus();
    }
  
    $scope.drawText = function(ctx, width){
        
        ctx.fillStyle = "white";
        ctx.font = "36px sans-serif";
        ctx.textBaseline = 'top';
        var x = parseInt((width - ctx.measureText($scope.newSentence).width)/2)
        ctx.fillText($scope.newSentence, x, 50);
       
    }
    
    $scope.setBGcolor = function(){
       var color = "#0033ff"
       $("#divcanvas").css("background-color:" + color + ";");
    }
       

$scope.calcScale = function(w,h){
    var scale = (screen.availHeight - 280) / h;
    return scale;
}
 $scope.save = function(img){
     //local save
      try {
            localStorage.setItem("1", JSON.stringify(img));
        }
        catch (e) {
                console.log("Storage failed: " + e);                
        }
 }
 
 $scope.load = function(index){
     var localimg = null;
      try {
       
            retrievedObject = localStorage.getItem("1");
            localimg = JSON.parse(retrievedObject);
        }
        catch (e) {
                console.log("Loading failed: " + e);                
        }
        
     
    return localimg;
 }
 
 
 $scope.notinteresting = new Array();
    $scope.notinteresting.push("de", "het", "een")
    $scope.notinteresting.push("en","maar","omdat", "zodat", "nadat", "toen", "voordat");
    $scope.notinteresting.push("is", "zijn", "heb", "hebben","heeft","wil","kan","willen","kunnen", "had","kon", "was", "waren", "hadden");
    $scope.notinteresting.push("in", "op", "achter", "voor", "onder", "boven", "naast", "over", "naar", "te", "uit", "niet", "om");
    $scope.notinteresting.push("van", "mij","ik","jij", "wij", "zij", "hen", "hun", "ons", "mijn" ,"je", "me", "ze", "u");
    //$scope.notinteresting.push("sex", "lul", "vagina","tiet", "tieten", "anus", "kut", "neuken", "neukt" );

});

