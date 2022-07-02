/**
 * 1. Create an array of strings with the names of some items in the room you
 *    are sitting in right now. For example "chair", "keyboard" etc
 * 2. Now think of 3 drawers or shelves or boxes that you have nearby. Make an
 *    array with a sub-array for each drawer or box, and add 5 things in each
 *    sub-array. Do this for 3 boxes. You should have a two dimensional array.
 * 3. Pick 5 things from the two dimensional array just created, and log them to
 *    the console using array referencing.
 * 4. Use a for loop to create a array of the numbers from 1 to 100.
 * 5. Use another for loop to go through the array of numbers just created and
 *    log the sum of all the numbers.
 * 6. Use the random number generator from previous labs and another for loop to
 *    create a array of 100 random numbers.
 * 7. Use another for loop to go over each of these random numbers and put them
 *    in one of two arrays. One for odd numbers, and one for even numbers.
 * 8. Make the for loop that logs the sum of all the numbers in an array into a
 *    function that takes an array as an argument and returns the sum. Use this
 *    function to log the sum of the two arrays of odd and even numbers.
 */

//1)
let roomItems = [
  "laptop",
  "monitor",
  "desk",
  "chair",
  "pens",
  "bed",
  "lamps",
  "books",
  "files",
  "bike models",
];

//2)
let containerContents = [
  ["journals", "files", "textbooks", "laptop bag", "small whiteboard"],
  ["shirts", "jeans", "jackets", "hats", "socks"],
  ["candles", "chargers", "notebook", "pamphlets", "hourglass"],
];

//3)
console.log(containerContents[0][2]);
console.log(containerContents[0][4]);
console.log(containerContents[1][2]);
console.log(containerContents[2][4]);
console.log(containerContents[2][0]);

//4)

let numberArray = [];

for (let i = 1; i < 101; i++) {
  numberArray.push(i);
}
console.log("Array of Numbers from 1 - 100");
console.log(numberArray);

//5)
console.log("Sum of all the Numbers in the above Array");

function sumArrayElements(array) {
  let sumOfNumbersInArray = 0;

  for (let i = 0; i < array.length; i++) {
    sumOfNumbersInArray += array[i];
  }

  return sumOfNumbersInArray;
}

let sumNumbersInArray = sumArrayElements(numberArray);
console.log(sumNumbersInArray);

//6)

//Generator Taken from Lab 03.js in Section 04
function getRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

let randomNumberArray = [];

for (let i = 0; i < 100; i++) {
  randomNumberArray[i] = getRandomNumber();
}

console.log("Array of 100 Random Numbers (Unordered)");
console.log(randomNumberArray);

//7)

console.log("Arrays of Odd and Even Numbers");

let oddNumberArray = [];
let evenNumberArray = [];

for (let i = 0; i < randomNumberArray.length; i++) {
  let currentNumberInArray = randomNumberArray[i];

  if (currentNumberInArray % 2 == 0) {
    evenNumberArray.push(currentNumberInArray);
  } else {
    oddNumberArray.push(currentNumberInArray);
  }
}

console.log("Array of Even Numbers: " + evenNumberArray);
console.log("Array of Odd Numbers: " + oddNumberArray);

//8)
console.log("Sum of Odd and Even Arrays");
let evenArraySum = 0;
let oddArraySum = 0;

evenArraySum = sumArrayElements(evenNumberArray);
oddArraySum = sumArrayElements(oddNumberArray);

console.log("Sum Of Even Array: " + evenArraySum);
console.log("Sum of Odd Array:  " + oddArraySum);
