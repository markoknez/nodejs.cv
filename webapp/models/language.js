var mongoose = require('mongoose');
var _ = require('underscore');

var schema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	languages: [{
		language: {
			type: String,
			required: true
		},
		summary: String
	}]
}, {
	strict: true
});

var language = mongoose.model('language', schema);

module.exports = language;