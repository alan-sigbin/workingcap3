const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Guest = require('../../models/Guest');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config');

router.post('/', 
	[
		check('guestname', 'Name is required').not().isEmpty(),
		check('email', 'Please use a valid email').isEmail(),
		check('password', 'Please enter a password with 8 more character').isLength({min:8})
	], async (req, res) => {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()})
		}

		//Destructure req.body
		const {guestname, 
			email, 
			password} = req.body;
	try {
		//Check if the guest exist.
		let guest = await Guest.findOne({email});
		if(guest) {
			return res.status(400).json({errors: [{msg: 'guest exists'}]})
		}
		//Get guest email
		const avatar = gravatar.url(email, {
			s: "200",
			r: "pg",
			d: "mm"
		})

		guest = new Guest({
			guestname,
			email,
			avatar,
			password,
		});
		// console.log(guest);

			//Encrypt Password
			const salt = await bcrypt.genSalt(10);
			guest.password = await bcrypt.hash(password, salt);
			await guest.save();

			//Return jsonwebtoken
			const payload = {
				guest: {
					id: guest.id,
					name: guest.guestname,
					avatar: guest.avatar
				}
			}
			jwt.sign(
				payload, 
				config.get("jwtToken"),
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

router.get('/', async (req, res) => {
	try {
		const guests = await Guest.find();
		res.json(guests);
	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;