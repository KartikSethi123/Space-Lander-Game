var ground;
var lander, landerImg, thrust;
var bg_img;
var crashImg;
var landImg;
var rightImg;
var leftImg, obstacleImg, lz_Img, obs, lz;
var timer;

var vx = 0;
var vy = 0;
var g = 0.01;
var fuel = 100;

function preload() {
    landerImg = loadImage("normal.png");
    bg_img = loadImage("bg_sur.png");
    thrust = loadAnimation("b_thrust_1.png", "b_thrust_2.png", "b_thrust_3.png");
    crashImg = loadAnimation("crash1.png","crash2.png","crash3.png");
    landImg = loadAnimation("landing1.png", "landing2.png","landing_3.png");
    rightImg = loadAnimation("right_thruster_1.png","right_thruster_2.png");
    leftImg = loadAnimation("left_thruster_1.png", "left_thruster_2.png");
    obstacleImg = loadImage("obstacle.png");
    lz_Img = loadImage("lz.png");

    thrust.playing = true;
    thrust.looping = false;
    rightImg.looping = false;
    leftImg.looping = false;
    landImg.looping = false;
    crashImg.looping = false;
}

function setup() {
    createCanvas(1000, 700);
    frameRate(80);
    timer = 1500;

    thrust.frameDelay = 5;
    rightImg.frameDelay = 5;
    leftImg.frameDelay = 5;
    
    lander = createSprite(100, 50, 30, 30);
    lander.addImage(landerImg);
    lander.scale = 0.1;
    lander.setCollider("rectangle",0,0,200,200);

    ground = createSprite(500,690,1000,20);

    lz = createSprite(880,610,50,30);
    lz.addImage(lz_Img);
    lz.scale = 0.3;

    obs = createSprite(320,530,50,100);
    obs.addImage(obstacleImg);
    obs.scale = 0.5;
    obs.setCollider("rectangle", 0,100,450,450);

    lander.addAnimation("thrusting", thrust);
    lander.addAnimation("crashing", crashImg);
    lander.addAnimation("landing", landImg);
    lander.addAnimation("right", rightImg);
    lander.addAnimation("left", leftImg);

    

    rectMode(CENTER);
    textSize(15);
}

function draw() {
    background(51);
    image(bg_img, 0, 0);
    push();
    fill(255);
    text("vertical velocity:" + round(vy), 800, 75);
    text("horizontal velocity:" + round(vx, 2), 800, 50);
    text("fuel" + fuel, 800, 25);
    pop();

    //fall down
    vy += g;
    lander.position.y += vy;
    lander.position.x += vx;

   //landing detection
   var d = dist(lander.position.x, lander.position.y, lz.position.x, lz.position.y);
//    console.log(d);

   if(d <= 20 && (vy<2 && vy>-2) && (vx<2 && vx>-2)){
    console.log("landed");
    vx = 0;
    vy = 0;
    g = 0;
    lander.changeAnimation("landing");
    textSize(25);
    text("Congrats",480,350);
   }

   //obstacle detection
   if(lander.collide(obs) == true){
    lander.changeAnimation("crashing");
    stop();
    textSize(25);
    text("Try Again",480,350);
   }

   
   if(lander.collide(ground) == true){
    lander.changeAnimation("crashing");
    stop();
    textSize(25);
    text("Try Again",480,350);
   }
   

    drawSprites();
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        upward_thrust();
        lander.changeAnimation("thrusting");
        thrust.nextFrame();
    }
    if(keyCode == RIGHT_ARROW){
        lander.changeAnimation("left");
        right_thrust();
    }
    if(keyCode == LEFT_ARROW){
        lander.changeAnimation("right");
        left_thrust();
    }
}

function upward_thrust(){
    vy = -1;
    fuel -= 1;
}

function right_thrust(){
    vx += 0.2;
    fuel -= 1;
}

function left_thrust(){
    vx -= 0.2;
    fuel -= 1;
}
function stop(){
    vy = 0;
    vx = 0;
    g = 0;
    fuel = 0;
}