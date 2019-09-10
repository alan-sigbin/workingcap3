const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
			appt_date: {
				type: Date
			},
			appt_title: {
				type: String
			},
			appt_code: {
				type: String
			},
			appt_laborvalue: {
				type: Number
			},
			appt_client: {
				type: Schema.Types.ObjectId,
				ref: "Guest"
			},
			appt_status: {
				type: String,
				default: "pending"
			},
			appt_price: {
				type: Number
			},
			appt_pickup: {
				type: String
			},
			appt_paid: {
				type: Boolean,
				default: false
			}

});

module.exports = mongoose.model('Appointment', AppointmentSchema);