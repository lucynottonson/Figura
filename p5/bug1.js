let step = 13;                 
let angle = 91;               
let numloops = 6;             

let x, y;
let currentangle;
let thestring = 'A';
let therules = [['A', 'F[+ABAFB-ABFBA][-ABFA-]FA-+B']];  
let whereinstring = 0;
let bgColor;
let stack = [];

function setup() {
  let canvasSize = 0.9 * min(windowWidth, windowHeight);
  let canvasX = (windowWidth - canvasSize) / 2;
  let canvasY = (windowHeight - canvasSize) / 2;

  let cnv = createCanvas(canvasSize, canvasSize);
  cnv.position(canvasX, canvasY);

  x = random(width);
  y = random(height);
  currentangle = random(50, 120); 

  for (let i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }

  bgColor = color(random(255), random(255), random(255));
  background(bgColor);

  pixelDensity(1);
  strokeWeight(2);

  let buttonY = canvasY + canvasSize + 20;

  let saveButton = createButton('save as png');
  saveButton.position(canvasX + canvasSize * 0.25, buttonY);
  saveButton.mousePressed(() => saveCanvas('tree', 'png'));

  let resetButton = createButton('reset');
  resetButton.position(canvasX + canvasSize * 0.55, buttonY);
  resetButton.mousePressed(() => {
    bgColor = color(random(255), random(255), random(255));
    background(bgColor);
    x = random(width);
    y = random(height);
    currentangle = random(50, 120); 
    whereinstring = 0;
    stack = [];
    loop();
  });
}

function draw() {
  let commandsPerFrame = 400;
  for (let i = 0; i < commandsPerFrame; i++) {
    if (whereinstring < thestring.length) {
      drawIt(thestring[whereinstring]);
      whereinstring++;
    } else {
      noLoop();
    }
  }
}

function lindenmayer(s) {
  let output = '';
  for (let i = 0; i < s.length; i++) {
    let replaced = false;
    for (let j = 0; j < therules.length; j++) {
      if (s[i] === therules[j][0]) {
        output += therules[j][1];
        replaced = true;
        break;
      }
    }
    if (!replaced) output += s[i];
  }
  return output;
}

function drawIt(k) {
  if (k === 'F') {
    let x1 = x + step * cos(radians(currentangle));
    let y1 = y + step * sin(radians(currentangle));

    if (x1 < 0 || x1 > width || y1 < 0 || y1 > height) {
      currentangle += 180;
      x1 = x + step * cos(radians(currentangle));
      y1 = y + step * sin(radians(currentangle));
    }
    let baseR = red(bgColor);
    let baseG = green(bgColor);
    let baseB = blue(bgColor);
    let r = constrain(baseR + random(-50, 50), 0, 255);
    let g = constrain(baseG + random(-50, 50), 0, 255);
    let b = constrain(baseB + random(-50, 50), 0, 255);
    stroke(r, g, b);

    line(x, y, x1, y1);
    x = x1;
    y = y1;
  } else if (k === '+') {
    currentangle += angle;
  } else if (k === '-') {
    currentangle -= angle;
  } else if (k === '[') {
    stack.push({ x: x, y: y, currentangle });
  } else if (k === ']') {
    if (stack.length > 0) {
      let state = stack.pop();
      x = state.x;
      y = state.y;
      currentangle = state.currentangle;
    }
  }
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
    buttons[0].style.left = (canvasX + canvasSize * 0.25) + 'px';
    buttons[0].style.top = buttonY + 'px';
    buttons[1].style.left = (canvasX + canvasSize * 0.55) + 'px';
    buttons[1].style.top = buttonY + 'px';
  }
}
