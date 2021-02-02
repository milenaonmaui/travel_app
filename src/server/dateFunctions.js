const getNextDay = (dateStr) => {
    let date = new Date(dateStr);
    let currDate = date.getDate();
    date.setDate(currDate + 1)
    return date.toISOString().split("T")[0]
}

const getLastYear = (dateStr) => {
    let date = new Date(dateStr);
    date.setFullYear(date.getFullYear()-1)
    return date.toISOString().split("T")[0]
}

const numDaysBetween = (startDate, endDate) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate)
    return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)) ;
}

module.exports = {getNextDay, getLastYear, numDaysBetween}; 