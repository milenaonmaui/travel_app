
import 'regenerator-runtime/runtime';

// Load list of trips from server
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

//Create trip card for each trip
const updateExistingTrips = () => {
    Client.getTrips()
    .then(data => data.forEach(trip => createTripCard(trip)))
}

//Clear the diplayed current trip when the user clicks on cancel
const clearCurrentTrip = () => {
    document.getElementById('image').innerHTML = "";
    document.getElementById('heading').innerHTML = "";
    document.getElementById('dates').innerText = "";
    document.getElementById('weather').innerText = "";
    document.getElementById('dest').value = "";
    document.getElementById('startDate').value = "";
    document.getElementById('endDate').value = "";
    document.getElementById('saveTrip').setAttribute('hidden', true)
    document.getElementById('cancelTrip').setAttribute('hidden', true)
}

//create trip card from trip data in json format
const createTripCard = (trip) => {
    let d = new Date();
    let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();
    let container = document.getElementById('existingTrips');
    let daysAway = Client.numDaysBetween(newDate, trip.start)
    let tripDiv = document.createElement("div");
    tripDiv.innerHTML = 
    `<article class="card">
            <img src="${trip.image}" alt=${trip.dest}>
            <div class = "summary">
              <h3><b>Trip to ${trip.dest}</b> is ${daysAway} days away</h3>
              <h4>From ${trip.start} to ${trip.end}, ${trip.length} days long</h4>
              <p>Expected weather: ${trip.weather.description}</p>
              <p>Temperature between ${trip.min_temp} and ${trip.max_temp}</p>
            
            </div> 
    </article>`
    container.insertBefore(tripDiv, container.firstChild)
}

//display the data passed to the function in json in div#currentTrip
const showCurrentTrip = (data={}) => {
    console.log("UI data", data)
    if (data.error) {
        document.getElementById('heading').innerHTML = `<b>${data.error}</b>:`;
    } else {
        document.getElementById('image').innerHTML = `<img class="currImage" src="${data.image}" alt=${data.dest}>`
        document.getElementById('heading').innerHTML = `<b>${data.length}-day</b> trip to <b> ${data.dest}</b>:`;
        document.getElementById('dates').innerText = `From ${data.start} to ${data.end}` ;
        document.getElementById('weather').innerText = `Expected weather: ${data.weather.description}, temperature between ${data.min_temp} and ${data.max_temp}`;
        document.getElementById('saveTrip').removeAttribute('hidden')
    }
    document.getElementById('cancelTrip').removeAttribute('hidden')
    
}

//clear entry values so user can initiate another call
function clearForm() {
    document.getElementById('dest').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
}

//Helper - calculate number od days between two dates
const numDaysBetween = (startDate, endDate) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate)
    return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)) ;
}

export {
    getTrips,
    updateExistingTrips,
    clearCurrentTrip,
    createTripCard,
    showCurrentTrip,
    clearForm,
    numDaysBetween
}


