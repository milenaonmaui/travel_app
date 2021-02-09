# My Travel Application

## Description

A web application that allows users to enter a destination city, start and end of trip dates  
and get an image of the city and 16-day weather forecast. 
Uses the [Geonames API](https://www.geonames.org) to find latitude and longitude of the location. After that calls the 
[Weatherbit API] (https://www.weatherbit.io/api/weather-forecast-16-day) to get 16-day forecast for the location. Finally, it uses [Pixabay] (www.pixabay.com) to get an image. Allows the user the save the trip in the list of existing trips.

## Technologies Used

HTML, CSS, Java Script, Webpack, SASS, Babel, Express, Node.js, Service Workers

## Instructions

Download the project files, run `npm install`, start the express server (runs on port 8081) by running `npm start` 
and launch `https://localhost:8000` in the browser. Enter city name and start and end dates and lick on Get Trip Info button.

## Additional functionality from the rubric:

    1. Add end date and display length of trip.
    2. Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
    3. Instead of just pulling a single day forecast, pull the forecast for multiple days.

