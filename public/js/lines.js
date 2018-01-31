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
    var self = this;

    this.title = title;
    this.designers = designers; 
    this.description = description;

    this.imageId = function () {
        if (self.title == "2268") {
            return "img-2268";
        }
        return self.title.toLowerCase();
    }
}

for (var i = 0; i < linedata.length; i++) {
    var line = linedata[i];
    LINES.push(new Line(line.title, line.designers, line.description));
}
console.log(LINES.length/5)
function init_lines_mobile() {
    LEFTBLOCK = ".mainGrid #0_0 .inner"
    TOPBLOCK = ".mainGrid #0_1 .inner" 
    BOTTOMBLOCK = ".mainGrid #2_1 .inner"

    selectorblocks = [LEFTBLOCK, TOPBLOCK, BOTTOMBLOCK]; // THIS IS CORRECT ORDER
    selectornames = ['left', 'top', 'bottom']
    LINESETSIZE = 3;

    animateBlock("#0_0", 0,1, true); // LEFT BLOCK
    animateBlock("#0_1", 0,2, true); // TOP BLOCK
    animateBlock("#2_1", 0,1, true); // MIDDLE BLOCK

    populateLinesBlocks();
    setLines(0)
    $("body").off("click").click(clickLinesPicture);
}

function init_lines() {
    TOPBLOCK = ".mainGrid #0_2 .inner"
    BOTTOMBLOCK = ".mainGrid #4_0 .inner"
    LEFTBLOCK = ".mainGrid #0_0 .inner" // SAME AS MOBILE
    RIGHTBLOCK = ".mainGrid #0_6 .inner"
    MIDDLEBLOCK = ".mainGrid #2_3 .inner"

    selectorblocks = [TOPBLOCK, LEFTBLOCK, MIDDLEBLOCK, RIGHTBLOCK, BOTTOMBLOCK]; // THIS IS CORRECT ORDER
    selectornames = ['top', 'left', 'middle', 'right', 'bottom']
    LINESETSIZE = 5;

    animateBlock("#title_0_0",0,1);
    animateBlock("#title_1_6",1,1);
    animateBlock("#title_1_1",0,1);
    animateBlock("#title_0_6",0,1);

    // nav links
    $("#title_0_0 .inner").text("Humans").addClass("topLink");
    $("#title_0_6 .inner").text("About").addClass("topLink");

    // page title
    $("#title_1_1 .inner").text("Lines").addClass("topLink");

    // initial animates
    animateBlock("#0_2",0,2,true) // top
    animateBlock("#0_0",2,0,true); // left
    animateBlock("#2_3",0,2,true); // middle
    animateBlock("#0_6",2,0,true); // right
    animateBlock("#4_0",0,2,true); // bottom

    animateBlock("#5_2",0,2,true) // top
    animateBlock("#5_0",2,0,true); // left
    animateBlock("#7_3",0,2,true); // middle
    animateBlock("#5_6",2,0,true); // right
    animateBlock("#9_0",0,2,true); // bottom

    animateBlock("#10_2",0,2,true) // top
    animateBlock("#10_0",2,0,true); // left
    animateBlock("#12_3",0,2,true); // middle
    animateBlock("#10_6",2,0,true); // right
    animateBlock("#14_0",0,2,true); // bottom

    animateBlock("#15_2",0,2,true) // top
    animateBlock("#15_0",2,0,true); // left
    animateBlock("#17_3",0,2,true); // middle
    animateBlock("#15_6",2,0,true); // right
    animateBlock("#19_0",0,2,true); // bottom

    populateLinesBlocks()

    $("body").off("click").click(clickLinesPicture);
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
        $(selector).removeAttr("id")
        return;
    }

    $(titleSelector).fadeOut(FADEOUT_DURATION,function() { $(this).text(line.title).fadeIn(FADEIN_DURATION)});
    $(designerSelector).text(line.designers);
    $(descriptionSelector).text(line.description);
    $(selector).attr("id", line.imageId());

    setTimeout(function(){
        var elemwidth = $(selector).find(".title")[0].getBoundingClientRect().width/2;
        var translatestring = "translateX(-"+elemwidth+"px)"
        $(selector + " .content").css({
            transform: translatestring
        })
    },320);
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

        $(HIGHLIGHTEDBLOCK).find(".inner").toggleClass("lineBlockPicMuted lineBlockPic");

        return;
    }

    $(".block").removeClass("muted")
    $(".highlighted").removeClass("highlighted");

    // go back to dim background
    $(HIGHLIGHTEDBLOCK).find(".lineBlockPic").toggleClass("lineBlockPicMuted lineBlockPic");
    HIGHLIGHTEDBLOCK = null;
}

function populateLinesBlocks() {
    var totalSets = Math.round(LINES.length/LINESETSIZE);

    for (var lineset=0; lineset < totalSets; lineset++) {
        selectorblocks.forEach(function(selector, i) {
            var id = selector.split("#")[1]
            var baserow = id.split("_")[0];
            var basecol = id.split("_")[1];
            var actualrow = parseInt(baserow) + lineset*5;
            var actualselector = "#" + actualrow + "_" + basecol;

            console.log(actualselector)
            $(actualselector)
                .html("<div class='content'><span class='title'></span><p class='designers'></p><p class='description'></p></div>")
                .addClass("linesBlock lineBlockPicMuted " + selectornames[i])
            var line = LINES[lineset*LINESETSIZE + i];
            setLineBlock(actualselector, line)
            console.log(line)
        })
    }
}