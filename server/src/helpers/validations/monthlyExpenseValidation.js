const { month } = require('../dateToMonthConverter');

const monthlyExpenseValidation = (req) => {
    const error = {};
    const { monthStartingDate, monthlyEarnings,
        monthlyExpense, monthlyBalance } = req;

    const userSelectedMonth = month(monthStartingDate);
    let currentMonth = new Date().getMonth() + 1;
    console.log(userSelectedMonth)

    if(!(currentMonth === userSelectedMonth)) {
        error.DateError = {
            errorMessage : 'Please select a date from current month'
        }
    }
    
    return error;
}

module.exports = { monthlyExpenseValidation };