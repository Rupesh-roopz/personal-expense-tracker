const express = require('express');
// const db = require('./db')

const router = require('./src/routes/index')
const  Sequelize  = require('sequelize');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const host = process.env.HOST
const user = process.env.USER
const db_password = process.env.DB_PASSWORD
const database = process.env.DATABASE
const dialect = process.env.DIALECT

const sequelize = new Sequelize(database, user, db_password, 
    {   
        host : host,
        dialect : dialect
    })

const connection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({logging: console.log});
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connection();



app.use(express.json());
app.use('/',router());

app.listen(port, (error) => {
    if(error) return console.log(error)
    console.log(`Connected to the server at port ${port}`)
})