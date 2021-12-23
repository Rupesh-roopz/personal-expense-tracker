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
        })
    //     ExpenseData.associate = (models) => {
    //         models.ExpenseData.belongsTo(models.MonthlyExpense, { through: models.Date})
    // }
    return ExpenseData;
}