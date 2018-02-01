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

  $(window).bind("popstate", function() {
    currentPath = window.location.pathname;
    load_page_mobile(currentPath);
  });
}

function createRouting(){
  $(window).unbind('popstate');
  $('.router-link').off('click');

  currentPath = window.location.pathname;
  if(currentPath == "/"){
      load_intro_page();
  }
  else{
    load_page(currentPath);
  }
  $(".router-link").click(function(){
    url = $(this).attr("url");
    load_page(currentPath);
  })
  $(window).bind("popstate", function() {
    currentPath = window.location.pathname;
    if(currentPath == "/"){
      if(grid && titleGrid){
        grid.map((row)=>{row.map((block)=>{block.animateOut()})})
        titleGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
        window.setTimeout(function(){
          $('.mainGrid').addClass('fullNav');
          $('.titleGrid').addClass('fullNav');
        },200);
        window.setTimeout(function(){
          $('.mainGrid').removeClass('fullNav');
          $('.titleGrid').removeClass('fullNav');
          titleGrid = [];
          grid = [];
          $('.mainGrid *').remove();
          $('.titleGrid *').remove();
          load_intro_page();
        },1000)
      }
      else{
        load_intro_page();
      }
    }
    else{
      $('.video-container').remove();
      load_page(currentPath);
    }
  });
}

function attach_router_link(){
  $(".router-link").click(function(){
    grid.map((row)=>{row.map((block)=>{block.animateOut()})})
    titleGrid.map((row)=>{row.map((block)=>{block.animateOut()})})
    window.setTimeout(function(){
      $('.mainGrid').addClass('fullNav');
      $('.titleGrid').addClass('fullNav');
    },200);
    url = $(this).attr("url");
    window.setTimeout(function(){
      $('.mainGrid').removeClass('fullNav');
      $('.titleGrid').removeClass('fullNav');
      load_page(url);
    },1000)

  })
}

function load_intro_page(){
  if(__MOBILE_BOOL){
    load_page_mobile('/about');
    return;
  }
  videoToLoad = "<div class='video-container'><div class='xButton'>X</div><video id='video' width=\"320\" height=\"240\" autoplay=\"autoplay\"><source src=\"video/introVideo.mp4\" type=\"video/mp4\"></video></div>";
  $('body').append(videoToLoad);
  clicked = false;
  $('.xButton').click(function(){
    clicked = true;
    $('.video-container').remove();
    load_page("/about");
  })
  video = document.getElementById("video")
  video.addEventListener('loadeddata', function() {
   videoLength = 8290;
   window.setTimeout(function(){
     if(!clicked){
       $('.video-container').remove();
       load_page("/about");
     }
   },videoLength)
  }, false);
}

function load_page(url){

  destroyAllBlocks(grid);

  title_grid_cols = __title_grid_cols;
  title_grid_rows = __title_grid_rows;
  grid_cols = __grid_cols;

  grid_rows = __pageCounts[url][0];

  blockHeight = $(window).innerHeight() / 8;

  titleGrid = [];
  grid = [];

  $(".mainGrid").height(blockHeight * grid_rows + 'px');
  $(".titleGrid").height(blockHeight * title_grid_rows + 'px');

  $('.mainGrid *').remove();
  $('.titleGrid *').remove();

  //Creating the .mainGrid from scratch each time

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

  grid.map(function(inner){
    inner.map(function(cur){
        cur.update(($(cur.containerName).width()/grid[0].length),($(cur.containerName).height()/grid.length), $(".titleGrid").height());
    })
  })

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
      attach_router_link();
    },700);
  },500);
}

function load_page_mobile(url){

  destroyAllBlocks(grid);

  title_grid_cols = __mobile_title_grid_cols;
  title_grid_rows = __mobile_title_grid_rows;
  grid_cols = __mobile_grid_cols;

  grid_rows = __pageCounts[url][1];
  //grid_rows = 20;

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

  grid.map(function(inner){
    inner.map(function(cur){
        cur.update(($(cur.containerName).width()/grid[0].length),($(cur.containerName).height()/grid.length), $(".titleGrid").height());
    })
  })

    window.setTimeout(function(){

      if(!document.URL.includes(url))
      {
        history.pushState(null, null, url);
      }

      call_function(url,true);

      deleteMiniNavMobile();
      summonMiniNavMobile();

      // $(".mainGrid").toggleClass("fullNav");
      window.setTimeout(function(){
        $('.mainGrid').css("opacity","1");
        $('.titleGrid').css("opacity","1");
        $('.mainGrid .animated-filler-block').removeClass('hidden');
        attach_router_link();
      },700);
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
    init_lines_mobile();
  }

  if(url == "/members" && !isMobile){
    init_people();
  }
  else if(url == "/members" && isMobile){
    init_people_mobile();
  }

}
