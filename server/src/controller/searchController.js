const http = require("../constants/http");
const { sequelize } = require("../models");
const { searchValidation } = require("../helpers/validations/searchValidation")
const searchBetweenDates = async (req, res) => {
    try {
        const error = searchValidation(req.body)
        if (Object.keys(error).length) {
            console.log(error)
            return res.json(error)
        }
        const { fromDate, endDate } = req.body;
        const user_id = req.user_id;
        let dateId = [];
        let totalDateIds;
        //querying for dateId's between fromDate and endDate
        const sql = `SELECT id FROM dates
                        WHERE date
                        BETWEEN "${fromDate}"
                        AND "${endDate}" 
                        AND user_id="${user_id}";`;
        await sequelize.query(sql,{ raw: false, type: sequelize.QueryTypes.SELECT })
            .then( data => {
                for(const date of data ) {
                    dateId.push(date.id);
                }
                totalDateIds = dateId.join(',');
                return totalDateIds;
            })
            .then(data => {
                const sql = `SELECT amount, paymentMethod, date, description, categoryName FROM expensedata
                                LEFT JOIN categories ON expensedata.category_id = categories.id
                                LEFT JOIN dates ON expensedata.date_id = dates.id
                                WHERE date_id
                                IN (${data});`;
                return sequelize.query(sql,{ raw: false, type: sequelize.QueryTypes.SELECT })
            })
            .then( data => {
                return res.status(http.SUCCESS).json(data)
            })
            .catch((err) => {
                console.log(err)
                res.status(http.BAD_REQUEST);
            })
    } catch {
        res.status(http.INTERNAL_SERVER_ERROR);
    }
}


const advancedSearch = async (req, res) => {
    try {
        const { fromDate, endDate, categoryName, paymentMethod, priceRange } = req.body;
        const user_id = req.user_id;
        let dateId = [];
        let totalDateIds;
        //querying for dateId's between fromDate and endDate
        const sql = `SELECT id FROM dates
                        WHERE date
                        BETWEEN "${fromDate}"
                        AND "${endDate}" 
                        AND user_id="${user_id}";`;
        await sequelize.query(sql,{ raw: false, type: sequelize.QueryTypes.SELECT })
            .then( data => {
                for(const date of data ) {
                    dateId.push(date.id);
                }
                totalDateIds = dateId.join(',');
                return totalDateIds;
            })
            .then(data => {
                const sql = `SELECT amount, paymentMethod, date, categoryName FROM expensedata
                                LEFT JOIN categories ON expensedata.category_id = categories.id
                                LEFT JOIN dates ON expensedata.date_id = dates.id
                                WHERE date_id IN (${data})
                                AND amount <= ${priceRange}
                                AND categoryName = "${categoryName}"
                                AND paymentMethod = "${paymentMethod}"
    
                                ;`;
                return sequelize.query(sql,{ raw: false, type: sequelize.QueryTypes.SELECT })
            })
            .then( data => {
                return res.status(http.SUCCESS).json(data)
            })
            .catch((err) => {
                console.log(err)
                res.status(http.BAD_REQUEST);
            })
    
    } catch {
        res.status(http.INTERNAL_SERVER_ERROR);
    }
    
}
module.exports = { searchBetweenDates, advancedSearch }