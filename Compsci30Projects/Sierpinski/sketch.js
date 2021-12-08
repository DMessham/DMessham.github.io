// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let depth=10
let colors=["white","green","blue","red","cyan","yellow","magenta","orange",'purple']
let triangleVerticies;
function setup() {
  createCanvas(windowWidth, windowHeight);
  triangleVerticies = [
	{x:width/2, y:0},
	{x:0, y:height},
	{x:width, y:height},
  ]
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  triangleVerticies = [
	{x:width/2, y:0},
	{x:0, y:height},
	{x:width, y:height},
  ]
}

function mousePressed(){
	
}

function draw() {
	noStroke()
  background(20);
  sierpinski(triangleVerticies, depth);
}

function sierpinski(points, depth) {
	fill(colors[depth%9])
    triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y)
	//exit condition
	if(depth>0){
		//pattern
		sierpinski([points[0], 
			getMidpoint(points[0], points[1]), 
			getMidpoint(points[0], points[2])],
			depth-1);
		sierpinski([points[1], 
			getMidpoint(points[0], points[1]), 
			getMidpoint(points[1], points[2])],
			depth-1);
		sierpinski([points[2], 
			getMidpoint(points[0], points[2]), 
			getMidpoint(points[1], points[2])],
			depth-1);
	}
}

function getMidpoint(point1, point2){
  let xMid = (point1.x + point2.x)/2;
  let yMid = (point1.y + point2.y)/2;
  return {x: xMid, y: yMid};
}