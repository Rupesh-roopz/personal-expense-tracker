const express = require('express');
const router = require('./src/routes/index')
const sequelize = require('./src/utils/db')
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/',router());

const connection = async () => {
    try {
        await sequelize.authenticate()
            .then(()=>{ 
                console.log('Connection has been established successfully.');
            sequelize
                .sync()
                    .then(result => {
                        console.log("syncronized model syccessfully");
                    }).catch( err => {
                        console.log(err);
                    })
            app.listen(port, (error) => {
                if(error) return console.log(error);
                console.log(`Connected to the server at port ${port}`);
        })
            })
            .catch(err => console.log('Database connection failed...'));
        

      } catch (error) {
        console.error('SERVER ERROR', error);
      }
}
connection();

