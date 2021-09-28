// Pong
// Daniel Messham
// fri 24 sept
//
//TODO: Fix really wonky ai
let refresh = 60//target framerate, used to calc realfps
let startTime, millisecond = 0;//initilaize debug values

let x0 = 400; 
let y0 = 300; //initial position
let dx0 = 3;
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
let oldP2Y = y2

let sizeX2 = 17.5;
let sizeY2 = 160; //initial size for x and y(squares)
let speed2 = 1;//combined speed for horiz & vert

//player scores for game
let player1Score = 0
let player2Score = 0

//standard object stats

let bgHue=(128);//Backgrond hue
let bgSat=(128);//Backgrond saturation
let bgBright=(18);//Background brightness


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh);
  background(12,35,12);
  strokeWeight(0);
  fill(168)
  colorMode(HSB);
  imageMode(CENTER);
  noSmooth();
  ndx0 = round(dist(0,0,windowWidth,windowHeight)/730);
  ndy0 = round(dist(0,0,windowWidth,windowHeight)/730);
  speedX1 = round(dist(0,0,windowWidth,windowHeight)/140);
  speedY1 = round(dist(0,0,windowWidth,windowHeight)/140);
  x2 = windowWidth-50;
  sizeY1 = round(windowHeight/7);
  sizeY2 = round(windowHeight/7);
  size0 = round(((windowHeight+windowWidth)/2)/100);
  startTime = millis();
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  ndx0 = round(dist(0,0,windowWidth,windowHeight)/730);
  ndy0 = round(dist(0,0,windowWidth,windowHeight)/730);
  speedX1 = round(dist(0,0,windowWidth,windowHeight)/140);
  speedY1 = round(dist(0,0,windowWidth,windowHeight)/140);
  x2 = windowWidth-50;
  sizeY1 = round(windowHeight/7);
  sizeY2 = round(windowHeight/7);
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
  
  circle((x0),(y0),size0*2);//draw the circle
  
  frameDelta = frameCount//*deltaTime/1000

  oldP2Y = y2
}
  
function bg(){
  background(bgHue, bgSat, bgBright);//redraw the bg to ensure that no trails happen
  // for (let x = 0; x < width; x += 34) {
  //   for (let y = 0; y < height; y += 34) {
  //     let bgEffect = int(dist(x, y, x0, y0));
  //     colorMode(HSB);
  //     fill(bgHue,bgSat*2,bgBright*2,map(bgEffect,0,128,0.8,0.1));
  //     rect(x, y, 17);
  //   }
  // }

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
    x0 += dx0*round(deltaTime/((1/refresh)*600));//increase x by dx every time the screen redraws
  }
  else if (x0+sizeX2>x2 && y0>y2 && y0<(y2+sizeY2)){//change direction if ball touches paddle
    dx0=-dx0;
    x0 += dx0*round(deltaTime/((1/refresh)*600));//increase x by dx every time the screen redraws
  }
  else{
      x0 += dx0*round(deltaTime/((1/refresh)*600));//increase x by dx every time the screen redraws
  }
  
  if (y0 + size0 >= height || y0 - size0 <= 0){//change direction if the centre of the ball is within radius of the edge of y, and change the color
    dy0=-dy0;
    y0 += dy0*round(deltaTime/((1/refresh)*600));//move in y axis
  }
  y0 += dy0*round(deltaTime/((1/refresh)*600));//move in y axis

  //y2 += round(map(y0, y2-(sizeY2/2), y2+(sizeY2*2)+(windowHeight/2)-50, 0,windowHeight-sizeY2)-(sizeY2/1));//very hard
  //y2 += round(map(y0, oldP2Y-(sizeY2), oldP2Y+(sizeY2*2),0,(windowHeight-sizeY2)));//still kinda janky
  //y2 = (map(y0, y2+(sizeY2/2)-dist(x0,0,x2,0), y2+(sizeY2/2)+dist(0,y0,0,y2), 0,windowHeight-(sizeY2/2)));//janky af
  y2 = round(map(y0, oldP2Y-(dist(width,y0,(x0)+(width),oldP2Y)), oldP2Y+(dist(width,y0,(x0)+(width),oldP2Y)), 0 ,windowHeight-sizeY2));//easy ai
  //y2 = round(map(y0, y2-(dist(width,y0,(x0)+(width/2),oldP2Y)), y2+(dist(width,y0,(x0)+(width/2),oldP2Y)), 0 ,windowHeight-sizeY2));//med, broken af
  //y2 = y0-(sizeY2/2)// automove paddle 2 (simple, unfair and boring)
  y1 = y0-(sizeY1/2);// automove paddle 1 (for testing ai longterm)

  if(x0>width+15 || x0<-15 ||y0>height+15 ||y0<-15){//return ball to centre if outside bounds
    x0=width/2;
    y0=height/2
  }
}

function txtInfo(){
  let infoString = "Daniel Messham's Pong clone\nComp sci 30, fri Sept 24, '21";//information string used for author info

  fill(100, 0.5)//set color for text
  textSize(20)//set text for general info
  text((infoString),60,30);//print basic info to screen, have to redraw every time since i cant include it in the bg
  textSize(17)//set size for debug info
  text(("DEBUG/PERFORMANCE INFO\nBall pos (X,Y): "+x0+", "+y0+'\nP1y (Top,Btm): ('+y1+','+(y1+sizeY1)+')\nP2y (Top,Btm): ('+y2+','+(y2+sizeY2)+')\n\nCurrent FPS:   '+round((refresh/deltaTime)*20,2)+"fps\nTarget FPS:     "+refresh+'fps\nRendered:       '+frameCount+' Frames, '+round((millis()-startTime)/1000,1)+'Seconds\nCurrent Delta: '+round((deltaTime)*1, 2)+'ms\nTarget Delta:   '+round((1/refresh)*1000,2)+'ms\nWHY WONT THE AI JUST WORK?\n'),60,90);//print changing info to screen, have to redraw every time since it updates in real time
}

function hud(){
  textSize(77);
  text(player1Score,windowWidth*(1/3),windowHeight*(4/5));
  text(player2Score,windowWidth*(2/3),windowHeight*(4/5));
}