$(window).ready(function () {
    $(window).scroll(function () {
        alert("scrolling")
    })

    animateBlock("#0_0", 0,1);
    $(".mainGrid #0_0 .inner")
        .text("⟵ Humans")
        .addClass("topLink")
        .click(function () {
            // go to humans page
        });

    animateBlock("#0_6", 0,1);
    $(".mainGrid #0_6 .inner")
        .text("About ⟶")
        .addClass("contentLink")
        .click(function () {
            // go to about page
        });

    animateBlock("#1_1",0,1);
    $(".mainGrid #1_1 .inner").text("Lines").addClass("title");

    // amzu-amzu
    animateBlock("#3_2", 0, 3, true)
    $(".mainGrid #3_2 .inner")
        .addClass("contentLink aboutImg1")
        .click(function () {
            $(".block").toggleClass('clicked')
        })
        .html("<div style='margin-left: 50%'>amzu-amzu</div>")

    // 2228
    animateBlock("#3_0", 2,0, true);
    $(".mainGrid #3_0 .inner")
        .html("<div style='margin-top: 65%; margin-left: 66%'>2288</div>")
        .addClass("contentLink aboutImg1")
        .click(function () {
            $(".block").toggleClass('clicked')
        });

    // chinoiseries
    animateBlock("#5_3", 0,2, true);
    $(".mainGrid #5_3 .inner")
        .html("<div style='margin-left: -100%'>chinoiseries</div>")
        .addClass("contentLink aboutImg1")
        .click(function () {
            $(".block").toggleClass('clicked')
        });

    // chroma
    animateBlock("#3_6", 2,0, true);
    $(".mainGrid #3_6 .inner")
        .html("<div style='margin-top: 65%; margin-left: 60%'>chroma</div>")
        .addClass("contentLink aboutImg1")
        .click(function () {
            $(".block").toggleClass('clicked')
        });

    // descent
    animateBlock("#7_0", 0,2, true);
    $(".mainGrid #7_0 .inner")
        .html("<div style='margin-left: 85%'>descent</div>")
        .addClass("contentLink aboutImg1")
        .click(function () {
            $(".block").toggleClass('clicked')
        });

    $(document).keydown(function (e) { if (e.key == "c") { changeContent({}); } });
});

function changeLeftBlock(text, imgClass) {

}

function changeContent(blockSizings) {
    // amzu-amzu
    $(".mainGrid #3_2 .inner")
        .text("amzu-amzu")
        .removeClass("aboutImg1")

    // 2228
    $(".mainGrid #3_0 .inner")
        .text("2288")
        .removeClass("aboutImg1")
        .click(function () {
            $(".block").toggleClass('clicked')
        });

    // chinoiseries
    $(".mainGrid #5_3 .inner")
        .text("chinoiseries")
        .removeClass("aboutImg1")

    // chroma
    $(".mainGrid #3_6 .inner")
        .text("chroma")
        .removeClass("aboutImg1")

    // descent
    $(".mainGrid #7_0 .inner")
        .text("descent")
        .removeClass("aboutImg1")
}

