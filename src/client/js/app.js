
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
    let d = new Date();
    let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();
    let container = document.getElementById('existingTrips');
    let daysAway = numDaysBetween(newDate, trip.start)
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
getTrips

const showCurrentTrip = (data={}) => {
    console.log("UI data", data)
    if (data.error) {
        document.getElementById('heading').innerHTML = `<b>${data.error}</b>:`;
    } else {
        document.getElementById('image').innerHTML = `<img class="currImage" src="${data.image}" alt=${data.dest}>`
        document.getElementById('headigetTripsidden')
    }
    buttonCancel.removeAttribute('hidden')
    
}

const clearForm = () => {
    //clear entry values so user can initiate another call
    document.getElementById('dest').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
}

const numDaysBetween = (startDate, endDate) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate)
    return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)) ;
}

export {
    postData,
    getTrips,
    updateExistingTrips,
    clearCurrentTrip,
    createTripCard,
    showCurrentTrip,
    clearForm,
    numDaysBetween
}


