const express = require('express');
const router = express.Router();
const { monthlyExpense, isCurrentMonthExist } = require('../controller/expenseController')

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


module.exports = router;