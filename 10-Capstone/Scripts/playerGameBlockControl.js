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
let currentShip="none"

//check if user clicks on a ship to rotate or move ship position
document.querySelectorAll(".ship").forEach((element) => {
  element.addEventListener("mousedown", () => {
    
    shipName = element.id;
    currentShip = shipName;
    //only allows player to rotate or move a ship if they select one first on page load
    allowRotationButton = true;
    allowMovement = true;

  
    if(previousShip!=currentShip){
      resetShipColor();
      element.style.backgroundColor = "blue";
    }
  });
});

//ROTATE SHIP
//_______________________________________________________________________
//event listener if user wants to rotate a selected ship
//if multiple ships are selected, only the last one will be rotated
document.getElementById("rotatebutton").addEventListener("mousedown", function () {
    if (allowRotationButton) {
      rotateShip(shipName);
    } else {
      alert("Please Select a Ship to Rotate");
    }
  });


//MOVE SHIP
//_______________________________________________________________________

// 1) UPWARDS - event listener if user wants to move a selected ship 
//if multiple ships are selected, only the last one will be moved
document.getElementById("moveShipUpButton").addEventListener("mousedown", function(){
  if(allowMovement){
    moveShipUp(shipName);
  } else {
    alert("Please Select a Ship to Move Upwards");
  }
})


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
      alert("Cannot Rotate Ship Horizontally. Please move ship LEFT first");
      return;
    }
  } else {
    //check horizontal ship rotation to vertical would not extend grid border
    if (shipHeadRow + (shipLength - 1) > 9) {
      //rotation not allowed
      alert("Cannot Rotate Ship Vertically. Please move ship UP first");
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
        alert("Cannot Rotate Ship Horizontally as there is another Ship in the way");
        return;
      }
    }
  } else {
    //Horizontal to Vertical Check
    for (let k = 1; k < shipLength; k++) {
      if (
        playerGridArray[shipHeadRow + k][shipHeadColumn].containsShip != "none"
      ) {
        alert("Cannot Rotate Ship Vertically as there is another Ship in the way");
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
######################################################################################
*/
let allowMovement = false;

/*______________________________________________________________________________
//Move Ship Upwards
//______________________________________________________________________________
Function used to move a ship upwards by one block
1) Find Head Block of Ship:
  i) Vetical Ship: Head = top block
  ii) Horizontal Ship: Head = leftmost block
2) Determine if Ship is set horizontally or vertically
3) Determine if Ship Can be moved upwards 
    i) Ensure upward movement would not cause ship to extend beyond top border
    ii) Ensure upward movement would not place this ship on top of another
4) Move Ship
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
    resetShipColor();
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
      resetShipColor();
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
        resetShipColor();
        return;
      }
    }
  }

  //At this point all conditions have been passed and ship can be moved upwards
  
  //MOVE SHIP IN PLAYER GRID
  //CASE 1 - Vertical Ship
  
  if(vertical){
    //Change block above Ship Head to contain ship and turn into new ship head
    playerGridArray[shipHeadRow-1][shipHeadColumn].containsShip = shipName;
    playerGridArray[shipHeadRow-1][shipHeadColumn].shipHead = true;
    //remove old Ship Head
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead=false;
    //remove bottom grid block of ship
    playerGridArray[shipHeadRow+(returnShipLength(shipName)-1)][shipHeadColumn].containsShip="none";
  }else{

    //CASE 2 - Horizontal Ship
    //Change block above Ship Head into new ship head
    playerGridArray[shipHeadRow-1][shipHeadColumn].shipHead = true;
    //remove old Ship Head
    playerGridArray[shipHeadRow][shipHeadColumn].shipHead=false;
    for(let i =0; i<(returnShipLength(shipName));i++){
      //change grid blocks above current horizontal ship to contain ship
      playerGridArray[shipHeadRow-1][shipHeadColumn+i].containsShip = shipName;
      //change current grid blocks containing ship to 'none'
      playerGridArray[shipHeadRow][shipHeadColumn+i].containsShip="none";
    }
  }

  //MOVE SHIP DIV ON GAMEBOARD
  determineShipAndDirectionToMove(shipName, "up");
}

/*______________________________________________________________________________
//Move Ship Downwards
//______________________________________________________________________________







/*______________________________________________________________________________
//Move Ship Left
//______________________________________________________________________________
*/



//HELPER FUNCTION
//Determine which ship needs to be moved and in what direction
function determineShipAndDirectionToMove(shipName, direction){
  switch(shipName){
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
function moveShipOnBoard (element, direction){
  let currentShipMarginValue=0;
  switch(direction){
      case "up":
        currentShipMarginValue=parseInt((window.getComputedStyle(element).marginTop).slice(0,-2));
        element.style.marginTop = (currentShipMarginValue-=37)+"px";
        break;
      case"down":
        currentShipMarginValue=parseInt((window.getComputedStyle(element).marginTop).slice(0,-2));
        element.style.marginTop = (currentShipMarginValue+=37)+"px";
        break;
      case "left":
        currentShipMarginValue=parseInt((window.getComputedStyle(element).marginLeft).slice(0,-2));
        element.style.marginLeft = (currentShipMarginValue-=37)+"px";
        break;
      case "right":
        currentShipMarginValue=parseInt((window.getComputedStyle(element).marginLeft).slice(0,-2));
        element.style.marginLeft = (currentShipMarginValue+=37)+"px";
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
  //if grid block below is the same ship type, then ship is positioned vertically
  if (
    playerGridArray[shipHeadRow + 1][shipHeadColumn].containsShip == shipName
  ) {
    return true;
  } else {
    //Grid block to the right would be the same as the ship (horizontal)
    return false;
  }
}

//return all ships background color to default
function resetShipColor() {
  playerCarrier.style.backgroundColor = "black";
  playerBattleship.style.backgroundColor = "black";
  playerCruiser.style.backgroundColor = "black";
  playerSubmarine.style.backgroundColor = "black";
  playerDestroyer.style.backgroundColor = "black";
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
  let displayArray = new Array(10);
  for(let i =0; i<10;i++){
    displayArray[i]=new Array(10);
  }

  for (let i = 0; i < 10; i++) {
    for(let j=0; j<10;j++){
      if(playerGridArray[i][j].shipHead==true){
        displayArray[i][j] = "H";
      }else if(playerGridArray[i][j].containsShip!="none"){
        displayArray[i][j] = "X";
      }else{
        displayArray[i][j] = ".";
      }
    }
  }

  for(let i=0;i<10;i++){
    console.log(...displayArray[i]);
  }
}
