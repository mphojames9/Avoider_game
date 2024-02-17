const allCells = Array.from(document.querySelectorAll(".cell"));
const objectCells = allCells.slice(0,48);
const playerCells = allCells.slice(48);
const scoreDisplay = document.querySelector("#score");


let score, dropCount, speed;
reset()
document.addEventListener("keydown",(e)=>{
    if(!dropCount){
        startGame();
    }

    const player = document.querySelector('.player');

    if(e.key === "ArrowRight" && playerCells.includes(player.parentElement.nextElementSibling)){
        player.parentElement.nextElementSibling.append(player);
    }

    if(e.key === "ArrowLeft" && playerCells.includes(player.parentElement.previousElementSibling)){
        player.parentElement.previousElementSibling.append(player);
    }
})

function buttonClickRight(){
    if(!dropCount){
        startGame();
    }
    const player = document.querySelector('.player');
    player.parentElement.nextElementSibling.append(player);
}

function buttonClickLeft(){
    if(!dropCount){
        startGame();
    }
    const player = document.querySelector('.player');
    player.parentElement.previousElementSibling.append(player);
}

function reset(){
    score = 0;
    dropCount = 0;
    speed = 200;
    allCells.forEach(cell => cell.innerHTML = " ");
    playerCells[1].innerHTML = '<div class="player"></div>';
}

function startGame(){
    reset()
    loop();
}

function loop(){
    let stopGame = false;


    dropCount++
    setTimeout(loop, speed);

        for(let i = objectCells.length - 1; i >=0; i--){
        const cell = objectCells[i];
        const nextCell = allCells[i + 3];
        const enemy = cell.children[0];

        if(!enemy){
            continue;
        }
        nextCell.appendChild(enemy)

        if(playerCells.includes(nextCell)){
        if(nextCell.querySelector(".player")){
            stopGame = true;
        }else{
            score++;
            speed = Math.max(40,speed -2);
            scoreDisplay.innerHTML = score;
            enemy.remove();

        }
    }
    }
    if(dropCount % 4 == 0){
        const position = Math.floor(Math.random() * 3);
        objectCells[position].innerHTML = '<div class="object"></div>';
    } 
    if(stopGame){
        alert('Your Score is ' + score + ' press ok to restart the game')
        reset()
    }

}



