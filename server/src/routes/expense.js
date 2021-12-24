const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth');
const { monthlyExpense,
	isCurrentMonthExist,
	addExpense,
	totalDayExpense,
	monthlyTotalExpense,
	editExpense,
	fetchExpenses,
	deleteExpense } = require('../controller/expense');

router
	.route('/currentMonth')
	.get(authenticateToken, (req, res) => {
		isCurrentMonthExist(req, res);
	});

router
	.route('/monthly')
	.post(authenticateToken, (req, res) => {
		monthlyExpense(req, res);
	});

router
	.route('/add')
	.post(authenticateToken, (req, res) => {
		addExpense(req, res);
	});

router
	.route('/totalDayExpense')
	.post(authenticateToken, (req, res) => {
		totalDayExpense(req, res);
	}); 

router
	.route('/monthlyTotalExpense')
	.post(authenticateToken, (req, res) => {
		monthlyTotalExpense(req, res);
	}); 

router
	.route('/edit')
	.put(authenticateToken, (req, res) => {
		editExpense(req, res);
	}); 

router
	.route('/fetch')
	.get(authenticateToken, (req, res) => {
		fetchExpenses(req, res);
	});

router
	.route('/delete')
	.delete(authenticateToken, (req, res) => {
		deleteExpense(req, res);
	});

module.exports = router;