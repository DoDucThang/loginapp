var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

router.get('/login', function (req, res) {
	res.render('login');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, res) {
				console.log(res)
				if (!res)
          			return done(null, false, {
            			message: 'Invalid Password'
         		});
       			var returnUser = {
         			username: user.username,
          			createdAt: user.createdAt,
          			id: user.id
       			};
       			return done(null, returnUser, {
         			message: 'Logged In Successfully'
        		});
			});
		});
	}));

router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/login');
	});

module.exports = router;