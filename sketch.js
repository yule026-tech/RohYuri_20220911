var mapImg;

function preload() {
  
  mapImg = loadImage('Map.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  image(mapImg, 0, 0, 400, 400);
}