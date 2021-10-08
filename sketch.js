var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var backgroundimg;

var cloud, cloudsGroup, cloudImage;

var obstacle, obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var restart,restartImage;
var gameOver, gameOverImage;


var score=0;

var dieSound, jumpSound,checkPointSound;

var newImage;

var END=0

var PLAY=1;

var gameState=PLAY; 
      
  

function preload(){
  trex_running = loadAnimation("sonic-1.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  backgroundimg = loadImage("fondo.jpg");
  
    dieSound = loadSound("die.mp3");
    jumpSound = loadSound("jump.mp3");
    checkPointSound = loadSound("check_point_sonic.mp3");
     restartImage = loadImage("restart.png");  
      gameOverImage = loadImage("gameOver.png"); 
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("enemigo (1).png");
  
  obstacle2 = loadImage("enemigo (1).png");
  
  obstacle3 = loadImage("enemigo (1).png");
  
  obstacle4 = loadImage("enemigo (1).png");
  
  obstacle5 = loadImage("enemigo (1).png");
  
  obstacle6 = loadImage("enemigo (1).png");
}

function setup() {
  createCanvas(windowWidth,windowHeight   );


  trex = createSprite(50,height-100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.setCollider("circle", -15,0,40);
  trex.debug=false;
  trex.scale = 0.1;
  
  ground = createSprite(width/2,height-10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  restart = createSprite(width/2,height/2);
  restart.addImage("restart",restartImage);
  restart.visible = false;
  gameOver = createSprite(width/2,height/2-80 );
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.visible = false;
  
  invisibleGround = createSprite(width/2,height-90,     width,10);
  invisibleGround.visible = false ;
  
  console.log("Hello"+ 5)
  obstacleGroup=new Group();
  cloudsGroup=new Group();
}

function draw() {
  background(backgroundimg);
  text("Score: "+score,450,50)
  if(gameState==PLAY){
    score=score+Math.round(getFrameRate()/60);
  if(score>0 && score%100==0){
  checkPointSound.play();  
  }
  if(keyDown("space")&& trex.y >= width/2)) {
    trex.velocityY = -13;
    jumpSound.play();
  }
    
  ground.velocityX = -4-3*score/100;
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
      spawnClouds();
  spawnObstacles(); 
     if (obstacleGroup.isTouching(trex)){
   gameState=END; 
   dieSound.play();    
    }
  }
  
  else if(gameState==END){
    obstacleGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
   ground.velocityX=0
     trex.velocityX=0
      trex.velocityY=0
    trex.changeAnimation("collided",trex_collided);
    gameOver.visible = true;
    restart.visible = true;
  }
    
  trex.collide(invisibleGround);
  
  //aparece las nubes
if(mousePressedOver(restart)){
  reset();
}
  drawSprites();
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
}
function spawnClouds() {
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudsGroup.add(cloud);
    
    //asigna ciclo de vida a la variable
    cloud.lifetime = 200
    
    //ajusta la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
  }
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(width+20,height-95,10,40);
    obstacle.scale = 0.3 
    obstacle.velocityX = -6-score/100 
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
        break;
        
        case 2: obstacle.addImage(obstacle2);
        break;
        
        case 3: obstacle.addImage(obstacle3);
        break;
        
        case 4: obstacle.addImage(obstacle4);
        break;
        
        case 5: obstacle.addImage(obstacle5);
        break;
        
        case 6: obstacle.addImage(obstacle6);
      default: break;
        
    }
    obstacleGroup.add(obstacle)

  }
}

