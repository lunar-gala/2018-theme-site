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

function init_lines_mobile() {
    // requires 42 rows
    console.log(grid_rows, grid_cols)
    LEFTBLOCK = ".mainGrid #1_0 .inner"
    TOPBLOCK = ".mainGrid #1_1 .inner" 
    BOTTOMBLOCK = ".mainGrid #3_1 .inner"

    selectorblocks = [LEFTBLOCK, TOPBLOCK, BOTTOMBLOCK]; // THIS IS CORRECT ORDER
    selectornames = ['left', 'top', 'bottom']

    // selectorblocks = [TOPBLOCK, LEFTBLOCK, BOTTOMBLOCK]; // THIS IS CORRECT ORDER
    // selectornames = ['top', 'left', 'bottom']

    LINESETSIZE = 3;

    animateBlock("#title_1_0", 0, 1)
    $("#title_1_0 .inner").text("Lines").addClass("title")

    // lineSet 0
    animateBlock("#1_0", 2,0, true); // LEFT BLOCK
    animateBlock("#1_1", 0,1, true); // TOP BLOCK
    animateBlock("#3_1", 0,1, true); // MIDDLE BLOCK

    // lineSet 1
    animateBlock("#7_0", 2,0, true); // LEFT BLOCK
    animateBlock("#7_1", 0,1, true); // TOP BLOCK
    animateBlock("#9_1", 0,1, true); // MIDDLE BLOCK

    // lineSet 2
    animateBlock("#13_0", 2,0, true); // LEFT BLOCK
    animateBlock("#13_1", 0,1, true); // TOP BLOCK
    animateBlock("#15_1", 0,1, true); // MIDDLE BLOCK

    // lineSet 3
    animateBlock("#19_0", 2,0, true); // LEFT BLOCK
    animateBlock("#19_1", 0,1, true); // TOP BLOCK
    animateBlock("#21_1", 0,1, true); // MIDDLE BLOCK

    // lineSet 4
    animateBlock("#25_0", 2,0, true); // LEFT BLOCK
    animateBlock("#25_1", 0,1, true); // TOP BLOCK
    animateBlock("#27_1", 0,1, true); // MIDDLE BLOCK

    // lineSet 5
    animateBlock("#31_0", 2,0, true); // LEFT BLOCK
    animateBlock("#31_1", 0,1, true); // TOP BLOCK
    animateBlock("#33_1", 0,1, true); // MIDDLE BLOCK

    // lineSet 6
    animateBlock("#37_0", 2,0, true); // LEFT BLOCK

    populateLinesBlocks();

    $("body").off("click").click(clickLinesPicture);
}

function init_lines() {
    // requires 20 rows
    TOPBLOCK = ".mainGrid #0_2 .inner"
    BOTTOMBLOCK = ".mainGrid #4_0 .inner"
    LEFTBLOCK = ".mainGrid #0_0 .inner" // SAME AS MOBILE
    RIGHTBLOCK = ".mainGrid #0_6 .inner"
    MIDDLEBLOCK = ".mainGrid #2_3 .inner"

    selectorblocks = [LEFTBLOCK, TOPBLOCK , MIDDLEBLOCK, RIGHTBLOCK, BOTTOMBLOCK]; // THIS IS CORRECT ORDER
    selectornames = ['left', 'top', 'middle', 'right', 'bottom']
    LINESETSIZE = 5;

    animateBlock("#title_0_0",0,1);
    animateBlock("#title_1_6",1,1);
    animateBlock("#title_1_1",0,1);
    animateBlock("#title_0_6",0,1);

    // nav links
    $("#title_0_0 .inner").text("Humans").addClass("topLink");
    $("#title_0_6 .inner").text("About").addClass("topLink");

    // page title
    $("#title_1_1 .inner").text("Lines").addClass("title");

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

    populateLinesBlocks()

    $("body").off("click").click(clickLinesPicture);
}

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

    $(titleSelector).text(line.title);
    $(designerSelector).text(line.designers);
    $(descriptionSelector).text(line.description);
    $(selector).attr("id", line.imageId());
}

function clickLinesPicture(e) {
    var elem = e.target;
    console.log(elem)
    var blockid = ($(elem).hasClass("linesBlock") && $(elem).parent().attr("id")) || 
                    ($(elem).attr("belongs-to")) ||
                    ($(elem).parent().hasClass("filler-block") && $(elem).parent().attr("belongs-to")) ||
                    ($(elem).parent().hasClass('linesBlock') && $(elem).parent().parent().attr("id")) || // content 
                    ($(elem).parent().parent().hasClass('linesBlock') && $(elem).parent().parent().parent().attr("id")) ||
                    ($(elem).hasClass("filler-inner") && $(elem).parent().parent().attr("id"))

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
    var totalSets = Math.ceil(LINES.length/LINESETSIZE);
    var rowsPerPage = LINESETSIZE == 3 ? 6 : 5;
    for (var lineset=0; lineset < totalSets; lineset++) {
        selectorblocks.forEach(function(selector, i) {
            if ((i + lineset * LINESETSIZE) > LINES.length - 1) {
                return;
            }
            var id = selector.split("#")[1]
            var baserow = id.split("_")[0];
            var basecol = id.split("_")[1];
            var actualrow = parseInt(baserow) + lineset*rowsPerPage;
            var actualselector = "#" + actualrow + "_" + basecol;

            $(actualselector)
                .html("<div class='content'><span class='title'></span><p class='designers'></p><p class='description'></p></div>")
                .addClass("linesBlock lineBlockPicMuted " + selectornames[i])

            var line = LINES[lineset*LINESETSIZE + i];
            setLineBlock(actualselector, line)

            if (title_grid_rows > 2) {
                setTimeout(function(){centerContent(actualselector,line)},330);
            } else {
                console.log("centering")
                setTimeout(function(){centerContentMobile(actualselector, line)}, 330);
            }
            
        })
    }
}

function centerContent(selector, line) {
    var elemwidth = $(selector).find(".title")[0].getBoundingClientRect().width/2;
    var translatestring = "translateX(-"+elemwidth+"px)"
    $(selector + " .content").css({transform: translatestring })
}

function centerContentMobile(selector, line) {
    var elemwidth = $(selector)[0].getBoundingClientRect().width;
    var titlewidth = $(selector).find(".title")[0].getBoundingClientRect().width;

    var diff = Math.floor(elemwidth/2) - Math.floor(titlewidth/2)
    diff = (diff < 0) ? Math.floor(elemwidth/4) : diff

    var translatestring = "translateX(+"+diff+"px)"
    $(selector + " .content").css({transform: translatestring })
}