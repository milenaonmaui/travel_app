/* Global Variables */
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
console.log("App.js loaded")
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = month[d.getMonth()]+' '+ d.getDate()+','+ d.getFullYear();
const buttonInfo = document.getElementById('getInfo');
const buttonSave = document.getElementById('saveTrip');
const buttonCancel = document.getElementById('cancelTrip');

const handleSubmit = (e) => {
    console.log("In handle submit")
    e.preventDefault();
    const destCity = document.getElementById('dest').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value
    let loader = `<img class="loading" src="./media/loader.gif" alt = "Loading">`;
    document.getElementById('heading').innerHTML = loader;
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
            createTripCard(response)
            clearCurrentTrip()
        })
        
    
}

const handleCancel = (e) => {
    e.preventDefault();
    clearCurrentTrip()
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
    console.log("inside getTrips")
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

const clearCurrentTrip = () => {
    document.getElementById('image').innerHTML = "";
    document.getElementById('heading').innerHTML = "";
    document.getElementById('dates').innerText = "";
    document.getElementById('weather').innerText = "";
    document.getElementById('dest').value = "";
    document.getElementById('startDate').value = "";
    document.getElementById('endDate').value = "";
    buttonSave.setAttribute('hidden', true)
    buttonCancel.setAttribute('hidden', true)
}

const createTripCard = (trip) => {
    let container = document.getElementById('existingTrips');

    let tripDiv = document.createElement("div");
    tripDiv.innerHTML = 
    `<article class="card">
            <img src="${trip.image}" alt=${trip.dest}>
            <div class = "summary">
              <h3><b>Trip to ${trip.dest}</b></h3>
              <h4>From ${trip.start} to ${trip.end}, ${trip.length} days long</h4>
              <p>Expected weather: ${trip.weather.description}</p>
              <p>Temperature between ${trip.min_temp} and ${trip.max_temp}</p>
            
            </div> 
    </article>`
    //container.appendChild(tripDiv);
    container.insertBefore(tripDiv, container.firstChild)
}


const showCurrentTrip = (data={}) => {
    console.log("UI data", data)
    if (data.error) {
        document.getElementById('heading').innerHTML = `<b>${data.error}</b>:`;
    } else {
        document.getElementById('image').innerHTML = `<img class="currImage" src="${data.image}" alt=${data.dest}>`
        document.getElementById('heading').innerHTML = `<b>${data.length}-day</b> trip to <b> ${data.dest}</b>:`;
        document.getElementById('dates').innerText = `From ${data.start} to ${data.end}` ;
        document.getElementById('weather').innerText = `Expected weather ${data.weather.description}, temperature between ${data.min_temp} and ${data.max_temp}`;
        buttonSave.removeAttribute('hidden')
    }
    buttonCancel.removeAttribute('hidden')
    
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
buttonCancel.addEventListener('click', handleCancel)
