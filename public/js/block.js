var grid;

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

  this.create = function(){
    $("body").append(this.DOM);
  }

  this.update = function(w, h){
    //checking if collapsed
    collapsing = false;
    if(Object.values(this.bounds).includes(-1)){
      collapsing = true;
      $("#"+this.id).toggleClass("collapsed");
    }

    var y;
    var x;
    var width = w + this.bounds.right * w;
    var height = h + this.bounds.bottom * h;
    if(collapsing){
      y = this.row * h - h * this.bounds.bottom;
      x = this.col * w - w * this.bounds.right;
    }
    else{
      y = this.row * h;
      x = this.col * w;
    }

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

$(window).ready(function(){
  grid = initGrid(2, 3);
  grid.map(function(inner){
    inner.map(function(cur){
      cur.create();
      cur.update(cur.width, cur.height);
    })
  });
});
$(window).resize(function(){
  grid.map(function(inner){
    inner.map(function(cur){
      cur.update((window.innerWidth/grid[0].length),(window.innerHeight/grid.length));
    })
  })
});
console.log(grid);
