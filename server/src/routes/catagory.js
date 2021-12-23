const express = require('express');
const router = express.Router();
const { addCategory, 
	fetchCategories, editCategory } = require('../controller/category');
const authenticateToken = require('../middlewares/auth');

router
	.route('/add')
	.post(authenticateToken, (req, res) => {
		addCategory(req, res);
	});

router
	.route('/fetch')
	.get(authenticateToken, (req, res) => {
		fetchCategories(req, res);
	});

router
	.route('/update')
	.put(authenticateToken, (req, res) => {
		editCategory(req, res);
	});
module.exports = router;