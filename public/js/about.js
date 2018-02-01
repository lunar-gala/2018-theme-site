function init_about(){
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

  animateBlock("#5_0",4,4);
  $("#5_0 .inner")[0].innerHTML = "<div style='height:100%'><iframe width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/qmjOd9Dlr34\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe></div>"
}

function init_about_mobile(){

}
