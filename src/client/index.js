import {
    postData,
    getTrips,
    updateExistingTrips,
    clearCurrentTrip,
    createTripCard,
    showCurrentTrip,
    clearForm,
    numDaysBetween} from './js/app'

import { handleSubmit, handleSave, handleCancel } from './js/formHandlers'
import './styles/style.scss'
import './styles/base.scss'

const buttonInfo = document.getElementById('getInfo');
const buttonSave = document.getElementById('saveTrip');
const buttonCancel = document.getElementById('cancelTrip');
        
window.addEventListener('load', updateExistingTrips)
buttonInfo.addEventListener('click', handleSubmit);
buttonSave.addEventListener('click', handleSave)
buttonCancel.addEventListener('click', handleCancel)

