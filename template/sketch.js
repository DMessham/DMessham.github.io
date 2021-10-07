// Project Title
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  noStroke();
  fill(50);
  colorMode(HSB);
}

function draw() {
  background(220);
  for (let y = 2; y < windowHeight; y += 30) {
    for (let x = 0; x < windowWidth; x += 30) {
      let bgEffect = int(dist(x, y, mouseX, mouseY));
      //fill(bgHue,bgSat,bgBright*2,map(bgEffect,0,128,0.9,0.5));
      //fill(random(128), noise(y,x,millis()/600)+1*128, map(bgEffect,0,128,0.9,0.1));
      fill(noise(x,y,frameCount()/40))
      rect(x, y, 27.5, 27.5, 2);
    }
  }
  fill(60);
  rect(mouseX,mouseY,100,50)
}
