const express = require('express');
const app = express();

const user = require('./userRoute')

const router = () => {
    app.use('/user', user);

    return app
}

module.exports = router