const { sequelize, Sequelize, PaymentMethod } = require('../models');
const { paymentMethodValdation } = require('../helpers/validations/payment');
const http = require('../constants/http');

const addPaymentMethod = async ( req, res) => {
    try{
        const user_id = req.user_id;
        const  isAdmin = req.isAdmin;
            if(isAdmin) {
                const validData = await paymentMethodValdation(req.body);
            
            if(validData) {
                const { paymentMethodName } = req.body;
                //checking payment name already exists
                await PaymentMethod.findOne({where: {paymentMethodName}})
                .then( async data => {
                    if(data){
                        res.status(http.CONFLICT)
                            .json({message: 'payment method already exists'});
                        return
                    }
                    return await  PaymentMethod.create({
                        paymentMethodName
                    })
                })
                .then(data => { 
                    res.status(http.CREATED).json(data);
                })
                .catch((err) =>{ throw err})
            }
        }
        res.sendStatus(http.FORBIDDEN)  

    } catch(error) {
        res.status(http.BAD_REQUEST).json(error);
    }
}

const editPaymentMethod = async ( req, res) => {
    try{
        const  isAdmin = req.isAdmin;
        
        if(isAdmin) {
            const validData = await paymentMethodValdation(req.body);

            if (validData) {
                const { id, paymentMethodName } = req.body;
                //checking payment name already exists
                await PaymentMethod.findOne({where: {paymentMethodName}})
                .then( async data => {
                    if(data){
                        res.status(http.CONFLICT)
                            .json({message: 'payment method already exists'});
                        return;
                    }
                return await PaymentMethod.update({ paymentMethodName }, {where: { id }})
                })
                .then( async data => {
                    if(data[0]){
                        res.status(http.SUCCESS)
                            .json({message : 'Payment method name updated sucessfully'});
                        return;
                    }
                throw ({errorMessage : 'not updated! values remains same'})
                }).catch( err => {
                    throw err
                })
            }
        }
        res.sendStatus(http.UNAUTHORISED)
    
    } catch(error) {
        console.log(error)
            res.status(http.BAD_REQUEST)
                .json(error);
        }
}

const fetchPaymentMethod = async ( req, res) => {
    try{
        const user_id = req.user_id;
        const  isAdmin = req.isAdmin;
        
        if(isAdmin) {
            await PaymentMethod.findAll({})
                .then( data => {
                    res.status(http.SUCCESS).json(data)
                }).catch( err => {
                    throw err
                })
        }
        res.sendStatus(http.UNAUTHORISED)
        } catch(error) {
            res.status(http.BAD_REQUEST).json(error);
        }
}
module.exports = {
    addPaymentMethod,
    editPaymentMethod,
    fetchPaymentMethod,
}