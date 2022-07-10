//Temperature Converter
/////////////////////////////////////////////////////////////////////////////////

//#######################################
//Input Temperature
//#######################################

//variable to store user's chosen input scale - Celsius, Fahrenheit, Kelvin
//default is 'select units" meaning has not chosen to use this converter
let tempInput = "Select Units";

//user has chosen input scale to be in celsius
let celsiusButton = document.getElementById("celsiusInputButton");

celsiusButton.addEventListener("click", () => {
  let tempInputBox = document.getElementById("dropbtn");
  tempInputBox.textContent = "\u00B0C";

  tempInput = "C";
});

//user has chosen input scale to be in fahrenheit
let fahrenheitButton = document.getElementById("fahrenheitInputButton");
fahrenheitButton.addEventListener("click", () => {
  let tempInputBox = document.getElementById("dropbtn");
  tempInputBox.textContent = "\u00B0F";

  tempInput = "F";
});

//user has chosen input scale to be in kelvin
let kelvinButton = document.getElementById("kelvinInputButton");
kelvinButton.addEventListener("click", () => {
  let tempInputBox = document.getElementById("dropbtn");
  tempInputBox.textContent = "K";

  tempInput = "K";
});

//#######################################
//Convert To Temperature
//#######################################

//variable to hold users temperature input

//variable to store user's chosen output scale - Celsius, Fahrenheit, Kelvin
//default is 'Convert To" meaning has not chosen to use this converter
let tempOutput = "Convert To";

//user has chosen input scale to be in celsius
let celsiusOutputButton = document.getElementById("celsiusOutputButton");

celsiusOutputButton.addEventListener("click", () => {
  let tempOutputBox = document.getElementById("convertTempButton");
  tempOutputBox.textContent = "\u00B0C";

  tempOutput = "C";
});

//user has chosen input scale to be in fahrenheit
let fahrenheitOutputButton = document.getElementById("fahrenheitOutputButton");
fahrenheitOutputButton.addEventListener("click", () => {
  let tempInputBox = document.getElementById("convertTempButton");
  tempInputBox.textContent = "\u00B0F";

  tempOutput = "F";
});

//user has chosen input scale to be in kelvin
let kelvinOutputButton = document.getElementById("kelvinOutputButton");
kelvinOutputButton.addEventListener("click", () => {
  let tempInputBox = document.getElementById("convertTempButton");
  tempInputBox.textContent = "K";

  tempOutput = "K";
});

//#######################################
//Calculate Converted Temperature
//#######################################

//variable to hold users temperature input
let inputTemperature = 0;

let tempInputButton = document.getElementById("tempConvertButton");
tempInputButton.addEventListener("click", () => {
  inputTemperature = document.getElementById("userTemp").value;

  //if user has not entered a temperature then set default value to 0
  if (inputTemperature == 0) {
    let inputTemperaturehold = document.getElementById("userTemp");
    inputTemperaturehold.setAttribute("placeholder", "0");
  }

  //check if user has entered an input and output scale

  if (tempInput == "Select Units" && tempOutput == "Convert To") {
    //user has not selected an input and output unit
    alert("Please select units for your Input and Desired Output Temperatures");
  } else if (tempInput == "Select Units" && tempOutput != "Convert To") {
    //user has not selected an input unit
    alert("Please select a unit for your input temperature");
  } else if (tempOutput == "Convert To" && tempInput != "Select Units") {
    //user has not selected an output unit
    alert("Please select a unit for your output temperature");
  } else if (tempInput == tempOutput) {
    //user has selected the same unit to convert to as the current one

    let convertedTemperatureBox = document.getElementById(
      "convertedTemperature"
    );
    let outputString = inputTemperature;

    if (tempOutput != "K") {
      outputString += "\u00B0" + tempOutput;
    } else {
      outputString += tempOutput;
    }

    convertedTemperatureBox.textContent = outputString;
  } else {
    //convert input tempt to output temp
    let functionName = tempInput + "To" + tempOutput;
    let param = parseFloat(inputTemperature);

    let outputString = window[functionName](param);

    if (tempOutput != "K") {
      outputString += "\u00B0" + tempOutput;
    } else {
      outputString += tempOutput;
    }

    let convertedTemperatureBox = document.getElementById(
      "convertedTemperature"
    );
    convertedTemperatureBox.textContent = outputString;
  }
});

//Temperature Conversion Functions

function KToC(kelvinTemp) {
  return (kelvinTemp - 273.15).toFixed(2);
}

function CToK(celciusTemp) {
  return (celciusTemp + 273.15).toFixed(2);
}

function FToK(fahrenheitTemp) {
  return ((fahrenheitTemp - 32) * (5 / 9) + 273.15).toFixed(2);
}

function KToF(kelvinTemp) {
  return ((kelvinTemp - 273.15) * (9 / 5) + 32).toFixed(2);
}

function CToF(celciusTemp) {
  return (celciusTemp * (9 / 5) + 32).toFixed(2);
}

function FToC(fahrenheitTemp) {
  return ((fahrenheitTemp - 32) * (5 / 9)).toFixed(2);
}
