// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let myBall;

let ballArray = []

function setup() {
  createCanvas(windowWidth, windowHeight);
 for (let i=0; i<200; i++){
   spawnBall();
 }
}

function draw() {
  background('black');
  spawnBall();
  for (let myball of ballArray){
    noStroke();
    myBall.x = noise(myBall.time)*width;
    myBall.y = noise(myBall.time+100)*height;
    fill(myBall.ballColor);
    circle(myBall.x, myBall.y, myBall.radius*2);
    myBall.time += 0.003;
  }
}

function spawnBall(){
  let myBall = {
    radius: random(10,30),
    x: random(width),
    y: random(height),
    time: random(1000,),
    ballColor: color(random(255),random(255),random(255))
  };
  ballArray.push(myBall)
}