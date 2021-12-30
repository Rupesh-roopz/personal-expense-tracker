const express = require('express');
const app = express();

const user = require('./user');
const expense = require('./expense');
const category = require('./catagory');
const search = require('./search');
const payment = require('./payment_method');

const router = () => {
	app.use('/user', user);
	app.use('/expense', expense);
	app.use('/category', category);
	app.use('/search', search);
	app.use('/paymentMethod', payment);
    
	return app;
};

module.exports = router;