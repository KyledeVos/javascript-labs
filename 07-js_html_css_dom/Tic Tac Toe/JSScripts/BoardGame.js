//########################################################################################################
//GAME CONTROL
//########################################################################################################

//________________________________________________________________________________________________________
//1) PLAYER OBJECTS

//GAME STATE OBJECT
let gameState = {
  currentTurn: 1,
  gameInProgress: false,

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
  playerOneNumberOfWins: 0,
};

let playerTwo = {
  playerTwoName: "Player 2",
  playerTwoGamePiece: document.getElementById("playerTwoGamePiece"),
  playerTwoNumberOfWins: 0,
};

//________________________________________________________________________________________________________
//2) BOARD INITIALIZATION
//allows initial "TIC-TAC-TOE- MESSAGE" to display on board and then clears board for game to start
function initializeGameStateBlocks() {
  setTimeout(resetBoard, 1500);
}

//Retrieve names of Players (Function Called at any time that player 1 and/or player 2 change their name)
function retrievePlayerOneName() {
  playerOne.playerOneName = document.getElementById("playerOneName");
  document.getElementById("currentPlayerTurn").textContent =
    "Turn:" + playerOne.playerOneName.value;

  playerTwo.playerTwoName = document.getElementById("playerTwoName");
}

function retrievePlayerTwoName() {
  playerTwo.playerTwoName = document.getElementById("playerTwoName");
}

//########################################################################################################
//GAME PIECE SELECTOR BUTTON
//Changes Game Piece of Player 1 and 2

let playerGamePieceButton = document.getElementById("playerGamePieceButton");

function pushPieceSelectorDown() {
  playerGamePieceButton.setAttribute(
    "style",
    "bottom: 0.1rem; right: 1rem;; box-shadow: 0px 0px 5px black"
  );
}

function pushPieceSelectorBackUp() {
  playerGamePieceButton.setAttribute(
    "style",
    "box-shadow: 0px 0px 4px 3px black; bottom:0rem; right: 0.9rem"
  );
}

playerGamePieceButton.addEventListener("mousedown", () => {
  //"push" button down when clicked - Styling
  pushPieceSelectorDown();

  //if a game is currently in progress, do not allow piece change
  //Else Swop Player One and Two Game Pieces
  if (gameState.gameInProgress) {
    alert("Game Piece cannot be changed during a Game");
  } else {
    pushPieceSelectorBackUp();
    let playerOneGamePieceHold = playerOne.playerOneGamePiece.textContent;
    playerOne.playerOneGamePiece.textContent =
      playerTwo.playerTwoGamePiece.textContent;
    playerTwo.playerTwoGamePiece.textContent = playerOneGamePieceHold;
  }
});

//"push" button back up after click - Styling
playerGamePieceButton.addEventListener("mouseup", () => {
  pushPieceSelectorBackUp();
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

  pushPieceSelectorBackUp(); //make piece changer button look raised
  gameState.gameInProgress = false; //game not in progress

  //set turn back to player one for new game
  gameState.currentTurn = 1;
  document.getElementById("currentPlayerTurn").textContent =
    "Turn: " + playerOne.playerOneName.value;
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

//########################################################################################################
//GAME PLAY

//allows players to play by selecting a tile on the board
//if the selected tile already has a piece on it (from either player), then it does nothing

for (let i = 0; i < 9; i++) {
  gameState.allGameBlocks[i].addEventListener("mousedown", () => {
    //if this is the first tile being played, then set game progress as true and make piece selector
    //button appear pressed down (if player selects it an alert will pop up)
    if (gameState.gameInProgress == false) {
      pushPieceSelectorDown();
      gameState.gameInProgress = true;
    }

    //the value of i holds the tile selected

    //INDEX BUTTONS FOR REFERENCE
    //  0   1   2
    //  3   4   5
    //  6   7   8

    //First check if tile is empty, if not then don't do anything

    //i) If Empty -> Get current player turn from Game State to retieve player's game piece (X or O),
    //    replace empty content of tile with the player's gamePiece
    //ii) Then check if the player has won the game or not  - WRITE MY FUNCTION
    //iii) If player has not won the game, then swop turn to the other player

    //RESET Button Press
    //if the reset button is pressed

    //if tile is empty

    if (gameState.allGameBlocks[i].textContent == "\u00A0") {
      //retrieve current player's turn
      let playerTurnNumber = gameState.currentTurn;

      //replace empty tile with current player's game piece
      if (playerTurnNumber == 1) {
        gameState.allGameBlocks[i].textContent =
          playerOne.playerOneGamePiece.textContent;
      } else {
        gameState.allGameBlocks[i].textContent =
          playerTwo.playerTwoGamePiece.textContent;
      }

      let gameCompleted = checkIfPlayerHasWon();

      //check if all game tiles have been filled
      if (!gameCompleted) {
        //first check if all the tiles are empty (beginning of game)
        let allTilesEmpty = true;
        for (let k = 0; k < 9; k++) {
          if (gameState.allGameBlocks[k].textContent != "\u00A0") {
            allTilesEmpty = false;
          }
        }

        //now we know at least one tile has been filled
        if (!allTilesEmpty) {
          let allTilesFull = true;
          for (let j = 0; j < 9; j++) {
            if (gameState.allGameBlocks[j].textContent == "\u00A0") {
              //if any tile is found to be blank, then players can still make a move(s) so do not terminate the game
              allTilesFull = false;
              break;
            }  
          }
          if (allTilesFull) {
            console.log("all tiles are full");
            resetBoard();
          }
        }
      }

      if (!gameCompleted) {
        //If this was not a winning move, then alternate player's turn
        if (gameState.currentTurn == 1) {
          gameState.currentTurn = 2;

          if (playerTwo.playerTwoName.value == undefined) {
            document.getElementById("currentPlayerTurn").textContent =
              "Turn: Player 2";
          } else {
            document.getElementById("currentPlayerTurn").textContent =
              "Turn:" + playerTwo.playerTwoName.value;
          }
        } else {
          gameState.currentTurn = 1;

          if (playerOne.playerOneName.value == undefined) {
            document.getElementById("currentPlayerTurn").textContent =
              "Turn: Player 1";
          } else {
            document.getElementById("currentPlayerTurn").textContent =
              "Turn:" + playerOne.playerOneName.value;
          }
        }
      } else {
        
        console.log("winner");
        setTimeout(resetBoard, 2000);
      }
    }
  });
}

//INDEX BUTTONS FOR REFERENCE
//  0   1   2
//  3   4   5
//  6   7   8

//Function to Check if there has been a win
//In order to win there needs to be three of the same game piece in a horizontal, vertical or diagonal row
//funtion first checks if any row (indeces 0, 3, or 6), column (0, 1 or 2)
//or though the main diagonals (0, 4 and 8 OR 2,4 or 6) have three of the same game pieces, if so
//then the player whose gamepiece matches this has won
//Winner -> Increment number of Wins by 1, reset board. If player 2 won, then swop players around
//No Winner -> function checks if all 9 blocks are full, if so then display alert that the game was a draw
//reset board and no player receives a win increment

function checkIfPlayerHasWon() {
  //object to reference array of all gameBlocks
  let gameBlockArray = gameState.allGameBlocks;

  //1) Check to see if the first block is blank
  //if not, then there could be a winner in the first row, column or diagonal
  if (gameBlockArray[0].textContent != "\u00A0") {
    if (
      //check for win in first row
      gameBlockArray[0].textContent == gameBlockArray[1].textContent &&
      gameBlockArray[0].textContent == gameBlockArray[2].textContent
    ) {
      determineWinningPlayer(gameBlockArray[0].textContent);
      return true;
    } else if (
      //
      //check for win in first column
      gameBlockArray[0].textContent == gameBlockArray[3].textContent &&
      gameBlockArray[0].textContent == gameBlockArray[6].textContent
    ) {
      determineWinningPlayer(gameBlockArray[0].textContent);
      return true;
    } else if (
      //
      //check for win in first diagonal
      gameBlockArray[0].textContent == gameBlockArray[4].textContent &&
      gameBlockArray[0].textContent == gameBlockArray[8].textContent
    ) {
      determineWinningPlayer(gameBlockArray[0].textContent);
      return true;
    }
  }

  //check if the second block= (row one) is blank, if not check for winner in second column
  if (gameBlockArray[1].textContent != "\u00A0") {
    if (
      gameBlockArray[1].textContent == gameBlockArray[4].textContent &&
      gameBlockArray[1].textContent == gameBlockArray[7].textContent
    ) {
      //means there is a winner in the second column
      determineWinningPlayer(gameBlockArray[1].textContent);
      return true;
    }
  }

  //check if the third block (row one) is blank, if not then check for winner in third column or second diagonal
  if (gameBlockArray[2].textContent != "\u00A0") {
    //check for winner in third column
    if (
      gameBlockArray[2].textContent == gameBlockArray[5].textContent &&
      gameBlockArray[2].textContent == gameBlockArray[8].textContent
    ) {
      determineWinningPlayer(gameBlockArray[2].textContent);
      return true;
      //
      //check for winner in second diagonal
    } else if (
      gameBlockArray[2].textContent == gameBlockArray[4].textContent &&
      gameBlockArray[2].textContent == gameBlockArray[6].textContent
    ) {
      determineWinningPlayer(gameBlockArray[2].textContent);
      return true;
    }
  }

  //check if block one(row two) is blank, if not then check for winner in second row
  if (gameBlockArray[3].textContent != "\u00A0") {
    if (
      gameBlockArray[3].textContent == gameBlockArray[4].textContent &&
      gameBlockArray[3].textContent == gameBlockArray[5].textContent
    ) {
      determineWinningPlayer(gameBlockArray[3].textContent);
      return true;
    }
  }

  //check if block one(row three) is blank, if not then check for winner in third row
  if (gameBlockArray[6].textContent != "\u00A0") {
    if (
      gameBlockArray[6].textContent == gameBlockArray[7].textContent &&
      gameBlockArray[6].textContent == gameBlockArray[8].textContent
    ) {
      determineWinningPlayer(gameBlockArray[6].textContent);
      return true;
    }
  }

  //no win conditions matched so no winner
  return false;
}


//#HELPER FUNCTION
//Used to Determine which player has won by taking gamepiece of player that got the winning tile
//function will call the div to display winner informatio and increment number of wins of player
//In the event that player two has won, then that person will become the new player one
function determineWinningPlayer(winnningGamePiece){

    gameState.gameInProgress = false; //game not in progress
    pushPieceSelectorBackUp();
  
    //check if player one was the winner, if so increment the number of wins
    if(playerOne.playerOneGamePiece.textContent == winnningGamePiece){
      playerOne.playerOneNumberOfWins++;
      document.getElementById("playerOneTally").textContent = "Wins: " + playerOne.playerOneNumberOfWins;
    } else{
      //this means player two has won
      playerTwo.playerTwoNumberOfWins++;
      document.getElementById("playerTwoTally").textContent = "Wins: " + playerTwo.playerTwoNumberOfWins;
    }
  
}

//########################################################################################################
