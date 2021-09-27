//almost all of these variables will change from these values very quiclkly, these are only sensable starting points

//TODO: Fix extreme slowdown on color shift

let refresh = 60//target framerate, used to calc realfps
let realFPS, runTime = 0, startTime = 0, millisecond = 0;
let debugString = "DEBUG/PERFORMANCE INFO\nERROR! cannot load collision!"; //basic debug info string
let performanceString = 'Error: unable to Display Debug info';//init string for displaying debug info
let infoString = "Daniel Messham's JavaScript DVD Logo Bounce\nComp sci 30, S1, Friday September 17th, 2021";//information string used for author info

let x0 = 200;
let y0 = 200; //initial position
let dx0 = 2;
let dy0 = 2; //speed

let speed = 1//combined speed modifier for horiz & vert

let sizeX0 = 175; //initial size for x(squares)
//let sizeXCg0 = 0 //size change for x(squares)

let sizeY0 = sizeX0/2; //initial size for y(squares)
//let sizeYCg0 = 0 //size change for y(squares)

let bgHue, bgSat, bgBright=128;//Background brightness

function preload(){
  img = loadImage('DVD2.png');
}

function setup() {
  startTime = millis();
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh)
  bgHue=(random(255));
  bgSat=randomGaussian(128,128);
  bgBright=randomGaussian(128,128);
  background(bgHue, bgSat, bgBright);
  strokeWeight(0);
  fill(168)
  colorMode(HSB);
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  background(bgHue, bgSat, bgBright);
  x0=200;
  y0= 200;
}

function keyPressed(){
  bgHue=(random(255));
  bgSat=randomGaussian(128,128);
  bgBright=randomGaussian(128,128);
  }

function mouseClicked(){
  speed=randomGaussian(1.5,1);
}

function draw() {
  
  background(bgHue, bgSat, bgBright);//redraw the bg to ensure that no trails happen
  txtInfo();//draw about info
  
  //fill(98,0.4);//collision box bg
  //rect(x0,y0,sizeX0, sizeY0);//draw the collision for the image
  image(img, x0, y0, sizeX0, sizeY0);//draw the image
  
  move();//move the logo
}

function move(){//basic colllision logic
    x0 += dx0*speed ;//increase x by dx every time the screen redraws
  
  if (x0 + sizeX0 >= width || x0 <= 0){//change direction if the object is within size of the edge of x
    dx0=-dx0;//invert direction
  tint(random(128,255),random(128,255),random(128,255))//randomly tint the image
  }
    y0 += dy0*speed ;//move in y axis
  
  if (y0 + sizeY0 >= height || y0 <= 0){//change direction if the object is within size of the edge of y
    dy0=-dy0;//invert direction
    tint(random(128,255),random(128,255),random(128,255))//randomly tint the image
  }
  if (x0 + sizeY0 + 1 >= mouseX && x0 -1 <= mouseX || y0 + sizeY0+1 >= mouseY && y0 -1 <= mouseY){
    
    
  }
}
function txtInfo(){
  
  realFPS = round((refresh/deltaTime)*20,2);//calculate frame rate using delta time(aka how long it took to draw the last frame)
  runTime = round((millis()-startTime)/1000);
  
  debugString = "DEBUG/PERFORMANCE INFO\nPosition (X,Y): "+round(x0,3)+", "+round(y0,3)+'\nSpeed:            '+speed; //basic debug info string
  
  performanceString = '\nCurrent FPS:   '+realFPS+"fps\nTarget FPS:     "+refresh+'fps\nRendered:       '+frameCount+' Frames, '+runTime+'Seconds\nCurrent Delta: '+deltaTime+'ms\nTarget Delta:   '+(1/refresh)*1000+'ms\nWhy does tinting anything slow everything down so much?'
  
  fill(100)//set color for text
  textSize(20)//set text for general info
  text((infoString),10,30);//print basic info to screen, have to redraw every time since i cant include it in the bg
  textSize(17)//set size for debug info
  text((debugString+performanceString),10,90);//print changing info to screen, have to redraw every time since it updates in real time
  
}