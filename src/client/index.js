import {
    getTrips,
    updateExistingTrips,
    clearCurrentTrip,
    createTripCard,
    showCurrentTrip,
    clearForm,
    numDaysBetween} from './js/app'

import { handleSubmit, handleSave, handleCancel, postData } from './js/formHandlers'
import './styles/style.scss'
import './styles/base.scss'
import './media/loader.gif'

const buttonInfo = document.getElementById('getInfo');
const buttonSave = document.getElementById('saveTrip');
const buttonCancel = document.getElementById('cancelTrip');
        
window.addEventListener('load', updateExistingTrips)
buttonInfo.addEventListener('click', handleSubmit);
buttonSave.addEventListener('click', handleSave)
buttonCancel.addEventListener('click', handleCancel)

export {
    getTrips,
    updateExistingTrips,
    clearCurrentTrip,
    createTripCard,
    showCurrentTrip,
    clearForm,
    numDaysBetween,
    handleSubmit, 
    handleSave, 
    handleCancel, 
    postData, 
}