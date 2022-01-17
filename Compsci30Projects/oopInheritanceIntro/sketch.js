// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let car

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = new Car("Civic")
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
}

class Vehicle {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  getName(){
    return this.name
  }

  getType(){
    return this.type
  }
}



class Car extends Vehicle {
  constructor(name){
    super(name, 'car');
  }

  getName(){
    return "this car is a: " + super.getName();
  }
}