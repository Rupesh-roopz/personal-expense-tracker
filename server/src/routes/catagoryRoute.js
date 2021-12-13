const express = require('express');
const router = express.Router();
const { addCategory } = require('../controller/categoryController');

router
    .route('/add')
    .post((req, res) => {
        addCategory(req, res)
    })

module.exports = router;