var router = require('express').Router();
var pro = require('../../models/programming');
var _ = require('underscore');



router.get('/prog', function(req, res, next) {
	pro.findOne({
		userId: req.cookies.user
	}, function(err, item) {
		if (err) return next(err);
		if (!item) return res.status(200).send(null);

		res.send(item.languages);
	});
});

router.put('/prog', function(req, res, next) {
	pro.update({
		userId: req.cookies.user
	}, {
		$set: {
			languages: req.body.languages
		}
	}, {
		upsert: true
	}, function(err, count) {
		if (err) return next(err);
		if (count != 1) return res.sendStatus(500);

		res.sendStatus(200);
	});
});

router.get('/themes', function(req, res, next) {
	pro.findOne({
		userId: req.cookies.user
	}, {
		themes: 1
	}, function(err, doc) {
		if (err) return next(err);
		if (!doc) return res.status(200).send(null);

		res.send(doc.themes);
	});
});

router.get('/themes/:id', function(req, res, next) {
	pro.findOne({
		userId: req.cookies.user,
		'themes._id': req.params.id
	}, {
		'themes.$': 1
	}, function(err, doc) {
		if (err) return next(err);
		if (!doc || !doc.themes || doc.themes.length == 0) return res.sendStatus(500);

		res.send(doc.themes[0]);
	})
});

router.put('/themes', function(req, res, next) {
	function handleResponse(err, count) {
		if (err) return next(err);

		res.sendStatus(200);
	}

	pro.findOne({
		userId: req.cookies.user
	}, function(err, doc) {
		if (err) return next(err);
		if (!doc) {
			//insert new one
			var newP = new pro();
			newP.userId = req.cookies.user;
			newP.themes.push(req.body);
			newP.save(handleResponse);			
		} else {
			var theme = _.findWhere(doc.themes, {
				_id: req.body._id
			});
			if (!theme) {
				doc.themes.push(req.body);
			} else {
				theme.title = req.body.title;
				theme.text = req.body.text;
			}

			doc.save(handleResponse);
		}
	});
});

router.delete('/themes/:id', function(req, res, next) {
	pro.findOne({
		userId: req.cookies.user
	}, function(err, doc){
		if(err)return next(err);
		if(!doc)return res.sendStatus(404);

		doc.themes.pull({_id:req.params.id});
		doc.save(function (err, count){
			if (err) return next(err);

			res.sendStatus(200);
		});
	});
	// pro.update({
	// 	userId: req.cookies.user,
	// }, {
	// 	$pull: {
	// 		'themes._id': req.params.id
	// 	}
	// }, function(err, count) {
	// 	if (err) return next(err);

	// 	if (count == 0) return res.sendStatus(404);

	// 	pro.update({
	// 		userId: req.cookies.user,
	// 	}, {
	// 		$pull: {
	// 			'themes': null
	// 		}
	// 	}, function(err, count) {
	// 		if (err) return next(err);

	// 		if (count == 0) return res.sendStatus(500);
	// 		res.sendStatus(200);
	// 	});
	// })
});

module.exports = router;