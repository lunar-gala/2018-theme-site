var grid = [];
var titleGrid = [];
var navGrid = [];

//DESKTOP VARIABLES
var __title_grid_cols = 8;
var __title_grid_rows = 3;
var __grid_cols = 8;
//this number should be able to change according to the page
var __grid_rows = 35;

//MOBILE VARIABLES
var __mobile_title_grid_cols = 3;
var __mobile_title_grid_rows = 2;
var __mobile_grid_cols = 3;

//this number should be able to change according to the page
var __mobile_grid_rows = 20;

__pageCounts = {
  '/about':[15,18],
  '/lines':[20,42],
  '/members':[35,42]
}

function initGrid (rows, cols, grid, preString, containerName, offset = 0) {
  var block_width = $(containerName).width() / cols;
  var block_height = $(containerName).height() / rows;
  for(var i = 0; i < rows; i++) {
    var currentRow = [];
    for(var j = 0; j < cols; j++) {
      var y = i * block_height;
      var x = j * block_width;


      var block = new Block(i, j, x, y,
                            block_width, block_height, preString, containerName, offset);

      currentRow.push(block);
    }
    grid.push(currentRow);
  }
  return grid;
}

function Block(row, col, x, y, width, height, preString, containerName, offset = 0){
  this.row = row;
  this.col = col;
  this.containerName = containerName;

  //initial values
  this.x = x;
  this.y = y;
  if (preString.length > 0) {
    this.id = preString+"_"+row+"_"+col;
  } else {
    this.id = row+"_"+col;
  }
  this.offset = offset;
  this.state = "normal";
  this.width = width;
  this.height = height;
  this.bounds = {right:0, bottom:0}
  this.DOM = `<div class="block" id="`+this.id+`">
                  <div class="inner"></div>
                  <div class ="borders">
                    <div class ="borders-inner">
                      <span class="border-top"></span>
                      <span class="border-right"></span>
                      <span class="border-bottom"></span>
                      <span class="border-left"></span>
                    </div>
                  </div>
              </div>`;
  this.collapsed = false;
  this.showgridlines = false;
  this.belongsto = null;

  this.animateOut = function(){
    // console.log(currentPage,row_per_page,this.row)
    if(!(currentPage * row_per_page <= this.row && (currentPage * row_per_page) + row_per_page > this.row) && (this.containerName == '.mainGrid')){
      return;
    }
    directions = [];
    // 1- Top border
    // 2- Right border
    // 3- Bottom border
    // 4- Left border
    if(Math.random() > .5){
      directions.push("left-out");
    }
    else{
      directions.push("right-out");
    }
    if(Math.random() > .5){
      directions.push("up-out");
    }
    else{
      directions.push("down-out");
    }
    if(Math.random() > .5){
      directions.push("left-out");
    }
    else{
      directions.push("right-out");
    }
    if(Math.random() > .5){
      directions.push("up-out");
    }
    else{
      directions.push("down-out");
    }
    directions.forEach(function(val,index){
      //Creating the random second measured delay.
      randomVal = Math.random();
      randomDuration = parseFloat(.1+(randomVal*.5))+"s";
      randomDelay = parseFloat(randomVal*.5)+"s";
      directions[index] = [val,randomDelay,randomDuration];
    })
    $("#"+this.id+" .borders .border-top")
    .css('transition-delay',directions[0][1])
    .css('transition-duration',directions[0][2])
    .addClass(directions[0][0]);
    $("#"+this.id+" .borders .border-right")
    .css('transition-delay',directions[1][1])
    .css('transition-duration',directions[1][2])
    .addClass(directions[1][0]);
    $("#"+this.id+" .borders .border-bottom")
    .css('transition-delay',directions[2][1])
    .css('transition-duration',directions[2][2])
    .addClass(directions[2][0]);
    $("#"+this.id+" .borders .border-left")
    .css('transition-delay',directions[3][1])
    .css('transition-duration',directions[3][2])
    .addClass(directions[3][0]);

  }

  this.animateIn = function(){


    if(!(currentPage * row_per_page <= this.row && (currentPage * row_per_page) + row_per_page > this.row) && (this.containerName == '.mainGrid')){
      return;
    }
    $("#"+this.id+" .borders span").removeClass("left-out right-out up-out down-out");
  }

  this.create = function(target){
    $(target).append(this.DOM);
  }

  this.update = function(w, h, offset = 0,animBlock = false){
    //checking if collapsed
    var blockElem = $("#"+this.id)

    this.showgridlines ? blockElem.addClass("filler-block") : blockElem.removeClass("filler-block");

    if (this.collapsed && Object.values(this.bounds).includes(-1)) {

        var y = this.row * h + this.offset;
        var x = this.col * w;

        blockElem.css({
          "top": Math.ceil(y) + "px",
          "left": Math.ceil(x) + "px",
          "width": Math.floor(w) + "px",
          "height": Math.floor(h) + "px"
        });

        this.y = y;
        this.x = x;
        this.width = w;
        this.height = h;
        return;
    }

    if(Object.values(this.bounds).includes(-1)) {
      this.collapsed = true;
      blockElem.toggleClass("collapsed");
    } else {
        this.offset = offset;
        this.collapsed = false;
        var y;
        var x;

        var width = w + this.bounds.right * w;
        var height = h + this.bounds.bottom * h;

        y = this.row * h + offset;
        x = this.col * w;

        blockElem.css({
          "top": Math.ceil(y) + "px",
          "left": Math.ceil(x) + "px",
          "width": Math.floor(width) + "px",
          "height": Math.floor(height) + "px"
        });

        this.y = y;
        this.x = x;

        this.width = width;
        this.height = height;

        if (this.showgridlines) {
          console.log("show grid lines")
          blockElem.find(" .animated-filler-block").remove()
          // TODO (bug): remove hidden class
          blockElem.append($("<div class='animated-filler-block hidden'><div class='filler-inner'></div></div>").css({
            top: 0,
            left: 0,
            width: w,
            height: h
          }))
        }
    }
  }
}

function animateBlock(block, rowsDown, colsRight, showgridlines = false) {

    // var regular_w = (window.innerWidth/grid_cols);
    // var regular_h = (window.innerHeight/grid_rows);

    var id = $(block).attr("id").split("_");

    var i = parseInt(id[id.length - 2]);
    var j = parseInt(id[id.length - 1]);

    var gridToUse;

    if (id.length < 3) {
      gridToUse = grid;
    } else {
      if (id[0] == "title") {
        gridToUse = titleGrid;
      }
    }

    var curBlock = gridToUse[i][j];
    var regular_w = ($(curBlock.containerName).width()/gridToUse[0].length);
    var regular_h = ($(curBlock.containerName).height()/gridToUse.length);

    if (curBlock.bounds.bottom != 0 || curBlock.bounds.right != 0) {
      resetBlock(block);
      return;
    }

    curBlock.bounds.bottom = rowsDown;
    curBlock.bounds.right = colsRight;

    for (var row = i; row < Math.min(gridToUse.length, i + 1 + rowsDown); row++) {
      for (var col = j; col < Math.min(gridToUse[0].length, j + 1 + colsRight); col++) {
        if (row == i && col == j && (gridToUse[row][col].bounds.right != 0 || gridToUse[row][col].bounds.bottom != 0)) {
          continue
        }
        var b = gridToUse[row][col];
        b.showgridlines = showgridlines;
        $("#"+b.id).attr("belongs-to", $(block).attr("id"))

        if (col == j) {
          // vertical
          collapse("DOWN", b);
        } else if (row == i) {
          // horizontal
          collapse("RIGHT", b)
        } else {
          // diagonally
          collapse("DIAGONAL", b);
        }
      }
    }
    curBlock.showgridlines = showgridlines;
    curBlock.update(regular_w, regular_h, curBlock.offset);

}

function resetBlock(block) {
    var id = $(block).attr("id").split("_");

    var i = parseInt(id[id.length - 2]);
    var j = parseInt(id[id.length - 1]);

    var gridToUse;
    if (id.length < 3) {
      gridToUse = grid;
    } else {
      if (id[0] == "title") {
        gridToUse = titleGrid;
      }
    }

    var curBlock = gridToUse[i][j];
    var regular_w = ($(curBlock.containerName).width()/gridToUse[0].length);
    var regular_h = ($(curBlock.containerName).height()/gridToUse.length);

    var blocksDown = curBlock.bounds.bottom;
    var blocksRight = curBlock.bounds.right;

    for (var row=i; row < Math.min(gridToUse.length, i + 1 + blocksDown); row++) {
      for (var col=j; col < Math.min(gridToUse[0].length, j + 1 + blocksRight); col++) {
        var b = gridToUse[row][col];

        b.bounds.right = 0
        b.bounds.bottom = 0;

        b.update(regular_w, regular_h, curBlock.offset)

        b.showgridlines = false;
        $("#"+b.id).removeAttr("belongs-to")

        if ($("#"+b.id).hasClass('collapsed')) {
          $("#"+b.id).toggleClass('collapsed');
        }
      }
    }
}

function resetAllBlocks() {
  for (var row=0; row < grid_rows; row++) {
    for (var col=0; col < grid_cols; col++) {
      var b = grid[row][col];
      if (b.bounds.right > 0 || b.bounds.bottom > 0) {
        resetBlock(b);
      }
    }
  }

  for (var row=0; row < title_grid_rows; row++) {
    for (var col=0; col < title_grid_cols; col++) {
      var b = titleGrid[row][col];
      $("#title_"+b.id).remove();
      // Call this once implemented
      // b.animateOut()
    }
  }
}

function destroyAllBlocks(grid){
  if(grid.length > 0){
    for (var row = 0; row < grid_rows; row++) {
      for (var col = 0; col < grid_cols; col++) {
        var b = grid[row][col];
        // console.log(grid_cols);
        $("#"+b.id).remove();
        // Call this once implemented
        // b.animateOut()
      }
    }
  }
  if(titleGrid.length > 0){
    for (var row = 0; row < title_grid_rows; row++) {
      for (var col = 0; col < title_grid_cols; col++) {
        var b = titleGrid[row][col];
        $("#"+b.id).remove();
        // Call this once implemented
        // b.animateOut()
      }
    }
  }
}

function collapse(direction, block) {
    switch (direction) {
      case "DOWN":
        block.bounds.bottom = -1;
        break;
      case "RIGHT":
        block.bounds.right = -1;
        break;
      case "DIAGONAL":
        block.bounds.bottom = -1;
        block.bounds.right = -1;
      default:
        break;
    }

    var id = $(block).attr("id").split("_");
    var gridToUse;
    if (id.length < 3) {
      gridToUse = grid;
    } else {
      if (id[0] == "title") {
        gridToUse = titleGrid;
      }
    }

    var regular_w = ($(block.containerName).width()/gridToUse[0].length);
    var regular_h = ($(block.containerName).height()/gridToUse.length);

    block.update(regular_w, regular_h, block.offset);
}

__pageAnimating = false;

function movePage(curPage,pageCount,direction,cb){

  oldPage = curPage;

  __pageAnimating = true;
  blockDimension = { h: titleGrid[0][0].height };

  if ((curPage == 0 && direction == 'up') ||
      (curPage == pageCount - 1 && direction == 'down')){
    window.setTimeout(function(){
      __pageAnimating = false;
    },700);
    cb(curPage);
    return;
  }

  if (direction == 'up') {
    newPage = curPage - 1;
  }

  else if (direction == 'down') {
    newPage = curPage + 1;
  }

  targetDist = -(row_per_page * blockDimension.h * newPage);

  //reveal the target boxes
  boundary_low = newPage * row_per_page
  boundary_top = newPage * row_per_page + row_per_page

  for (i = boundary_low; i < boundary_top;i++){
    // console.log(i);
    $('.mainGrid [id*=\''+parseInt(i)+'_\']').css('display','block');
  }
  //hide the outgoing boxes after animating out
  if(window.location.pathname == "/about" && newPage == 1 && $("#5_1 .inner")[0].innerHTML == ""){
      $("#5_1 .inner")[0].innerHTML = "<div style='height:100%'><iframe src=\"https://player.vimeo.com/video/252741421?autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\"  ></iframe></div>"
      useThis = "webkitallowfullscreen mozallowfullscreen allowfullscreen"
  }

  $('.mainGrid').css('transform','translateY('+parseFloat(targetDist)+'px)');

  window.setTimeout(function(){
    boundary_low = oldPage * row_per_page
    boundary_top = oldPage * row_per_page + row_per_page
    for (i = boundary_low; i < boundary_top;i++){
      $('.mainGrid [id^=\''+parseInt(i)+'_\']').css('display','none');
    }
    __pageAnimating = false;
  },1000)

  cb(newPage);
}

var currentPage = 0;

$(window).ready(function(){
  var wheeling;
  var wheeldelta = { x: 0, y: 0 };
  var totalDist = 0;
  var threshold = 400;
  var isScrollingUp = false;
  document.onkeydown = function(e) {
    if(__pageAnimating){
      return;
    }
    switch (e.keyCode) {
        case 38:
          movePage(currentPage,grid_rows/row_per_page,'up',function(newPage){
            currentPage = newPage;
            e.preventDefault();
          });
          break;
        case 40:
          movePage(currentPage,grid_rows/row_per_page,'down',function(newPage){
            currentPage = newPage;
            e.preventDefault();
          });
          break;
    }
  };

  $("body").bind('mousewheel', function(e) {
    if(__pageAnimating){
      return;
    }
    if(e.originalEvent.wheelDelta > 0) {
      if (!isScrollingUp) {
        totalDist = 0;
        isScrollingUp = true;
      }
    } else if (isScrollingUp) {
      totalDist = 0;
      isScrollingUp = false;
    }
    else{
      isScrollingUp = false;
    }

    if (Math.abs(e.originalEvent.wheelDelta) > 12) {

      if (isScrollingUp) {
        if(totalDist > threshold){
          totalDist = 0;
          movePage(currentPage,grid_rows/row_per_page,'up',function(newPage){
            currentPage = newPage;
            e.preventDefault();
          });
        }
        totalDist += e.originalEvent.wheelDelta;
      } else {
        if(totalDist < -threshold){
          totalDist = 0;
          movePage(currentPage,grid_rows/row_per_page,'down',function(newPage){
            currentPage = newPage;
            e.preventDefault();
          });
        }
        totalDist += e.originalEvent.wheelDelta;
      }
    }
  });
});

$(window).resize(function(){
  grid.map(function(inner){
    inner.map(function(cur){
      cur.update(($(cur.containerName).width()/grid[0].length),($(cur.containerName).height()/grid.length), $(".titleGrid").height());
    })
  })
  $('.animated-filler-block').removeClass('hidden');

  titleGrid.map(function(inner){
    inner.map(function(cur){
      cur.update(($(cur.containerName).width()/titleGrid[0].length),($(cur.containerName).height()/titleGrid.length), 0);
    })
  })
});
