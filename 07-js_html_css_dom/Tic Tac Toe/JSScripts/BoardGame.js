//########################################################################################################
//GAME PIECE SELECTOR BUTTON

let playerGamePieceButton = document.getElementById("playerGamePieceButton");
playerGamePieceButton.addEventListener("mousedown", () => {
  playerGamePieceButton.setAttribute("style", "bottom: 0.1rem; right: 1rem;; box-shadow: 0px 0px 5px black");
});


playerGamePieceButton.addEventListener("mouseup", () => {
  playerGamePieceButton.setAttribute("style", "box-shadow: 0px 0px 4px 3px black; bottom:0rem; right: 0.9rem;");
});




//########################################################################################################
//RESET BUTTON

    //------------------------------------------------------------------------------------------------
//Make Button Look Pressed when mouse is presses/held down on it
let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("mousedown", () => {
  resetButton.setAttribute("style", "top: 10.1rem; right: 8.1rem; box-shadow: 0px 0px 5px black");
});


resetButton.addEventListener("mouseup", () => {
  resetButton.setAttribute("style", "box-shadow: 0px 0px 4px 3px black; top: 10rem; right: 8rem");
});

//------------------------------------------------------------------------------------------------

//########################################################################################################
//Rules BUTTON

    //------------------------------------------------------------------------------------------------
//Make Button Look Pressed when mouse is presses/held down on it
let rulesButton = document.getElementById("rulesButton");
rulesButton.addEventListener("mousedown", () => {
  rulesButton.setAttribute("style", "top: 15.1rem; right: 8.1rem; box-shadow: 0px 0px 5px black");
});


rulesButton.addEventListener("mouseup", () => {
  rulesButton.setAttribute("style", "box-shadow: 0px 0px 4px 3px black; top: 15rem; right: 8rem");
});

//------------------------------------------------------------------------------------------------
