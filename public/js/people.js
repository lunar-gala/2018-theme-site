var sections = ["Board", "Board (cont.)", "Designers", "Designers (cont.)", "Models", "Models (cont.)", "Dancers"]

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
    $("#title_0_6 .inner").text("Lines").addClass("topLink");
    $("#title_1_1 .inner").text("Federation").addClass("title");
}

function populatePeopleContent () {
	for (var i = 0; i < __grid_rows; i++) {
		for (var j = 0; j < __grid_cols; j++) {
			if (i%5 == 1 && j == 0) {
				animateBlock("#" + grid[i][j].id, 1, 0);
				if ((Math.floor(i/5))%2 == 0) {
					$("#" + grid[i][j].id + " .inner").css({
			          	"background-image" : "url('../../images/red on blue 2.gif')",
			          	"background-size" : "cover",
					  	"background-repeat" : "no-repeat",
					  	"background-position" : "center center"
			        });
				} else {
					$("#" + grid[i][j].id + " .inner").css({
			          	"background-image" : "url('../../images/blue on red 2.gif')",
			          	"background-size" : "cover",
					  	"background-repeat" : "no-repeat",
					  	"background-position" : "center center"
		        	});
				}
			} else if (i%5 == 1 && j == 6) {
				animateBlock("#" + grid[i][j].id, 1, 1);
				if ((Math.floor(i/5))%2 == 0) {
					$("#" + grid[i][j].id + " .inner").css({
			          	"background-image" : "url('../../images/blue on red 2.gif')",
			          	"background-size" : "cover",
					  	"background-repeat" : "no-repeat",
					  	"background-position" : "center center"
			        });
				} else {
					$("#" + grid[i][j].id + " .inner").css({
			          	"background-image" : "url('../../images/red on blue 2.gif')",
			          	"background-size" : "cover",
					  	"background-repeat" : "no-repeat",
					  	"background-position" : "center center"
			        });
				}
			} else if (i%5 == 3 && j == 3) {
				animateBlock("#" + grid[i][j].id, 1, 1);
				var sectionID = Math.floor(i/5);
				var prevSectionID = sectionID - 1;
				var nextSectionID = sectionID + 1;
				if (prevSectionID < 0) {
					$("#" + grid[i][j].id + " .inner")
						.append(`<p class='designers-link2'>` + sections[nextSectionID] + `</p>`);
				} else if (nextSectionID == sections.length) {
					$("#" + grid[i][j].id + " .inner")
						.append(`<p class='designers-link1'>` + sections[prevSectionID] + `</p>`);
				} else {
					$("#" + grid[i][j].id + " .inner")
						.append(`<p class='designers-link1'>` + sections[prevSectionID] + `</p>
								 <p class='designers-link2'>` + sections[nextSectionID] + `</p>`);
				}
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
				} else if (index >= 120 && index < 120 + models.length) {
					index = index - 120;
					dataObject = models[index];
					firstName = dataObject.firstname;
					lastName = dataObject.lastname;
				} else if (index >= 180 && index < 180 + dancers.length) {
					index = index - 180;
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

		        $("#" + grid[i][j].id + " .inner").append("<div class='overlay'></div>");

		        if (!((i == 8 && j >= 2) || i == 9)){
		        	$("#" + grid[i][j].id + " .overlay").hover(function () {
				        $(this).css({
				        	"opacity" : "1",
						});
			        }, function () {
						$(this).css({
				        	"opacity" : "0",
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

	// console.log("i: " + Math.floor(index/40));
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
	if (index < board1.length) {
		dataObject = board1[index];
	} else if (index >= 60 && index < 60 + designers.length) {
		index -= 60;
		dataObject = designers[index];
	} else if (index >= 120 && index < 120 + models.length) {
		index -= 120;
		dataObject = models[index];
	} else if (index >= 180 && index < 180 + dancers.length) {
		index -= 180;
		dataObject = dancers[index];
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
			<div class="rotated-text">
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