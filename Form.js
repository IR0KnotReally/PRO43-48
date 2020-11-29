class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h4');
    this.greeting2 = createElement('h4');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
    this.reset2 = createButton('Reset');
    this.input2 = createInput("Name the virus");
    this.continue = createButton('Continue');
    this.continue2 = createButton('Continue');
    this.send = createButton('Send Packs');
  }

  hide(){
    this.greeting.hide();
    this.greeting2.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
    this.input2.hide();
    this.continue.hide();
    this.continue2.hide();
    this.reset.hide();
    this.send.hide();
  }

  hide1(){
    this.send.hide();
  }

  show(){
    this.reset.show();
  }

  show1(){
    this.continue2.show();
  }

  show2(){
    this.send.show();
  }

  show3(){
    this.reset2.show();
  }

  display(){

    this.title.html("Save The World!");
    this.title.position(650,175);

    this.input.position(675,300);
    this.button.position(740,350);
    this.reset.position(735,400);
    this.reset2.position(735,620);
    this.input2.position(675,400);
    this.continue.position(735,500);
    this.continue2.position(735,600);
    this.send.position(675,550);
    this.reset2.hide();
    this.input2.hide();
    this.continue.hide();
    this.continue2.hide();
    this.send.hide();
    //this.reset.hide();

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      this.input2.show();
      this.continue.show();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      /*
      this.greeting.html("Oh no! " + player.name + " there is a new virus and only you can find a vaccine for it by doing tasks before");
      this.greeting.position(300, 300); 
      this.greeting2.html(" 2 million cases! You must Save The World! (Use touch in mobile or use mouse in computer to move).");
      this.greeting2.position(260, 325);
      */
    });

    this.continue.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      vi.name = this.input2.value();
      vi.index = virCount;
      vi.update();
      //game.update(2);
    });

    this.continue2.mousePressed(()=>{
      //score = score+1;
      vi.cases -= 50;
      vi.update();
    });

    this.send.mousePressed(()=>{
      vi.cases -= 100000;
      vi.update();
    });
    
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
    //Player.updateCarsAtEnd(0);
      Player.updatePlayer();
      Vi.updateVi();
    });

    this.reset2.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      Player.updatePlayer();
      Vi.updateVi();

      vi.cases = 0;
    });
  }
}
