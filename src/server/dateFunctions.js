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
module.exports = {getNextDay, getLastYear}; 