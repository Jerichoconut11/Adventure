const moveButtons = document.querySelectorAll("button");
const gameScore = document.querySelector(".game-score");
const gameChoices = document.querySelector(".game-choices");
const gameResult = document.querySelector(".game-result");

const choices = ["rock", "paper", "scissors"];

const scoreBoard = { Wins: 0, losses: 0, Tie: 0 };
let result = "";

function computerMove() {
  return choices[Math.floor(Math.random() * choices.length)];
}

moveButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.currentTarget.id === "reset") return resetGameScore(e);
    playGame(e);
  });
});

function playGame(playerMove) {
  const playerChoice = playerMove.currentTarget.id;
  const computerChoice = computerMove();
  if (playerChoice === computerChoice) {
    result = "Tie Game";
    scoreBoard.Tie++;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win!";
    scoreBoard.Wins++;
  } else {
    result = "Computer Wins!";
    scoreBoard.losses++;
  }
  gameScore.textContent = `Wins: ${scoreBoard.Wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.Tie}`;
  gameResult.textContent = `Result: ${result}`;
  gameChoices.innerHTML = `PLAYER SELECT: <img src="Images/${playerChoice}-emoji.png"> COMPUTER SELECT: <img src="Images/${computerChoice}-emoji.png">`;
}

function resetGameScore(resetButton) {
  if (resetButton.target.id === "reset") {
    scoreBoard.Wins = 0;
    scoreBoard.losses = 0;
    scoreBoard.Tie = 0;
    gameScore.textContent = `Wins: ${scoreBoard.Wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.Tie}`;
    gameChoices.innerHTML = "";
    gameResult.innerHTML = `Result:`;
  }
}
