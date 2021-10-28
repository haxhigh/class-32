const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit, fruitImg
var fruitLink;
var bunny, bunnyImg;
var backgroundImg;
var button, buttonImg;
var blinkAnimation;
var cryAnimation;
var eatAnimation;
var backgroundSound;
var sadSound;
var ropeCutSound;
var eatingSound;
var airSound;
var muteButton;
var balloonButton;

function preload() {
  fruitImg = loadImage("melon.png");
  backgroundImg = loadImage("background.png");
  buttonImg = loadImage("cut_button.png");
  bunnyImg = loadImage("rabbit-01.png");

  blinkAnimation = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  cryAnimation = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  eatAnimation = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");

  backgroundSound = loadSound("sound1.mp3");
  sadSound = loadSound("sad.wav");
  ropeCutSound = loadSound("rope_cut.mp3");
  eatingSound = loadSound("eating_sound.mp3");
  //airSound = loadSound("air.wav");

  blinkAnimation.playing = true;
  blinkAnimation.frameDelay = 8;

  cryAnimation.playing = true;
  cryAnimation.looping = false;
  cryAnimation.frameDelay = 20;

  eatAnimation.playing = true;
  eatAnimation.looping = false;
  eatAnimation.frameDelay = 20;
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200, 680, 600, 20);
  rope = new Rope(6, { x: 245, y: 30 })


  backgroundSound.play();
  backgroundSound.setVolume(0.3);

  backgroundSound.play();
  backgroundSound.setVolume(0.3);

  var fruitOptions = {
    density: 0.0001
  }
  fruit = Bodies.circle(200, 200, 30, fruitOptions);
  Composite.add(rope.body, fruit);
  fruitLink = new Link(rope, fruit);

  bunny = createSprite(200, 610, 40, 40)
  bunny.addImage(bunnyImg);
  bunny.scale = 0.2;
  bunny.addAnimation("blink", blinkAnimation);
  bunny.addAnimation("cry", cryAnimation);
  bunny.addAnimation("eat", eatAnimation);
  bunny.changeAnimation(blinkAnimation);

  button = createImg("cut_button.png");
  button.position(225, 25);
  button.size(30, 30);
  button.mouseClicked(cut);

  muteButton = createImg("mute.png");
  muteButton.position(460, 50);
  muteButton.size(20, 20);
  muteButton.mouseClicked(mute);

  balloonButton = createImg("balloon.png");
  balloonButton.position(30,150);
  balloonButton.size(160,100);
  balloonButton.mouseClicked(push);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(backgroundImg);
  ground.show();
  rope.show();
  ellipseMode(RADIUS);
  imageMode(CENTER);

  if (fruit != null) {
    image(fruitImg, fruit.position.x, fruit.position.y, 70, 70);
  }

  Engine.update(engine);

  if (collide(fruit, bunny)) {
    bunny.changeAnimation("eat");
    eatingSound.play();
    eatingSound.setVolume(2);
  }

  if (collide(fruit, ground.body)) {
    console.log("ok");
    bunny.changeAnimation("cry");
    sadSound.play();
    sadSound.setVolume(0.5);
  }


  drawSprites();
}

function cut() {
  rope.break();
  fruitLink.detach();
  fruitLink = null;
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (d <= 80) {
      World.remove(world, body);

      fruit = null;
      return true;
    } else {
      return false;
    }
  }

}

function mute() {
  if (backgroundSound.isPlaying()) {
    backgroundSound.stop();
  } else {
    backgroundSound.play();
  }
}

function push(){
  console.log("ok")
  Matter.Body.applyForce(fruit,{x: 0,y:0},{x:0.01,y:0})
  airSound.play();
  airSound.setVolume(1)
}
