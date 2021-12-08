const express = require('express');
const app = express();

const user = require('./userRoute')
const expense = require('./expenseRoute');

const router = () => {
    app.use('/user', user);
    app.use('/expense', expense);
    
    return app;
}

module.exports = router