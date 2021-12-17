const jwt = require('jsonwebtoken');
const http = require('../constants/http');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == undefined) {
            console.log(http.FORBIDDEN)
            return res.status(http.FORBIDDEN);
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
            if (err) {
                throw err;
            };
            req.user_id = result.ID;
            next();
        });
    } catch(error) {
        res.status(http.UNAUTHORISED).json(error)
    }
    
}

module.exports = authenticateToken ;