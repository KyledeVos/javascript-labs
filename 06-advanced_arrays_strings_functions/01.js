/**
 * In these questions you will be practicing how to use the forEach syntax.
 *
 * 1. Use a random number generator to generate an array of 100 values.
 * 2. Use forEach on the array to output the sum, count and average.
 * 3. Use forEach to create a new array from the first one that halves all the
 *    values.
 * 4. Use forEach on the new array to output the sum, count and average again.
 * 5. Refactor: define the sum, count and average function as a separate
 *    function and pass it to the forEach functions as a name.
 */

//1)

function getRandomNumber() {
  return Math.floor(Math.random() * 10 + 1);
}

let arrayOfRandomValues = [];

for (let i = 0; i < 100; i++) {
  arrayOfRandomValues[i] = getRandomNumber();
}

//2)

//before refactor
/*console.log(
  "Full Value - Display Count, Sum and Average of Random-Value-Array"
);
let currentCount = 0;
let currentSum = 0;
let currentAverage = 0;
arrayOfRandomValues.forEach((value) => {
  currentCount++;
  currentSum += value;
  currentAverage = currentSum / currentCount;
  console.log(
    `CurrentCount: , ${currentCount}, Current Sum: , ${currentSum} , CurrentAverage: ${currentAverage}`
  );
});
*/

//3)

let halfOfValuesArray = [];

arrayOfRandomValues.forEach((value) => halfOfValuesArray.push(value / 2));

//4)


//before refactor
/*
console.log(
  "Half Value - Display Count, Sum and Average of Random-Value-Array"
);
currentCount = 0;
currentSum = 0;
currentAverage = 0;
halfOfValuesArray.forEach((value) => {
  currentCount++;
  currentSum += value;
  currentAverage = currentSum / currentCount;
  console.log(
    `CurrentCount: , ${currentCount}, Current Sum: , ${currentSum} , CurrentAverage: ${currentAverage}`
  );
});
*/

//5)

let currentCount = 0;
let currentSum = 0;
let currentAverage = 0;

function sumCountAndAverageArray(value) {
  currentCount++;
  currentSum += value;
  currentAverage = currentSum / currentCount;
  console.log(
    `CurrentCount: , ${currentCount}, Current Sum: , ${currentSum} , CurrentAverage: ${currentAverage}`
  );
}
console.log(
    "Full Value - Display Count, Sum and Average of Random-Value-Array"
  );
arrayOfRandomValues.forEach(sumCountAndAverageArray);

currentCount = 0;
currentSum = 0;
currentAverage = 0;

console.log(
    "Half Value - Display Count, Sum and Average of Random-Value-Array"
  );

  halfOfValuesArray.forEach(sumCountAndAverageArray);
