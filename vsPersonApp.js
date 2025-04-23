var preloader = document.getElementById("preloader");
window.addEventListener("load", function() {
    preloader.style.display = "none";
});

let buttons = document.querySelectorAll(".game-btn");
let player = document.getElementById("player");
let usedBtns = [];
let currentPlayer = "X";

// Win patterns: rows, columns, diagonals
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]            // diagonals
];

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (buttons[a].innerText && 
            buttons[a].innerText === buttons[b].innerText && 
            buttons[a].innerText === buttons[c].innerText) {
            return {
                winner: buttons[a].innerText,
                pattern: pattern
            };
        }
    }
    return null;
}

function highlightWinningPattern(pattern) {
    pattern.forEach(index => {
        buttons[index].classList.remove("btn-outline-primary");
        buttons[index].classList.add("btn-success");
        // Add animation to winning buttons
        buttons[index].style.animation = "pulse 1s";
    });
}

function btnClick(event) {
    let clickedButton = event.target;

    if (clickedButton.innerText === "") {
        usedBtns.push(clickedButton.value);
        clickedButton.innerText = currentPlayer;
        
        // Add a subtle transition effect on button press
        clickedButton.style.transform = "scale(0.95)";
        setTimeout(() => {
            clickedButton.style.transform = "";
        }, 100);

        const result = checkWinner();
        if (result) {
            highlightWinningPattern(result.pattern);
            setTimeout(() => {
                // Create a custom winning message
                const winnerMessage = document.createElement("div");
                winnerMessage.innerHTML = `
                    <div class="alert alert-success">
                        <h4>Player ${result.winner} Won!</h4>
                        <p>Congratulations!</p>
                    </div>
                `;
                
                // Show message with a nice animation
                document.querySelector(".game-container").prepend(winnerMessage);
                winnerMessage.style.animation = "fadeIn 0.5s";
                
                // Set a timeout to remove the message and reset the game
                setTimeout(() => {
                    winnerMessage.style.animation = "fadeOut 0.5s";
                    setTimeout(() => {
                        winnerMessage.remove();
                        btnReloadClick();
                    }, 500);
                }, 1500);
            }, 500);
            buttons.forEach(button => {
                button.disabled = true;
            });
            return;
        } 
        else if(usedBtns.length == 9) {
            setTimeout(() => {
                // Create a draw message
                const drawMessage = document.createElement("div");
                drawMessage.innerHTML = `
                    <div class="alert alert-warning">
                        <h4>Game Draw!</h4>
                        <p>Try again!</p>
                    </div>
                `;
                
                // Show message with animation
                document.querySelector(".game-container").prepend(drawMessage);
                drawMessage.style.animation = "fadeIn 0.5s";
                
                setTimeout(() => {
                    drawMessage.style.animation = "fadeOut 0.5s";
                    setTimeout(() => {
                        drawMessage.remove();
                        btnReloadClick();
                    }, 500);
                }, 1500);
            }, 500);
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        player.innerText = "Player " + currentPlayer + " Turn";
        player.style.animation = "fadeIn 0.3s";
    }
}

buttons.forEach(button => {
    button.addEventListener('click', btnClick);
});

function btnReloadClick() {
    buttons.forEach(button => {
        button.innerText = "";
        button.disabled = false;
        button.classList.remove("btn-success");
        button.classList.add("btn-outline-primary");
        button.style.animation = "";
    });
    usedBtns = [];
    currentPlayer = "X";
    player.innerText = "Player " + currentPlayer + " Turn";
}

// Add animations to the CSS
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    </style>
`);
