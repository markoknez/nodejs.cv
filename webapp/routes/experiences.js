var router = require('express').Router();
var experience = require('../models/experience');

router.get('/', function(req, res, next){
	experience.findOne({}, function (err, item){
		if(err) return next(err);

		res.send(item);
	});
});

module.exports = router;