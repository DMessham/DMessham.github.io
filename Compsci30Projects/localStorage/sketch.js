// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let clickCount = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  clickCount++
  if (clickCount > getItem("highestClick")){
    storeItem("highestClick", clickCount)
  }
}

function draw() {
  background(220)
  textSize(72)
  fill("black")
  text(clickCount, width/2, height/2)

  textSize(36)
  fill("red")
  text(getItem("highestClick"), width/2, height/4)
}