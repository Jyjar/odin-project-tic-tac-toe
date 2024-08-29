const gameBoard = (function () {
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const getBoard = () => board;

    const isCellOccupied = (row, col) => board[row][col] !== 0;

    const updateBoard = (row, col, playerToken) => {
        if (!isCellOccupied(row, col)) {
            board[row][col] = playerToken;
            return true;
        }
        return false;
    };

    const resetBoard = () => board.forEach(row => row.fill(0));

    return { getBoard, updateBoard, isCellOccupied, resetBoard };
})();

function gameController( playerOneName, playerTwoName) {
    const board = gameBoard;
    const winCon = [
        [[1, 1, 1], [0, 0, 0], [0, 0, 0]],
        [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
        [[0, 0, 0], [0, 0, 0], [1, 1, 1]],
        [[1, 0, 0], [1, 0, 0], [1, 0, 0]],
        [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
        [[0, 0, 1], [0, 0, 1], [0, 0, 1]],
        [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        [[0, 0, 1], [0, 1, 0], [1, 0, 0]]
    ];

    const players = [
        { name: playerOneName, token: "X" },
        { name: playerTwoName, token: "O"}
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (row, col) => {
        if (board.updateBoard(row, col, activePlayer.token)) {
            if (checkWin()) {
                console.log(`${activePlayer.name} wins!`);
            } else {
                switchPlayerTurn();
            }
        } else {
            console.log("Cell is already occupied, choose another");
        }
    }

    const checkWin = () => {
        const currentBoard = board.getBoard();

        for (let condition of winCon) {
            let match = true;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (condition[i][j] === 1 && currentBoard[i][j] !== activePlayer.token) {
                        match = false;
                    }
                }
            }
            if (match) {
                return true;
            }
        }
        return false;
    };

    const resetBoard = () => {
        board.resetBoard();
        activePlayer = players[0];
    };

    return { playRound, getActivePlayer, checkWin, getBoard: board.getBoard, resetBoard }

};

function screenController() {
    const playerOneInput = document.querySelector("#player1");
    const playerTwoInput = document.querySelector("#player2");
    const startButton = document.querySelector(".start");
    const resetButton = document.querySelector(".restart");
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    let game;

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        if (game.checkWin()) {
            playerTurnDiv.textContent = `${activePlayer.name} wins!`;
        } else {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        }

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.column = columnIndex;
                cellButton.dataset.row = rowIndex;
                cellButton.textContent = cell === 0 ? "" : cell;
                boardDiv.appendChild(cellButton);
            });
        });
    };

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        // Make sure the gaps between rows and columns are not clicked instead.
        if (!selectedColumn || !selectedRow) return;

        game.playRound(selectedRow, selectedColumn);

        updateScreen();
    }

    startButton.addEventListener("click", (event) => {
        event.preventDefault();
        const playerOneName = playerOneInput.value;
        const playerTwoName = playerTwoInput.value;

        if (playerOneName && playerTwoName) {
            game = gameController(playerOneName, playerTwoName);
            boardDiv.addEventListener("click", clickHandlerBoard);
            updateScreen();
        } else {
            alert("Please enter both player names.");
        }
    });

    resetButton.addEventListener("click", (event) => {
        event.preventDefault();
        game.resetBoard();
        updateScreen();
        playerTurnDiv.textContent = "";
    })
}

screenController();

