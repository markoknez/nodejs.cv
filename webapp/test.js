var _ = require('underscore');
var mongoose = require('mongoose');
var experience = require('./models/experience');

var a = new experience({userId: 'marko'});
a.validate(function (err){
	if(err) return console.log(err);

	console.log('no validation errors');
})

// mongoose.connect('mongodb://localhost/cv', function(){
// 	console.log('database connecton open');

// 	experience.findOne(function (err, item){
// 		console.log(item);
// 	});
// });