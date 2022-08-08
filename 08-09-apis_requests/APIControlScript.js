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

//__________________________________________________
//API calls that do not rely on user Location Data
//__________________________________________________

//update Battery Percentage every 30 seconds
window.setInterval(updateBatteryLevelOfDevice, 30 * 1000);

//update ISS Latitude, Longitude and Location every 5 seconds
window.setInterval(retrieveIssLatitudeAndLongitude, 5000);

//__________________________________________________
//API calls that rely on user Location Data
//__________________________________________________

//If so, call functions for other API's, if not then do not make calls (do nothing)

//update Current Location Data and Current Time Every 20 minutes
window.setInterval(retrieveUserIp, 20 * 60 * 1000);

//update Current Time every 10 seconds
window.setInterval(retrieveTimeData, 10 * 1000);

//update sunrise,sunset and day length every 30 minutes
window.setInterval(retrieveSunData, 30 * 60 * 1000);

 //update day of time image and page colours according to time of day every 3 seconds
 window.setInterval(updateTimeofDayImageandPageColors,3*1000);

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
      console.error("Error Retrieving UserIp");
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
//NOTE: API allows a max of 1000 calls per 24 hour cycle - if exceed if will return undefined
*/
function retrieveUserLocationData() {
  let locationObject = fetch("https://ipapi.co/" + userIPAddress + "/json/")
    .then(function (response) {
      response.json().then((jsonData) => {
        userLocationData = jsonData;

        //check that max API calls (1000 per 24 hrs) has not been exceeded
        if (userLocationData.country != "undefined") {
        }
        populateLocationDataElements();
        retrieveSunData();
        retrieveTimeData();
        
      });
    })
    .catch(function (error) {
      console.error("Error Retrieving User Location Data");
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
    console.error("Error Retrieving Flag Image");
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
      console.error("Error Retrieving Current Time and Time Zone Data");
      console.log(error);
    });
}

//########################################################
//Sunrise, Sunset and Day Length
//Contains function to modify time of day image and colours of page
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
      "?key=YQ2LR6U9WD36VXQJQYWAFSQTD"
  )
    .then(function (response) {
      response.json().then((jsonData) => {
        userSunDataObject = jsonData;
        populateSunriseAndSunsetTimes();
        dayLengthCalculator(
          userSunDataObject.currentConditions.sunriseEpoch,
          userSunDataObject.currentConditions.sunsetEpoch
        );
      });
    })
    .catch(function (error) {
      console.error("Error Retrieving Sunrise and Sunset Data");
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

//HELPER FUNCTION
//used to calculate the time difference between the sunrise and sunset times
//using their epoch time values
function dayLengthCalculator(sunriseEpochTime, sunsetEpochTime) {
  //calculate time difference between sunrise and sunset
  let timeDifference = sunsetEpochTime - sunriseEpochTime;

  //convert Epoch Time to Hours and Minutes
  let totalMinutes = 0;
  let hours = 0;
  let minutes = 0;

  totalMinutes = Math.trunc(timeDifference / 60); //remove seconds
  hours = Math.trunc(totalMinutes / 60);
  minutes = totalMinutes - hours * 60;

  //update dayLength Element with hours and minutes for length of day
  document.getElementById("dayLength").textContent =
    "Day Length: " + hours + "hrs, " + minutes + "mins";
}

/*
Function to update day image and watch border using time periods as:
Sunrise, Day Time, Sunset and Night
//Called every 2 seconds
*/
function updateTimeofDayImageandPageColors() {

  //retrieve current time of day, sunset and sunrise times as epoch times
try{
  let currentTime =userTimeData.unixtime;
  let sunriseTime= userSunDataObject.currentConditions.sunriseEpoch;
  let sunsetTime = userSunDataObject.currentConditions.sunsetEpoch

  if(currentTime!=null && sunriseTime!=null && sunsetTime!=null){
    
  //Conditions for Each Image
  //1) Night -    Current Time is less than 1 hour before sunrise time
  //2) Sunrise -  Current Time is within 1 hour before and one hour after sunrise Time
  //3) Day -      Current Time is within one hour after sunrise and one hour before sunset
  //4) Sunset -   Current Time  is within one hour before and one hour after sunset time

  let timeOfDayImageBackground = document.getElementById(
    "timeOfDayImageBackground"
  );

  //Sunrise Period
  if (
    currentTime == sunriseTime ||
    (currentTime >= sunriseTime - 3600 && currentTime <= sunriseTime + 3600)
  ) {
    timeOfDayImageBackground.setAttribute("src", "./Images/sunriseThree.avif");
    watchMainBackground.setAttribute("style", "outline: rgb(255,103,0) solid 0.4rem;")
    

    //Day Period
  } else if (
    currentTime > sunriseTime + 3600 &&
    currentTime < sunsetTime - 3600
  ) {
    timeOfDayImageBackground.setAttribute(
      "src",
      "./Images/dayBackgroundImage.avif"
    );
    watchMainBackground.setAttribute("style", "outline: rgb(135,206,235) solid 0.4rem;")

    //Sunset Period
  } else if (
    currentTime == sunsetTime ||
    (currentTime >= sunsetTime - 3600 && currentTime <= sunsetTime + 3600)
  ) {
    timeOfDayImageBackground.setAttribute(
      "src",
      "./Images/SunsetBackground.jpg"
    );
    watchMainBackground.setAttribute("style", "outline: rgb(255,103,0) solid 0.4rem;")

    //Night Period
  } else {
    timeOfDayImageBackground.setAttribute(
      "src",
      "./Images/nightBackground.avif"
    );
    watchMainBackground.setAttribute("style", "outline: rgb(47, 6, 89) solid 0.4rem;")
  }

  }else{
    console.error("Error Retrieving Current Time, Sunrise and/or Sunset Time(s)")
  }

}catch(error){
  console.error("Error Updating Images and Colors for Time of Day")
  console.log(error);
}

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

  try {
    navigator.getBattery().then(function (battery) {
      batteryLevel.textContent = "Battery Level: " + battery.level * 100 + "%";

      //update background colour of batteryLevel element
      let batteryBackgroundString =
        "background:rgb(21, 21, 21, " + battery.level + ");";
      batteryLevel.setAttribute("style", batteryBackgroundString);
    });
  } catch (error) {
    console.error("Error Retrieving Current Battery Level of Device");
    console.log(error);
  }
}
