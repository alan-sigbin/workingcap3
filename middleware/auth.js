const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	//Get token from header
	const token = req.header('x-auth-token');

	//Check if there is no token
	if(!token) {
		return res.status(400).json({msg: 'Unauthorized'})
	}

	//Verify token
	try {
		const decoded = jwt.verify(token, config.get('jwtToken'));
		req.guest = decoded.guest;
		next();
	}catch(err) {
		console.error(err.message);
		res.status(400).json({msg: 'Invalid Token'})
	}
}