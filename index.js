let inputDir={x:0,y:0};
//game function

let snakeArr = [
    {x:13,y:10}
];
food = {x:6,y:10};
let lastPaintTime=0;
speed=5;
score=0;
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    // console.log(ctime);
    gameEngine();
}
function isCollide(sarr)
{
    for(let i=1;i<sarr.length;i++)
    {
        if(sarr[i].x==sarr[0].x && sarr[i].y==sarr[0].y)
        {
            return true;
        }
    }
    if(sarr[0].x<0 || sarr[0].x>27 || sarr[0].y<0 || sarr[0].y>18)
    {
        return true;
    }
    return false;
}
function gameEngine()
{
    // part 1 : updating snake and food
    if(isCollide(snakeArr))
    {
        alert("GAME OVER");
        inputDir={x:0,y:0};
        snakeArr=[{x:13,y:10}];
        score=0;
    }
    // snake eats the food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
    {
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        food ={x:Math.round(2+(25-2)*Math.random()),y:Math.round(2+(16-2)*Math.random())};
        score+=1;
    }

    //moving the the snake
    for(let i = snakeArr.length-2; i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    // part 2 : display food and snake making it a html element
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake_body');
        }
        board.appendChild(snakeElement);
    })
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1};
    switch(e.key)
    {
        case "ArrowUp":
            console.log("up");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("down");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            console.log("right");
            inputDir.x=1;
            inputDir.y=0;
            break;
        case "ArrowLeft": 
        console.log("left");
        inputDir.x=-1;
        inputDir.y=0;  
            break; 
        default:
            break;            
    }
})