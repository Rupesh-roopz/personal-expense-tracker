const { presentMonth, month } = require('../manageDates');

const expenseFormValidation = async (req) => {
	const { amount, date } = req;
	if(amount <= 0) 
		throw { errorMessgae : 'Please enter minimum amount' };
    
	const currentMonth = presentMonth();
	const selectedMonth = month(date);

	if(currentMonth !== selectedMonth)
		throw ({ errorMessage : 'choose date from current month' });

	return 1;
};

module.exports = { expenseFormValidation };