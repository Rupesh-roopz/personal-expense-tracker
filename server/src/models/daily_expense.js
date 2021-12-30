module.exports = (sequelize, DataTypes) => {
	const DailyExpense = sequelize.define('DailyExpense', {

		dailyTotalExpense : {
			type : DataTypes.INTEGER,
			allowNull : false,
			defaultValue : '0'
		},
	},{
		timestamps : false
	});

	return DailyExpense;
};