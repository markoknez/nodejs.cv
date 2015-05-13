var router = require('express').Router();
var lang = require('../../models/language');

router.get('/', function(req, res, next) {
	lang.findOne({
		userId: req.cookies.user
	}, function(err, item) {
		if (err) return next(err);

		if (!item)
			item = new lang();

		res.send(item);
	});
});

router.put('/', function(req, res, next) {
	var newLang = new lang(req.body);
	newLang.userId = req.cookies.user;

	newLang.validate(function(err) {
		if (err) return next(err);

		lang.update({
			_id: newLang._id,
			userId: req.cookies.user
		}, newLang.toObject(), {
			upsert: true
		}, function(err, raw) {
			if (err) return next(err);
			if (raw.n != 1) return res.sendStatus(500);
			
			res.sendStatus(200);
		});
	});
});

module.exports = router;