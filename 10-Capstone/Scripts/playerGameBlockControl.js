//variable holding boolean if player is ready to start game
let startGame=false;

//variable holding boolean if player or computer has won the game
let gameOver = false;

//variable holding boolean to enable and disable player firing on enemy grid
//used to prevent player from selecting two blocks at once
let allowPlayerFire = true;

//variable to ensure all enemy ships have been placed before player can press startButton
//set to true after last ship (enemyDestroyer) is placed
let enemyShipsReady = false;

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

//class blueprint for each gird block in Enemy Brain Grid
//grid computer (enemy) player uses and adds to during its turn
/*FIELDS:
    playerBlockElement - Block element linked to in player board grid
    row - row of block element
    column - column of block element
    firedOn - if this block has been firedOn yet or not by enemy player
    containsShip - name of player ship in block (or 'none' if there is no ship)\
    shipDestroyed - if ship contained within this block has been completely destroyed
*/

class brainBlockElement{
  constructor(playerBlockElement, row, column, firedOn, containsShip, shipDestroyed){
    this.playerBlockElement = playerBlockElement;
    this.row = row;
    this.column = column;
    this.firedOn=firedOn;
    this.containsShip = containsShip;
    this.shipDestroyed=shipDestroyed;
  }
}


/*################################################################################################
PLAYER AND ENEMY OBJECTS
#################################################################################################
*/

//Player Object
let player ={
  //variables to determine how many successful hits for each ship     
  playerCarrierHitCount:0,
  playerBattleshipHitCount:0,
  playerCruiserHitCount:0,
  playerSubmarineHitCount:0,
  playerDestroyerHitCount:0
}

//Enemy Object
let enemy ={
  //variables to determine how many successful hits for each ship 
  enemyCarrierHitCount:0,
  enemyBattleshipHitCount:0,
  enemyCruiserHitCount:0,
  enemySubmarineHitCount:0,
  enemyDestroyerHitCount:0
}

/*################################################################################################
PLAYER, ENEMY AND ENEMY BRAIN GRIDS - CREATION
#################################################################################################
*/
//Array of all gridBlocks for Player and Enemy (Computer Player)
//Create a 2-D array for each consisiting of 100 grid blocks in total (10 x 10)

let playerGridArray = new Array(10);
let enemyGridArray = new Array(10);
let enemyBrainGrid = new Array(10);

//initialize GameBoard
function initializeGame() {
  //create 2D Arrays
  for (let i = 0; i < 10; i++) {
    playerGridArray[i] = new Array(10);
    enemyGridArray[i] = new Array(10);
    enemyBrainGrid[i] = new Array(10);
  }

  //initialize each block in player and enemy Arrays as:
  /* id = element of each block in HTML Page
  Row and Column Counts ranging from 0 - 9
  ContainsShip = "none" and shipHead = false
  firedOn = false;

  Initialize each block in enemyBrainArray as:
  playerBlockElement = link to corresponding block in player grid
  row = row count of block
  column = column count of block
  firedOn = false;
  containsShip="none";
  shipDestroyed = false;
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
      enemyBrainGrid[i][j]=new brainBlockElement(
        playerGridArray[i][j],
        i,
        j,
        false,
        "none",
        false
      )
    }
  }
  //function to place player ships in default positions
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

//check if user clicks on a ship to rotate or move ship position
document.querySelectorAll(".ship").forEach((element) => {
    //here element is the ship in the HTML page, not in the grid
  element.addEventListener("mousedown", ()=>{
    if(!startGame){
      shipName = element.id;
      currentSelectedShip.textContent= showCurrentShipName(element);
      //only allows player to rotate or move a ship if they select one first on page load
      allowRotationButton = true;
      allowMovement = true;

      //remove selection color from previous ships
      resetShipColor();
      //color currently selected ship
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
ENEMY SHIP SETUP
#################################################################################
*/

//_______________________________________________________________________________________
// Functions to randomly set positions of enemy ships
//_______________________________________________________________________________________

/*Function to determine 'random' position for enemy ships
  Uses a random number generator to determine row and column number and decide if 
  ship should be vertical or horizontal
  Performs checks to see if this would result in ship exceeding any borders or
  being placed on top of another ship
*/
function determineEnemyShipPosition(shipName){
  
  
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
          //terminate while loops
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
  determineEnemyShipPosition("enemyCarrier");
  //Set Position of Battleship
  determineEnemyShipPosition("enemyBattleship");
  //Set Position of Cruiser
  determineEnemyShipPosition("enemyCruiser");
  //Set Position of Submarine
  determineEnemyShipPosition("enemySubmarine");
  //Set Position of Destroyer
  determineEnemyShipPosition("enemyDestroyer");

  //after last enemy ship has been successfully placed, allow player
  //to press StartGameButton
  enemyShipsReady=true;
}

/*###############################################################################
GAMEPLAY
#################################################################################
*/

//_______________________________________________________________________________________
// Event Listeners for Start Game Button
//_______________________________________________________________________________________

//Event listener when start button is hovered over
let startGameButton = document.getElementById("startGameButton");
startGameButton.addEventListener("mouseover",()=>{
  startGameButton.setAttribute("style"," box-shadow: -1px 1px 5px 2px rgba(255, 255, 255, 0.8)")
})

//Event listener when mouse leaves start button
startGameButton.addEventListener("mouseout",()=>{
  startGameButton.setAttribute("style","box-shadow: -1px 1px 5px 5px rgba(5, 4, 4, 0.8)")
})

//Event Listener if player presses startGameButton
//confirm enemy ships have been placed
//set div holding player setup buttons to hidden and show gameplay div
startGameButton.addEventListener("mousedown",()=>{
  if(enemyShipsReady){
    //styling to make start button look 'clicked'
    startGameButton.setAttribute("style","box-shadow: none")
    startGameButton.style.marginTop="-1.1rem";
    startGameButton.style.marginLeft="1.9rem";
    //reset player ship colors
    resetShipColor();

    //set enemy grid blocks to default color of black
    document.querySelectorAll(".enemyGridElement").forEach((element)=>{
      element.style.backgroundColor="black";
      element.style.opacity=1;
      element.style.cursor="crosshair";
    });
    
    //turn on display of enemy ship data
    document.getElementById("enemyShipData").style.display="block";

    //set boarder around player area to normal color
    document.getElementById("playerBoardArea").style.border="0.3rem ridge rgb(144, 141, 139)";

    
    //hide div containing rotate button, move buttons, startGameButton and currentSelectedShip
    document.getElementById("playerButtonsAndDisplayDiv").style.display = "none";
    //display div containing player weapons state and ship info
    document.getElementById("playerGameInfoDisplayDiv").style.display="block";

    //display start game div and then remove after 2.5 seconds
    document.getElementById("startGameTemporaryDiv").style.display="block";
    setTimeout(()=>{
      document.getElementById("startGameTemporaryDiv").style.display="none";
    }, 2500);

    //allow player to select and fire on enemy grid blocks
    startGame = true;

    //show div containing player in-gameInfo
    // FILL ME IN!!!!!!!!!
    //######################################################
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  }else{
    alert("Enemy Ships are being placed");
  }
});


//_______________________________________________________________________________________
// Event Listeners for Mouse Hover and mouseout over enemy grid blocks
//_______________________________________________________________________________________
//Highlights grid block Border hovered over by mouse green
document.querySelectorAll(".enemyGridElement").forEach((element) => {
  element.addEventListener("mouseover", () => {
    //element is the block in the HTML page, not in the enemy Grid

    //player can only interact with grid (see changes) if game has been started
    if(startGame){
      //get row and column count from HTML id
      let rowCount = retrieveRowCountOfSelectedBlock(element);
      let columnCount = retrieveColumnCountOfSelectedBlock(element);

      if(enemyGridArray[rowCount][columnCount].firedOn==true){
        element.style.border="4px solid red";
      }else{
        element.style.border="4px solid green";
      }
    }
  });
});

//Set grid block border back to original color when mouse leaves
document.querySelectorAll(".enemyGridElement").forEach((element) => {
  element.addEventListener("mouseout", () => {
    //player can only interact with grid (see changes) if game has been started
    if(startGame){
      element.style.border="1px solid white";
    }
  });
});

//HELPER FUNCTION
//Retrieve Row Count of Element selected on Enemy Board
function retrieveRowCountOfSelectedBlock(element){
  return element.id.slice(1,-1);
}

//HELPER FUNCTION
//Retrieve Column Count of Element selected on Enemy Board
function retrieveColumnCountOfSelectedBlock(element){
  return element.id.charAt(element.id.length-1);
}

//_______________________________________________________________________________________
// Event Listeners for player fire on enemy grid block (mousedown)
//_______________________________________________________________________________________

document.querySelectorAll(".enemyGridElement").forEach((element) => {
  element.addEventListener("mousedown", () => {
    //player can only interact with grid (see changes) if game has been started
    if(startGame && allowPlayerFire){ //ensure player can only select one block at a time
      fireOnEnemy(element);
    }
  });
});

//Player Fire Function
//Allows player to select a block on enemy grid to fire on
//param: HTML grid Block that has been selected (mousedown)
function fireOnEnemy(element){
  //find row and column count of selected block for enemyGridArray
  let rowCount = retrieveRowCountOfSelectedBlock(element);
  let columnCount = retrieveColumnCountOfSelectedBlock(element);

  //variable assigned to selected grid Block in enemyGridArray
  let selectedgridBlock = enemyGridArray[rowCount][columnCount];
  
  //check if element has already been fired on. If so do nothing
  if(selectedgridBlock.firedOn==false){
    //check if element does not contain a ship
    if(selectedgridBlock.containsShip=="none"){
      //if grid block has no ship, set background color to transparent;
      fadeBlockOut(element, "transparent", true);
    }else{
      //block contains a ship - successful hit

      //set background color of block to red
      fadeBlockOut(element, "red", true);
      //call function to manage ship damage and check if player has won
      addDamageToEnemyShipAndCheckForPlayerWin(selectedgridBlock);
    }

    //set firedOn to true for this grid block
    selectedgridBlock.firedOn=true;
  }
}

//function to add damage to ship and check if player has won game
function addDamageToEnemyShipAndCheckForPlayerWin(element){

   //get name of ship
   let shipName = element.containsShip;

   //check if ship has now sustained maximum damage according to ship type
   let checkforPlayerWin=checkForMaxShipDamage(shipName);

   //if ship has sustained maximum damage, check if player has won game
   //check if all enemy ships have sustained respective max damage
   if(checkforPlayerWin){
    if(enemy.enemyCarrierHitCount==5 &&
        enemy.enemyBattleshipHitCount==4 &&
        enemy.enemyCruiserHitCount==3 &&
        enemy.enemySubmarineHitCount==3 &&
        enemy.enemyDestroyerHitCount==2){
        console.log("PLAYER HAS WON");
        gameOver=true;
        //disable weapon style for player
        document.getElementById("playerWeaponsState").style.color="white";
        document.getElementById("playerWeaponsState").style.backgroundColor="rgb(74, 71, 71)";
        document.getElementById("playerWeaponsState").textContent="DISABLED";

      }
    }

}

//add ship hit to damage level for ship and check if ship has sustained
//maximum damage for either a player or enemy ship
//returns true if selected ship is at max damage level and false if not
function checkForMaxShipDamage(shipName){
 
  //retrieve current ship damage level
  switch(shipName){
    //ENEMY SHIPS
    case "enemyCarrier":
      //carrier can sustain 5 hits
      if(enemy.enemyCarrierHitCount<5){
        enemy.enemyCarrierHitCount++;
        //return true to check for player win if enemy carrier is at max damage
        if(enemy.enemyCarrierHitCount==5){
          //change status of Carrier ship to destroyed
          document.getElementById("enemyCarrierData").textContent = "Carrier: LOST";
          document.getElementById("enemyCarrierData").style.backgroundColor = "red";
         return true;
        }
      }
      return false;
      
    case "enemyBattleship":
      //battleship can sustain 4 hits
      if(enemy.enemyBattleshipHitCount<4){
        enemy.enemyBattleshipHitCount++;
        //return true to check for player win if enemy battleship is at max damage
        if(enemy.enemyBattleshipHitCount==4){
          //change status of Battleship ship to destroyed
          document.getElementById("enemyBattleshipData").textContent = "Battleship: LOST";
          document.getElementById("enemyBattleshipData").style.backgroundColor = "red";
          return true;
        }
      }
      return false;
      
    case "enemyCruiser":
       //cruiser can sustain 3 hits 
      if(enemy.enemyCruiserHitCount<3){
        enemy.enemyCruiserHitCount++;
        //return true to check for player win if enemy cruiser is at max damage
        if(enemy.enemyCruiserHitCount==3){
           //change status of Cruiser ship to destroyed
           document.getElementById("enemyCruiserData").textContent = "Cruiser: LOST";
           document.getElementById("enemyCruiserData").style.backgroundColor = "red";
          return true;
        }
      }
      return false;
      
    case "enemySubmarine":
       //submarine can sustain 3 hits
        if(enemy.enemySubmarineHitCount<3){
          enemy.enemySubmarineHitCount++;
          //return true to check for player win if enemy submarine is at max damage
          if(enemy.enemySubmarineHitCount==3){
            //change status of Submarine ship to destroyed
           document.getElementById("enemySubmarineData").textContent = "Submarine: LOST";
           document.getElementById("enemySubmarineData").style.backgroundColor = "red";
            return true;
          }
        }
        return false;
        
    case "enemyDestroyer":
        //destoyer can sustain 2 hits
        if(enemy.enemyDestroyerHitCount<2){
          enemy.enemyDestroyerHitCount++;
          //return true to check for player win if enemy destroyer is at max damage
          if(enemy.enemyDestroyerHitCount==2){
            //change status of Destroyer ship to destroyed
           document.getElementById("enemyDestoyerData").textContent = "Destroyer: LOST";
           document.getElementById("enemyDestoyerData").style.backgroundColor = "red";
            return true;
          }
        }
        return false;
        
    //PLAYER SHIPS
    case "playerCarrier":
        //carrier can sustain 5 hits
        if(player.playerCarrierHitCount<5){
          player.playerCarrierHitCount++;
          //return true to check for enemy win if player carrier is at max damage
          if(player.playerCarrierHitCount==5){
            //change status of carrier ship to destroyed
            document.getElementById("playerCarrierData").textContent = "Carrier: LOST";
            document.getElementById("playerCarrierData").style.backgroundColor = "red";
            return true;
          }
        }
        return false;

    case "playerBattleship":
        //Battleship can sustain 4 hits
        if(player.playerBattleshipHitCount<4){
          player.playerBattleshipHitCount++;
          //return true to check for enemy win if player battleship is at max damage
          if(player.playerBattleshipHitCount==4){
            //change status of Battleship ship to destroyed
            document.getElementById("playerBattleshipData").textContent = "Battleship: LOST";
            document.getElementById("playerBattleshipData").style.backgroundColor = "red";
            return true;
          }
        }
        return false;
        
    case "playerCruiser":
        //Cruiser can sustain 3 hits
        if(player.playerCruiserHitCount<3){
          player.playerCruiserHitCount++;
          //return true to check for enemy win if player cruiser is at max damage
          if(player.playerCruiserHitCount==3){
             //change status of Cruiser ship to destroyed
             document.getElementById("playerCruiserData").textContent = "Cruiser: LOST";
             document.getElementById("playerCruiserData").style.backgroundColor = "red";
            return true;
          }
        }
        return false;
        
    case "playerSubmarine":
        //Submarine can sustain 3 hits
        if(player.playerSubmarineHitCount<3){
          player.playerSubmarineHitCount++;
          //return true to check for enemy win if player Submarine is at max damage
          if(player.playerSubmarineHitCount==3){
            //change status of Submarine ship to destroyed
            document.getElementById("playerSubmarineData").textContent = "Submarine: LOST";
            document.getElementById("playerSubmarineData").style.backgroundColor = "red";
            return true;
          }
        }
        return false;
        
    case "playerDestroyer":
        //Destroyer can sustain 2 hits
        if(player.playerDestroyerHitCount<2){
          player.playerDestroyerHitCount++;
          //return true to check for enemy win if player Destroyer is at max damage
          if(player.playerDestroyerHitCount==2){
            //change status of Destroyer ship to destroyed
            document.getElementById("playerDestoyerData").textContent = "Destroyer: LOST";
            document.getElementById("playerDestoyerData").style.backgroundColor = "red";
            return true;
          }
        }   
        return false;
  }
}

//Function to add fade out of selected block
function fadeBlockOut(element, desiredColor, player){
  //disable player ability to fire
  allowPlayerFire=false;

  //if it is players turn, set weapons system color to fire
  if(player){
    document.getElementById("playerWeaponsState").style.color="black";
    document.getElementById("playerWeaponsState").style.backgroundColor="red";
    document.getElementById("playerWeaponsState").textContent="FIRING";
  }

  //initially set background color of fired at block to white
  element.style.backgroundColor="white";

  //fade out
  let fadeEffect = setInterval(function () {
      if (!element.style.opacity) {
          element.style.opacity = 1;
      }
      if (element.style.opacity > 0.1) {
          element.style.opacity -= 0.1;
      } else {
          clearInterval(fadeEffect);       
          element.style.opacity=1;
          element.style.backgroundColor=desiredColor;
          //if it was player's turn, call function to start enemy turn
          if(player && gameOver==false){
            setTimeout(()=>{
              //delay time between completion of player turn and start of enemy turn
              determineEnemyFireControlFunction();
              //Set player weapons style state to "DISABLED" - enemy turn
              document.getElementById("playerWeaponsState").style.color="white";
              document.getElementById("playerWeaponsState").style.backgroundColor="rgb(74, 71, 71)";
              document.getElementById("playerWeaponsState").textContent="DISABLED";
            }, 800);
              
          }else{
          //re-enable player ability to fire if it was currently enemy turn
            if(!gameOver){
              allowPlayerFire=true;
              //Set player weapons style state to "ARMED" - now player's turn
              document.getElementById("playerWeaponsState").style.color="black";
              document.getElementById("playerWeaponsState").style.backgroundColor="yellow";
              document.getElementById("playerWeaponsState").textContent="ARMED";
            }
          }
      }
  }, 100);
}



//_______________________________________________________________________________________
// Enemy (Computer) Player Functions to fire on Player Grid
//_______________________________________________________________________________________

//ENEMY (computer player) uses enemyBrainGrid to track progress of firing at player ships
//This Grid is not connected to the enemy board grid,but is connected to the player grid for  
//the purposes of retrieving the current ship name of a grid block. Enemy player does not 
//use player grid to guide or predict any turns for enemy in order to keep game fair

//array used to track names of ships found that are not yet destroyed
//will contain subarrays of currently found ship - shipName, row, column, shipOrientation
let playerShipsFound =[];
//Control Function determining blocks enemy will fire at on player grid
function determineEnemyFireControlFunction(){


  //first check if a player ship has not been found
  if(playerShipsFound.length==0){
    //no player ships have been fouund and thus a random block on player
    //grid will be chosen

    //loop through random enemy brain grid blocks until one is found that has not been 
    //fired at yet
    let breakLoop = false;
    let currentSelectedPlayerGridBlock;
    while(!breakLoop){
      let row = Math.floor(Math.random()*10);
      let column = Math.floor(Math.random()*10);
      currentSelectedPlayerGridBlock = enemyBrainGrid[row][column];
      if(currentSelectedPlayerGridBlock.firedOn==false){
        //if block has been found that has not been fired at yet
        //mark firedOn as true
        currentSelectedPlayerGridBlock.firedOn=true;
        //terminate loop
        breakLoop=true;
      }
    }
    showVisualEffectOfFireAndAddShipDamage(currentSelectedPlayerGridBlock);

  }else{
    //At this point at least one player ship has been found
    //enemy player will always work on destroying first ship in playerShipsFoundArray

    //CASE 1 - Orientation of ship is not known
    if(playerShipsFound[0][3]=="unknown"){

      let currentGridBlock=enemyBrainGrid[playerShipsFound[0][0]][playerShipsFound[0][1]];

      //array holding possible directions of fire
      let arrayOfFireDirections=[];

      //Check if fire above is possible
      if(currentGridBlock.row>0){
        //check if block above has been fired at
        if(enemyBrainGrid[playerShipsFound[0][0]-1][playerShipsFound[0][1]].firedOn==false){
          //add possibility to fire above
          arrayOfFireDirections.push("up");
        }
      }
      //Check if fire below is possible
      if(currentGridBlock.row<9){
        //check if block below has been fired at
        if(enemyBrainGrid[playerShipsFound[0][0]+1][playerShipsFound[0][1]].firedOn==false){
          //add possibility to fire below
          arrayOfFireDirections.push("down");
        }
      }

      //Check if fire to the left is possible
      if(currentGridBlock.column>0){
        //check if block to the left has been fired at
        if(enemyBrainGrid[playerShipsFound[0][0]][playerShipsFound[0][1]-1].firedOn==false){
          //add possibility to fire to the left
          arrayOfFireDirections.push("left");
        }
      }

      //Check if fire to the right is possible
      if(currentGridBlock.column<9){
        //check if block to the left has been fired at
        if(enemyBrainGrid[playerShipsFound[0][0]][playerShipsFound[0][1]+1].firedOn==false){
          //add possibility to fire to the right
          arrayOfFireDirections.push("right");
        }
      }

      //Randomly decide which block from arrayOfFireDirections to fire at
      let optionIndexNumber = Math.floor(Math.random()*arrayOfFireDirections.length);
      //variable holding direction of fire
      let directionOfFire = arrayOfFireDirections[optionIndexNumber];
      //variable holding name of possible ship found from player grid block fired on
      let foundShipName;

      if(arrayOfFireDirections[optionIndexNumber]=="left" ||
          arrayOfFireDirections[optionIndexNumber]=="right"){
            foundShipName=horizontalFire(arrayOfFireDirections[optionIndexNumber],currentGridBlock);
            
      }else{
        foundShipName=verticalFire(arrayOfFireDirections[optionIndexNumber],currentGridBlock);
      }

      //Check if Ship Orientation is now known
      //NOTE: If a different ship has been found its details are added to playerShipsFound
      //array by showVisualEffectOfFire()
      //check if block that was fired at contains a ship with the same name as the 
      //one currently being attacked (first in playerShipsFound Array)
      if(foundShipName!="playerDestroyer"){ 
      //Destoyer ship is destroyed whilst determining its orientation
        if(foundShipName == playerShipsFound[0][2]){
          //Check if Orientation is horizontal
          if(directionOfFire=="left" || directionOfFire=="right"){
            playerShipsFound[0][3]="horizontal";
          }else{
            //If not Horizontal, Orientation must be vertical
            playerShipsFound[0][3]="vertical";
          }
        }
      }

    //CASE 2 - Ship Orientation is Horizontal
    }else if(playerShipsFound[0][3]=="horizontal"){

      //row and column of first hit ship block
      let shiprow = playerShipsFound[0][0];
      let shipcolumn = playerShipsFound[0][1];

      //row and Column of desired block to fire at
      let loopRow = shiprow;
      let loopColumn = shipcolumn;

      //variable allowing check to the left of current block whilst looping
      let checkLeft = true;

       //hold current name of ship
       let currentShipName = playerShipsFound[0][2];

      //variable to control looping until ship block not yet fired at is found
      let breakLoop = false;
      while(!breakLoop){
        //Obvious Checks First
        //---------------------------
        //i) If first hit ship block is on the leftmost column, then rest of ship
        //can only be to the right, keep firing right until ship is destroyed
        if(shipcolumn==0){
          if (enemyBrainGrid[loopRow][loopColumn].firedOn==false){
               //At this point column will equal the correct block to fire at
              //horizontal fire adds one to the column
              horizontalFire("right", enemyBrainGrid[loopRow][loopColumn-1]);
              breakLoop=true;
          }else{
            //current block has been fired at, increment column count
            loopColumn++;
          }
        //ii) If first hit ship block is on the rightmost column, then rest of ship
        //can only be to the left, keep firing left until ship is destroyed
        }else if(shipcolumn==9){
          if (enemyBrainGrid[loopRow][loopColumn].firedOn==false){
            breakLoop=true;
             //At this point column will equal the correct block to fire at
              //horizontal fire subtracts one from the column
              horizontalFire("left", enemyBrainGrid[loopRow][loopColumn+1]);    
              breakLoop;      
          }else{
            //current block has been fired at, decrement column count
            loopColumn--;
          }
        }else{
          //First Block was not on the leftmost or rightmost columns
          //----------------------------------------------------------

          //i) Check Left of Current Block First
          //FIRE TO THE LEFT
          if(checkLeft){
            //ensure that block checked is within bounds of grid
            if(loopColumn>0){
              if(currentShipName==enemyBrainGrid[loopRow][loopColumn].containsShip){
              
                //check if block to the left of first fired block has been checked
                if(enemyBrainGrid[loopRow][loopColumn-1].firedOn==false){
               
                  //fire to the left of the block
                  let foundShipName = horizontalFire("left", enemyBrainGrid[loopRow][loopColumn]);
                  breakLoop=true;

                  //check if block contained a different ship or no ship at all
                  //if so, stop checking Left
                  if(foundShipName!=currentShipName){
                    checkLeft==false;
                  }
                }else{
                  //block to the left has been fired at, but keep looping
                  //to check if more of the ship to the left has not been fired at
                  loopColumn--;
                }
              }else{
                checkLeft=false;
              }
            }else{
              checkLeft=false;
            }

          //ii) All blocks to left have been fired at, contain a different ship, contain
          //no ship or reach end of grid to the left  
          //FIRE TO THE RIGHT
          }else{
              //check if block to the right of first fired block has been checked
              if(enemyBrainGrid[loopRow][loopColumn+1].firedOn==false){
                //fire to the left of the block
                let foundShipName = horizontalFire("right", enemyBrainGrid[loopRow][loopColumn]);
                breakLoop=true;
              }else{
                //block to the right has been fired at, but keep looping
                //to check if more of the ship to the right has not been fired at
                loopColumn++;
              }
          }
        }
      }

    //CASE 3 - Ship Orientation is Vertical
    }else if(playerShipsFound[0][3]=="vertical"){
      
      //row and column of first hit ship block
      let shiprow = playerShipsFound[0][0];
      let shipcolumn = playerShipsFound[0][1];

      //row and Column of desired block to fire at
      let loopRow = shiprow;
      let loopColumn = shipcolumn;

      //variable allowing check to the left of current block whilst looping
      let checkAbove = true;

       //hold current name of ship
       let currentShipName = playerShipsFound[0][2];

      //variable to control looping until ship block not yet fired at is found
      let breakLoop = false;
      while(!breakLoop){
        //Obvious Checks First
        //---------------------------
        //i) If first hit ship block is on the top row, then rest of ship
        //can only be below, keep firing below until ship is destroyed
        if(shiprow==0){
          if (enemyBrainGrid[loopRow][loopColumn].firedOn==false){
               //At this point column will equal the correct block to fire at
              //horizontal fire adds one to the column
              verticalFire("down", enemyBrainGrid[loopRow-1][loopColumn]);
              breakLoop=true;
          }else{
            //current block has been fired at, increment row count
            loopRow++;
          }
        //ii) If first hit ship block is on the bottom row, then rest of ship
        //can only be above, keep firing up until ship is destroyed
        }else if(shiprow==9){
          if (enemyBrainGrid[loopRow][loopColumn].firedOn==false){
            breakLoop=true;
             //At this point column will equal the correct block to fire at
              //horizontal fire subtracts one from the column
              verticalFire("up", enemyBrainGrid[loopRow+1][loopColumn]);    
              breakLoop;      
          }else{
            //current block has been fired at, decrement row count
            loopRow--;
          }
        }else{
          //First Block was not on the top or bottom rows
          //----------------------------------------------------------

          //i) Check above Current Block First
          //FIRE ABOVE
          if(checkAbove){
            //ensure that block checked is within bounds of grid
            if(loopRow>0){
              if(currentShipName==enemyBrainGrid[loopRow][loopColumn].containsShip){
              
                //check if block above first fired block has been checked
                if(enemyBrainGrid[loopRow-1][loopColumn].firedOn==false){
               
                  //fire above the block
                  let foundShipName = verticalFire("up", enemyBrainGrid[loopRow][loopColumn]);
                  breakLoop=true;

                  //check if block contained a different ship or no ship at all
                  //if so, stop checking above
                  if(foundShipName!=currentShipName){
                    checkAbove==false;
                  }
                }else{
                  //block above has been fired at, but keep looping
                  //to check if more of the ship above has not been fired at
                  loopRow--;
                }
              }else{
                checkAbove=false;
              }
            }else{
              checkAbove=false;
            }

          //ii) All blocks above have been fired at, contain a different ship, contain
          //no ship or reach end of grid above 
          //FIRE below
          }else{
              //check if block below first fired block has been checked
              if(enemyBrainGrid[loopRow+1][loopColumn].firedOn==false){
                //fire below block
                let foundShipName = verticalFire("down", enemyBrainGrid[loopRow][loopColumn]);
                breakLoop=true;
              }else{
                //block below has been fired at, but keep looping
                //to check if more of the ship below has not been fired at
                loopRow++;
              }
          }
        }
      }

    }
  }
}

//Function used to fire to either the left or right of a selected block
//return name of ship found or "none" if no ship has been found
function horizontalFire(direction, currentSelectedPlayerGridBlock){
  let fireBlock;
  if(direction=="left"){
    //fire to the left of the current grid block
    fireBlock = enemyBrainGrid[currentSelectedPlayerGridBlock.row][currentSelectedPlayerGridBlock.column-1];
    
  }else{
    //fire to the right of current grid block
    fireBlock=enemyBrainGrid[currentSelectedPlayerGridBlock.row][currentSelectedPlayerGridBlock.column+1];
  }
  fireBlock.firedOn=true;
  showVisualEffectOfFireAndAddShipDamage(fireBlock);
  if(fireBlock.containsShip!="none"){
    return fireBlock.containsShip;
  }else{
    return "none"
  }
}

//Function used to fire to either above or below of a selected block
//return name of ship found or "none" if no ship has been found
function verticalFire(direction, currentSelectedPlayerGridBlock){
  let fireBlock;
  if(direction=="up"){
    //fire above current grid block
    fireBlock = enemyBrainGrid[currentSelectedPlayerGridBlock.row-1][currentSelectedPlayerGridBlock.column];
    
  }else{
    //fire below current grid block
    fireBlock=enemyBrainGrid[currentSelectedPlayerGridBlock.row+1][currentSelectedPlayerGridBlock.column];
  }
  fireBlock.firedOn=true;
  showVisualEffectOfFireAndAddShipDamage(fireBlock);
  if(fireBlock.containsShip!="none"){
    return fireBlock.containsShip;
  }else{
    return "none"
  }
}

//HELPER FUNCTION
//change background color of block on player grid 
//add found ship to foundShipsArray(if not already in array)
function showVisualEffectOfFireAndAddShipDamage(currentSelectedPlayerGridBlock){
  //show fired block on player HTML Grid and update playershipsFound Array
  if(currentSelectedPlayerGridBlock.playerBlockElement.containsShip=="none"){
    //no ship found, set block background to green
    fadeBlockOut(currentSelectedPlayerGridBlock.playerBlockElement.id, "green", false);
    //currentSelectedPlayerGridBlock.playerBlockElement.id.style.backgroundColor="green";
  }else{
    //if block did contain a ship, make background red
    fadeBlockOut(currentSelectedPlayerGridBlock.playerBlockElement.id, "red", false);
    //currentSelectedPlayerGridBlock.playerBlockElement.id.style.backgroundColor="red";
    //add name of ship to brain block element
    currentSelectedPlayerGridBlock.containsShip=currentSelectedPlayerGridBlock.playerBlockElement.containsShip;

    //check if array already contains name, if not then add 
    //shipName to back of array
      if(playerShipsFound.length==0){
        playerShipsFound.push([currentSelectedPlayerGridBlock.row, 
          currentSelectedPlayerGridBlock.column, 
          currentSelectedPlayerGridBlock.containsShip,
        "unknown"]);
      }else{
        let containsShip=false;
        for(let i=0;i<playerShipsFound.length;i++){
          if(playerShipsFound[i][2]==currentSelectedPlayerGridBlock.playerBlockElement.containsShip){
            containsShip=true;
          }
        }
        if(!containsShip){
          playerShipsFound.push([currentSelectedPlayerGridBlock.row, 
            currentSelectedPlayerGridBlock.column, 
            currentSelectedPlayerGridBlock.containsShip,
          "unknown"]);
        }
      }

      //Add Damage to found player Ship and Check if Enemy has won the game
      addDamageToPlayerShipAndCheckForEnemyWin(currentSelectedPlayerGridBlock);

  }
}

//Function to add damage to a player ship and check if enemy player has won the game
function addDamageToPlayerShipAndCheckForEnemyWin(element){

  //get name of ship
  let shipName = element.containsShip;
  //check if ship has now sustained maximum damage according to ship type
  let checkforEnemyWin=checkForMaxShipDamage(shipName);

  //if ship has sustained maximum damage, check if enemy has won game
  //check if all player ships have sustained respective max damage
  if(checkforEnemyWin){
     //if ship is at max damage level (destroyed), remove ship from
        //playerShipsFoundArray - will always be the first ship in array
        playerShipsFound.shift();
   if(player.playerCarrierHitCount==5 &&
       player.playerBattleshipHitCount==4 &&
       player.playerCruiserHitCount==3 &&
       player.playerSubmarineHitCount==3 &&
       player.playerDestroyerHitCount==2){
       console.log("ENEMY HAS WON");
       gameOver=true;

      
    }
  }

  
}


/*###############################################################################
TESTING FUNCTIONS FOR LAB MARKER - use in Dev Console
#################################################################################
*/

//--------------------------------------------------------
//Player Grid Data
//-------------------------------------------------------

//Display All Player Grid Blocks Data in Console
//Shows all object info for each grid block
function displayPlayerGridBlocksData() {
  for (let i = 0; i < 10; i++) {
    console.log(...playerGridArray[i]);
  }
}

//Display All Player Grid Blocks Summary in Console
function displayPlayerGridBlocksSummary(){
  console.log("PLAYER CURRENT GRID");
  displayGridBlocksSummary(playerGridArray);
}

//--------------------------------------------------------
//Enemy Grid Data
//-------------------------------------------------------

//Display All Enemy Grid Blocks Summary in Console
function displayEnemyGridBlocksSummary(){
  console.log("ENEMY CURRENT GRID");
  displayGridBlocksSummary(enemyGridArray);
}

//Show Enemy Ships on Grid
//Changes background-color of enemy ships with different colors
//for each ship. Does NOT update live
function showEnemyShips(){
  console.log("Quick Reference Function - No live update");
  console.log("KEY:");
  console.log("Carrier: Green");
  console.log("Battleship: Orange");
  console.log("Submarine: Yellow");
  console.log("Cruiser: Blue");
  console.log("Destroyer: White");
  for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
      let ship=enemyGridArray[i][j];
      if(ship.containsShip!="none"){
        switch(ship.containsShip){
          case "enemyCarrier":
            document.getElementById("e"+i+j).style.backgroundColor="green";
            break;
          case "enemyBattleship":
            document.getElementById("e"+i+j).style.backgroundColor="orange";
            break;
          case "enemySubmarine":
            document.getElementById("e"+i+j).style.backgroundColor="yellow";
            break;
          case "enemyCruiser":
            document.getElementById("e"+i+j).style.backgroundColor="blue";
            break;
          case "enemyDestroyer":
            document.getElementById("e"+i+j).style.backgroundColor="white";
            break;

        }
      }
    }
  }
}

//--------------------------------------------------------
//Helper Functions
//-------------------------------------------------------
//HERLPER FUNCTION
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




