const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let boardState = Array(9).fill(null);

const handleClick = (e) => {
    const cell = e.target;
    console.log(cell)
    const cellIndex = Array.from(cells).indexOf(cell);
    console.log(cellIndex)

    if (boardState[cellIndex] || !gameActive) return; 

    cell.textContent = currentPlayer;
    boardState[cellIndex] = currentPlayer;

    if (checkWin(currentPlayer)) {
        statusDisplay.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (boardState.every(cell => cell)) {
        statusDisplay.textContent = `It's a Tie!`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
};

const checkWin = (player) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === player;
        });
    });
};

const restartGame = () => {
    boardState = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player X's Turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

