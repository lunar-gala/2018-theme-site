//making sure .includes is a function
if (!String.prototype.includes) {
  String.prototype.includes = function() {
    'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
$(window).ready(function(){
  currentPath = window.location.pathname;
  load_page(currentPath);
  $(".router-link").click(function(){
    url = $(this).attr("url");
    load_page(url);
  })
})


function load_page(url){
  resetAllBlocks();
  if(!document.URL.includes(url))
  {
    history.pushState(null, null, url);
  }
  call_function(url);
  deleteMiniNav();
  summonMiniNav();


  //additional path to route properly.

}

function call_function(url){
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
