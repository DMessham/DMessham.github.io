//almost all of these variables will change from these values very quiclkly, these are only sensable starting points

//bonus: mouse interactivity- click to change color, 

let refresh = 30;//target framerate, used to calc realfps and for speed control
let startTime = 0;//initialize variable for timing based events

let x = 2; //initial position X
let y = 2; //initial position Y
let dx = 1; // speed Y
let dy = dx; //speed X

let speed = 1//combined speed modifier for horiz & vert

let sizex = 180; //initial size for x

let sizey = 90; //initial size for y

let bgHue=128;//Background color/hue
let bgSat=64;//Background saturation
let bgBright=32;//Background brightness

function preload(){
  img = loadImage('DVD2.png');//load dvd image(downscaled)
}

function setup() {//setup the canvas and prepare stuff
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
  sizex = windowWidth/10;
  sizey = sizex/2;
  x=10;
  y=10;
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
  image(img, x, y, sizex, sizey);//draw the logo
  move();//move the logo
}

function move(){//basic colllision logic

  if (x + sizex >= width || x <= 0){//change direction if the object is within size of the edge of x
    dx=-dx;//invert y direction
    x += dx*speed*round(deltaTime/((1/refresh)*915),2)
    tint(round(random(128,255)),round(random(128,192)),round(random(64,192)))//randomly tint the image
  }
  x += dx*speed*round(deltaTime/((1/refresh)*915));//increase x by dx every time the screen redraws
  
  if (y + sizey >= height || y <= 0){//change direction if the object is within size of the edge of y
    dy=-dy;//invert y direction
    y += dy*speed*round(deltaTime/((1/refresh)*915),2)
    tint(round(random(128,255)),round(random(128,192)),round(random(64,192)))//randomly tint the image
  }
  y += dy*speed*round(deltaTime/((1/refresh)*915));//move in y axis

  if(x>width+15 || x<-15 ||y>height+15 ||y<-15){//return to centre if outside bounds
    x=width/2;
    y=height/2
  }
}
function txtInfo(){
  fill(100)//set color for text
  textSize(20)//set text for general info
  text("Daniel Messham's JavaScript DVD Logo Bounce\nComp sci 30, S1, Monday october 4th, 2021",10,30);//information string used for author info)
  textSize(17)//set size for debug info
  text(("DEBUG/PERFORMANCE INFO\nPosition (X,Y): "+x+"/"+windowWidth+", "+y+"/"+windowHeight+'\nSpeed Mult:     '+speed+'\nCurrent FPS:   '+round((refresh/deltaTime)*30,2)+"fps\nTarget FPS:     "+refresh+'fps\nRendered:       '+frameCount+' Frames, '+round((millis()/1-startTime)/1000)+' Seconds\nCurrent Delta: '+round(deltaTime*1,2)+'ms\nTarget Delta:   '+round(((1/refresh)*1000),2)+'ms'),10,90);
}