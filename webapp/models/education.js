var mongoose = require('mongoose');
var _ = require('underscore');

var schema = new mongoose.Schema({
	duration: {
		from: {type: Number, required: true},
		to: {type: Number, required: false}
	},
	title: {type: String, required: true},
	thesis:{
		name: {type: String, required: true},
		explanation: {type: String, required: true}
	},
	location: String
},{
	strict: true
});

schema.path('duration.from')

var education = mongoose.model('education', schema);

module.exports = education;