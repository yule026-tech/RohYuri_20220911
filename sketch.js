var mapImg;
var px, py;
var prevX, prevY;
var mouthOpen = true;
var isMoving = false; // 이동 중인지 체크

function preload() {
  mapImg = loadImage('Map.png');
}

function setup() {
  createCanvas(900, 500);
  frameRate(30);
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
  
  isMoving = false; // 매 프레임 초기화
  
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { px -= 2; isMoving = true; }  // A
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { px += 2; isMoving = true; } // D
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) { py -= 2; isMoving = true; }    // W
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { py += 2; isMoving = true; }  // S
  
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
  
  // 입 각도 
  if (isMoving) {
    if (frameCount % 10 < 5) {
      mouthOpen = true;
    } else {
      mouthOpen = false;
    }
  }
  
  fill(255, 220, 0);
  noStroke();
  if (mouthOpen) {
    arc(px, py, 17, 17, PI*1/4, PI*7/4, PIE);
  } else {
    ellipse(px, py, 17, 17);
  }
}