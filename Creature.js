//blueprint for all the creatures
function Creature()
{   
    //the size of the this creature (relative to the width and height of the screen)
    this.size = (screenWidth > screenHeight) ? 
                    (screenWidth / screenHeight) * 12 :
                        (screenHeight / screenWidth) * 12;
    //this creature health
    this.health = 1000;
    //this creature color (grey)
    this.color = "#888888";
    //this creature ray of vision color(grey)
    this.rayColor = "#888888";
    //this creature ray of vision radius
    this.rayRadius = (this.health*(this.size*2))/1000;
    //this creature gender
    this.gender = "undefined";
    //this creature initial speed (all of the different speeds on a creature's life are relative to this)
    this.speed = Math.random() *  ((this.size / 10) -(-this.size / 10)) + (-this.size / 10);
    //this creature current speed (on any moment)
    this.currentSpeed = (this.health * this.speed) / (CREATURE_MAXIMUM_HEALTH/2);
    //this creature horizontal speed
    this.speedX = this.currentSpeed;
    //this creature vertical speed
    this.speedY = this.currentSpeed;
    //this creature X coordinate
    this.x = (Math.random() * (screenWidth - this.size)) + this.size;
    //this creature Y coordinate
    this.y = (Math.random() * (screenHeight - this.size)) + this.size;
    //this creature time alive
    this.timeAlive = 0;
    
    //this creature moving function
    this.move = function(){
        //set this creature current speed to be relative to the health,speed and creatures maximum health
        this.currentSpeed = (this.health * this.speed) / (CREATURE_MAXIMUM_HEALTH/2);
        
        //set this creature horizontal speed to be equal to the negative value of this creature current speed when negative, and to the positive value of this creature current speed when positive
        this.speedX = (this.speedX < 0) ? 
                            - Math.abs(this.currentSpeed) : 
                                Math.abs(this.currentSpeed);
        //set this creature vertical speed to be equal to the negative value of this creature current speed when negative, and to the positive value of this creature current speed when positive
        this.speedY = (this.speedY < 0) ? 
                            - Math.abs(this.currentSpeed) : 
                                Math.abs(this.currentSpeed);
                                    
        //check if there's any food on this creature ray of vision
        this.checkIsFoodOnView();
        
        //increment the value of the X coordinate of this creature by the value of the horizontal speed
        this.x += this.speedX;
        //increment the value of the Y coordinate of this creature by the value of the vertical speed
        this.y += this.speedY;
        
        //if this creature is exiting the left boundarie of the screen
        if(this.x - this.rayRadius < 0)
        {
            //if the horizontal speed is negative
            //(without this check there will be special cases where the creature will be stuck,
            //endlessly inverting the horizontal speed value from positive to negative and vice versa)
            if(this.speedX < 0)
                //invert the value of the horizontal speed
                this.speedX *= -1;
        }
        //if this creature is exiting the right boundarie of the screen
        if(this.x + this.rayRadius > screenWidth)
        {
            //if the horizontal speed is positive
            //(without this check there will be special cases where the creature will be stuck,
            //endlessly inverting the horizontal speed value from positive to negative and vice versa)
            if(this.speedX > 0)
                //invert the value of the horizontal speed
                this.speedX *= -1;
        }
        //if this creature is exiting the top boundarie of the screen
        if(this.y - this.rayRadius < 0)
        {
            //if the vertical speed is negative
            //(without this check there will be special cases where the creature will be stuck,
            //endlessly inverting the vertical speed value from positive to negative and vice versa)
            if(this.speedY < 0)
                //invert the value of the vertical speed
                this.speedY *= -1;
        }
        //if this creature is exiting the bottom boundarie of the screen
        if(this.y + this.rayRadius > screenHeight)
        {
            //if the vertical speed is positive
            //(without this check there will be special cases where the creature will be stuck,
            //endlessly inverting the vertical speed value from positive to negative and vice versa)
            if(this.speedY > 0)
                //invert the value of the vertical speed
                this.speedY *= -1;
        }

        //decrease the health of this creature
        this.health--;
        //update the radius of the ray of vision of this creature
        this.rayRadius = (this.health*(this.size*2))/1000;
        
        //if the radius of the ray of vision is less or equal to the size of this creature
        if(this.rayRadius <= this.size)
            //don't make the ray radius lower, set it equal to this creature size
            this.rayRadius = this.size;
            
        //increment this creature time alive
        this.timeAlive++;
    };
    //this creature drawing function
    this.draw = function(){
        //if this creature is an adult
        if(this.isAdult())
        {   
            //draw this creature
            drawFilledRect(canvasCreatures,this.x,this.y,this.size,this.size,this.color);
            //draw this creature ray of view
            drawCircle(canvasCreatures,this.x + this.size/2,this.y + this.size/2,this.rayRadius,this.rayColor);
        }
        //otherwise
        else
        {
            //draw this creature with a size divided by 2
            drawFilledRect(canvasCreatures,this.x,this.y,this.size/2,this.size/2,this.color);
            //draw this creature ray of view with a radius divided by 2
            drawCircle(canvasCreatures,this.x + this.size/4,this.y + this.size/4,this.rayRadius/2,this.rayColor);
        }
        
        //set the color of the stats text
        ctxCreatures.fillStyle = "#FFFFFF";
        
        //set the size of the stats text font relative to the screen width
        var fontSize;
        if(screenWidth > 900)
            fontSize = 10;
        else if(screenWidth > 450)
            fontSize = 6;
        else
            fontSize = 4;
        
        //set the stats text font
        ctxCreatures.font = fontSize+"px Arial";
        //write the speed stat
        ctxCreatures.fillText("Speed: "+Math.abs(Math.round(this.currentSpeed * 100) / 100),this.x - this.size,this.y - this.size*2);
        //write the health stat
        ctxCreatures.fillText("Health: "+Math.floor(this.health/10),this.x - this.size,this.y - this.size*1.5);
        //write the age stat
        var age = (this.isAdult()) ? "Adult" : "Child";
        ctxCreatures.fillText("Age: "+age,this.x - this.size,this.y - this.size);
        //write the state stat
        var state = "";
        if(this.isPregnant)
            state += "Pregnant ";
        if(this.health/10 <= 40)
            state += "Dying ";
        if(state == "")
            state = "Roaming"
        ctxCreatures.fillText("State: "+state,this.x - this.size,this.y - this.size/2);
        
        //if this creature is not female
        if(this.gender != "female")
            //exit the drawing function
            return;
        
        //if this female creature is pregnant
        if(this.isPregnant)
            //draw the growing 'fetus' circle
            drawCircle(canvasCreatures,this.x + this.size/2,this.y + this.size/2,(this.timePregnant * (this.size/2))/200,"#000000");
    };
    //check if there's food on the ray of view of this creature
    this.checkIsFoodOnView = function(){
        //loop through all the active food
        for(var i = 0; i < foodManager.numberOfFood; i++)
        {
            //if this active food doesnt exist
            if(foodManager.activeFood[i] == null)
                //exit this cycle and go for the next
                continue;
            
            //get the X coordinate of the center of this creature
            var centerOfCreatureX = this.x + (this.size/2);
            //get the Y coordinate of the center of this creature
            var centerOfCreatureY = this.y + (this.size/2);
            //get the X coordinate of the center of the active food being analyzed
            var centerOfFoodX = foodManager.activeFood[i].x + (foodManager.activeFood[i].size/2);
            //get the Y coordinate of the center of the active food being analyzed
            var centerOfFoodY = foodManager.activeFood[i].y + (foodManager.activeFood[i].size/2);

            //if the food being analyzed is on the ray of view of this creature
            if (centerOfCreatureX - this.rayRadius < foodManager.activeFood[i].x &&
                    centerOfCreatureX + this.rayRadius > foodManager.activeFood[i].x + foodManager.activeFood[i].size &&
                        centerOfCreatureY - this.rayRadius < foodManager.activeFood[i].y &&
                            centerOfCreatureY + this.rayRadius > foodManager.activeFood[i].y + foodManager.activeFood[i].size)
            {
                //if this creature is on the left of the food
                if(centerOfCreatureX < centerOfFoodX)
                {
                    //if the creature is moving left
                    if(this.speedX < 0)
                    {
                        //make the creature move towards the food(move right) by inverting the horizontal speed
                        this.speedX *= -1;
                    }
                }
                //if this creature is on the right of the food
                else if(centerOfCreatureX > centerOfFoodX)
                {
                    //if the creature is moving right
                    if(this.speedX > 0)
                    {
                        //make the creature move towards the food(move left) by inverting the horizontal speed
                        this.speedX *= -1;
                    }
                }
                //if this creature is above the food
                if(centerOfCreatureY  < centerOfFoodY)
                {
                    //if this creature is moving up
                    if(this.speedY < 0)
                    {
                        //make the creature move towards the food(move down) by inverting the vertical speed
                        this.speedY *= -1;
                    }
                }
                //if this creature is below the food
                else if(centerOfCreatureY > centerOfFoodY)
                {
                    //if this creature is moving down
                    if(this.speedY > 0)
                    {
                        //make the creature move towards the food(move up) by inverting the vertical speed
                        this.speedY *= -1;
                    }
                }
                
                //if this creature is colliding with the food being analyzed
                if (centerOfCreatureX - this.size/2 < foodManager.activeFood[i].x &&
                    centerOfCreatureX + this.size/2 > foodManager.activeFood[i].x &&
                        centerOfCreatureY - this.size/2 < foodManager.activeFood[i].y &&
                            centerOfCreatureY + this.size/2 > foodManager.activeFood[i].y)
                {
                    //increase the health of this creature
                    this.health += HEALTH_GAINED_PER_FOOD;
                    
                    //if this creature's health is greater or equal to the maximum
                    if(this.health >= CREATURE_MAXIMUM_HEALTH)
                        //make the health of this creature stuck on the maximum
                        this.health = CREATURE_MAXIMUM_HEALTH;
                        
                    //remove the food being analyzed (that the creature eated) from the active food list
                    foodManager.activeFood.splice(i,1);
                    //decrease the number of active food
                    foodManager.numberOfFood--;
                }
            }
        }
    };
    //returns true if this creature is an adult
    this.isAdult = function()
    {
        return (this.timeAlive > TIME_TO_BE_ADULT);
    };
    //returns true if this creature is dead
    this.isDead = function()
    {
        return (this.health <= 0);
    };
}