// Setup empty JS object to act as endpoint for all routes
require('dotenv').config();
const fs = require('fs');
let rawdata = fs.readFileSync('src/server/tripData.json')
let tripData = JSON.parse(rawdata)
console.log("Loaded ", tripData)
const GEOUSER = process.env.GEOUSER;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY
const {getNextDay, getLastYear, numDaysBetween} = require('./dateFunctions.js')
console.log(numDaysBetween("2021-02-02", "2021-03-02"))

const fetch = require('node-fetch')
// Require Express to run server and routes
const express = require('express');
const path = require('path')
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('src/client'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('/client/views/index.html', { root: __dirname + '/..' })
})

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


app.get('/getCoord', function(req, res){
    getDataFromGeoNames('mkari', 'Kahului')
        .then(function(response){

            res.send(response)
        });
    
})

app.get('/trips', (req, res) => res.send(tripData)
)
//http://api.geonames.org/postalCodeSearchJSON?placename=Kahului&maxRows=10&username=mkari
//http://api.geonames.org/weatherJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=mkari
//http://api.geonames.org/findNearByWeatherJSON?lat=20.88953&lng=-156.478327&username=mkari
//https://api.weatherbit.io/v2.0/history/daily?lat=35.7796&lon=-78.6382&start_date=2021-01-29&end_date=2021-01-30&units=I&key=WEATHERBIT_KEY
app.post('/tripData', (req,res) => {
    const dest = req.body.dest;
    const startDate = req.body.start;
    //use next day as end date since the free API historical data is limited to 1-day period
    const lastYearStart = getLastYear(startDate)
    const lastYearEnd = getNextDay(lastYearStart);
    console.log("Call API with dates ", lastYearStart, lastYearEnd)
    getDataFromGeoNames(GEOUSER, dest)
        .then(res => getWeatherData(res.lat, res.lng, lastYearStart, lastYearEnd, WEATHERBIT_KEY))
        .then(json => res.send(json))
    
})

app.post('/addData', (req, res) => {
    console.log("In addData ", req.body)
    const newTrip = {
        dest: req.body.dest,
        start: req.body.start,
        end: req.body.end,
        weather: req.body.weather
    }
    tripData.push(newTrip);
    let data = JSON.stringify(tripData)
    try {
        fs.writeFileSync('src/server/tripData.json', data);
        console.log("File write success ", data)
    } catch (err) {
        console.log("Error writing to file", err.message)
    }
    
    res.send(tripData)
})


const getDataFromGeoNames= async (username,city)=>{
    const url=`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
    try{
        const response = await fetch(url)
        const json = await response.json()
        return {
            lat: json.geonames[0].lat,
            lng: json.geonames[0].lng
        }
    } catch(e){
        console.log(e);
    }
}

const getWeatherData = async(lat, lng, startDate, endDate, WEATHERBIT_KEY) =>{ 
    const url = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lng}&start_date=${startDate}&end_date=${endDate}&units=I&key=${WEATHERBIT_KEY}`;
    try {
        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.log(error);
    }   
}