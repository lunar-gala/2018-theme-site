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
    console.log("asdasd");
    console.log("#"+this.id);
    if(collapsing){
      $("#"+this.id).css({
        "top":this.row*(window.innerHeight / grid_rows) - h*this.bounds.bottom,
        "left":this.col*(window.innerWidth / grid_cols) - w*this.bounds.right,
        "width":w+this.bounds.right*w,
        "height":h+this.bounds.bottom*h
      });
    }
    else{
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
    console.log(block.DOM);
    currentRow.push(new Block(i,j,curX,curY));
  }
  grid.push(currentRow);
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
    id = $(this).attr("id").split("_");
    var i = parseInt(id[0]);
    var j = parseInt(id[1]);
    var curBlock = grid[i][j];
    curBlock.bounds.bottom = 1;
    curBlock.bounds.right = 1;
    var topR = grid[i][j+1];
    var botR = grid[i+1][j+1];
    var bottomL = grid[i+1][j];
    topR.bounds.right = -1;
    botR.bounds = {"right":-1,"bottom":-1};
    bottomL.bounds.bottom = -1;
    topR.update(regular_w,regular_h);
    botR.update(regular_w,regular_h);
    bottomL.update(regular_w,regular_h);
    curBlock.update(regular_w,regular_h);
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
