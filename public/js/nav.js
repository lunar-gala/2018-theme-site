function summonFullNav(){
  //getting the grid structure for the fullscreen nav
  $(".navGrid").children().remove();
  navGrid = initGrid(2,3);
  //hide the main grid for the time being
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

  currentPath = window.location.pathname;
  options = {"/about":[0,0], "/lines":[0,1], "/humans":[1,0] , "/sponsors":[1,1]}
  currentIndices = options[currentPath];

  $(".navGrid #"+currentIndices.join("_")+" .inner").addClass("active");

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

//This is the mini nav
function summonMiniNav(){
  animateBlock("#1_6",1,1);

  //creating the nav box
  currentPath = window.location.pathname;
  options = {"/about":[0,0], "/lines":[0,1], "/humans":[1,0] , "/sponsors":[1,1]}
  currentIndices = options[currentPath];
  navBox = `<div class="navBox">`;
  for(var i = 0;  i < 2; i++){
    navBox += `<div class ="row">`
    for(var j = 0; j < 3; j ++){
      navBox += `<div class="" id="navInner_`+parseInt(i)+parseInt(j)+`"></div>`
    }
    navBox += `</div>`
  }
  navBox  += `</div>`
  $("#1_6 .inner").html(navBox);
  $("#navInner_"+currentIndices.join("")).toggleClass("active");
  $("#1_6 .inner").click(function(){
    summonFullNav();
  });
}

$(window).ready(function(){
    summonMiniNav();
})
