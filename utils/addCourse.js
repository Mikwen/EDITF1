conn = new Mongo();
db = conn.getDB("loginapp");
db.courses.update({CourseID:courseCode, name: courseName}, 
                  {CourseID: courseCode, name: courseName}, 
                  {upsert:true})
