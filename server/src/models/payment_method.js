module.exports = (sequelize, DataTypes) => {
    const PaymentMethod = sequelize.define('PaymentMethod', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        paymentMethodName : {
            type : DataTypes.STRING(15),
            allowNull : false
        }
    },{
        timestamps : false
    })

    PaymentMethod.associate = (models) => {
        models.PaymentMethod.hasMany(models.ExpenseData, {
            foreignKey : 'paymentMethod_id',
            sourceKey : 'id'
        }),
        models.ExpenseData.belongsTo(models.PaymentMethod, {
            foreignKey : 'paymentMethod_id',
        })
    }
 
    return PaymentMethod
}
