const sequelize = require('../utils/db');
const  { DataTypes }  = require('sequelize');

const User = sequelize.define('User', {
    userID : {
        type : DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName : {
        type : DataTypes.STRING,
        allowNull: false
    },
    lastName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    dateOfBirth : {
        type : DataTypes.DATE,
        allowNull : false
    },
    gender : {
        type : DataTypes.STRING,
        allowNull : false
    },
    profession : {
        type : DataTypes.STRING,
        allowNull : false
    },
    phoneNumber : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

module.exports = User;