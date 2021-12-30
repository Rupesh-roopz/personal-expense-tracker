const express = require('express');
const router = express.Router();
const { addPaymentMethod, 
	editPaymentMethod, fetchPaymentMethod } = require('../controller/payment');
const { authenticateToken, isAdmin } = require('../middlewares/auth');

router
	.route('/add')
	.post(authenticateToken, isAdmin, (req, res) => {
		addPaymentMethod(req, res);
	});

router
	.route('/fetch')
	.get(authenticateToken, isAdmin, (req, res) => {
		fetchPaymentMethod(req, res);
	});

router
	.route('/update')
	.put(authenticateToken, isAdmin, (req, res) => {
		editPaymentMethod(req, res);
	});
module.exports = router;