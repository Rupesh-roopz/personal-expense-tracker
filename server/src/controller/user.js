const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { userValidation } = require('../helpers/validations/signup');
const { signinValidation } = require('../helpers/validations/signin');
const http = require('../constants/http');
require('dotenv').config();

const signUp = async (req, res) => {
	try{
		const isValid = await userValidation(req.body);
		if(isValid) {
			const { firstName, lastName, email, dateOfBirth,
				gender, profession, phoneNumber, password, isAdmin } = req.body;
			//checking user already exists
			await User.findOne({
				 where : { email } 
			}).then( async data => {
				if(data)
					return res.status(http.CONFLICT)
						.json({ message : 'user already exists' });
                
				return await User.create({
					firstName, lastName, email, dateOfBirth,
					gender, profession, phoneNumber, password, isAdmin
				});
			}).then( data => {
				return res.status(http.CREATED).json({ data });
			}).catch(err => { throw err });
		}
        
	} catch(error) {
		res.status(http.BAD_REQUEST).json(error);
	}
   
};

const signIn = async (req, res) => {
	try{
		const isVailid = await signinValidation(req.body);
		if(isVailid) {
			const { email, password } = req.body;
			await User.findOne({
				where : {
					email, password
				}
			}).then(result => {
				if (result === null)
					return res.status(http.UNAUTHORISED)
						.json({ 
							message : 'please enter valid credentials' 
						});
				const userPayload = {
					id : result.id,
					isAdmin : result.isAdmin
				};

				const accessToken = jwt.sign(
					userPayload,
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn : '30m' }
				);
				res.setHeader('Authorization', accessToken);
				res.sendStatus(http.SUCCESS);
			}).catch(err =>{ throw err }); 
		}} catch(error) {
		res.status(http.BAD_REQUEST).json(error);
	}

};

const profileUpdate = async (req, res) => {
	try{
		const isValid = await userValidation(req.body);
		if(isValid) {
			const { firstName, lastName, email, dateOfBirth,
				gender, profession, phoneNumber, password } = req.body;
			const user_id = req.user_id;
			await User.update({
				firstName, lastName, email, dateOfBirth,
				gender, profession, phoneNumber, password
			},
			{ 
				where : { id : user_id } 
			}).then(data => {
				if(data[0]) {
					res.status(http.SUCCESS)
						.json({ message : 'Updated successfully' });
					return;
				}
				throw ({ 
					errorMessage : 'not updated! values remains same' 
				});
			}).catch(err => { throw err });
		}
	} catch(error) {
		res.status(http.BAD_REQUEST).json(error);
	}
};

module.exports = { signUp, signIn, profileUpdate };
