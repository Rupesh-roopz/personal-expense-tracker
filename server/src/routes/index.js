const express = require('express');
const app = express();

const user = require('./userRoute')
const expense = require('./expenseRoute');
const category = require('./catagoryRoute');
const search = require('./searchRoute')
const router = () => {
    app.use('/user', user);
    app.use('/expense', expense);
    app.use('/category', category);
    app.use('/search', search);
    
    return app;
}

module.exports = router