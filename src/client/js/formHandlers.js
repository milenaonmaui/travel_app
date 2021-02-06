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

export {
    handleSubmit,
    handleSave,
    handleCancel
}