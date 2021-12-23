const jwt = require('jsonwebtoken');
const http = require('../constants/http');

const authenticateToken = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (token == undefined) {
			return res.status(http.UNAUTHORISED);
		}
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
			if (err) {
				throw err;
			};
			req.user_id = result.id;
			req.isAdmin = result.isAdmin;
			next();
		});
	} catch(error) {
		res.status(http.FORBIDDEN);
	}
    
};

module.exports = authenticateToken ;