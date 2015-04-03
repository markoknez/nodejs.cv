var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'mRo',
		userName: req.cookies.user
	});
});

router.get('/test', function(req, res, next) {
	var options = {
		root: __dirname + '/../'
	};
	res.sendFile('views/test.html', options);
});

module.exports = router;