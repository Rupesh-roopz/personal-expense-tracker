const User = require('../models/userModel');
const db = require('../utils/db');
const {QueryTypes}  = require('sequelize');

const signUp = async (req, res) => {
    try{
        const { firstName, lastName, email, dateOfBirth,
             gender, profession, phoneNumber, password} = req.body;
        
        const sql =`SELECT userID FROM users WHERE email="${email}";`;
        await db.query(sql, { plain: true, raw: false, type: QueryTypes.SELECT })
            .then((result) => {
                if (result !== null) return console.log('User exists!!!')

                const newUser = User.build({
                    firstName, lastName, email, dateOfBirth,
                     gender, profession, phoneNumber, password
                });
                newUser.save()
                    .then((newUser) => console.log('new User created'))
                    .catch(err => console.log(err));
                return res.send('user created succesfully');
            })
            .catch((err) => console.log(err))
        
    } catch {
        console.log("server error");
    }
   
}

const signIn = async (req, res) => {
    try{
        const { email, password} = req.body;

        const sql = `SELECT email, password FROM users WHERE email="${email}" AND password="${password}";`;
        await db.query(sql, { plain: true, raw: false, type: QueryTypes.SELECT })
            .then((result) => {
                if (result === null) return console.log('User not exists!!!');
                console.log(result)
                return res.send("Logged in successfully");
            })
            .catch((err) => console.log(err))

    } catch {
        console.log("server error");
    }

}

const profileUpdate = async (req, res) => {
    try{
        const { firstName, lastName, email, dateOfBirth,
            gender, profession, phoneNumber, password} = req.body;
        
       const sql =`UPDATE users SET firstName = "${firstName}",
        lastName = "${lastName}", email = "${email}", dateOfBirth = "${dateOfBirth}",
       profession = "${profession}", phoneNumber = "${phoneNumber}",
        password = "${password}" WHERE userID=2;`;
        //userID will get through the payload after implementing authentication

       await db.query(sql,{ type : QueryTypes.UPDATE} )
           .then((result) => {
               if (result === null) return console.log('Bad request!!!');
                console.log(result[1]);
                if(result[1]===1)
                    return res.send("profile updated successfully");
                return res.send('not updated');
           })
           .catch((err) => console.log(err))

    } catch {
        console.log("server error");
    }
}

module.exports = {signUp, signIn, profileUpdate};
