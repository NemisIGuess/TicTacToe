const DOM = (function() {
    const boardPanels = Array.from(document.querySelectorAll(".boardPanel"));
    boardPanels.forEach((panel) => panel.addEventListener('click', (e) => {
        DisplayController.displaySymbol(e.target.id, nemis.playerSymbol);
    }));

})();

const GameBoard = (function() {
    const board = []

})();

const DisplayController = (function() {
    const displaySymbol = (panelId, playerSymbol) => {
        const boardPanelSelected = document.getElementById(panelId);

        boardPanelSelected.textContent = playerSymbol;
    }

    return {displaySymbol}
})();

const PlayerFactory = (playerSymbol) => {
    return {playerSymbol};
};

const nemis = PlayerFactory("✘");