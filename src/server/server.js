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


app.get('/getData', function(req, res){
    getWeatherData(baseURL, projectData.zip, API_KEY)
        .then(function(response){
            projectData.temp = response.list[0].main.temp;
            projectData.city = response.city.name;
            res.send(projectData)
        });
    
})

app.post('/addData', addData)

function addData(req, res) {
    
    projectData.zip = parseInt(req.body.zip);
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData)
}

const getWeatherData = async(baseURL, zip=90000, API_KEY) =>{ 
    const url = baseURL + zip + '&units=imperial&appid=' + API_KEY;
    try {
        const response = await fetch(url)
        const json = await response.json()
        return json;
    } catch (error) {
        console.log(error);
    }   
}