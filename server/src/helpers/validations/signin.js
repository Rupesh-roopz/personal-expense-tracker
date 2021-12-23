const regex = require('../../constants/regex');

const signinValidation = async (req) => {
    const {email, password } = req.body;
    const emailRegx = regex.EMAIL;
    
    if(email.trim() === '' || !(emailRegx.test(email))) {
        throw ({ errorMessage : 'Please enter a valid Email'})
    }
    if(password.trim() === '') {
        throw ({errorMessage : 'Please enter password'})
    }

    return 1;

}

module.exports = { signinValidation }