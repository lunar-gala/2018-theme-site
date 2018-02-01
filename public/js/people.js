var sections = ["Board", "Board (cont.)", "Designers", "Models", "Models (cont.)", "Dancers", "Not Pictured"];

function init_people() {
	// console.log(grid);
	populatePeopleHeader();
	populatePeopleContent();
	$(document).keyup(function(e) {
	    if (e.keyCode == 27) {
	    	removeDisplayPerson();
		}
	});
};

function populatePeopleHeader () {
	animateBlock("#title_0_0",0,1);
    animateBlock("#title_1_1",0,1);
    animateBlock("#title_0_6",0,1);
    $("#title_0_0 .inner").text("About").addClass("topLink");
    $("#title_0_0 .inner").append("<img class='arrow-left' src='./../images/Arrows/pointingleft.png'/>")
    $("#title_0_6 .inner").text("Lines").addClass("topLink");
    $("#title_0_6 .inner").append("<img class='arrow-right' src='./../images/Arrows/pointingright.png'/>")
    $("#title_1_1 .inner").text("Members").addClass("title");
}

function populatePeopleContent () {
	for (var i = 0; i < __grid_rows; i++) {
		for (var j = 0; j < __grid_cols; j++) {
			if (i%5 == 1 && j == 0) {
				animateBlock("#" + grid[i][j].id, 1, 0);
				$("#" + grid[i][j].id + " .inner").css({
		          	"background-image" : "url('../../images/red on blue.gif')",
		          	"background-size" : "cover",
				  	"background-repeat" : "no-repeat",
				  	"background-position" : "center center"
		        });
			} else if (i%5 == 1 && j == 6) {
				animateBlock("#" + grid[i][j].id, 1, 1);
				var sectionID = Math.floor(i/5);
				var prevSectionID = sectionID - 1;
				var nextSectionID = sectionID + 1;
				$("#" + grid[i][j].id + " .inner").css({
		          	"background-image" : "url('../../images/red on blue.gif')",
		          	"background-size" : "cover",
				  	"background-repeat" : "no-repeat",
				  	"background-position" : "center center"
		        });
		        $("#" + grid[i][j].id + " .inner").text(sections[sectionID]).addClass("section-name");
			} else if (i%5 == 3 && j == 3) {
				animateBlock("#" + grid[i][j].id, 1, 1);
				var sectionID = Math.floor(i/5);
				var prevSectionID = sectionID - 1;
				var nextSectionID = sectionID + 1;
				if (prevSectionID < 0) {
					$("#" + grid[i][j].id + " .inner")
						.append(`<p class='designers-link2'>` + sections[nextSectionID] + `</p>
								 <img class="arrow arrow-down" src = "../../images/Arrows/pointingdown.png"/>`);
				} else if (nextSectionID == sections.length) {
					$("#" + grid[i][j].id + " .inner")
						.append(`<p class='designers-link1'>` + sections[prevSectionID] + `</p>
								 <img class="arrow arrow-up" src = "../../images/Arrows/pointingup.png"/>`);
				} else {
					$("#" + grid[i][j].id + " .inner")
						.append(`<p class='designers-link1'>` + sections[prevSectionID] + `</p>
								 <img class="arrow" src = "../../images/Arrows/pointingboth.png"/>
								 <p class='designers-link2'>` + sections[nextSectionID] + `</p>`);
				}
			} else if (i == 30 && j == 2) {
				animateBlock("#" + grid[i][j].id, 2, 3);
				var notPicturedString = "";
				for (var x = 0; x < notPictured.length; x++) {
					var curElem = notPictured[x];
					notPicturedString += curElem.firstname 
										 + " " + curElem.lastname
										 + " - " + curElem.position
										 + ", " + curElem.major + " " + curElem.year + "</br>";
				}
				$("#" + grid[i][j].id + " .inner").append(`<p class="not-pictured-text">` + notPicturedString + `</p>`);
			} else if (!((i%5 == 2 && j == 0)
					    || (i%5 == 1 && j == 7)
					    || (i%5 == 2 && j == 7)
					    || (i%5 == 2 && j == 6)
					    || (i%5 == 3 && j == 4)
					    || (i%5 == 4 && j == 4)
					    || (i%5 == 4 && j == 3))) {
				var index = getIndex(i, j);
				var dataObject;
				var firstName = "";
				var lastName = "";
				if (index < board1.length) {
					dataObject = board1[index];
					firstName = dataObject.firstname;
					lastName = dataObject.lastname;
				} else if (index >= 60 && index < 60 + designers.length) {
					index = index - 60;
					dataObject = designers[index];
					firstName = dataObject.firstname;
					lastName = dataObject.lastname;
				} else if (index >= 90 && index < 90 + models.length) {
					index = index - 90;
					dataObject = models[index];
					firstName = dataObject.firstname;
					lastName = dataObject.lastname;
				} else if (index >= 150 && index < 150 + dancers.length) {
					index = index - 150;
					dataObject = dancers[index];
					firstName = dataObject.firstname;
					lastName = dataObject.lastname;
				}

				$("#" + grid[i][j].id + " .inner").css({
		          	"background-image" : "url('../../images/Final Eye Photos/" + firstName + lastName + "Eye.png')",
		          	"background-size" : "cover",
				  	"background-repeat" : "no-repeat",
				  	"background-position" : "center center"
		        });

				index = getIndex(i, j);
				if (index < board1.length || 
					(index >= 60 && index < 60 + designers.length) ||
					(index >= 90 && index < 90 + models.length) ||
					(index >= 150 && index < 150 + dancers.length) ) {
		        	$("#" + grid[i][j].id + " .inner").hover(function () {
		        		console.log(90 + models.length);
				        $(this).css({
				        	'background-color': '#ff2124',
  							'background-blend-mode': 'multiply',
							'transition': 'all .3s',
							'cursor': 'pointer'
						});
			        }, function () {
						$(this).css({
				        	'background-color': 'transparent',
  							'background-blend-mode': 'none'
						});
			        });
		        }

		        $("#" + grid[i][j].id + " .inner").click(function (i, j) {
		        	return function () {
		        		var index = getIndex(i, j);
		        		displayPerson(index);
		        	};
		        }(i, j));
			}
		}
	}
}

function getIndex(i, j) {
	var offset = 0;
	var index = (i * __grid_cols + j) - offset;
	var arryIndex = index;

	// console.log("models " + (90 + models.length));
	var numIter = Math.floor(index/40) + 1;
	for (var i = 0; i < numIter; i+=1) {
		if (index > 8) {
			arryIndex -= 1;
			if (index > 16) {
				arryIndex -= 3;
				if (index > 23) {
		    		arryIndex -= 2;
		    		if (index > 26) {
		    			arryIndex -= 2;
		    			if (index > 36) {
		    				arryIndex -= 2;
		    			}
		    		}
		    	}
			}
		}
		index -= 40;
	}

	// console.log("get index: " + arryIndex);
	return arryIndex;
}

function displayPerson (index) {
	var dataObject;
	var descClass = "";
	if (!__MOBILE_BOOL) {
		if (index < board1.length) {
			dataObject = board1[index];
		} else if (index >= 60 && index < 60 + designers.length) {
			index -= 60;
			dataObject = designers[index];
		} else if (index >= 90 && index < 90 + models.length) {
			index -= 90;
			dataObject = models[index];
		} else if (index >= 150 && index < 150 + dancers.length) {
			index -= 150;
			dataObject = dancers[index];
		}
		descClass = "rotated-text";
	} else {
		if (index < board1.length) {
			dataObject = board1[index];
		} else if (index >= 45 && index < 45 + designers.length) {
			index -= 45;
			dataObject = designers[index];
		} else if (index >= 75 && index < 75 + models.length) {
			index -= 75;
			dataObject = models[index];
		} else if (index >= 135 && index < 135 + dancers.length) {
			index -= 135;
			dataObject = dancers[index];
		}
		descClass = "rotated-text-mobile"
	}
	var firstName = dataObject.firstname;
	var lastName = dataObject.lastname;
	var src = "../../images/Final Full Photos/" + firstName + lastName + "Full.png";
	var major = dataObject.major;
	var year = dataObject.year;
	var position = dataObject.position;

	var displayPersonDiv =
		`<div class='person-info-background'></div>
		 <div class='person-info'>
			<div class="headshot" style="background-image:url('` + src + `')"></div>
			<div class="` + descClass + `">
				<p class="name">` + firstName + " " + lastName + `</p>
				<p class="major">` + major + " " + year + `</p>
				<p class="title">` + position + `</p>
			</div>

		 </div>`;
	var displayPersonDOM = $.parseHTML(displayPersonDiv);
	$(displayPersonDOM).hide().appendTo("body").fadeIn(200);
	$(".person-info-background").click(removeDisplayPerson);
}

function removeDisplayPerson() {
	$(".person-info").fadeOut(200, function() { $(".person-info").remove(); });
	$(".person-info-background").fadeOut(200, function() { $(this).remove(); });
}



//    MOBILE    ///////////////////    MOBILE    /////////////////    MOBILE    ///
//////    MOBILE    ////////////////////////////    MOBILE    /////////////////////
////////////////////////////    MOBILE    /////////////////    MOBILE    //////////
/////    MOBILE    /////////////////////////    MOBILE    /////////////////////////
///////////    MOBILE    /////////    MOBILE    ///////////    MOBILE    //////////
////    MOBILE    ////////////////////    MOBILE    ///////////////////////////////



var sectionsMobile = ["Board", "Board (cont.)", "Board (cont.)", "Designers", "Designers (cont.)", "Models", "Models (cont.)", "Models (cont.)", "Models (cont.)", "Dancers", "Dancers (cont.)", "Not Pictured"];

function init_people_mobile() {
	animateBlock("#title_1_0",0,1);
	$("#title_1_0 .inner").text("Members").addClass("title-mobile");

	populatePeopleContent_mobile();
}

function populatePeopleContent_mobile () {
	for (var i = 0; i < grid_rows; i++) {
		for (var j = 0; j < grid_cols; j++) {
			if (i%6 == 1 && j == 1) {
				var sectionID = Math.floor(i/6);
				animateBlock("#" + grid[i][j].id, 2, 0);
				$("#" + grid[i][j].id + " .inner").css({
		          	"background-image" : "url('../../images/red on blue.gif')",
		          	"background-size" : "cover",
				  	"background-repeat" : "no-repeat",
				  	"background-position" : "center center",
				  	"position" : "relative"
		        });
		        $("#" + grid[i][j].id + " .inner").append(`<div class="section-title-mobile"><p>`+sectionsMobile[sectionID]+`</p></div>`);
			} else if (i == 66 && (j == 0 || j == 2)) {
				animateBlock("#" + grid[i][j].id, 4, 0);
				var start;
				var end;
				if (j == 0) {
					start = 0;
					end = 4;
				} else {
					start = 4;
					end = notPictured.length;
				}
				
				for (var x = start; x < end; x++) {
					var curElem = notPictured[x];
					var notPicturedString = curElem.firstname 
											+ " " + curElem.lastname
											+ "</br>" + curElem.position
											+ ", " + curElem.major + " " + curElem.year + "</br>";
					$("#" + grid[i][j].id + " .inner").css({
						'padding' : '11%',
    					'padding-top' : '29%'
					})
					$("#" + grid[i][j].id + " .inner").append(`<p class="not-pictured-text-mobile">` + notPicturedString + `</p>`);
				}
			} else if (!((i%6 == 1 && j == 1) ||
						(i%6 == 2 && j == 1) ||
						(i%6 == 3 && j == 1))) {
				var index = getIndex_mobile(i, j);
				var dataObject;
				var firstName = "";
				var lastName = "";
				if (index < board1.length) {
					dataObject = board1[index];
					firstName = dataObject.firstname;
					lastName = dataObject.lastname;
				} else if (index >= 45 && index < 45 + designers.length) {
					index = index - 45;
					dataObject = designers[index];
					firstName = dataObject.firstname;
					lastName = dataObject.lastname;
				} else if (index >= 75 && index < 75 + models.length) {
					index = index - 75;
					dataObject = models[index];
					firstName = dataObject.firstname;
					lastName = dataObject.lastname;
				} else if (index >= 135 && index < 135 + dancers.length) {
					index = index - 135;
					dataObject = dancers[index];
					firstName = dataObject.firstname;
					lastName = dataObject.lastname;
				}

				$("#" + grid[i][j].id + " .inner").css({
		          	"background-image" : "url('../../images/Final Eye Photos/" + firstName + lastName + "Eye.png')",
		          	"background-size" : "cover",
				  	"background-repeat" : "no-repeat",
				  	"background-position" : "center center"
		        });

				index = getIndex_mobile(i, j);
				if (index < board1.length || 
					(index >= 45 && index < 45 + designers.length) ||
					(index >= 75 && index < 75 + models.length) ||
					(index >= 135 && index < 135 + dancers.length) ) {
		        	$("#" + grid[i][j].id + " .inner").hover(function () {
		        		console.log(90 + models.length);
				        $(this).css({
				        	'background-color': '#ff2124',
  							'background-blend-mode': 'multiply',
							'transition': 'all .3s',
							'cursor': 'pointer'
						});
			        }, function () {
						$(this).css({
				        	'background-color': 'transparent',
  							'background-blend-mode': 'none'
						});
			        });
		        }

		        $("#" + grid[i][j].id + " .inner").click(function (i, j) {
		        	return function () {
		        		var index = getIndex_mobile(i, j);
		        		displayPerson(index);
		        	};
		        }(i, j));
			}
		}
	}
}

function getIndex_mobile(i, j) {
	var offset = 0;
	var index = (i * grid_cols + j) - offset;
	var arryIndex = index;

	var numIter = Math.floor(index/18) + 1;
	for (var i = 0; i < numIter; i+=1) {
		if (index > 4) {
			arryIndex -= 1;
			if (index > 7) {
				arryIndex -= 1;
				if (index > 10) {
		    		arryIndex -= 1;
		    	}
			}
		}
		index -= 18;
	}

	console.log("get index: " + arryIndex);
	return arryIndex;
}
