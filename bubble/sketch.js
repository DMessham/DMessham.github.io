// Project Title
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];
//let bubble;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function mousePressed(){
  spawnBubble();
}

function spawnBubble(){
  let bubble = {
    x:random(width),
    y:height,
    raduis: random(20, 50),
    dx: 0,
    dy: -3,
    theColor: color(random(255),random(255),random(255)),
  };
  theBubbles.push(bubble);
}

function draw() {
  background(220);
  bubbleUp();
  displayBubble();
}

function bubbleUp(){
  for (let bubble of theBubbles){
  bubble.y += bubble.dy

  bubble.x += random(-5,5)}
}

function displayBubble(){
  for (let bubble of theBubbles){
  noStroke()
  fill(bubble.theColor)
  circle(bubble.x,bubble.y,bubble.raduis*2);}
}