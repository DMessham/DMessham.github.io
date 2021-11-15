// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circleTimer, bgTimer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleTimer = new Timer(1000);
  bgTimer = new Timer(2500);
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20)

  if(bgTimer.isDone()){
    background('purple');
  }

  if(circleTimer.isDone()){
    fill("red");
    circle(width/2, height/2, 300)
  }
}

function mousePressed() {
  circleTimer.reset()
  bgTimer.reset()
}

class Timer {
  constructor(waitTime){
    this.startTime = millis();
    this.waitTime = waitTime;
  }

  isDone() {
    return millis() > this.waitTime + this.startTime;
  }

  timeRemaining(){
    return this.waitTime + this.startTime;
  }

  reset(){
    this.startTime = millis();
  }
}