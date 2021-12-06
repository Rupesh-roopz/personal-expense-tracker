const sequelize = require('../utils/db');
const  Sequelize  = require('sequelize');

const User = sequelize.define('User', {
    userID : {
        type : Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName : {
        type : Sequelize.STRING,
        allowNull: false
    },
    lastName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    dateOfBirth : {
        type : Sequelize.DATE,
        allowNull : false
    },
    gender : {
        type : Sequelize.STRING,
        allowNull : false
    },
    profession : {
        type : Sequelize.STRING,
        allowNull : false
    },
    phoneNumber : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

module.exports = User;