var express = require('express');
var path = require('path');
var http = require ('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');

mongoose.connect('mongodb://localhost/loginapp')
var db = mongoose.connection;

var routes  = require ('./routes/index');
var users = require ('./routes/users');
var files = require ('./routes/files');
var course = require ('./routes/course');

//init app
var app = express();
var server = http.createServer(app)

//View engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//bodyParser Middleware
//setupcode. need middleware for modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//set static folder for publicly accessible content (stylesheet, img etc)
app.use(express.static(path.join(__dirname, 'public')));

//Express session (middleware)
app.use(session({
secret: 'secret',
saveUninitialized: true,
resave: true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//Express validator (middleware)
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
        root          = namespace.shift(),
        formParam     = root;

    while(namespace.length){
        formParam+= '[' + namespace.shift() + ']';
    }
    return{
        param: formParam,
        msg  : msg,
        value: value
    };
    }
}));

//Connect flash (middleware)
app.use(flash());

//Global variables for flash msg
//passport uses its own error msg, so we use error as well as our own error_msg
app.use(function (req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//File uploading
app.use(fileUpload());

//Route files (middleware)
app.use('/', routes);
app.use('/users', users);
app.use('/files', files);
app.use('/course', course);

//set port
app.set('port', (process.env.PORT || 3000));
//listen to port and tell user that connection has been established
app.listen(app.get('port'), function(){
    console.log('Server started on port' +app.get('port'));
});

