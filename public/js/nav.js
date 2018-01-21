function summonFullNav(){
  //getting the grid structure for the fullscreen nav
  grid.map((row)=>{row.map((block)=>{block.animateOut()})})

  $(".navGrid").children().remove();
  navGrid = [];
  navGrid = initGrid(2,3,navGrid,"nav");
  //hide the main grid for the time being
  $(".mainGrid").toggleClass("fullNav");
  window.setTimeout(function(){
    navGrid.map(function(inner){
      inner.map(function(cur){
        cur.create(".navGrid");
        cur.update(cur.width, cur.height);
        cur.animateOut();
      });
    });
    //Manually insert the data into the grid
    $(".navGrid #nav0_0 .inner").text("About");

    currentPath = window.location.pathname;
    options = {"/about":[0,0], "/lines":[0,1], "/humans":[1,0] , "/sponsors":[1,1]}
    currentIndices = options[currentPath];

    $(".navGrid #nav"+currentIndices.join("_")+" .inner").addClass("active");

    $(".navGrid #nav0_1 .inner").text("Lines");
    $(".navGrid #nav0_1 .border-left").remove();
    $(".navGrid #nav0_1 .inner").click(function () {
        $(".mainGrid").toggleClass("fullNav");
        $(".navGrid").toggleClass("fullNav");
        deleteMiniNav();
        load_page("/lines");
    });

    // Close nav
    $(".navGrid #nav0_2 .inner").text("X");
    $(".navGrid #nav0_2 .border-left").remove();
    $(".navGrid #nav0_2 .inner").click(function(){
      navGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
      $(".navGrid").toggleClass("fullNav");
      window.setTimeout(function(){
        $(".mainGrid").toggleClass("fullNav");
        grid.map((row)=>{row.map((block)=>{
          console.log(block.id);
          block.animateIn()})})
      },1250);
    });

    // Humans link
    $(".navGrid #nav1_0 .inner").text("Humans");
    $(".navGrid #nav1_0 .border-top").remove();

    // Sponsors & Tickets link
    $(".navGrid #nav1_1 .inner").text("Sponsors & Tickets");
    $(".navGrid #nav1_1 .border-top").remove();
    $(".navGrid #nav1_1 .border-left").remove();

    // History link
    $(".navGrid #nav1_2 .inner").text("History");
    $(".navGrid #nav1_2 .border-left").remove();
    $(".navGrid #nav1_2 .border-top").remove();
    window.setTimeout(function(){
      navGrid.map((row)=>{row.map((block)=>{block.animateIn()})})
      $(".navGrid").toggleClass("fullNav");
    },100);


  },1000);
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
function deleteMiniNav(){
  resetBlock($("#1_6")[0]);
  $("#1_6 .inner").html("");
}

// $(window).ready(function(){
//     summonMiniNav();
// })
