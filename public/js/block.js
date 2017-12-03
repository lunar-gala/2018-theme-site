var grid;
var grid_cols = 8;
var grid_rows = 8;

function initGrid (rows, cols) {
  var grid = [];
  var block_width = window.innerWidth / cols;
  var block_height = window.innerHeight / rows;

  for(var i = 0; i < rows; i++) {
    var currentRow = [];
    for(var j = 0; j < cols; j++) {
      var y = i * block_height;
      var x = j * block_width;

      var block = new Block(i, j, x, y,
                            block_width, block_height);
      currentRow.push(block);
    }
    grid.push(currentRow);
  }
  return grid;
}

function Block(row, col, x, y, width, height){
  this.row = row;
  this.col = col;

  //initial values
  this.x = x;
  this.y = y;
  this.id = row+"_"+col;
  this.state = "normal";
  this.width = width;
  this.height = height;
  this.bounds = {right:0, bottom:0}
  this.DOM = `<div class="block" id="`+this.id+`"><div class="inner"></div></div>`;

  this.create = function(target){
    $(target).append(this.DOM);
  }

  this.update = function(w,h){
    //checking if collapsed
    collapsing = false;

    if(Object.values(this.bounds).includes(-1)) {
      collapsing = true;
      $("#"+this.id).toggleClass("collapsed");
      // TODO: maybe need to fix width and height so we can click on the entire expanded box
      // $("#"+this.id).css({
      //   "width": 0,
      //   "height": 0
      // });
    } else {
        var y;
        var x;
        var width = w + this.bounds.right * w;
        var height = h + this.bounds.bottom * h;

        y = this.row * h;
        x = this.col * w;

        $("#"+this.id).css({
          "top": y,
          "left": x,
          "width": width,
          "height": height
        });

        this.y = y;
        this.x = x;
        this.width = w;
        this.height = h;
    }
  }
}

function animateBlock(block, rowsDown, colsRight, gridlines = false) {
  console.log(gridlines)
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

    // if (gridlines) {
    //   for (var row=i; row < Math.min(grid_rows, i + 1 + rowsDown); row++) {
    //     for (var col=j; col < Math.min(grid_cols, j + 1 + colsRight); col++) {
    //       if (row == i && col == j && (grid[row][col].bounds.right != 0 || grid[row][col].bounds.bottom != 0)) {
    //         continue
    //       }
    //       var block = "#" + i + "_" + j; 
    //       $(block).append($("<div class=row></div>"))
    //       console.log(b)
    //     }
    //   }
    // }

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
  grid = initGrid(grid_rows, grid_cols);
  grid.map(function(inner){
    inner.map(function(cur){
      cur.create(".mainGrid");
      cur.update(cur.width, cur.height);
    })
  })

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
