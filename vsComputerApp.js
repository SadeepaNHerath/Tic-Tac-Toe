var preloader =document.getElementById("preloader");
window.addEventListener("load" , function(){
    preloader.style.display = "none";
})

let buttons = document.querySelectorAll(".game-btn");
let buttonsArray = Array.from(buttons);
let player = document.getElementById("player");
let usedBtns = [];
let currentPlayer = "X";

function computerTurn(){
    let emptyButtons = buttonsArray.filter(button => button.innerText === "");
    let btnChoose = Math.floor(Math.random() * (emptyButtons.length));
    emptyButtons[btnChoose].innerText = "O";

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
                alert("Computer Won !");
                window.location.reload();
                return;
            }, 600);
        }
        else if(emptyButtons == 0){
            setTimeout(() => {
                alert("Game Draw!");
                window.location.reload();
                return;
            }, 600);
        }
        else{

        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        player.innerText = "Your Turn";
        buttons.forEach(button => {
            button.disabled = false;
        });
}

function btnClick(event) {
    let clickedButton = event.target;

    if (clickedButton.innerText === "") {
        clickedButton.innerText = "X";

        if (
            (buttons[0].innerText === currentPlayer && buttons[1].innerText === currentPlayer && buttons[2].innerText === currentPlayer) || 
            (buttons[3].innerText === currentPlayer && buttons[4].innerText === currentPlayer && buttons[5].innerText === currentPlayer) || 
            (buttons[6].innerText === currentPlayer && buttons[7].innerText === currentPlayer && buttons[8].innerText === currentPlayer) || 
            (buttons[0].innerText === currentPlayer && buttons[4].innerText === currentPlayer && buttons[8].innerText === currentPlayer) || 
            (buttons[2].innerText === currentPlayer && buttons[4].innerText === currentPlayer && buttons[6].innerText === currentPlayer) || 
            (buttons[0].innerText === currentPlayer && buttons[3].innerText === currentPlayer && buttons[6].innerText === currentPlayer) || 
            (buttons[1].innerText === currentPlayer && buttons[4].innerText === currentPlayer && buttons[7].innerText === currentPlayer) || 
            (buttons[2].innerText === currentPlayer && buttons[5].innerText === currentPlayer && buttons[8].innerText === currentPlayer)
        ){ 
            setTimeout(() => {
                alert("You Won !");
                window.location.reload();
                return;
            }, 600);
        }
        else if(buttonsArray.filter(button => button.innerText === "").length == 0){
            setTimeout(() => {
                alert("Game Draw!");
                window.location.reload();
                return;
            }, 600);
        }
        else{

        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        player.innerText = "Computer's Turn";
        buttons.forEach(button => {
            button.disabled = true;
        });

        setTimeout(computerTurn, 1000);
    }
}

buttons.forEach(button => {
    button.addEventListener('click', btnClick);
});

function btnReloadClick(){
    location.reload();
    return;
}