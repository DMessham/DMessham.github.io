// sudoku
// Daniel Messham
// fri 22 oct
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let initialGrid = [
  [2, 0, 5, 0, 0, 7, 0, 0, 6],
  [4, 0, 0, 9, 6, 0, 0, 2, 0],
  [0, 0, 0, 0, 8, 0, 0, 4, 5],
  [9, 8, 0, 0, 7, 4, 0, 0, 0],
  [5, 7, 0, 8, 0, 2, 0, 6, 9],
  [0, 0, 0, 6, 3, 0, 0, 5, 7],
  [7, 5, 0, 0, 2, 0, 0, 0, 0],
  [0, 6, 0, 0, 5, 1, 0, 0, 2],
  [3, 0, 0, 4, 0, 0, 5, 0, 8],
];

let gridSize = 9;

let grid=[[1,2,3,4,5,6,7,8,9],
          [1,2,3,4,5,6,7,8,9],
          [1,2,3,4,5,6,7,8,9],
          [1,2,3,4,5,6,7,8,9],
          [1,2,3,4,5,6,7,8,9],
          [1,2,3,4,5,6,7,8,9],
          [1,2,3,4,5,6,7,8,9],
          [1,2,3,4,5,6,7,8,9],
          [1,2,3,4,5,6,7,8,9],
];

let cellSize;

let selectX = 0
let selectY = 0

function setup() {
  frameRate(7)
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.9, windowWidth*0.9);
  }
  else {
    createCanvas(windowHeight*0.9, windowHeight*0.9);
  }
  cellSize = (width-2)/gridSize;
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      grid[y][x]=(initialGrid[y][x]);
    }
  }
}

function windowResized(){
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.8, windowWidth*0.8);
  }
  else {
    createCanvas(windowHeight*0.8, windowHeight*0.8);
  }
  cellSize = (width-2)/gridSize;
}

function draw() {
  background(200);
  control();
  displayGrid();
}

function displayGrid() {
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      strokeWeight(2)
      fill(120);
      rect(x*cellSize, y*cellSize,  cellSize, cellSize);
      if (grid[y][x] !== 0) {
        fill(220);
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
        textAlign(CENTER, CENTER)
        fill(20);
        textSize(cellSize*0.7)
        text(grid[y][x], x*cellSize + cellSize/2, y*cellSize + cellSize/2);//show non 0 numbers
      }
      if (grid[y][x] !== initialGrid[y][x]) {
        fill(180);
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
        textAlign(CENTER, CENTER)
        fill(22,67,22);
        textSize(cellSize*0.7)
        text(grid[y][x], x*cellSize + cellSize/2, y*cellSize + cellSize/2);//show non 0 numbers
      }
      if (x === selectX&&y === selectY) {
        fill(12,67,12);
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
        fill(220);
        textSize(cellSize*0.7)
        text(grid[y][x], x*cellSize + cellSize/2, y*cellSize + cellSize/2);//selected numbers
      }//selected
    }
  }
  drawCage();
}

function drawCage(){
  stroke(0);
  noFill()
  strokeWeight(6)
  for (let y=0; y<gridSize; y+=3) {
    for (let x=0; x<gridSize; x+=3) {
    rect(x*(cellSize), y*(cellSize),  cellSize*3, cellSize*3);
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
  if (initialGrid[selectY][selectX]===0){
    if(keyCode>=48&&keyCode<=57){
      grid[selectY][selectX]=(keyCode-48);
    }
  }
}