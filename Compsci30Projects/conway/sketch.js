// Conways game of life
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let refresh = 30//target framerate, used to calc realfps

let gridX = 70;
let gridY = gridX;

let grid = []

let xSize = 10;
let ySize = xSize;

let autoPlay = false;

let gun;


function preload(){
  //gun = loadJSON("/assets/Save/gospergun.json")//assumes grid size is 70
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh);
  background(12,35,12);
  fill(18);
  stroke(128);
  xSize = windowWidth/gridX;
  ySize = windowHeight/gridY;
  grid = CreateRandom(gridX,gridY);
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(12,35,12);
  if(autoPlay){
    nextTurn();
  }
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


function nextTurn() {
  let newBoard = CreateArray(gridX, gridY, 0);

  for (let y=0; y<gridY; y++) {
    for (let x=0; x<gridX; x++) {
      let neighbours = 0;

      //look at all neighbours and count them
      for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
          if (y+i>=0 && x+j>=0 && y+i<gridY && x+j<gridX) {
            neighbours += grid[y+i][x+j];
          }
        }
      }

      //don't count yourself
      neighbours -= grid[y][x];

      //apply rules of game
      if (grid[y][x] === 1) { //alive
        if (neighbours === 2 || neighbours === 3) {
          newBoard[y][x] = 1;
        }
        else {
          newBoard[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) { //dead
        if (neighbours === 3) {
          newBoard[y][x] = 1;
        }
        else {
          newBoard[y][x] = 0;
        }
      }
    }
  }
  grid = newBoard;
}

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
  if(key==="e"){
    grid = CreateArray(gridX, gridY, 1);
  }
  else if(key==="b"){
    grid = CreateArray(gridX, gridY, 0);
  }
  else if(key==="r"){
    grid = CreateRandom(gridX,gridY);
  }
  else if(key===" "){
    nextTurn();
  }
  else if(key==="p"){
    autoPlay=!autoPlay
  }
  else if(key==="k"){
    saveCsv("DMessham-JSconway.csv", grid)
  }
  else if(key==="l"){
    load()
  }
  else if(key==="1"){
    grid = gun;
  }
}

function displayGrid() {
  for (let y=0; y<gridY; y++) {
    for (let x=0; x<gridX; x++) {
      if (grid[y][x] === 0) {fill(20);}

      if (grid[y][x] === 1) {fill(180);}

      rect(x*xSize, y*ySize,  xSize, ySize);
    }
  }
}


function saveJSON(){
  saveJSON(grid, "DMessham-conway-save.json");
}

function loadJSON(){
  let data = []
  
  grid = data
}

function saveCsv(filename, rows) {//based off example from stack overflow https://stackoverflow.com/a/29304414
  // Example data given in question text
  var data = grid

  // Building the CSV from the Data two-dimensional array
  // Each column is separated by ";" and new line "\n" for next row
  var csvContent ='';
  data.forEach(function(infoArray, index) {
    dataString = infoArray.join(',');
    csvContent += index < data.length ? dataString + '\n' : dataString;
  });

  // The download function takes a CSV string, the filename and mimeType as parameters
  // Scroll/look down at the bottom of this snippet to see how download is called
  var download = function(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';

    if (navigator.msSaveBlob) { // IE10
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
  }

  download(csvContent, 'dowload.csv', 'text/csv;encoding:utf-8');
}

function loadCSV(){
  let data = []
  
  grid = data
}