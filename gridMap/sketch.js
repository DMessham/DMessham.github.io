// Conways game of life
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let refresh = 30//target framerate, used to calc realfps

let gridX = 60;
let gridY = 40;

let grid = []

let xSize = 0;
let ySize = xSize;

//standard object stats

let bgHue=(128);//Backgrond hue
let bgSat=(128);//Backgrond saturation
let bgBright=(18);//Background brightness


let levelObject = {
  x:3, //initial position
  y:3, //initial position
  texture:3, //inital speed X
  property:3, //inital speed Y
  ndx:1, //x collision
  ndy:1, //Y collision
  timeMult:0.7, // time based speed multiplyer
  size:15, //initial size
  sizeX:15,
  sizeY:15,
  index:0,
};

let player = {
  x:2, //initial position
  y:2, //initial position
  dx:30, //inital speed X
  dy:30, //inital speed Y
  ndy:5, //speed modifier X
  ndy:5, //speed modifier Y
  sizeX:17.5,
  sizeY:160, //initial size for x and y(squares)
  speed:1,//combined speed for horiz & vert
  score:0,//player 1 score
};


let enemy = {
  x:4, //initial position
  y:4, //initial position
  dx:60, //inital speed X
  dy:60, //inital speed X
  ndx:5, //speed modifier X
  ndy:5, //speed modifier Y
  type:100, // type
  difficulty:'very hard',
  sizeX:17.5,
  sizeY:160, //initial size for x and y(squares)
  speed:1,//combined speed for horiz & vert
  score:0,//score value
};

//standard object stats

function preload(){
  ding = loadSound('ding1.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh);
  background(12,35,12);
  //noStroke()
  fill(18)
  stroke(128)
  colorMode(HSB);
  imageMode(CENTER);
  noSmooth();
  xSize = width/gridX;
  ySize = height/gridY;
  grid = Create2dArray(gridX,gridY,false);
  ding.playMode('sustain');
  //displayGrid();
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  displayGrid();
}

function mousePressed(){
  //xSize = width/gridX;
  //ySize = height/gridY;
  //ySize = xSize;
  
  mouseGridX = Math.floor(mouseX/xSize)
  mouseGridY = Math.floor(mouseY/ySize)

  swap(mouseGridX, mouseGridY)
  //ding.play();
  displayGrid()
}


function swap(x,y){

  if(x>=0 && x< gridX && y>=0 && y< grid)

  if(grid[x][y] === true){
    grid[x][y] = false;
  }
  else if(grid[x][y] === false){
    grid[x][y] = true;
  }
  //ding.play();
}

function Create2dArray(row, col, value = true){
  let grid = [];
  for(let y=0; y<row; y++){
    grid.push([])
    for(let x=0; x<col; x++){
      grid[y].push(value);
    }
  }
  return grid;
}

function CreateRandom2dArray(row, col){
  let grid = [];
  for(let y=0; y<row; y++){
    grid.push([])
    for(let x=0; x<col; x++){
      if(random(10)<=5){
        grid[y].push(1);
      }
      else{grid[y].push(0);}
    }
  }
  return grid;
}

function keyPressed(){
  if(key==="e"){
    grid = Create2dArray(gridX, gridY);
  }
  else if(key==="b"){
    grid = Create2dArray(gridX, gridY, false);
  }
  else if(key==="r"){
    grid = CreateRandom2dArray(gridX, gridY);
  }
}

function displayGrid(){
  for(let y=0; y<gridY; y++){
    for(let x=0; x<gridX; x++){
      if (grid[x][y]===false){fill(10);}
      else if (grid[x][y]===true){fill(200);}
      rect(x*xSize, y*ySize, xSize,ySize);
    }
  }
}