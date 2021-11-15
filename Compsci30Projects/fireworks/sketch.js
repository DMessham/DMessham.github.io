// firework
// Daniel Messham
// tue 2 nov 2021
//
// Extra for Experts:
// - 

let myParticle;

let fireworks = [];

function setup() {
  frameRate(30)
  createCanvas(windowWidth, windowHeight);
  //myParticle = new Particle(width/2, height/2);
}

function windowResized(){
  createCanvas(windowWidth*0.9, windowHeight*0.9);
}

function draw() {
  background("black");

  for (let i = fireworks.length-1; i >= 0; i--) {
    if (fireworks[i].isDead()) {
      fireworks.splice(i, 1);
    }
    else {
      fireworks[i].move();
      fireworks[i].display();
    }
  }
}

function mousePressed() {
  angleMode(DEGREES)
  let theta = 0;
  let maxFireCount = 100
  for (let i=0; i<maxFireCount; i++) {
    let dx = cos(theta + random(-2.5, 2.5)) * random(0.15,2.15);
    let dy = sin(theta + random(-2.5, 2.5)) * random(0.15,2.15);

    let myParticle = new Particle(mouseX, mouseY, dx, dy);
    fireworks.push(myParticle);

    theta += (360 / maxFireCount)
  }
}


class Particle {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = random(3, 7);
    this.alpha = 255;
    this.color = color(255, 0, 0, this.alpha);
    this.dx = dx
    this.dy = dy
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.size);
  }

  move() {
    this.alpha--;
    this.color = color(255, 0, 0, this.alpha);

    this.x += this.dx;
    this.y += this.dy;

    this.dy+=0.05;//gravity
  }

  isDead() {
    return this.alpha < 0;
  }
}
