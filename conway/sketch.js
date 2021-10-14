// Conways game of life
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let refresh = 30//target framerate, used to calc realfps

let gridX = 60;
let gridY = 60;

let grid = []

let xSize = 0;
let ySize = xSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh);
  background(12,35,12);
  fill(18);
  stroke(128);
  xSize = width/gridX;
  ySize = height/gridY;
  grid = CreateArray(gridX,gridY,false);
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  displayGrid();
}

function mousePressed(){

  mouseGridX = Math.floor(mouseX/xSize)
  mouseGridY = Math.floor(mouseY/ySize)

  swap(mouseGridX, mouseGridY)
}

function rules(x,y,value){
  let neighbours = 0
  if (grid[x-1][y-1]){neighbours++};
  if (grid[x-1][y-1]){neighbours++}
  if (grid[x-1][y-1]){neighbours++}
  if (grid[x-1][y-1]){neighbours++}
  if (grid[x-1][y-1]){neighbours++}
}

function swap(x,y){

  if(x>=0 && x< gridX && y>=0 && y< grid)

  if(grid[x][y] === true){
    grid[x][y] = false;
  }
  else if(grid[x][y] === false){
    grid[x][y] = true;
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

function CreateRandom(row, col){
  let grid = [];
  for(let y=0; y<row; y++){
    grid.push([])
    for(let x=0; x<col; x++){
      if(random(10)<=5){
        grid[y].push(true);
      }
      else{grid[y].push(false);}
    }
  }
  return grid;
}


function keyPressed(){
  if(key==="e"){
    grid = CreateArray(gridX, gridY);
  }
  else if(key==="b"){
    grid = CreateArray(gridX, gridY, false);
  }
  else if(key==="b"){
    grid = CreateRandom(gridX, gridY);
  }
}

function displayGrid(){
  for(let y=0; y<gridY; y++){
    for(let x=0; x<gridX; x++){
      if(grid[x][y]){fill(20)}
      else{fill(120)}
      rect(x*xSize,y*ySize,xSize,ySize)
    }
  }
}