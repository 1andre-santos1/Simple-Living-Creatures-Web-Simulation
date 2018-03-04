//blueprint for all the Female creatures
function FemaleCreature()
{
    //inherit all the Creature class atributtes
    Creature.call(this);
    //set the color of all Female creatures to be pink
    this.color = "#880088";
    //set the color of the ray of vision of all Female creatures to be pink
    this.rayColor = "#550055";
    //set the gender of all Female creatures to be female
    this.gender = "female";
    //all females don't start pregnant
    this.isPregnant = false;
    //all females start with 0 of time pregnant
    this.timePregnant = 0;
    //override the Creature class health attribute to be more specific to the Female creatures
    this.health = Math.random() * (1500 - 1000) + 1000; 
}