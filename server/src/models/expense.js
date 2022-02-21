module.exports = (sequelize, DataTypes) => {
	const ExpenseData = sequelize.define('ExpenseData', {
		id : {
			type : DataTypes.INTEGER,
			primaryKey : true,
			allowNull : false,
			autoIncrement : true
		},
		amount : {
			type : DataTypes.INTEGER,
			allowNull : false,
		},
		description : {
			type : DataTypes.STRING,
			allowNull : false
		}
	},{
		timestamps : false
	});

	return ExpenseData;
};