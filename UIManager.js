var screenWidth,screenHeight;
var canvasWorld,ctxWorld;
var canvasCreatures,ctxCreatures;
var canvasFood,ctxFood;

//get the screen dimensions and make the canvas dimensions relative to it
function getScreenDimensions()
{
    //get the width and height of the screen
    screenWidth = Math.max(document.documentElement.clientWidth || window.innerWidth || 0);
    screenHeight = Math.max(document.documentElement.clientHeight || window.innerHeight || 0);
    
    //make the canvas width and height attributes relatives to the screen dimensions
    canvasWorld.setAttribute('width',screenWidth);
    canvasWorld.setAttribute('height',screenHeight);
    canvasCreatures.setAttribute('width',screenWidth);
    canvasCreatures.setAttribute('height',screenHeight);
    canvasFood.setAttribute('width',screenWidth);
    canvasFood.setAttribute('height',screenHeight);
}
//get references to the HTML canvas elements
function getElementsReferences()
{
    canvasWorld = document.getElementById('world');
    ctxWorld = canvasWorld.getContext('2d');
    canvasCreatures = document.getElementById('creatures');
    ctxCreatures = canvasCreatures.getContext('2d');
    canvasFood = document.getElementById('food');
    ctxFood = canvasFood.getContext('2d');
}

//dropdown options management, choose an action given the selected index
function chooseAction(index)
{
    switch(index)
    {
        case 0:
            isFeeding = false;
            isSpawningRandom = false;
            isSpawningMale = false;
            isSpawningFemale = false;
            isSpawningPredator = false;
            break;
        case 1:
            restart();
            isFeeding = false;
            isSpawningRandom = false;
            isSpawningMale = false;
            isSpawningFemale = false;
            isSpawningPredator = false;
            break;
        case 2:
            isFeeding = true;
            isSpawningRandom = false;
            isSpawningMale = false;
            isSpawningFemale = false;
            isSpawningPredator = false;
            break;
        case 3:
            isFeeding = false;
            isSpawningRandom = true;
            isSpawningMale = false;
            isSpawningFemale = false;
            isSpawningPredator = false;
            break;
        case 4:
            isFeeding = false;
            isSpawningRandom = false;
            isSpawningMale = true;
            isSpawningFemale = false;
            isSpawningPredator = false;
            break;
        case 5:
            isFeeding = false;
            isSpawningRandom = false;
            isSpawningMale = false;
            isSpawningFemale = true;
            isSpawningPredator = false;
            break;
        case 6:
            isFeeding = false;
            isSpawningRandom = false;
            isSpawningMale = false;
            isSpawningFemale = false;
            isSpawningPredator = true;
            break;
    }
}
//sees what variable is true when the user clicks on the canvas, and then executes a function on click
//given the present state
function handleInteraction(e)
{
    if(isFeeding)
        foodManager.spawnFoodAtLocation(e.clientX,e.clientY);
    else if(isSpawningRandom)
        creaturesManager.spawnRandomCreatureAtLocation(e.clientX,e.clientY);
    else if(isSpawningMale)
        creaturesManager.spawnMaleCreatureAtLocation(e.clientX,e.clientY);
    else if(isSpawningFemale)
        creaturesManager.spawnFemaleCreatureAtLocation(e.clientX,e.clientY);
    else if(isSpawningPredator)
        creaturesManager.spawnPredatorAtLocation(e.clientX,e.clientY);
}