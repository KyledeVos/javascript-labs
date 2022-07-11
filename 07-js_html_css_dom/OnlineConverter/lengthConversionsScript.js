//Length Converter
/////////////////////////////////////////////////////////////////////////////////

/*Only Allows These Conversions
1) cm to inches
2) inches to cm
3) miles to kilometers
4) kilometers to miles
 */

//#######################################
//Input Length
//#######################################

//variable to store user's chosen input scale - cm, inch, mile, kilometer
//default is 'select units" meaning has not chosen to use this converter
let lengthInput = "Select Units";

//user has chosen input scale to be in centimeters
let centimeterInputButton = document.getElementById("centimeterInputButton");

centimeterInputButton.addEventListener("click", () => {
  let lengthInputBox = document.getElementById("lengthInitialUnitButton");
  lengthInputBox.textContent = "cm";

  lengthInput = "cm";

  showLengthConverterUnit("Convert to Inches");
});

//user has chosen input scale to be in fahrenheit
let inchInputButton = document.getElementById("inchInputButton");
inchInputButton.addEventListener("click", () => {
  let lengthInputBox = document.getElementById("lengthInitialUnitButton");
  lengthInputBox.textContent = "inches";

  lengthInput = "inches";

  showLengthConverterUnit("Convert to cm");
});

//user has chosen input scale to be in miles
let mileInputButton = document.getElementById("mileInputButton");
mileInputButton.addEventListener("click", () => {
  let lengthInputBox = document.getElementById("lengthInitialUnitButton");
  lengthInputBox.textContent = "miles";

  lengthInput = "miles";

  showLengthConverterUnit("Convert to km");
});

//user has chosen input scale to be in miles
let kilometerInputButton = document.getElementById("kilometerInputButton");
kilometerInputButton.addEventListener("click", () => {
  let lengthInputBox = document.getElementById("lengthInitialUnitButton");
  lengthInputBox.textContent = "km";

  lengthInput = "km";

  showLengthConverterUnit("Convert to miles");
});

//HELPER FUNCTION
//Change Style of showConvertedUnitButton after user has selected a unit
function showLengthConverterUnit(textContentString) {
  let showConvertedUnitButton = document.getElementById(
    "showConvertedUnitButton"
  );
  showConvertedUnitButton.textContent = textContentString;

  //style to make element look like a button
  //sourced from: 
  showConvertedUnitButton.style.font = "bold 12px Arial";
  showConvertedUnitButton.style.textShadow = "none";
  showConvertedUnitButton.style.backgroundColor = "#EEEEEE";
  showConvertedUnitButton.style.color = "#333333";
  showConvertedUnitButton.style.padding = "2px 6px 2px 6px";
  showConvertedUnitButton.style.borderTop= "1px solid #CCCCCC";
  showConvertedUnitButton.style. borderRight = "1px solid #333333";
  showConvertedUnitButton.style.borderBottom= "1px solid #333333";
  showConvertedUnitButton.style.borderLeft= "1px solid #CCCCCC";
}

//#######################################
//Calculate Converted Length
//#######################################

//variable to hold users lenght input
let inputLength = 0;

let lengthInputButton = document.getElementById("lengthConvertButton");

lengthInputButton.addEventListener("click", () => {
  inputLength = document.getElementById("userLength").value;
  let lengthInitialUnitButton = document.getElementById("lengthInitialUnitButton").textContent;

  //if user has not entered a temperature then set default value to 0
  if (inputLength == 0) {
    let inputLengthHold = document.getElementById("userLength");
    inputLengthHold.setAttribute("placeholder", "0");
  }else if(inputLength<0){
    alert("Please enter a positive value for your length")
    let inputLengthHold = document.getElementById("userLength");
    inputLengthHold.setAttribute("placeholder", "0");
  } else if(lengthInitialUnitButton =="Select Units"){
    alert("Please select a unit for your length")

  }else{
    let convertedLength = document.getElementById("convertedLength");
    let calculatedLength = 0;
    
    switch(lengthInitialUnitButton){
      case "cm":
        calculatedLength = CmToInch(inputLength).toFixed(2);
        convertedLength.textContent = calculatedLength + " inches";
        break;

      case "inches":
        calculatedLength = InchToCm(inputLength).toFixed(2);
        convertedLength.textContent = calculatedLength + " cm";
        break;

      case "miles":
        calculatedLength = MToKm(inputLength).toFixed(2);
        convertedLength.textContent = calculatedLength + " km";
        break;

      case "km":
        calculatedLength = KmToM(inputLength).toFixed(2);
        convertedLength.textContent = calculatedLength + " miles";
        break;
        
        default:
    }

  }
});


//Length Conversion Functions

function InchToCm(inchMeasurement){
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
