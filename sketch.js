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
  
  // 이전 위치 저장
  prevX = px;
  prevY = py;
  
  // WASD 또는 방향키로 이동
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) px -= 2;  // A
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) px += 2; // D
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) py -= 2;    // W
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) py += 2;  // S
  

  var c = get(px, py);
  if (c[2] > 100) {
    px = prevX;
    py = prevY;
  }
  
  px = constrain(px, 0, 900);
  py = constrain(py, 0, 500);
  
  fill(255, 220, 0);
  noStroke();
  ellipse(px, py, 17, 17);
}