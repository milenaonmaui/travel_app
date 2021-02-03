/* Global Variables */
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
console.log("App.js loaded")
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = month[d.getMonth()]+' '+ d.getDate()+','+ d.getFullYear();
const buttonInfo = document.getElementById('getInfo');
const buttonSave = document.getElementById('saveTrip');

const handleSubmit = (e) => {
    console.log("In handle submit")
    e.preventDefault();
    const destCity = document.getElementById('dest').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value
    postData('/tripData', {dest: destCity, start: startDate, end: endDate})
        .then(function(response){
            console.log(response);
            showCurrentTrip(response)
        })
    
}

const handleSave = (e) => {
    console.log("In handle save")
    e.preventDefault();
    postData('/saveTrip', {})
        .then(function(response){
            console.log(response);
        })
    
}


const postData = async(url='', data = {}) => {
    console.log('In postData')
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        return newData
    } catch(error) {
        console.log(error)
    }
}

const getTrips = async() => {
    console.log("insode getTrips")
    const request = await fetch('/trips')
    try {
        const response = await request.json();
        console.log("Data response ", response)
        return response;
    } catch(error) {
        console.log("Error getting data from server ", error)

    }
}

const updateExistingTrips = () => {
    getTrips()
    .then(data => data.forEach(trip => createTripCard(trip)))
}

const createTripCard = (trip) => {
    let container = document.getElementById('trips');

    let tripDiv = document.createElement("div");
    tripDiv.innerHTML = "<div class=\"card\">"+ trip.dest +"</div>" 
    container.appendChild(tripDiv);
}


const showCurrentTrip = (data={}) => {
    console.log("UI data", data)
    document.getElementById('heading').innerHTML = `<p>My <b>${data.length}-day</b> trip to <b> ${data.dest}</b>:</p>`;
    document.getElementById('dates').innerHTML = `<p>From ${data.start} to ${data.end} </p>` ;
    document.getElementById('weather').innerHTML = `<p>Expected weather ${data.weather.description}, temperature between ${data.min_temp} and ${data.max_temp}</p>`;
    
}

const clearForm = () => {
    //clear entry values so user can initiate another call
    document.getElementById('dest').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
}


window.addEventListener('load', updateExistingTrips)
buttonInfo.addEventListener('click', handleSubmit);
buttonSave.addEventListener('click', handleSave)
