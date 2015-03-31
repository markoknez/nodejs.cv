var mongoose = require('mongoose');
var _ = require('underscore');

var schema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	languages: String
}, {
	strict: true
});

var prog = mongoose.model('programming', schema);

module.exports = prog;