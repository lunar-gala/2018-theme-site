__mobile_nav_active = false;
__desktop_nav_active = false;

function navOut(url){
  $('.navGrid *').remove();
  $('body').bind('mousewheel',scrollMovement);
  __desktop_nav_active = false;
  load_page(url);
}

function navOutMobile(url){
  $(".mainGrid").css("display","block");
  __mobile_nav_active = false;
  $("body").bind('mousewheel', scrollMovement);
  $('.navGrid *').remove();
  $('.navGrid').removeClass('mobileNav')
  load_page_mobile(url);
}

function summonFullNav(){
  //getting the grid structure for the fullscreen nav
  grid.map((row)=>{row.map((block)=>{block.animateOut()})})
  titleGrid.map((row)=>{row.map((block)=>{block.animateOut()})})

  $(".navGrid").empty();

  navGrid = [];
  navGrid = initGrid(2,3,navGrid,"nav",'.navGrid',0);
  __desktop_nav_active = false;
  $('body').off('mousewheel');
  if(currentPage > 0){
    // $('.mainGrid').css('z-index','-9999999999');
    window.setTimeout(function(){
      $('.mainGrid').css('transform','translateY(0px)');
      currentPage = 0;
      window.setTimeout(function(){
        __pageAnimating = false;
        // $('.mainGrid').css('display','block');
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

    $(".navGrid #nav_1_0 .inner").text("Members");


    $(".navGrid #nav_1_0 .inner").click(function (e) {
      if (!isFullNavOpen()) {
        return;
      }

      navGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
      $(".navGrid").toggleClass("fullNav");

      window.setTimeout(function(){
        navOut("/members");
      },1000);
    });

    currentPath = window.location.pathname;
    options = {"/about":[0,0], "/lines":[0,1], "/members":[1,0] , "/sponsors":[1,1]}
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
    // $(".navGrid #nav_1_0 .inner").text("Humans");
    $(".navGrid #nav_1_0 .border-top").remove();

    // Sponsors & Tickets link
    $(".navGrid #nav_1_1 .inner")[0].innerHTML = "<a href=\"https://www.eventbrite.com/e/lunar-gala-2018-ferox-tickets-39842752746?aff=efbeventtix\" target=\"_blank\">Tickets</a>"
    $(".navGrid #nav_1_1 .border-top").remove();
    $(".navGrid #nav_1_1 .border-left").remove();

    // History link
    $(".navGrid #nav_1_2 .inner")[0].innerHTML = "<a href=\"http://www.lunargala.org\" target=\"_blank\">History</a>"
    $(".navGrid #nav_1_2 .border-left").remove();
    $(".navGrid #nav_1_2 .border-top").remove();
    window.setTimeout(function(){
      navGrid.map((row)=>{row.map((block)=>{block.animateIn()})})
      $(".navGrid").toggleClass("fullNav");
    },100);
  },1000);
}

function summonMiniNav(){
  animateBlock("#title_1_6",1,1);
  //creating the nav box
  currentPath = window.location.pathname;
  options = {"/about":[0,0], "/lines":[0,1], "/members":[1,0] , "/sponsors":[1,1]}
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
  $("#title_1_6 .inner").html(navBox).addClass('nav-box-container');;
  $("#navInner_"+currentIndices.join("")).toggleClass("active");
  $("#title_1_6 .inner").off('click').click(function(){
    summonFullNav();
  });
}

function summonMiniNavMobile(){
  //creating the nav box
  currentPath = window.location.pathname;
  options = {"/about":[0,0], "/lines":[1,1], "/members":[1,0]}
  currentIndices = options[currentPath];
  navBox = `<div class="navBox mobileBox">`;
  for(var i = 0;  i < 3; i++){
    navBox += `<div class ="mobileRow">`
    for(var j = 0; j < 2; j ++){
      navBox += `<div class="" id="navInner_`+parseInt(i)+parseInt(j)+`"></div>`
    }
    navBox += `</div>`
  }
  navBox  += `</div>`
  $("#title_0_2 .inner").html(navBox).addClass('nav-box-container');
  $("#navInner_"+currentIndices.join("")).toggleClass("active");
  $("#title_0_2").off('tap').on('tap',function(e){
    removeDisplayPerson();
    summonFullNavMobile();
  });
}

function summonFullNavMobile(){
  //getting the grid structure for the fullscreen nav
  grid.map((row)=>{row.map((block)=>{block.animateOut()})})
  titleGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
  $(".navGrid").empty().addClass('mobileNav');
  $("body").off('mousewheel');
  navGrid = [];
  navGrid = initGrid(3,2,navGrid,"nav",'.navGrid',0);

  if(currentPage > 0){
    // $('.mainGrid').css('z-index','-9999999999');
    window.setTimeout(function(){
      $('.mainGrid').css('transform','translateY(0px)');
      currentPage = 0;
      window.setTimeout(function(){
        __pageAnimating = false;
        __mobile_nav_active = true;
        // $('.mainGrid').css('display','block');
      },700)
    },900)
  }

  //hide the main grid for the time being
  $(".mainGrid").toggleClass("fullNav");
  $(".titleGrid").toggleClass("fullNav");
  window.setTimeout(function(){
    $(".mainGrid").css("height","0");
    $(window).scrollTop(0);
    navGrid.map(function(inner){
      inner.map(function(cur){
        cur.create(".navGrid");
        cur.update(cur.width, cur.height);
        cur.animateOut();
      });
    });
    //Manually insert the data into the grid
    $(".navGrid #nav_0_0 .inner").append("<div>About</div>");

    $(".navGrid #nav_0_0 .inner").on('tap',function (e) {
      if (!isFullNavOpen()) {
        return;
      }

    navGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
      $(".navGrid").toggleClass("fullNav");
      window.setTimeout(function(){
        navOutMobile("/about");
      },1000);
    });

    $(".navGrid #nav_1_0 .inner").append("<div>Members</div>");

    $(".navGrid #nav_1_0 .inner").on('tap',function (e) {
      if (!isFullNavOpen()) {
        return;
      }

      navGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
      $(".navGrid").toggleClass("fullNav");

      window.setTimeout(function(){
        navOutMobile("/members");
      },1000);
    });

    currentPath = window.location.pathname;
    options = {"/about":[0,0], "/lines":[1,1], "/members":[1,0]}
    currentIndices = options[currentPath];

    $(".navGrid #nav_"+currentIndices.join("_")+" .inner").addClass("active");

    $(".navGrid #nav_1_1 .inner").append("<div>Lines</div>");

    $(".navGrid #nav_1_1 .inner").on('tap',function (e) {
      if (!isFullNavOpen()) {
        return;
      }

      navGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
      $(".navGrid").toggleClass("fullNav");

      window.setTimeout(function(){
        navOutMobile("/lines");
      },1000);
    });

    // Close nav
    $(".navGrid #nav_0_1 .inner").append("<div>X</div>");
    $(".navGrid #nav_0_1 .inner").on('tap',function(){
      if (!isFullNavOpen()) {
        return;
      }
      navGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
      $(".navGrid").toggleClass("fullNav");
      window.setTimeout(function(){
        navOutMobile(window.location.pathname);
      },1000);
    });

    // Sponsors & Tickets link
    $(".navGrid #nav_2_0 .inner").append("<div><a href=\"https://www.eventbrite.com/e/lunar-gala-2018-ferox-tickets-39842752746?aff=efbeventtix\" target=\"_blank\">Tickets</a></div>");

    // History link
    $(".navGrid #nav_2_1 .inner").append("<div><a href=\"http://www.lunargala.org\" target=\"_blank\">History</a></div>");

    window.setTimeout(function(){
      navGrid.map((row)=>{row.map((block)=>{block.animateIn()})})
      $(".navGrid").toggleClass("fullNav");
    },100);
  },1000);
}

function deleteMiniNavMobile(){
  resetBlock($("#title_0_2")[0]);
  $("#title_0_02 .inner").html("");
}

function deleteMiniNav(){
  resetBlock($("#title_1_6")[0]);
  $("#title_1_6 .inner").html("");
}

function isFullNavOpen() {
  return $(".mainGrid").hasClass("fullNav")
}
