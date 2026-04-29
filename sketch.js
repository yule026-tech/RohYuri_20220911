var mapImg;
var px, py;
var prevX, prevY;

function preload() {
  mapImg = loadImage('Map.png');
}

function setup() {
  createCanvas(900, 500);
  px = 450;
  py = 298;
  prevX = px;
  prevY = py;
}

function draw() {
  background(0);
  image(mapImg, 0, 0, 900, 500);
  
  prevX = px;
  prevY = py;
  
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) px -= 2;  // A
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) px += 2; // D
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) py -= 2;    // W
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) py += 2;  // S
  
  // 벽 충돌 감지
  var c = get(px, py);
  if (c[2] > 100) {
    px = prevX;
    py = prevY;
  }
  
  // 좌우 끝 루프
  if (px > 900) px = 0;
  if (px < 0) px = 900;
  
  // 상하는 막힘
  py = constrain(py, 0, 500);
  
  fill(255, 220, 0);
  noStroke();
  ellipse(px, py, 17, 17);
}