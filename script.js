const cells = Array.from(document.querySelectorAll(".cell"));
const objectCell = cells.slice(0, 33);
const playerCell = cells.slice(33);
const playAgainBtn = document.querySelector(".playAgain");
const resetBtn = document.querySelector(".exit");
const highScoreDisplay = document.querySelector(".highScore");
const buttonRight = document.querySelector(".right");
const buttonLeft = document.querySelector(".left");

//Displaying high score values from local storage.
highScoreDisplay.innerHTML = localStorage.getItem("highScore");  

//Reload button
playAgainBtn.addEventListener("click", ()=>{
    play();
    highScoreDisplay.innerHTML = localStorage.getItem("highScore");  
});



//Reset game button
resetBtn.addEventListener("click", ()=>{
    localStorage.clear();
    highScoreDisplay.innerHTML = "0";
    highScoreDisplay.style.color = "green";
})

//variables for dropCount, speen and score,
let dropCount, speed, score;

//button functions
buttonLeft.addEventListener("click", ()=>{
    const player = document.querySelector(".player");
        player.parentElement.previousElementSibling.appendChild(player);
});

buttonRight.addEventListener("click", ()=>{
    const player = document.querySelector(".player");
        player.parentElement.nextElementSibling.appendChild(player);
});

//  Keyboard functions
document.addEventListener("keydown", (e) =>{

    const player = document.querySelector(".player");

    if (e.key == 'ArrowRight' && playerCell.includes(player.parentElement.nextElementSibling)) {
        player.parentElement.nextElementSibling.appendChild(player);
    }

    if (e.key == 'ArrowLeft' && playerCell.includes(player.parentElement.previousElementSibling)) {
        player.parentElement.previousElementSibling.appendChild(player);
    }
})

function reset(){
    score = 0;
    dropCount = 0;
    score.innerHTML = "0";
    speed = 120;
    cells.forEach(cell => cell.innerHTML = "");
    playerCell[1].innerHTML = '<div class="player"></div>'
    
}

function play(){
    reset();
    loop()
}

function loop(){
    let gameOver = false;

    for (let i = objectCell.length - 1; i >= 0; i--) {
        const cell = objectCell[i];
        const nextCell = cells[i + 3];
        const object = cell.children[0];

        if (!object) {
            continue;
        }

        nextCell.appendChild(object);

        if (playerCell.includes(nextCell)) {
            if (nextCell.querySelector(".player")) {
                gameOver = true;
            } else {
                score++;
                speed = Math.max(50, speed - 1);
                object.remove();
            }
        }

    }

    if( dropCount % 4 == 0) {
        const position = Math.floor(Math.random()*3);

        objectCell[position].innerHTML = '<div class="object"></div>';

    }

    // If there is a collusion 
    if(gameOver){
        alert("Game over \nYour score is: " + score + ". \nPlease close the window and click start to play again");
        resetBtn.style.display = "grid";
        const currentHighScore = localStorage.getItem('highScore');

    //If we have a new high score, update the local storage
    if (currentHighScore < score) {
        localStorage.setItem('highScore', score);
    }
        reset();
    }

    else {
        let scoreDisplay = document.querySelector(".score");
        scoreDisplay.innerHTML = score;
        dropCount++;
        setTimeout(loop, speed);
        resetBtn.style.display = "none";
    }
}
