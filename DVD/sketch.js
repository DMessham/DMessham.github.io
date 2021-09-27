//almost all of these variables will change from these values very quiclkly, these are only sensable starting points

//TODO: Fix extreme slowdown on color shift

let refresh = 30;//target framerate, used to calc realfps
let startTime = 0;

let x0 = 2;
let y0 = 2; //initial position
let dx0 = 1;
let dy0 = dx0; //speed

let speed = 1//combined speed modifier for horiz & vert

let sizeX0 = 180; //initial size for x(squares)
//let sizeXCg0 = 0 //size change for x(squares)

let sizeY0 = 90; //initial size for y(squares)
//let sizeYCg0 = 0 //size change for y(squares)

let bgHue=128;//Background color/hue
let bgSat=64;//Background saturation
let bgBright=32;//Background brightness

function preload(){
  //img = loadImage('DVD2FULL.png');//load dvd image(fullsize,laggy af)
  img = loadImage('DVD2.png');//load dvd image(downscaled)
}

function setup() {
  startTime = millis();
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh)
  colorMode(HSB);
  background(bgHue, bgSat, bgBright);
  fill(168);
  smooth()
}

function windowResized(){//reset canvas on resize
  createCanvas(windowWidth, windowHeight);
  background(bgHue, bgSat, bgBright);
  sizeX0 = windowWidth/10;
  sizeY0 = sizeX0/2;
  x0=10;
  y0=10;
}

function keyPressed(){//randomize background color on keypress
  bgHue=(random(255));
  bgSat=randomGaussian(128,64);
  bgBright=randomGaussian(65,64);
}

function mouseClicked(){//randomize speed multiplication on click
  speed=round(randomGaussian(1.5,1),2);
}

function draw() {
  background(bgHue, bgSat, bgBright);//redraw the bg to ensure that no trails happen
  txtInfo();//draw about info
  image(img, x0, y0, sizeX0, sizeY0);//draw the image
  move();//move the logo
}

function move(){//basic colllision logic

  if (x0 + sizeX0 >= width || x0 <= 0){//change direction if the object is within size of the edge of x
    dx0=-dx0;//invert y direction
    x0 += dx0*speed*round(deltaTime/((1/refresh)*915),2)
    tint(round(random(128,255)),round(random(128,192)),round(random(64,192)))//randomly tint the image
  }
  x0 += dx0*speed*round(deltaTime/((1/refresh)*915));//increase x by dx every time the screen redraws
  
  if (y0 + sizeY0 >= height || y0 <= 0){//change direction if the object is within size of the edge of y
    dy0=-dy0;//invert y direction
    y0 += dy0*speed*round(deltaTime/((1/refresh)*915),2)
    tint(round(random(128,255)),round(random(128,192)),round(random(64,192)))//randomly tint the image
  }
  y0 += dy0*speed*round(deltaTime/((1/refresh)*915));//move in y axis

  if(x0>width+15 || x0<-15 ||y0>height+15 ||y0<-15){//return to centre if outside bounds
    x0=width/2;
    y0=height/2
  }
}
function txtInfo(){
  fill(100)//set color for text
  textSize(20)//set text for general info
  text("Daniel Messham's JavaScript DVD Logo Bounce\nComp sci 30, S1, Monday September 27th, 2021",10,30);//information string used for author info)
  textSize(17)//set size for debug info
  text(("DEBUG/PERFORMANCE INFO\nPosition (X,Y): "+x0+"/"+windowWidth+", "+y0+"/"+windowHeight+'\nSpeed Mult:     '+speed+'\nCurrent FPS:   '+round((refresh/deltaTime)*30,2)+"fps\nTarget FPS:     "+refresh+'fps\nRendered:       '+frameCount+' Frames, '+round((millis()/1-startTime)/1000)+' Seconds\nCurrent Delta: '+round(deltaTime*1,2)+'ms\nTarget Delta:   '+round(((1/refresh)*1000),2)+'ms'),10,90);
}