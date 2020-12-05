const DOM = (function() {
    const boardPanels = Array.from(document.querySelectorAll(".boardPanel"));
    boardPanels.forEach((panel) => panel.addEventListener('click', (e) => {
        if (!!GameState.isAlreadyTaken(e.target)) {
            // Añadir animacion cuando ya ha sido seleccionado
            console.log("Already taken");
        } else {
            DisplayController.displaySymbol(GameState.activePlayer().playerSymbol, e.target);
            GameState.setLastPlay(e.target.attributes[1].value, e.target.textContent);
            GameState.checkWinStatus();
        }
    }));
})();

const GameState = (function() {
    const board = ["", "", "", "", "", "", "", "", ""]
    const winConditions = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let lastPlay = "";
    let hasSomeoneWon = false;

    const activePlayer = () => {
        if (lastPlay == "✘") {
            return player2;
        } else {return player1}
    }

    const setLastPlay = (panelIndex, lastPlaySymbol) => {
        board.splice(panelIndex, 1, lastPlaySymbol);
        lastPlay = lastPlaySymbol;
    }

    const isAlreadyTaken = (boardPanelSelected) => {
        if (boardPanelSelected.textContent != "") {
            return true;
        }
    }

    const checkWinStatus = () => {
        winConditions.some((winCondition) => {
            if (board[winCondition[0]] == board[winCondition[1]] && board[winCondition[1]] == board[winCondition[2]] && board[winCondition[0]] != "") {
                hasSomeoneWon = true;
            } else {return}
        });

        if (hasSomeoneWon == true && lastPlay == "✘") {
            console.log(`${player1.name} has won`)
        } else if (hasSomeoneWon == true && lastPlay == "O") {
            console.log(`${player2.name} has won`)
        } else if (hasSomeoneWon == false && board.indexOf("") === -1 ) {
            console.log(`it was a tie`)
        }
    }

    return {activePlayer, setLastPlay, isAlreadyTaken, checkWinStatus}

})();

const DisplayController = (function() {
    
    const displaySymbol = (playerSymbol, boardPanelSelected) => {
        boardPanelSelected.textContent = playerSymbol;
    }

    return {displaySymbol}
})();

const PlayerFactory = (playerSymbol, name) => {
    return {playerSymbol, name};
};

const player1 = PlayerFactory("✘", "nemis");
const player2 = PlayerFactory("O", "emilio")