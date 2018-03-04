//blueprint for all the Male creatures
function MaleCreature()
{
    //inherit all the Creature class atributtes
    Creature.call(this);
    //set the color of all Male creatures to be blue
    this.color = "#0000AA";
    //set the color of the ray of vision of all Male creatures to be blue
    this.rayColor = "#000088";
    //set the gender of all Male creatures to be male
    this.gender = "male";
    //override the Creature class speed attribute to be higher
    this.speed = Math.random() *  ((this.size / 8) -(-this.size / 8)) + (-this.size / 8);
    //set the horizontal speed to be equal to the speed
    this.speedX = this.speed;
    //set the vertical speed to be equal to the speed
    this.speedY = this.speed;
    //override the Creature class health attribute to be more specific to the Male creatures
    this.health = Math.random() * (1200 - 800) + 800; 
}