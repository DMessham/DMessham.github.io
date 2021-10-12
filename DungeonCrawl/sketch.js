// Dungeon crawl
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let refresh = 60//target framerate, used to calc realfps
let millisecond = 0;//initilaize debug values

let gridX = 100;
let gridY = 100;

let grid = []

let mouseGridX = 0
let mouseGridY = 0

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

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh);
  background(12,35,12);
  //noStroke()
  fill(168)
  colorMode(HSB);
  imageMode(CENTER);
  noSmooth();
  grid = CreateRandom2dArray(gridX,gridY);
  
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  noStroke()
  
}

function draw() {
  bg()
  
  displayGrid()
  frameDelta = frameCount//*deltaTime/1000

}

function mousePressed(){
  let xSize = width/gridX;
  //let ySize = height/gridY;
  let ySize = xSize;
  
  mouseGridX = Math.floor(mouseX/xSize)
  mouseGridY = Math.floor(mouseY/ySize)

  if(grid[MouseGridX][MouseGridY] === 1){
    grid[MouseGridX][MouseGridY] = 0;}
  if(grid[MouseGridX][MouseGridY] === 0){
    grid[MouseGridX][MouseGridY] = 1;}
}

function bg(){
  //background(bgHue, bgSat, bgBright);//redraw the bg to ensure that no trails happen
  background(12,35,12);
  // for (let x = 30; x < width-30; x += 30) {
  //   for (let y = 30; y < height-30; y += 30) {
  //     let bgEffect = 1+int(dist(x, y, player.x, player.y));
  //     colorMode(HSB);
  //     fill(bgHue,bgSat*2,bgBright*2,map(bgEffect,0,128,0.9,0.5));
  //     rect(x, y, 25);
  //   }
  // }
}

function CreateEmpty2dArray(row, col){
  let grid = [];
  for(let y=0; y<row; y++){
    grid.push([])
    for(let x=0; x<col; x++){
      grid[y].push(0);
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

function KeyIsPressed(){
  if(keyCode=83){
    CreateRandom2dArray(row,col);
    displayGrid();
  }
}

function displayGrid(){
  for(let y=0; y<gridY; y++){
    for(let x=0; x<gridX; x++){
      if (grid[y][x]===0){fill('white');}
      else if (grid[y][x]===1){fill('black');}
      rect(x*xSize, y*ySize, xSize,ySize);
    }
  }
}