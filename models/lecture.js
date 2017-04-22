var mongoose = require('mongoose');


var LectureSchema = mongoose.Schema({
	lectureID: {
		type: String,
		index:true
	},
	subject: {
		type: String
	},
    roomNr: {
		type: Number
	}
});


var Lecture = module.exports = mongoose.model('Lecture', LectureSchema);