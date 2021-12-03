// const  Sequelize  = require('sequelize');
// const User =  require('../models/userModel')
// require('dotenv').config();

// const host = process.env.HOST
// const user = process.env.USER
// const db_password = process.env.DB_PASSWORD
// const database = process.env.DATABASE
// const dialect = process.env.DIALECT

// const sequelize = new Sequelize(database, user, db_password, 
//     {   
//         host : host,
//         dialect : dialect
//     })

const signUp = async (req, res) => {
    
   const newUser = User.build({firstName : req.body.firstName});
   
   await newUser.save().then(() => console.log("userSaved"))
   .catch(err => {
       console.log(err)
   })
}

module.exports = {signUp}