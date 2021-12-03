// const { Sequelize, DataTypes } = require('sequelize');

// require('dotenv').config();

// const host = process.env.HOST
// const user = process.env.USER
// const db_password = process.env.DB_PASSWORD
// const database = process.env.DATABASE
// const dialect = process.env.DIALECT

const sequelize = new Sequelize(database, user, db_password, 
    {   
        host : host,
        dialect : dialect
    })
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
}, {
    tableName: 'Users',
    freezeTableName: true,
    modelName : 'User'
})

module.exports = User