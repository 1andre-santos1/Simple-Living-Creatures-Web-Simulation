const FRAMES_PER_SECOND = 30;
const SPAWNING_FOOD_TIME = 2;
const CREATURE_MAXIMUM_HEALTH = 2000;
const TIME_TO_BE_ADULT = 200;
const TIME_TO_GIVE_BIRTH = 200;
const HEALTH_GAINED_PER_FOOD = 500;

var creaturesManager,foodManager;
var gameLoop,foodSpawning;

var isAutoFeeding = true;
var isFeeding = false;
var isSpawningRandom = false;
var isSpawningMale = false;
var isSpawningFemale = false;
var isSpawningPredator = false;

//executed when the application loads
window.onload = function()
{   
    //get all the needed references to the HTML elements (canvas)
    getElementsReferences();
    //get the screen dimensions
    getScreenDimensions();
    //start the application processes
    startGame();
}

//restart the application
function restart()
{
    //if the game loop exists
    if(gameLoop != null)
        //stop the game loop
        clearInterval(gameLoop);
    //if the food spawning exists
    if(foodSpawning != null)
        //stop the food spawning
        clearInterval(foodSpawning);
    
    //start the application processes
    startGame();
}
//start the application processes
function startGame()
{
    //draw the black background
    ctxWorld.fillStyle = "#000000";
    ctxWorld.fillRect(0,0,screenWidth,screenHeight);
    
    //instantiate a new creatures and food managers
    creaturesManager = new CreaturesManager(10);
    foodManager = new FoodManager(10);
    
    //initialize the food(spawn initial food)
    foodManager.initFood();
    //spawn initial creatures
    creaturesManager.spawnCreatures();
    
    //draw initial creatures (this way doesnt wait for the game loop to be drew)
    creaturesManager.drawCreatures();
    
    //start the game loop
    gameLoop = setInterval(function(){
        //move all creatures
        creaturesManager.moveCreatures();
        //draw all creatures
        creaturesManager.drawCreatures();
        //draw all food
        foodManager.drawFood();
    },1000/FRAMES_PER_SECOND);
    
    //start the food spawning
    foodSpawning = setInterval(function(){
        //if the auto feeding isnt activated
        if(!isAutoFeeding)
            //exit this interval
            return;
        //spawn a new food
        foodManager.spawnFood();
    },1000*SPAWNING_FOOD_TIME);
    
    //make the dropdown menu font size to be relative to the screen width
    var dropdownMenu = document.getElementsByTagName('select')[0];
    if(screenWidth > 780)
        dropdownMenu.style.fontSize = "20px";
    else if(screenWidth > 700)
        dropdownMenu.style.fontSize = "18px";
    else if(screenWidth > 600)
        dropdownMenu.style.fontSize = "14px";
    else if(screenWidth > 500)
        dropdownMenu.style.fontSize = "12px";
    else if(screenWidth > 400)
        dropdownMenu.style.fontSize = "10px";
    else if(screenWidth > 300)
        dropdownMenu.style.fontSize = "8px";
    else if(screenWidth > 200)
        dropdownMenu.style.fontSize = "6px";
    else
        dropdownMenu.style.fontSize = "2px";
    
    //make the checkbox font size to be relative to the screen width
    var checkboxOption = document.getElementsByTagName('label')[0];
    if(screenWidth > 780)
        checkboxOption.style.fontSize = "20px";
    else if(screenWidth > 700)
        checkboxOption.style.fontSize = "18px";
    else if(screenWidth > 600)
        checkboxOption.style.fontSize = "14px";
    else if(screenWidth > 500)
        checkboxOption.style.fontSize = "12px";
    else if(screenWidth > 400)
        checkboxOption.style.fontSize = "10px";
    else if(screenWidth > 300)
        checkboxOption.style.fontSize = "8px";
    else if(screenWidth > 200)
        checkboxOption.style.fontSize = "6px";
    else
        checkboxOption.style.fontSize = "2px";
    
    //listen for mouse click or touch on the creatures canvas
    //(because the creatures canvas have a higher z-index (see css file) it is on a higher layer
    //so when the mouse or touch interacts with the screen it will be this canvas that will be listening)
    canvasCreatures.addEventListener('mousedown',handleInteraction);
}

//checks if the auto feed is enabled
function handleAutoFeed(value)
{
    isAutoFeeding = value.checked;
}
