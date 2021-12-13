const { sequelize, Sequelize, User } = require('../models')
const jwt = require('jsonwebtoken');
const { signupValidation } = require('../helpers/validations/signupValidation');
const { signinValidation } = require('../helpers/validations/signinValidation');
const http = require('../constants/http');
require('dotenv').config();

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
                res.status(http.BAD_REQUEST);
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
        const { email, password } = req.body;
        
        const sql = `SELECT id FROM users WHERE email="${email}" AND password="${password}";`;
        await sequelize.query(sql, { plain: true, raw: false, type: Sequelize.QueryTypes.SELECT })
            .then(result => {
                if (result === null) 
                    return res.status(http.BAD_REQUEST)
                            .json({ err : 'Invalid Login Credentials' });
                const userPayload = {
                    ID : result.id
                }
                const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET);
                res.cookie('token', accessToken,
                    { expires : new Date(Date.now() + 90000000) });
            
                return res.status(http.SUCCESS).json({
                    accessToken : accessToken
                });
            })
            .catch((err) =>{
                 console.log(err);
                 res.status(http.BAD_REQUEST);
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

       await sequelize.query(sql,{ plain: true, raw: false, type: QueryTypes.SELECT })
           .then((result) => {
               if (result === null) return console.log('Bad request!!!');
                console.log(result[1]);
                if(result[1]===1)
                    return res.status(http.SUCCESS).send("profile updated successfully");
                return res.send('not updated');
           })
           .catch((err) =>{
                console.log(err);
                res.status(http.BAD_REQUEST);
            })

    } catch {
        res.status(http.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {signUp, signIn, profileUpdate};
