var mongoose = require('mongoose');
var _ = require('underscore');

var userSchema = new mongoose.Schema({	
	userId: {type: String, required: true, unique: true},
	firstName: String,
	lastName: String,
	email: {type: String, required: true, unique: true},
	passwordSalt: String,
	password: String,
	hitCount: Number
}, {
	strict: true //save only schema fields
});

var User = mongoose.model('user', userSchema);

module.exports = User;