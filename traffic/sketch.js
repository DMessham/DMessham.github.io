// Traffic Light
// Daniel Messham
// wed 29 sept 2021

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let switchTime = 0;//variable to hold last switch time

let trafficState = 'green';//variable to hold state, 2 = red, 1 = yellow, 0 = green

let redTime = 6000;
let greenTime = 6000;
let yellowTime = 3000;

function setup() {
  createCanvas(200, 300);
  //trafficState = green;
}

function draw() {
  background(255,255,255,125);
  drawOutlineOfLights();
  fill(12);
  text('Time:'+round(millis()), 10,20);
  text('Change:'+round(switchTime), width*(2/5),30);
  text(("State:"+trafficState), 10,34);
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(10);
  rect(width/2, height/2, 75, 200, 10);

  lightColor()
  //lights
  fill(255);
  if(trafficState==='green'){fill('green')}
  else{fill(30);}
  ellipse(width/2, height/2 - 65, 50, 50); //top

  if(trafficState==='yellow'){fill('yellow')}
  else{fill(30);}
  ellipse(width/2, height/2, 50, 50); //middle

  if(trafficState==='red'){fill('red')}
  else{fill(30);}
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function lightColor(){
  if(millis() > switchTime + redTime && trafficState===0){
    trafficState = 'red';
    switchTime = millis();
  }
  else if(millis() > switchTime + greenTime && trafficState===1){
    trafficState = 'green';
    switchTime = millis()
  }
  else if(millis() > switchTime + yellowTime && trafficState===2){
    trafficState = 'yellow';
    switchTime = millis()
  }
}