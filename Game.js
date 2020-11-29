class Game {
    constructor(){
  
     lab1 = loadImage("Images/Lab1.jpg");
     dish1 = loadImage("Images/dish.png")
     vi1 = loadImage("Images/vi.png");
     bact1 = loadImage("Images/bact.png");
     bact2 = loadImage("Images/bact2.png");
     bact3 = loadImage("Images/bact3.png");
     bact4 = loadImage("Images/bact4.png");
     finished = loadImage("Images/Finished.png");
     lost = loadImage("Images/SadEarth.png");

     //cases = 0;
    }

    incScore(){
      if(score > 30){
      score += 1;
      }
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
     update(state){
      database.ref('/').update({
        gameState: state
      });
    }

    async start(){
      if(gameState === 0){
        player = new Player();
        vi = new Vi();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form();
        form.display();
      }  

      if(vi.name !== null && gameState < 3){
        game.update(2);

      }
    
    }

    play1(){
      form.hide();

      if(vi.cases%100 === 0 && vi.cases > 99 && vi.cases < 2000000){
      imageMode(CORNER);
      background(lab1,1075,500);

        dish.visible = true;

        dish.x = mouseX || dish1.x;
        dish.shapeColor = "blue";

        dish.addImage(dish1);
        dish.scale = 0.15;
        

        if(score >= 30 && vi.cases < 2000000){
          dish.visible = false;
        }

      textSize(30)
      fill("yellow");
      if(score !== 30){
      text("Trials: Collect 30 of the " + vi.name + " virus but avoid the other microbes!",90,90);
      text("Hint: The " + vi.name + " virus is pink.",90,125);
      }
      text("Cases: " + vi.cases, 800, 150);
      text("Score: " + score, 800, 180);

      if(frameCount%30 === 0){
        if(score !== 30){
        theVi = createSprite(random(20,1055),0,20,20);
        theVi.velocityY = 5;
        theVi.lifeTime = 100;
        }

        theVi.addImage(vi1);

        theVi.scale = 0.10

        viGroup.add(theVi);
      }

      if(frameCount%20 === 0){
        if(score !== 30){
        unwantedMicrobes = createSprite(random(20,1055),0,20,20);
        unwantedMicrobes.velocityY = 5;
        unwantedMicrobes.lifeTime = 100;
        }

        var rand = Math.round(random(1,4));

        switch(rand){
          case 1: unwantedMicrobes.addImage(bact1);
          break;
          case 2: unwantedMicrobes.addImage(bact2);
          break;
          case 3: unwantedMicrobes.addImage(bact3);
          break;
          case 4: unwantedMicrobes.addImage(bact4);
          break;
        }

        unwantedMicrobes.scale = 0.20;

        //unwantedMicrobes.shapeColor = "red";

        otherMicrobesGroup.add(unwantedMicrobes);
      }

      if(vi.name !== null){

        for(var i = 0; i<viGroup.length; i++){
          if(viGroup.get(i).isTouching(dish) && score !== 30){
            viGroup.get(i).destroy();

            score += 1;

            //vi.cases -= 50;
            //vi.update();
          }
        }

        for(var v = 0; v<otherMicrobesGroup.length; v++){
          if(otherMicrobesGroup.get(v).isTouching(dish) && score !== 30){
            otherMicrobesGroup.get(v).destroy();
      
            if(score !== 0){
            score -= 1;
            }
          }
        }

      //if(viGroup.isTouching(dish)){
        //score++;

        //viGroup.destroyEach();
      //}
    }
      if(score === 30){
        game.update(3);
      }

    }

      drawSprites();
    }

    roundEnded1(){
      form.show1();

      if(vi.cases%100 === 0 && vi.cases > 99 && vi.cases < 2000000){
        imageMode(CORNER);
        background(lab1,1075,500);

        textSize(30)
        fill("yellow");
        text("Great job " + player.name + "! Now you just have to deliver the " + vi.name + " vaccine",50,90);
        text("packages to different parts of the world!",50,125);

        dish.visible = true;

        if(score >= 30){
          dish.visible = false;
        }

        text("Cases: " + vi.cases, 800, 150);
        text("Score: " + score, 800, 180);
      }
      //console.log(player.stock);
    }

    playLast(){
      form.hide();


      if(vi.cases < 2000000){
      textSize(150)
      fill("yellow");
      text("Cases:" + vi.cases, 25, 250);

      form.show2();
      }

      if(vi.cases < 0){
        vi.cases = 0;
        vi.update();
      }

      if(vi.cases === 0){
        imageMode(CORNER);
        background(finished,1075,500);

        textSize(30)
        fill("white");
        text("Congratulations " + player.name + "! You have finally eradicated the " + vi.name + " virus!",50,430);
        text("You have Saved The World!",375,460);

        form.show3();
      
        form.hide1();
      }
    }
    lose(){  
      imageMode(CORNER);
      background(lost,1075,500);

      //if(vi.cases >= 200000){
      textSize(30)
      fill("black");
      text("Too late " + player.name + "! You weren't able to eradicate the " + vi.name + " virus!",50,430);
      
      form.show3();

      game.update(5);
     // }
    }
  }