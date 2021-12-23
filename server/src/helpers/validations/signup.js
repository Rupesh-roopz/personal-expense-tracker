const regex = require('../../constants/regex');
const { month } = require('../manageDates');

const userValidation = async (req) => {
	const { firstName, lastName, dateOfBirth, profession,
		phoneNumber, email, password, reEnterPassword, isAdmin } = req;
	const emailRegx = regex.EMAIL;
	const passwordRegx = regex.PASSWORD;
	console.log(isAdmin);
	if(firstName.trim() === '') {
		throw ({ errorMessage : 'Please enter a first name' });
	}
	if(lastName.trim() === '') {
		throw ({ errorMessage : 'Please enter a last name' });
	}
	if(profession.trim() === '') {
		throw ({ errorMessage : 'Please enter your profession' });
	}
	if(isAdmin === "" ) {
		throw ({ errorMessage : 'Please choose Admin field' });
	}
	if (phoneNumber.length !== 10) {
		throw ({ errorMessage : 'Please enter a valid mobile number' });
	}
	if(!(emailRegx.test(email))) {
		throw ({ errorMessage : 'Please enter a valid Email' });
	}
	if(!(passwordRegx.test(password))) {
		throw ({ errorMessage : 'please enter a strong password' });
	}
	if(reEnterPassword !== password) {
		throw ({ errorMessage : 'password must be same' });
	}

	const birthYear = month(dateOfBirth);
	let currentYear = new Date().getFullYear();

	if((birthYear+15) >= currentYear){
		throw ({ errorMessage : 'Age must be greater than 15' });
	}

	return 1;
};

module.exports =  { userValidation };