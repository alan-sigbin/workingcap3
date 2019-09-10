const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
	guestname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Guest', GuestSchema);