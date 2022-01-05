const Sequelize = require('sequelize');
require('dotenv').config();

const fs = require('fs');
const path = require('path');


var env = process.env.NODE_ENV || 'development'
var config = require(path.join(__dirname, '../../config/config.json'))[env]

//defining basename to declare current filename
const basename = path.basename(__filename); //index.js

// //declaring db to store all models and to assosiate between every model
const db = {};

let sequelize

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
sequelize = new Sequelize(config);
// }

// const host = process.env.HOST;
// const user_name = process.env.USERNAME;
// const db_password = process.env.DB_PASSWORD;
// const database = process.env.DATABASE;
// const dialect = process.env.DIALECT;

// //creating an instance for Sequelize 
// const sequelize = new Sequelize(database, user_name, db_password, 
// 	{   
// 		host : host,
// 		dialect : dialect
// 	});

//getting directory name and filtering files in that directory
fs.readdirSync(__dirname).filter(file => {
    //getting each file and returning all files except basename(index.js) file
    return (
            file.indexOf('.')) &&
        (file !== basename) &&
        (file.slice(-3) === '.js');
}).forEach(file => {
    //for each file importing sequelize and datatypes
    const model =
        require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //declaring model name in db object  
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    //for every model which have .association key, 
    //then pass its db as parameter to that function
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// sequelize.sync({
//     alter: true
// })

//adding sequelize instance and Sequelize key to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;