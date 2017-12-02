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

  // About link
  $(".navGrid #0_0 .inner").text("About");
  $(".navGrid #0_0 .inner").css("background-color","#FF2224");

  // Lines link
  // $(".navGrid #0_1 .inner").append($("<a href='/lines'>Lines</a>"));
  $(".navGrid #0_1 .inner").text("Lines");

  $(".navGrid #0_1 .inner").click(function () {
      
      window.location.replace("/lines");
      // $(".navGrid #1_0").attr("href", '/lines');
  });

  // Close nav
  $(".navGrid #0_2 .inner").text("X");
  $(".navGrid #0_2 .inner").click(function(){
    $(".mainGrid").toggleClass("fullNav");
    $(".navGrid").toggleClass("fullNav");
  });

  // Humans link
  $(".navGrid #1_0 .inner").text("Humans");

  // Sponsors & Tickets link
  $(".navGrid #1_1 .inner").text("Sponsors & Tickets");

  // History link
  $(".navGrid #1_2 .inner").text("History");
}

$(window).ready(function(){
    animateBlock("#1_6",1,1);
    // MOVE THIS TO ANOTHER JS FILE
    // CONTENT FOR THE ABOUT
    animateBlock("#1_1",0,1);
    animateBlock("#0_6",0,1);
    $(".mainGrid #0_6 .inner").text("Humans").addClass("topLink");
    animateBlock("#4_5",1,2);
    animateBlock("#3_1",2,1);
    $(".mainGrid #1_1 .inner").text("About").addClass("title");
    $(".mainGrid #3_1 .inner").addClass("aboutImg1");
    $("#1_6 .inner").text("NAV").addClass("navBlock");
    $("#1_6 .inner").click(function(){
      summonFullScreenNav();
    });
});
