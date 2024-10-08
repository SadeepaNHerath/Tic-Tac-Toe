var preloader =document.getElementById("preloader");
window.addEventListener("load" , function(){
    preloader.style.display = "none";
})

let buttons = document.querySelectorAll(".game-btn");
let player = document.getElementById("player");
let usedBtns = [];
let currentPlayer = "X";

function btnClick(event) {
    let clickedButton = event.target;

    if (clickedButton.innerText === "") {
        usedBtns.push(clickedButton.value);
        clickedButton.innerText = currentPlayer;

        if (
            (buttons[0].innerText === currentPlayer && buttons[1].innerText === currentPlayer && buttons[2].innerText === currentPlayer) || 
            (buttons[3].innerText === currentPlayer && buttons[4].innerText === currentPlayer && buttons[5].innerText === currentPlayer) || 
            (buttons[6].innerText === currentPlayer && buttons[7].innerText === currentPlayer && buttons[8].innerText === currentPlayer) || 
            (buttons[0].innerText === currentPlayer && buttons[4].innerText === currentPlayer && buttons[8].innerText === currentPlayer) || 
            (buttons[2].innerText === currentPlayer && buttons[4].innerText === currentPlayer && buttons[6].innerText === currentPlayer) || 
            (buttons[0].innerText === currentPlayer && buttons[3].innerText === currentPlayer && buttons[6].innerText === currentPlayer) || 
            (buttons[1].innerText === currentPlayer && buttons[4].innerText === currentPlayer && buttons[7].innerText === currentPlayer) || 
            (buttons[2].innerText === currentPlayer && buttons[5].innerText === currentPlayer && buttons[8].innerText === currentPlayer)
        ) {
            setTimeout(() => {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                alert("Player " + currentPlayer + " Won !");
                window.location.reload();
                return;
            }, 400);
        }
        else if(usedBtns.length == 9){
            setTimeout(() => {
                alert("Game Draw!");
                window.location.reload();
                return;
            }, 400);
        }
        else{

        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        player.innerText = "Player " + currentPlayer + " Turn";

    }
}

buttons.forEach(button => {
    button.addEventListener('click', btnClick);
});

function btnReloadClick(){
    location.reload();
    return;
}
