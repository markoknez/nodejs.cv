var _ = require('underscore');
var mongoose = require('mongoose');
var user = require('./models/user');
var workExperience = require('./models/workExperience');

mongoose.connect('mongodb://localhost/cv', function(){
	console.log('database connecton open');

	console.log(new workExperience());
});