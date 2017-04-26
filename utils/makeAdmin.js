conn = new Mongo();
db = conn.getDB("loginapp");
db.courses.insert({CourseID: courseCode, name: courseName})
