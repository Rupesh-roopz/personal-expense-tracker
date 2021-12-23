module.exports = (sequelize, DataTypes) => {
	const Date = sequelize.define('Date', {
		id : {
			type : DataTypes.INTEGER,
			allowNull : false,
			primaryKey : true,
			autoIncrement : true
		},
		date : {
			type : DataTypes.DATEONLY,
			allowNull : false
		}
	},{
		timestamps : false
	});
    
	Date.associate = (models) => {
		models.Date.hasMany(models.ExpenseData, {
			foreignKey : 'date_id',
			sourceKey : 'id'
		});
		models.Date.hasMany(models.DailyExpense, {
			foreignKey : 'date_id',
			sourceKey : 'id'
		}),
		models.ExpenseData.belongsTo(models.Date, {
			foreignKey : 'date_id',
		}); 
	};
	return Date;
};