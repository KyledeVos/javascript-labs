//########################################################
//IP ADDRESS
//########################################################


//variable to hold user IP Address
let userIPAddress = "";

//Retrieve User IP Address
//If Promise is fulfilled then UserIPAddress will hold the IP Address of the current, local machine
//If Promise is rejected then userIPAddress will contain the string "error"
function retrieveUserIp() {
  let UserIPObject = fetch("https://ip.seeip.org/json")
    .then((response) => {
      response.json().then((jsonData) => {
        userIPAddress = jsonData.ip;
        retrieveUserLocationData();
      });
    })
    .catch((error) => {
      console.log("Error Retrieving UserIp");
      userIPAddress = "error";
    });
}

//########################################################
//LOCATION DATA AND FLAG
//########################################################

//Object to hold User Location Data
let userLocationData;

/*
Function used to Retrieve User Location Data from Ipapi API
Called from Resolved Result of above retrieveUserIp()
*/
function retrieveUserLocationData() {
  let locationObject = fetch("https://ipapi.co/" + userIPAddress + "/json/")
    .then(function (response) {
      response.json().then((jsonData) => {
        userLocationData = jsonData;
        populateLocationDataElements();
      });
    })
    .catch(function (error) {
      console.log("Error Retrieving User Location Data");
      console.log(error);
    });
}

/*
Function used to populate elements with location data retrieved from API
Called from Resolved Result of above retrieveUserLocationData()
*/

function populateLocationDataElements() {
  //Location Variable Elements in HTML Page
  let country = document.getElementById("country");
  let countryCode = document.getElementById("countryCode");
  let region = document.getElementById("region");
  let regionalBloc = document.getElementById("regionalBloc");
  let city = document.getElementById("city");
  let currentLocationLatitude = document.getElementById(
    "currentLocationLatitude"
  );
  let currentLocationLongitude = document.getElementById(
    "currentLocationLongitude"
  );
  let population = document.getElementById("population");
  let language = document.getElementById("language");

  //flag element (image)
  let countryFlag = document.getElementById("flagImage");

  //populate elements with location data
  country.textContent = "Country: " + userLocationData.country_name;
  countryCode.textContent = "Country Code: " + userLocationData.country_code;
  region.textContent = "Region: " + userLocationData.region;
  regionalBloc.textContent = "Regional Bloc: " + userLocationData.region_code;
  city.textContent = "City: " + userLocationData.city;
  currentLocationLatitude.textContent =
    "Latitude: " + userLocationData.latitude;
  currentLocationLongitude.textContent =
    "Longitude: " + userLocationData.longitude;
  population.textContent = "Population: " + userLocationData.country_population;
  language.textContent = "Language(s): " + userLocationData.languages;

  //Attempt to Retrieve Image of Current Flag of Country
  try{
  countryFlag.setAttribute("src", "https://countryflagsapi.com/png/"+ userLocationData.country_code)
  }catch(error){
      console.log("Error Retrieving Flag Image");
      console.log(error);
  }
}
