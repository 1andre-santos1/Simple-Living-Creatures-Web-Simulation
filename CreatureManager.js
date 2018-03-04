//management of all the creatures
function CreaturesManager(numberOfCreatures)
{
    //number of creatures
    this.numberOfCreatures = numberOfCreatures;
    //list of all the active/living creatures
    this.activeCreatures = [];
    
    //used on the beginning spawns 'numberOfCreatures' creatures
    this.spawnCreatures = function(){
        //cycle a number of times equal to the numberOfCreatures given
        for(var i = 0; i < numberOfCreatures; i++)
        {
            //assign to a creature variable a random creature (Male or Female)
            var creature = (Math.random() < 0.5) ? new MaleCreature() : new FemaleCreature();
            //put this new creature inside the activeCreatures array
            this.activeCreatures.push(creature);
        }
    };
    //spawns a random creature (Male or Female) on a given coordinate
    this.spawnRandomCreatureAtLocation = function(x,y){
        //assign to a creature variable a random creature (Male or Female)
        var creature = (Math.random() < 0.5) ? new MaleCreature() : new FemaleCreature();
        //set the position of the creature to the coordinates given
        creature.x = x;
        creature.y = y;
        //put this new creature inside the activeCreatures array
        this.activeCreatures.push(creature);
        //increment the number of creatures
        this.numberOfCreatures++;
    };
    //spawns a Male creature on a given coordinate
    this.spawnMaleCreatureAtLocation = function(x,y){
        //assign to a creature variable a Male creature
        var creature = new MaleCreature();
        //set the position of the creature to the coordinates given
        creature.x = x;
        creature.y = y;
        //put this new creature inside the activeCreatures array
        this.activeCreatures.push(creature);
        //increment the number of creatures
        this.numberOfCreatures++;
    };
    //spawns a Male creature on a given coordinate
    this.spawnFemaleCreatureAtLocation = function(x,y){
        //assign to a creature variable a Female creature
        var creature = new FemaleCreature();
        //set the position of the creature to the coordinates given
        creature.x = x;
        creature.y = y;
        //put this new creature inside the activeCreatures array
        this.activeCreatures.push(creature);
        //increment the number of creatures
        this.numberOfCreatures++;
    };
    //spawns a Predator on a given coordinate
    this.spawnPredatorAtLocation = function(x,y){
        //assign to a creature variable a Predator creature
        var creature = new Predator();
        //set the position of the creature to the coordinates given
        creature.x = x;
        creature.y = y;
        //put this new creature inside the activeCreatures array
        this.activeCreatures.push(creature);
        //increment the number of creatures
        this.numberOfCreatures++;
    };
    //draw all the active creatures
    this.drawCreatures = function(){
        //clean the creatures canvas
        ctxCreatures.clearRect(0,0,screenWidth,screenHeight);
        //loop a 'numberOfCreatures' times
        for(var i = 0; i < this.numberOfCreatures; i++)
            //draw this active creature
            this.activeCreatures[i].draw();
    };
    //move all the active creatures
    this.moveCreatures = function(){
        //loop a 'numberOfCreatures' times
        for(var i = 0; i < this.numberOfCreatures; i++)
        {
            //move this active creature
            this.activeCreatures[i].move();
            
            //if this active creature is undefined (doesn't exist)
            if(this.activeCreatures[i] === undefined)
                //exit this cycle and go for the next
                continue;
            
            //if this active creature is dead
            if(this.activeCreatures[i].isDead())
            {
                //remove this active creature from the activeCreatures list
                this.activeCreatures.splice(i,1);
                //decrease the number of creatures
                this.numberOfCreatures--;
                //exit this cycle and go for the next
                continue;
            }
            
            //if this active creature is Female and it is pregnant
            if(this.activeCreatures[i].gender == "female" && this.activeCreatures[i].isPregnant)
            {
                //increase the time pregnant of this active creature
                this.activeCreatures[i].timePregnant++;
                
                //if it is time to this active creature give birth
                if(this.activeCreatures[i].timePregnant >= TIME_TO_GIVE_BIRTH)
                {
                    //assign to a creature variable a random creature (Male or Female)
                    var creature = (Math.random() < 0.5) ? new MaleCreature() : new FemaleCreature();
                    //set the position of this new creature around the 'mother' position
                    creature.x = this.activeCreatures[i].x - this.activeCreatures[i].size;
                    creature.y = this.activeCreatures[i].y - this.activeCreatures[i].size;
                    //put this new creature inside the activeCreatures array
                    this.activeCreatures.push(creature);
                    //increase the number of creatures
                    this.numberOfCreatures++;
                    
                    //this active creature is no longer pregnant
                    this.activeCreatures[i].isPregnant = false;    
                    //the time pregnant of this active creature is set to 0
                    this.activeCreatures[i].timePregnant = 0;    
                }
            }
        }
        //check for collisions on all the active creatures
        this.checkCollisionsBetweenCreatures();
    };
    //check for collisions on all the active creatures
    this.checkCollisionsBetweenCreatures = function(){
        //this loop represents the first creature on the comparison
        for(var firstCreature = 0; firstCreature < this.numberOfCreatures - 1; firstCreature++)
        {
            //this loop represents the second creature on the comparison
            for(var secondCreature = firstCreature + 1; secondCreature < this.numberOfCreatures; secondCreature++)
            {
                //if the two creatures are colliding
                if (this.activeCreatures[firstCreature].x < this.activeCreatures[secondCreature].x + this.activeCreatures[secondCreature].rayRadius &&
                           this.activeCreatures[firstCreature].x + this.activeCreatures[firstCreature].rayRadius > this.activeCreatures[secondCreature].x &&
                               this.activeCreatures[firstCreature].y < this.activeCreatures[secondCreature].y + this.activeCreatures[secondCreature].rayRadius &&
                                   this.activeCreatures[firstCreature].rayRadius + this.activeCreatures[firstCreature].y > this.activeCreatures[secondCreature].y)
                {
                    //if the two creatures are of the same gender OR one of them is a Predator
                    if(this.activeCreatures[firstCreature].gender == this.activeCreatures[secondCreature].gender ||
                            this.activeCreatures[firstCreature] instanceof Predator || 
                                this.activeCreatures[secondCreature] instanceof Predator)
                        //exit this cycle and go for the next
                        //(because same gender can't reproduce and a predator can't have childs)
                        continue;
                    
                    //assign to a variable the female creature
                    var female = (this.activeCreatures[firstCreature].gender == "female") ? 
                                        this.activeCreatures[firstCreature] :
                                            this.activeCreatures[secondCreature];
                    //assign to a variable the male creature
                    var male = (this.activeCreatures[firstCreature].gender == "male") ? 
                                        this.activeCreatures[firstCreature] :
                                            this.activeCreatures[secondCreature];
                    
                    //if the female creature is dying
                    if(female.health/10 <= 40)
                        //exit this cycle and go for the next
                        //(because dying females can't reproduce)
                        continue;
                    
                    //if the female isn't pregnant AND both creatures are adults
                    if(!female.isPregnant && female.isAdult() && male.isAdult())
                        //the female becomes pregnant
                        female.isPregnant = true;
                }
            }
        }
    };
}