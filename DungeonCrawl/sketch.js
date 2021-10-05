// Dungeon crawl
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let refresh = 60//target framerate, used to calc realfps
let startTime, millisecond = 0;//initilaize debug values

let enemys = [[0,0,1][0,0,1]]
let objects = [[0,1,2][0,1,2]]
let terrain = [[0,1,2][0,1,2]]

//standard object stats

let bgHue=(128);//Backgrond hue
let bgSat=(128);//Backgrond saturation
let bgBright=(18);//Background brightness


let levelTerrain = {
  x:1, //initial position
  y:1, //initial position
  texture:3, //inital speed X
  property:3, //inital speed Y
  ndx:1, //x collision
  ndy:1, //Y collision
  timeMult:0.7, // time based speed multiplyer
  size:15, //initial size
  sizeX:15,
  sizeY:15,
  index:0,
};

let levelObject = {
  x:3, //initial position
  y:3, //initial position
  texture:3, //inital speed X
  property:3, //inital speed Y
  ndx:1, //x collision
  ndy:1, //Y collision
  timeMult:0.7, // time based speed multiplyer
  size:15, //initial size
  sizeX:15,
  sizeY:15,
  index:0,
};

let player = {
  x:2, //initial position
  y:2, //initial position
  dx:30, //inital speed X
  dy:30, //inital speed Y
  ndy:5, //speed modifier X
  ndy:5, //speed modifier Y
  sizeX:17.5,
  sizeY:160, //initial size for x and y(squares)
  speed:1,//combined speed for horiz & vert
  score:0,//player 1 score
};


let enemy = {
  x:4, //initial position
  y:4, //initial position
  dx:60, //inital speed X
  dy:60, //inital speed X
  ndx:5, //speed modifier X
  ndy:5, //speed modifier Y
  type:100, // type
  difficulty:'very hard',
  sizeX:17.5,
  sizeY:160, //initial size for x and y(squares)
  speed:1,//combined speed for horiz & vert
  score:0,//score value
};

//standard object stats

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh);
  background(12,35,12);
  noStroke()
  fill(168)
  colorMode(HSB);
  imageMode(CENTER);
  noSmooth();
  
  startTime = millis();
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  noStroke()
  
}

function draw() {
  bg()
  
  txtInfo();
  hud();
  move();
  
  fill(98,0.4);//
  rect(player.x-player.sizeX,player.y,player.sizeX, player.sizeY);//draw player paddle
  
  fill(98,0.4);//
  rect(enemy.x,enemy.y,enemy.sizeX, enemy.sizeY);//draw ai paddle
  
  frameDelta = frameCount//*deltaTime/1000

}

function bg(){
  background(bgHue, bgSat, bgBright);//redraw the bg to ensure that no trails happen
  for (let x = 30; x < width-30; x += 30) {
    for (let y = 30; y < height-30; y += 30) {
      let bgEffect = 1+int(dist(x, y, player.x, player.y));
      colorMode(HSB);
      fill(bgHue,bgSat*2,bgBright*2,map(bgEffect,0,128,0.9,0.5));
      rect(x, y, 25);
    }
  }
}