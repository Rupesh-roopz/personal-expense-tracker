const { monthDateFormat } = require('../dateFormat');

const monthlyExpenseValidation = async (req) => {
    const error = {};
    const { monthStartingDate, monthlyEarnings,
        monthlyExpense, monthlyBalance } = req;

    const date = monthDateFormat(monthStartingDate);
    let currentMonth = new Date().getMonth();
    const userSelectedMonth = new Date(date).getMonth() ;

    if(!(currentMonth === userSelectedMonth)) {
        error.DateError = {
            errorMessage : 'Please select a date from current month'
        }
    }
    
    return error;
}

module.exports = {monthlyExpenseValidation};