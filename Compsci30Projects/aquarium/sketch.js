// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let creatures;
let bob;
let pic;
let octo;
let octoBody;
let octoArm;

function preload(){
  pic = loadImage('assets/bigbob.png');
  octoBody = loadImage('assets/challenger.gif');
  octoArm = loadImage('assets/bigbob.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i<40; i++){
    if (random(100) < 20){
      octo = new octopus(random(width/8), random(height/8, height-(height/8)), 70, octoBody, octoArm);
      creatures.push(octo)
    }

    else{
      bob = new Bigbob(random(width/8), random(height/8, height-(height/8)), 50, pic);
      creatures.push(bob)
    }
  }
  
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(20)
  for (let someCreature of creatures){
    someCreature.update();
    someCreature.display();
  }
}

class Creature {
  constructor(x,y,size){
    this.x=x;
    this.y=y;
    this.size=size;
  }

  update(){
    this.x += 4;
  }

  display(){
    fill('green');
    circle(this.x,this.y,this.size);
  }
}

class Bigbob extends Creature {
  constructor(x, y, size, bob){
    super(x,y,size);
    this.bob = pic;
  }

  display(){
    image(this.bob, this.x, this.y, this.size, this.size);
  }

  update(){
    this.x += random(0.1,3);
    this.y = noise((this.x+random(-0.5,0.5))/300)*height;
    if(this.x>width)(this.x=0)
  }
}

class octopus extends Creature{
  constructor(x, y, size, bodyImg, armImg){
    super(x,y,size);
    this.body=bodyImg;
    this.armSeg=armImg;
  }

  display(){
    //main body
    image(this.body, this.x, this.y, this.size, this.size);
  }

  update(){
    this.x += random(0.1,3);
    this.y = noise((this.x+random(-0.5,0.5))/300)*height;
    if(this.x>width)(this.x=0)
  }
}