const GameState = (function() {
    const board = ['', '', '', '', '', '', '', '', '']
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

    let lastPlay = '';
    let hasSomeoneWon = false;
    let player1 = "";
    let player2 = "";

    const activePlayer = () => {
        if (lastPlay == '✘') {
            return player2;
        } else {return player1}
    }

    const setLastPlay = (panelIndex, lastPlaySymbol) => {
        board.splice(panelIndex, 1, lastPlaySymbol);
        lastPlay = lastPlaySymbol;
    }

    const isAlreadyTaken = (boardPanelSelected) => {
        if (boardPanelSelected.textContent != '') {
            return true;
        }
    }

    const checkWinStatus = () => {
        winConditions.some((winCondition) => {
            if (board[winCondition[0]] == board[winCondition[1]] && board[winCondition[1]] == board[winCondition[2]] && board[winCondition[0]] != '') {
                hasSomeoneWon = true;
            } else {return}
        });
    }

    const clearGameState = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        hasSomeoneWon = false;
        lastPlay = '';
    }

    const createPlayers = () => {
        player1 = PlayerFactory('✘', form.playerOne.value);
        player2 = PlayerFactory('O', form.playerTwo.value)
    }

    const getPlayer1 = () => {return player1}
    const getPlayer2 = () => {return player2}
    const getLastPlay = () => {return lastPlay}
    const getHasSomeoneWon = () => {return hasSomeoneWon};
    const getBoard = () => {return board};

    return {activePlayer, setLastPlay, isAlreadyTaken, checkWinStatus, clearGameState, getHasSomeoneWon, getLastPlay, getBoard, createPlayers, getPlayer1, getPlayer2}

})();

const DisplayController = (function() {
    
    const displaySymbol = (playerSymbol, boardPanelSelected) => {
        boardPanelSelected.textContent = playerSymbol;
    }

    const clearGameBoard = (arrayOfPanels) => {
        arrayOfPanels.forEach((panel) => panel.textContent = '');
    }

    const displayWinner = (isThereAWinner, whichPlayerWon, gameBoard, display) => {
        if (isThereAWinner == true && whichPlayerWon == '✘') {
            displayMessage(display, `${GameState.getPlayer1().name} won.`)
        } else if (isThereAWinner == true && whichPlayerWon == 'O') {
            displayMessage(display, `${GameState.getPlayer2().name} won.`)
        } else if (isThereAWinner == false && gameBoard.indexOf('') === -1 ) {
            displayMessage(display, `Tie!`)
        }
    }

    const toggleVisibility = (visibilityTarget, targetToFocus) => {
        visibilityTarget.classList.toggle('display');
        targetToFocus.focus();
    }

    const clearForm = () => {
        form.reset();
    }

    const changeInputText = (inputToChange) => {
        inputToChange.textContent = "Change Players";
    }

    const displayMessage = (display, text) => {
        display.textContent = `${text}`
    }

    return {displaySymbol, clearGameBoard, displayWinner, toggleVisibility, clearForm, changeInputText, displayMessage}
})();

const PlayerFactory = (playerSymbol, name) => {
    return {playerSymbol, name};
};

const DOM = (function() {
    // Selectores del DOM
    const boardPanels = Array.from(document.querySelectorAll('.boardPanel'));
    const restartButton = document.getElementById('restartButton')
    const playerSelectionButton = document.getElementById('playersButton')
    const playerSelectionDiv = document.getElementById('selectPlayerDiv')
    const playerOneInput = document.getElementById('playerOne');
    const display = document.querySelector('h2');

    boardPanels.forEach((panel) => panel.addEventListener('click', (e) => {
        if (!GameState.getPlayer1().name && !GameState.getPlayer2().name) {
            DisplayController.toggleVisibility(playerSelectionDiv, playerOneInput);
        } else if (!!GameState.getHasSomeoneWon() || !!GameState.isAlreadyTaken(e.target)) {
            return 
        } else {
            DisplayController.displaySymbol(GameState.activePlayer().playerSymbol, e.target);
            GameState.setLastPlay(e.target.attributes[1].value, e.target.textContent);
            if (GameState.activePlayer().playerSymbol == '✘') {
                DisplayController.displayMessage(display, `${GameState.activePlayer().name}, take your turn.`)
            } else {DisplayController.displayMessage(display, `${GameState.activePlayer().name}, take your turn.`)}
            GameState.checkWinStatus();
            DisplayController.displayWinner(GameState.getHasSomeoneWon(), GameState.getLastPlay(), GameState.getBoard(), display);
        }
    }));

    restartButton.addEventListener('click', () => {
        DisplayController.clearGameBoard(boardPanels);
        GameState.clearGameState();
        if (!!GameState.getPlayer1().name) {DisplayController.displayMessage(display, 'Play Again')}
    });

    playerSelectionDiv.addEventListener('submit', (e) => {
        e.preventDefault()
        GameState.createPlayers();
        DisplayController.clearForm();
        DisplayController.toggleVisibility(playerSelectionDiv, playerOneInput);
        DisplayController.changeInputText(playerSelectionButton);
        DisplayController.clearGameBoard(boardPanels);
        GameState.clearGameState();
    });

    playerSelectionButton.addEventListener('click', () => {
        DisplayController.toggleVisibility(playerSelectionDiv, playerOneInput);
    });

})();