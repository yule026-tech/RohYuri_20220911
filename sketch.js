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
  
  // WASD로 이동
  if (keyIsDown(87)) py -= 2; // w
  if (keyIsDown(83)) py += 2; // s
  if (keyIsDown(65)) px -= 2; // a
  if (keyIsDown(68)) px += 2; // d
  
  fill(255, 220, 0);
  noStroke();
  ellipse(px, py, 17, 17);
}