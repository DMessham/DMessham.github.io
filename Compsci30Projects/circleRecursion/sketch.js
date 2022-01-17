// circle recursuion

let level = 0
let colors = ["white", "red", "blue", "green", 
						"purple", "cyan", "yellow",
						]

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20)
  
  recursiveCircle(width/2, height-10, level);
}
function recursiveCircle(x, diameter, level){
	fill(diameter);
	fill(colors[level])
	
	circle(x, height/2, diameter);
	if (diameter > 70 ) {
		level++
		recursiveCircle(x-0.25*diameter, diameter/2, level);//left
		recursiveCircle(x+0.25*diameter, diameter/2, level);//right
		
	}
}