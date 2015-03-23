var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String
});

var user = mongoose.model('user', userSchema);

module.exports = user;