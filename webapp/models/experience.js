var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	experiences: {
		type: [{
			title: {
				type: String,
				required: true
			},
			summary: String,
			implementationChallenges: String,
			learned: String,
			technology: [String],
			team: String,
			length: String,
			duration: {
				from: {
					type: Number,
					required: true
				},
				to: Number
			}
		}]
	}
}, {
	strict: true
});

var experience = mongoose.model('experience', schema);

module.exports = experience;