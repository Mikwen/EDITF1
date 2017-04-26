var express = require('express');
var router  = express.Router();

var Lecture = require('../models/lecture')

// Register lecture
router.post('/lectures', function(req, res){
	var course = req.body.course;
	var roomNr = req.body.roomNr;
	var startDay = req.body.startDay;
	var startMonth = req.body.startMonth;
	var endDay = req.body.endDay;
	var endMonth = req.body.endMonth;
	var year = req.body.year;
	var startTime = req.body.startTime;
	var endTime = req.body.endTime;

	// Makes sure fields are not empty (Validation)
	req.checkBody('course', 'course is required').notEmpty();
	req.checkBody('roomNr', 'Room number is required').notEmpty();
	req.checkBody('startDay', 'Start day is required').notEmpty();
	req.checkBody('startMonth', 'Start month is required').notEmpty();
	req.checkBody('endDay', 'End day is required').notEmpty();
	req.checkBody('endMonth', 'End month is required').notEmpty();
	req.checkBody('year', 'Year is required').notEmpty;
	req.checkBody('startTime', 'Start time is required').notEmpty();
	req.checkBody('endTime', 'End time is required').notEmpty();
	//TODO: Check input format
	var errors = req.validationErrors();

//If there is an error it displays error and then re-renders the page
	if(errors){
		res.render('lecture',{
			errors:errors
		});
	} else {
		var lectureTime = new Date();
		lectureTime.setFullYear(year, startMonth, startDay);
		lectureTime.setHours(startTime.split(':')[0]);
		lectureTime.setMinutes(startTime.split(':')[1]);
		var finalDate = new Date();
		finalDate.setFullYear(year, endMonth, endDay);
		finalDate.setHours(endTime.split(':')[0]);
		finalDate.setMinutes(endTime.split(':')[1]);
		var lectureObjects = [];
		while (lectureTime <= finalDate) {
			var lectureStartTime = new Date(lectureTime);
			var lectureEndTime = new Date(lectureTime);
			lectureEndTime.setHours(endTime.split(':')[0]);
			lectureEndTime.setMinutes(endTime.split(':')[1]);
			console.log(course);
			console.log(roomNr);
			console.log(lectureStartTime);
			console.log(lectureEndTime);
			try{
			var newLecture = new Lecture({
				course: course,
				roomNr: roomNr,
				startTime: lectureStartTime,
				endTime: lectureEndTime
			});
			} catch(error) {
			console.log(error);
			}

			//takes in new lecture and callback
			//checks for an error
			Lecture.createLecture(newLecture, function(err, lecture){
				if(err) {console.log(err); throw err;}
				//console.log(lecture);
			});

			
			//set next lecture time in one week
			lectureTime.setDate(lectureTime.getDate() + 7);
		}
		
		/*for (var newLecture in lectureObjects) {
			//takes in new lecture and callback
			//checks for an error
			Lecture.createLecture(newLecture, function(err, lecture){
				if(err) {console.log(err); throw err;}
				//console.log(lecture);
			});
		}*/

        //Gives success msg and redirects to dashboard
		req.flash('success_msg', 'You have successfully added the lectures!');
		res.redirect('/');
	}
});

router.get('/lecture', function(req, res){
	Lecture.getLectureByCourseAndMonth(req.query.course, req.query.month, req.query.year, function(lectures){
		//res.json = lectures;
		console.log(lectures);
		res.send(lectures);
	});
		//res.redirect('/');
});

module.exports = router;
