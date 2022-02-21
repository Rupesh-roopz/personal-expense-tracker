const categoryValidation = async (req) => {
	const { categoryName } = req;
    
	if((/\d/.test(categoryName)) || categoryName.trim() === '' ) {
		throw { errorMessage : 'Please enter category name' };
	}

	if(categoryName.trim().length < 4 || categoryName.trim().length>15) {
		throw { errorMessage : 'category name must be greater than 4 letters' };
	}

	return 1;
};

module.exports = { categoryValidation };