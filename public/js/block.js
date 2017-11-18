var grid_cols = 8;
var grid_rows = 8;

var block_width = window.innerWidth / grid_cols;
var block_height = window.innerHeight/ grid_rows;


var grid = []

function Block(row,col,x,y){
  this.row = row;
  this.col = col;
  //initial values
  this.id = row+"_"+col;
  this.state = "normal";
  // this.expand = {top:0;right:false;}
  this.bounds = {right:0,bottom:0}
  this.DOM = `<div class="block" id="`+this.id+`"><div class="inner"></div></div>`;

  this.create = function(){
    $("body").append(this.DOM);
  }

  this.update = function(w,h){
    //checking if collapsed
    collapsing = false;

    if(Object.values(this.bounds).includes(-1)){
      collapsing = true;
      $("#"+this.id).toggleClass("collapsed");
    }
    if(collapsing){
      $("#"+this.id).css({
        "top":this.row*(window.innerHeight / grid_rows) - h*this.bounds.bottom,
        "left":this.col*(window.innerWidth / grid_cols) - w*this.bounds.right,
        "width":w+this.bounds.right*w,
        "height":h+this.bounds.bottom*h
      });
    }
    else{
      console.log(this.id)
      $("#"+this.id).css({
        "top":this.row*(window.innerHeight / grid_rows),
        "left":this.col*(window.innerWidth / grid_cols),
        "width":w+this.bounds.right*w,
        "height":h+this.bounds.bottom*h
      });
    }
  }
}

for(var i =0; i < grid_rows; i++)
{
  var currentRow = [];
  for(var j=0; j < grid_cols;j++)
  {
    var curX = j * block_width;
    var curY = i * block_height;
    var block = new Block(i,j,curX,curY)

    currentRow.push(block);
  }
  grid.push(currentRow);
}

function animateBlock(block, rowsDown, colsRight) {
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

    for (var row=i; row < i + 1 + rowsDown; row++) {
      for (var col=j; col < j + 1 + colsRight; col++) {
        if (row == i && col == j) {
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

    for (var row=i; row < i + 1 + blocksDown; row++) {
      for (var col=j; col < j + 1 + blocksRight; col++) {
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
  var regular_w = (window.innerWidth/grid_cols);
  var regular_h = (window.innerHeight/grid_rows);
  grid.map(function(inner){
    inner.map(function(cur){
      cur.create();
      cur.update(regular_w,regular_h);
    })
  })

  $(".block").click(function(){
    animateBlock(this, 0,3);
  });

  $(window).keydown(function(e) {
    if (e.key == "r") {
      resetAllBlocks();
    }
  })
});

$(window).resize(function(){
  grid.map(function(inner){
    inner.map(function(cur){
      cur.update((window.innerWidth/grid_cols),(window.innerHeight/grid_rows));
    })
  })
})
console.log(grid);
