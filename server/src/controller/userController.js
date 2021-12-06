const User = require('../models/userModel');
const db = require('../utils/db');
const {QueryTypes}  = require('sequelize');
const { signupValidation } = require('../helpers/validations/signupValidation');
const { signinValidation } = require('../helpers/validations/signinValidation');
const http = require('../constants/http');

const signUp = async (req, res) => {
    try{
        const error = await signupValidation(req);
        if (Object.keys(error).length) {
            console.log(error)
            return res.status(http.BAD_REQUEST).json({ error });
        }
        const { firstName, lastName, email, dateOfBirth,
            gender, profession, phoneNumber, password } = req.body;
        const newUser = User.build({
                    firstName, lastName, email, dateOfBirth,
                    gender, profession, phoneNumber, password
                });
        newUser.save()
            .then(() => {
                console.log('new User created');
                return res.status(http.SUCCESS).send('user created succesfully');
            })
            .catch(err => {
                console.log(err);
                res.status(http.INTERNAL_SERVER_ERROR);
            });
    } catch {
        res.status(http.INTERNAL_SERVER_ERROR);
    }
   
}

const signIn = async (req, res) => {
    try{
        const error = await signinValidation(req);
        if (Object.keys(error).length) {
            console.log(error)
            return res.json(error)
        }
        const { email, password} = req.body;

        const sql = `SELECT email, password FROM users WHERE email="${email}" AND password="${password}";`;
        await db.query(sql, { plain: true, raw: false, type: QueryTypes.SELECT })
            .then((result) => {
                if (result === null) 
                    return res.status(http.BAD_REQUEST)
                            .json({ err : 'Invalid Login Credentials' });
                return res.status(http.SUCCESS).send("Logged in successfully");
            })
            .catch((err) =>{
                 console.log(err);
                 res.status(http.INTERNAL_SERVER_ERROR);
                })
    
    } catch {
        res.status(http.INTERNAL_SERVER_ERROR);
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
                    return res.status(http.SUCCESS).send("profile updated successfully");
                return res.send('not updated');
           })
           .catch((err) =>{
                console.log(err);
                res.status(http.INTERNAL_SERVER_ERROR);
            })

    } catch {
        res.status(http.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {signUp, signIn, profileUpdate};
