//########################################################################################################
//GAME CONTROL
//########################################################################################################

//________________________________________________________________________________________________________
//1) PLAYER OBJECTS

//GAME STATE OBJECT
let gameState = {
  currentTurn: 1,
  gameInProgress: false,
  currentPiece: playerOneGamePiece,

  //array holding reference to each game block
  allGameBlocks: [
    document.getElementById("blockOneButton"),
    document.getElementById("blockTwoButton"),
    document.getElementById("blockThreeButton"),
    document.getElementById("blockFourButton"),
    document.getElementById("blockFiveButton"),
    document.getElementById("blockSixButton"),
    document.getElementById("blockSevenButton"),
    document.getElementById("blockEightButton"),
    document.getElementById("blockNineButton"),
  ],
};

//default properties for both players on game start up
let playerOne = {
  playerOneName: "Player 1",
  playerOneGamePiece: document.getElementById("playerOneGamePiece"),
  playerGamePieceChange: !gameState.gameInProgress, //Game piece can only be changed at startup and in between rounds
  playerOneTurn: true,
  playerOneNumberOfWins: 0,
};

let playerTwo = {
  playerTwoName: "Player 2",
  playerTwoGamePiece: document.getElementById("playerTwoGamePiece"),
  playerTwoTurn: true,
  playerTwoNumberOfWins: 0,
};



//________________________________________________________________________________________________________
//2) BOARD INITIALIZATION

//Set Current Turn to Show Player 1
let currentPlayerTurn = document.getElementById("currentPlayerTurn");
currentPlayerTurn.textContent = "Turn: " + playerOne.playerOneName;

//Retrieve names of Players (Function Called at any time that player 1 and/or player 2 change their name)
function retrievePlayerName() {
  playerOne.playerOneName = document.getElementById("playerOneName").value;
  console.log(playerOne.playerOneName);
  playerTwo.playerTwoName = document.getElementById("playerTwoName").value;

}


//allows initial "TIC-TAC-MESSAGE" do display on board and then clears board for game to start
function initializeGameStateBlocks() {
  setTimeout(resetBoard, 1500);

 //allows players to begin a game by clicking any game piece on the board
  for(let i =0;i<9;i++){
    gameState.allGameBlocks[i].addEventListener("mousedown", ()=>{
      resetBoard();
      startGame();
    })
  }
  
}

//########################################################################################################
//GAME PIECE SELECTOR BUTTON
//Changes Game Piece of Player 1 and 2

let playerGamePieceButton = document.getElementById("playerGamePieceButton");
playerGamePieceButton.addEventListener("mousedown", () => {
  //"push" button down when clicked - Styling
  playerGamePieceButton.setAttribute(
    "style",
    "bottom: 0.1rem; right: 1rem;; box-shadow: 0px 0px 5px black"
  );

  //if a game is currently in progress, do not allow piece change
  //Else Swop Player One and Two Game Pieces
  if (gameState.gameInProgress) {
    alert("Game Piece cannot be changed during a Game");
  } else {
    let playerOneGamePieceHold = playerOne.playerOneGamePiece.textContent;
    playerOne.playerOneGamePiece.textContent =
      playerTwo.playerTwoGamePiece.textContent;
    playerTwo.playerTwoGamePiece.textContent = playerOneGamePieceHold;
  }
});

//"push" button back up after click - Styling
playerGamePieceButton.addEventListener("mouseup", () => {
  playerGamePieceButton.setAttribute(
    "style",
    "box-shadow: 0px 0px 4px 3px black; bottom:0rem; right: 0.9rem;"
  );
});

//########################################################################################################
//RESET BUTTON

//------------------------------------------------------------------------------------------------
//Make Button Look Pressed when mouse is presses/held down on it
let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("mousedown", () => {
  resetButton.setAttribute(
    "style",
    "top: 10.1rem; right: 8.1rem; box-shadow: 0px 0px 5px black"
  );
  resetBoard(); //RESET all gameblocks
});

resetButton.addEventListener("mouseup", () => {
  resetButton.setAttribute(
    "style",
    "box-shadow: 0px 0px 4px 3px black; top: 10rem; right: 8rem"
  );
});

//RESET GAME BLOCKS TO: " "
function resetBoard() {
  for (let i = 0; i < 9; i++) {
    gameState.allGameBlocks[i].textContent = "\u00A0";
  }
}

//------------------------------------------------------------------------------------------------

//########################################################################################################
//GAME PLAY

function startGame(){
  



}

//########################################################################################################
//Rules BUTTON

//------------------------------------------------------------------------------------------------
//Make Button Look Pressed when mouse is presses/held down on it
let rulesButton = document.getElementById("rulesButton");
rulesButton.addEventListener("mousedown", () => {
  rulesButton.setAttribute(
    "style",
    "top: 15.1rem; right: 8.1rem; box-shadow: 0px 0px 5px black"
  );
});

rulesButton.addEventListener("mouseup", () => {
  rulesButton.setAttribute(
    "style",
    "box-shadow: 0px 0px 4px 3px black; top: 15rem; right: 8rem"
  );
});

//------------------------------------------------------------------------------------------------
