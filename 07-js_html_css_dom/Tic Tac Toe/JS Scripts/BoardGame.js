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