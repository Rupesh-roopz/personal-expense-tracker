module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define('Category', {
		id : {
			type : DataTypes.INTEGER,
			allowNull : false,
			primaryKey : true,
			autoIncrement : true
		},
		categoryName : {
			type : DataTypes.STRING(15),
			allowNull : false
		}
	},{
		timestamps : false
	});

	Category.associate = (models) => {
		models.Category.hasMany(models.ExpenseData, {
			foreignKey : 'category_id',
			sourceKey : 'id'
		}),
		models.ExpenseData.belongsTo(models.Category, {
			foreignKey : 'category_id'
		});
	};
 
	return Category;
};
