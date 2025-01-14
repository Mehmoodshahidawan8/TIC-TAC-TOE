const cells = document.querySelectorAll(".cell");
const statusElement = document.getElementById("status");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const restartButton = document.getElementById("restart-btn");
const gameBoard = document.getElementById("game-board");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start the game
startButton.addEventListener("click", () => {
  gameActive = true;
  currentPlayer = "X";
  board.fill("");
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  statusElement.classList.remove("hidden");
  gameBoard.classList.remove("hidden");
  resetBoard();
});

// Stop the game
stopButton.addEventListener("click", () => {
  gameActive = false;
  statusElement.textContent = "Game stopped. Press Start to play.";
});

// Restart the game
restartButton.addEventListener("click", () => {
  board.fill("");
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  resetBoard();
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner(currentPlayer)) {
      statusElement.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

    if (board.every((val) => val !== "")) {
      statusElement.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  });
});

// Check for a winner
function checkWinner(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === player);
  });
}

// Reset the board
function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}
