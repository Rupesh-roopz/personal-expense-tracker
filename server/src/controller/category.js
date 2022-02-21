const { Category } = require('../models');
const http = require('../constants/http');
const { categoryValidation } = require('../helpers/validations/category');

const addCategory = async (req, res) => {
	try{
		//validating client data if validated returns 1 else throws error
		const validData = await categoryValidation(req.body);
		if(validData) {
			const { categoryName } = req.body;
			//Check wether category already exists
			await Category.findOne({
				where : { categoryName }
			}).then( async data => {
				//if category exists throws error
				if(data) 
					return res.status(http.CONFLICT)
						.json({ message : 'category already exists' });
				return await Category.create({ categoryName });
			}).then(data =>{
				res.status(http.CREATED).json(data);
			}).catch((err) =>{ throw err});
		}
		return;

	} catch(error) {
		res.status(http.BAD_REQUEST).json(error);
	}
};

const fetchCategories = async (req, res) => {
	try{
		await Category.findAll({})
			.then( data => {
				res.status(http.SUCCESS).json(data);
			}).catch( err => { throw err });

	} catch(error) {
		console.log(error);
		res.status(http.BAD_REQUEST).json(error);
	}
};

const editCategory = async (req, res) => {
	try{
		//validating client data if validated returns 1 else throws error
		const validData = await categoryValidation(req.body);

		if (validData) {
			const { id, categoryName } = req.body;
			await Category.findOne({
				where : { categoryName } 
			}).then( async data => {
				console.log(data);
				if(data)
					return res.status(http.CONFLICT)
						.json({ message : 'category already exists' });
				return await Category.update({ categoryName }, 
					{ where : { id } });
			}).then( data => {
				//if date[0] equals 1 then updated else not updated
				if(data[0])
					res.status(http.SUCCESS)
						.json({ 
							message : 'Category updated sucessfully' 
						});
				throw ({ 
					errorMessage : 'not updated! values remains same' 
				});
			}).catch( err => { throw err });
		}
	} catch(error) {
		res.status(http.BAD_REQUEST).json(error);
	}
};

module.exports = { addCategory, fetchCategories, editCategory };