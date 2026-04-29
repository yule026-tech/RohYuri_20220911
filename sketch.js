var mapImg;
var px, py;

function preload() {
  mapImg = loadImage('Map.png');
}

function setup() {
  createCanvas(900, 500);
  px = 450;
  py = 298;
}

function draw() {
  background(0);
  image(mapImg, 0, 0, 900, 500);
  
  // WASD 또는 방향키로 이동
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) px -= 2;  // A
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) px += 2; // D
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) py -= 2;    // W
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) py += 2;  // S
  
  // 화면 밖 못나가게함
  px = constrain(px, 0, 900);
  py = constrain(py, 0, 500);
  
  fill(255, 220, 0);
  noStroke();
  ellipse(px, py, 17, 17);
}