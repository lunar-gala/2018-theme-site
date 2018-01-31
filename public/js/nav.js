function navOut(url){
  $('.navGrid *').remove();
  load_page(url);
}

function summonFullNav(){
  //getting the grid structure for the fullscreen nav
  grid.map((row)=>{row.map((block)=>{
    block.animateOut()})})
  titleGrid.map((row)=>{row.map((block)=>{block.animateOut()})})

  $(".navGrid").empty();

  navGrid = [];
  navGrid = initGrid(2,3,navGrid,"nav",'.navGrid',0);

  if(currentPage > 0){
    $('.mainGrid').css('z-index','-9999999999');
    window.setTimeout(function(){
      $('.mainGrid').css('transform','translateY(0px)');
      currentPage = 0;
      window.setTimeout(function(){
        __pageAnimating = false;
        $('.mainGrid').css('display','block');
      },700)
    },900)
  }


  //hide the main grid for the time being
  $(".mainGrid").toggleClass("fullNav");
  $(".titleGrid").toggleClass("fullNav");
  window.setTimeout(function(){
    navGrid.map(function(inner){
      inner.map(function(cur){
        cur.create(".navGrid");
        cur.update(cur.width, cur.height);
        cur.animateOut();
      });
    });
    //Manually insert the data into the grid
    $(".navGrid #nav_0_0 .inner").text("About");


    $(".navGrid #nav_0_0 .inner").click(function (e) {
      if (!isFullNavOpen()) {
        return;
      }

      navGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
      $(".navGrid").toggleClass("fullNav");

      window.setTimeout(function(){
        navOut("/about");
      },1000);
    });

    currentPath = window.location.pathname;
    options = {"/about":[0,0], "/lines":[0,1], "/humans":[1,0] , "/sponsors":[1,1]}
    currentIndices = options[currentPath];

    $(".navGrid #nav_"+currentIndices.join("_")+" .inner").addClass("active");

    $(".navGrid #nav_0_1 .inner").text("Lines");
    $(".navGrid #nav_0_1 .border-left").remove();

    $(".navGrid #nav_0_1 .inner").click(function (e) {
      if (!isFullNavOpen()) {
        return;
      }

      navGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
      $(".navGrid").toggleClass("fullNav");

      window.setTimeout(function(){
        navOut("/lines");
      },1000);
    });

    // Close nav
    $(".navGrid #nav_0_2 .inner").text("X");
    $(".navGrid #nav_0_2 .border-left").remove();
    $(".navGrid #nav_0_2 .inner").click(function(){
      if (!isFullNavOpen()) {
        return;
      }
      navGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
      $(".navGrid").toggleClass("fullNav");
      window.setTimeout(function(){
        navOut(window.location.pathname);
      },1000);
    });

    // Humans link
    $(".navGrid #nav_1_0 .inner").text("Humans");
    $(".navGrid #nav_1_0 .border-top").remove();

    // Sponsors & Tickets link
    $(".navGrid #nav_1_1 .inner").text("Sponsors & Tickets");
    $(".navGrid #nav_1_1 .border-top").remove();
    $(".navGrid #nav_1_1 .border-left").remove();

    // History link
    $(".navGrid #nav_1_2 .inner").text("History");
    $(".navGrid #nav_1_2 .border-left").remove();
    $(".navGrid #nav_1_2 .border-top").remove();
    window.setTimeout(function(){
      navGrid.map((row)=>{row.map((block)=>{block.animateIn()})})
      $(".navGrid").toggleClass("fullNav");
    },100);
  },1000);
}

//This is the mini nav
function summonMiniNav(){
  animateBlock("#title_1_6",1,1);
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
  $("#title_1_6 .inner").html(navBox);
  $("#navInner_"+currentIndices.join("")).toggleClass("active");
  $("#title_1_6 .inner").click(function(){
    summonFullNav();
  });
}
function deleteMiniNav(){
  resetBlock($("#title_1_6")[0]);
  $("#title_1_6 .inner").html("");
}
console.log(deleteMiniNav)

function isFullNavOpen() {
  return $(".mainGrid").hasClass("fullNav")
}
