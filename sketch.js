var path, mainCyclist, cycleBell;
var pathImg, mainRacerImg1, mainRacerImg2;

var pinkspawn=0, redspawn=0, yellowspawn=0;

var gameOver, gameOverI;

var rand, teamSelect;

var pinkTeam, redTeam, yellowTeam;

var pinkcyclists, redcyclists, yellowcyclists, pinkCyclistsI, yellowCyclistsI, redCyclistsI, pinkCyclistsD, yellowCyclistsD, redCyclistsD;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var y;

var distance = 0;

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  cycleBell = loadSound ("sound/bell.mp3");
  pinkCyclistsI = loadAnimation("opponent1.png", "opponent2.png");
  yellowCyclistsI = loadAnimation("opponent4.png", "opponent5.png");
  redCyclistsI = loadAnimation("opponent7.png", "opponent8.png");
  redCyclistsD = loadAnimation("opponent9.png");
  yellowCyclistsD = loadAnimation("opponent6.png");
  pinkCyclistsD = loadAnimation("opponent3.png");
  gameOverI = loadImage("gameOver.png");
}

function setup() {

  createCanvas(500, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.addAnimation("fell", mainRacerImg2);
  mainCyclist.scale = 0.07;
  
  gameOver = createSprite(250, 150, 100, 20);
  gameOver.addImage(gameOverI);
  gameOver.visible=false;
  gameOver.scale=0.75;
  
  pinkTeam = createGroup ();
  redTeam = createGroup ();
  yellowTeam = createGroup ();
}

function draw() {
  background(0);
  console.log(rand, teamSelect)
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);

  if (gameState === PLAY) {

    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);
    
    distance=World.seconds;

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }
    
    spawn()
    
    if (keyWentDown("space"))
      {
        cycleBell.play();
      }
    
    if (pinkTeam.isTouching(mainCyclist))
    {
      mainCyclist.changeAnimation("fell", mainRacerImg2)
      pinkTeam.destroyEach();
      redTeam.destroyEach();
      yellowTeam.destroyEach();
      gameState=END;
    } 
    if (redTeam.isTouching(mainCyclist))
    {
      mainCyclist.changeAnimation("fell", mainRacerImg2)
      pinkTeam.destroyEach();
      redTeam.destroyEach();
      yellowTeam.destroyEach();
      gameState=END;
    } 
    if (yellowTeam.isTouching(mainCyclist))
    {
      mainCyclist.changeAnimation("fell", mainRacerImg2)
      pinkTeam.destroyEach();
      redTeam.destroyEach();
      yellowTeam.destroyEach();
      gameState=END;
    } 
  }
  else if(gameState===END)
    {
      path.velocityX=0
      gameOver.visible=true
      text("Press Up Arrow to restart the Game!", 100, 200)
    }
}

function spawn()
{
  rand=Math.round(random(1,150))
  teamSelect=Math.round(random(1,3))
  y=random(50,250)
  if (rand<3)
    {
      if (teamSelect===1)
      {
        pinkcyclists=createSprite(500, y, 50, 50);
        pinkcyclists.addAnimation("pink", pinkCyclistsI);
        pinkcyclists.addAnimation("fellp", pinkCyclistsD)
        pinkcyclists.velocityX=-(2+distance/20);
        pinkcyclists.lifetime=250;
        pinkcyclists.scale=0.07;
        pinkTeam.add(pinkcyclists);
      }
      else if (teamSelect===2)
      {
        redcyclists=createSprite(500, y, 50, 50);
        redcyclists.addAnimation("red", redCyclistsI);
        redcyclists.velocityX=-(2+distance/20);
        redcyclists.lifetime=250;
        redcyclists.scale=0.07;
        redTeam.add(redcyclists);

      }
      if (teamSelect===3)
      {
        yellowcyclists=createSprite(500, y, 50, 50);
        yellowcyclists.addAnimation("yellow", yellowCyclistsI);
        yellowcyclists.velocityX=-(2+distance/20);
        yellowcyclists.lifetime=250;
        yellowcyclists.scale=0.07;
        yellowTeam.add(yellowcyclists);
      }
    }
  
}  