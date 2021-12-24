const express = require('express');
const router = express.Router();
const { addCategory, 
	fetchCategories, editCategory } = require('../controller/category');
const { authenticateToken,isAdmin } = require('../middlewares/auth');
router
	.route('/add')
	.post(authenticateToken, isAdmin, (req, res) => {
		addCategory(req, res);
	});

router
	.route('/fetch')
	.get(authenticateToken, isAdmin,(req, res) => {
		fetchCategories(req, res);
	});

router
	.route('/update')
	.put(authenticateToken, isAdmin, (req, res) => {
		editCategory(req, res);
	});
module.exports = router;