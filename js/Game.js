class Game {
  constructor(){}

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
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    cars1 = createSprite(250,200);
    cars1.addImage(car1_Img);
    cars2 = createSprite(310,200);
    cars2.addImage(car2_Img);
    cars3 = createSprite(500,200);
    cars3.addImage(car3_Img);
    cars4 = createSprite(580,200);
    cars4.addImage(car4_Img);
    cars = [cars1, cars2, cars3, cars4];
    
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background("black");
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;
      var x = 0;
      var y ; 
      var display_position = 130;
      for(var plr in allPlayers){
        index = index + 1;
        x = x + 250;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index -1].y = y;
        if(index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);

          cars[index -1].shapecolor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
        if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=20
      player.update();
    }
    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);

    }
    drawSprites();
  }
  end(){
    console.log("FIN DEL JUEGO");
    console.log(player.rank);
  }
}
