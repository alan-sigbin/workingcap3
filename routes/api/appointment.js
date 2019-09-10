const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Appointment = require('../../models/Appointment');
const request = require('request');
const config = require('config')

//add appt
router.post("/", auth, async(req, res) => {
const {
	appt_date,
	appt_title,
	appt_code,
	appt_laborvalue,
	appt_client,
	appt_status,
	appt_price,
	appt_pickup
	} = req.body

const newAppt = {}
newAppt.appt_date = req.body.appt_date;
newAppt.appt_title = req.body.appt_title;
newAppt.appt_code = req.body.appt_code;
newAppt.appt_laborvalue = req.body.appt_laborvalue;
newAppt.appt_client = req.body.appt_client;
newAppt.appt_status = req.body.appt_status;
newAppt.appt_price = req.body.appt_price;
newAppt.appt_pickup = req.body.appt_pickup;

	try{
		appointment = new Appointment( newAppt );
		await appointment.save();
		res.json(appointment);
	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error')
	}
});


/////////////////Get Appointments by ID/////////////////
router.get('/:id', auth, async (req, res) => {

	try {
		const appt = await Appointment.find({});
		res.json(appt);
		// if(!appt) {
		// 	return res.status(400).json({msg: 'appointment not found'})
		// }
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/////////////////Get all Appointment/////////////////
router.get('/', auth, async (req, res) => {
	try {
		const appt = await Appointment.find().populate("appt_client",["guestname"]);
		res.json(appt);
	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/////////////////Update Status/////////////////
router.put('/updstat/:id', async (req, res) => {
	try {	
		const appt = await Appointment.findOneAndUpdate(
				{_id: req.params.id},
				{$set:{
					appt_status: "released"
				}}
			);
		const allappt = await Appointment.find();
			return res.json(allappt);
	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
} );

/////////////////Update Status Pay/////////////////
router.put('/paidstat/:id', async (req, res) => {
	try {	
		const appt = await Appointment.findOneAndUpdate(
				{_id: req.params.id},
				{$set:{
					appt_status: "paid"
				}}
			);
		const allappt = await Appointment.find();
			return res.json(allappt);
	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
} );


module.exports = router;