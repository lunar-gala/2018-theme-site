var TOPBLOCK = ".mainGrid #3_2 .inner"
var BOTTOMBLOCK = ".mainGrid #7_0 .inner"
var LEFTBLOCK = ".mainGrid #3_0 .inner"
var RIGHTBLOCK = ".mainGrid #3_6 .inner"
var MIDDLEBLOCK = ".mainGrid #5_3 .inner"

var selectorblocks = [TOPBLOCK, LEFTBLOCK, MIDDLEBLOCK, RIGHTBLOCK, BOTTOMBLOCK]; // THIS IS CORRECT ORDER
var selectornames = ['top', 'left', 'middle', 'right', 'bottom']

var HIGHLIGHTEDBLOCK = null;
var LINESETSIZE = 5;

var currentLineSet = 0;

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
              callback();
            }
        });
        return this;
    }
});

function init_lines() {
    // TODO: make call this on every page, instead of hardcoding it for each endpoint
    animateBlock("#1_6",1,1);
    $("#1_6 .inner").text("NAV").addClass("navBlock");

    $(document).keydown(function (e) {
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

    selectorblocks.forEach(function(selector,i) {
        $(selector)
            .html("<div class='content'><span id='" + selectornames[i] + "-title' " + "class='title'></span><p class='designers'></p><p class='description'></p></div>")
            .addClass("linesBlock lineBlockPicMuted aboutImg1 " + selectornames[i])
    })

    setLines(0)

    $("body").click(function (e) {
        var elem = e.target;
        // TODO: check to see if the clicked block is on top of a highlighted block and get the highlighted block's id
        // this is ugly but it works (i think)
        var blockid = ($(elem).hasClass("linesBlock") && $(elem).parent().attr("id")) || 
                        ($(elem).attr("belongs-to")) ||
                        ($(elem).parent().hasClass("filler-block") && $(elem).parent().attr("belongs-to")) ||
                        ($(elem).parent().parent().attr("id")) || 
                        ($(elem).parent().parent().parent().attr("id"))

        
        if (blockid && !HIGHLIGHTEDBLOCK) {
            $(".block").toggleClass('muted')
            $("#" + blockid + ".block").toggleClass('highlighted');
            HIGHLIGHTEDBLOCK = $("#" + blockid + ".block");

            $(HIGHLIGHTEDBLOCK).find(".aboutImg1").toggleClass("lineBlockPicMuted lineBlockPic");

            return;
        }

        $(".block").removeClass("muted")
        $(".highlighted").removeClass("highlighted");

        // go back to dim background
        $(HIGHLIGHTEDBLOCK).find(".lineBlockPic").toggleClass("lineBlockPicMuted lineBlockPic");
        HIGHLIGHTEDBLOCK = null;
    })
}

function setLines(lineSet) {
    var lowerBound = lineSet * LINESETSIZE;
    var upperBound = (lineSet + 1) * LINESETSIZE;

    for (var i=lowerBound; i<upperBound; i++) {
        var line = LINESDATA[i];
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

    $(titleSelector).fadeOut(FADEOUT_DURATION,function() { $(this).text(line.title).fadeIn(FADEIN_DURATION)});
    $(designerSelector).text(line.designers);
    $(descriptionSelector).text(line.description);
}

var LINESDATA = []

function Line(title, designers, description) {
    this.title = title;
    this.designers = designers; 
    this.description = description;
}

var linedata = [
    {
        title: "2268",
        designers: "Hamza Qureshi, Anny Fan",
        description: "The year 2268 marks two hundred and fifty years after next year’s Lunar Gala. After centuries of disastrous climate change, where rapid urbanization and pollution have distorted the way we approach growth in an urban landscape, where do we stand? 2268 explores this inquisition from two perspectives. The first perspective captures extreme pollution and the second perspective captures sustainability to the extreme where urbanization has gotten out of control and the soil has become rotten, forcing us to carry the food we need to eat."
    },
    {
        title: "amzu",
        designers: "Amber Lee, Kazumi Kanagawa",
        description: "Fashion often emphasizes aesthetic over utility. Inspired by Errolson Hugh’s “smart” and flexible ACRONYM 2014 S/S collection, this line explores the gap between clothing and technology through garments that utilize transformative elements to adapt to its wearers’ needs and environments."
    },
    {
        title: "Chinoiseries",
        designers: "Gunn Chaiyapatranun, Fon Euchukanonchai, Shariwa Sharada",
        description: "Modern. Playful. Dignified. Harking back to centuries of tradition, Chinoiseries reintroduces traditional clothing of asian cultures through its marriage with western references, materials and modern technology. The white and blue of Chinoiserie porcelain like delftware set the color scheme of this line, with different shades of denim representing the blue paired with white textiles of different weights and opacities."
    },
    {
        title: "Chroma",
        designers: "Brandon Darreff, Zain Islam-Hashmi, Alina Kramkova",
        description: "Fun. Playful. Hip. Today. Future. With and beyond the times. Chroma breathes life into the sterilized environment of the streets through the usage of color and transparency. Cut. Heated. Stretched. Layered. Woven. Perforated. Acrylic takes on a new life beyond its two dimensionality as it starts to encompass the figure and its clothes, transforming from an element on fabric to its own textile. Fabulous. Artistic. Crisp. Empowered. Effortless. Fearless. Chroma is for the bold, confident, and future trendsetter."
    },
    {
        title: "Descent",
        designers: "?",
        description: "Descent challenges gender norms and identity through amorphous, androgynous, and anonymous designs. The garments will exaggerate and reshape the body in a way that obscures and mystifies the gender of the wearer. In the end, however, gender is a construct and all variations of identity can be appreciated and admired."
    },
    {
        title: "Escape",
        designers: "Yirui Zhu & Zhuona Ma",
        description: "Inspired by the lifestory of the famous French Post-Impressionist artist Paul Gauguin, our line intends to explore the tension between social constraints and personal pursuits. We want to demonstrate a process in which the person breaks certain boundaries to achieve what is truly desired. Our main material includes macrame which represents tension. Its functionality evolves from restraining the motion of people to extending out from human body as a sign of passion and determination."
    },
    {
        title: "Homeostasis",
        designers: "Alan Guo and Jack Forman (Morphing Matter Lab - CMU HCII)",
        description: "Homeostasis is the implementation of the Morphing Matter Lab’s advanced transformative textile research into a fashion context. Each fiber in every piece has been individually selected, engineered, and woven to synthesize novel textiles with specific capacities for transformation. From the equilibrium between advanced technology and expressive design, Homeostasis pulls at biomimetic inspiration to give birth to a line in which each piece is a living and breathing display of its own. To evoke and enlighten the audience, we defy the expectation that fashion must be a static display, and engage the capabilities of futuristic textiles to execute striking metamorphoses in the moment."
    },
    {
        title: "HOOKED",
        designers: "Lily Fulop",
        description: "HOOKED explores the idea of absurdity and impracticality in fashion. In this line, current fashion trends and traditional yarncraft methods are taken to the extreme through the juxtaposition of incongruous textiles. HOOKED straddles the line between sculpture and apparel to create an irreverent celebration of textiles and high fashion."
    },
    {
        title: "Inertia",
        designers: "Sherry Wu and Annie Huang",
        description: "Inertia is a collection based on an imaginary future society in which people refuse to change.The pieces are uniforms for the inhabitants of this alternative future, which implies a sense of “fashion communism” and their core value for efficiency. In each piece, a flowy material is contained by a stiff fabric (patent leather or denim), to show the oppression from the society. In addition, to embody the value of efficiency, the tailoring process of every piece is zero-waste."
    },
    {
        title: "Intreped",
        designers: "Jules Przybylska",
        description: "??"
    },
    {
        title: "Maille",
        designers: "Noa Wolff-Fineout",
        description: "Maille is derived from the word chain mail, a reflection of its medieval and baroque influences. The collection explores the deconstruction of rigid armor facades, juxtaposing these strong forms against their raw scaffolding. Diaphanous material is intricately conformed to strict structural material, entirely exposing the form underneath. The body is protected only by discrete quilted encasings whose utility contrasts its scintillating delicate quality."
    },
    {
        title: "mien",
        designers: "??",
        description: "This collection will consider the human being’s obsession with the face as a frame for personal expression, enshrine the neurotic self, and attempt to reunite the internal and abstract self with the warm and physical body-vehicle. It will do this through the use of head-pieces, proportion, and silhouettes. Throughout the line, the relationship and balance between face (abstract self) and body (flesh and bone) will be explored, and the collection will hopefully culminate in their unification."
    },
    {
        title: "Morfologia",
        designers: "Soojin Sohn, Kabir Mantha, Tatyana Mustakos",
        description: "Morfologia is about shape; it is about the evolution of form within the complex web of biological, social, and technological dependencies that ensnare every article of clothing. Through a combination of visceral texture, mechanical augmentation, and interactive textiles, Morfologia looks at the way our bodies are altered, augmented, and obfuscated, as well as what they do to fight back."
    },
    {
        title: "Stack",
        designers: "Sebastian Carpenter",
        description: "Stack explores the intersection of the organic and the inorganic. Nearly every stage of the line’s production is inorganic in some way—from the materials (sheets of foam-core and plastic), to the use of digital fabrication methods, to the arrangement of each piece’s components in a equidistant stack. Despite the methods of the line’s creation, each resulting look takes on an organic form, making a nod to the natural origins of most manufactured objects."
    },
    {
        title: "SURFACE",
        designers: "Michael Powell and Selena Zhen",
        description: "SURFACE explores the issue of the distortion and trivialization of the human body into objects of desire. The veneer of mesh, overlayed with cut contours, is a constructed external appearance that illustrates areas of the socially ideal body, exposing those who wear it to appreciation and admiration, but also leaving them vulnerable to objectification. As the line progresses, the body becomes more clearly exposed than upon first impression. It is meant to represent an exaggerated set of physical attributes that emphasize the scrutiny of our bodies – conscious and subconscious, external and internal."
    },
    {
        title: "Travaille",
        designers: "Ava Kling",
        description: "Our collection is entitled Travaille, the French word for “work.” Using the semiotics of traditional men’s workwear, ranging from blue collar rugged clothing to the silhouettes of white collar business attire, our collection will deconstruct and transform the definition of menswear as a gendered constraint. To create our own visual language, we will work to find a new understanding of how these traditional uniforms can be provoked and altered to showcase the power of femininity and delicacy. We will be taking inspiration from the 1920’s, a decade of social progression and change, from which our line will showcase a similar spirit of hope for the future. Furthermore, there will be a range of accessories adorning the garments, such as silk opera gloves, pearl necklaces, garters, suspenders, and knit bows that will further juxtapose our concept of workwear with an exploration of identity and theatricality."
    }
]

for (var i = 0; i < linedata.length; i++) {
    var line = linedata[i];
    LINESDATA.push(new Line(line.title, line.designers, line.description));
}
