const presentMonth = () => {
	return new Date().getMonth() + 1;
};

const dateComparision =  (fromDate, endDate) => {
	const startingDate = new Date(fromDate);
	const endingDate = new Date(endDate);

	if(startingDate > endingDate) 
		return 1;
	return 0;
     
};

const month =  (date) => {
	const dateFormat = 
        `${date.slice(0,4)},${date.slice(5,7)},${date.slice(8,11)}`;
	const month = new Date(dateFormat).getMonth() + 1;

	return month;
};

const getYear =  (date) => {
	const dateFormat = 
        `${date.slice(0,4)},${date.slice(5,7)},${date.slice(8,11)}`;
	const year = new Date(dateFormat).getFullYear();

	return year;
};

const currentDate = () => {
	const date = new Date().toLocaleDateString();
    const dateString = `${date.slice(6,10)}-${date.slice(3,5)}-${date.slice(0,2)}`;

	return dateString
}

module.exports = { presentMonth, dateComparision, month, currentDate, getYear };