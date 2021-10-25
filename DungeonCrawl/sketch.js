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

//let level = 1
let level1;

let tile
let wall
let grass
let leaf
let dirt
let playerSprite

let mouseGridX
let mouseGridY

let player = {
  x:1, //initial position
  y:2, //initial position
  score:0,//player 1 score
  race:0,
  itms:[0,0,0,0,0,0,0,0,0],
  hp:20,
  def:20,
  armorId:[0,0,0,0],
  atk:20,
  weaponId:0,
  level:1,
  xp:0,
};



function preload(){
  level1 = loadJSON("assets/terrain/lvl1.json");//assumes grid size is 30
  //level2 = loadJSON("assets/terrain/lvl2.json");//assumes grid size is 30
  worldSheet='';
  entitySheet='';
  guiSheet='';
  tile = loadImage('assets/paving1.png');
  wall = loadImage('assets/rock2.png');
  grass = loadImage('assets/grass1.png');
  leaf = loadImage('assets/leaves1.png');
  dirt = loadImage('assets/dirt1.png');
  playerSprite = loadImage('assets/gear.png');
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
  player.x = 1
  player.y = 1
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  
}

function levelSwitch(){

}

function draw() {
  background(12,35,12);
  //nextTurn();
  playerControl();
  displayGrid();
}

function mousePressed(){
  mouseGridX = Math.floor(mouseX/xSize);
  mouseGridY = Math.floor(mouseY/ySize);

  // if (grid[mouseGridY][mouseGridX] === 0) {
  //   grid[mouseGridY][mouseGridX] = 1;
  // }
  // else if (grid[mouseGridY][mouseGridX] === 1) {
  //   grid[mouseGridY][mouseGridX] = 0;
  // }
  //numInput()
}


// function nextTurn() {

// }

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
  if (keyIsDown(UP_ARROW)&&player.y>0){playerMove(player.x,player.y-1);}
  if (keyIsDown(DOWN_ARROW)&&player.y+1<gridY){playerMove(player.x,player.y+1);}
  if (keyIsDown(LEFT_ARROW)&&player.x>0){playerMove(player.x-1,player.y);}
  if (keyIsDown(RIGHT_ARROW)&&player.x+1<gridX){playerMove(player.x+1,player.y);}

  if (keyIsDown('w')){playerMove(player.x,player.y-1);}
  if (keyIsDown('s')){playerMove(player.x,player.y+1);}
  if (keyIsDown('a')){playerMove(player.x-1,player.y);}
  if (keyIsDown('d')){playerMove(player.x+1,player.y);}
  numInput()
}

function playerMove(newX,newY){
  let oldX = player.x
    let oldY = player.y
    if (grid[newY][newX]===0){
      player.x = newX
      player.y = newY
      grid[newY][newX] = 2;
      grid[oldY][oldX]=0
    }
    if (grid[newY][newX]===3){level++}
    displayGrid()
}

function displayGrid() {
  for (let y=0; y<gridY; y++) {
    for (let x=0; x<gridX; x++) {

      // if (grid[y][x] === 0) {fill(20);}//empty

      // if (grid[y][x] === 1) {fill(180);}//wall

      // if (grid[y][x] === 2) {fill(12,67,12);}//player
      // if (x === player.x&&y === player.y) {fill(12,67,12);}//player

      //rect(x*xSize, y*ySize,  xSize, ySize);
      if (grid[y][x] === 0) {image(grass, x*xSize, y*ySize,  xSize, ySize);}//empty

      if (grid[y][x] === 1) {image(leaf, x*xSize, y*ySize,  xSize, ySize);}//wall

      if (grid[y][x] === 2) {image(playerSprite, x*xSize, y*ySize,  xSize, ySize);}//player

      if (grid[y][x] === 3) {fill('yellow');rect(x*xSize, y*ySize,  xSize, ySize);}//goal

      if (x === player.x&&y === player.y) {image(playerSprite, x*xSize, y*ySize,  xSize, ySize);}//playe
      
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

function numInput(){
  mouseGridX = Math.floor(mouseX/xSize);
  mouseGridY = Math.floor(mouseY/ySize);
  if (mouseIsPressed){
    if(keyCode>=48&&keyCode<=57){
        grid[mouseGridY][mouseGridX]=(keyCode-48);
    }
  }
  return grid;
}