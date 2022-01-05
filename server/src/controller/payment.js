const { PaymentMethod } = require('../models');
const { paymentMethodValdation } = require('../helpers/validations/payment');
const http = require('../constants/http');

const addPaymentMethod = async(req, res) => {
    try {
        const validData = await paymentMethodValdation(req.body);

        if (validData) {
            const { paymentMethodName } = req.body;
            //checking payment name already exists
            const data = await PaymentMethod.findOne({
                where: { paymentMethodName }
            })
            if (data === null) {
                const newPaymentMethod = await PaymentMethod.create({
                    paymentMethodName
                });
                res.status(http.CREATED).json(newPaymentMethod);
                return;
            }
            res.status(http.CONFLICT)
                .json({
                    message: 'payment method already exists'
                });
            return;
        }

    } catch (error) {
        console.log(error)
        res.status(http.BAD_REQUEST).json(error);
    }
};

const editPaymentMethod = async(req, res) => {
    try {
        const validData = await paymentMethodValdation(req.body);

        if (validData) {
            const { id, paymentMethodName } = req.body;
            //checking payment name already exists
            const data = await PaymentMethod.findOne({
                where: { paymentMethodName }
            })
            if (data === null) {
                const [updatedaymentName] = await PaymentMethod.update({
                    paymentMethodName
                }, {
                    where: { id }
                });
                if (updatedaymentName) {
                    res.status(http.SUCCESS)
                        .json({
                            message: 'Updated sucessfully'
                        });
                    return;
                }
            }
            res.status(http.CONFLICT)
                .json({
                    message: 'payment method already exists'
                });
            return;
        }

    } catch (error) {
        res.status(http.BAD_REQUEST)
            .json(error);
    }
};

const fetchPaymentMethod = async(req, res) => {
    try {
        await PaymentMethod.findAll({})
            .then(data => {
                return res.status(http.SUCCESS).json(data);
            }).catch(err => { throw err });

    } catch (error) {
        res.status(http.BAD_REQUEST).json(error);
    }
};

module.exports = {
    addPaymentMethod,
    editPaymentMethod,
    fetchPaymentMethod,
};