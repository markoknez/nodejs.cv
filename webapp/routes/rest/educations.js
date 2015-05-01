var router = require('express').Router();
var education = require('../../models/education');

router.get('/', function(req, res, next) {
	education.findOne({
		userId: req.cookies.user
	}, function(err, item) {
		if (err) return next(err);
		if (!item)
			item = new education();

		res.send(item);
	});
});

router.put('/', function(req, res, next) {
	var edu = new education(req.body);
	//overwrite userId with what is logged in session
	edu.userId = req.cookies.user;

	edu.validate(function(err) {
		if (err) return next(err);

		education.update({
			_id: req.body._id,
			userId: req.cookies.user
		}, edu.toObject(), {
			upsert: true
		}, function(err, result) {
			if (err) return next(err);
			if (result != 1) return res.sendStatus(500);

			res.sendStatus(200);
		});
	});
});

module.exports = router;