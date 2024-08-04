const heading = document.getElementById("heading");
const cells = document.querySelectorAll(".cell");
const scoreDisplay = document.getElementById("score");
let score = 0;
let simonSays;
let target;

function initializeGame() {
    score = 0;
    scoreDisplay.innerText = "Score: " + score;
    resetTarget();
}

function resetTarget() {
    simonSays = Math.random() * 100;
    const colors = ["red", "green", "yellow", "blue"];
    target = colors[Math.floor(Math.random() * colors.length)];
    updateHeading();
}

function updateHeading() {
    if (simonSays > 50) {
        heading.innerText = "Simon Says 'Click " + target + "!'";
    } else {
        heading.innerText = "'Click " + target + "!'";
    }
}

heading.addEventListener("click", function () {
    if (simonSays <= 50) {
        resetTarget();
    }
});

cells.forEach((cell) => {
    cell.addEventListener("click", function () {
        if (simonSays <= 50) {
            alert("I didn't say 'Simon Says'!");
            setTimeout(initializeGame, 1000); // Restart the game
        } else if (cell.id === target) {
            cell.style.transform = "scale(1.1)";
            setTimeout(() => {
                cell.style.transform = "scale(1)";
            }, 200);
            score++;
            scoreDisplay.innerText = "Score: " + score;
            resetTarget();
        } else {
            alert("Wrong colour! You lose!");
            setTimeout(initializeGame, 1000); // Restart the game
        }
    });
});

initializeGame();