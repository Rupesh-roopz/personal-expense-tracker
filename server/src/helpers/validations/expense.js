const { presentMonth, month } = require('../manageDates');

const expenseFormValidation = async (req) => {
	const { amount, date } = req;
	const currentMonth = presentMonth();
	const selectedMonth = month(date);

	if(currentMonth !== selectedMonth)
		throw ({ errorMessage : 'choose date from current month' });
	if(amount <= 0) 
		throw { errorMessage : 'Please enter minimum amount' };
    
	return 1;
};

module.exports = { expenseFormValidation };