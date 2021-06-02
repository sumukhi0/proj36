var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedDog;
var foodObj,feed,fedTime;

//create feed and lastFed variable here
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  fill(255,255,254);
  textSize(15);
 
  //write code to display text lastFed time here
  if(lastFed>=12){
    text("Last Feed: 3 PMS",20,50);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :9 AM",20,100);
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
 //write code here to update food stock and last fed time
  dog.addImage(happyDog); 
  var food_stock_val = foodObj.getFoodStock(); 
  if(food_stock_val <= 0){ 
    foodObj.updateFoodStock(food_stock_val *0); 
  }else{ 
    foodObj.updateFoodStock(food_stock_val -1); 
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  });
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
