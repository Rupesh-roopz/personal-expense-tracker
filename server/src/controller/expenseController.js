const { MonthlyExpense, ExpenseData,
     Date, DailyExpense, Sequelize, sequelize } = require('../models');
const { month } = require('../helpers/dateToMonthConverter')
const { monthlyExpenseValidation } = require('../helpers/validations/monthlyExpenseValidation');
const { expenseFormValidation } = require('../helpers/validations/expenseDataValidation');
const http = require('../constants/http');

const isCurrentMonthExist = async (req, res) => {
    try{
        let currentMonth =  new Date().getMonth() +1;
        const id = req.userID;
        console.log(currentMonth);
        const sql = `SELECT id, month FROM monthlyexpenses WHERE user_id = "${id}" AND month = "${currentMonth}"`
        await sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
                .then(result => {
                    if (result === null) 
                        return res.status(http.NO_CONTENT).json({message : 'current month data not found'})
                    return res.status(http.SUCCESS).json('current month existed');
                })
                .catch((err) =>{
                    console.log(err);
                    res.status(http.BAD_REQUEST);
                    })
    } catch {
        res.status(http.INTERNAL_SERVER_ERROR);
    }
}

const monthlyExpense = async (req, res) => {
    try{
        const error = monthlyExpenseValidation(req.body);
    
        if(Object.keys(error).length) {
            console.log(error);
            return res.status(http.BAD_REQUEST).json({ error });
        }
    
        const { monthStartingDate, monthlyEarnings,
            monthlyExpense, monthlyBalance } = req.body;
        const currentMonth = month(monthStartingDate);
        const user_id = req.user_id;
        const newMonthlyData = MonthlyExpense.build({
            user_id,
            month : currentMonth,
            monthStartingDate, monthlyEarnings, monthlyExpense, monthlyBalance
        })
        newMonthlyData.save()
            .then((data) => {
                res.status(http.SUCCESS).json({data})
            })
            .catch(err =>{ 
                console.log(err)
            });
    } catch {
        res.send(http.INTERNAL_SERVER_ERROR)
    }
    
}

const addExpense = async (req, res) => {
    try{
        const error = await expenseFormValidation(req.body);
        if(Object.keys(error).length) {
            console.log(error);
            return res.status(http.BAD_REQUEST).json({ error });
        }

        const { date, amount, paymentMethod, category, description } = req.body;
        const userMonth = month(date); //getting month from date
        const user_id = req.user_id //gettig userId from authorization payload
        let month_id, date_id, category_id;

        //checking current month exist or not
        const sql = `SELECT id FROM monthlyexpenses 
                        WHERE user_id="${user_id}" 
                        AND month="${userMonth}";`;
        await sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
            .then(data => {
                month_id = data.id;
                //search wether current date already exist
                const sql = `SELECT id FROM dates
                                WHERE user_id="${user_id}" 
                                AND month_id="${month_id}" 
                                AND date="${date}";`;
                return sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
            })
            .then(data => {
                if(data === null) { 
                    //if current date not exists, create one
                    return Date.build({date, user_id, month_id}).save()
                }
                return data // if exists return date
            })
            .then(data =>{
                date_id = data.id;
                //Getting categoryId from category table
                const sql = `SELECT id FROM categories
                                WHERE categoryName="${category}";`;
                return sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
            })
            .then(data =>{
                category_id = data.id;
                //Adding all fields in expenseData table
                return ExpenseData.build({
                    user_id, category_id, date_id, amount, paymentMethod, description
                }).save()
            })
            .then(data=> {
                expense_id = data.id
                //Checking wether this expense is first expense of the day or not
                const sql = `SELECT dailyTotalExpense FROM dailyexpenses
                                WHERE user_id="${user_id}"
                                AND date_id="${date_id}";`;
                return sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
            })
            .then(data => {
                if(data === null) 
                //if first expense then add in dailyExpense table and return data object
                    return DailyExpense.build({
                        dailyTotalExpense : amount,
                        date_id,
                        user_id
                    }).save()
                    .then((data) => {
                       return data.dataValues
                    })
                    .catch((err) => console.log(err))
                const sql =`UPDATE dailyexpenses
                                SET dailyTotalExpense=dailyTotalExpense+${amount}
                                WHERE user_id="${user_id}"
                                AND date_id="${date_id}";`;
                return sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.UPDATE })
            })
            .then( data => {
                if(Array.isArray(data) && data !==1) {
                    const sql = `SELECT * FROM dailyexpenses
                                    WHERE user_id="${user_id}"
                                    AND date_id="${date_id}";`;
                    return sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT });
                }
                return data;
            })
            .then(data => {
                res.status(http.SUCCESS).json(data)
            })
            .catch(err => console.log(err));
    } catch {
        res.send(http.INTERNAL_SERVER_ERROR)
    }
    
}

const totalDayExpense = (req, res) => {
    try{
        const { date } = req.body;
        const user_id = req.user_id;
        let date_id;
        //Getting dateID from date table
        const sql = `SELECT id FROM dates WHERE date="${date}" AND user_id="${user_id}";`
        sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
            .then(data =>{
                date_id = data.id;
                //with date_id, getting total expense of that date 
                const sql = `SELECT dailyTotalExpense FROM dailyExpenses WHERE date_id="${date_id}" AND user_id="${user_id}";`
                return sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
            })
            .then( data => {
                return res.status(http.SUCCESS).json(data)
            })
    } catch {
        res.send(http.INTERNAL_SERVER_ERROR)
    }
}

//getting monthly total expense with any of the date of that month
const monthlyTotalExpense = async (req, res) => {
    try {
        const { date } =req.body;
        const user_id = req.user_id;
        //getting month wrto user seleted date
        const userSelectedMonth = month(date);
        let month_id;
        const sql = `SELECT id FROM monthlyexpenses WHERE month="${userSelectedMonth}" AND user_id="${user_id}";`
        await sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT }) 
        .then( data => {
            month_id = data.id;
            const sql = `SELECT id FROM dates WHERE month_id="${month_id}" AND user_id="${user_id}";`
            return sequelize.query(sql, {raw: false, type: Sequelize.QueryTypes.SELECT }) 
        })
        .then(async data => {
            let totalExpense = 0
            for(const date of data) {
                const sql = `SELECT dailyTotalExpense FROM dailyexpenses WHERE date_id="${date.id}" AND user_id="${user_id}";`
                const d = await sequelize.query(sql, {raw: false, type: Sequelize.QueryTypes.SELECT })
                    .then( data => {
                        return  data[0].dailyTotalExpense
                    })
                    .catch( () => res.status(http.BAD_REQUEST))
                totalExpense = totalExpense+d;
            }
            res.status(http.SUCCESS).json(totalExpense)

            })
        .catch(() =>res.status(http.BAD_REQUEST))
    } catch {
        res.send(http.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    monthlyExpense,
    isCurrentMonthExist,
    addExpense,
    totalDayExpense, 
    monthlyTotalExpense
}