$(window).ready(function(){
    // MOVE THIS TO ANOTHER JS FILE
    // CONTENT FOR THE ABOUT
    animateBlock("#1_1",0,1);
    animateBlock("#0_6",0,1);
    $(".mainGrid #0_6 .inner").text("Humans").addClass("topLink");
    animateBlock("#4_5",1,2);
    animateBlock("#6_3",1,1);
    text = "As Lunar Gala celebrates its 20th anniversary, we reflect back on the organization's continuous evolution since its conception, the humble beginnings from which it has grown into the fully immersive experience it is today. In a thematic embodiment of our adaptive growth, we present Lunar Gala 2020: Kanye West."
    $(".mainGrid #4_5 .inner").text(text).addClass("text");
    animateBlock("#3_1",2,1);
    $(".mainGrid #1_1 .inner").text("About").addClass("title");
    $(".mainGrid #3_1 .inner").addClass("aboutImg1");
});
