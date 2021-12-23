const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');

const { signUp,
        signIn,
        profileUpdate } = require('../controller/user');

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
    .put(authenticateToken, (req, res) => {
        profileUpdate(req, res)
    });

module.exports = router;