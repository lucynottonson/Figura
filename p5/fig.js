// === GLOBAL === //
let stack = []; //use for future state stacking
let camX = 0; //cam position
let camY = 0; //cam position
let camZ = 550; //cam position
let moveSpeed = 2; //move speed
let lastSpacePressTime = 0; //so it can detect double tap
let wallTexture

function preload() {
    floorTexture = loadImage('p5/assets/fig/onyx.jpg');
    wallTexture = loadImage('p5/assets/fig/wood.jpg')
  }

    // ================== ROOM DIMENSIONS ================== //

const ROOM_WIDTH = 1500;
const ROOM_HEIGHT = 300;
const ROOM_DEPTH = 1500;

    // ================== CANVAS SETUP RELATIVE TO SCREEN ================== //

function setup() {
  let canvasSize = 0.9 * min(windowWidth, windowHeight);
  let canvasX = (windowWidth - canvasSize) / 2;
  let canvasY = (windowHeight - canvasSize) / 2;

  let cnv = createCanvas(canvasSize, canvasSize, WEBGL);
  cnv.position(canvasX, canvasY);

    // ================== SAVE AND RESET BUTTON ================== //

  let buttonY = canvasY + canvasSize + 20;

  let saveButton = createButton('save as png');
  saveButton.position(canvasX + canvasSize * 0.25, buttonY);
  saveButton.mousePressed(() => saveCanvas('figdrawing', 'png'));

  let resetButton = createButton('reset');
  resetButton.position(canvasX + canvasSize * 0.55, buttonY);
  resetButton.mousePressed(() => {
    camX = 0;
    camY = 0;
    camZ = 550;
    angleX = 0;
    angleY = 0;
  });
}

    // ================== DRAW FUNCTIONS ================== //

    // =======ROOM PARAMETERS======= //
function drawRoom() {
  push();
  noStroke();

  // floor 
  push();
 texture(wallTexture) 
 shininess(250);  
 translate(0, ROOM_HEIGHT / 2 + 5, 0); 
  box(ROOM_WIDTH, 10, ROOM_DEPTH);
  pop();

  // ceiling
  push();
  fill(160, 38, 200);
  texture(wallTexture) 
  shininess(250);  
  translate(0, -ROOM_HEIGHT / 2 - 5, 0); 
  box(ROOM_WIDTH, 10, ROOM_DEPTH);
  pop();

  // back wall (relative to starting point)
  push();
  texture(wallTexture) 
  shininess(250);    
  translate(0, 0, -ROOM_DEPTH / 2 - 5);
  box(ROOM_WIDTH, ROOM_HEIGHT, 10);
  pop();

  // front wall (relative to starting point)
  push();
  texture(wallTexture) 
  shininess(250);    
  translate(0, 0, ROOM_DEPTH / 2 + 5);
  box(ROOM_WIDTH, ROOM_HEIGHT, 10);
  pop();

  // left wall (relative to starting point)
  push();
  texture(wallTexture) 
  shininess(250);    
  translate(-ROOM_WIDTH / 2 - 5, 0, 0);
  rotateY(HALF_PI);
  box(ROOM_DEPTH, ROOM_HEIGHT, 10);
  pop();

  // right wall (relative to starting point)
  push();
  texture(wallTexture) 
  shininess(250);    
  translate(ROOM_WIDTH / 2 + 5, 0, 0);
  rotateY(HALF_PI);
  box(ROOM_DEPTH, ROOM_HEIGHT, 10);
  pop();

  pop();
}
// track direction of camera in 3D space
let angleX = 0; 
let angleY = 0;

// runs every frame
function draw() {
  background(30);
  ambientLight(100); // dark
  pointLight(255, 255, 255, camX, camY, camZ); // white light comes from camera

  // ======== MOUSE CONTROLS ======== //
  if (mouseIsPressed) {
    angleX += (pmouseY - mouseY) * 0.005;
    angleY += (mouseX - pmouseX) * 0.005;
  }

  if (keyIsDown(LEFT_ARROW)) camX -= moveSpeed;
  if (keyIsDown(RIGHT_ARROW)) camX += moveSpeed;
  if (keyIsDown(UP_ARROW)) camZ -= moveSpeed;
  if (keyIsDown(DOWN_ARROW)) camZ += moveSpeed;

  camX = constrain(camX, -ROOM_WIDTH / 2 + 100, ROOM_WIDTH / 2 - 100);
  camY = constrain(camY, -ROOM_HEIGHT / 2 + 60, ROOM_HEIGHT / 2 - 60);
  camZ = constrain(camZ, -ROOM_DEPTH / 2 + 100, ROOM_DEPTH / 2 - 100);

  let camTargetX = camX + 100 * sin(angleY);
  let camTargetY = camY + 100 * sin(angleX);
  let camTargetZ = camZ - 100 * cos(angleY);

  camera(camX, camY, camZ, camTargetX, camTargetY, camTargetZ, 0, 1, 0);

  drawRoom();

  push();
  translate(0, 0, 0);
  fill(255, 100, 100);
  sphere(30);
  pop();
}
// ================== CANVAS FITS TO SCREEN SIZE ================== //

function windowResized() {
  let canvasSize = 0.9 * min(windowWidth, windowHeight);
  let canvasX = (windowWidth - canvasSize) / 2;
  let canvasY = (windowHeight - canvasSize) / 2;

  resizeCanvas(canvasSize, canvasSize);
  let cnv = document.getElementsByTagName('canvas')[0];
  cnv.style.position = 'absolute';
  cnv.style.left = canvasX + 'px';
  cnv.style.top = canvasY + 'px';

  // ================== BUTTONS POSITION WITH CANVAS ================== //

  let buttonY = canvasY + canvasSize + 20;
  let buttons = document.getElementsByTagName('button');
  if (buttons.length >= 2) {
    buttons[0].style.left = (canvasX + canvasSize * 0.25) + 'px';
    buttons[0].style.top = buttonY + 'px';
    buttons[1].style.left = (canvasX + canvasSize * 0.55) + 'px';
    buttons[1].style.top = buttonY + 'px';
  }
}

function keyPressed() {
  if (key === 'Shift') {
    moveDown = true;
  }
}

function keyReleased() {
  if (key === 'Shift') {
    moveDown = false;
  }
}
