const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
	organizer: {
		type: String
    },
	location: [
        country: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        mountain: {
            type: String,
            required: true
        }
    ],
    avatar: {
        type: String,
    },
    duration: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Entry', EntrySchema);