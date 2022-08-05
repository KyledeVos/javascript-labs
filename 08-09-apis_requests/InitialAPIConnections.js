//1) Retrieve Computer's public IP Address

let myIpAddress;

let myIp = fetch("https://api.ipify.org?format=json")
.then((response)=>{
    response.json().then(jsonData=>{
       myIpAddress = jsonData;
    })
})

console.log(myIpAddress.ip);

//2)
//##########GEOLOCATE WITH IP##############

//https://ipapi.co/

let myCountryData;

let countryData = fetch("https://ipapi.co/"+myIpAddress.ip+"/json/");
countryData.then(function(response) {
    response.json().then(jsonData => {
      myCountryData = jsonData;
    });
  })
  .catch(function(error) {
    console.log(error)
  });

  //gives: country, region, city, latitude and longitude and time zone
  //country code, population, country area, country calling code

  //3)
  //##Flag of Country

  //will be used as img src in HTML
  let myCountryFlagSrc = "https://countryflagsapi.com/png/"+ myCountryData.country_code;

  //4) Current Time
  //http://worldtimeapi.org/api/timezone/Africa/Johannesburg

  let myCountryTime;

  let countryTime = fetch("https://worldtimeapi.org/api/timezone/"+ myCountryData.timezone);
  countryTime.then(function(response) {
    response.json().then(jsonData => {
      myCountryTime = jsonData;
    });
  })
  .catch(function(error) {
    console.log(error)
  });
 


  //myCountryTime.datetime = 2022-07-26T13:18:46.438082+02:00;  Type = String

  //5) Sunrise and Sunset Times


  let mySunrise;

  let sunRise = fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=...");
  sunRise.then(function(response) {
    response.json().then(jsonData => {
      mySunrise = jsonData;
    });
  })
  .catch(function(error) {
    console.log(error)
  });

  //6)
  //ISS Data

  //Current Position of ISS Station
  //Project has required the next ISS pass time using api.open-notify.org, however the API feature has been turned off
  // by the author. All other researched options all use this same API, or require incredibly complicated calculations 
  //which lack accuracy as the flight path, altitude and speed of the ISS are not constant. The use of these calculations
  //is thought to be beyond the scope of this lab, considering the objective is to use API's to retrieve the required information 


  //Personal Change - In order to still have an ISS element, this project will retrieve the co-ordinates of the ISS 
  //Space Station and use it to dispaly which country it is currently over 
  let responded;

  let ISsData = fetch("http://api.open-notify.org/iss-now.json");
  ISsData.then(function(response) {
    response.json().then(jsonData => {
      responded = jsonData;
    });
  })
  .catch(function(error) {
    console.log(error)
  });


  //to retrieve current country (or ocean) ISS is Flying Over:
  let currentCountryUnderISS;

  let x = fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-26.3811&lon=27.8376");
  x.then(function(response) {
    response.json().then(jsonData => {
      currentCountryUnderISS = jsonData;
    });
  })
  .catch(function(error) {
    console.log(error)
  });

  //will return an error if ISS is over an ocean (not a defined country) 

 
//Number of people in space

let peopleInSpaceObject;

let peopleInSpace = fetch("http://api.open-notify.org/astros.json");
peopleInSpace.then(function(response) {
  response.json().then(jsonData => {
    peopleInSpaceObject = jsonData;
  });
})
.catch(function(error) {
  console.log(error)
});


/*Extra - Battery Percentage*/

navigator.getBattery()
  .then(function(battery) {
    console.log(battery.level);
});


/*Holding - Delete Me

let myCountryData;
let myIAddress;

try{
let countryData = fetch("https://ipapi.co/"+myIAddress.ip+"/json/")
.then(function(response) {
    response.json().then(jsonData => {
      myCountryData = jsonData;
    });
  })}
  catch(error) {
    console.log(error)
  };

*/


