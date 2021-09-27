let lastSwitchMillis = 0
let isRed = false

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // if (millis()%4000<2000){
  //   background('green')
  // }
  //elsebackground('red');{}
  if (isRed){
    background('red');
  }
  else{background('black');}
  
  if (millis() > lastSwitchMillis + 2000){
    lastSwitchMillis = millis()
    isRed=!isRed
  }
  console.log(millis())
  
}