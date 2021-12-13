const express = require('express');
const router = express.Router();
const { signUp, signIn, profileUpdate } = require('../controller/userController');
const authenticateToken = require('../middlewares/auth')
router
    .route('/signup')
    .post((req, res) => {
        signUp(req, res);
    });

router
    .route('/signin')
    .post((req, res) => {
        signIn(req, res);
    });

router 
    .route('/profile/update')
    .post((req, res) => {
        profileUpdate(req, res)
    });

module.exports = router;