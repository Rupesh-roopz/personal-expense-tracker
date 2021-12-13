const { dateComparision } = require('../dateComparision');

const searchValidation = ( req) => {
    const error = {};

    const { fromDate, endDate } = req;
    if(dateComparision(fromDate, endDate) === 0) {
        error.dateError = {
            errorMessage : 'Please input date correctly'
        }
    }

    return error;
}

module.exports = { searchValidation }