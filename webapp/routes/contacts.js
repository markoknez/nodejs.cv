var express = require('express');
var router = express.Router();
var contact = require('../models/contact');

router.get('/', function(req, res, next) {
	contact.find({
		userId: req.cookies.user
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


module.exports = router;