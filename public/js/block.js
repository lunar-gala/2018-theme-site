var grid = [];
var navGrid = [];
var grid_cols = 8;
var grid_rows = 8;

function initGrid (rows, cols, grid, preString) {
  // var grid = [];
  var block_width = window.innerWidth / cols;
  var block_height = window.innerHeight / rows;

  for(var i = 0; i < rows; i++) {
    var currentRow = [];
    for(var j = 0; j < cols; j++) {
      var y = i * block_height;
      var x = j * block_width;

      var block = new Block(i, j, x, y,
                            block_width, block_height,preString);
      currentRow.push(block);
    }
    grid.push(currentRow);
  }
  return grid;
}

function Block(row, col, x, y, width, height, preString){
  this.row = row;
  this.col = col;
  //initial values
  this.x = x;
  this.y = y;
  this.id = preString+row+"_"+col;
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
      randomDuration = parseFloat(.1+(Math.random()*.5))+"s";
      randomDelay = parseFloat(Math.random()*.5)+"s";
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
    $("#"+this.id+" .borders span").removeClass("left-out right-out up-out down-out");
  }

  this.create = function(target){
    $(target).append(this.DOM);
  }

  this.update = function(w,h){
    var blockElem = $("#"+this.id)

    this.showgridlines ? blockElem.addClass("filler-block") : blockElem.removeClass("filler-block");
    
    if (this.collapsed && Object.values(this.bounds).includes(-1)) {
        var y = this.row * h;
        var x = this.col * w;

        blockElem.css({
          "top": y,
          "left": x,
          "width": w,
          "height": h
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

        this.collapsed = false;
        var y;
        var x;
        var width = w + this.bounds.right * w;
        var height = h + this.bounds.bottom * h;

        y = this.row * h;
        x = this.col * w;

        blockElem.css({
          "top": y,
          "left": x,
          "width": width,
          "height": height
        });

        this.y = y;
        this.x = x;
        this.width = width;
        this.height = height;

        if (this.showgridlines && (this.bounds.right > 1 || this.bounds.bottom > 1)) {
          blockElem.find(" .animated-filler-block").remove()
          blockElem.append($("<div class='animated-filler-block'><div class='filler-inner'></div></div>").css({
            top: 0,
            left: 0,
            width: (window.innerWidth/grid[0].length),
            height: (window.innerHeight/grid.length)
          }))
        }
    }
  }
}

function animateBlock(block, rowsDown, colsRight, showgridlines = false) {
    var regular_w = (window.innerWidth/grid_cols);
    var regular_h = (window.innerHeight/grid_rows);

    var id = $(block).attr("id").split("_");

    var i = parseInt(id[0]);
    var j = parseInt(id[1]);

    var curBlock = grid[i][j];

    if (curBlock.bounds.bottom != 0 || curBlock.bounds.right != 0) {
      resetBlock(block);
      return;
    }

    curBlock.bounds.bottom = rowsDown;
    curBlock.bounds.right = colsRight;

    for (var row = i; row < Math.min(grid_rows, i + 1 + rowsDown); row++) {
      for (var col = j; col < Math.min(grid_cols, j + 1 + colsRight); col++) {
        if (row == i && col == j && (grid[row][col].bounds.right != 0 || grid[row][col].bounds.bottom != 0)) {
          continue
        }
        var b = grid[row][col];
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
    curBlock.update(regular_w,regular_h);
}

function resetBlock(block) {
    var id = $(block).attr("id").split("_");

    var i = parseInt(id[0]);
    var j = parseInt(id[1]);

    var curBlock = grid[i][j];

    var regular_w = (window.innerWidth/grid_cols);
    var regular_h = (window.innerHeight/grid_rows);

    var blocksDown = curBlock.bounds.bottom;
    var blocksRight = curBlock.bounds.right;

    for (var row=i; row < Math.min(grid_rows, i + 1 + blocksDown); row++) {
      for (var col=j; col < Math.min(grid_cols, j + 1 + blocksRight); col++) {
        var b = grid[row][col];

        b.bounds.right = 0
        b.bounds.bottom = 0;

        b.update(regular_w, regular_h)

        b.showgridlines = false;
        $("#"+b.id).removeAttr("belongs-to")

        if ($("#"+row+"_"+col).hasClass('collapsed')) {
          $("#"+row+"_"+col).toggleClass('collapsed');
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
}

function destroyAllBlocks(grid){
  if(grid.length > 0){
    for (var row = 0; row < grid_rows; row++) {
      for (var col = 0; col < grid_cols; col++) {
        var b = grid[row][col];
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

    var regular_w = (window.innerWidth/grid_cols);
    var regular_h = (window.innerHeight/grid_rows);

    block.update(regular_w, regular_h)
}

$(window).ready(function(){
  //initiating the grid

  $(window).keydown(function(e) {
    if (e.key == "r") {
      resetAllBlocks();
    }
  })
});

$(window).resize(function(){
  grid.map(function(inner){
    inner.map(function(cur){
      cur.update((window.innerWidth/grid[0].length),(window.innerHeight/grid.length));
    })
  })
});
