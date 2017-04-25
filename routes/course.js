var fs = require('fs');
var Handlebars = require('handlebars');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    makeFileButtonString(req.query.course, function(returnstring) {
        var fileButtonString = new Handlebars.SafeString(returnstring);
        res.render('course', {
            course: req.query.course,
            courseAdmin: true,
            fileButtons: fileButtonString
        });
    });
});

function makeFileButtonString(course, callback){
    fs.readdir('public/files/' + course, function(err, items) {
        returnstring = '';
        for (var i in items) {
            returnstring += fileLink(course, items[i]) +'\n'; 
        }
        callback(returnstring);
    });
}

function fileLink(course, file) {
    return  '<li class="w3-hover-teal"><a href="#" onclick="showFile(\'files/' + course +'/' + file + '\')"><h3>' + file + '</h3></a></li>';
}


module.exports = router;
