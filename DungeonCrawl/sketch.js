// Conways game of life
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let refresh = 15//target framerate, used to calc realfps

let gridX = 30;
let gridY = gridX;

let grid = []

let xSize = 10;
let ySize = xSize;

let autoPlay = false;

let level1;

let player = {
  x:0, //initial position
  y:0, //initial position
  score:0,//player 1 score
  items:[1,0,0,0,0,0,0,0,0],
  health:20,
};



function preload(){
  level1 = loadJSON("assets/terrain/lvl1.json")//assumes grid size is 30
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh);
  background(12,35,12);
  fill(18);
  stroke(128);
  xSize = windowWidth/gridX;
  ySize = windowHeight/gridY;
  grid = level1;
  player.x = 0
  player.y = 0
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(12,35,12);
  //nextTurn();
  playerControl();
  displayGrid();
}

function mousePressed(){
  let mouseGridX = Math.floor(mouseX/xSize);
  let mouseGridY = Math.floor(mouseY/ySize);

  if (grid[mouseGridY][mouseGridX] === 0) {
    grid[mouseGridY][mouseGridX] = 1;
  }
  else if (grid[mouseGridY][mouseGridX] === 1) {
    grid[mouseGridY][mouseGridX] = 0;
  }
}


// function nextTurn() {
//   let newBoard = CreateArray(gridX, gridY, 0);

//   for (let y=0; y<gridY; y++) {
//     for (let x=0; x<gridX; x++) {
//       let neighbours = 0;

//       //look at all neighbours and count them
//       for (let i=-1; i<=1; i++) {
//         for (let j=-1; j<=1; j++) {
//           if (y+i>=0 && x+j>=0 && y+i<gridY && x+j<gridX) {
//             neighbours += grid[y+i][x+j];
//           }
//         }
//       }

//       //don't count yourself
//       neighbours -= grid[y][x];

//       //apply rules of game
//       if (grid[y][x] === 1) { //alive
//         if (neighbours === 2 || neighbours === 3) {
//           newBoard[y][x] = 1;
//         }
//         else {
//           newBoard[y][x] = 0;
//         }
//       }

//       if (grid[y][x] === 0) { //dead
//         if (neighbours === 3) {
//           newBoard[y][x] = 1;
//         }
//         else {
//           newBoard[y][x] = 0;
//         }
//       }
//     }
//   }
//   grid = newBoard;
// }

function swap(x,y){

  if(x>=0 && x< gridX && y>=0 && y< grid){
    if(grid[x][y] === 1){
      grid[x][y] = 0;
    }
    else if(grid[x][y] === 0){
      grid[x][y] = 1;
    }
  }
  displayGrid();
  return grid;
}

function CreateArray(row, col, value){
  xSize = windowWidth/gridX;
  ySize = windowHeight/gridY;
  let grid = [];
  for(let y=0; y<row; y++){
    grid.push([])
    for(let x=0; x<col; x++){
      grid[y].push(value);
    }
  }
  return grid;
}

function CreateRandom(row, col){
  xSize = windowWidth/gridX;
  ySize = windowHeight/gridY;
  let grid = [];
  for(let y=0; y<row; y++){
    grid.push([])
    for(let x=0; x<col; x++){
      if(random(100)<=50){
        grid[y].push(1);
      }
      else{grid[y].push(0);}
    }
  }
  return grid;
}


function keyPressed(){
  // if(key==="w"){
  //   playerMove(player.x,player.y-1);
  // }
  // else if(key==="s"){
  //   playerMove(player.x,player.y+1);
  // }
  // else if(key==="a"){
  //   playerMove(player.x-1,player.y);
  // }
  // else if(key==="d"){
  //   playerMove(player.x+1,player.y);
  // }
  
  if(key==="e"){
    grid = CreateArray(gridX, gridY, 1);
  }
  else if(key==="b"){
    grid = CreateArray(gridX, gridY, 0);
  }
  else if(key==="r"){
    grid = CreateRandom(gridX,gridY);
  }
  else if(key==="k"){
    saveJSON();
  }
  else if(key==="l"){
    loadJSON()
  }
}

function playerControl(){
  if (keyIsDown(UP_ARROW)){playerMove(player.x,player.y-1);}
  if (keyIsDown(DOWN_ARROW)){playerMove(player.x,player.y+1);}
  if (keyIsDown(LEFT_ARROW)){playerMove(player.x-1,player.y);}
  if (keyIsDown(RIGHT_ARROW)){playerMove(player.x+1,player.y);}

  if (keyIsDown('w')){playerMove(player.x,player.y-1);}
  if (keyIsDown('s')){playerMove(player.x,player.y+1);}
  if (keyIsDown('a')){playerMove(player.x-1,player.y);}
  if (keyIsDown('d')){playerMove(player.x+1,player.y);}
}

function playerMove(newX,newY){
  if (newX>0||newY>0||newX<gridX||newY<gridY){
    let oldX = player.x
    let oldY = player.y
    if (grid[newY][newX]===0){
      player.x = newX
      player.y = newY
      grid[newY][newX] = 2;
      grid[oldY][oldX]=0
    }
    displayGrid()
  }
}

function displayGrid() {
  for (let y=0; y<gridY; y++) {
    for (let x=0; x<gridX; x++) {
      if (grid[y][x] === 0) {fill(20);}//empty

      if (grid[y][x] === 1) {fill(180);}//wall

      if (grid[y][x] === 2) {fill(12,67,12);}//player
      if (x === player.x&&y === player.y) {fill(12,67,12);}//player

      rect(x*xSize, y*ySize,  xSize, ySize);
    }
  }
}


function saveJSON(){
  saveJSON(grid, "DMessham-gridJS-save.json");
}

function loadJSON(){
  let data = []
  
  grid = data
}