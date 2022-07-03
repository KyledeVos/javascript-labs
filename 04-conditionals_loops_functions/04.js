/**
 * You have already made some functions for temperatures. Now you will make some
 * more functions!
 *
 * 1. Research the formula for conversions to and from Kelvin. Write a KtoC,
 *    CtoK, FtoK and a KtoF function. Be sure to return the value so that the
 *    code below functions without error.
 *
 * 2. Research and write a function that uses the pythagorean formula to get the
 *    length of the hypotenuse of a right angled triangle. It should take in two
 *    arguments, the two shorter sides of a triangle, and return the longest
 *    side. Call the function "pythagoras". After writing your function the code
 *    below should work without error.
 *
 * 3. Research and write a functions to convert
 *      - inches to centimeters (inchToCm)
 *      - centimeters to inches (CmToInch)
 *      - miles to kilometers (MToKm)
 *      - kilometers to miles (KmToM)
 *
 */

// Write your code here:

//1) Temperature Conversion Functions

function KtoC(kelvinTemp){
    return kelvinTemp - 273.15;
}

function CtoK(celciusTemp){
    return celciusTemp + 273.15;
}

function FtoK(fahrenheitTemp){
    return (((fahrenheitTemp - 32)*(5/9)) + 273.15);
}

function KtoF(kelvinTemp){
    return (((kelvinTemp - 273.15)*(9/5) + 32));
}

//2) Thorem of Pythagoras Function

function pythagoras(firstLeg, secondLeg){
    return Math.sqrt((firstLeg ** 2)+ (secondLeg ** 2));
}

//3) Length Conversions

function inchToCm(inchMeasurement){
    return inchMeasurement*2.54;
}

function CmToInch(cmMeasurement){
    return cmMeasurement/2.54;
}

function MToKm(milesDistance){
    return milesDistance*1.609;
}

function KmToM(kmDistance){
    return kmDistance/1.609;
}


// Do not modify anything below this line

console.log(KtoC(272));
console.log(CtoK(0));
console.log(FtoK(30));
console.log(KtoF(100));

console.log(pythagoras(10, 20));
console.log(pythagoras(30, 100));
console.log(pythagoras(20, 50));

console.log(MToKm(100));
console.log(KmToM(25));

console.log(inchToCm(10));
console.log(CmToInch(425));