
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var scoreText = document.getElementById('xd');
document.addEventListener("keydown", setDirection);

const tileSize = 40;
const boardColor = 'lightgreen';
const horTiles = canvas.width/tileSize;
const verTiles = canvas.height/tileSize;
let fps = 13;
const snakeColor = 'black';
const snakeSpeed = tileSize;

let xDir = 0;
let yDir = 0;

let snakePosX = Math.floor(Math.random() * horTiles) * tileSize;
let snakePosY = Math.floor(Math.random() * verTiles) * tileSize;

let foodPosX = 400;
let foodPosY = 400;

let isRunning = true;

let score = 0;

let tailLength = 3;

let bodyParts = [];



function gameLoop(){

    drawBoard();
    food();
    drawSnake();
    
    moveSnake();
    checkWalls();

    
    

    setTimeout(gameLoop, 1000/fps)

}

function drawBoard(){

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = boardColor;
    
    for(let i = 0; i < horTiles; i++){

        for (let j = 0; j < verTiles; j++){
            ctx.fillRect(i*tileSize, j*tileSize, tileSize-1, tileSize-1);
            // if(i == verTiles-1){
            //     ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize-1);
            // }
            // if(j == horTiles-1){
            //     ctx.fillRect(i*tileSize, j*tileSize, tileSize-1, tileSize);
            // }
        }
    }
}
function drawSnake(){

 

    bodyParts = bodyParts.slice(-1 * tailLength);

    ctx.fillStyle = 'darkgrey';
    bodyParts.forEach(part => ctx.fillRect(part.x, part.y, tileSize, tileSize))
    
    ctx.fillStyle = 'black';
    ctx.fillRect(snakePosX,snakePosY,tileSize-1, tileSize-1);

}
function moveSnake(){
    snakePosX += xDir * snakeSpeed;
    snakePosY += yDir * snakeSpeed;

    bodyParts.push({x: snakePosX, y:snakePosY});


}

function checkWalls(){

    if(snakePosX > canvas.width - 5 ) {snakePosX = 0;}
    if(snakePosX < 0 ) {snakePosX = canvas.width;}
    if(snakePosY > canvas.height - 5 ) {snakePosY = 0;}
    if(snakePosY < 0 ) {snakePosY = canvas.height;}

    

}

function setDirection(event){


    switch(event.key){

        case "ArrowUp":
            if(yDir != 1){
                yDir = -1;
                xDir = 0;}
            break;

        case "ArrowDown":
            if(yDir != -1){
                yDir = 1;
                xDir = 0;}
            break;

        case "ArrowLeft":
            if(xDir != 1){
                xDir = -1;
                yDir = 0;}
            break;

        case "ArrowRight":
            if(xDir != -1){
                xDir = 1;
                yDir = 0;}
            break;
    }



}
function food(){

    ctx.fillStyle = 'red';
    ctx.fillRect(foodPosX, foodPosY, tileSize, tileSize);

    if (snakePosX === foodPosX && snakePosY === foodPosY){
        foodPosX = Math.floor(Math.random() * horTiles) * tileSize;
        foodPosY = Math.floor(Math.random() * verTiles) * tileSize;

        score+=10;
        tailLength++;
    
    

        scoreText.innerHTML = `score: ${score}`;

        if (score % 70 == 0){
            fps++;}

        }


}

gameLoop();