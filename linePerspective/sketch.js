// linePerspective
// Daniel Messham
// wed 29 sept 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;
let cSize = 5

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill('gray');
  noStroke;
}

function draw() {
  background(20);
  for(let x=0;x<width; x+=40){
    for(let y=0;y<height; y+=40){
      stroke('gray');
      circle(x,y, cSize);
      stroke('white');
      line(x,y,(width/3+x/3),(height/3+y/3));
    }
  }
}
