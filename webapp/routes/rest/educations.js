var router = require('express').Router();
var education = require('../../models/education');

router.get('/:userId', function(req, res, next) {
	education.findOne({
		userId: req.params.userId
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
	edu.userId = req.user.email;

	edu.validate(function(err) {
		if (err) return next(err);

		education.update({
			_id: req.body._id,
			userId: req.user.email
		}, edu.toObject(), {
			upsert: true
		}, function(err, raw) {
			if (err) return next(err);
			if (raw.n != 1) return res.sendStatus(500);

			res.sendStatus(200);
		});
	});
});

module.exports = router;