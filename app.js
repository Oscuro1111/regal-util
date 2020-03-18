var createError = require('http-errors');
var fs = require('fs');
var ejs = require('ejs');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var events = require('events');
var expressValidator = require('express-validator');
var indexRouter = require('./routes/index');
//var temp = require('./test/temp');

var shareAble = {};

//Getting routes
var form = require('./routes/form'),
	login = require('./routes/login'),
	signeUp = require('./routes/signUp'),
	signingUp = require('./routes/signingUp'),
	home = require('./routes/Home'),
	//posts = require('./routes/post'),
	logout = require('./routes/logout'),
	//getPost= require('./routes/getPost.js'),
	//putPost = require('./routes/putPost'),
	//deletePost = require('./routes/delete')
	upload = require('./routes/regalfiles/fileHandler');
var fileUploads = require('./node_modules/express-fileupload');

var postCreator = require('./routes/uploadPostImages');

var app = express();
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'mySaltingKey', resave: true, saveUninitialized: false }));
app.use(cookieParser());

app.use(
	fileUploads({
		limits: { fileSize: 50 * 1024 * 1024 * 1024 },
	})
);
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append(
		'Access-Control-Allow-Headers',
		'Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
	);
	res.append('Access-Control-Allow-Credentials', true);
	next();
});
//app.use('/work', temp(express, __dirname + '/public', fs));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter(__dirname + '/public'));
app.use(postCreator(__dirname + '/public', express, fs, shareAble));

app.use(home(express, __dirname + '/public', fs));
app.use(signeUp(express, __dirname + '/public', fs));
app.use(logout(express, __dirname + '/public', fs));

// catch 404 and forward to error handler

module.exports = {
	initialize: models => {
		app.use(login(express, expressValidator, fs, __dirname + '/views', models));

		app.use(signingUp(express, __dirname + '/views', fs, expressValidator, models));

		//app.use(getPost(express,shareAble,__dirname,models));
		//app.use(posts(__dirname,express,models));
		// app.use(putPost(__dirname ,express,ejs,models,fs));

		//app.use(deletePost(express , models));
		app.use(upload(express, fs, __dirname, models));
		app.use(require('./routes/regalfiles/fileDownload')(express, fs, __dirname, models));
		app.use(require('./routes/regalfiles/sendFile')(express, fs, __dirname, models));

		// error handler

		if (process.env.ERROR_ROUTE) {
			app.get('/dev/error', function(req, res, next) {
				var err = new Error('Not Found what you looking for!');
				err.status = 404;
				next(err);
			});
		} else {
			app.use(function(req, res, next) {
				next(createError(500));
			});
		}
		app.use(function(err, req, res, next) {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};

			// render the error page
			res.status(err.status || 500);
			res.render('error');
		});
		return app;
	},
	shareAble: shareAble,
};
