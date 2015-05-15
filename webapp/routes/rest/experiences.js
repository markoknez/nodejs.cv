var router = require('express').Router();
var experience = require('../../models/experience');

router.get('/:userId', function(req, res, next) {
	experience.findOne({
		userId: req.params.userId
	}, function(err, item) {
		if (err) return next(err);
		if (!item)
			item = new experience();

		res.send(item);
	});
});

router.put('/', function(req, res, next) {
	var exp = new experience(req.body);
	//overwrite userId with what is logged in session
	exp.userId = req.user.email;

	exp.validate(function(err) {
		if (err) return next(err);

		experience.update({
			_id: exp._id,
			userId: req.user.email
		}, exp.toObject(), {
			upsert: true
		}, function(err, raw) {
			if (err) return next(err);
			if (raw.n != 1) return res.sendStatus(500);

			res.sendStatus(200);
		});
	});
});

module.exports = router;