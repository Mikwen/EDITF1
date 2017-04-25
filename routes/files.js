var express = require('express');
//var fileupload = require('express-fileupload');
var router = express.Router();


router.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    //The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    let sampleFile = req.files.sampleFile;
    
    var course = req.body.course;
    var filename = sampleFile.name;

    // Use the mv() method to place the file somewhere on your server 
    sampleFile.mv('public/files/' + course + '/' + filename, function(err) {
        if (err)
            return res.status(500).send(err);

        res.redirect('back');
    });
});


module.exports = router;
