var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	email: String,
	location: {
		address: String,
		city: String,
		zip: String,
		state: String
	},
},{
	strict: true
});

var contact = mongoose.model('contact', schema);

module.exports = contact;