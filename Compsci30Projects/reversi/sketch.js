// Conways game of life
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let refresh = 15//target framerate, used to calc realfps

let gridX = 8;
let gridY = gridX;

let grid = [[0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]];

let xSize = 10;
let ySize = xSize;

let autoPlay = false;

//let level = 1
let level1;

let grass;
let tile;
let wall;
let leaf;
let dirt;
let playerSprite;

let mouseGridX;
let mouseGridY;

let curPlayer = 'player1';
let turn = 0
let numPieces = 0

let player1 = {
  score:0,//player 1 score
  tiles:[[0,0],[8,8]]
};

let player2 = {
  score:0,//player 1 score
  tiles:[[8,0],[0,8]]
};

// class PlayerTiles{
//   constructor(x, y, newX, newY, color, size){
//     this.x = x;
//     this.y = y;
//     this.color = color;
//     this.size = size;
//   }
//   move(){

//   }
//   display(){
//     circle()
//   }
// }

function preload(){
  tile = loadImage('assets/paving1.png');
  wall = loadImage('assets/rock2.png');
  grass = loadImage('assets/grass1.png');
  leaf = loadImage('assets/leaves1.png');
  dirt = loadImage('assets/dirt1.png');
  player2 = loadImage('assets/player2.png');
  player1 = loadImage('assets/player1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh);
  background(12,35,12);
  fill(18);
  stroke(128);
  xSize = windowWidth/gridX;
  ySize = windowHeight/gridY;

}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(12,35,12);
  
  //nextTurn();
  if(turn%2==1){curPlayer = 'player2'}
  else{curPlayer = 'player1'};
  numInput()
  //playerMove(mouseGridX, mouseGridY, curPlayer)
  displayGrid();
}

function mousePressed(){//logic for finding what grid pos the mouse is on, and acting on the click
  mouseGridX = Math.floor(mouseX/xSize);
  mouseGridY = Math.floor(mouseY/ySize);
  console.log("clicked at X:"+mouseGridX + ", Y:" +mouseGridY)
  if(numPieces<=64){
    playerMove(mouseGridX, mouseGridY, curPlayer);
    numPieces++;
  }
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

function keyPressed(){
  
  if(key==="r"){
    grid = CreateArray(gridX, gridY, 0);
  }
  else if(key==="k"){
    saveMapJSON();
  }
  else if(key==="l"){
    loadJSON()
  }
}

function playerMove(newX,newY, player){
  //let oldX = player.x
  //let oldY = player.y
  //grid[oldY][oldX]=grid[y][x];
  if (grid[newY][newX]===0){
    //player.x = newX
    //player.y = newY
    //grid[oldY][oldX]=player.oldPos;
    //player.oldPos = grid[newY][newX];
    grid[newY][newX] = turn%2;
    
  }
  displayGrid()
}

function displayGrid() {
  for (let y=0; y<gridY; y++) {
    for (let x=0; x<gridX; x++) {
      fill('green');
      rect(x*xSize, y*ySize,  xSize, ySize)
      if (grid[y][x] === 0) {image(grass, x*xSize, y*ySize,  xSize, ySize);}//empty

      else if (grid[y][x] === 1) {image(player1, x*xSize, y*ySize,  xSize, ySize);}//Player1

      else if (grid[y][x] === 2) {image(player2, x*xSize, y*ySize,  xSize, ySize);}//player2

      else if (grid[y][x] === 3) {fill('yellow');rect(x*xSize, y*ySize,  xSize, ySize);}

      else if (grid[y][x] === 4) {image(path, x*xSize, y*ySize,  xSize, ySize);}

      mouseCursor(`green`)
    }
  }
}

function mouseCursor(mouseColor){
  noFill()
  stroke("black");
  strokeWeight(2)
  rect(mouseGridX*xSize+2, mouseGridY*ySize+2, xSize-4, ySize-4);
  stroke("white");
  strokeWeight(2)
  rect(mouseGridX*xSize-2, mouseGridY*ySize-2, xSize+4, ySize+4);
  strokeWeight(3)
  stroke(mouseColor);
  rect(mouseGridX*xSize, mouseGridY*ySize, xSize, ySize);
}

function saveMapJSON(){
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

class Piece{
  constructor(x, y, player) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.size = 10;
    this.xSize = xSize
    this.ySize = xSize
  }
  display() {
    noStroke();
    if(this.player===1){image(player1, x*xSize, y*ySize,  xSize, ySize);}
    else if(this.player===2){image(player2, x*xSize, y*ySize,  xSize, ySize);}
    else if(this.player===0){image(path, x*xSize, y*ySize,  xSize, ySize);}
    else{fill('yellow');rect(x*xSize, y*ySize,  xSize, ySize)}
    //circle(this.x,this.y,this.size);
    // imageMode(CENTER);
    //   Bimage(bImage, this.x, this.y, this.radius, this.radius)
  }
  move() {
    let choice = random(100);//choose direction
    if (choice < 25){//move up
      this.y-=this.speed;
    }
    else if (choice < 50){//move down
      this.y+=this.speed;
    }
    else if (choice < 75){//left
      this.x-=this.speed;
    }
    else {//right
      this.x+=this.speed;
    }
  }

}