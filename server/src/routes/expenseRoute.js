const express = require('express');
const router = express.Router();
const { monthlyExpense, isCurrentMonthExist,
     addExpense, totalDayExpense, monthlyTotalExpense } = require('../controller/expenseController')

const authenticateToken = require('../middlewares/auth');

router
    .route('/currentMonth')
    .get(authenticateToken, (req, res) => {
        isCurrentMonthExist(req, res);
})

router
    .route('/monthly')
    .post(authenticateToken, (req, res) => {
        monthlyExpense(req, res);
})

router
    .route('/add')
    .post(authenticateToken, (req, res) => {
        addExpense(req, res);
    })

router
    .route('/totalDayExpense')
    .post(authenticateToken, (req, res) => {
        totalDayExpense(req, res);
    }) 

router
.route('/monthlyTotalExpense')
.post(authenticateToken, (req, res) => {
    monthlyTotalExpense(req, res);
}) 

module.exports = router;