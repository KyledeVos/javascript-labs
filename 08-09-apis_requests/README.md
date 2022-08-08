# API PAGE LAB - Coding Nomads JavaScript 101
# Time and Location Data using User IP Address

## Description

The purpose of this lab is to use a series of API's to retrieve data and then display this information on a single webpage. 

### Required Information (Features of Project)

#### Use of current user's IP Address to find current location and display:
- Country 
- Country Code
- Region
- Region Bloc
- City 
- Latitude and Longitude
- Population Number of Country
- Languages spoken in country 
- Current Time
- Timezone
- Sunrise, Sunset and Length of Day
- Display the flag of the current location country
- Change background colors dependent on the time of day (sunrise, day, sunset and night)

#### The webpage needed to also display information about the ISS:
- Time of next ISS flyover
- Number of People currently in space

**Note on ISS Features:**
The Lab Brief supplied an API for the ISS Information as:
http://open-notify.org.

However this API (at the time of project creation and writing of this README) has disabled the feature to retrieve the time and date of the ISS Flyovers. Other API's were checked but none were found to provide this information. An alternative would be to perform the calculations manually, however these were incredibly complicated and deemed to not meet lab requirements as the goal was to retrieve information with the use of APIs; not perform the calculations at that scale ourselves

#### Alternative to ISS Flyover Times:
- Latitude and Longitude of current ISS Location
- Name of country (or body of water (non specific)) that ISS is currently over

### Personal Additions and Goals:
The structure and layout of the webpage was not specified by the lab brief. It was decided to model the webpage as a modern smartwatch as this is a creative manner in which to display the required features whilst maintaining a familiar style for a user to easily read the information

An additional feature to display the battery level was also added. It was also decided to use this lab to practice adding images to a webpage 

## Features and Visuals

The features described in the above description have all been implemented in the webpage and are described in more detail here

1) The computer's IP address is used to retrieve location information of the current user. The IP is requested once upon startup of the page and location data is refreshed every 20 minutes to maintain accuracy for users that may be travelling. 

2) The time zone of the user's location is used to fetch the user's current time which is refreshed every 10 seconds to maintain maximum accuracy. The User's latitude and longitude is used to determine the Sunrise and Sunset Times for that location from a different API. The returned JSON file gives the times in "EPOCH" format used to determine the length of the day and is refreshed every 30 minutes

3) Information for the ISS is retrieved from the above mentioned API combined with an additional API to determine its location using its latitude and longitude. If the ISS is over a body of water the webpage will display: "Over Water". The ISS infromation is refreshed every 5 seconds due to the high speed of travel it has.

4) The Battery level is retrieved from the 'Navigator" and updated every 30 seconds to maintain high accuracy especially if the computer is being used heavily and not plugged in 

5) The feature to update the Time-Of-Day Image and outline color of the watch is updated every three seconds to maintain accuracy with the current time. This feature does not directly rely on a recall of an API but does use information received from earlier (and updated) returned JSON files

## Images Used

The images contained within the "Images" Directory in this repository (used or not used in the project) were all downloaded from "https://unsplash.com/". This is a free and non-copyright website allowing for the use of images freely further supported with their message: **The internet’s source of freely-usable images.**

In addition, the images used are for the sole purpose of demonstration in this lab for submission. This webpage and the images it contains are not intended to be used for any commercial usage or gain

## Installation

Clone this repository using: 

```bash
git clone https://github.com/KyledeVos/javascript-labs/tree/master/08-09-apis_requests
```

Select HTML File: **"APIPage"** and open in Google Chrome Browser

**NOTE:**
In testing it was found that the images used in the webpage did not load when APIPage was opened in Microsoft Edge and it is therefore recommended to use Google Chrome for full functionality 


## Usage

This program will display, load and update all information automatically. As it relies on repeated calls to API's, a user will need a good, stable internet connection to ensure the data shown is accurate and up to date.

Errors are handled and can be seen by the user in the console

This program does not have any options for user input to the webpage 
