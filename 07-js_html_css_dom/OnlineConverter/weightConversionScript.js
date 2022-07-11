//Weight Converter
/////////////////////////////////////////////////////////////////////////////////

/*Only Allows These Conversions
1) kg to pounds
2) pounds to kg
3) grams to ounces
4) ounces to grams
 */

//#######################################
//Input Weight
//#######################################

//variable to store user's chosen input scale - kg, lb, g, oz
//default is 'select units" meaning has not chosen to use this converter
let weightInput = "Select Units";

//user has chosen input scale to be in kg
let kilogramInputButton = document.getElementById("kilogramInputButton");

kilogramInputButton.addEventListener("click", () => {
  let weightInputBox = document.getElementById("WeightInitialUnitButton");
  weightInputBox.textContent = "kg";

  lengthInput = "kg";

  showWeightConverterUnit("Convert to pounds");
});

//user has chosen input scale to be in kg
let poundInputButton = document.getElementById("poundInputButton");

poundInputButton.addEventListener("click", () => {
  let weightInputBox = document.getElementById("WeightInitialUnitButton");
  weightInputBox.textContent = "lb";

  lengthInput = "lb";

  showWeightConverterUnit("Convert to kilograms");
});

//user has chosen input scale to be in grams
let gramInputButton = document.getElementById("gramInputButton");

gramInputButton.addEventListener("click", () => {
  let weightInputBox = document.getElementById("WeightInitialUnitButton");
  weightInputBox.textContent = "g";

  lengthInput = "g";

  showWeightConverterUnit("Convert to ounces");
});

//user has chosen input scale to be in ounces
let ounceInputButton = document.getElementById("ounceInputButton");

ounceInputButton.addEventListener("click", () => {
  let weightInputBox = document.getElementById("WeightInitialUnitButton");
  weightInputBox.textContent = "oz";

  lengthInput = "oz";

  showWeightConverterUnit("Convert to grams");
});



//HELPER FUNCTION
//Change Style of showConvertedUnitButton after user has selected a unit
function showWeightConverterUnit(textContentString) {
    let showConvertedWeightUnitButton = document.getElementById(
      "showConvertedWeightUnitButton"
    );
    showConvertedWeightUnitButton.textContent = textContentString;
  
    //style to make element look like a button
    //sourced from: 
    showConvertedWeightUnitButton.style.font = "bold 12px Arial";
    showConvertedWeightUnitButton.style.textShadow = "none";
    showConvertedWeightUnitButton.style.backgroundColor = "#EEEEEE";
    showConvertedWeightUnitButton.style.color = "#333333";
    showConvertedWeightUnitButton.style.padding = "2px 6px 2px 6px";
    showConvertedWeightUnitButton.style.borderTop= "1px solid #CCCCCC";
    showConvertedWeightUnitButton.style. borderRight = "1px solid #333333";
    showConvertedWeightUnitButton.style.borderBottom= "1px solid #333333";
    showConvertedWeightUnitButton.style.borderLeft= "1px solid #CCCCCC";
  }


  //#######################################
//Calculate Converted Weight
//#######################################

//variable to hold users weight input
let inputWeight = 0;

let weightInputButton = document.getElementById("weightConvertButton");

weightInputButton.addEventListener("click", () => {
    inputWeight = document.getElementById("userWeight").value;
    let weightInitialUnitButton = document.getElementById("WeightInitialUnitButton").textContent;
  
    //if user has not entered a weight then set default value to 0
    if (inputWeight == 0) {
      let inputWeightHold = document.getElementById("userWeight");
      inputWeightHold.setAttribute("placeholder", "0");
    }else if(inputWeight<0){
      alert("Please enter a positive value for your weight")
      let inputWeightHold = document.getElementById("userWeight");
      inputWeightHold.setAttribute("placeholder", "0");
    } else if(weightInitialUnitButton =="Select Units"){
      alert("Please select a unit for your weight")
  
    }else{
      let convertedWeight = document.getElementById("convertedWeight");
      let calculatedWeight = 0;
      
      switch(weightInitialUnitButton){
        case "kg":
          calculatedWeight = kgToPound(inputWeight).toFixed(2);
          convertedWeight.textContent = calculatedWeight + " lbs";
          break;
  
        case "lb":
          calculatedWeight = poundToKg(inputWeight).toFixed(2);
          convertedWeight.textContent = calculatedWeight + " kg";
          break;
  
        case "g":
          calculatedWeight = gramToOunce(inputWeight).toFixed(2);
          convertedWeight.textContent = calculatedWeight + " oz";
          break;
  
        case "oz":
          calculatedWeight = ounceTogram(inputWeight).toFixed(2);
          convertedWeight.textContent = calculatedWeight + " g";
          break;
          
          default:
      }
  
    }
  });





//Weight Conversion Functions

function kgToPound(kgWeight){
    return kgWeight*2.205;
}

function poundToKg(poundWeight){
    return poundWeight/2.205;
}

function gramToOunce(gramWeight){
    return gramWeight/28.35;
}

function ounceTogram(ounceWeight){
    return ounceWeight*28.35;
}
