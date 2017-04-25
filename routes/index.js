var Handlebars = require('handlebars');
var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index', {
        username: req.user.name,            
        helpers: {
            courseButtons: function() {
                returnstring = '';
                var courses = ['TDT4150', 'TDT4314', 'TDT3513', 'TDT4355'];
                for (var i in courses) {
                    returnstring += courseLink(courses[i]) + '\n'; 
                }
                return new Handlebars.SafeString(returnstring);
            }
        }
    });
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
