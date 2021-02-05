
const numDaysBetween = (startDate, endDate) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate)
    return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)) ;
}

module.exports = {numDaysBetween}; 