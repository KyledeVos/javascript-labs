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

/*###############################################################################
PLAYER AND ENEMY GRIDS - CREATION
#################################################################################
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

  //initialize each block in player Array as:
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
    }
  }

  setInitialPlayerShipPositions();
}

/*###############################################################################
PLAYER AND ENEMY GRIDS - POPULATION WITH DEFAULT SHIP POSITIONS AND ORIENTATIONS
#################################################################################
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

/*###############################################################################
PLAYER SHIP ROTATIONS AND MOVEMENTS - INITIAL BOARD SETUP
#################################################################################
*/

let allowRotationButton = false; //ensures rotation only done if a ship is selected
let shipName = "noneSelected";

//variables used to track previous and current ships when user is changing ship positions
//on board - needed to change previous ship color back to default
let previousShip = "none";
let currentShip = "none";

//check if user clicks on a ship to rotate or move ship position
document.querySelectorAll(".ship").forEach((element) => {
  element.addEventListener("mousedown", () => {
    shipName = element.id;
    currentShip = shipName;
    //only allows player to rotate or move a ship if they select one first on page load
    allowRotationButton = true;
    allowMovement = true;

    if (previousShip != currentShip) {
      resetShipColor();
      element.style.backgroundColor = "rgb(237, 87, 6)";
    }
  });
});

//ROTATE SHIP
//_______________________________________________________________________
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
//_______________________________________________________________________

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

/*#####################################################
PLAYER SHIP ROTATIONS
#######################################################
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

  //--------------------------------------------------------------------------------------------
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
        "Cannot Rotate Ship Horizontally. Please move ship LEFT by at least " +
          (returnShipLength(shipName) - 1) +
          " blocks first"
      );
      return;
    }
  } else {
    //check horizontal ship rotation to vertical would not extend grid border
    if (shipHeadRow + (shipLength - 1) > 9) {
      //rotation not allowed
      alert(
        "Cannot Rotate Ship Vertically. Please move ship UP by at least " +
          (returnShipLength(shipName) - 1) +
          " blocks first"
      );
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

  //--------------------------------------------------------------------------------------------
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

/*______________________________________________________________________________
//Move Ship Upwards
//______________________________________________________________________________
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

/*______________________________________________________________________________
//Move Ship Downwards
//______________________________________________________________________________
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

/*______________________________________________________________________________
//Move Ship Left
//______________________________________________________________________________
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

/*______________________________________________________________________________
//Move Ship Right
//______________________________________________________________________________
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

/*###############################################################################
ROTATE AND MOVE SHIP HELPER FUNCTIONS
#################################################################################
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
    //error occurs if:
    //i) Ship is Horizontal and in bottom row
    //ii) Ship is Vertical and is in last column
    if (shipHeadRow == 9) {
      return false; //Ship is horizontal in last row
    } else {
      return true; //Ship is vetical in last column
    }
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
  if (shipName == "playerCarrier") {
    return 5;
  } else if (shipName == "playerBattleship") {
    return 4;
  } else if (shipName == "playerCruiser" || shipName == "playerSubmarine") {
    return 3;
  } else {
    return 2; //Destoyer
  }
}

/*###############################################################################
BOARD EFFECTS FOR MOVEMENT OF CURSOR
#################################################################################
*/

//Highlights grid block Border hovered over by mouse green
document.querySelectorAll(".playerGridElement").forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.setAttribute("style", "border: 4px solid green");
  });
});

//Set grid block border back to original color when mouse leaves
document.querySelectorAll(".playerGridElement").forEach((element) => {
  element.addEventListener("mouseout", () => {
    element.setAttribute("style", "border: 1px solid white");
  });
});

/*###############################################################################
TESTING FUNCTIONS FOR LAB MARKER
#################################################################################
*/

//Display All Grid Blocks Data
//Shows all object info each grid block
function displayGridBlocksData() {
  for (let i = 0; i < 10; i++) {
    console.log(...playerGridArray[i]);
  }
}

//Display All Grid Blocks - Summary
//Creates a second 2D containing H, X or .
// KEY: H = Block holds Head of a Ship
//      X = Block contains a Ship (not head)
//      . = Empty Block
function displayGridBlocks() {
  //Create 2D Display Array
  let displayArray = new Array(10);
  for (let i = 0; i < 10; i++) {
    displayArray[i] = new Array(10);
  }

  //Populate display Array with H, X or .
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (playerGridArray[i][j].shipHead == true) {
        displayArray[i][j] = "H";
      } else if (playerGridArray[i][j].containsShip != "none") {
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
