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

function displayGrid() {
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      strokeWeight(0);
      fillColor(grid[y][x]);
      if(grid[y][x]=== 0){fill(240)}//find color to fill usimg index
        else if(grid[y][x]=== 1){fill(10)}
        else if(grid[y][x]=== 2){fill("gray")}
        else if(grid[y][x]=== 3){fill("red")}
        else if(grid[y][x]=== 4){fill("green")}
        else if(grid[y][x]=== 5){fill("blue")}
        else if(grid[y][x]=== 6){fill("cyan")}
        else if(grid[y][x]=== 7){fill("purple")}
        else if(grid[y][x]=== 8){fill("yellow")}
        else if(grid[y][x]=== 9){fill("orange")}
        else if(grid[y][x]=== 10){fill("lightGray")}
        else if(grid[y][x]=== 11){fill("darkGray")}
        else if(grid[y][x]=== 12){fill("black")}
        else if(grid[y][x]=== 13){fill("black")}
        else if(grid[y][x]=== 14){fill("black")}
        else if(grid[y][x]=== 16){fill("random")}
      else fill(120);
      rect(x*cellSize, y*cellSize,  cellSize, cellSize);
    }
  }
  //drawCage();
}

function drawCage(){
  let dist = 8//the "gap" between lines
  stroke(0);
  noFill()
  strokeWeight(2)
  for (let y=0; y<gridSize; y+=dist) {
    for (let x=0; x<gridSize; x+=dist) {
    rect(x*(cellSize), y*(cellSize),  cellSize*dist, cellSize*dist);
    }
  }
  noStroke()
}

function mousePressed(){//change value in grid where the mouse currently is
  selectX = Math.floor(mouseX/cellSize);
  selectY = Math.floor(mouseY/cellSize);
  grid[selectY][selectX] = selectColorId;
}

function keyPressed(){
  if(keyCode>=48&&keyCode<=57){
    selectColorId =(keyCode-48)
    selectColor = fillColor(selectColorId)
  }
  if (key="e"){
    grid[selectY][selectX]=(0);
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
  else if(colorID === 1){ return(10)}
  else if(colorID === 2){ return("gray")}
  else if(colorID === 3){ return("red")}
  else if(colorID === 4){ return("green")}
  else if(colorID === 5){ return("blue")}
  else if(colorID === 6){ return("cyan")}
  else if(colorID === 7){ return("purple")}
  else if(colorID === 8){ return("yellow")}
  else if(colorID === 9){ return("orange")}
  else if(colorID === 10){ return("darkGray")}
  else if(colorID === 11){ return("lightGray")}
  else if(colorID === 12){ return("black")}
  else if(colorID === 13){ return("black")}
  else if(colorID === 14){ return("black")}
  else if(colorID === 16){ return("random")}
  else return(120);
}