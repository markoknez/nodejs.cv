var router = require('express').Router();
var experience = require('../models/experience');

router.get('/', function(req, res, next) {
	experience.findOne({}, function(err, item) {
		if (err) return next(err);
		if(!item)
			item = new experience();
		res.send(item);
	});
});

router.put('/', function(req, res, next) {	
	experience.update({
			_id: req.body._id,
			userId: req.body.userId
		}, req.body, {
			upsert: true
		},
		function(err, response) {
			if (err) return next(err);
			if (response != 1) res.sendStatus(500);

			res.sendStatus(200);
		});
});

module.exports = router;