//Pythagoras Calculator
/////////////////////////////////////////////////////////////////////////////////

//Receives input of two legs of the triangle to calculate the length of the hypotenuse

let pythagConvertButton = document.getElementById("pythagConvertButton");

pythagConvertButton.addEventListener("click", () => {
  //retrieve leg 1 and 2 elements
  let legOneInput = document.getElementById("legOneInput");
  let legTwoInput = document.getElementById("legTwoInput");

  //Check User has entered a value for Leg 1 and Leg 2
  if (legOneInput.value.length == 0 && legTwoInput.value.length == 0) {
    alert("Please enter a value for Leg 1 and Leg 2");
  } else if (legOneInput.value.length == 0 && legTwoInput.value.length != 0) {
    alert("Please enter a value for Leg 1");
  } else if (legOneInput.value.length != 0 && legTwoInput.value.length == 0) {
    alert("Please enter a value for Leg 2");
  }

  //Check that the values entered are both positive
  else if (legOneInput.value < 0 || legTwoInput.value < 0) {
    alert("Please check that the values entered are positive");
  } else {
    //at this point the values entered are valid, calculate the length of the hypotenuse
    let hypotenuseLength = pythagoras(
      legOneInput.value,
      legTwoInput.value
    ).toFixed(2);

    let hypotenuseLengthOutput = document.getElementById(
      "hypotenuseLengthOutput"
    );
    hypotenuseLengthOutput.textContent = "Hypotenuse: " + hypotenuseLength;
  }
});

//Theorem of Pythagoras Function

function pythagoras(firstLeg, secondLeg) {
  return Math.sqrt(firstLeg ** 2 + secondLeg ** 2);
}
