const express = require('express');
const router = express.Router();
const user = require('../controller/userController');

router
    .route('/signup')
    .post((req, res) => {
        user.signUp(req, res);
    })

module.exports = router;