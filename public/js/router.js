//making sure .includes is a function
if (!String.prototype.includes) {
  String.prototype.includes = function() {
    'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

function createMobileRouting(){
  $(window).unbind('popstate');
  $('.router-link').off('click');
  currentPath = window.location.pathname;
  load_page_mobile(currentPath);
  $(".router-link").click(function(){
    url = $(this).attr("url");
    load_page_mobile(url);
  })
  $(window).bind("popstate", function() {
    currentPath = window.location.pathname;
    load_page_mobile(currentPath);
  });
}

function createRouting(){
  $(window).unbind('popstate');
  $('.router-link').off('click');

  currentPath = window.location.pathname;
  load_page(currentPath);

  $(".router-link").click(function(){
    url = $(this).attr("url");
    load_page(url);
  })
  $(window).bind("popstate", function() {
    currentPath = window.location.pathname;
    load_page(currentPath);
  });
}

function load_page(url){

  destroyAllBlocks(grid);

  titleGrid = [];
  grid = [];

  $('.mainGrid *').remove();
  $('.titleGrid *').remove();

  //Creating the .mainGrid from scratch each time

  $(".mainGrid").height(($(window).innerHeight() / 8) * grid_rows + 'px');
  $(".titleGrid").height(($(window).innerHeight() / 8) * title_grid_rows + 'px');

  titleGrid = initGrid(title_grid_rows, title_grid_cols, titleGrid, "title", ".titleGrid", 0);
  grid = initGrid(grid_rows, grid_cols, grid, "", ".mainGrid", $(".titleGrid").height());

  titleGrid.map(function(inner){
    inner.map(function(cur){
      cur.create(".titleGrid");
      cur.update(cur.width, cur.height, cur.offset);
      cur.animateOut();
      window.setTimeout(function(){
        cur.animateIn();
        $('#'+cur.id+' > .inner').css('opacity','1');
      },1000);
    });
  });

  //initiating the grid
  grid.map(function(inner){
    inner.map(function(cur){
      cur.create(".mainGrid");
      cur.update(cur.width, cur.height, cur.offset);
      cur.animateOut();
      window.setTimeout(function(){
        cur.animateIn();
        $('#'+cur.id+" > .inner").css('opacity','1')
      },1000);
    });
  });
  $('.mainGrid').css("display","block");
  $('.mainGrid .inner').css('opacity','0');
  $('.titleGrid').css("display","block");
  $('.titleGrid .inner').css('opacity','0');

  $('.titleGrid').removeClass('fullNav');
  $('.mainGrid').removeClass('fullNav');

    window.setTimeout(function(){

      if(!document.URL.includes(url))
      {
        history.pushState(null, null, url);
      }

      call_function(url);

      deleteMiniNav();
      summonMiniNav();

      // $(".mainGrid").toggleClass("fullNav");
      window.setTimeout(function(){
        $('.mainGrid').css("opacity","1");
        $('.titleGrid').css("opacity","1");
        $('.mainGrid .animated-filler-block').removeClass('hidden');
      },700);
    },500);
}

function call_function(url){

  console.log("calling "+url)

  if(url == "/about"){
    init_about();
  }
  else if(url == "/lines"){
      init_lines();
  }
  else if(url == "/humans"){
    init_humans();
  }
  // else if(url == "/"){
  //   init_homepage();
  // }
}
