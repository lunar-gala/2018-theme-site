function init_about(){
	animateBlock("#title_0_0",0,1);
	animateBlock("#title_1_6",1,1);
  animateBlock("#title_1_1",0,1);
  animateBlock("#title_0_6",0,1);

  $("#title_0_6 .inner").text("Humans").addClass("topLink");
  $("#title_1_1 .inner").text("About").addClass("title");

  text1 = "The Lunar Gala: an intergalactic celebration of the yearly contributions of the Interplanetary Federation for Peace and Protection. The year is 2268, and, on this 250th anniversary of the planet Earth’s quarantine, we present “Ferox,” a public demonstration of the hostility of the Earth’s previously dominant species, the homosapien. We invite Federation sponsors and visitors to observe, for the first time, the savagery we have successfully contained. Infused with Federation principles, the previously dangerous human race is now docile - an allegory for the potential of the IFPP to mollify threatening agents intergalactically. Come celebrate with us! And, in the process, bear witness to a species, that, prior to this event, has been contained for centuries."

  text2 = "“Ferox” is primal. “Ferox” is chaotic. “Ferox” is a return to instinct. “Ferox” is everything that we, as Federation members, are not. Embodied by the human species, “Ferox” represents a blind and reckless freedom that must be contained for the sake of maintaining the civility we all value and from which we all benefit. Ultimately… “ferox” must be quelled.<br><span class='aboutLine'></span><br>Lunar Gala is curated by Federation members at Carnegie Mellon University. A student-run organization with an interdisciplinary approach, the Lunar Gala team - comprised of student designers, models, dancers, videographers, motion designers, and technicians - strives to showcase the creative visions of our community members. Together, we present an IFPP-endorsed evening of imagination, innovation, and fashion."

  animateBlock("#0_5",4,2);
  $(".mainGrid #0_5 .inner").text(text1).addClass("text");

  animateBlock("#5_5",4,2);
  $(".mainGrid #5_5 .inner").addClass("text");
  $(".mainGrid #5_5 .inner")[0].innerHTML = text2;

  animateBlock('#8_1',1,1);

  animateBlock("#0_1",2,1);
  $(".mainGrid #0_1 .inner")[0].innerHTML = "<div id='videoAboutContainer'><video id='videoAbout' width=\"320\" height=\"240\" autoplay=\"autoplay\" loop><source src=\"video/blue_heart.mp4\" type=\"video/mp4\" ></video></div>";

  animateBlock("#5_1",2,2);
  // animateBlock("#6_5",3,3);
  $("#5_1 .inner")[0].innerHTML = "";
}
function add_video(){
    $("#5_1 .inner")[0].innerHTML = "<div style='height:100%'><iframe src=\"https://player.vimeo.com/video/252741421?autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>"
}

function init_about_mobile(){

}
