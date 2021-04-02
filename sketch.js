var dog,happyDog,sadDog,database,foodS,foodStock;
var sadDogImg,happyDogImg, sleepyDog;
var bg
var feedButton,addFoodButton;
var food;
var fedTime;
var readState,gameState;
function preload(){

  sadDogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happy dog.png");
  sleepyDog = loadImage("Sleepy dog.png");
  bg = loadImage("BG.jpeg");

}

function setup() {
  database = firebase.database();

  createCanvas(900,500);

  dog = createSprite(750,200,15,15);
  dog.addImage(sadDogImg);
  dog.scale=0.15;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  food = new Food();

  fedTime = database.ref("fedTime");
  fedTime.on("value",function(data){
    fedTime = data.val();
  });

  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  });

  feedButton = createButton("Feed The Dog");
  feedButton.position(685,100);
  feedButton.mousePressed(feedDog);

  addFoodButton = createButton("Add Food");
  addFoodButton.position(795,100);
  addFoodButton.mousePressed(addFood);

}
function draw() {

  currentTime = hour();
  background(bg);  
  food.display();
  drawSprites();
  textSize(20);
  fill("white");
  text("MONSTER-FOOD remaining: "+foodS,170,100);

  if(fedTime>=12){

        fill("white");
        textSize(15); 
        text("Last Fed : "+ fedTime%12 + " PM", 350,30);
        }
        else if(fedTime==0){
            fill("white");
            textSize(15); 
             text("Last Fed : 12 AM",350,30);
        }
        else{
            fill("white");
            textSize(15); 
            text("Last Fed : "+ fedTime + " AM", 350,30);
        }
        if (foodS <= 0){

          dog.addImage(sleepyDog);
      
        }
}
function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}
function feedDog(){

    dog.addImage(happyDogImg);
    dog.scale = 0.3;
    foodS--;
    database.ref("/").update({
      Food : foodS
    })
    fedTime = hour(); 
}
function addFood(){

  dog.addImage(sadDogImg);
  dog.scale=0.15;
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}