const { sequelize, Sequelize } = require('../../models');
const regex = require('../../constants/regex');
const { month } = require('../dateToMonthConverter');

const signupValidation = async (req) => {
    const { firstName, lastName, dateOfBirth, profession,
         phoneNumber, email, password, reEnterPassword } = req.body;
    const error = {};
    const emailRegx = regex.EMAIL;
    const passwordRegx = regex.PASSWORD;

    const sql =`SELECT id FROM users WHERE email="${email}";`;
    await sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
        .then((result) => {
            if (result !== null) {
                error.userExists = {
                    errorMessage : 'User already exists'
                }
                return error;
            }
            if(firstName.trim() === '') {
                error.firstNameError = {
                    errorMessage : 'Please enter a valid Name'
                }
            }
            if(lastName.trim() === '') {
                error.lastNameError = {
                    errorMessage : 'Please enter a valid Name'
                }
            }
            if(profession.trim() === '') {
                error.professionError = {
                    errorMessage : 'Please choose this field'
                }
            }
            if (phoneNumber.length !== 10) {
                error.phoneNumberError = {
                    errorMessage : 'Please enter a valid mobile number',
                };
            }
            if(!(emailRegx.test(email))) {
                error.emailError = {
                    errorMessage : 'Please enter a valid Email'
                }
            }
            if(!(passwordRegx.test(password))) {
                error.emailPassword = {
                    errorMessage : 'please enter a strong password'
                }
            }
            if(reEnterPassword !== password) {
                error.passwordVerifyError = {
                    errorMessage : 'password must be same',
                };
            }
            const birthYear = month(dateOfBirth);
            let currentYear = new Date().getFullYear();

            if((birthYear+15) >= currentYear){
                error.age = {
                    errorMessage : 'Age must be greater than 15',
                };
            }
            
        })
        .catch((err) => console.log(err))
    return error;

}

module.exports =  { signupValidation }