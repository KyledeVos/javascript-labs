//#############################################################
//FUNCTIONS CALLED ON PAGE LOAD AND REPETITIVE FUNCTION CALLS
//#############################################################

//Function Called on Page Load to begin fetching data from API's
function loadStartingFunctions() {
  try {
    retrieveUserIp();
    retrieveIssLatitudeAndLongitude();
    retrieveNumberOfPeopleInSpace();
    updateBatteryLevelOfDevice();
  } catch (error) {
    console.error("There was a problem retrieving Data to load info on page");
    console.log(error);
  }
}

//Repetitive Function Calls to Update Data

//update ISS Latitude, Longitude and Location every 5 seconds
window.setInterval(retrieveIssLatitudeAndLongitude, 5000);

//update Current Location Data and Current Time Every 10 seconds
window.setInterval(retrieveUserIp, 10000);

//update Battery Percentage every minute
window.setInterval(updateBatteryLevelOfDevice, 60* 1000);


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
      "?key=E9NGJWRU8DYGX5LBB53C9PHQJ"
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

//########################################################
//ISS AND SPACE DATA
//########################################################

//Object to hold ISS Latitude and Longitude
let ISSDataObject;

/*
Function used to retrieve ISS Latitude and Longitude
Calls retrieveIssLocationCountry() if promise is resolved
*/
function retrieveIssLatitudeAndLongitude() {
  //retrieve ISS latitude and longitude
  let ISSData = fetch("http://api.open-notify.org/iss-now.json")
    .then(function (response) {
      response.json().then((jsonData) => {
        ISSDataObject = jsonData;

        //populate elements in page with ISS Lat and Long Data
        let IssLatitude = document.getElementById("IssLatitude");
        let IssLongitude = document.getElementById("IssLongitude");

        IssLatitude.textContent =
          "Latitude: " + ISSDataObject.iss_position.latitude.substring(0, 6);
        IssLongitude.textContent =
          "Longitude: " + ISSDataObject.iss_position.longitude.substring(0, 6);

        //retrieve current location (country or ocean) of ISS
        setTimeout(retrieveIssLocationCountry(), 5000);
      });
    })
    .catch(function (error) {
      console.error("Error Retrieving ISS Location");
      console.log(error);
    });
}

/*
Function used to retrieve Country (or Ocean in event of error) that ISS is currently over
Called from Resolved Block of promise in above RetrieveIssLatitudeAndLongitude()
*/
function retrieveIssLocationCountry() {
  // If ISS is over a country, API will return object containing country name
  // If ISS is over an ocean (or promise is rejected) it could mean ISS is over the ocean
  //By Default, an error is taken to mean ISS is over Ocean

  //Object to hold ISS Location Data
  let ISSLocationObject;

  //populate elements in page with ISS Location
  let IssOverCountry = document.getElementById("IssOverCountry");

  let ISSLocation = fetch(
    "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
      ISSDataObject.iss_position.latitude +
      "&lon=" +
      ISSDataObject.iss_position.longitude
  )
    .then(function (response) {
      response.json().then((jsonData) => {
        ISSLocationObject = jsonData;
        try {
          let ISSCountryName = ISSLocationObject.address.country;

          if (ISSCountryName == "undefined") {
            IssOverCountry.textContent = "ISS Location: Unknown Country";
          } else {
            IssOverCountry.textContent = "ISS Location: " + ISSCountryName;
          }
        } catch (error) {
          //API returns an error if ISS is currently over an ocean or large body of water
          IssOverCountry.textContent = "ISS Location: Over Water";
        }
      });
    })
    .catch(function (error) {
      console.error("Error Retrieving ISS Location");
      console.log(error);
    });
}

/*
Function used to retrieve number of people in Space
*/

function retrieveNumberOfPeopleInSpace() {
  //Object to hold Poeple in Space Data
  let peopleInSpaceObject;

  //populate element in page holding number of people in Space
  let peopleInSpace = document.getElementById("peopleInSpace");

  let peopleInSpaceRequest = fetch("http://api.open-notify.org/astros.json")
    .then(function (response) {
      response.json().then((jsonData) => {
        peopleInSpaceObject = jsonData;
        peopleInSpace.textContent =
          "People in Space: " + peopleInSpaceObject.number;
      });
    })
    .catch(function (error) {
      console.error("Error Retrieving Number of People In Space");
      console.log(error);
    });
}

//########################################################
//BATTERY PERCENTAGE OF CURRENT DEVICE
//########################################################

/*
Function used to retrieve battery percentage of current device and update opacity of 
battery element background according to battery percentage 
Note: Does not use any API's - Extra Feature for Lab
*/
function updateBatteryLevelOfDevice() {
  ////populate element in page holding battery percentage

  let batteryLevel = document.getElementById("batteryLevel");

  try{
  navigator.getBattery().then(function (battery) {
    batteryLevel.textContent = "Battery Level: " + battery.level * 100 + "%";

    //update background colour of batteryLevel element 
  let batteryBackgroundString = "background:rgb(21, 21, 21, " +battery.level +");"
  batteryLevel.setAttribute("style", batteryBackgroundString);
  });
}catch(error){
  console.error("Error Retrieving Current Battery Level of Device")
  console.log(error);

}

  
}
