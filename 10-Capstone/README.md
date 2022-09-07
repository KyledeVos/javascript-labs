# Battleship - JavaScript Final Project



# Description
The aim of this project was to create a fully functional, single-player Battleship game allowing a player to position their ships easily and play against a computer player that uses random decision-making processes to decide where to fire on a player's grid

## Features

- Player Ship Movement and Rotation Buttons 
- Player can place ships directly next to, above or below each other
- Capable "Computer" Player to play against
- Descriptions of Active and Destroyed Ships for Player and Enemy
- Styling Changes to mouse actions
- Realistic Gameplay
- Test Functions for Project Markers (used in console)

# Software and Hardware 

## Software
This project was developed and tested using:
- Microsoft Visual Studio with Live Server and Prettier Extensions
- Google Chrome (primary web browser)
- Microsft Edge (secondary web browser only for testing)
- Microsoft Snipping Tool (Screenshots)

## Hardware
This project was developed on a Lenovo Ideapad 320 Laptop with Windows 10:<br>
Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz  1.80 GHz<br>
Display Resolution used: 1920 x 1080

A second monitor was also used:
Acer G195HQV (Not HD)
Display Resolution: 1366 x 768

# Installation and Opening of Battleship Webpage 

1. Clone repository: 

```bash
git clone https://github.com/KyledeVos/javascript-labs/tree/master/10-Capstone
```

2. Select HTML page in Directory: "battleshipBoardPage.html" and open using a web-browser. <br>
**Note:** Testing of page was only run using "Google Chrome" and "Microsoft Edge" Web-Browsers

3. To use Project Marker Testing Functions in Chrome, open Dev Console by:<br>
- Pressing 'F12' or 'FN + F12'
- Right-Click on webpage and select option "Inspect"
- Click Menu Option (top right-hand side of page), select "More Tools" and select "Developer Tools"

Details for Test Functions given below in "Marker Test Functions" Section

# Visuals

## Page onload Screenshot<br>
<p><img src="./ScreenShots/OpeningPageScreenshot.png" style="width: 80%">

## Active Game<br>
<p><img src="./ScreenShots/ActiveGameScreenshot.png" style="width: 80%">

# Computer Player - Logic Overview

A series of defined steps are used by the Computer Player (aka 'Enemy') to determine where to fire on the player's grid incorporating the use of Random-Number Generators to make the computer player's decisions less predictable. An array is also used to keep track of any discovered player ships 

Summary of Steps
- If array of ships is empty, fire randomly on player grid on any block that has not been previously fired on
- If a ship is found, add it to array of discovered ships
- Determine orientation of found ship through checks of which direction to fire in (considering end of grid container, previously fired blocks and discovered ships)
- Once Orientation is determined, fire in straight line (vertically or horizontally) until the ship is destroyed and can be removed from array of discovered ships

# Marker Test Functions

The following functions have been added to allow a marker (or anyone interested) to display the randomly placed enemy ships and see the details of the underlying 2D arrays containing the active game information for Player and Enemy

All Functions must be entered in Dev Console

## 1. Show Enemy Ships
Will display hidden enemy ships on enemy player grid (color-coded)

```bash
showEnemyShips();
```

## 2. Show full data of Player Grid
Displays Object Keys and Properties held in 2D Array
```bash
displayPlayerGridBlocksData();
```
## 3. These Functions show a summary of Player and Enemy Grid

Displays position of ships using the following key:
- H - Head of ship (player grid only)
- X - Block contains a ship
- . - Block does not contain a ship
```bash
displayPlayerGridBlocksSummary();
```

```bash
displayEnemyGridBlocksSummary();

```

# Testing Results

20 Test Games were run to check for application stability and reliability for which all aspects functioned correctly. 10 Games each were set for computer to win and then for player to win (run seperately) with results shown below

Computer move counts change for each game confirming random decision making processes used to find player ships. Testing also included various arrangements of Player Ships from onload arrangemnt to all vertical, all horizontal, all ships lined next to each and and all ships aligned against a grid border. It was observed that player ships lined next to each other allow a greater chance for Computer Player to find Player ships due to Orientation Detection Functionality

<p><img src="./ScreenShots/ComputerVSPlayerMoveCountChart.png" style="width: 60%">

The above tests showed the Computer Player takes an average of 57.0 moves to win a game and the Player takes 55.7 moves to win. As different players may attempt the use of different strageties to win, this data is not conclusive

# Future Development and Improvements

## Efficiency 

The practice of 'looping'' during gameplay was greatly minimised in this project, especially during gameplay but not entirely removed. Future Development would look to change enemy-player selection of random block from the use of a while-loop to instead using an array of possible blocks that have not yet been fired at

## Computer Player Game Play Improvements

Future Development would greatly consider the addition of more logic steps used by computer player to determine where to fire inclusive of:

- Checking if desired block has all surrounding blocks as fired on already, containing another ship or at a grid wall. This would remove firing on single blocks that cannot possibly contain a ship
- Considering the length of remaining ships and comparing this with available blocks in an area (horizontal or vertical) to determine if it is possible for any remaining ship to fit in the available blocks

Testing of completed game also showed computer player is highly unlikely to win using current means of random blocks and orientation tracking. The above improvements would assist in making gameplay more realistic and competitive

## Game Play Features

The addition of Difficuly Levels would be greatly desired with the following proposed levels and logic:

1. Easy - Current Game Play Styles (with above computer player improvements)

2. Medium - Using a random number generator, pick a number between 4 and 8 to determine the max allowed 'misses' of computer player before it is given a random block in a player ship not yet fired at

3. Hard - Use steps of 'Medium' Level with number range dropped to 4 - 6 and also give computer player orientation of player ship

The Levels above have been thought of to use the current steps used by the computer player and simply add on to them thus keeping large amounts of current code and logic to keep future development time and effort minimal
