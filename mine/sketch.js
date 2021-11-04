// Minesweep
// Daniel Messham
// wed 3 nov
//
// Extra for Experts:
// - 
//todo: paintfill, proper grid fill

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

let difficultyMult = 0.255;
let maxMineCount = 35;

let clickCount=0;
let intClickCount=0;

function setup() {
  frameRate(10)
  maxMineCount = 15
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.99, windowWidth*0.99);
  }
  else {
    createCanvas(windowHeight*0.99, windowHeight*0.99);
  }
  cellSize = (width-2)/gridSize;

  initializeGrid()

  gameRun = true;
}

function initializeGrid(){
  initialGrid = CreateArray(gridSizeX, gridSizeY, 0)
  initialGrid = FillRandArray(initialGrid)

  grid = [];
  for(let y=0; y<gridSizeY; y++){
    grid.push([])
    for(let x=0; x<gridSizeX; x++){
      grid[y].push(0);
    }
  }
  intClickCount = 0
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

function CreateRandArrayOld(row, col){
  let Ngrid = [];
  for(let y=0; y<row; y++){
    Ngrid.push([])
    for(let x=0; x<col; x++){
      let rngVal = noise(x*(random(width)*difficultyMult), y*(random(height)*difficultyMult));
      Ngrid[y].push(round(rngVal-0.16));
    }
  }
  return Ngrid;
}

function FillRandArray(Ngrid){
  for(let n=0; n<maxMineCount; n++){
    let y = int(round(random(2,gridSizeY-1)));
    let x = int(round(random(2,gridSizeX-1)));
    if(x*y+ noise(random(width)*difficultyMult, random(height)*difficultyMult) > 2){
      Ngrid[y][x] = 1
    }
  }
  return Ngrid;
}

function displayGrid() {
  let totalMineCount = 0
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      strokeWeight(1);
      fillColor(grid[y][x]);
      if(grid[y][x]=== 0){//undescovered
        if(initialGrid[y][x]=== 1){fill("red"); totalMineCount ++}//mine
        else {fill(20)};//clear
      }
      else if(grid[y][x]=== 1){//discovered/clicked
        if (initialGrid[y][x]=== 0){fill(120)}//clear
        else {fill("orange")};//mine
      }
      else if(grid[y][x]=== 2){
        if(initialGrid[y][x]=== 1){fill("blue")}//flagged w/ mine
        else(fill("green"))//flagged and clear 
      }
      else fill(50);//dec
      rect((x*cellSize), (y*cellSize),  cellSize, cellSize);
      textAlign((CENTER));
        textSize(cellSize*0.75);
        fill(nearColor(nearbyMines(x,y)))
        text(nearbyMines(x,y), x*cellSize, y*cellSize,  cellSize, cellSize)

      if(grid[y][x]!=0 && initialGrid[y][x]!=1 ){//display numbers for neaby mine count
        textAlign((CENTER));
        textSize(cellSize*0.75);
        fill(nearColor(nearbyMines(x,y)))
        text(nearbyMines(x,y), x*cellSize, y*cellSize,  cellSize, cellSize)
      }
    }
  }
  if (totalMineCount === 0){gameWin()}
}


function mousePressed(){//change value in grid where the mouse currently is
  selectX = Math.floor(mouseX/cellSize);
  selectY = Math.floor(mouseY/cellSize);
  //grid[selectY][selectX] = selectColorId;
  if (grid[selectY][selectX]===0){
    grid[selectY][selectX] = 1
    paintBucket(selectX, selectY)
    intClickCount++
    clickCount++
  }
    if (initialGrid[selectY][selectX]===1 && intClickCount>1){
      gameOver(); 
    }
    else if (initialGrid[selectY][selectX]===1 && intClickCount<2){
      initializeGrid()
      intClickCount = 0

      mousePressed()
    }
}

function keyPressed(){
  if (key="e"){
    mousePressed()
  }
  if (key="f"){//flagging mines
    if (grid[selectY][selectX]===0){grid[selectY][selectX] = 2}
    else if (grid[selectY][selectX]===2){grid[selectY][selectX] = 0}
  }
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
  stroke('green');
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
  else return(20);
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
  fill('white');
  text("You Win!", (width/2)-40, (height/2)-20, 60);
}

function nearbyMines(x,y){
  let neighbours = 0;
  for (let i=-1; i<=1; i++) {
    for (let j=-1; j<=1; j++) {
      if ((y+i<gridSizeY && x+j<gridSizeX && y+i>=0 && x+j>=0) && (initialGrid[y+i][x+j]===1 || grid[y+i][x+j] === 1)){
        neighbours += initialGrid[y+i][x+j];
      }
    }
  }
  return neighbours;
}

function paintBucket(x, y){
  if(initialGrid[y][x]===0){
    for (let i=-1; i<=1; i++) {
      if ((y+i<gridSizeY &&  y+i>=0) && (initialGrid[y+i][x]===0 && grid[y+i][x] === 0)) {
        grid[y+i][x]=1
        paintBucket(x, y+i)
      }
    }
    for (let j=-1; j<=1; j++) {
      if ((x+j<gridSizeX && x+j>=0) && (initialGrid[y][x+j]===0 && grid[y][x+j] === 0)) {
        grid[y][x+j]=1
        paintBucket(x+j, y)
      }
    }
  }
}