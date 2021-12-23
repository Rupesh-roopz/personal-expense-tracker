module.exports = (sequelize, DataTypes) => {
	const MonthlyExpense = sequelize.define('MonthlyExpense', {
		id : {
			type : DataTypes.INTEGER,
			allowNull : false,
			primaryKey : true,
			autoIncrement : true
		},
		month : {
			type : DataTypes.INTEGER,
			allowNull : false
		},
		monthStartingDate : {
			type : DataTypes.DATEONLY,
			allowNull : false
		},
		monthlyEarnings : {
			type : DataTypes.STRING,
			allowNull : false
		},
		monthlyExpense : {
			type : DataTypes.STRING,
			allowNull : false,
			defaultValue : 0
		},
		monthlyBalance : {
			type : DataTypes.STRING,
			allowNull : true,
		},
    
	},{
		timestamps : false
	});
    
	MonthlyExpense.associate = (models) => {
		models.MonthlyExpense.hasMany(models.Date, {
			foreignKey : 'month_id',
			sourceKey : 'id'
		});
	};

	return MonthlyExpense;
};