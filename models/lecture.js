var mongoose = require('mongoose');

//Lecture schema
var LectureSchema = mongoose.Schema({
/*	lectureId: {
		type: String,
		index:true
	},*/
	course: {
		type: String
	},
    roomNr: {
		type: String
	},
    startTime: {
        type: Date
    },
	endTime: {
		type: Date
	}
});

//Variable that is accessable outside this file (mongoose)
var Lecture = module.exports = mongoose.model('Lecture', LectureSchema);

//Creates a new lecture function
module.exports.createLecture = function(newLecture, callback){
	newLecture.save(callback);
}

removeQuotes = function(str) {
	return str.replace(/^"(.*)"$/, '$1');
}

//Finds lecture by subject name and month
module.exports.getLectureByCourseAndMonth = function(course, month, year, callback){
	var pureMonth = Number(removeQuotes(month));
	var pureYear = Number(removeQuotes(year));
	var pureCourse = removeQuotes(course);
	var monthStart = new Date(pureYear, pureMonth, 1);
	console.log(monthStart);
	var monthEnd = new Date(pureYear, pureMonth +1, 1);
    console.log(monthEnd);
	var query = {course : pureCourse,
				startTime: {
					$gte: monthStart, 
					$lt: monthEnd
				}
			};
	console.log(query);
	Lecture.find(query, function(err, person) {
						if (err) console.log(err);
						callback(person)});
}


