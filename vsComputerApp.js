var preloader = document.getElementById("preloader");
window.addEventListener("load", function() {
    preloader.style.display = "none";
});

let buttons = document.querySelectorAll(".game-btn");
let buttonsArray = Array.from(buttons);
let player = document.getElementById("player");

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

function findBestMove() {
    // Smart AI: First check if computer can win
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        // Check if computer can win
        if (buttons[a].innerText === "O" && buttons[b].innerText === "O" && buttons[c].innerText === "") {
            return c;
        }
        if (buttons[a].innerText === "O" && buttons[c].innerText === "O" && buttons[b].innerText === "") {
            return b;
        }
        if (buttons[b].innerText === "O" && buttons[c].innerText === "O" && buttons[a].innerText === "") {
            return a;
        }
    }

    // Then check if player is about to win and block
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        // Check if player is about to win and block
        if (buttons[a].innerText === "X" && buttons[b].innerText === "X" && buttons[c].innerText === "") {
            return c;
        }
        if (buttons[a].innerText === "X" && buttons[c].innerText === "X" && buttons[b].innerText === "") {
            return b;
        }
        if (buttons[b].innerText === "X" && buttons[c].innerText === "X" && buttons[a].innerText === "") {
            return a;
        }
    }

    // Take center if available
    if (buttons[4].innerText === "") {
        return 4;
    }

    // Take corners if available
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => buttons[i].innerText === "");
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Otherwise take any available spot
    const emptyButtons = buttonsArray.filter(button => button.innerText === "");
    if (emptyButtons.length > 0) {
        return buttonsArray.indexOf(emptyButtons[Math.floor(Math.random() * emptyButtons.length)]);
    }
    
    return -1; // No moves available
}

function showGameMessage(message, type) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `
        <div class="alert alert-${type}">
            <h4>${message}</h4>
            <p>${type === 'success' ? 'Congratulations!' : 'Try again!'}</p>
        </div>
    `;
    
    // Show message with animation
    document.querySelector(".game-container").prepend(messageElement);
    messageElement.style.animation = "fadeIn 0.5s";
    
    setTimeout(() => {
        messageElement.style.animation = "fadeOut 0.5s";
        setTimeout(() => {
            messageElement.remove();
            btnReloadClick();
        }, 500);
    }, 1500);
}

function computerTurn() {
    const moveIndex = findBestMove();
    if (moveIndex >= 0) {
        // Add thinking effect before computer makes a move
        player.innerText = "Computer is thinking...";
        
        setTimeout(() => {
            buttons[moveIndex].innerText = "O";
            
            // Add visual feedback for computer's move
            buttons[moveIndex].style.backgroundColor = "rgba(13, 110, 253, 0.2)";
            setTimeout(() => {
                buttons[moveIndex].style.backgroundColor = "";
            }, 300);
            
            const result = checkWinner();
            if (result) {
                highlightWinningPattern(result.pattern);
                setTimeout(() => {
                    showGameMessage("Computer Won!", "warning");
                }, 500);
                return;
            } 
            else if (buttonsArray.filter(button => button.innerText === "").length === 0) {
                setTimeout(() => {
                    showGameMessage("Game Draw!", "info");
                }, 500);
                return;
            }
            
            player.innerText = "Your Turn";
            player.style.animation = "fadeIn 0.3s";
            buttons.forEach(button => {
                if (button.innerText === "") {
                    button.disabled = false;
                }
            });
        }, 600); // Make the computer "think" for a moment
    }
}

function btnClick(event) {
    let clickedButton = event.target;

    if (clickedButton.innerText === "") {
        clickedButton.innerText = "X";
        
        // Add a subtle transition effect on button press
        clickedButton.style.transform = "scale(0.95)";
        setTimeout(() => {
            clickedButton.style.transform = "";
        }, 100);

        const result = checkWinner();
        if (result) {
            highlightWinningPattern(result.pattern);
            setTimeout(() => {
                showGameMessage("You Won!", "success");
            }, 500);
            return;
        } 
        else if (buttonsArray.filter(button => button.innerText === "").length === 0) {
            setTimeout(() => {
                showGameMessage("Game Draw!", "info");
            }, 500);
            return;
        }
        
        player.innerText = "Computer's Turn";
        player.style.animation = "fadeIn 0.3s";
        buttons.forEach(button => {
            button.disabled = true;
        });

        setTimeout(computerTurn, 800);
    }
}

function btnReloadClick() {
    buttons.forEach(button => {
        button.innerText = "";
        button.disabled = false;
        button.classList.remove("btn-success");
        button.classList.add("btn-outline-primary");
        button.style.animation = "";
        button.style.backgroundColor = "";
    });
    player.innerText = "Your Turn";
}

buttons.forEach(button => {
    button.addEventListener('click', btnClick);
});

// Initialize the game
document.addEventListener("DOMContentLoaded", function() {
    // If restart game from modal is clicked
    document.getElementById("restartGame").addEventListener('click', btnReloadClick);
});

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