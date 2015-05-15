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

/**
 * Validates user password according to instance
 * @param  {String} password 	- Password to validate
 * @return {Boolean}          	- Result if password is valid
 */
userSchema.methods.validatePassword = function (password){
	return this.password === password;
}

var User = mongoose.model('user', userSchema);


module.exports = User;