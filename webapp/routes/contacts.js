var express = require('express');
var router = express.Router();
var contact = require('../models/contact');

router.get('/', function(req, res, next){
	contact.findOne(function (err, item){
		if(err)return next(err);

		res.send(item);
	})
});


module.exports = router;