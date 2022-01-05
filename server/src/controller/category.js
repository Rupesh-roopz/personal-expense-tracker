const { Category } = require('../models');
const http = require('../constants/http');
const { categoryValidation } = require('../helpers/validations/category');

const addCategory = async(req, res) => {
    try {
        //validating client data if validated returns 1 else throws error
        const validData = await categoryValidation(req.body);
        if (validData) {
            const { categoryName } = req.body;
            //Check wether category already exists
            await Category.findOne({
                where: { categoryName }
            }).then(async data => {
                //if category exists throws error
                if (data)
                    return res.status(http.CONFLICT)
                        .json({ message: 'category already exists' });
                const newCategory = await Category.create({ categoryName });
                res.status(http.CREATED).json(newCategory);
            }).catch((err) => { throw err });
        }
        return;

    } catch (error) {
        res.status(http.BAD_REQUEST).json(error);
    }
};

const fetchCategories = async(req, res) => {
    try {
        await Category.findAll({})
            .then(data => {
                res.status(http.SUCCESS).json(data);
            }).catch(err => { throw err });

    } catch (error) {
        res.status(http.BAD_REQUEST).json(error);
    }
};

const editCategory = async(req, res) => {
    try {
        //validating client data if validated returns 1 else throws error
        const validData = await categoryValidation(req.body);

        if (validData) {
            const { id, categoryName } = req.body;
            const data = await Category.findOne({
                where: { categoryName }
            });

            if (data === null) {
                const [updatedCategory] = await Category.update({ categoryName }, { where: { id } });
                if (updatedCategory) {
                    res.status(http.SUCCESS)
                        .json({ message: 'Updated successfully' });
                    return;
                }
            }
            res.status(http.CONFLICT)
                .json({ message: 'category already exists' });
        }
    } catch (error) {
        res.status(http.BAD_REQUEST).json({ error });
    }
}

module.exports = { addCategory, fetchCategories, editCategory };