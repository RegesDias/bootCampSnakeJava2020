let canvas = document.getElementById('snake');
let context = canvas.getContext("2d");
let box = 16;
let pontos = 0;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 +1) * box,
    y: Math.floor(Math.random() * 15 +1) * box,
}
function carregar(){
    document.location.reload(true);
}
/*CAMPO*/
function criarCampo(){
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 30 * box, 30 * box);
    limiteCampo();
}

function limiteCampo(){
    if(snake[0].x > 29 * box && direction == 'right'){
        clearInterval(jogo);
        alert("Game Over !");
    }
    if(snake[0].x < 0 && direction == 'left'){
        clearInterval(jogo);
        alert("Game Over !");
    }
    if(snake[0].y > 29 * box && direction == 'down'){
        clearInterval(jogo);
        alert("Game Over !");    
    }
    if(snake[0].y < 0 && direction == 'up'){
        clearInterval(jogo);
        alert("Game Over !");  
    };
}
/*SNAKE*/
function criarSnake(){
    for (let index = 0; index < snake.length; index++) {
        context.fillStyle = 'green';
        context.fillRect(snake[index].x, snake[index].y, box, box);
    }
    moveSnake();
    encostarCalda();
}
function moveSnake(){
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
       food.x = Math.floor(Math.random() * 15 +1) * box;
       food.y = Math.floor(Math.random() * 15 +1) * box;
       pontos = pontos +10;
       document.getElementById('pontos').innerHTML="Pontos: " + pontos;
    }

    let newHead = {
        x:snakeX,
        y:snakeY,
    }
    snake.unshift(newHead);
}
function teclado(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';

}
function encostarCalda(){
    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over !");
        }
        
    }
}
/*FOOD*/
function criarFood(){
    context.fillStyle = 'blue';
    context.fillRect(food.x, food.y, box, box);
}

function start(){
    criarCampo();
    criarSnake();
    criarFood();
}
document.addEventListener('keydown', teclado);
let jogo = setInterval(start, 100);
