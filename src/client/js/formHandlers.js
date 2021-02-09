import 'regenerator-runtime/runtime';

//handle form submit, triggered on clicking the getInfo button
function handleSubmit(e) {
    e.preventDefault();
    const destCity = document.getElementById('dest').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value
    let loader = `<img class="loading" src="./media/loader.gif" alt = "Loading">`;
    document.getElementById('heading').innerHTML = loader;
    Client.postData('/tripData', {dest: destCity, start: startDate, end: endDate})
        .then(function(response){
            console.log(response);
            Client.showCurrentTrip(response);
        })
    
}

//handle click on Save trip button, post trip data to server and create new trip card
const handleSave = (e) => {

    e.preventDefault();
    Client.postData('/saveTrip', {})
        .then(function(response){
            Client.createTripCard(response);
            Client.clearCurrentTrip();
        })
        
    
}

const handleCancel = (e) => {
    e.preventDefault();
    Client.clearCurrentTrip();
}

//post trip data to server
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

export {
    handleSubmit,
    handleSave,
    handleCancel, 
    postData
}