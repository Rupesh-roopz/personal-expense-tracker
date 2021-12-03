const fs = require('fs');
const { basename } = require('path');
const path = require('path');
const  Sequelize  = require('sequelize');
require('dotenv').config();

const host = process.env.HOST
const user = process.env.USER
const db_password = process.env.DB_PASSWORD
const database = process.env.DATABASE
const dialect = process.env.DIALECT

const db = {};
const sequelize = new Sequelize(database, user, db_password, 
    {   
        host : host,
        dialect : dialect
    })

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !==0 && (file !== basename) && (file.slice(-3) === '.js'))
}).forEach(file => {
    console.log(file)
    const model = require(path.join(__dirname,file));
    db[model.name] = model;
    
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) 
        db[modelName].associate(db);
    });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    
module.exports = db;