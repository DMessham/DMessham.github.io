//almost all of these variables will change from these values very quiclkly, these are only sensable starting points

//bonus: mouse interactivity- click to change color, 

let refresh = 30;//target framerate, used to calc realfps and for speedRNG control
let startTime = 0;//initialize variable for timing based events

let logo = {
  x = 2, //initial position X
  y = 2, //initial position Y
  dy = 1, // speedRNG Y
  dx = 1, //speedRNG X
  speedRNG = 1,//combined speedRNG modifier for horiz & vert
  speedFPS = 1,//FPS based speed modifier
  sizeX = 180, //initial size for x
  sizeY = 90, //initial size for y
  }

let bgHue=128;//Background color/hue
let bgSat=64;//Background saturation
let bgBright=32;//Background brightness
let bgColor= color(128,64,16);

function preload(){
  img = loadImage('DVD2.png');//load dvd image(downscaled)
}

function setup() {//setup the canvas and prepare stuff
  startTime = millis();
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh)
  colorMode(HSB);
  background(bgColor);
  fill(168);
  smooth()
  logo.sizeX = windowWidth/8;
  logo.sizeY = logo.sizeX/2;
  logo.x=windowWidth/2;
  logo.y=windowHeight/2;
}

function windowResized(){//reset canvas on resize
  createCanvas(windowWidth, windowHeight);
  background(bgColor);
  logo.sizeX = windowWidth/8;
  logo.sizeY = logo.sizeX/2;
  logo.x=windowWidth/2;
  logo.y=windowHeight/2;
}

function keyPressed(){//randomize background color on keypress
  bgHue=(random(255));
  bgSat=randomGaussian(128,64);
  bgBright=randomGaussian(65,64);
  bgColor=color( (random(255)), (randomGaussian(128,64)), (randomGaussian(65,64)) );
}

function mouseClicked(){//randomize speedRNG multiplication on click
  logo.speedRNG=round(randomGaussian(1.5,1),2);
}

function draw() {
  background(bgColor);//redraw the bg to ensure that no trails happen
  txtInfo();//draw about info
  image(img, logo.x, logo.y, logo.sizeX, logo.sizeY);//draw the logo
  move();//move the logo
}

function move(){//basic colllision logic
  logo.speedFPS = round(deltaTime/((1/refresh)*915),2);

  if (logo.x + logo.sizeX + logo.speedRNG + logo.speedFPS >= width || logo.x <= 0){//change direction if the object is within size of the edge of x
    logo.dx=-logo.dx;//invert y direction
    logo.x += logo.dx*logo.speedRNG*logo.speedFPS;
    tint(round(random(128,255)),round(random(128,192)),round(random(64,192)));//randomly tint the image
  }
  logo.x += logo.dx*logo.speedRNG*round(deltaTime/((1/refresh)*915));//increase x by dx every time the screen redraws
  
  if (logo.y + logo.sizeY + logo.speedRNG + logo.speedFPS >= height || y <= 0){//change direction if the object is within size of the edge of y
    logo.dy=-logo.dy;//invert y direction
    logo.y += logo.dy*logo.speedRNG*round(deltaTime/((1/refresh)*915),2)
    tint(round(random(128,255)),round(random(128,192)),round(random(64,192)));//randomly tint the image
  }
  logo.y += logo.dy*logo.speedRNG*round(deltaTime/((1/refresh)*915));//move in y axis

  if(logo.x>width+15 || logo.x<-15 ||logo.y>height+15 ||y<-15){//return to centre if outside bounds
    logo.x=width/2;
    logo.y=height/2;
  }
}
function txtInfo(){
  fill(100)//set color for text
  textSize(20)//set text for general info
  text("Daniel Messham's JavaScript DVD Logo Bounce\nComp sci 30, S1, Monday october 4th, 2021",10,30);//information string used for author info)
  textSize(17)//set size for debug info
  text(("DEBUG/PERFORMANCE INFO\nPosition X    : "+logo.x+"/"+windowWidth+",\nPosition Y    : "+logo.y+"/"+windowHeight+'\nRNG,FPS SpeedMult: '+logo.speedRNG+", "+'\nCurrent FPS:   '+round((refresh/deltaTime)*30,2)+"fps\nTarget FPS:     "+refresh+'fps\nRendered:       '+frameCount+' Frames, '+round((millis()/1-startTime)/1000)+' Seconds\nCurrent Delta: '+round(deltaTime*1,2)+'ms\nTarget Delta:   '+round(((1/refresh)*1000),2)+'ms'),10,90);
}