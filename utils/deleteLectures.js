conn = new Mongo();
db = conn.getDB("loginapp");
db.lectures.remove({course : course})
