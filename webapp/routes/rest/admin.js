var router = require('express').Router();
var user = require('../../models/user');
var crypto = require('crypto');

/*
	Register new user
*/
router.post('/register', function (req, res, next){

	var newUser = new user(req.body);

	crypto.createHash('sha1')
	//validate user model
	newUser.validate(function (err){
		if(err)return next(err);

		//model is good, try to save (userId and email are unique on model level)
		newUser.save(function(err, item){			
			if(err) {
				if(err.name == "MongoError" && err.code == 11000)return res.status(400).send('Username or email already registered.');
				return next(err);
			}

			res.sendStatus(200);
		});
	});
})

module.exports = router;