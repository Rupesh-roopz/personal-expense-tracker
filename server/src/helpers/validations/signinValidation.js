const regex = require('../../constants/regex');

const signinValidation = (req) => {
    const {email, password } = req.body;
    const error = {};
    const emailRegx = regex.EMAIL;
    
    if(!(emailRegx.test(email))) {
        error.emailError = {
            errorMessage : 'Please enter a valid Email'
        }
    }
    if(password.trim() === '') {
        error.passwordError = {
            errorMessage : 'Please enter password'
        }
    }
    
    return error;

}

module.exports = { signinValidation }