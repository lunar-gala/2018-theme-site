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

  title_grid_cols = __title_grid_cols;
  title_grid_rows = __title_grid_rows;
  grid_cols = __grid_cols;
  grid_rows = __grid_rows;

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
        $('#'+cur.id+" > .inner").css('opacity','1')
        $('.filler-block.collapsed').addClass('pointEight');
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
      console.log("AAAAAAAAAAAAAA");
      summonMiniNav();

      // $(".mainGrid").toggleClass("fullNav");
      window.setTimeout(function(){
        $('.mainGrid').css("opacity","1");
        $('.titleGrid').css("opacity","1");
        $('.mainGrid .animated-filler-block').removeClass('hidden');
      },700);
    },500);
}

function load_page_mobile(url){

  destroyAllBlocks(grid);

  title_grid_cols = __mobile_title_grid_cols;
  title_grid_rows = __mobile_title_grid_rows;
  grid_cols = __mobile_grid_cols;
  grid_rows = __mobile_grid_rows;

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
        $('.filler-block.collapsed > .inner').css('opacity','.8')
      },1000);
    });
  });
  $('.mainGrid .filler-block.collapsed .inner').css('opacity','0');
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

      call_function(url,true);

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

function call_function(url,isMobile = false){
  if(url == "/about" && !isMobile){
    console.log("AAAAAAAA");
    init_about();
  }
  else if(url == "/about" && isMobile){
    init_about_mobile();
  } 

  if(url == "/lines" && !isMobile){
    init_lines();
  }
  else if(url == "/lines" && isMobile){
    init_lines_mobile();
  }

  if(url == "/federation" && !isMobile){
    console.log("AAAAAAAA");
    init_people();
  }
  else if(url == "/federation" && isMobile){
    // init_about_mobile();
  }

}
