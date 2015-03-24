var mongoose = require('mongoose');
var _ = require('underscore');

var userSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	email: String,
	hitCount: Number
}, {
	strict: true //save only schema fields
});

var user = mongoose.model('user', userSchema);

module.exports = user;