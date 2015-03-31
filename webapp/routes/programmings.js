var router = require('express').Router();
var pro = require('../models/programming');

router.get('/', function(req, res, next) {
	pro.findOne({
		userId: req.cookies.user
	}, function(err, item) {
		if (err) return next(err);

		res.send(item);
	});
});

router.put('/', function(req, res, next) {
	var newP = new pro(req.body);
	newP.userId = req.cookies.user;

	newP.validate(function(err) {
		if (err) return next(err);

		pro.update({
			_id: newP._id,
			userId: req.cookies.user
		}, newP.toObject(), {
			upsert: true
		}, function(err, count) {
			if (err) return next(err);
			if (count != 1) return res.sendStatus(500);

			res.sendStatus(200);
		});
	});
});

module.exports = router;