const express = require('express');
const router = express.Router();
const user = require('../controller/userController');

router
    .route('/signup')
    .post((req, res) => {
        user.signUp(req, res);
    });

router
    .route('/signin')
    .post((req, res) => {
        user.signIn(req, res);
    });

router 
    .route('/profile/update')
    .post((req, res) => {
        user.profileUpdate(req, res)
    });
    
module.exports = router;