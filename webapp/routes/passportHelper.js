var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var dbUsers = require('../models/user');

passport.use(new LocalStrategy(
	function(username, password, done) {
		dbUsers.findOneAsync({
				email: username
			})
			.then(function(doc) {
				if (!doc) {
					return done(null, false, {
						message: 'User not found.'
					});
				} else if (!doc.validatePassword(password)) {
					return done(null, false, {
						message: 'Invalid password.'
					});
				} else {
					return done(null, doc);
				}
			})
			.catch(function(err) {
				done(err);
			});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
	dbUsers.findById(_id, function(err, user) {
		done(err, user);
	});
});

module.exports = passport;