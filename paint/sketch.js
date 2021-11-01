// Paint
// Daniel Messham
// fri 22 oct
//
// Extra for Experts:
// - 
//todo: add saving and loading, resizeing grid?

let gridSizeX = 16;
let gridSizeY = 16;
let gridSize = (gridSizeX+gridSizeY)/2;

let grid = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

let cellSize;

let selectX = 0
let selectY = 0

function setup() {
  frameRate(10)
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.9, windowWidth*0.9);
  }
  else {
    createCanvas(windowHeight*0.9, windowHeight*0.9);
  }

  cellSize = (width-2)/gridSize;

  //CreateArray(gridSize,gridSize, 0);
}

function windowResized(){
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.8, windowWidth*0.8);
  }
  else {
    createCanvas(windowHeight*0.8, windowHeight*0.8);
  }
  cellSize = (width-2)/((gridSizeX+gridSizeY)/2);
}

function draw() {
  background(200);
  control();
  displayGrid();
}

function CreateArray(row, col, value){
  let grid = [];
  for(let y=0; y<gridSize; y++){
    grid.push([])
    for(let x=0; x<gridSize; x++){
      grid[y].push(value);
    }
  }
  return grid;
}

function displayGrid() {
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      strokeWeight(0)
      fill('red')
      fill(fillColor(grid[y][x]));
      rect(x*cellSize, y*cellSize,  cellSize, cellSize);
      
      //textAlign(CENTER, CENTER)
      //fill(20);
      //textSize(cellSize*0.7)
      //text(grid[y][x], x*cellSize + cellSize/2, y*cellSize + cellSize/2);//show non 0 numbers
      
    }
  }
  drawCage();
}

function drawCage(){
  let dist = 4//the "gap" between lines
  stroke(0);
  noFill()
  strokeWeight(6)
  for (let y=0; y<gridSize; y+=dist) {
    for (let x=0; x<gridSize; x+=dist) {
    rect(x*(cellSize), y*(cellSize),  cellSize*dist, cellSize*dist);
    }
  }
  noFill()
  strokeWeight(4)
  stroke(220);
  rect(selectX*cellSize+3, selectY*cellSize+3, cellSize-6, cellSize-6);
  stroke(0);
  strokeWeight(2)
  rect(selectX*cellSize, selectY*cellSize, cellSize, cellSize);
}

function control(){
  if (keyIsDown(UP_ARROW)&&selectY>0){selectY-=1;}
  if (keyIsDown(DOWN_ARROW)&&selectY<gridSize-1){selectY+=1;}
  if (keyIsDown(LEFT_ARROW)&&selectX>0){selectX-=1;}
  if (keyIsDown(RIGHT_ARROW)&&selectX<gridSize-1){selectX+=1;}

  
  numInput();
}

function numInput(){
  if(keyCode>=48&&keyCode<=57){
    grid[selectY][selectX]=(keyCode-48);
  } 
}

function fillColor(val){
  if(val = 0){return("black")};
  if(val = 1){return("white")};
  if(val = 2){return("red")};
  if(val = 3){return("green")};
  if(val = 4){return("blue")};
  if(val = 5){return("cyan")};
  if(val = 6){return("magenta")};
  if(val = 7){return("purple")};
  if(val = 8){return("yellow")};
  if(val = 9){return("orange")};
  if(val = 10){return("black")};
  if(val = 11){return("black")};
  if(val = 12){return("black")};
  if(val = 13){return("black")};
  if(val = 14){return("black")};
  if(val = 16){return("black")};

}