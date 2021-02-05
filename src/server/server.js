// Setup empty JS object to act as endpoint for all routes
require('dotenv').config();
const fs = require('fs');
let rawdata = fs.readFileSync('src/server/tripData.json')
let tripData = JSON.parse(rawdata)
console.log("Loaded ", tripData)
const GEOUSER = process.env.GEOUSER;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY
const {numDaysBetween} = require('./dateFunctions.js')
const currentTrip = {};

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


app.get('/trips', (req, res) => res.send(tripData))

app.post('/tripData', (req,res) => {
    const dest = req.body.dest;
    const startDate = req.body.start;
    currentTrip.dest = dest;
    currentTrip.start = startDate;
    currentTrip.end = req.body.end;
    currentTrip.length = numDaysBetween(currentTrip.start, currentTrip.end)
   
    getImage(dest)
        .then(image => {
            currentTrip.image = image;
            getDataFromGeoNames(GEOUSER, dest)
            .then(coord => {
                if (coord.error){
                    res.send({error: coord.error})
                }
                getWeatherData(coord.lat, coord.lng, WEATHERBIT_KEY)
                .then(json => {
                    currentTrip.max_temp = json.data[0].max_temp;
                    currentTrip.min_temp = json.data[0].min_temp;
                    currentTrip.weather = json.data[0].weather;
                    res.send(currentTrip);
                
                })
            }) 
            
        })       
})

app.post('/saveTrip', (req, res) => {
    console.log("In saveTrip", req.body)
    tripData.push(currentTrip);
    //show only last 5 trips
    if (tripData.length > 5) tripData.pop();
    let data = JSON.stringify(tripData)
    try {
        fs.writeFileSync('src/server/tripData.json', data);
        console.log("File write success ", data)
    } catch (err) {
        console.log("Error writing to file", err.message)
    }    
    res.send(currentTrip)
})


const getDataFromGeoNames= async (username,city)=>{
    const url=`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
    try{
        const response = await fetch(url)
        const json = await response.json()
        if (json.totalResultsCount) {
            return {
                lat: json.geonames[0].lat,
                lng: json.geonames[0].lng
            } 
        } else {
            console.log(json)
            return {
                error: "City not found"
            }
        }
    } catch(e){
        console.log(e);
    }
}

const getWeatherData = async(lat, lng, WEATHERBIT_KEY) =>{ 
    //https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=I&key=${WEATHERBIT_KEY}`;
    try {
        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.log(error);
    }   
}

const getImage = async(dest) => {
    //https://pixabay.com/api/?key=20130794-3ea02eacf45d71ad7afb2bde0&q=Sofia&image_type=photo&pretty=true
    const url = "https://pixabay.com/api/?key="+ PIXABAY_API_KEY+"&q="+dest+ '&image_type=photo&pretty=true';
    try{
        const response = await fetch(url)
        const json = await response.json();
        if (parseInt(json.totalHits) > 0)
            return json.hits[0].webformatURL;
        else
            console.log('No hits');
    } catch(e){
        console.log(e);
    }

}