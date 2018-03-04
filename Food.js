//blueprint for all the Food
function Food()
{
    //size of the food, relative to the width and height of the screen
    this.size = (screenWidth / screenHeight) * 4;
    //set the color of all food to be red
    this.color = "#FF0000";
    //set the x coordinate of this food to a random x coordinate between the x boundaries of the screen
    this.x = (Math.random() * (screenWidth - this.size)) + this.size;
    //set the y coordinate of this food to a random y coordinate between the y boundaries of the screen
    this.y = (Math.random() * (screenHeight - this.size)) + this.size;
    
    //draw this food
    this.draw = function(){
        ctxFood.fillStyle = this.color;
        ctxFood.fillRect(this.x,this.y,this.size,this.size);
    };
}