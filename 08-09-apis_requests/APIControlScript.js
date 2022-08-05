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
        retrieveTimeData();
        retrieveSunData();
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
  try {
    countryFlag.setAttribute(
      "src",
      "https://countryflagsapi.com/png/" + userLocationData.country_code
    );
  } catch (error) {
    console.log("Error Retrieving Flag Image");
    console.log(error);
  }
}

//########################################################
//CURRENT TIME AND TIMEZONE
//########################################################

//Object to hold User Time Data
let userTimeData;

/*
Function used to populate elements with time Data (current Time and TimeZone) retrieved from API
Called from Resolved Result of above retrieveUserLocationData() needed the TimeZone (in words)
of the current user location 
*/
function retrieveTimeData() {
  let countryTime = fetch(
    "https://worldtimeapi.org/api/timezone/" + userLocationData.timezone
  )
    .then(function (response) {
      response.json().then((jsonData) => {
        userTimeData = jsonData;

        //Time Variable Elements in HTML Page
        let currentTime = document.getElementById("currentTime");
        let timeZone = document.getElementById("timeZone");

        //isolate current Time from 'datetime' property of userTimeData
        currentTime.textContent = userTimeData.datetime.substring(11, 16);
        timeZone.textContent = userTimeData.utc_offset;
      });
    })
    .catch(function (error) {
      console.log("Error Retrieving Current Time and Time Zone Data");
      console.log(error);
    });
}

//########################################################
//Sunrise, Sunset and Day Length
//########################################################

//Object to hold User Time Data
let userSunDataObject;

/*
Function used to retrieve sunrise and sunset times of current location and populate userSunDataObject
Called from Resolved Result of above retrieveUserLocationData() needing the latitude and longitude
of current user location
*/

function retrieveSunData() {
  let sunData = fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      userLocationData.latitude +
      "," +
      userLocationData.longitude +
      "?key=..."
  )
    .then(function (response) {
      response.json().then((jsonData) => {
        userSunDataObject = jsonData;
        populateSunriseAndSunsetTimes();
      });
    })
    .catch(function (error) {
      console.log("Error Retrieving Sunrise and Sunset Data");
      console.log(error);
    });
}

/*
Function used to populate elements in page with Sunrise and Sunset Times
Called from Resolved Result of above retrieveSunData()()
*/
function populateSunriseAndSunsetTimes() {
  let sunriseTime = document.getElementById("sunriseTime");
  sunriseTime.textContent =
    "Sunrise: " + userSunDataObject.currentConditions.sunrise.substring(0, 5);

  let sunsetTime = document.getElementById("sunsetTime");
  sunsetTime.textContent =
    "Sunset: " + userSunDataObject.currentConditions.sunset.substring(0, 5);
}
