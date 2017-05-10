function setFilter(filter){
  var allcards = document.getElementsByClassName("card");
  if(filter == "all"){
    for(var i = 0; i < allcards.length; i++){
      allcards[i].style.display = "block";
    }
  }
  else{
      for(var i = 0; i < allcards.length; i++){
        allcards[i].style.display = "none";
      }
      var cards = document.getElementsByClassName(filter);
      for(var i = 0; i < cards.length; i++){
        cards[i].style.display = "block";
      }
  }
}
function goHome(){
  document.location.href = "/index.html"
}
function show(projectname){
  document.location.href = "/Projects/" + projectname + "/index.html"
}
