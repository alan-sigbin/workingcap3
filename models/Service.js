const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
			title: {
				type: String,
				required: true
			},
			code: {
				type: String,
				required: true
			},
			appt_laborvalue: {
				type: Number,
				default: 1
			},
			price: {
				type: Number,
				required: true
			},
			description: {
				type: String,
				required: true
			}
});

module.exports = mongoose.model('Service', ServiceSchema);