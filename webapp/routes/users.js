var express = require('express');
var router = express.Router();
var user = require('../models/user');
var _ = require('underscore');

/* GET users listing. */
router.get('/', function(req, res, next) {
	user.find({}, {
		name: 1,
		email: 1,
		hitCount: 1
	}, function(err, users) {
		if (err) return next(err);
		res.send(users);
	});
});

/* POST - inserts new user */
router.post('/', function(req, res, next) {
	user.count({
		name: req.body.name
	}, function(err, count) {
		if (err) return next(err);

		// if (count != 0) return res.status(400).send('User with name [userName] exists'.replace(/userName/, req.body.name));

		user.create(req.body, function(err, item) {
			if (err) return next(err);

			//user saved successfully
			res.send('User sucessfully saved - [userId]'.replace(/userId/, item._id));
		});
	});
});

router.put('/:userId', function(req, res, next) {
	if (!req.params.userId)
		return res.sendStatus(404);
	
	user.update({
		_id: req.params.userId
	}, {
		$inc: {
			hitCount: 1
		}
	}, function(err, result) {
		if (err) return next(err);
		if (result == 0) return res.sendStatus(404);

		res.sendStatus(200);
	});
});

/* DELETE - deletes user with give id from db*/
router.delete('/:userId', function(req, res, next) {
	var userId = req.params.userId;
	if (!userId)
		return res.sendStatus(404);

	user.remove({
		_id: userId
	}, function(err, response) {
		if (response != 1)
			return res.status(400).send('User with id [userId] not found.'.replace(/userId/, userId));
		res.sendStatus(200);
	});
});

module.exports = router;