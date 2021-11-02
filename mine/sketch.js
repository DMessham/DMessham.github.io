// Paint
// Daniel Messham
// fri 22 oct
//
// Extra for Experts:
// - 
//todo: add saving and loading, resizeing grid?

let gridSizeX = 32;
let gridSizeY = 32;
let gridSize = (gridSizeX+gridSizeY)/2;

let grid = [
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

let cellSize;

let selectX = 0
let selectY = 0

let selectColorId = 0
let selectColor

function setup() {
  frameRate(10)
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.99, windowWidth*0.99);
  }
  else {
    createCanvas(windowHeight*0.99, windowHeight*0.99);
  }

  cellSize = (width-2)/gridSize;

  grid = CreateRandArray(gridSizeX, gridSizeY, 1, 2)
}

function windowResized(){
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.95, windowWidth*0.95);
  }
  else {
    createCanvas(windowHeight*0.95, windowHeight*0.95);
  }
  cellSize = (width-2)/((gridSizeX+gridSizeY)/2);
}

function draw() {
  background(200);
  fillColor()
  displayGrid();
  control();
}

function CreateArray(row, col, value){
  let grid = [];
  for(let y=0; y<row; y++){
    grid.push([])
    for(let x=0; x<col; x++){
      grid[y].push(value);
    }
  }
  return grid;
}

function CreateRandArray(row, col, min, max){
  let grid = [];
  for(let y=0; y<row; y++){
    grid.push([])
    for(let x=0; x<col; x++){
      grid[y].push(random(0,1));
    }
  }
  return grid;
}

function displayGrid() {
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      strokeWeight(0);
      fillColor(grid[y][x]);
      if(grid[y][x]=== 0){fill(90)}//find color to fill usimg index
        else if(grid[y][x]=== 1){fill("red")}
        else if(grid[y][x]=== 2){fill(120)}
        else if(grid[y][x]=== 3){fill("green")}
        else if(grid[y][x]=== 4){fill("blue")}
        else if(grid[y][x]=== 5){fill("orange")}
      else fill(120);
      rect(x*cellSize, y*cellSize,  cellSize, cellSize);
    }
  }
}


function mousePressed(){//change value in grid where the mouse currently is
  selectX = Math.floor(mouseX/cellSize);
  selectY = Math.floor(mouseY/cellSize);
  //grid[selectY][selectX] = selectColorId;
  if (grid[selectY][selectX]===0){grid[selectY][selectX] = 2}
    else if (grid[selectY][selectX]===1){grid[selectY][selectX] = 5; }
}

function keyPressed(){
  if(keyCode>=48&&keyCode<=57){
    selectColorId =(keyCode-48)
    selectColor = fillColor(selectColorId)
  }
  if (key="e"){
    grid[selectY][selectX]=(0);
  }
  if (key=" "){
    if (grid[selectY][selectX]===0){grid[selectY][selectX] = 3}
    else if (grid[selectY][selectX]===1){grid[selectY][selectX] = 4}
  }
  // if(keyCode===48){//select a color from the 
  //   selectColorId +=1;
  // }
  // else if(keyCode===49){
  // selectColorId -=1;
  // }
}

function control(){
  selectX = Math.floor(mouseX/cellSize);
  selectY = Math.floor(mouseY/cellSize);

  noFill()//draw cursor
  stroke("black");
  strokeWeight(4)
  rect(selectX*cellSize+2, selectY*cellSize+2, cellSize-4, cellSize-4);
  stroke("white");
  strokeWeight(2)
  rect(selectX*cellSize-2, selectY*cellSize-2, cellSize+4, cellSize+4);
  strokeWeight(3)
  stroke(fillColor(selectColorId));
  rect(selectX*cellSize, selectY*cellSize, cellSize, cellSize);
  noStroke()
}

function fillColor(colorID){
  if(colorID === 0){return(240)}
  else if(colorID === 1){ return("red")}
  else if(colorID === 2){ return(120)}
  else if(colorID === 3){ return("green")}
  else if(colorID === 4){ return("blue")}
  else if(colorID === 5){ return("orange")}
  else return(120);
}

function gameOver(){
  fill('red')
  rect(0,0,width,height)
}