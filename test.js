const gameBoard = (function () {
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    const getBoard = () => board;

    const cellOccupied = (row, col) => {
        return board[row][col] === 0 ? false : true;
    }

    const updateBoard = (row, col, playerToken) => {
        board[row][col] = playerToken;
    }

    const printBoard = () => {
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);
    }

    return { getBoard, updateBoard, printBoard, cellOccupied };
})();

const gameController = (function (
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = gameBoard;

    const winCon = [
        [[1,1,1], [0,0,0], [0,0,0]], 
        [[0,0,0], [1,1,1], [0,0,0]], 
        [[0,0,0], [0,0,0], [1,1,1]],
        [[1,0,0], [1,0,0], [1,0,0]],
        [[0,1,0], [0,1,0], [0,1,0]],
        [[0,0,1], [0,0,1], [0,0,1]],
        [[1,0,0], [0,1,0], [0,0,1]],
        [[0,0,1], [0,1,0], [1,0,0]]]

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    const playRound = () => {
        let row = (Number(prompt("Enter row number (1-3)")) - 1);
        let col = (Number(prompt("Enter column number (1-3)")) - 1);

        if(board.cellOccupied(row, col)) {
            console.log("Cell is already occupied, choose another");
            playRound();
        } else {
            board.updateBoard(row, col, getActivePlayer().token);
            if(checkWin()) {
                
            } else {
                switchPlayerTurn();
                printNewRound();
                playRound();
            }
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
                board.printBoard()
                console.log(`${getActivePlayer().name} wins!`);
                return true;
            }
        }
        return false;
    };
    
    printNewRound();

    return { playRound, getActivePlayer }

})();

/* gameController.playRound(); */


