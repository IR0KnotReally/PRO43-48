var canvas, backgroundImage;

var gameState = 0;
var playerCount, virCount;

var cases;

var stock;
var database;

var lab1, lab2, lab3, dish1, vi1, bact1, bact2, bact3, bact4, greet, finished, lost;

var dish, dish1;

var viGroup, otherMicrobesGroup;

var continue1;

var score = 0;

var theVi, unwantedMicrobes;

var form, player, game, vi;

function preload(){
  
}

function setup(){
  canvas = createCanvas(1075,505);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  dish = new Player();

  dish = createSprite(537.5,400,50,50);
  dish.visible = false;

  viGroup = new Group();
  otherMicrobesGroup = new Group();

 
}


function draw(){
    background(rgb(46, 139, 87));

    game.getState();

  if(playerCount === 1 && vi.name === null){
    game.update(1);
  }
  
  if(gameState === 1){
    game.start();
    if(player.name !== null && gameState < 2){
      textSize(24)
      fill("whitesmoke")
      text("Oh no! " + player.name + " there is a new virus and only you can find a vaccine for it by doing tasks before",70,150);
      text(" 2 million cases! You must Save The World! (Use touch in mobile or use mouse in computer to move).",-3,185);
    }
  }
  
  if(gameState === 2){
    game.play1();

    if(frameCount%100 === 0 && score !== 30){

      vi.cases = vi.cases+100000;

      vi.update();

      touchMoved();
    }

  }

  if(gameState === 3){
    game.roundEnded1();

  }

  if(vi.cases%100 !== 0){
    game.update(4);
  }

  if(gameState === 4){
    game.playLast();

    if(frameCount%100 === 0 && vi.cases !== 0 && vi.cases < 2000000){

      vi.cases = vi.cases+100000;

      vi.update();
    }
  }

  if(vi.cases >= 2000000){
    game.lose();
  }
}

function touchMoved(){
  return dish.x;
}