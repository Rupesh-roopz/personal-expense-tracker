const dateComparision =  (fromDate, endDate) => {
    const startingDate = new Date(fromDate);
    const endingDate = new Date(endDate);

    if(startingDate < endingDate) return 1;
    return 0;
     
}

module.exports = {dateComparision}
