/* Global Variables */
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
console.log("App.js loaded")
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = month[d.getMonth()]+' '+ d.getDate()+','+ d.getFullYear();
const button = document.getElementById('getInfo');

const handleSubmit = (e) => {
    console.log("In handle submit")
    e.preventDefault();
    const destCity = document.getElementById('dest').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value
    postData('/tripData', {dest: destCity, start: startDate, end: endDate})
        .then(function(response){
            console.log(response)
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

const getData = async(url='', data={}) => {
    const request = await fetch(url)
    try {
        const response = await request.json();
        console.log("Data response ", response)
        return response;
    } catch(error) {
        console.log("Error getting data from server ", error)

    }
}

const getNextDay = (dateStr) => {
    let date = new Date(dateStr);
    let currDate = date.getDate();
    date.setDate(currDate + 1)
    return date.toISOString().split("T")[0]
}

const updateUI = (data={}) => {
    console.log("UI data", data)
    document.getElementById('date').innerHTML = `<b>City:</b> ${data.city}    <b>Date: </b> ${data.date}`;
    document.getElementById('temp').innerHTML = '<b>Temperature: </b>' + data.temp + '&deg' + 'F' ;
    document.getElementById('content').innerHTML = '<b>My feelings: </b>' + data.userResponse;
    //clear entry values so user can initiate another call
    document.getElementById('zip').value = '';
    document.getElementById('feelings').value = '';
}
button.addEventListener('click', handleSubmit);
