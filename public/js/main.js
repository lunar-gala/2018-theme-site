//making sure .includes is a function
if (!String.prototype.includes) {
  String.prototype.includes = function() {
    'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
function load_page(url){
  //additional path to route properly.
  fakePath = "/test";
  ajaxPath = "/data";
  ajaxURL = ajaxPath+url;
  $.ajax({url:ajaxURL,success: function(result){
    //if we aren't on that page, go to that page.
    if(!document.URL.includes(url))
    {
      history.pushState(null, null, fakePath+url);
    }
    //get "about" out of "/about"
    pageName = url.split("/")[1];
    //according to what url we are on,
    //update the content on the page.
    $("div").text("CLICK ME!");
    $("."+pageName).text(result.content);
  }})
}

$(window).ready(function(){
  //updating content according to which url we are on
  url = "/" + window.location.pathname;
  load_page(url);
  //add proper event listeners for the links in here
  $(".about").click(function(){
    load_page("/about");
  });
  $(".people").click(function(){
    load_page("/people");
  });
  $(".lines").click(function(){
    load_page("/lines");
  });
});
