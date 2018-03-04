//make the management of all the food
function FoodManager(numberOfInitialFood)
{
    //number of active food
    this.numberOfFood = 0;
    //list of all the active food
    this.activeFood= [];
    
    //executed on the begining, spawns all the initial food
    this.initFood = function()
    {
        //loop a 'numberOfInitialFood' times
        for(var i = 0; i < numberOfInitialFood; i++)
            //spawn a food
            this.spawnFood();
    };
    //spawn a new food
    this.spawnFood = function()
    {
        //put inside the active food list a new food
        this.activeFood.push(new Food());
        //increase the number of active food
        this.numberOfFood++;
    };
    //draw all the active food
    this.drawFood = function()
    {
        //clear the food canvas
        ctxFood.clearRect(0,0,screenWidth,screenHeight);
        //loop through all the active food
        for(var i = 0; i < this.numberOfFood; i++)
            //draw this active food
            this.activeFood[i].draw();
    };
    //spawn a food at a given location
    this.spawnFoodAtLocation = function(x,y)
    {
        //assign to a variable a Food object
        var food = new Food();
        //set the position of the food to the given coordinates
        food.x = x;
        food.y = y;
        //put inside the active food list this new food
        this.activeFood.push(food);
        //increase the number of active food
        this.numberOfFood++;
    };
}