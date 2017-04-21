var express = require('express');
var router  = express.Router();
var passport = require ('passport');
var LocalStrategy= require('passport-local').Strategy;

var User = require('../models/user')

//Register route
router.get('/register', function(req, res){
    res.render('register');
});

//Login route
router.get('/login', function(req, res){
    res.render('login');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

//If there is an error it displays error and then re-renders the page
	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

        //takes in new user and callback
        //checks for an error
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

        //Gives success msg and redirects to login screen
		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/users/login');
	}
});

//Gets username, matches what you put in and then validates password
//If username does not match any users, returns 'unknown user'.
//Keeps going on match
passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}
    
    //Gets password and matches it for the user.
    //If there is no match the user you put in, returns ' invalid password'
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

//since each subsequent request will not contain credentials, but have unique cookies that identifies
//sessions, one has to use serializer and deserializer to support login sessions.
//Passport will serialize and deserialize instances to and from the session. 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//decides what happens on failure and success + whether or not to use flashmsg
//redirects using local strategy
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

//Lets a user log out of the application.
//Gives success msg when logged out.
//Redirects to the login page.
router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;