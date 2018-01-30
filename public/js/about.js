function init_about(){

  // animateBlock("#4_5",1,2);
  // animateBlock("#6_3",1,1);

	animateBlock("#title_0_0",0,1);
	animateBlock("#title_1_6",1,1);
  animateBlock("#title_1_1",0,1);
  animateBlock("#title_0_6",0,1);

  $("#title_0_6 .inner").text("Humans").addClass("topLink");
  $("#title_1_1 .inner").text("About").addClass("title");

  text = "As Lunar Gala celebrates its 20th anniversary, we reflect back on the organization's continuous evolution since its conception, the humble beginnings from which it has grown into the fully immersive experience it is today. In a thematic embodiment of our adaptive growth, we present Lunar Gala 2020: Kanye West."

  animateBlock("#1_5",1,2);
  $(".mainGrid #1_5 .inner").text(text).addClass("text");

  animateBlock("#0_1",2,1);
  $(".mainGrid #0_1 .inner").addClass("aboutImg1");
}
