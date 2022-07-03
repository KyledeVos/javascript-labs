function getRandomNumber(){
    return Math.floor((Math.random() * 100) + 1);
}

/**
 * 1. Create while loop equivalents of the loops in the previous exercises!
 *
 * 2. Using the random number generator above, write a while loop that generates
 *    random numbers until it has generated one that is divisible by 11. Do you
 *    remember what operator to use?
 */

//Task 1
console.log("Task 1");
console.log("Activity 1\n");
let iterator = 5;
while(iterator<1000){
    console.log(iterator);
    iterator+=5;
}

//2)
console.log("\nActivity 2\n");
let secondIterator = 100;
while(secondIterator>-101){
    console.log(secondIterator);
    secondIterator--;
}

//3) - Method 1
console.log("\nActivity 3 - Method 1\n");
let newSequenceNumber = 0;
iterator = 0;
while(iterator<2501){
    newSequenceNumber+=3;
    console.log(newSequenceNumber);
    newSequenceNumber-=1;
    console.log(newSequenceNumber);
    iterator++;
}

//3) - Method 2
console.log("\nActivity 3 - Method 2\n");

let newOddSequenceNumber = 1;
let newEvenSequenceNumber = 0;

iterator = 0;
while(iterator<5001){
    if((iterator%2)==0){
        newOddSequenceNumber+=2;
        console.log(newOddSequenceNumber);
    }else {
        newEvenSequenceNumber+=2;
        console.log(newEvenSequenceNumber);
    }
    iterator++;
}

//Task 2
console.log("Task 2");
let terminateLoop = false;

while(!terminateLoop){
    let currentNumber = getRandomNumber();
    console.log();

    if((currentNumber%11) == 0){
        console.log("Number Generated is: " + currentNumber + " which IS divisible by 11. Loop Terminated");
        terminateLoop = true;
    } else{
        console.log("Number Generated is: " + currentNumber);
    }
}


