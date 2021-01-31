// Setup empty JS object to act as endpoint for all routes
require('dotenv').config()
const API_KEY = process.env.API_KEY
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='

projectData = {zip: 90000};
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
//http://api.geonames.org/postalCodeSearchJSON?placename=Kahului&maxRows=10&username=mkari
//http://api.geonames.org/weatherJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=mkari
//http://api.geonames.org/findNearByWeatherJSON?lat=20.88953&lng=-156.478327&username=mkari
app.post('/addData', addData)

function addData(req, res) {
    
    projectData.zip = parseInt(req.body.zip);
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData)
}

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

const getWeatherData = async(baseURL, zip=90000, API_KEY) =>{ 
    const url = baseURL + zip + '&units=imperial&appid=' + API_KEY;
    try {
        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.log(error);
    }   
}