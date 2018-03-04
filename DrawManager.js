//draw a not filled circle
function drawCircle(canvas,centerX,centerY,radius,strokeColor)
{
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
}
//draw a filled rectangle
function drawFilledRect(canvas,topLeftX,topLeftY,width,height,fillColor)
{
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX,topLeftY,width,height);
}