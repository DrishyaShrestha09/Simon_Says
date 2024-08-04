const heading = document.getElementById("heading");
const cells = document.querySelectorAll(".cell");
const scoreDisplay = document.getElementById("score");
let score = 0;
let simonSays;
let target;
let gameRunning = false;
let timeoutId;
let difficultyLevel = 1;
const maxDifficulty = 5; 

function initializeGame() {
    score = 0;
    scoreDisplay.innerText = "Score: " + score;
    difficultyLevel = 1; 
    resetTarget();
    enableCells(true); 
    gameRunning = true; 
}

function resetTarget() {
    simonSays = Math.random() * 100;
    const colors = ["red", "green", "yellow", "blue"];
    const currentColors = colors.slice(0, difficultyLevel); 
    target = currentColors[Math.floor(Math.random() * currentColors.length)];
    updateHeading();
    resetTimeout(); 
}

function updateHeading() {
    heading.innerText = simonSays > 50 
        ? `Simon Says 'Click ${target}!'` 
        : `'Click ${target}!'`;
}

function resetTimeout() {
   
    clearTimeout(timeoutId);

    
    timeoutId = setTimeout(() => {
        if (gameRunning) {
            resetTarget(); 
        }
    }, 5000 / difficultyLevel); 
}

function handleCellClick(event) {
    if (!gameRunning) return; 

    const cell = event.target;
    clearTimeout(timeoutId); 

    if (simonSays > 50) { 
        if (cell.id === target) {
            updateScore(cell);
        } else {
            showAlert("Wrong color! You lose!");
            endGame();
        }
    } else { 
        if (cell.id !== target) {
            updateScore(cell);
        } else {
            showAlert("I didn't say 'Simon Says'!");
            endGame();
        }
    }
}

function updateScore(cell) {
    cell.style.transform = "scale(1.1)";
    setTimeout(() => cell.style.transform = "scale(1)", 200);
    score++;
    scoreDisplay.innerText = "Score: " + score;
    increaseDifficulty(); 
    resetTarget();
}

function increaseDifficulty() {
    if (difficultyLevel < maxDifficulty) {
        difficultyLevel++;
    }
}

function showAlert(message) {
    alert(message);
}

function enableCells(enable) {
    cells.forEach(cell => cell.style.pointerEvents = enable ? "auto" : "none");
}

function endGame() {
    enableCells(false); 
    gameRunning = false; 
    clearTimeout(timeoutId); 
    setTimeout(initializeGame, 1000); 
}

heading.addEventListener("click", () => {
    if (simonSays <= 50) {
        resetTarget();
    }
});

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

initializeGame();
