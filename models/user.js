var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	courses_attending: {
		type: [String]
	},
	courses_administrating: {
		type: [String]
	}
});



//Variable that is accessable outside this file (mongoose)
var User = module.exports = mongoose.model('User', UserSchema);

//Function to create user
//Takes in new user and a callback function
//Uses bcrypt to hash password
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

//Function to see if the username brought in matches an already established user
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

//Function to see if the userid brought in matches and already established user id.
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

//Function to see if the password brought in matches the password for the eastablished user. 
//uses bcrypt because of the hashing
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

	

//Function to add courses the user is attending in an array
//TODO: Remove duplicates and null.
module.exports.addCourseAttending = function(userId, courseId, callback){
	User.getUserByUsername(userId, function(err, user){
		var found = false;
		for (var course in user.courses_attending) {
			if (course == courseId) {
				found = true;
			}
		}
		// if (user.courses_attending == undefined){
		// 	user.courses_attending = []; 
		// }
		if (!found){
			user.courses_attending.push(courseId);
			user.save(callback);
		}
	});
}

//Search through the database for courses based on the username
module.exports.getCoursesByUsername = function(userId, callback){
	User.getUserByUsername(userId, function(err, user){
		callback(user.courses_attending);
	});
}

//Find courses where you are admin.
module.exports.getAdminCoursesByUsername = function(userId, callback){
	User.getUserByUsername(userId, function(err, user){
		callback(user.courses_administrating);
	});
}
