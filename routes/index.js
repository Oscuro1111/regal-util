var express = require('express');
var router = express.Router();

var fs = require('fs');
/* GET home page. */

module.exports = function(dir) {
	router.get('/', function(req, res, next) {
		if (!req.session.admin) {

			fs.readFile(dir + '/static/Login/login.html', (err, data) => {
				if (err) throw err;
				console.log('Data');
				res.status(200).send(" "+data);
			});
		}else{
      res.redirect('/auth/home');
    }
	});
	return router;
};
