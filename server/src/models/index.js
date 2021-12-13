const Sequelize  = require('sequelize');
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const db ={};
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
  
fs.readdirSync(__dirname).filter( file => {
    return (file.indexOf('.')) && (file !== basename) && (file.slice(-3) === '.js')
}).forEach( file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);   
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
}); 

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
    