var mapImg;
var px, py;
var prevX, prevY;
var mouthOpen = true;
var isMoving = false;
var dots = []; // 콩 배열

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
  
  // 콩 배치
  for (var i = 0; i < 10; i++) {
    dots.push({x: random(50, 850), y: random(50, 450)});
  }
}

function draw() {
  background(0);
  image(mapImg, 0, 0, 900, 500);
  
  prevX = px;
  prevY = py;
  
  isMoving = false;
  
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { px -= 2; isMoving = true; }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { px += 2; isMoving = true; }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) { py -= 2; isMoving = true; }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { py += 2; isMoving = true; }
  
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
  
  // 콩 그리기
  fill(255, 255, 255);
  noStroke();
  for (var i = 0; i < dots.length; i++) {
    ellipse(dots[i].x, dots[i].y, 6, 6);
  }
  
  fill(255, 220, 0);
  noStroke();
  if (mouthOpen) {
    arc(px, py, 17, 17, PI*1/4, PI*7/4, PIE);
  } else {
    ellipse(px, py, 17, 17);
  }
}