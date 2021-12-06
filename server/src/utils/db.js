const Sequelize  = require('sequelize');
require('dotenv').config();

const host = process.env.HOST;
const user = process.env.USER;
const db_password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;
const dialect = process.env.DIALECT;

const sequelize = new Sequelize(database, user, db_password, 
    {   
        host : host,
        dialect : dialect
    });
  
module.exports = sequelize;