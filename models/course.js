var mongoose = require('mongoose');


var CourseSchema = mongoose.Schema({
	CourseID: {
		type: String,
		index:true
	},
	name: {
		type: String
	}
});

var Course = module.exports = mongoose.model('Course', CourseSchema);
