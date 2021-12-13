const { sequelize, Sequelize } = require('../../models');

const expenseFormValidation = async (req) => {
    const error = {};
    const { amount, paymentMethod, category } = req;
    console.log(category)
    const sql =`SELECT id FROM categories WHERE categoryName="${category}";`;
    await sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
        .then((result) => {
           if(result === null) {
                error.categoryError = {
                    errorMessage : 'Please select a valid category'
                }

                return error;
           }
           if(amount <= 0) {
                error.minimumAmountError = {
                    errorMessage : 'Please input minimum amount'
                }
           }
           console.log((paymentMethod !== 'debit card') && (paymentMethod !== 'credit card') && ( paymentMethod !== 'cash'))
           if((paymentMethod !== 'debit card') && (paymentMethod !== 'credit card') && ( paymentMethod !== 'cash')) {
            error.paymentMethodError = {
                errorMessage : 'Please select a valid payment meathod'
            }
       }
        })
        .catch((err) => console.log(err))
    console.log(error)
    return error;
}

module.exports = { expenseFormValidation }