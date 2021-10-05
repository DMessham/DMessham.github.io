// Pong
// Daniel Messham
// mon oct 4th
// bonus stuff: ai, background, difficulty settings for ai, game speed can adjust to framerate, 
//TODO: add more balenced ai
let refresh = 60//target framerate, used to calc realfps
let startTime, millisecond = 0;//initilaize debug values

let ball = {
  x:400, //initial position
  y:300, //initial position
  dx:3, //inital speed X
  dy:3, //inital speed Y
  ndx:1, //speed modifier X
  ndy:1, //speed modifier Y
  timeMult:0.7, // time based speed multiplyer
  size:15, //initial size
  sizeX:15,
  sizeY:15,
  speed:1,//combined speed for horiz & vert
};

let P1 = {
  x:50, //initial position
  y:200, //initial position
  dx:30, //inital speed X
  dy:30, //inital speed Y
  ndy:5, //speed modifier X
  ndy:5, //speed modifier Y
  autoPlay:1, // automove player
  sizeX:17.5,
  sizeY:160, //initial size for x and y(squares)
  speed:1,//combined speed for horiz & vert
  score:0,//player 1 score
};


let P2 = {
  x:750, //initial position
  y:200, //initial position
  dx:60, //inital speed X
  dy:60, //inital speed X
  ndx:5, //speed modifier X
  ndy:5, //speed modifier Y
  oldY:100, // position
  difficulty:'very hard',
  sizeX:17.5,
  sizeY:160, //initial size for x and y(squares)
  speed:1,//combined speed for horiz & vert
  score:0,//player 2 score
  difftime:0//time since last difficulty change
};

//standard object stats

let bgHue=(128);//Backgrond hue
let bgSat=(128);//Backgrond saturation
let bgBright=(18);//Background brightness


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh);
  background(12,35,12);
  noStroke()
  fill(168)
  colorMode(HSB);
  imageMode(CENTER);
  noSmooth();
  ball.ndx = round(dist(0,0,windowWidth,windowHeight)/730);
  ball.ndy = round(dist(0,0,windowWidth,windowHeight)/730);
  P1.speedX = round(dist(0,0,windowWidth,windowHeight)/140);
  P1.speedY = round(dist(0,0,windowWidth,windowHeight)/140);
  P2.x = windowWidth-50;
  P1.sizeY = round(windowHeight/7);
  P2.sizeY = round(windowHeight/7);
  ball.size = round(((windowHeight+windowWidth)/2)/100);
  startTime = millis();
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  noStroke()
  ball.ndx = round(dist(0,0,windowWidth,windowHeight)/730);
  ball.ndy = round(dist(0,0,windowWidth,windowHeight)/730);
  P1.speedX = round(dist(0,0,windowWidth,windowHeight)/140);
  P1.speedY = round(dist(0,0,windowWidth,windowHeight)/140);
  P2.x = windowWidth-50;
  P1.sizeY = round(windowHeight/7);
  P2.sizeY = round(windowHeight/7);
}

function draw() {
  bg()
  
  txtInfo();
  hud();
  move();
  
  fill(98,0.4);//
  rect(P1.x-P1.sizeX,P1.y,P1.sizeX, P1.sizeY);//draw player paddle
  
  fill(98,0.4);//
  rect(P2.x,P2.y,P2.sizeX, P2.sizeY);//draw ai paddle
  
  circle((ball.x),(ball.y),ball.size*2);//draw the circle
  
  frameDelta = frameCount//*deltaTime/1000

  P2.oldY = P2.y
}
  
function bg(){
  background(bgHue, bgSat, bgBright);//redraw the bg to ensure that no trails happen
  for (let x = 0; x < width; x += 34) {
    for (let y = 0; y < height; y += 34) {
      let bgEffect = 1+int(dist(x, y, ball.x, ball.y));
      colorMode(HSB);
      fill(bgHue,bgSat*2,bgBright*2,map(bgEffect,0,128,0.9,0.5));
      rect(x, y, 17);
    }
  }

}
function move(){//basic colllision logic
  if(ball.timeMult<5.5){ball.timeMult = 0.75+(millis()/(1000*10000))};//ball speed multiplication based off time played
  if (keyIsDown(75)){P1.autoPlay = true;}//turn on autoplay
  else if (keyIsDown(76)){P1.autoPlay = false;}//turn off autoplay

  if (keyIsDown(48)){P2.difficulty = 'off';}//difficulty buttons
    else if (keyIsDown(49)){P2.difficulty = 'off';}
    //else if (keyIsDown(50)){P2.difficulty = 'easy';}
    //else if (keyIsDown(51)){P2.difficulty = 'medium';}
    //else if (keyIsDown(52)){P2.difficulty = 'hard';}
    else if (keyIsDown(53)){P2.difficulty = 'very hard';}
    //else if (keyIsDown(54)){P2.difficulty = 'buggy';}
    //else if (keyIsDown(55)){P2.difficulty = 'hardAlt';}

  if (keyIsDown(87)){//movement keys
      if(P1.y>0){P1.y=P1.y-P1.ndy};
    }
    else if (keyIsDown(83)){
      if(P1.y<height-P1.sizeY){P1.y=P1.y+P1.ndy}
    }
    
    if (keyIsDown(UP_ARROW)){
      if(P2.y>0){P2.y=P2.y-P2.ndy;}
    }
  
    else if (keyIsDown(DOWN_ARROW)){
      if(P2.y<height-P2.sizeY){P2.y=P2.y+P2.ndy;}
    }
  
  if ((ball.x + ball.size)+ball.ndx*ball.timeMult >= width){//reset ball if paddle2 miss
    ball.x = windowWidth/2;y0 = windowHeight/2;
    P1.score++
  }
  
  else if ((ball.x - ball.size)+ball.ndx*ball.timeMult <= 0){//reset ball if paddle1 miss
    ball.x = windowWidth/2;y0 = windowHeight/2;
    P2.score++
  }
  
  else if ((ball.x-P1.sizeX)+ball.sizeX*ball.timeMult<P1.x && ball.y>P1.y && ball.y<(P1.y+P1.sizeY)){//change direction if ball touches paddle
    ball.dx=-ball.dx;
    ball.x += ball.dx*round(deltaTime/((1/refresh)*600)*ball.timeMult);//increase x by dx every time the screen redraws
  }
  else if ((ball.x+P2.sizeX)+ball.sizeX*ball.timeMult>P2.x && ball.y>P2.y && ball.y<(P2.y+P2.sizeY)+ball.timeMult){//change direction if ball touches paddle
    ball.dx=-ball.dx;
    ball.x += ball.dx*round(deltaTime/((1/refresh)*600)*ball.timeMult);//increase x by dx every time the screen redraws
  }
  else{
    ball.x += ball.dx*round(deltaTime/((1/refresh)*600)*ball.timeMult);//increase x by dx every time the screen redraws
  }
  
  if ((ball.y + ball.size)+ball.dy*ball.timeMult>= height || (ball.y - ball.size)+ball.dy*ball.timeMult <= 0){//change direction if the centre of the ball is within radius of the edge of y, and change the color
    ball.dy=-ball.dy;
    ball.y += ball.dy*round(deltaTime/((1/refresh)*600)*ball.timeMult);//move in y axis
  }
  ball.y += ball.dy*round(deltaTime/((1/refresh)*600)*ball.timeMult);//move in y axis

  //ALL THE AI MODES THAT ARE COMMENTED OUT ARE BROKEN IN SOME MAJOR WAY THAT RESULTS IN THEM BEING UNUSABLE
  if(P2.difficulty==='very hard'){P2.y += round(map(ball.y, P2.y-(P2.sizeY/2), P2.y+(P2.sizeY*2)+(windowHeight/2)-50, 0,windowHeight-P2.sizeY)-(P2.sizeY/1))};//very hard
  //P2.y += round(map(ball.y, P2.oldY-(P2.sizeY), P2.oldY+(P2.sizeY*2),0,(windowHeight-P2.sizeY)));//still kinda janky
  //P2.y = (map(ball.y, P2.y+(P2.sizeY/2)-dist(ball.x,0,P2.x,0), P2.y+(P2.sizeY/2)+dist(0,ball.y,0,P2.y), 0,windowHeight-(P2.sizeY/2)));//janky af
  //if(P2.difficulty==='easy'){if(ball.x>(width/2)){P2.y = round(map(ball.y, P2.oldY-(dist(width,ball.y,(ball.x*2)+(width),P2.oldY)), P2.oldY+(dist(width,ball.y,(ball.x*2)+(width),P2.oldY)), 0 ,windowHeight-P2.sizeY));}}//easy ai

  //if(P2.difficulty==='medium'){if(ball.x>(width/3)){P2.y = round(map(ball.y, P2.y-(dist(width,ball.y,(ball.x/2)+(width),P2.oldY)), P2.y+(dist(width,ball.y,(ball.x/2)+(width),P2.oldY)), -P2.sizeY ,windowHeight+(P2.sizeY/2)));}}//medium

  //if(P2.difficulty==='hard'){if(ball.x>(width/1.5)){P2.y = round(map(ball.y, P2.y-(dist(width,ball.y,(ball.x/3)+(width),P2.oldY)), P2.y+(dist(width,ball.y,(ball.x/3)+(width),P2.oldY)),P2.sizeY/3 ,windowHeight-P2.sizeY/3))-P2.sizeY;}}//hard

  //if(P2.difficulty==='hardAlt'){if(ball.x>(width/8)){P2.y = round(map(ball.y, P2.y-(dist(width,ball.y,(ball.x/4)+(width),P2.oldY)), P2.y+(dist(width,ball.y,(ball.x/4)+(width),P2.oldY)), P2.sizeY ,(windowHeight)+P2.sizeY));}}//hardAlt

  //if(P2.difficulty==='buggy'){if(ball.x>(width/2)){P2.y = round(map(ball.y, P2.y-(dist(width,ball.y,(ball.x)+(P2.sizeY/2),P2.oldY)), P2.y+(dist(width,ball.y,(ball.x)-(P2.sizeY/2),P2.oldY)), 0 ,windowHeight))};}//med, very buggy

  if(P1.autoPlay===true){P1.y += round(map(ball.y, P1.y-(P1.sizeY/2),P1.y+(P1.sizeY*2)+(windowHeight/2)-50,0,windowHeight-P1.sizeY)-(P1.sizeY/1))}// automove paddle 1 (for autoplay)

  if(ball.x>width+15 || ball.x<-15 ||ball.y>height+15 ||ball.y<-15){//return ball to centre if outside edges of screen
    ball.x=width/2;
    ball.y=height/2;
  }
  
}

function txtInfo(){
  let infoString = "Daniel Messham's Pong clone\nComp sci 30, Mon Oct 4th, '21";//information string used for author info+dufficulty info

  fill(100, 0.5)//set color for text
  textSize(20)//set text for general info
  text((infoString),60,30);//print basic info to screen, have to redraw every time since i cant include it in the bg
  textSize(18)//set size for debug info
  text(("DEBUG/PERFORMANCE INFO\nP2 Ai: "+P2.difficulty+', P1 AI:'+P1.autoPlay+', time-Speed mult.'+ball.timeMult+"\nBall pos (X,Y): "+ball.x+", "+ball.y+'\nP1y (Top,Btm): ('+P1.y+','+(P1.y+P1.sizeY)+')\nP2y (Top,Btm): ('+P2.y+','+(P2.y+P2.sizeY)+')\nCurrent FPS:   '+round((refresh/deltaTime)*20,2)+"fps\nTarget FPS:     "+refresh+'fps\nRendered:       '+frameCount+' Frames\nCurrent Delta: '+round((deltaTime)*1, 2)+'ms\nTarget Delta:   '+round((1/refresh)*1000,2)+'ms\nThe easier ai settings were horribly broken by physics changes, so i removed them.\n\nCONTROLS\npress 1 & 5 to turn p2 ai off and on, k&l for p1 ai. w&s fpr p1 paddle,\nUp and down for P2. refresh to restart, there is no score limit for either side.'),60,95);//print changing info to screen, have to redraw every time since it updates in real time
}

function hud(){
  textSize(77);
  text(P1.score,windowWidth*(1/3),windowHeight*(4/5));
  text(P2.score,windowWidth*(2/3),windowHeight*(4/5));
  textSize(42);
  text('Time: '+round((millis()-startTime)/1000,1), width/2.4,height/12)
}