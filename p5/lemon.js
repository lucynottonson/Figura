let camX = 0;
let camY = 0;
let camZ = 550;
let bouncingBalls = [];
let resetButton;
let saveButton;

const ROOM_WIDTH = 1500;
const ROOM_HEIGHT = 300;
const ROOM_DEPTH = 1500;

function setup() {
  let canvasSize = 0.9 * min(windowWidth, windowHeight);
  let canvasX = (windowWidth - canvasSize) / 2;
  let canvasY = (windowHeight - canvasSize) / 2;

  let cnv = createCanvas(canvasSize, canvasSize, WEBGL);
  cnv.class('p5-canvas');

  resetButton = createButton('reset');
  resetButton.position(20, windowHeight - 60);
  resetButton.mousePressed(() => {
    bouncingBalls = [];
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
  });

  saveButton = createButton('save as png');
  saveButton.position(120, windowHeight - 60);
  saveButton.mousePressed(() => {
    saveCanvas('lemon-sketch', 'png');
  });

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

function draw() {
  background(30);
  ambientLight(100);
  pointLight(255, 255, 255, camX, camY, camZ);

  for (let ball of bouncingBalls) {
    ball.pos.add(ball.vel);

    if (ball.pos.x < -ROOM_WIDTH / 2 + 20 || ball.pos.x > ROOM_WIDTH / 2 - 20) ball.vel.x *= -1;
    if (ball.pos.y < -ROOM_HEIGHT / 2 + 20 || ball.pos.y > ROOM_HEIGHT / 2 - 20) ball.vel.y *= -1;
    if (ball.pos.z < -ROOM_DEPTH / 2 + 20 || ball.pos.z > ROOM_DEPTH / 2 - 20) ball.vel.z *= -1;

    push();
    translate(ball.pos.x, ball.pos.y, ball.pos.z);
    fill(...ball.color);
    noStroke();
    sphere(20);
    pop();
  }

  camera(camX, camY, camZ, camX, camY, camZ - 1, 0, 1, 0);
}

function mouseClicked() {
  let forward = createVector(
    sin(0), 
    1,      
    -1.5      
  ).mult(4);

  bouncingBalls.push({
    pos: createVector(camX, camY, camZ),
    vel: forward,
    color: [random(255), random(255), random(255)]
  });
}

function windowResized() {
  let canvasSize = 0.9 * min(windowWidth, windowHeight);
  let canvasX = (windowWidth - canvasSize) / 2;
  let canvasY = (windowHeight - canvasSize) / 2;

  resizeCanvas(canvasSize, canvasSize);
}
