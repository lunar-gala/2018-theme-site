var TOPBLOCK;
var BOTTOMBLOCK;
var LEFTBLOCK;
var RIGHTBLOCK;
var MIDDLEBLOCK;
var selectorblocks;
var selectornames;
var LINESETSIZE;

var HIGHLIGHTEDBLOCK = null;
var currentLineSet = 0;
var HIGHLIGHTEDBLOCK = null;

var LINES = []

function Line(title, designers, description) {
    this.title = title;
    this.designers = designers; 
    this.description = description;
}

for (var i = 0; i < linedata.length; i++) {
    var line = linedata[i];
    LINES.push(new Line(line.title, line.designers, line.description));
}

function init_lines_mobile() {
    LEFTBLOCK = ".mainGrid #3_0 .inner"
    TOPBLOCK = ".mainGrid #3_1 .inner" 
    BOTTOMBLOCK = ".mainGrid #5_1 .inner"

    selectorblocks = [LEFTBLOCK, TOPBLOCK, BOTTOMBLOCK]; // THIS IS CORRECT ORDER
    selectornames = ['left', 'top', 'bottom']
    LINESETSIZE = 3;

    animateBlock("#3_0", 0,1, true); // LEFT BLOCK
    animateBlock("#3_1", 0,2, true); // TOP BLOCK
    animateBlock("#5_1", 0,1, true); // MIDDLE BLOCK

    populateLinesBlocks();
    setLines(0)
    $("body").off("click").click(clickLinesPicture);
}

function init_lines() {
    TOPBLOCK = ".mainGrid #3_2 .inner"
    BOTTOMBLOCK = ".mainGrid #7_0 .inner"
    LEFTBLOCK = ".mainGrid #3_0 .inner" // SAME AS MOBILE
    RIGHTBLOCK = ".mainGrid #3_6 .inner"
    MIDDLEBLOCK = ".mainGrid #5_3 .inner"

    selectorblocks = [TOPBLOCK, LEFTBLOCK, MIDDLEBLOCK, RIGHTBLOCK, BOTTOMBLOCK]; // THIS IS CORRECT ORDER
    selectornames = ['top', 'left', 'middle', 'right', 'bottom']
    LINESETSIZE = 5;

    
    animateBlock("#1_6",1,1);
    $("#1_6 .inner").text("NAV").addClass("navBlock");

    $(document).keydown(changeLineSet);

    animateBlock("#0_0", 0,1);
    $(".mainGrid #0_0 .inner")
        .text("Humans")
        .addClass("topLink")
        .click(function () {
            // go to humans page
        });

    animateBlock("#0_6", 0,1);
    $(".mainGrid #0_6 .inner")
        .text("About")
        .addClass("topLink")
        .click(function () {
            // go to about page
        });

    // Lines title
    animateBlock("#1_1",0,1);
    $(".mainGrid #1_1 .inner").text("Lines").addClass("title");

    // initial animates
    animateBlock("#3_2", 0, 2, true) // top
    animateBlock("#3_0", 2,0, true); // left
    animateBlock("#5_3", 0,2, true); // middle
    animateBlock("#3_6", 2,0, true); // right
    animateBlock("#7_0", 0,2, true); // bottom

    populateLinesBlocks()
    setLines(0)
    $("body").off("click").click(clickLinesPicture);
}

function setLines(lineSet) {
    var lowerBound = lineSet * LINESETSIZE;
    var upperBound = (lineSet + 1) * LINESETSIZE;

    for (var i=lowerBound; i<upperBound; i++) {
        var line = LINES[i];
        var selector = selectorblocks[i%LINESETSIZE];
        setLineBlock(selector, line);
    }

    setTimeout(function(){
        selectornames.forEach(function(position) {
            var elemwidth = document.getElementById(position + "-title").getBoundingClientRect().width/2;
            var translatestring = "translateX(-"+elemwidth+"px)"
            $("."+position + " .content").css({
                transform: translatestring
            })
        })
    },330);
    
}

// TODO: play around with these numbers
var FADEIN_DURATION = 300;
var FADEOUT_DURATION = 300;

function setLineBlock(selector, line) {
    var titleSelector = selector + " .title"
    var designerSelector = selector + " .designers"
    var descriptionSelector = selector + " .description"

    if (!line) {
        $(titleSelector).text("");
        $(designerSelector).text("");
        $(descriptionSelector).text("");
        return;
    }
    console.log($(selector).hasClass("amzu-img"))
    $(titleSelector).fadeOut(FADEOUT_DURATION,function() { $(this).text(line.title).fadeIn(FADEIN_DURATION)});
    $(designerSelector).text(line.designers);
    $(descriptionSelector).text(line.description);
}

function clickLinesPicture(e) {
    var elem = e.target;

    var blockid = ($(elem).hasClass("linesBlock") && $(elem).parent().attr("id")) || 
                    ($(elem).attr("belongs-to")) ||
                    ($(elem).parent().hasClass("filler-block") && $(elem).parent().attr("belongs-to")) ||
                    ($(elem).parent().hasClass('linesBlock') && $(elem).parent().parent().attr("id")) || // content 
                    ($(elem).parent().parent().hasClass('linesBlock') && $(elem).parent().parent().parent().attr("id"))

    
    if (blockid && !HIGHLIGHTEDBLOCK) {
        $(".block").toggleClass('muted')
        $("#" + blockid + ".block").toggleClass('highlighted');
        HIGHLIGHTEDBLOCK = $("#" + blockid + ".block");

        $(HIGHLIGHTEDBLOCK).find(".lineImg-amzu").toggleClass("lineBlockPicMuted lineBlockPic");

        return;
    }

    $(".block").removeClass("muted")
    $(".highlighted").removeClass("highlighted");

    // go back to dim background
    $(HIGHLIGHTEDBLOCK).find(".lineBlockPic").toggleClass("lineBlockPicMuted lineBlockPic");
    HIGHLIGHTEDBLOCK = null;
}

function populateLinesBlocks() {
    selectorblocks.forEach(function(selector,i) {
        $(selector)
            .html("<div class='content'><span id='" + selectornames[i] + "-title' " + "class='title'></span><p class='designers'></p><p class='description'></p></div>")
            .addClass("linesBlock lineBlockPicMuted lineImg-amzu " + selectornames[i])
    })
}

function changeLineSet(e) {
    var LEFT = 37;
    var RIGHT = 39;
    // TODO: left/right analagous to scrolling
    // should not be able to change lines when a block is highlighted
    if (HIGHLIGHTEDBLOCK) {
        return;
    }

    if (e.which === LEFT) {
        if (currentLineSet > 0) {
            currentLineSet--;
        } else {
            return
        }
        // previous line
    } else if (e.which === RIGHT) {
        // next line
        if (currentLineSet < 3) {
            currentLineSet++;
        } else {
            return
        }
    } else {
        return;
    }
    setLines(currentLineSet)
}