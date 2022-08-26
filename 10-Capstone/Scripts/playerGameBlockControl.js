//Class blueprint for each gridBlock
// id = id of block in HTML page
class blockElement {
  constructor(id, rowCount, columnCount, containsShip, shipHead, firedOn) {
    this.id = id;
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.containsShip = containsShip;
    this.shipHead = shipHead;
    this.firedOn = firedOn;
  }
}

/*################################################################################################
PLAYER AND ENEMY GRIDS - CREATION
#################################################################################################
*/
//Array of all gridBlocks for Player and Enemy (Computer Player)
//Create a 2-D array for each consisiting of 100 grid blocks in total (10 x 10)

let playerGridArray = new Array(10);
let enemyGridArray = new Array(10);

//initialize GameBoard
function initializeGame() {
  for (let i = 0; i < 10; i++) {
    playerGridArray[i] = new Array(10);
    enemyGridArray[i] = new Array(10);
  }

  //initialize each block in player and enemy Arrays as:
  /* id = element of each block in HTML Page
  Row and Column Counts ranging from 0 - 9
  ContainsShip = "none" and shipHead = false
  firedOn = false;
*/
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      playerGridArray[i][j] = new blockElement(
        document.getElementById("p" + i + j),
        i,
        j,
        "none",
        false,
        false
      );

      enemyGridArray[i][j]=new blockElement(
        document.getElementById("e" + i + j),
        i,
        j,
        "none",
        false,
        false
      );
    }
  }

  //function that places player ships in default positions
  setInitialPlayerShipPositions();
  //function to randomly arrange enemy player (computer) ships
  setEnemyShipPositions();
}

/*##############################################################################################
PLAYER GRID - POPULATION WITH DEFAULT SHIP POSITIONS AND ORIENTATIONS
################################################################################################
*/
//link Player elements to HTML ship elements
let playerCarrier = document.getElementById("playerCarrier");
let playerBattleship = document.getElementById("playerBattleship");
let playerCruiser = document.getElementById("playerCruiser");
let playerSubmarine = document.getElementById("playerSubmarine");
let playerDestroyer = document.getElementById("playerDestroyer");

//set initial position of playerShips on Grid (default positions)
function setInitialPlayerShipPositions() {
  //Set Position of Carrier (5 Grid Blocks) - Horizontal
  playerGridArray[0][0].containsShip = "playerCarrier";
  playerGridArray[0][0].shipHead = true;
  playerGridArray[0][1].containsShip = "playerCarrier";
  playerGridArray[0][2].containsShip = "playerCarrier";
  playerGridArray[0][3].containsShip = "playerCarrier";
  playerGridArray[0][4].containsShip = "playerCarrier";

  //Set Position of Battleship (4 Grid Blocks) - Vertical
  playerGridArray[4][1].containsShip = "playerBattleship";
  playerGridArray[4][1].shipHead = true;
  playerGridArray[5][1].containsShip = "playerBattleship";
  playerGridArray[6][1].containsShip = "playerBattleship";
  playerGridArray[7][1].containsShip = "playerBattleship";

  //Set Position of Cruiser (3 Grid Blocks) - Vertical
  playerGridArray[3][3].containsShip = "playerCruiser";
  playerGridArray[3][3].shipHead = true;
  playerGridArray[4][3].containsShip = "playerCruiser";
  playerGridArray[5][3].containsShip = "playerCruiser";

  //Set Position of Submarine (3 Grid Blocks) - Horizontal
  playerGridArray[7][5].containsShip = "playerSubmarine";
  playerGridArray[7][5].shipHead = true;
  playerGridArray[7][6].containsShip = "playerSubmarine";
  playerGridArray[7][7].containsShip = "playerSubmarine";

  //Set Position of Destoyer (2 Grid Blocks) - Horizontal
  playerGridArray[2][5].containsShip = "playerDestroyer";
  playerGridArray[2][5].shipHead = true;
  playerGridArray[2][6].containsShip = "playerDestroyer";
}

/*###########################################################################################
PLAYER SHIP ROTATIONS AND MOVEMENTS - INITIAL BOARD SETUP
##############################################################################################
*/

let allowRotationButton = false; //ensures rotation only done if a ship is selected
let shipName = "noneSelected";
//display current ship name upon user ship selection
let currentSelectedShip = document.getElementById("currentSelectedShip");

//variables used to track previous and current ships when user is changing ship positions
//on board - needed to change previous ship color back to default
let previousShip = "none";
let currentShip = "none";

//check if user clicks on a ship to rotate or move ship position
document.querySelectorAll(".ship").forEach((element) => {
  element.addEventListener("mousedown", () => {
    shipName = element.id;
    currentShip = shipName;
    currentSelectedShip.textContent= showCurrentShipName(element);
    //only allows player to rotate or move a ship if they select one first on page load
    allowRotationButton = true;
    allowMovement = true;

    if (previousShip != currentShip) {
      resetShipColor();
      element.style.backgroundColor = "rgb(237, 87, 6)";
    }
  });

  //add box shadow to element if user hovers over
  element.addEventListener("mouseover",()=>{
    element.style.boxShadow="-1px 1px 5px 3px rgba(255, 255, 255, 0.8)"
  });

  //remove box shadow if user leaves element
  element.addEventListener("mouseout",()=>{
    element.style.boxShadow="none";
  });

});

//HELPER FUNCTION
//Shows name of currently selected Ship to Player
function showCurrentShipName(element){
  switch(element.id){
    case "playerCarrier":
      return "CARRIER";
    case "playerBattleship":
      return "BATTLESHIP";
    case "playerCruiser":
      return "CRUISER";
    case "playerSubmarine":
      return "SUBMARINE";
    case "playerDestroyer":
      return "DESTROYER";
    default:
      return "CURRENT SHIP: NONE";
  }
}

//ROTATE SHIP
//_____________________________________________________________________________________________
//event listener if user wants to rotate a selected ship
document
  .getElementById("rotatebutton")
  .addEventListener("mousedown", function () {
    if (allowRotationButton) {
      rotateShip(shipName);
    } else {
      alert("Please Select a Ship to Rotate");
    }
  });

//MOVE SHIP
//_______________________________________________________________________________________________

// 1) UPWARDS - event listener if user wants to move a selected ship
document
  .getElementById("moveShipUpButton")
  .addEventListener("mousedown", function () {
    if (allowMovement) {
      moveShipUp(shipName);
    } else {
      alert("Please Select a Ship to Move Upwards");
    }
  });

// 2) DOWNWARDS - event listener if user wants to move a selected ship
document
  .getElementById("moveShipDownButton")
  .addEventListener("mousedown", function () {
    if (allowMovement) {
      moveShipDown(shipName);
    } else {
      alert("Please Select a Ship to Move Downwards");
    }
  });

// 3) LEFT - event listener if user wants to move a selected ship
document
  .getElementById("moveShipLeftButton")
  .addEventListener("mousedown", function () {
    if (allowMovement) {
      moveShipLeft(shipName);
    } else {
      alert("Please Select a Ship to Move to the Left");
    }
  });

// 4) Right - event listener if user wants to move a selected ship
document
  .getElementById("moveShipRightButton")
  .addEventListener("mousedown", function () {
    if (allowMovement) {
      moveShipRight(shipName);
    } else {
      alert("Please Select a Ship to Move to the Right");
    }
  });

//Start Game Button 
//_______________________________________________________________________________________________

//Event listener when start button is hovered over
let startGameButton = document.getElementById("startGameButton");
startGameButton.addEventListener("mouseover",()=>{
  startGameButton.setAttribute("style"," box-shadow: -1px 1px 5px 2px rgba(255, 255, 255, 0.8)")
})

//Event listener when mouse leaves start button
startGameButton.addEventListener("mouseout",()=>{
  startGameButton.setAttribute("style","box-shadow: -1px 1px 5px 5px rgba(5, 4, 4, 0.8)")
})

//Event listener when user clicks start button
startGameButton.addEventListener("mousedown",()=>{
  startGameButton.setAttribute("style","box-shadow: none")
  startGameButton.style.marginTop="-1.1rem";
  startGameButton.style.marginLeft="1.9rem";
})


/*####################################################################################
PLAYER SHIP ROTATIONS
######################################################################################
*/

let rotatebutton = document.getElementById("rotatebutton");

/*ROTATION FUNCTION - Rotate Ship by 90 degrees
1) Find Head Block of Ship:
  i) Vetical Ship: Head = top block
  ii) Horizontal Ship: Head = leftmost block
2) Determine if Ship is set horizontally or vertically
3) Determine if Ship Can be rotated 
    i) Ensure Rotation would not make ship extend beyond frid borders
    ii) Ensure rotation would not place ship on top of another ship
4) Rotate Ship
*/
function rotateShip(shipName) {
  previousShip = shipName;
  //find head of ship
  let shipHeadRow = findShipHeadRow(shipName);
  let shipHeadColumn = findShipHeadColumn(shipName);

  //determine if ship is positioned vertically or horizontally
  let vertical = isShipVertical(shipName, shipHeadRow, shipHeadColumn);

  //_______________________________________________________________________________________________
  //CHECK IF ROTATION CAN BE DONE
  //i)
  //If Ship is currently vertical, check that horizontal change would not make rightmost block
  //of ship extend beyond last column of grid
  //If Ship is currently horizontal, check that vertical change would not make bottom of ship
  //extend beyond last row of grid

  let shipLength = returnShipLength(shipName);

  //check vertical ship rotation to horizontal would not extend grid borders
  if (vertical) {
    if (shipHeadColumn + (shipLength - 1) > 9) {
      //rotation not allowed
      alert(
        "Cannot Rotate Ship Horizontally. Please move ship LEFT");
      return;
    }
  } else {
    //check horizontal ship rotation to vertical would not extend grid border
    if (shipHeadRow + (shipLength - 1) > 9) {
      //rotation not allowed
      alert(
        "Cannot Rotate Ship Vertically. Please move ship UP");
      return;
    }
  }

  //ii)
  //Check that Ship rotation would not place ship on top of another

  //vertical to Horizontal check
  if (vertical) {
    for (let k = 1; k < shipLength; k++) {
      if (
        playerGridArray[shipHeadRow][shipHeadColumn + k].containsShip != "none"
      ) {
        alert(
          "Cannot Rotate Ship Horizontally as there is another Ship in the way"
        );
        return;
      }
    }
  } else {
    //Horizontal to Vertical Check
    for (let k = 1; k < shipLength; k++) {
      if (
        playerGridArray[shipHeadRow + k][shipHeadColumn].containsShip != "none"
      ) {
        alert(
          "Cannot Rotate Ship Vertically as there is another Ship in the way"
        );
        return;
      }
    }
  }

  //__________________________________________________________________________________________
  //ROTATE SELECTED SHIP
  //At this point all conditions have been met to allow for ship rotation
  //i) Change grid blocks that contain ship
  if (vertical) {
    for (let k = 1; k < shipLength; k++) {
      //first 'rotate' ship to occupy grid blocks to the right of ship
      playerGridArray[shipHeadRow][shipHeadColumn + k].containsShip = shipName;
      //remove ship from previous vertical blocks
      playerGridArray[shipHeadRow + k][shipHeadColumn].containsShip = "none";
    }
  } else {
    for (let k = 1; k < shipLength; k++) {
      //first 'rotate' ship to occupy grid blocks to the bottom of ship
      playerGridArray[shipHeadRow + k][shipHeadColumn].containsShip = shipName;
      //remove ship from previous horizontal blocks
      playerGridArray[shipHeadRow][shipHeadColumn + k].containsShip = "none";
    }
  }

  //rotate Ship Div on GameBoard
  switch (shipName) {
    case "playerCarrier":
      swopShipHeightAndWidth(playerCarrier);
      break;
    case "playerBattleship":
      swopShipHeightAndWidth(playerBattleship);
      break;
    case "playerCruiser":
      swopShipHeightAndWidth(playerCruiser);
      break;
    case "playerSubmarine":
      swopShipHeightAndWidth(playerSubmarine);
      break;
    case "playerDestroyer":
      swopShipHeightAndWidth(playerDestroyer);
      break;
  }
}

//HELPER FUNCTION
//swop values of height and width of a ship element - mimics rotating ship by 90 degrees
function swopShipHeightAndWidth(element) {
  let hold = element.clientHeight;
  element.style.height = element.clientWidth + "px";
  element.style.width = hold + "px";
}

/*#####################################################################################
PLAYER SHIP MOVEMENTS

Ship div positions on gameboard are measured 3px from top and left of board
Movement by one block (in any direction) requires the addition or subtraction of 37px

All Ships Movements use this initial logic:
1) Find Head Block of Ship:
  i) Vetical Ship: Head = top block
  ii) Horizontal Ship: Head = leftmost block
2) Determine if Ship is set horizontally or vertically

######################################################################################
*/
let allowMovement = false;

/*____________________________________________________________________________________
//Move Ship Upwards
//____________________________________________________________________________________
Function used to move a ship upwards by one block
 Determine if Ship Can be moved upwards 
    i) Ensure upward movement would not cause ship to extend beyond top border
    ii) Ensure upward movement would not place this ship on top of another
 Move Ship
*/
function moveShipUp(shipName) {
  previousShip = shipName;

  //1) and 2)
  //find shipHeadRow, shipHeadColumn and determine if ship is positioned vertically
  let shipHeadRow = findShipHeadRow(shipName);
  let shipHeadColumn = findShipHeadColumn(shipName);
  let vertical = isShipVertical(shipName, shipHeadRow, shipHeadColumn);

  //3 i) Determine if upward movement of Ship would cause ship to move out of player grid
  //would occur is headRow becomes -1;
  if (shipHeadRow - 1 < 0) {
    alert("Ship Cannot be moved Upwards");
    return;
  }

  //3 ii) Determine if Upward Movement of Ship would place ship on top of another

  //Case 1 - Vertical Ship
  //Check that shipHead would not be moved on to another ship
  if (vertical) {
    if (
      playerGridArray[shipHeadRow - 1][shipHeadColumn].containsShip != "none"
    ) {
      alert("Ship Cannot be moved Upwards, another Ship is in the way");
      return;
    }
  } else {
    //Case 2 - Horizontal Ship
    //Check that each grid block of ship would not be moved onto another ship
    for (let i = 0; i < returnShipLength(shipName); i++) {
      if (
        playerGridArray[shipHeadRow - 1][shipHeadColumn + i].containsShip !=
        "none"
      ) {
        alert("Ship Cannot be moved Upwards, another Ship is in the way");
        return;
      }
    }
  }

  //At this point all conditions have been passed and ship can be moved upwards

  //MOVE SHIP IN PLAYER GRID
  //CASE 1 - Vertical Ship

  if (vertical) {
    //Change block above Ship Head to contain ship and turn into new ship head
    playerGridArray[shipHeadRow - 1][shipHeadColumn].containsShip = shipName;
    playerGridArray[shipHeadRow - 1][shipHeadColumn].shipHead = true;
    //remove old Ship Head
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead = false;
    //remove bottom grid block of ship
    playerGridArray[shipHeadRow + (returnShipLength(shipName) - 1)][
      shipHeadColumn
    ].containsShip = "none";
  } else {
    //CASE 2 - Horizontal Ship
    //Change block above Ship Head into new ship head
    playerGridArray[shipHeadRow - 1][shipHeadColumn].shipHead = true;
    //remove old Ship Head
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead = false;
    for (let i = 0; i < returnShipLength(shipName); i++) {
      //change grid blocks above current horizontal ship to contain ship
      playerGridArray[shipHeadRow - 1][shipHeadColumn + i].containsShip =
        shipName;
      //change current grid blocks containing ship to 'none'
      playerGridArray[shipHeadRow][shipHeadColumn + i].containsShip = "none";
    }
  }

  //MOVE SHIP DIV ON GAMEBOARD
  determineShipAndDirectionToMove(shipName, "up");
}

/*________________________________________________________________________________________
//Move Ship Downwards
//________________________________________________________________________________________
Function used to move a ship downwards by one block
 Determine if Ship Can be moved downwards 
    i) Ensure downward movement would not cause ship to extend beyond bottom border
    ii) Ensure downward movement would not place this ship on top of another
 Move Ship
 */

function moveShipDown(shipName) {
  previousShip = shipName;

  //1) and 2)
  //find shipHeadRow, shipHeadColumn and determine if ship is positioned vertically
  let shipHeadRow = findShipHeadRow(shipName);
  let shipHeadColumn = findShipHeadColumn(shipName);
  let vertical = isShipVertical(shipName, shipHeadRow, shipHeadColumn);

  //3 i) Determine if downward movement of Ship would cause ship to move out of player grid
  //would occur is bottomRow becomes >9;
  if (vertical) {
    if (shipHeadRow + returnShipLength(shipName) > 9) {
      alert("Ship Cannot be moved Downwards");
      return;
    }
  } else {
    if (shipHeadRow + 1 > 9) {
      alert("Ship Cannot be moved Downwards");
      return;
    }
  }

  //3 ii) Determine if Downward Movement of Ship would place ship on top of another

  //Case 1 - Vertical Ship
  //Check that shipHead would not be moved on to another ship at the bottom
  if (vertical) {
    if (
      playerGridArray[shipHeadRow + returnShipLength(shipName)][shipHeadColumn]
        .containsShip != "none"
    ) {
      alert("Ship Cannot be moved Downwards, another Ship is in the way");
      return;
    }
  } else {
    //Case 2 - Horizontal Ship
    //Check that each grid block of ship would not be moved onto another ship
    for (let i = 0; i < returnShipLength(shipName); i++) {
      if (
        playerGridArray[shipHeadRow + 1][shipHeadColumn + i].containsShip !=
        "none"
      ) {
        alert("Ship Cannot be moved Downwards, another Ship is in the way");
        return;
      }
    }
  }

  //At this point all conditions have been passed and ship can be moved Downwards

  //MOVE SHIP IN PLAYER GRID
  //CASE 1 - Vertical Ship

  if (vertical) {
    //Change block at the bottom of the ship into a ship block
    playerGridArray[shipHeadRow + returnShipLength(shipName)][
      shipHeadColumn
    ].containsShip = shipName;
    //set block below current Ship Head into new Ship Head and remove current one
    playerGridArray[shipHeadRow + 1][shipHeadColumn].shipHead = true;
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead = false;
    //remove ship element from old Ship Head Block
    playerGridArray[shipHeadRow][shipHeadColumn].containsShip = "none";
  } else {
    //CASE 2 - Horizontal Ship
    //Change block below Ship Head into new ship head
    playerGridArray[shipHeadRow + 1][shipHeadColumn].shipHead = true;
    //remove old Ship Head
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead = false;
    for (let i = 0; i < returnShipLength(shipName); i++) {
      //change grid blocks below current horizontal ship to contain ship
      playerGridArray[shipHeadRow + 1][shipHeadColumn + i].containsShip =
        shipName;
      //change current grid blocks containing ship to 'none'
      playerGridArray[shipHeadRow][shipHeadColumn + i].containsShip = "none";
    }
  }

  //MOVE SHIP DIV ON GAMEBOARD
  determineShipAndDirectionToMove(shipName, "down");
}

/*______________________________________________________________________________________
//Move Ship Left
//______________________________________________________________________________________
Function used to move a ship to the left by one block
 Determine if Ship Can be moved to the left
    i) Ensure movement to left would not cause ship to extend beyond left border
    ii) Ensure movement to left would not place this ship on top of another
 Move Ship
 */

function moveShipLeft(shipName) {
  previousShip = shipName;

  //1) and 2)
  //find shipHeadRow, shipHeadColumn and determine if ship is positioned vertically
  let shipHeadRow = findShipHeadRow(shipName);
  let shipHeadColumn = findShipHeadColumn(shipName);
  let vertical = isShipVertical(shipName, shipHeadRow, shipHeadColumn);

  //3 i) Determine if left movement of Ship would cause ship to move out of player grid
  //would occur if left column becomes < 0;
  if (shipHeadColumn - 1 < 0) {
    alert("Ship Cannot be moved Left");
    return;
  }

  //3 ii) Determine if Left Movement of Ship would place ship on top of another

  //CASE 1 - VERTICAL SHIP
  if (vertical) {
    //check if a ship is next to any of the grid blocks for vertical ship
    for (let i = 0; i < returnShipLength(shipName); i++) {
      if (
        playerGridArray[shipHeadRow + i][shipHeadColumn - 1].containsShip !=
        "none"
      ) {
        alert("Ship Cannot be moved Left, another Ship is in the way");
        return;
      }
    }
  } else {
    //CASE 2 - HORIZONTAL SHIP
    //check if there is a ship next to the current head
    if (
      playerGridArray[shipHeadRow][shipHeadColumn - 1].containsShip != "none"
    ) {
      alert("Ship Cannot be moved Left, another Ship is in the way");
      return;
    }
  }

  //At this point all conditions have been passed and ship can be moved to the Left

  //MOVE SHIP IN PLAYER GRID
  //CASE 1 - Vertical Ship

  if (vertical) {
    //Change block to the left of head into new head and remove current one
    playerGridArray[shipHeadRow][shipHeadColumn - 1].shipHead = true;
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead = false;
    //change all blocks to the left of the ship to contain the ship and remove ship from
    //all current grid blocks
    for (let i = 0; i < returnShipLength(shipName); i++) {
      playerGridArray[shipHeadRow + i][shipHeadColumn - 1].containsShip =
        shipName;
      playerGridArray[shipHeadRow + i][shipHeadColumn].containsShip = "none";
    }
  } else {
    //CASE 2 - Horizontal Ship
    //Change block to the left of ship head into new head and remove current one
    playerGridArray[shipHeadRow][shipHeadColumn - 1].shipHead = true;
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead = false;
    //change block now containing ship head (left of old one) to contain the ship
    playerGridArray[shipHeadRow][shipHeadColumn - 1].containsShip = shipName;
    //remove ship from rightmost block
    playerGridArray[shipHeadRow][
      shipHeadColumn + (returnShipLength(shipName) - 1)
    ].containsShip = "none";
  }

  //MOVE SHIP DIV ON GAMEBOARD
  determineShipAndDirectionToMove(shipName, "left");
}

/*_______________________________________________________________________________________
//Move Ship Right
//_______________________________________________________________________________________
Function used to move a ship to the right by one block
 Determine if Ship Can be moved to the right
    i) Ensure movement to the right would not cause ship to extend beyond right border
    ii) Ensure movement to the right would not place this ship on top of another
 Move Ship
 */

function moveShipRight(shipName) {
  previousShip = shipName;

  //1) and 2)
  //find shipHeadRow, shipHeadColumn and determine if ship is positioned vertically
  let shipHeadRow = findShipHeadRow(shipName);
  let shipHeadColumn = findShipHeadColumn(shipName);
  let vertical = isShipVertical(shipName, shipHeadRow, shipHeadColumn);

  //3 i) Determine if right movement of Ship would cause ship to move out of player grid

  if (vertical) {
    //would occur if moving vertical ship to the right would make shipHeadColumn > 9
    if (shipHeadColumn + 1 > 9) {
      alert("Ship Cannot be moved Right");
      return;
    }
  } else {
    //for Horizontal ship, would occur if rightmost block of ship +1 would be greater than 9
    //if moved to the right
    if (shipHeadColumn + returnShipLength(shipName) > 9) {
      alert("Ship Cannot be moved Right");
      return;
    }
  }

  //3 ii) Determine if Right Movement of Ship would place ship on top of another

  //CASE 1 - VERTICAL SHIP
  if (vertical) {
    //check if a ship is next to any of the grid blocks for vertical ship
    for (let i = 0; i < returnShipLength(shipName); i++) {
      if (
        playerGridArray[shipHeadRow + i][shipHeadColumn + 1].containsShip !=
        "none"
      ) {
        alert("Ship Cannot be moved Right, another Ship is in the way");
        return;
      }
    }
  } else {
    //CASE 2 - HORIZONTAL SHIP
    //check if there is a ship next to the rightmost block of the ship
    if (
      playerGridArray[shipHeadRow][shipHeadColumn + returnShipLength(shipName)]
        .containsShip != "none"
    ) {
      alert("Ship Cannot be moved Right, another Ship is in the way");
      return;
    }
  }

  //At this point all conditions have been passed and ship can be moved to the Right

  //MOVE SHIP IN PLAYER GRID
  //CASE 1 - Vertical Ship

  if (vertical) {
    //Change block to the right of head into new head and remove current one
    playerGridArray[shipHeadRow][shipHeadColumn + 1].shipHead = true;
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead = false;
    //change all blocks to the right of the ship to contain the ship and remove ship from
    //all current grid blocks
    for (let i = 0; i < returnShipLength(shipName); i++) {
      playerGridArray[shipHeadRow + i][shipHeadColumn + 1].containsShip =
        shipName;
      playerGridArray[shipHeadRow + i][shipHeadColumn].containsShip = "none";
    }
  } else {
    //CASE 2 - Horizontal Ship
    //Change block to the right of the current head into the new head and remove the old one
    playerGridArray[shipHeadRow][shipHeadColumn + 1].shipHead = true;
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead = false;
    //add ship block to the rightmost end of ship
    playerGridArray[shipHeadRow][
      shipHeadColumn + returnShipLength(shipName)
    ].containsShip = shipName;
    //remove old head block from ship (remove containsShip)
    playerGridArray[shipHeadRow][shipHeadColumn].containsShip = "none";
  }

  //MOVE SHIP DIV ON GAMEBOARD
  determineShipAndDirectionToMove(shipName, "right");
}

//HELPER FUNCTION
//Determine which ship needs to be moved and in what direction
function determineShipAndDirectionToMove(shipName, direction) {
  switch (shipName) {
    case "playerCarrier":
      moveShipOnBoard(playerCarrier, direction);
      break;
    case "playerBattleship":
      moveShipOnBoard(playerBattleship, direction);
      break;
    case "playerCruiser":
      moveShipOnBoard(playerCruiser, direction);
      break;
    case "playerSubmarine":
      moveShipOnBoard(playerSubmarine, direction);
      break;
    case "playerDestroyer":
      moveShipOnBoard(playerDestroyer, direction);
      break;
    default:
      console.error("unable to move ship upwards");
      break;
  }
}

//HELPER FUNCTION
//Move a selected ship on grid in specified direction by one block by retrieving either current
// top or current left margin and adding or subtracting 37px(side length of one grid block)
/*Params: Ship Element on Grid
          Direction of movement (up, down, left or right)
  NOTE: Validation of movement is verified in above calling functions
*/
function moveShipOnBoard(element, direction) {
  let currentShipMarginValue = 0;
  switch (direction) {
    case "up":
      currentShipMarginValue = parseInt(
        window.getComputedStyle(element).marginTop.slice(0, -2)
      );
      element.style.marginTop = (currentShipMarginValue -= 37) + "px";
      break;
    case "down":
      currentShipMarginValue = parseInt(
        window.getComputedStyle(element).marginTop.slice(0, -2)
      );
      element.style.marginTop = (currentShipMarginValue += 37) + "px";
      break;
    case "left":
      currentShipMarginValue = parseInt(
        window.getComputedStyle(element).marginLeft.slice(0, -2)
      );
      element.style.marginLeft = (currentShipMarginValue -= 37) + "px";
      break;
    case "right":
      currentShipMarginValue = parseInt(
        window.getComputedStyle(element).marginLeft.slice(0, -2)
      );
      element.style.marginLeft = (currentShipMarginValue += 37) + "px";
      break;
  }
}

/*#####################################################################################
ROTATE AND MOVE SHIP HELPER FUNCTIONS
#######################################################################################
*/

//Find head of ship
//1) Find Row number of ship head
function findShipHeadRow(shipName) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (
        playerGridArray[i][j].shipHead == true &&
        playerGridArray[i][j].containsShip == shipName
      ) {
        return i;
      }
    }
  }
}

//2) Find Column number of ship head
function findShipHeadColumn(shipName) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (
        playerGridArray[i][j].shipHead == true &&
        playerGridArray[i][j].containsShip == shipName
      ) {
        return j;
      }
    }
  }
}

//Determine if Ship is currently horizontal or vertical
function isShipVertical(shipName, shipHeadRow, shipHeadColumn) {
  try {
    //if grid block below is the same ship type, then ship is positioned vertically
    if (
      playerGridArray[shipHeadRow + 1][shipHeadColumn].containsShip == shipName
    ) {
      return true;
    } else {
      //Grid block to the right would be the same as the ship (horizontal)
      return false;
    }
  } catch (e) {
    //error occurs if Ship is Horizontal and in bottom row (cannot check block below)
      return false;
  }
}

//return all ships background color to default
function resetShipColor() {
  playerCarrier.style.backgroundColor = "rgb(73, 77, 77";
  playerBattleship.style.backgroundColor = "rgb(73, 77, 77";
  playerCruiser.style.backgroundColor = "rgb(73, 77, 77";
  playerSubmarine.style.backgroundColor = "rgb(73, 77, 77";
  playerDestroyer.style.backgroundColor = "rgb(73, 77, 77";
}

//return length of current ship type
function returnShipLength(shipName) {
  if (shipName == "playerCarrier" || shipName=="enemyCarrier") {
    return 5;
  } else if (shipName == "playerBattleship" || shipName=="enemyBattleship") {
    return 4;
  } else if (shipName == "playerCruiser" || shipName == "playerSubmarine" 
      || shipName=="enemyCruiser" || shipName=="enemySubmarine") {
    return 3;
  } else {
    return 2; //Destoyer       
  }
}

/*#######################################################################################
BOARD EFFECTS FOR MOVEMENT OF CURSOR ON BUTTONS OR OVER GRIDS
#########################################################################################
*/

//_______________________________________________________________________________________
//Direction of Player Ship Movement Buttons - Hover
// Changes Button Color (Border Color) to green when hovered over by mouse
//_______________________________________________________________________________________

//assign elements to movement buttons
let rotateButton = document.getElementById("rotatebutton");
let moveUpButton = document.getElementById("moveShipUpButton");
let moveDownButton = document.getElementById("moveShipDownButton");
let moveLeftButton = document.getElementById("moveShipLeftButton");
let moveRightButton = document.getElementById("moveShipRightButton");
let playerShipMovementOuterButton = document.getElementById("playerShipMovementOuterButton");

//Rotate Button to Orange on hover
rotateButton.addEventListener("mouseover",(element)=>{
  rotateButton.setAttribute("style","background-color:orange;color:black")
});

//Rotate Button back to black when mouse leaves
rotatebutton.addEventListener("mouseout",(element)=>{
  rotatebutton.setAttribute("style","background-color:black;color:white")
});

//Move Up Button to Green on hover
moveUpButton.addEventListener("mouseover",(element)=>{
    moveUpButton.setAttribute("style","border-bottom: 25px solid green;")
});

//Move Up Button back to red when mouse leaves
moveUpButton.addEventListener("mouseout",(element)=>{
  moveUpButton.setAttribute("style","border-bottom: 25px solid red;");
  //change outer div test shadow to normal if upward movement is not allowed
  playerShipMovementOuterButton.setAttribute("style","box-shadow: -1px 1px 5px 3px rgba(255, 255, 255, 0.8)");
});

//Move Down Button to Green on hover
moveDownButton.addEventListener("mouseover",(element)=>{
moveDownButton.setAttribute("style","border-top: 25px solid green;")
});

//Move Down Button back to red when mouse leaves
moveDownButton.addEventListener("mouseout",(element)=>{
moveDownButton.setAttribute("style","border-top: 25px solid red;")
//change outer div test shadow to normal if down movement is not allowed
playerShipMovementOuterButton.setAttribute("style","box-shadow: -1px 1px 5px 3px rgba(255, 255, 255, 0.8)");
});

//Move Left Button to Green on hover
moveLeftButton.addEventListener("mouseover",(element)=>{
  moveLeftButton.setAttribute("style","border-right: 25px solid green;")
});
  
//Move Left Button back to red when mouse leaves
moveLeftButton.addEventListener("mouseout",(element)=>{
  moveLeftButton.setAttribute("style","border-right: 25px solid red;")
  //change outer div test shadow to normal if left movement is not allowed
  playerShipMovementOuterButton.setAttribute("style","box-shadow: -1px 1px 5px 3px rgba(255, 255, 255, 0.8)");
});

//Move Right Button to Green on hover
moveRightButton.addEventListener("mouseover",(element)=>{
  moveRightButton.setAttribute("style","border-left: 25px solid green;")
});
  
//Move Left Button back to red when mouse leaves
moveRightButton.addEventListener("mouseout",(element)=>{
  moveRightButton.setAttribute("style","border-left: 25px solid red;")
  //change outer div test shadow to normal if right movement is not allowed
  playerShipMovementOuterButton.setAttribute("style","box-shadow: -1px 1px 5px 3px rgba(255, 255, 255, 0.8)");
});

//_______________________________________________________________________________________
//Direction of Player Ship Movement Buttons - Click
// Changes Text Shadow around Rotate Button or large div containg all 
// movement buttons when pressed
//_______________________________________________________________________________________

  //Rotate Button - Remove Box Shadow when pressed
  rotateButton.addEventListener("mousedown",(element)=>{
    rotateButton.setAttribute("style","box-shadow:none; background-color:orange;color:black")
  });
    
  //Rotate Button - Return Box Shadow to Normal After Click
  rotateButton.addEventListener("mouseup",(element)=>{
    rotateButton.setAttribute("style", "box-shadow: -1px 1px 5px 1px rgba(255, 255, 255, 0.8);background-color:orange;color:black");
  });


  document.querySelectorAll(".movementButton").forEach((element)=>{
    element.addEventListener("mousedown",()=>{
      playerShipMovementOuterButton.setAttribute("style", "box-shadow:none");
    });
    element.addEventListener("mouseup",()=>{
      playerShipMovementOuterButton.setAttribute("style", "box-shadow: -1px 1px 5px 3px rgba(255, 255, 255, 0.8)");
    });
  })

/*###############################################################################
ENEMY GAMEPLAY
#################################################################################
*/

//link Enemey Ship elements to HTML ship elements
let enemyCarrier = document.getElementById("enemyCarrier");
let enemyBattleship = document.getElementById("enemyBattleship");
let enemyCruiser = document.getElementById("enemyCruiser");
let enemySubmarine = document.getElementById("enemySubmarine");
let enemyDestroyer = document.getElementById("enemyDestroyer");

//_______________________________________________________________________________________
// Functions to randomly set positions of enemy ships
//_______________________________________________________________________________________

/*Function to determine 'random' position for enemy ships
  Uses a random number generator to determine row and column number and decide if 
  ship should be vertical or horizontal
  Performs checks to see if this would result in ship exceeding any borders or
  being placed on top of another ship
*/
function determineEnemyShipPosition(shipElement, shipName){
  
  //determine ship length
  let shipLength=returnShipLength(shipName);
  //variable to quit loop
  let quit = false;

  while(!quit){

  //variable to check if all conditions have been met to place a ship
  //any conditions that fail will change this to "false"
  let shipPlacement=true;

    //assign random row and column numbers
    let randomRow=Math.floor(Math.random()*10);
    let randomColumn=Math.floor(Math.random()*10);
    
    if(enemyGridArray[randomRow][randomColumn].containsShip!="none"){
      //re-itterate loop
      continue;
    }

    //randomly choose horizontal or vertical placement of ship
    let vertical = (Math.random()>=0.5);
    if(vertical){
      //If Ship placement is vertical, determine if current row placement would allow 
      //vertical position below
      if(randomRow+(shipLength-1)<=9){
        //check if there is another ship in the way
        for(let i=0;i<shipLength;i++){
            if(enemyGridArray[randomRow+i][randomColumn].containsShip!="none"){
              //a ship is in the way
              shipPlacement = false;
              break;
              
            }
        }
        if(shipPlacement){
        //at this point the ship can be placed vertically below as no other ship is in the way
          for(let i=0;i<shipLength;i++){
            enemyGridArray[randomRow+i][randomColumn].containsShip=shipName;
          }
          //terminate while loop
          quit=true;
        }

      }else if(randomRow-(shipLength-1)>=0){
        //check if current row placement would otherwise allow ship to be placed
        //vertically above

        //check if there is another ship in the way
        for(let i=0;i<shipLength;i++){
          if(enemyGridArray[randomRow-i][randomColumn].containsShip!="none"){
             //a ship is in the way
             shipPlacement = false;
             break;
             
          }
        }

        if(shipPlacement){
          //at this point the ship can be placed vertically above as no other ship is in the way
          for(let i=0;i<shipLength;i++){
            enemyGridArray[randomRow-i][randomColumn].containsShip=shipName;
          }
          //terminate while loop
          quit=true;
        }
      }
      
    }else{
      //If Ship placement is horizontal, determine if current column placement would allow 
      //horizontal position to the right
      if(randomColumn+(shipLength-1)<=9){

        //check if there is another ship in the way
        for(let i=0;i<shipLength;i++){
          if(enemyGridArray[randomRow][randomColumn+i].containsShip!="none"){
            //a ship is in the way
            shipPlacement = false;
            break;
            
          }
        }

        if(shipPlacement){
          //at this point the ship can be placed horizontally to the right as no other ship is in the way
          for(let i=0;i<shipLength;i++){
            enemyGridArray[randomRow][randomColumn+i].containsShip=shipName;
          }
          //terminate while loop
          quit=true;
        }

      }else if(randomColumn-(shipLength-1)>=0){
      //If Ship placement is horizontal, determine if current column placement would allow 
      //horizontal position to the right

        //check if there is another ship in the way
        for(let i=0;i<shipLength;i++){
          if(enemyGridArray[randomRow][randomColumn-i].containsShip!="none"){
            //a ship is in the way
            shipPlacement = false;
            break;
            
          }
        }

        //at this point the ship can be placed horizontally to the left as no other ship is in the way
        if(shipPlacement){
          for(let i=0;i<shipLength;i++){
            enemyGridArray[randomRow][randomColumn-i].containsShip=shipName;
          }
          //terminate while loop
          quit=true;
        }
      }
    }
  }
}

//Function used to to arrange ships sequentially in order of:
//Carrier, BattleShip, Cruiser, Submarine, Destroyer
function setEnemyShipPositions(){
  //Set Position of Carrier
  determineEnemyShipPosition(enemyCarrier, "enemyCarrier");
  //Set Position of Battleship
  determineEnemyShipPosition(enemyBattleship, "enemyBattleship");
  //Set Position of Cruiser
  determineEnemyShipPosition(enemyCruiser, "enemyCruiser");
  //Set Position of Submarine
  determineEnemyShipPosition(enemySubmarine, "enemySubmarine");
  //Set Position of Destroyer
  determineEnemyShipPosition(enemyDestroyer, "enemyDestroyer");
}



//_______________________________________________________________________________________
// Event Listeners for Mouse Actions
//_______________________________________________________________________________________
//Highlights grid block Border hovered over by mouse green
document.querySelectorAll(".enemyGridElement").forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.setAttribute("style", "border: 4px solid green");
  });
});

//Set grid block border back to original color when mouse leaves
document.querySelectorAll(".enemyGridElement").forEach((element) => {
  element.addEventListener("mouseout", () => {
    element.setAttribute("style", "border: 1px solid white");
  });
});
  


/*###############################################################################
TESTING FUNCTIONS FOR LAB MARKER - use in Dev Console
#################################################################################
*/

//--------------------------------------------------------
//Player Grid Data
//-------------------------------------------------------

//Display All Grid Blocks Data
//Shows all object info for each grid block
function displayPlayerGridBlocksData() {
  for (let i = 0; i < 10; i++) {
    console.log(...playerGridArray[i]);
  }
}

//Display All Player Grid Blocks Summary
function displayPlayerGridBlocksSummary(){
  console.log("PLAYER CURRENT GRID");
  displayGridBlocksSummary(playerGridArray);
}

//Display All Enemy Grid Blocks Summary
function displayEnemyGridBlocksSummary(){
  console.log("ENEMY CURRENT GRID");
  displayGridBlocksSummary(enemyGridArray);
}

//Display All Grid Blocks Ship Positions - Summary
//Creates a second 2D Array containing H, X or .
// KEY: H = Block holds Head of a Ship
//      X = Block contains a Ship (not head)
//      . = Empty Block
function displayGridBlocksSummary(gridArray) {
  //Create 2D Display Array
  let displayArray = new Array(10);
  for (let i = 0; i < 10; i++) {
    displayArray[i] = new Array(10);
  }

  //Populate display Array with H, X or .
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (gridArray[i][j].shipHead == true) {
        displayArray[i][j] = "H";
      } else if (gridArray[i][j].containsShip != "none") {
        displayArray[i][j] = "X";
      } else {
        displayArray[i][j] = ".";
      }
    }
  }
  //Display Array
  for (let i = 0; i < 10; i++) {
    console.log(...displayArray[i]);
  }
}


