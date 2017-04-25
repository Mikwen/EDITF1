var express = require('express');
var router  = express.Router();

var lecture = require('../models/lecture')

// Register lecture
router.post('/lecture', function(req, res){
	var subject = req.body.subject;
	var roomNr = req.body.roomNr;
	var date = req.body.date;
	var time = req.body.time;

	// Makes sure fields are not empty (Validation)
	req.checkBody('subject', 'Subject is required').notEmpty();
	req.checkBody('roomNr', 'Room number is required').notEmpty();
	req.checkBody('date', 'Date is required').notEmpty();
	req.checkBody('time', 'Time is required').notEmpty();

	var errors = req.validationErrors();

//If there is an error it displays error and then re-renders the page
	if(errors){
		res.render('lecture',{
			errors:errors
		});
	} else {
		var newLecture = new Lecture({
			subject: subject,
			roomNr:roomNr,
			date: date,
			time: time
		});

        //takes in new lecture and callback
        //checks for an error
		Lecture.createLecture(newLecture, function(err, lecture){
			if(err) throw err;
			console.log(lecture);
		});

        //Gives success msg and redirects to dashboard
		req.flash('success_msg', 'You have successfully added a lecture!');
		res.redirect('/');
	}
});
