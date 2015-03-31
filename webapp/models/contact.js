var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	firstName: String,
	lastName: String,
	position: String,
	email: String,
	location: {
		address: String,
		city: String,
		zip: String,
		state: String
	},
	links: [{
		name: String,
		url: String
	}]
}, {
	strict: true
});

var contact = mongoose.model('contact', schema);

module.exports = contact;