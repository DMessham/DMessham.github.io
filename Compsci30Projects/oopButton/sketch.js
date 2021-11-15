// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bgButton
let shapeButton

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgButton = new Button(100,300,600,150, 'hi!', "green", 020, 35, 45,"white")
  shapeButton = new Button(350,650,200,150, 'AAAAAAAAAAAAAAAAA', "red", 240, 220, 200, "pink")
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background (20)
  bgButton.display()
  shapeButton.display()
}

class Button {
  constructor(x,y,buttonWidth, buttonHeight, text, accent, norm, hover, click, txtcolor) {
    this.x = x;
    this.y = y;
    this.width = buttonWidth;
    this.height = buttonHeight;
    this.normColor = norm
    this.edgeColor = accent
    this.hoverColor = hover
    this.clickColor = click
    this.text = text
    this.textColor = txtcolor
  }
  display(){
    if(this.isPointInButton(mouseX,mouseY)){
      if(mouseIsPressed){
        fill(this.clickColor);
      }
      else{fill(this.hoverColor);}
    }
    else{fill(this.normColor);}
    stroke(this.edgeColor)
    strokeWeight(3)
    rect(this.x,this.y,this.width,this.height)
    noStroke;
    textSize(this.height/4)
    fill(this.textColor)
    text(this.text,this.x+50,this.y+50,this.width-50,this.height-50)
  }
  isPointInButton(x,y){
    return( x>this.x && x<this.x+this.width && y>this.y && y<this.y+this.height)
  }
}