var mapImg;
var px, py;

function preload() {
  mapImg = loadImage('Map.png');
}

function setup() {
  createCanvas(900, 500);
  px = 450;
  py = 300;
}

function draw() {
  background(0);
  image(mapImg, 0, 0, 900, 500);
  
  fill(255, 220, 0);
  noStroke();
  ellipse(px, py, 20, 20);
}