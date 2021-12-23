const express = require('express');
const router = express.Router();
const {addPaymentMethod, 
    editPaymentMethod, fetchPaymentMethod } = require('../controller/payment');
const authenticateToken = require('../middlewares/auth');


router
    .route('/add')
    .post(authenticateToken, (req, res) => {
        addPaymentMethod(req, res)
    })

router
    .route('/fetch')
    .get(authenticateToken, (req, res) => {
        fetchPaymentMethod(req, res)
    })

router
    .route('/update')
    .put(authenticateToken, (req, res) => {
        editPaymentMethod(req, res)
    })
module.exports = router;