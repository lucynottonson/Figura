let x, y; 
let currentangle = 0;
let step = 4;
let angle = 250;

let thestring = 'A';
let numloops = 6;
let therules = [];
therules[0] = ['A', 'F[+ABAF][-AB]FB'];

let whereinstring = 0; 
let bgColor;  
let stack = []; 

function setup() {
  let canvasSize = 0.9 * min(windowWidth, windowHeight);
  let canvasX = (windowWidth - canvasSize) / 2;
  let canvasY = (windowHeight - canvasSize) / 2;
  
  let cnv = createCanvas(canvasSize, canvasSize);
  cnv.position(canvasX, canvasY);
  
  x = 0;
  y = height - 1;
  
  for (let i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }
  
  bgColor = color(random(255), random(255), random(255));
  background(bgColor);
  
  pixelDensity(1);
  
  let buttonY = canvasY + canvasSize + 20;
  
  let saveButton = createButton('save as png');
  saveButton.position(canvasX + canvasSize * 0.25, buttonY);
  saveButton.mousePressed(() => {
    saveCanvas('drawingfrombug', 'png');
  });
  
  let resetButton = createButton('reset');
  resetButton.position(canvasX + canvasSize * 0.55, buttonY);
  resetButton.mousePressed(() => {
    bgColor = color(random(255), random(255), random(255));
    background(bgColor);
    
    x = random(width);
  y = random(height);
  currentangle = 0;
  whereinstring = 0;
  stack = [];
  loop();
});
}

function draw() {
  if (whereinstring < thestring.length) {
    drawIt(thestring[whereinstring]);
    whereinstring++;
  } else {
    noLoop();
  }
}

function lindenmayer(s) {
  let outputstring = '';
  for (let i = 0; i < s.length; i++) {
    let ismatch = 0; 
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0]) {
        outputstring += therules[j][1];
        ismatch = 6;
        break;
      }
    }
    if (ismatch == 0) {
      outputstring += s[i];
    }
  }
  return outputstring;
}

function drawIt(k) {
  if (k == 'F') { 
    let x1 = x + step * sin(radians(currentangle));
    let y1 = y + step * tan(radians(currentangle));
    line(x, y, x1, y1);
    x = x1;
    y = y1;
  } else if (k == '+') {
    currentangle += angle;
  } else if (k == '-') {
    currentangle -= angle; 
  } else if (k == '[') {
    stack.push({ x: x, y: y, angle: currentangle });
  } else if (k == ']') {
    if (stack.length > 0) {
      let state = stack.pop();
      x = state.x;
      y = state.y;
      currentangle = state.angle;
    }
    return;
  }
  
  let baseR = red(bgColor);
let baseG = green(bgColor);
let baseB = blue(bgColor);
let r = constrain(baseR + random(-200, 200), 0, 255);
let g = constrain(baseG + random(-200, 20), 80, 255);
let b = constrain(baseB + random(-20, 200), 0, 255);
let a = random(50, 100);
  
  let radius = (random(20, 2) + random(1, 20) + random(1, 2)) / 4;
  
  fill(r, g, b, a);
  noStroke();
  ellipse(x, y, radius, radius);
}

function windowResized() {
  let canvasSize = 0.9 * min(windowWidth, windowHeight);
  let canvasX = (windowWidth - canvasSize) / 2;
  let canvasY = (windowHeight - canvasSize) / 2;
  
  resizeCanvas(canvasSize, canvasSize);
  let cnv = document.getElementsByTagName('canvas')[0];
  cnv.style.position = 'absolute';
  cnv.style.left = canvasX + 'px';
  cnv.style.top = canvasY + 'px';
  
  let buttonY = canvasY + canvasSize + 20;
  let buttons = document.getElementsByTagName('button');
  if (buttons.length >= 2) {
    buttons[0].style.position = 'absolute';
    buttons[0].style.left = (canvasX + canvasSize * 0.25) + 'px';
    buttons[0].style.top = buttonY + 'px';
    
    buttons[1].style.position = 'absolute';
    buttons[1].style.left = (canvasX + canvasSize * 0.55) + 'px';
    buttons[1].style.top = buttonY + 'px';
  }
}