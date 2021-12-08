const sequelize = require('../utils/db');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const MonthlyExpense = sequelize.define('MonthlyExpense', {
    monthID : {
        type : DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {        
          model: User,   
          key: 'userID'
        },
    },
    month : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    monthStartingDate : {
        type : DataTypes.DATEONLY,
        allowNull: false
    },
    monthlyEarnings : {
        type : DataTypes.STRING,
        allowNull: false
    },
    monthlyExpense : {
        type : DataTypes.STRING,
        allowNull: false,
        defaultValue : 0
    },
    monthlyBalance : {
        type : DataTypes.STRING,
        allowNull: true,
    },

})

module.exports = MonthlyExpense;