//let p;
let player;
let walls = [];
let xoff = 0;
let yoff = 10000;
let scene = [];
const sceneW = 400;
const sceneH = 400;

function setup() {
  createCanvas(800, 400);
  //p = new Player(100, 100, 120);
  for (let i = 0; i < 5; i++) {
    let x1 = random(width / 2);
    let x2 = random(width / 2);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Wall(x1, y1, x2, y2);
  }
  walls.push(new Wall(-1, -1, width / 2 + 1, -1));
  walls.push(new Wall(width / 2 + 1, -1, width / 2 + 1, height + 1));
  walls.push(new Wall(width / 2 + 1, height + 1, -1, height + 1));
  walls.push(new Wall(-1, height + 1, -1, -1));
  player = new Player(100, 100, 0);
}

function draw() {
  background(10);

  player.scanWalls();
  player.draw3D();


  //player.update(noise(xoff) * width, noise(yoff) * height);
  // if (mouseX < width / 2 && mouseY < height) {
  //   player.update(mouseX, mouseY)
  // }
  player.show();
  for (let wall of walls) {
    wall.show();
  }

  if (keyIsDown(LEFT_ARROW)) {
    player.rotate(-0.1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.rotate(0.1);
  }

  if (keyIsDown(UP_ARROW)) {
    player.move(2);
  } else if (keyIsDown(DOWN_ARROW)) {
    player.move(-2);
  }
}
