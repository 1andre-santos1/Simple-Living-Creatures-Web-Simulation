//blueprint for all the Predator creatures
function Predator()
{
    //inherit all the Creature class atributtes
    Creature.call(this);
    //set the color of all Predator creatures to be grey
    this.color = "#646464";
    //set the color of the ray of vision of all Predator creatures to be grey
    this.rayColor = "#868686";
    //override the Creature class speed attribute to be higher
    this.speed = Math.random() *  ((this.size / 6) -(-this.size / 6)) + (-this.size / 6);
    //set the horizontal speed to be equal to the speed
    this.speedX = this.speed;
    //set the vertical speed to be equal to the speed
    this.speedY = this.speed;
    //override the Creature class health attribute to be more specific to the Predator creatures
    this.health = Math.random() * (500 - 20) + 500; 
    //override the Creature class ray radius attribute to be more specific to the Predator creatures
    this.rayRadius = ((this.health*(this.size*2))/1000) * 4;
    
    //override the Creature class checkIsFoodOnView
    //(because the Predator creatures have other creatures as food)
    this.checkIsFoodOnView = function()
    {
        //lopp through all the active creatures
        for(var i = 0; i < creaturesManager.numberOfCreatures; i++)
        {
            //if the active creature doesn't exist or is this predator
            if(creaturesManager.activeCreatures[i] == null || creaturesManager.activeCreatures[i] == this)
                //exit this cycle and go for the next
                continue;
            
            //if the active creature is a Predator and have more health than this Predator
            if(creaturesManager.activeCreatures[i] instanceof Predator &&
                    creaturesManager.activeCreatures[i].health >= this.health)
                //exit this cycle and go for the next
                continue;
            
            //get the X coordinate of the center of this predator
            var centerOfCreatureX = this.x + (this.size/2);
            //get the Y coordinate of the center of this predator
            var centerOfCreatureY = this.y + (this.size/2);
            
            //get the X coordinate of the center of the active creature being analyzed
            var centerOfFoodX = creaturesManager.activeCreatures[i].x + (creaturesManager.activeCreatures[i].size/2);
            //get the Y coordinate of the center of the active creature being analyzed
            var centerOfFoodY = creaturesManager.activeCreatures[i].y + (creaturesManager.activeCreatures[i].size/2);
            
            //if the active creature being analyzed is on the ray of view of this predator
            if (centerOfCreatureX - this.rayRadius < creaturesManager.activeCreatures[i].x &&
                    centerOfCreatureX + this.rayRadius > creaturesManager.activeCreatures[i].x + creaturesManager.activeCreatures[i].size &&
                        centerOfCreatureY - this.rayRadius < creaturesManager.activeCreatures[i].y &&
                            centerOfCreatureY + this.rayRadius > creaturesManager.activeCreatures[i].y + creaturesManager.activeCreatures[i].size)
            {
                
                //if this predator is on the left of the active creature
                if(centerOfCreatureX < centerOfFoodX)
                {
                    //if the predator is moving left
                    if(this.speedX < 0)
                    {
                        //make the predator move towards the active creature(move right) by inverting the horizontal speed
                        this.speedX *= -1;
                    }
                }
                //if this predator is on the right of the active creature
                else if(centerOfCreatureX > centerOfFoodX)
                {
                    //if the predator is moving right
                    if(this.speedX > 0)
                    {
                        //make the predator move towards the active creature(move left) by inverting the horizontal speed
                        this.speedX *= -1;
                    }
                }
                //if this predator is above the food
                if(centerOfCreatureY  < centerOfFoodY)
                {
                    //if this predator is moving up
                    if(this.speedY < 0)
                    {
                        //make the predator move towards the active creature(move down) by inverting the vertical speed
                        this.speedY *= -1;
                    }
                }
                //if this predator is below the food
                else if(centerOfCreatureY > centerOfFoodY)
                {
                    //if this predator is moving down
                    if(this.speedY > 0)
                    {
                        //make the predator move towards the active creature(move up) by inverting the vertical speed
                        this.speedY *= -1;
                    }
                }
                
                //if this predator is colliding with the active creature being analyzed
                if (centerOfCreatureX - this.size < creaturesManager.activeCreatures[i].x &&
                    centerOfCreatureX + this.size > creaturesManager.activeCreatures[i].x &&
                        centerOfCreatureY - this.size < creaturesManager.activeCreatures[i].y &&
                            centerOfCreatureY + this.size > creaturesManager.activeCreatures[i].y)
                {
                    //increase the health of this predator
                    this.health += HEALTH_GAINED_PER_FOOD;
                    
                    //if this creature's health is greater or equal to the maximum divided by 2
                    if(this.health >= CREATURE_MAXIMUM_HEALTH / 2)
                        //stuck the health of the predator on the maximum divided by 2
                        this.health = CREATURE_MAXIMUM_HEALTH / 2;
                        
                    //remove the active creature that the predator eated from the active creatures list
                    creaturesManager.activeCreatures.splice(i,1);
                    //decrease the number of active creatures
                    creaturesManager.numberOfCreatures--;
                }
            }
        }
    };
    //returns true always, because the predatores are always an adult
    this.isAdult = function()
    {
        return true;
    };
}