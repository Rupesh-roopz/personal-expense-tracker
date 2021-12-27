const { PaymentMethod } = require('../models');
const { paymentMethodValdation } = require('../helpers/validations/payment');
const http = require('../constants/http');

const addPaymentMethod = async ( req, res) => {
	try{
		const validData = await paymentMethodValdation(req.body);
            
		if(validData) {
			const { paymentMethodName } = req.body;
			//checking payment name already exists
			await PaymentMethod.findOne({ 
				where : { paymentMethodName } 
			}).then( async data => {
				if(data)
					return res.status(http.CONFLICT)
						.json({ 
							message : 'payment method already exists' 
						});	
				return await  PaymentMethod.create({
					paymentMethodName
				});
			}).then(data => { 
				res.status(http.CREATED).json(data);
			}).catch((err) =>{ throw err});
		}
 
	} catch(error) {
		res.status(http.BAD_REQUEST).json(error);
	}
};

const editPaymentMethod = async ( req, res) => {
	try{
		const validData = await paymentMethodValdation(req.body);

		if (validData) {
			const { id, paymentMethodName } = req.body;
			//checking payment name already exists
			await PaymentMethod.findOne({
				 where : { paymentMethodName }
				 }).then( async data => {
				if(data){
					return res.status(http.CONFLICT)
						.json({ 
							message : 'payment method already exists' 
						});
				}
				return await PaymentMethod.update({ 
					paymentMethodName }, { where : { id } 
				});
			}).then( async data => {
				if(data[0])
					return res.status(http.SUCCESS)
						.json({
							message : 'Updated sucessfully' 
						});
				throw ({ 
					errorMessage : 'not updated! values remains same' 
				});
			}).catch( err => { throw err });
		}
    
	} catch(error) {
		res.status(http.BAD_REQUEST)
			.json(error);
	}
};

const fetchPaymentMethod = async ( req, res) => {
	try{
		await PaymentMethod.findAll({})
			.then( data => {
				return res.status(http.SUCCESS).json(data);
			}).catch( err => { throw err });
		
	} catch(error) {
		res.status(http.BAD_REQUEST).json(error);
	}
};

module.exports = {
	addPaymentMethod,
	editPaymentMethod,
	fetchPaymentMethod,
};