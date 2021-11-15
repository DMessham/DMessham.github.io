// oop walker
// daniel messham

let kayaan;
let nick;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kayaan = new Walker(width/2, height/2, "red");
  nick = new Walker(140, 120, "blue");
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  kayaan.move()
  nick.move()

  kayaan.display();
  nick.display();
}

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 10;
    this.size = 10;
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.size);
  }
  move() {
    let choice = random(100);//choose direction
    if (choice < 25){//move up
      this.y-=this.speed;
    }
    else if (choice < 50){//move down
      this.y+=this.speed;
    }
    else if (choice < 75){//left
      this.x-=this.speed;
    }
    else {//right
      this.x+=this.speed;
    }
  }

}