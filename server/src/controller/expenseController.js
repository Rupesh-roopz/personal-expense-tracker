const db = require('../utils/db');
const { QueryTypes }  = require('sequelize');
const MonthlyExpense = require('../models/monthlyExpensesModel');
const { monthlyExpenseValidation } = require('../helpers/validations/monthlyExpenseValidation');
const http = require('../constants/http');

const isCurrentMonthExist = async (req, res) => {
    let currentMonth =  new Date().getMonth() +1;
    const userID = req.userID;

    const sql = `SELECT userID,month FROM monthlyexpenses WHERE userID = "${userID}" AND month = "${currentMonth}"`
    await db.query(sql, { plain: true, raw: false, type: QueryTypes.SELECT })
            .then(result => {
                if (result === null) 
                    return res.status(http.NO_CONTENT).json({message : 'current month data not found'})
                return res.status(http.SUCCESS);
            })
            .catch((err) =>{
                 console.log(err);
                 res.status(http.INTERNAL_SERVER_ERROR);
                })
}

const monthlyExpense = async (req, res) => {
    const { monthStartingDate, monthlyEarnings,
        monthlyExpense, monthlyBalance } = req.body;

    let currentMonth =  new Date(monthStartingDate).getMonth();
    const userID = req.userID;
    const error = await monthlyExpenseValidation(req.body);
                if(Object.keys(error).length) {
                    console.log(error);
                    return res.status(http.BAD_REQUEST).json({ error });
                }
                
                const newMonthlyData = MonthlyExpense.build({
                    userID,
                    month : currentMonth,
                    monthStartingDate, monthlyEarnings, monthlyExpense, monthlyBalance
                })
                newMonthlyData.save()
                    .then(() => {
                        console.log("data added");
                    })
                    .catch(err => console.log(err));
}

module.exports = { monthlyExpense, isCurrentMonthExist }