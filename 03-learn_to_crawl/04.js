/**
 * Create three variables with numbers assigned to them.
 * Do not use zero.
 * Make the numbers at least 4 digits long, e.g. 3874, 2398.
 * Create a 4th variable with the number 7 and call it "luckyNumber".
 * 
 * After creating the variables, do the
 * following without typing any more numbers.
 * 
 * Output the following to the console:
 *      1. The sum of the numbers.
 *      2. The result of subtracting the two smallest
 *         numbers from the larger one.
 *      3. The result of multiplying all the numbers.
 *      4. The result of the largest number divided
 *         by the difference between the smaller ones.
 *      5. The result of the the numbers modulo 7.
 * 
 * Finally, label all of the outputs by using console log in the way
 * that is demonstrated below. For the labels, be sure to come up 
 * with clear and descriptive names.
 */

let firstNumber = 1234;
let secondNumber = 1212;
let thirdNumber = 2222;
let luckyNumber = 7;

console.log("Sum of Numbers: " + firstNumber + secondNumber + thirdNumber + luckyNumber);
console.log("Difference of Two smalles from largest number: " + (thirdNumber - (luckyNumber + secondNumber)));
console.log("Product of All Numbers: " + firstNumber * secondNumber * thirdNumber * luckyNumber);
console.log("Largest number divided by difference of smaller ones: " + thirdNumber/(secondNumber-luckyNumber));
console.log("Result of all numbers Modulus by 7:");
console.log("First Number: " + firstNumber + " - " + firstNumber%luckyNumber);
console.log("Second Number: " + secondNumber + " - " + secondNumber%luckyNumber);
console.log("Third Number: " + thirdNumber + " - " + thirdNumber%luckyNumber);
console.log("Lucky Number: " + luckyNumber + " - " + luckyNumber%luckyNumber);


let result = 0
console.log("Label", result)