//variable to hold user IP Address
let userIPAddress = "";

//Retrieve User IP Address
//If Promise is fulfilled then UserIPAddress will hold the IP Address of the current, local machine
//If Promise is rejected then userIPAddress will contain the string "error"
function retrieveUserIp() {
  let UserIPObject = fetch("https://ip.seeip.org/json")
  .then((response)=>{
      response.json().then(jsonData=>{
        userIPAddress = jsonData.ip;
      })
  })
  .catch((error)=>{
    console.log("Error Retrieving UserIp");
    userIPAddress = "error";
  })
}


//variable to hold user IP Address
let userLocationDataObject ="";

//Retrieve User location data

