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
}

document.querySelectorAll(".playerGridElement").forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.setAttribute("style", "border: 4px solid green");
  });
});

document.querySelectorAll(".playerGridElement").forEach((element) => {
  element.addEventListener("mouseout", () => {
    element.setAttribute("style", "border: 1px solid white");
  });
});

let playerCarrier = document.getElementById("playerCarrier");
let playerBattleship = document.getElementById("playerBattleship");
let allowRotationButton = false;
let shipName="noneSelected";

document.querySelectorAll(".ship").forEach((element)=>{
  element.addEventListener("mousedown",()=>{
 
    element.style.backgroundColor="blue";
    shipName = element.id;
    allowRotationButton = true;

  
  })
})

document.getElementById("rotatebutton").addEventListener("mousedown", function () {
      if (allowRotationButton) {
        rotateShip(shipName);
      }else{
        alert("Please Select a Ship to Rotate");
      }
    });

let rotatebutton = document.getElementById("rotatebutton");

//function used to rotate ship by 90 degrees
/*
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
  let shipHeadRow = 0;
  let shipHeadColumn = 0;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (
        playerGridArray[i][j].shipHead == true &&
        playerGridArray[i][j].containsShip == shipName
      ) {
        shipHeadRow = i;
        shipHeadColumn = j;

        //determine if ship is positioned vertically or horizontally
        let vertical;
        let horizontal;

        //if grid block below is the same ship type, then ship is positioned vertically
        if (playerGridArray[i + 1][j].containsShip == shipName) {
          vertical = true;
          horizontal = false;
        } else {
          //if grid block to the right is the same ship type, then ship is positioned horizontally
          vertical = false;
          horizontal = true;
        }
      
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
            resetShipColor();
            allowRotationButton = false;
            alert(
              "Cannot Rotate Ship Horizontally. Please move ship LEFT first"
            );
            return;
          }
        } else {
          //check horizontal ship rotation to vertical would not extend grid border
          if (shipHeadRow + (shipLength - 1) > 9) {
            //rotation not allowed
            alert("Cannot Rotate Ship Vertically. Please move ship UP first");
            resetShipColor();
            allowRotationButton = false;
            return;
          }
        }

        //ii)
        //Check that Ship rotation would not place ship on top of another

        //vertical to Horizontal check
        if (vertical) {
          for (let k = 1; k < shipLength; k++) {
            if (
              playerGridArray[shipHeadRow][shipHeadColumn + k].containsShip !=
              "none"
            ) {
              alert(
                "Cannot Rotate Ship Horizontally as there is another Ship in the way"
              );
              resetShipColor();
              allowRotationButton = false;
              return;
            }
          }
        } else {
          //Horizontal to Vertical Check
          for (let k = 1; k < shipLength; k++) {
            if (
              playerGridArray[shipHeadRow + k][shipHeadColumn].containsShip !=
              "none"
            ) {
              alert(
                "Cannot Rotate Ship Vertically as there is another Ship in the way"
              );
              resetShipColor();
              allowRotationButton = false;
              return;
            }
          }
        }

      
        //At this point all conditions have been met to allow for ship rotation
        //i) Change grid blocks that contain ship
        if (vertical) {
          for (let k = 1; k < shipLength; k++) {
            //first 'rotate' ship to occupy grid blocks to the right of ship
            playerGridArray[shipHeadRow][shipHeadColumn + k].containsShip =
              shipName;
            //remove ship from previous vertical blocks
            playerGridArray[shipHeadRow + k][shipHeadColumn].containsShip =
              "none";
          }
        } else {
          for (let k = 1; k < shipLength; k++) {
            //first 'rotate' ship to occupy grid blocks to the bottom of ship
            playerGridArray[shipHeadRow + k][shipHeadColumn].containsShip =
              shipName;
            //remove ship from previous horizontal blocks
            playerGridArray[shipHeadRow][shipHeadColumn + k].containsShip =
              "none";
          }
        }

        //rotate Ship Div on GameBoard
        switch(shipName){
          case "playerCarrier":
            swopShipHeightAndWidth(playerCarrier);
            break;
            case "playerBattleship":
              swopShipHeightAndWidth(playerBattleship);
        }

        resetShipColor();
        allowRotationButton = false;
        //break out of loop
        break;
      }
    }
  }
}

//HELPER FUNCTION
//return length of current ship type
function returnShipLength(shipname) {
  if (shipname == "playerCarrier") {
    return 5;
  } else if (shipname == "playerBattleship") {
    return 4;
  }
}

//HELPER FUNCTION
//return all ships background color to default
function resetShipColor() {
  playerCarrier.style.backgroundColor = "black";
  playerBattleship.style.backgroundColor = "black";
}

//HELPER FUNCTION
//swop values of height and width of a ship element
//mimics rotating ship by 90 degrees
function swopShipHeightAndWidth(element){
    let hold = element.clientHeight;
    element.style.height = element.clientWidth + "px";
    element.style.width = hold + "px";
}





//TEST FUNCTION
//Display All Grid Blocks
function displayGridBlocks(){
  for(let i=0; i< 10;i++){
    console.log(...playerGridArray[i]);
  }
}