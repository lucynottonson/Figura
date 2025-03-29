// === GLOBAL === //
let stack = []; //use for future state stacking
let camX = 0; //cam position
let camY = 0; //cam position
let camZ = 550; //cam position
let moveSpeed = 2; //move speed
let wallTexture; //obvi
let thing = []; // toruses (called things)
let bouncingBalls = []; // obvi again


function preload() {
    floorTexture = loadImage('p5/assets/fig/onyx.jpg'); //floor texture preload
    wallTexture = loadImage('p5/assets/fig/wood.jpg') //wall texture preload
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
    thing = []; // shapes regenerate when u reset
  });
// balls (really awesome, i ate this up)
  for (let i = 0; i < 20; i++) {
    bouncingBalls.push({
      pos: createVector(
        random(-ROOM_WIDTH / 2 + 100, ROOM_WIDTH / 2 - 100),
        random(-ROOM_HEIGHT / 2 + 50, ROOM_HEIGHT / 2 - 50),
        random(-ROOM_DEPTH / 2 + 100, ROOM_DEPTH / 2 - 100)
      ),
      vel: p5.Vector.random3D().mult(2),
      color: [random(255), random(255), random(255)]
    });
  }
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

  for (let ball of bouncingBalls) {
    ball.pos.add(ball.vel);

    // bouncing behavior >:)
    if (ball.pos.x < -ROOM_WIDTH / 2 + 20 || ball.pos.x > ROOM_WIDTH / 2 - 20) {
      ball.vel.x *= -1;
    }
    if (ball.pos.y < -ROOM_HEIGHT / 2 + 20 || ball.pos.y > ROOM_HEIGHT / 2 - 20) {
      ball.vel.y *= -1;
    }
    if (ball.pos.z < -ROOM_DEPTH / 2 + 20 || ball.pos.z > ROOM_DEPTH / 2 - 20) {
      ball.vel.z *= -1;
    }
// ball info 
    push();
    translate(ball.pos.x, ball.pos.y, ball.pos.z);
    fill(...ball.color);
    noStroke();
    sphere(20);
    pop();
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
  let camPos = createVector(camX, camY, camZ);
  if (thing.length === 0) {
    for (let i = 0; i < 20; i++) {
      thing.push({
        pos: createVector(
          random(-ROOM_WIDTH / 2 + 150, ROOM_WIDTH / 2 - 150),
          random(-ROOM_HEIGHT / 2 + 50, ROOM_HEIGHT / 2 - 50),
          random(-ROOM_DEPTH / 2 + 150, ROOM_DEPTH / 2 - 150)
        ),
        noiseSeed: random(1000),
        color: [random(100, 255), random(100, 255), random(100, 255)]
      });
    }
  }
  for (let i = 0; i < thing.length; i++) {
    let s = thing[i];

    // bounce away from camera if close
    let distToCam = p5.Vector.dist(camPos, s.pos);
    if (distToCam < 100) {
      let away = p5.Vector.sub(s.pos, camPos).normalize().mult(5);
      s.pos.add(away);
    }

    // bounce away from walls
    s.pos.x = constrain(s.pos.x, -ROOM_WIDTH / 2 + 50, ROOM_WIDTH / 2 - 50);
    s.pos.y = constrain(s.pos.y, -ROOM_HEIGHT / 2 + 50, ROOM_HEIGHT / 2 - 50);
    s.pos.z = constrain(s.pos.z, -ROOM_DEPTH / 2 + 50, ROOM_DEPTH / 2 - 50);

    push();
    translate(s.pos.x, s.pos.y, s.pos.z);
    rotateY(frameCount * 0.01 + s.noiseSeed);
    fill(...s.color);
    noStroke();
    let t = frameCount * 0.01;
    let r1 = 20 + noise(t + s.noiseSeed) * 40; //generated randomly w perlin
    let r2 = 5 + noise(t + s.noiseSeed + 100) * 10; //generated randomly w perlin
    torus(r1, r2, 24, 16); // dimensions of shape
    pop();
  }
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
