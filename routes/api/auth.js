const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const Guest = require('../../models/Guest');


// router.get('/', (req, res) => res.send('Auth route'))
router.get('/', auth, async (req, res) => {
	try {
		const guest = await Guest.findById(req.guest.id).select("-password");
		res.json(guest);
	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error')
	}
});
// router.post('/') 
router.post("/", [
		check("email", "Please use a valid email").isEmail(),
		check("password", "Password is required").exists()
	], async(req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}

	//Destructure req.body
	const {email, password} = req.body;
	console.log(req.body)
	try {
		//Check if the guest exists
		let guest = await Guest.findOne({email});
		if(!guest) {
			return res.status(400).json({errors: [{msg: "Invalid Credentials"}]})
		}

		const isMatch = await bcrypt.compare(password, guest.password);

		if(!isMatch) {
			return res.status(400).json({errors: [{msg: "Invalid Credentials"}]})
		}

	//Return jsonwebtoken
	const payload = {
		guest: {
			id: guest.id
		}
	};

	jwt.sign(
		payload, 
		config.get('jwtToken'),
		{expiresIn: 360000},
		(err, token) => {
			if(err) throw err;
			res.json({token});
		}
	);

	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


module.exports = router;