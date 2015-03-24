var router = require('express').Router();
var education = require('../models/education');

router.get('/', function(req, res, next) {
	education.findOne(function(err, item) {
		if (err) return next(err);

		res.send(item);
	});
});

module.exports = router;