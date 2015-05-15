var express = require('express');
var router = express.Router();
var contact = require('../../models/contact');

router.get('/:userId', function(req, res, next) {
	contact.find({
		userId: req.params.userId
	}, function(err, items) {
		if (err) return next(err);
		var item;
		if (items.length == 0)
			item = new contact();
		else
			item = items[0];
		res.send(item);
	})
});

router.put('/', function(req, res, next) {
	var newC = new contact(req.body);
	newC.userId = req.user.email;

	newC.validate(function(err) {
		if (err) return next(err);

		contact.update({
			_id: newC._id,
			userId: req.user.email
		}, newC.toObject(), {
			upsert: true
		}, function(err, raw) {
			if(err)return next(err);
			if(raw.n != 1)return res.sendStatus(500);

			res.sendStatus(200);
		});
	});
});

module.exports = router;