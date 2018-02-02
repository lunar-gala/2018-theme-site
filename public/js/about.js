function init_about(){
	animateBlock("#title_0_0",0,1);
	animateBlock("#title_1_6",1,1);
  animateBlock("#title_1_1",0,1);
  animateBlock("#title_0_6",0,1);

  $("#title_0_6 .inner").addClass("topLink router-link").attr('url','/members');
  $("#title_0_6 .inner")[0].innerHTML = "<div class='center-text-container'><div class='center-text'>Members<img style='right:1vw' class=\"arrow-right\" src=\"./../images/Arrows/pointingright.png\"></div></div>"
  $("#title_1_1 .inner")[0].innerHTML = "<div class='center-text-container'><div class='center-text title'>About</div></div>"

  text1 = "<div>The Lunar Gala: an intergalactic celebration of the yearly contributions of the Interplanetary Federation for Peace and Protection. The year is 2268, and, on this 250th anniversary of the planet Earth’s quarantine, we present <span class='italic'>Ferox</span>, a public demonstration of the hostility of the Earth’s previously dominant species, the homosapien. We invite Federation sponsors and visitors to observe, for the first time, the savagery we have successfully contained. Infused with Federation principles, the previously dangerous human race is now docile - an allegory for the potential of the IFPP to mollify threatening agents intergalactically. Come celebrate with us! And, in the process, bear witness to a species, that, prior to this event, has been contained for centuries.</div>"

  text2 = "<div><span class='italic'>Ferox</span> is primal. <span class='italic'>Ferox</span> is chaotic. <span class='italic'>Ferox</span> is a return to instinct. <span class='italic'>Ferox</span> is everything that we, as Federation members, are not. Embodied by the human species, <span class='italic'>Ferox</span> represents a blind and reckless freedom that must be contained for the sake of maintaining the civility we all value and from which we all benefit. Ultimately… <span class='italic'>Ferox</span> must be quelled.<br><span class='aboutLine'></span>Lunar Gala is curated by Federation members at Carnegie Mellon University. A student-run organization with an interdisciplinary approach, the Lunar Gala team - comprised of student designers, models, dancers, videographers, motion designers, and technicians - strives to showcase the creative visions of our community members. Together, we present an IFPP-endorsed evening of imagination, innovation, and fashion.</div>"
  if((window.innerHeight > 630 && window.innerWidth > 1100 ) && __DESKTOP_BOOL){
    animateBlock("#0_5",3,2);
  }
  else{
    animateBlock("#0_5",4,2);
    $("#0_5 .inner").css('font-size','9pt');
  }

  $(".mainGrid #0_5 .inner")[0].innerHTML = text1;
  $(".mainGrid #0_5 .inner").addClass("text");

  if(window.innerHeight > 600 && __DESKTOP_BOOL){
    animateBlock("#5_5",3,2);
  }
  else{
    $("#5_5 .inner").css('font-size','9pt');
    animateBlock("#5_5",4,2);
  }
  $(".mainGrid #5_5 .inner").addClass("text");
  $(".mainGrid #5_5 .inner")[0].innerHTML = text2;

  animateBlock('#8_1',1,2);


  content = "<div class='logoContainer'><div id='col1'><img id='img1' src='images/ai.png'><img id='img2' src='images/alexs_eastend.png'></div><div id='col2'><img id='img3' src='images/Style412.png'><img id='img4' src='images/wvu.png'></div><div id='col3'><img src='images/cmoa.png'></div><div class='.clear'></div></div>"
  $(".mainGrid #8_1 .inner")[0].innerHTML = content;
  $(".mainGrid #8_1 .inner").addClass('logoInner');

  animateBlock("#0_1",2,1);
  $(".mainGrid #0_1 .inner")[0].innerHTML = "<div id='videoAboutContainer'><video id='videoAbout' width=\"320\" height=\"240\" autoplay=\"autoplay\" loop><source src=\"video/blue_heart.mp4\" type=\"video/mp4\" ></video></div><script>$(window).ready(function(){document.getElementById('videoAboutContainer').play()});</script>";



  animateBlock("#5_1",2,2);
  $("#5_1 .inner")[0].innerHTML = "";


  $("#title_0_0 .inner").addClass("topLink router-link").attr('url','/lines');
  $("#title_0_0 .inner").append("<div class='center-text-container'><div class='center-text'>Lines<img class='arrow-left' src='./../images/Arrows/pointingleft.png'/></div></div>")

  animateBlock("#3_3",1,1);
  $("#3_3 .inner")[0].innerHTML = "<p class=\"designers-link2 aboutLink link-page-1\">Experience Ferox</p><img class=\"arrow arrow-down\" src=\"images/Arrows/pointingdown.png\">"
  $('.link-page-1').off('click');
  $('.link-page-1').bind('click',function(){
    movePage(currentPage,grid_rows/row_per_page,'down',function(newPage){
      currentPage = newPage;
      e.preventDefault();
    });
  })

}

function add_video(){
    $("#5_1 .inner")[0].innerHTML = "<div style='height:100%'><iframe src=\"https://player.vimeo.com/video/252741421?autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>"
}
function add_video_mobile(){
    $("#6_0 .inner")[0].innerHTML = "<div style='height:100%'><iframe src=\"https://player.vimeo.com/video/252741421?autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>"
}

function init_about_mobile(){
    animateBlock('#title_1_0',0,1);
    $("#title_1_0 .inner")[0].innerHTML = "<div class='center-text-container'><div class='center-text title'>About</div></div>"
    animateBlock('#4_1',1,0);
    $("#4_1 .inner")[0].innerHTML = "<div class='center-text-container'><img class=\"arrow arrow-down\" src=\"images/Arrows/pointingdown.png\"><div class='center-text title' style='font-size:9pt;position:relative;top:7vh'>Experience<br><br>Ferox</div></div>"

    // $("#4_1 .inner").off('tap').on('tap',function(){
    //   movePage(currentPage,grid_rows/row_per_page,'down',function(newPage){
    //     currentPage = newPage;
    //     e.preventDefault();
    //   });
    // })
    add_video_mobile();
    animateBlock('#1_0',2,2);
      $(".mainGrid #1_0 .inner")[0].innerHTML = "<div id='videoAboutContainer'><img class='aboutGif' src='video/blue_heart.gif'><div class='mobileText1Parent'><div class='mobileAboutText1'>The Lunar Gala: an intergalactic celebration of the yearly contributions of the Interplanetary Federation for Peace and Protection. The year is 2268, and, on this 250th anniversary of the planet Earth’s quarantine, we present <span class='italic'>Ferox</span>, a public demonstration of the hostility of the Earth’s previously dominant species, the homosapien. We invite Federation sponsors and visitors to observe, for the first time, the savagery we have successfully contained. Infused with Federation principles, the previously dangerous human race is now docile - an allegory for the potential of the IFPP to mollify threatening agents intergalactically. Come celebrate with us! And, in the process, bear witness to a species, that, prior to this event, has been contained for centuries.</div></div></div>";

      $(".mobileAboutText1").css('font-size','8pt');
      if(window.innerWidth < 350){
        $(".mobileAboutText1").css('font-size','7pt');
      }
      if(window.innerWidth < 325){
        $(".mobileAboutText1").css('font-size','6.5pt');
      }
      if(window.innerHeight < 540){
        $(".mobileAboutText1").css('font-size','5.5pt');
      }
    //place the first paragraph here

    //move down botton
    animateBlock("#6_0",2,2);
    // $("#6_0")
    text2 = "<div><span class='italic'>Ferox</span> is primal. <span class='italic'>Ferox</span> is chaotic. <span class='italic'>Ferox</span> is a return to instinct. <span class='italic'>Ferox</span> is everything that we, as Federation members, are not. Embodied by the human species, <span class='italic'>Ferox</span> represents a blind and reckless freedom that must be contained for the sake of maintaining the civility we all value and from which we all benefit. Ultimately… <span class='italic'>Ferox</span> must be quelled.<br><span class='aboutLine'></span>Lunar Gala is curated by Federation members at Carnegie Mellon University. A student-run organization with an interdisciplinary approach, the Lunar Gala team - comprised of student designers, models, dancers, videographers, motion designers, and technicians - strives to showcase the creative visions of our community members. Together, we present an IFPP-endorsed evening of imagination, innovation, and fashion.</div>"
    animateBlock("#9_0",2,2);
    $(".mainGrid #9_0 .inner").css('font-size','8pt');
    if(window.innerWidth < 350){
      $(".mainGrid #9_0 .inner").css('font-size','7pt');
    }
    if(window.innerWidth < 325){
      $(".mainGrid #9_0 .inner").css('font-size','6.5pt');
    }
    if(window.innerHeight < 540){
      $(".mainGrid #9_0 .inner").css('font-size','5.5pt');
    }
    $(".mainGrid #9_0 .inner").addClass("text");
    $(".mainGrid #9_0 .inner")[0].innerHTML = text2;
}
