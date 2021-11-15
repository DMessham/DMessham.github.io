// Project Title
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rngArray = [];

//let time = 0;

let rectNum = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let rectNum = width;
  generateTerrain();
}

function draw() {
  background(220);
  drawTerrain();
}

function generateTerrain(){
  let time = 0;
  //let rectNum = width;
  for(let i=0; i<rectNum; i++){
      let rngVal = noise(time)*height;
      rngArray.push(rngVal);
      time+=0.004;
  }
}
function drawTerrain(){
  let theWidth = width/rngArray.length
  for (let i=0; i<rectNum; i++){
    rngVal = rngArray[i];
    fill('black');
    rect(theWidth*i, height, 10, -rngVal);
  }
}