const { dateComparision } = require('../manageDates');

const searchValidation = async (req) => {
    const { fromDate, endDate } = req;

    if(dateComparision(fromDate, endDate)) {
        throw ({errorMessage : 'Please input date correctly'});
    }
    return 1;
}

module.exports = { searchValidation }