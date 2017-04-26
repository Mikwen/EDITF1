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

//Finds lecture by subject name and month
module.exports.getLectureBySubjectAndMonth = function(subject, month, callback){
	var query = {lectureId: lectureId,
				month: date.getMonth()
			};
	Lecture.findOne(query, callback);
}


