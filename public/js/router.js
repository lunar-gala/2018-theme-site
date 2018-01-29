//making sure .includes is a function
if (!String.prototype.includes) {
  String.prototype.includes = function() {
    'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

// TODO: every launch should be handled by the resizing functions
// The code here should be called by __load_desktop() and __load_mobile()

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
  //Creating the .mainGrid from scratch each time
  grid = [];
  grid = initGrid(grid_rows, grid_cols,grid,"");
  grid.map(function(inner){
    inner.map(function(cur){
      cur.create(".mainGrid");
      cur.update(cur.width, cur.height);
      cur.animateOut();
      $('.mainGrid').css("display","none");
    })
  })
  window.setTimeout(function(){
    call_function(url);
    if(!document.URL.includes(url))
    {
      history.pushState(null, null, url);
    }
    deleteMiniNav();
    summonMiniNav();
    $('.mainGrid').css("display","block");
    $('.mainGrid').css('opacity','0');
    // $(".mainGrid").toggleClass("fullNav");
    window.setTimeout(function(){
      $('.mainGrid').css("opacity","1");
      grid.map((row)=>{row.map((block)=>{
        block.animateIn()})})
    },200);
  },500);
}

function load_page_mobile(url){
  destroyAllBlocks(grid);
  //Creating the .mainGrid from scratch each time
  grid = [];
  grid = initGrid(grid_rows, grid_cols,grid,"");
  grid.map(function(inner){
    inner.map(function(cur){
      cur.create(".mainGrid");
      cur.update(cur.width, cur.height);
      cur.animateOut();
      $('.mainGrid').css("display","none");
    })
  })
  window.setTimeout(function(){
    call_function(url);
    if(!document.URL.includes(url))
    {
      history.pushState(null, null, url);
    }
    deleteMiniNav();
    summonMiniNav();
    $('.mainGrid').css("display","block");
    $('.mainGrid').css('opacity','0');
    // $(".mainGrid").toggleClass("fullNav");
    window.setTimeout(function(){
      $('.mainGrid').css("opacity","1");
      grid.map((row)=>{row.map((block)=>{
        block.animateIn()})})
    },200);
  },500);
}

function call_function(url,isMobile = false){
  if(url == "/about" && !isMobile){
    init_about();
  }
  else if(url == "/about" && isMobile){
    init_about_mobile();
  }
  if(url == "/lines" && !isMobile){
    init_lines();
  }
  else if(url == "/lines" && isMobile){
    init_about_mobile();
  }
  if(url == "/humans" && !isMobile){
    init_about();
  }
  else if(url == "/humans" && isMobile){
    init_about_mobile();
  }
}
