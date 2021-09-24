// Pong
// Daniel Messham
// fri 24 sept
//
//TODO: Fix wonky ai
import("d:/GIT/CLONE/Dmessham.github.io/pong/node_modules/@types/p5/index.d.ts")
let refresh = 50//target framerate, used to calc realfps
let targetDelta = 33.3
let startTime, millisecond = 0;//initilaize debug values

let x0 = 400; 
let y0 = 300; //initial position
let dx0 = -3;
let dy0 = 3; //inital speed
let ndx0 = 1;
let ndy0 = 1; //speed modifier

let sizeX0,sizeY0,size0 = 15; //initial size
let speed0 = 1//combined speed for horiz & vert

let x1 = 50; 
let y1 = 200; //initial position
let dx1, dy1 = 30; //inital speed
let ndx1, ndy1 = 5 //speed modifier

let sizeX1 = 17.5;
let sizeY1 = 160; //initial size for x and y(squares)
let speed1 = 1;//combined speed for horiz & vert

let x2 = 750; 
let y2 = 200; //initial position
let dx2, dy2 = 60; //inital speed
let ndx2, ndy2 = 5; //speed modifier

let sizeX2 = 17.5;
let sizeY2 = 160; //initial size for x and y(squares)
let speed2 = 1;//combined speed for horiz & vert

//player stats for game
let player1Score = 0
let player2Score = 0

//standard object stats

let bgHue=(128);//Backgrond hue
let bgSat=(128);//Backgrond saturation
let bgBright=(18);//Background brightness


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh)
  background(12,35,12);
  strokeWeight(0);
  fill(168)
  colorMode(HSB);
  imageMode(CENTER);
  noSmooth();
  startTime = millis();
  ndx0 = dist(0,0,windowWidth,windowHeight)/930;
  ndy0 = dist(0,0,windowWidth,windowHeight)/930;
  speedX1 = dist(0,0,windowWidth,windowHeight)/140;
  speedY1 = dist(0,0,windowWidth,windowHeight)/140;
  x2 = windowWidth-50;
  sizeY1 = windowHeight/6;
  sizeY2 = windowHeight/6;
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  ndx0 = dist(0,0,windowWidth,windowHeight)/930;
  ndy0 = dist(0,0,windowWidth,windowHeight)/730;
  speedX1 = dist(0,0,windowWidth,windowHeight)/140;
  speedY1 = dist(0,0,windowWidth,windowHeight)/140;
  x2 = windowWidth-50;
  sizeY1 = windowHeight/10;
  sizeY2 = windowHeight/10;
}

function mouseClicked(){
  //speed0 = 1; //right now speed modifier is the same between x and y, that might change if i want to reuse this code elsewhere
  //speed0=randomGaussian(1.5,1);
}

function draw() {
  bg()
  
  txtInfo();
  hud();
  move();
  
  fill(98,0.4);//
  rect(x1-sizeX1,y1,sizeX1, sizeY1);//draw player paddle
  
  fill(98,0.4);//
  rect(x2,y2,sizeX2, sizeY2);//draw ai paddle
  
  circle(x0,y0,size0*2);//draw the circle
  
  frameDelta = frameCount//*deltaTime/1000
}
  
function bg(){
  background(bgHue, bgSat, bgBright);//redraw the bg to ensure that no trails happen
  for (let x = 0; x < width; x += 34) {
    for (let y = 0; y < height; y += 34) {
      let bgEffect = int(dist(x, y, x0, y0));
      colorMode(HSB);
      fill(bgHue,bgSat*2,bgBright*2,map(bgEffect,0,128,0.8,0.1));
      rect(x, y, 17);
    }
  }

}
function move(){//basic colllision logic
  
  if (keyIsDown(87)){
      if(y1>0){y1=y1-ndy1};
    }
    else if (keyIsDown(83)){
      if(y1<height-sizeY1){y1=y1+ndy1}
    }
    
    if (keyIsDown(UP_ARROW)){
      if(y2>0){y2=y2-ndy2;}
    }
  
    else if (keyIsDown(DOWN_ARROW)){
      if(y2<height-sizeY2){y2=y2+ndy2;}
    }
  
  if (x0 + size0 >= width){//reset ball if paddle2 miss
    x0 = windowWidth/2;y0 = windowHeight/2;
    player1Score++
  }
  
  else if (x0 - size0 <= 0){//reset ball if paddle1 miss
    x0 = windowWidth/2;y0 = windowHeight/2;
    player2Score++
  }
  
  else if (x0-sizeX1<x1 && y0>y1 && y0<(y1+sizeY1)){//change direction if ball touches paddle
    dx0=-dx0;
    x0 += dx0*ndx0;
  }
  else if (x0>x2 && y0>y2 && y0<(y2+sizeY2)){//change direction if ball touches paddle
    dx0=-dx0;
    x0 += dx0*ndx0;
  }
  else{
    x0 += dx0*ndx0 ;//move ball x
  }
  
  if (y0 + size0 >= height || y0 - size0 <= 0){//change direction if the centre of the ball is within radius of the edge of y, and change the color
    dy0=-dy0;
  }
  y0 += dy0*ndy0;//move ball y
  //y2 += map(y0, y2-(sizeY2/2), y2+(sizeY2*2)+(windowHeight/2)-50, 0,windowHeight-sizeY2)-(sizeY2/1);//still p boring
  y2 = (map(y0, y2+(sizeY2/2)-dist(x0,y0,x2,y2), y2+(sizeY2/2)+dist(x0,y0,x2,y2), 0,windowHeight-(sizeY2/2)));//janky af
  //y2 = (map(y1, y0-dist(x0,0,x2,0), y0+dist(x0,0,x2,0), 0,windowHeight-sizeY2/2));//broken
  //y2 = y0-(sizeY2/2)// automove paddle 2 (simple, unfair and boring)
  y1 = y0-(sizeY1/2)// automove paddle 1 (for testing ai longterm)
}

function txtInfo(){
   let infoString = "Daniel Messham's Pong clone\nComp sci 30, fri Sept 24, '21";//information string used for author info
  let realFPS = round((refresh/deltaTime)*20-10,2);//calculate frame rate using delta time(aka how long it took to draw the last frame)
  runTime = round((millis()-startTime)/1000,1)
  
  let targetDelta = round((1/refresh)*1000,2)
  
  let debugString = "DEBUG/PERFORMANCE INFO\nBall pos (X,Y): "+x0+", "+y0+'\nP1y (Top,Btm): ('+y1+','+(y1+sizeY1)+')\nP2y (Top,Btm): ('+y2+','+(y2+sizeY2)+')\n';//basic debug info string
  
  let performanceString = '\nCurrent FPS:   '+realFPS+"fps\nTarget FPS:     "+refresh+'fps\nRendered:       '+frameCount+' Frames, '+runTime+'Seconds\nCurrent Delta: '+round((deltaTime)*1, 2)+'ms\nTarget Delta:   '+targetDelta+'ms\nWHY WONT THE AI JUST WORK?\n'
  
  fill(100, 0.5)//set color for text
  textSize(20)//set text for general info
  text((infoString),60,30);//print basic info to screen, have to redraw every time since i cant include it in the bg
  textSize(17)//set size for debug info
  text((debugString+performanceString),60,90);//print changing info to screen, have to redraw every time since it updates in real time
}

function hud(){
  textSize(77);
  text(player1Score,windowWidth*(1/3),windowHeight*(4/5));
  text(player2Score,windowWidth*(2/3),windowHeight*(4/5));
}