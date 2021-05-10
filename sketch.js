//Create variables here

var database
var hdog, ndog, dog
var foodStock, foodS, fedTime
var feed, addFood
var foodObj


function preload()
{
	//load images here

  hdog = loadImage("images/dogImg1.png")
  ndog = loadImage("images/dogImg.png")


}

function setup() {
	createCanvas(950, 725);

  database = firebase.database()

 dog = createSprite(599, 400, 50, 50)

 dog.addImage(ndog)
 dog.scale = 0.35
  
 foodStock = database.ref("Food")
 foodStock.on("value", readStock)

 feed=createButton("Feed the Dog !")
 feed.position(700, 95)
 feed.mousePressed(feedDog);
 
 addFood=createButton("add food")
 addFood.position(900, 95)
 addFood.mousePressed(addFoods);

 foodObj = new food(200, 200, 200, 200)

}


function draw() {  

  background(46, 139, 87);

// if(keyWentDown(UP_ARROW)){
//   writeStock(foodS);
//   dog.addImage(hdog);

// }

  fedTime=database.ref('feed_time');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  

textSize(15)

  fill("white")

text("food remaining " + foodS, 170, 80)

  //add styles here

foodObj.updateFoodStock(foodS)

foodObj.display()




drawSprites();


}

function readStock(data){

  foodS = data.val()

}
function writeStock(x){
  
if(x <=0 ){

x=0;

}else{

x=x-1;

}

database.ref('/').update({
  Food:x
})

}
function addFoods(){

foodS++

database.ref("/").update({

  Food:foodS

})

}
function feedDog(){

  dog.addImage(hdog);

  if(foodS>= 1){

    foodS = foodS - 1

  }
  database.ref("/").update({

    Food:foodS
  
  })

  database.ref("/").update({

    feed_time:hour()

  })

}
