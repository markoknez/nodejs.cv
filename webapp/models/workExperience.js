var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: String,
	summary: String,
	learned: String,
	technology: [],
	team: String,
	length: Number
});

var workExperience = mongoose.model('workExperience', schema);

module.exports = workExperience;