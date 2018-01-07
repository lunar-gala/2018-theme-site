var TOPBLOCK = ".mainGrid #3_2 .inner"
var BOTTOMBLOCK = ".mainGrid #7_0 .inner"
var LEFTBLOCK = ".mainGrid #3_0 .inner"
var RIGHTBLOCK = ".mainGrid #3_6 .inner"
var MIDDLEBLOCK = ".mainGrid #5_3 .inner"

var leftBlockTitle = "2268"
var leftBlockDesc = "Welcome to the year 2268. After centuries of disastrous climate change, where rapid urbanization and pollution have distorted the way we approach growth in an urban landscape, where do we stand? 2268 explores this inquisition from two perspectives. The first perspective captures extreme pollution and the second perspective captures sustainability to the extreme where urbanization has gotten out of control and the soil has become rotten, forcing us to carry the food we need to eat"
var leftBlockDesigners = "Hamza Quereshi, Susie Lee, Anny Fan"

$(window).ready(function () {
    // TODO: make call this on every page, instead of hardcoding it for each endpoint
    animateBlock("#1_6",1,1);
    $("#1_6 .inner").text("NAV").addClass("navBlock");


    // $(window).scroll(function () {

    //     var blocksToChange = {}
    //     blocksToChange[TOPSELECTOR] = "top"
    //     blocksToChange[BOTTOMSELECTOR] = "bottom"
    //     blocksToChange[LEFTSELECTOR] = "left"
    //     blocksToChange[RIGHTSELECTOR] = "right"
    //     blocksToChange[MIDDLESELECTOR] = "middle"

    //     changeContent(blocksToChange)
    //     console.log("scrolled")
    // })

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
        .addClass("topLink")
        .click(function () {
            // go to about page
        });

    // Lines title
    animateBlock("#1_1",0,1);
    $(".mainGrid #1_1 .inner").text("Lines").addClass("title");

    // TOP BLOCK
    animateBlock("#3_2", 0, 3, true)
    $(TOPBLOCK)
        .addClass("linesBlock aboutImg1 top")
        .click(function () {
            $(".block").toggleClass('muted')
            $("#3_2.block").toggleClass('highlighted')
        })
        .html("<div class='content'><h1 class='title'></h1></div>")

    // LEFT BLOCK
    animateBlock("#3_0", 2,0, true);
    $(LEFTBLOCK)
        .html("<div class='content'><h1 class='title'></h1><p style='display: none;' class='designers'></p><p style='display: none;' class='description'></p></div>")
        .addClass("linesBlock aboutImg1 left")
        .click(function () {
            $(".block").toggleClass('muted')
            $("#3_0.block").toggleClass('highlighted')

            $(LEFTBLOCK).toggleClass('clicked')
            $(LEFTBLOCK + " .description").toggle();
            $(LEFTBLOCK + " .designers").toggle();

            $(MIDDLEBLOCK + " .content").toggle();
            $(MIDDLEBLOCK).toggleClass("aboutImg1");
        });

    // MIDDLE BLOCK
    animateBlock("#5_3", 0,2, true);
    $(MIDDLEBLOCK)
        .html("<div class='content'><h1 class='title'></h1></div>")
        .addClass("linesBlock aboutImg1 middle")
        .click(function () {
            $(".block").toggleClass('muted')
            $("#5_3.block").toggleClass('highlighted')
        });

    // RIGHT BLOCK
    animateBlock("#3_6", 2,0, true);
    $(RIGHTBLOCK)
        .html("<div class='content'><h1 class='title'></h1></div>")
        .addClass("linesBlock aboutImg1 right")
        .click(function () {
            $(".block").toggleClass('muted')
            $("#3_6.block").toggleClass('highlighted')
        });

    // BOTTOM BLOCK
    animateBlock("#7_0", 0,2, true);
    $(BOTTOMBLOCK)
        .html("<div class='content'><h1 class='title'></h1></div>")
        .addClass("linesBlock aboutImg1 bottom")
        .click(function () {
            $(".block").toggleClass('muted')
            $("#7_0.block").toggleClass('highlighted')
        });

    setLeftLinesBlock(leftBlockTitle, leftBlockDesigners, leftBlockDesc);
    setTopLinesBlock("amzu-amzu");
    setRightLinesBlock("chroma");
    setBottomLinesBlock("descent");
    setMiddleLinesBlock("chinoiseries")

    $(document).keydown(function (e) { if (e.key == "c") { changeContent({}); } });
});

function setLeftLinesBlock(title, designers, description) {
    $(LEFTBLOCK + " .title").text(title);
    $(LEFTBLOCK + " .designers").text(designers);
    $(LEFTBLOCK + " .description").text(description);
}

function setTopLinesBlock(title) {
    $(TOPBLOCK + " .title").text(title);
}

function setMiddleLinesBlock(title) {
    $(MIDDLEBLOCK + " .title").text(title);
}

function setRightLinesBlock(title) {
    $(RIGHTBLOCK + " .title").text(title);
}

function setBottomLinesBlock(title) {
    $(BOTTOMBLOCK + " .title").text(title);
}


function changeContent(blockSizings) {
    $.each(blockSizings, function (blockSelector, val) {
        console.log(blockSelector)
        $(blockSelector + " .inner").text(val)
    })

    // // amzu-amzu
    // $(".mainGrid #3_2 .inner")
    //     .text("amzu-amzu")
    //     .removeClass("aboutImg1")

    // // 2228
    // $(".mainGrid #3_0 .inner")
    //     .text("2288")
    //     .removeClass("aboutImg1")
    //     .click(function () {
    //         $(".block").toggleClass('clicked')
    //     });

    // // chinoiseries
    // $(".mainGrid #5_3 .inner")
    //     .text("chinoiseries")
    //     .removeClass("aboutImg1")

    // // chroma
    // $(".mainGrid #3_6 .inner")
    //     .text("chroma")
    //     .removeClass("aboutImg1")

    // // descent
    // $(".mainGrid #7_0 .inner")
    //     .text("descent")
    //     .removeClass("aboutImg1")
}

