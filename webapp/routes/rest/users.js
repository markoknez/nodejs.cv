var express = require('express');
var router = express.Router();
var passport = require('../passportHelper');
var dbUsers = require('../../models/user');
var _ = require('underscore');

/** GET users listing. */
router.get('/', function(req, res, next) {
	dbUsers.find({}, {
		name: 1,
		email: 1,
		hitCount: 1
	}, function(err, users) {
		if (err) return next(err);
		res.send(users);
	});
});

/** POST - inserts new user */
router.post('/', function(req, res, next) {
	dbUsers.count({
		name: req.body.name
	}, function(err, count) {
		if (err) return next(err);

		// if (count != 0) return res.status(400).send('User with name [userName] exists'.replace(/userName/, req.body.name));

		dbUsers.create(req.body, function(err, item) {
			if (err) return next(err);

			//user saved successfully
			res.send('User sucessfully saved - [userId]'.replace(/userId/, item._id));
		});
	});
});

router.put('/:userId', function(req, res, next) {
	if (!req.params.userId)
		return res.sendStatus(404);

	dbUsers.update({
		_id: req.params.userId
	}, {
		$inc: {
			hitCount: 1
		}
	}, function(err, raw) {
		if (err) return next(err);
		if (raw.n == 0) return res.sendStatus(404);

		res.sendStatus(200);
	});
});

/** DELETE - deletes user with give id from db */
router.delete('/:userId', function(req, res, next) {
	var userId = req.params.userId;
	if (!userId)
		return res.sendStatus(404);

	dbUsers.remove({
		_id: userId
	}, function(err, response) {
		if (response != 1)
			return res.status(400).send('User with id [userId] not found.'.replace(/userId/, userId));
		res.sendStatus(200);
	});
});

router.get('/login/:username', function(req, res, next) {
	dbUsers.findOne({
		email: req.params.username
	}, function(err, item) {
		if (err) return next(err);
		if (!item) return res.sendStatus(401);

		req.login(item, function(err) {
			if (err) return next(err);
			res.redirect('/');
		});

	});
});

/** GET - login/authenticate handler */
router.post('/login', function(req, res, next) {
	if (req.body.username && req.body.password) {
		formAuthentication(req, res, next);
	} else {
		sessionAuthentication(req, res, next);
	}
});

/** POST - logout handler */
router.get('/logout', function(req, res, next) {
	req.logout();
	res.sendStatus(200);
});

function formAuthentication(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) return next(err);
		if (!user) {
			return res.status(401).send(info.message);
		}

		req.login(user, function(err) {
			if (err) return next(err);

			res.send(user);
		});
	});
}

function sessionAuthentication(req, res, next) {
	//check if user is already logged in and return user
	if (req.user) {
		return res.send(req.user);
	} else {
		return res.sendStatus(401);
	}
}

module.exports = router;