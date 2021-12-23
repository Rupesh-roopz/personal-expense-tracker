const{ Sequelize, Date,
        ExpenseData, PaymentMethod, Category} = require('../models')
const { searchValidation } = require("../helpers/validations/search")
const http = require('../constants/http');

const searchBetweenDates = async (req, res) => {
    try {
        const isValidData = await searchValidation(req.body)

        if (isValidData) {
            const { fromDate, endDate } = req.body;
            const user_id = req.user_id;
            await Date.findAll({
                where: {
                    user_id,
                    date: {[Sequelize.Op.between]: [fromDate, endDate]}
                },
                attributes: ['date'],
                include: [
                    {
                        model: ExpenseData,
                        attributes: ['amount', 'description'],
                        include: [{
                            model: Date,
                            right: true,
                            attributes: ['date']
                        },{
                            model: PaymentMethod,
                            attributes: ['paymentMethodName']
            
                        },{
                            model: Category,
                            attributes: ['categoryName']
                        }]
                    }
                ]
            })
        .then( data => {
            if(data.length){
                const result = JSON.stringify(data, null, 2);
                const parsedResult = JSON.parse(result);
                return res.status(http.SUCCESS)
                        .json(parsedResult);
            }
            res.status(http.SUCCESS)
                        .json('no records found between dates');
        })
        .catch((err) => { throw err })
        }
        
    } catch(error) {
        res.status(http.BAD_REQUEST).json(error);
    }
}


const advancedSearch = async (req, res) => {
    try {
        const isValidData = await searchValidation(req.body)
        const { fromDate, endDate, categoryName, paymentMethod, priceRange } = req.body;
        const user_id = req.user_id;
        await Date.findAll({
            where: {
                user_id,
                date: {[Sequelize.Op.between]: [fromDate, endDate]}
            },
            attributes: ['date'],
            include: [
                {
                    model: ExpenseData,
                    attributes: ['amount', 'description'],
                    where: {
                        amount: {
                            [Sequelize.Op.lte]: priceRange
                        }
                    },
                    include: [{
                        model: Date,
                        right: true,
                        attributes: ['date']
                    },{
                        model: PaymentMethod,
                        attributes: ['paymentMethodName'],
                        where: {
                            paymentMethodName: paymentMethod
                        },
                        right: true,
                    },{
                        model: Category,
                        attributes: ['categoryName'],
                        where: {
                            categoryName
                        },
                    }]
                }
            ]
        })
            .then( data => {
                if(data.length === 0) {
                    res.status(http.SUCCESS)
                        .json({ message : 'No records found'})
                    return;
                }
                return res.status(http.SUCCESS).json(data)                                                                        (http.SUCCESS).json(data)
            })
            .catch((err) => {
                console.log(err)
                throw err;
            })
    
    } catch(error) {
        res.status(http.BAD_REQUEST).json(error);
    }
}

module.exports = { searchBetweenDates, advancedSearch }