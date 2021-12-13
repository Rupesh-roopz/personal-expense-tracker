const categoryValidation = (req) => {
    const { categoryName } = req;
    const error = {}
    console.log(categoryName)
    if(categoryName.trim() === '') {
        error.categoryNameError = {
            errorMessage : 'Please enter a valid categoryName'
        }
    }
    return error;
}

module.exports = { categoryValidation };