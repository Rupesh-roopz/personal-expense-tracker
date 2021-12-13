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
            paymentMethod : {
                type : DataTypes.STRING,
                allowNull : false
            },
            description : {
                type : DataTypes.STRING,
                allowNull : false
            }
        },{
            timestamps : false
        })

// ExpenseData.associate = (models) => {
//     models.ExpenseData.hasMany(models.DailyExpense, {
//         foreignKey : 'expense_id',
//         sourceKey : 'id'
//     });   
// }
    return ExpenseData;
}