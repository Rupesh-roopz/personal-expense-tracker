const { ExpenseData, Date } = require('../models');
const { month, presentMonth } = require('./manageDates');

const isCurrentMonth = async (id, user_id) => {
	await ExpenseData.findOne({
		where : { id, user_id },
		include : {
			model : Date,
		}
	})
		.then(data => {
			const result = JSON.stringify(data, null, 2);
			const parsedResult = JSON.parse(result);
			const date = parsedResult.Date.date;

			const currentMonth = presentMonth();
			const selectedMonth = month(date);

			if(currentMonth !== selectedMonth)
				throw ({ 
					errorMessage : 'current month expenses can only be change' 
				});
			return;
		})
		.catch(err => {
			throw err;
		});
	return 1;
};

module.exports = { isCurrentMonth };