// Minesweep
// Daniel Messham
// fri 5 nov
//

// NOTE: the rng for the grid is kinda wonky, i made it so your first clickwill regen the grid if it is a mine
let gridSizeX = 32;
let gridSizeY = 32;
let gridSize = (gridSizeX+gridSizeY)/2;

let grid = [];

let mineGrid = [];

let cellSize;

let selectX = 0
let selectY = 0

let selectColorId = 0
let selectColor;

let clickCount=0;
let intClickCount=0;

let clearCount = 0
let totalCount = gridSizeX*gridSizeY

function setup() {
  frameRate(7)
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
  mineGrid = CreateArray(gridSizeX, gridSizeY, 0)
  //mineGrid = FillRandArray(mineGrid)
  mineGrid = CreateRandArray(gridSizeX, gridSizeY)

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
      totalCount++;
    }
  }
  return grid;
}

function CreateRandArray(row, col){
  let mineGrid = [];
  for(let y=0; y<row; y++){
    mineGrid.push([])
    for(let x=0; x<col; x++){
      mineGrid[y].push(0);
    }
  for(let y=0; y<row; y++){
    mineGrid.push([])
    for(let x=0; x<col; x++){
      let rngVal = noise(width*(random(width)*0.007), height*(random(height)*0.007));//why is semi predictable rng so hard, i can get why true rng is, but AAAAAAAAAAAAA
      mineGrid[y].push(round(rngVal-0.053));
      if (mineGrid[y][x]===1){totalCount--}
      }
    }
  }
  return mineGrid;
}

function FillRandArray(Ngrid){
  for(let n=0; n<160; n++){
    let y = int(round(random(0,gridSizeY-1)));
    let x = int(round(random(0,gridSizeX-1)));
    if(x*y+ noise(random(width)*difficultyMult, random(height)*difficultyMult) > 1){
      Ngrid[y][x] = 1
    }
  }
  return Ngrid;
}

function displayGrid() {
  let totalMineCount = 0 //for alt win condition
  let clearCount = 0
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      stroke(90)
      strokeWeight(3);
      if(grid[y][x]=== 0){//undiscovered
        if(mineGrid[y][x]=== 1){fill(65); totalMineCount++; stroke(30)}//mine
        else {fill(10)};//clear
      }
      else if(grid[y][x]=== 1 && mineGrid[y][x]=== 0){fill(120); clearCount++}//cleared

      else if(grid[y][x]=== 2){fill("green");}//flags
      else fill(50);

      rect(x*cellSize, y*cellSize, cellSize,cellSize)
      
      if(grid[y][x]===1 && mineGrid[y][x]===0 && nearbyMines(x,y)>0){//display numbers for neaby mine count
        textAlign(CENTER);
        textSize(cellSize*0.75);
        fill(nearColor(nearbyMines(x,y)))
        text(nearbyMines(x,y), (x*cellSize)+2, (y*cellSize)+2,  (cellSize)-1)
      }
    }
  }
  if (totalMineCount === 0){gameWin()}// win condition, flagging all mines w/ any key
  if (clearCount + totalMineCount === totalCount){gameWin()} //this alt win conditon doesnt work, and i dont have enough time nor energy to care, i wanted it to be a win if you cleared all the mines out, ill just say theres some LORE reason that they all must be marked
}


function mousePressed(){//change value in grid where the mouse currently is
  click()
}

function click(){
  selectX = Math.floor(mouseX/cellSize);
  selectY = Math.floor(mouseY/cellSize);
  //grid[selectY][selectX] = selectColorId;
  if (grid[selectY][selectX]===0){
    grid[selectY][selectX] = 1
    paintBucket(selectX, selectY)
    intClickCount++
    clickCount++
  }
    if (mineGrid[selectY][selectX]===1 && intClickCount>1){
      gameOver(); 
    }
    else if (mineGrid[selectY][selectX]===1 && intClickCount<2){//prevent death on first click
      initializeGrid()
      intClickCount = 0

      click()
    }
}

function keyPressed(){
  if (grid[selectY][selectX]===0){grid[selectY][selectX] = 2}
  else if (grid[selectY][selectX]===2){grid[selectY][selectX] = 0}
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
  stroke("white");
  strokeWeight(2)
  gameRun = false;
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      if(mineGrid[y][x]=== 1){
        rect(x*cellSize, y*cellSize, cellSize,cellSize)
      }
    }
  }
  strokeWeight(4)
  rect(width/2-60, height/2-35, 100, 80)
  noStroke()
  textSize(20)
  fill('white');
  text("You Died!", (width/2)-40, (height/2)-20, 60)
}

function gameWin(){
  fill('green');
  stroke("white");
  strokeWeight(4)
  rect(width/2-60, height/2-35, 100, 80)
  fill('white');
  text("You Win!", (width/2)-40, (height/2)-20, 60);
}

function nearbyMines(x,y){
  let neighbours = 0;
  for (let i=-1; i<=1; i++) {
    for (let j=-1; j<=1; j++) {
      if ((y+i<gridSizeY && x+j<gridSizeX && y+i>=0 && x+j>=0) && (mineGrid[y+i][x+j]===1 || grid[y+i][x+j] === 1)){
        neighbours += mineGrid[y+i][x+j];
      }
    }
  }
  return neighbours;
}

function paintBucket(x, y){
  if(mineGrid[y][x]===0){
    for (let i=-1; i<=1; i++) {
      if ((y+i<gridSizeY &&  y+i>=0) && (mineGrid[y+i][x]===0 && grid[y+i][x] === 0)) {
        grid[y+i][x]=1
        paintBucket(x, y+i)//i know there are propbably better ways to do this that i didnt think of
        
      }
    }
    for (let j=-1; j<=1; j++) {
      if ((x+j<gridSizeX && x+j>=0) && (mineGrid[y][x+j]===0 && grid[y][x+j] === 0)) {
        grid[y][x+j]=1
        paintBucket(x+j, y)
      }
    }
  }
}