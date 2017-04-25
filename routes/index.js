var Handlebars = require('handlebars');
var express = require('express');
var router = express.Router();
var http = require('http');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	var options = {
		host: 'localhost',
		port: '3330',
		path: '/users/user_courses?userId='+req.user.username
	}
	http.request(options, function(response) {
		var str = ''
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			var courses = JSON.parse(str);
			buttonString = '';
			for (var i in courses) {
                buttonString += courseLink(courses[i]) + '\n'; 
            }
			var buttonString = new Handlebars.SafeString(buttonString);
			res.render('index', {
				username: req.user.name,
				courseButtons: buttonString
			});
			
		});
	}).end();
});

function courseLink(course) {
    return  '<li class="w3-hover-teal"><a href="course?course=' + course + '"><h3>' + course + '</h3></a></li>';
}

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
