$(window).ready(function(){
	console.log(grid);
	// populatePeopleHeader();
	// populatePeopleContent();
	// $(document).keyup(function(e) {
	//     if (e.keyCode == 27) { 
	//     	removeDisplayPerson();
	// 	}
	// }); 
});

function populatePeopleHeader () {
	animateBlock("#0_0",0,1);
	animateBlock("#1_6",1,1);
    animateBlock("#1_1",0,1);
    animateBlock("#0_6",0,1);
    $(".mainGrid #0_0 .inner").text("About").addClass("topLink");
    $(".mainGrid #0_6 .inner").text("Lines").addClass("topLink");
    $(".mainGrid #1_1 .inner").text("Humans").addClass("title");
    $("#1_6 .inner").text("NAV").addClass("navBlock");
    $("#1_6 .inner").click(function(){
      summonFullScreenNav();
    });
}

function populatePeopleContent () {
	var startEyes = 3;
	var endEyes = grid_rows;
	for (var i = startEyes; i < endEyes; i++) {
		for (var j = 0; j < grid_cols; j++) {
			if (i == 4 && j == 0) {
				animateBlock("#" + grid[i][j].id, 1, 0);
				$("#" + grid[i][j].id + " .inner").css({
		          	"background-image" : "url('../../images/red on blue 2.gif')",
		          	"background-size" : "cover",
				  	"background-repeat" : "no-repeat",
				  	"background-position" : "center center"
		        });
			} else if (i == 4 && j == 6) {
				animateBlock("#" + grid[i][j].id, 1, 1);
				$("#" + grid[i][j].id + " .inner").css({
		          	"background-image" : "url('../../images/blue on red 2.gif')",
		          	"background-size" : "cover",
				  	"background-repeat" : "no-repeat",
				  	"background-position" : "center center"
		        });
			} else if (i == 6 && j == 3) {
				animateBlock("#" + grid[i][j].id, 1, 1);
				$("#" + grid[i][j].id + " .inner").append("<p class='designers-link'>Designers</p>");
			} else if (!((i == 5 && j == 0) 
					    || (i == 4 && j == 7)
					    || (i == 5 && j == 7)
					    || (i == 5 && j == 6)
					    || (i == 6 && j == 4)
					    || (i == 7 && j == 4)
					    || (i == 7 && j == 3))) {
				console.log(getIndex(i, j));
				var index = getIndex(i, j);
				var dataObject = board1[index];
				var firstName = dataObject.firstname;
				var lastName = dataObject.lastname;
				$("#" + grid[i][j].id + " .inner").css({
		          	"background-image" : "url('../../images/Final Eye Photos/" + firstName + lastName + "Eye.png')",
		          	"background-size" : "cover",
				  	"background-repeat" : "no-repeat",
				  	"background-position" : "center center"
		        });
		        $("#" + grid[i][j].id + " .inner").append("<div class='overlay'></div>")
		        $("#" + grid[i][j].id + " .overlay").hover(function () {
			        $(this).css({
			        	"opacity" : "1",
					});
		        }, function (i, j)  {
		        	return function () {
			        	console.log(getIndex(i, j));
			        	var index = getIndex(i, j);
						var dataObject = board1[index];
						var firstName = dataObject.firstname;
						var lastName = dataObject.lastname;
						$(this).css({
				        	"opacity" : "0",
						});
			        	$(this).parent().css({
				          	"background-image" : "url('../../images/Final Eye Photos/" + firstName + lastName + "Eye.png')",
				        });
				    }
		        }(i, j));
		        $("#" + grid[i][j].id + " .inner").click(function (i, j) {
		        	return function () {
		        		var index = getIndex(i, j);
			        	console.log(index);
		        		displayPerson(index);
		        	};
		        }(i, j));
			}
		}
	}
}

function getIndex(i, j) { 
	var offset = 3 * grid_cols;
	var index = (i * grid_cols + j) - offset;
	if (index > 8) {
		index -= 1;
		if (index > 15) {
			index -= 3;
			if (index > 17) {
	    		index -= 2;
	    		if (index > 20) {
	    			index -= 2;
	    			if (index > 26) {
	    				index -= 2;
	    			}
	    		}
	    	}
		}
	}
	return index;
}

function displayPerson (index) {
	var dataObject = board1[index];
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