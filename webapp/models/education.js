var mongoose = require('mongoose');
var _ = require('underscore');

var schema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	duration: {
		from: {
			type: Number,
			required: true
		},
		to: {
			type: Number,
			required: false
		}
	},
	title: {
		type: String,
		required: true
	},
	thesis: {
		name: {
			type: String,
			required: true
		},
		explanation: {
			type: String,
			required: true
		}
	},
	location: String
}, {
	strict: true
});


var education = mongoose.model('education', schema);

module.exports = education;