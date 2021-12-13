const { Category } = require('../models')
const http = require('../constants/http');
const { categoryValidation } = require('../helpers/validations/categoryValidation');

const addCategory = (req, res) => {
    try{
        const error = categoryValidation(req.body)
        if(Object.keys(error).length) {
            console.log(error);
            return res.status(http.BAD_REQUEST).json({ error });
        }
        const { categoryName } = req.body;
        const newCategory = Category.build({
            categoryName
        })
        newCategory.save()
            .then(() => {
                res.status(http.SUCCESS).json('category added');
            })
            .catch(err => {
                console.log(err);
                res.status(http.BAD_REQUEST)
            });
    } catch {
        res.status(http.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { addCategory };