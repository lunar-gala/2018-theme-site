function summonFullScreenNav(){
  //getting the grid structure for the fullscreen nav
  $(".navGrid").children().remove();
  navGrid = initGrid(2,3);
  console.log(navGrid);
  $(".mainGrid").toggleClass("fullNav");
  navGrid.map(function(inner){
    inner.map(function(cur){
      cur.create(".navGrid");
      cur.update(cur.width, cur.height);
    });
  });
  $(".navGrid").toggleClass("fullNav");

  //Manually insert the data into the grid
  $(".navGrid #0_0 .inner").text("About");
  $(".navGrid #0_0 .inner").css("background-color","#FF2224");
  $(".navGrid #0_1 .inner").text("Lines");
  $(".navGrid #0_2 .inner").text("X");
  $(".navGrid #0_2 .inner").click(function(){
    $(".mainGrid").toggleClass("fullNav");
    $(".navGrid").toggleClass("fullNav");
  });
  $(".navGrid #1_0 .inner").text("Humans");
  $(".navGrid #1_1 .inner").text("Sponsors & Tickets");
  $(".navGrid #1_2 .inner").text("History");
}
// $(window).ready(summonFullScreenNav);
$(window).ready(function(){
    animateBlock("#1_6",1,1);
    $("#1_6 .inner").text("NAV");
    $("#1_6 .inner").click(function(){
      summonFullScreenNav();
    });
});
