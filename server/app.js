const express = require('express');
const router = require('./src/routes/index');
const { sequelize } = require('./src/models');
require('dotenv').config();
const request = require('supertest')
const app = express();
const port = process.env.PORT;
const path = require('path');

var env = process.env.NODE_ENV || 'development'
var config = require(path.join(__dirname, './config/config.json'))[env]


app.use(express.json());
app.use('/', router());

const connection = async() => {
    try {
        await sequelize
            .authenticate()
            .then(() => {
                console.log('Connection to database successfully');
            }).catch(err => {
                throw err
            })
            .catch((error) => console.log('Database connection failed...', error));

    } catch (error) {
        console.error('SERVER ERROR', error);
    }
};
connection();

if (config.database === 'pet_test') {
    app.listen(port, (error) => {
        if (error)
            console.log(error);
        console.log(`Connected to the server at port ${port}`);
    });
}

if (config.database !== 'pet_test') {
    app.listen(port, (error) => {
        if (error)
            console.log(error);
        console.log(`Connected to the server at port ${port}`);
    });
}


module.exports = app;