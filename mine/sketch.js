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

let grid = [];

let initialGrid = [];

let cellSize;

let selectX = 0
let selectY = 0

let selectColorId = 0
let selectColor

let difficultyMult = 0.085

function setup() {
  frameRate(10)
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.99, windowWidth*0.99);
  }
  else {
    createCanvas(windowHeight*0.99, windowHeight*0.99);
  }

  cellSize = (width-2)/gridSize;

  initialGrid = CreateRandArray(gridSizeX, gridSizeY, 0, 1)

  grid = [];
  for(let y=0; y<gridSizeY; y++){
    grid.push([])
    for(let x=0; x<gridSizeX; x++){
      grid[y].push(0);
    }
  }

  gameRun = true;
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
  if(gameRun){
    background(200);
    fillColor()
    displayGrid();
    control();
  }
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
      let rngVal = noise(x*(millis()*difficultyMult), y*(millis()*difficultyMult));
      grid[y].push(round(rngVal-0.15));
    }
  }
  return grid;
}

function displayGrid() {
  let totalMineCount = 0
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      strokeWeight(1);
      fillColor(grid[y][x]);
      if(grid[y][x]=== 0){//undescovered
        if(initialGrid[y][x]=== 1){fill("red"); totalMineCount ++}//mine
        else(fill(50));//safe
      }
      else if(grid[y][x]=== 1){//discovered/clicked
        if (initialGrid[y][x]=== 1){fill("orange")}//mines found
        else {fill(120)};//clear
      }
      else if(grid[y][x]=== 2){
        if(initialGrid[y][x]=== 1){fill("blue")}//flagged w/ mine
        else(fill("green"))//flagged and clear 
      }
      else fill(120);//just in case
      rect(x*cellSize, y*cellSize,  cellSize, cellSize);
      if(grid[y][x]=== 1){//display numbers for neaby mine count
        textAlign((CENTER));
        fill(nearColor(nearbyMines(x,y)))
        text(nearbyMines(x,y), x*cellSize, y*cellSize,  cellSize, cellSize)
      }
    }
  }
  //if (totalMineCount === 0){gameWin()}
}


function mousePressed(){//change value in grid where the mouse currently is
  selectX = Math.floor(mouseX/cellSize);
  selectY = Math.floor(mouseY/cellSize);
  //grid[selectY][selectX] = selectColorId;
  if (grid[selectY][selectX]===0){
    grid[selectY][selectX] = 1
    paintBucket(selectX, selectY)
  }
    if (initialGrid[selectY][selectX]===1){
      grid[selectY][selectX] = 1; gameOver(); 
    }
}

function keyPressed(){
  if(keyCode>=48&&keyCode<=57){
    selectColorId =(keyCode-48)
    selectColor = fillColor(selectColorId)
  }
  if (key="e"){
    grid[selectY][selectX]=(0);
  }
  if (key=" "){//flagging mines
    if (grid[selectY][selectX]===0){grid[selectY][selectX] = 2}
    else if (grid[selectY][selectX]===2){grid[selectY][selectX] = 0}
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

function fillColor(colorID){//for mouse pointer, cursor preview and cheats
  if(colorID === 0){return(240)}//empty
  else if(colorID === 1){ return("red")}//empty w/ mine
  else if(colorID === 2){ return(120)}//discovered
  else if(colorID === 3){ return("green")}//flagged empty
  else if(colorID === 4){ return("blue")}//flagged w/ mine
  else if(colorID === 5){ return("orange")}//mines detonated
  else return(120);
}

function nearColor(count){//define text color for nraby mines on discovored but empty tiles
  if(count === 0){return(0,0,0,0)}//no mines nearby
  else if(count === 1){ return("blue")}
  else if(count === 2){ return("cyan")}
  else if(count === 3){ return("green")}
  else if(count === 4){ return("lime")}
  else if(count === 5){ return("yellow")}
  else if(count === 6){ return("orange")}
  else if(count === 7){ return("darkRed")}
  else return(120);
}

function gameOver(){
  fill('red');
  gameRun = false;
  rect(0,0,width,height);
  fill('white');
  text("You Died!", (width/2)-40, (height/2)-20, 60);
}

function gameWin(){
  fill('green')
  gameRun = false;
  rect(0,0,width,height)
  text("You Win!", (width/2)-40, (height/2)-20, 60);
}

function nearbyMines(x,y){
  let neighbours = 0;
  for (let i=-1; i<=1; i++) {
    for (let j=-1; j<=1; j++) {
      if (( (y+i===1 && x+j===1) || (y+i===4 && x+j===4) ) && y+i<gridSizeY && x+j<gridSizeX) {
        neighbours += initialGrid[y+i][x+j];
      }
    }
  }
  return neighbours;
}

function paintBucket(x, y){
  for (let i=-3; i<=3; i++) {
    for (let j=-3; j<=3; j++) {
      if (( grid[y+i][x+j]===0 && initialGrid[y+i][x+j]===0 ) && (y+i<gridSizeY && x+j<gridSizeX)) {
        grid[y+i][x+j]=1
      }
    }
  }

}