const express = require('express');
const { searchBetweenDates, advancedSearch } = require('../controller/searchController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

router
    .route('/dates')
    .post(authenticateToken, (req, res) => {
        searchBetweenDates(req, res);
    })

router
    .route('/advancedSearch')
    .post(authenticateToken, (req, res) => {
        advancedSearch(req, res);
    })
module.exports = router;