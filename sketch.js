var mapImg;
var px, py;
var prevX, prevY;
var mouthOpen = true;
var isMoving = false;
var dots = [];
var score = 0; // 점수 변수
var energy = 3; // 에너지 변수
var enemies = []; // 적 배열
var gameState = 'playing'; // 게임 상태
var angle = 0; // 입 방향 각도

function preload() {
  mapImg = loadImage('Map.png');
}

function isSafeDot(tx, ty) {
  for (var dx = -10; dx <= 10; dx += 5) {
    for (var dy = -10; dy <= 10; dy += 5) {
      var origX = (tx + dx) * (2816 / 900);
      var origY = (ty + dy) * (1536 / 500);
      var tc = mapImg.get(origX, origY);
      if (tc[2] > 100 && (tc[0] > 30 || tc[1] > 30)) return false;
      if (tc[2] < 50) return false;
    }
  }
  return true;
}

function isWall(x, y) {
  var c = get(x, y);
  return c[2] > 100;
}

function spawnEnemies(count) {
  // 적 count개 추가 생성
  var added = 0;
  var attempt = 0;
  while (added < count && attempt < 10000) {
    attempt++;
    var ex = random(20, 880);
    var ey = random(20, 480);
    if (isSafeDot(ex, ey)) {
      enemies.push({
        x: ex,
        y: ey,
        col: color(random(150, 255), 0, random(150, 255))
      });
      added++;
    }
  }
}

function resetGame() {
  // 게임 초기화
  px = 450;
  py = 298;
  prevX = px;
  prevY = py;
  score = 0; // 점수 변수
  energy = 3; // 에너지 변수
  gameState = 'playing'; // 게임 상태
  angle = 0; // 입 방향 각도
  dots = [];
  enemies = [];
  
  // 콩 배치 (20개)
  var attempt = 0;
  while (dots.length < 20 && attempt < 10000) {
    attempt++;
    var tx = random(20, 880);
    var ty = random(20, 480);
    if (isSafeDot(tx, ty)) {
      dots.push({x: tx, y: ty, eaten: false});
    }
  }
  
  // 적 5개 랜덤 배치
  spawnEnemies(5);
}

function setup() {
  createCanvas(900, 500);
  frameRate(30);
  px = 450;
  py = 298;
  prevX = px;
  prevY = py;
  
  // 콩 배치 (20개)
  var attempt = 0;
  while (dots.length < 20 && attempt < 10000) {
    attempt++;
    var tx = random(20, 880);
    var ty = random(20, 480);
    if (isSafeDot(tx, ty)) {
      dots.push({x: tx, y: ty, eaten: false});
    }
  }
  
  // 적 5개 랜덤 배치
  spawnEnemies(5);
}

function keyPressed() {
  // 스페이스로 재시작
  if (key == ' ' && gameState != 'playing') {
    resetGame();
  }
}

function draw() {
  background(0);
  image(mapImg, 0, 0, 900, 500);
  
  if (gameState == 'playing') {
    prevX = px;
    prevY = py;
    
    isMoving = false;
    
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { px -= 2; isMoving = true; angle = PI; }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { px += 2; isMoving = true; angle = 0; }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { py -= 2; isMoving = true; angle = -HALF_PI; }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { py += 2; isMoving = true; angle = HALF_PI; }
    
    // 벽 충돌 감지 - 팩맨 주변 8픽셀 체크
    if (isWall(px + 8, py) || isWall(px - 8, py) ||
        isWall(px, py + 8) || isWall(px, py - 8)) {
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
    
    // 콩 먹기
    fill(255, 255, 255);
    noStroke();
    for (var i = 0; i < dots.length; i++) {
      if (!dots[i].eaten) {
        ellipse(dots[i].x, dots[i].y, 6, 6);
        if (dist(px, py, dots[i].x, dots[i].y) < 10) {
          dots[i].eaten = true;
          score += 10; // 점수 추가
          
          // 50점 - 적 1개 추가
          if (score == 50) spawnEnemies(1);
          // 100점 - 적 2개 추가
          if (score == 100) spawnEnemies(2);
          // 150점 - 적 3개 추가
          if (score == 150) spawnEnemies(3);
        }
      }
    }
    
    for (var i = enemies.length - 1; i >= 0; i--) {
      fill(enemies[i].col);
      noStroke();
      ellipse(enemies[i].x, enemies[i].y, 17, 17);
      
      if (dist(px, py, enemies[i].x, enemies[i].y) < 15) {
        enemies.splice(i, 1);
        energy--;
      }
    }
    
    // 입 방향따라 그리기
    fill(255, 220, 0);
    noStroke();
    if (mouthOpen) {
      arc(px, py, 17, 17, angle + PI*1/4, angle + PI*7/4, PIE);
    } else {
      ellipse(px, py, 17, 17);
    }
    
    // 점수 표시
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text('SCORE: ' + score, 10, 20);
    
    // 에너지 표시
    var hearts = '';
    for (var i = 0; i < energy; i++) {
      hearts += '♥ ';
    }
    fill(255, 0, 0);
    textSize(16);
    text(hearts, 10, 40);
    
    // 승리 조건 - 200점
    if (score >= 200) gameState = 'win';
    
    // 패배 조건
    if (energy <= 0) gameState = 'lose';
    
  } else if (gameState == 'win') {
    // 승리 메시지
    fill(255, 220, 0);
    textSize(40);
    textAlign(CENTER);
    text('YOU WIN!', 450, 220);
    textSize(20);
    text('SCORE: ' + score, 450, 270);
    fill(255);
    text('SPACE로 다시 시작', 450, 310);
    
  } else if (gameState == 'lose') {
    // 패배 메시지
    fill(255, 0, 0);
    textSize(40);
    textAlign(CENTER);
    text('GAME OVER', 450, 220);
    textSize(20);
    text('SCORE: ' + score, 450, 270);
    fill(255);
    text('SPACE로 다시 시작', 450, 310);
  }
}