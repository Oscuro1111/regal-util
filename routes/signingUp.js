module.exports = function (express, dir, fs, expressVal, models) {
	return (exp => {
		var Models = models;
		var router = exp.Router();
		var $fs = fs;

		router.post(
			'/signingUp',
			[
				expressVal.check('userName').isLength({ min: 3 }),
				expressVal.check('userPassword').isLength({ min: 8 }),
				expressVal.check('userEmail').isEmail(),
			],
			function (req, res, next) {
				let { validationResult } = expressVal;

				var error_ = validationResult(req);

				$fs.readFile(dir + '/myviews/signedUp.ejs', function (err, data) {
					if (err) return res.status(500).send('Internal server error!');

					if (error_.errors.length != 0) {
						res.render('index', {
							title: 'Signing Up result',
							errors: error_.errors,
							data: data.toString(),
						});
						return;
					} else {
						//save data to database
						if (handleData(Models, req, res, data) === true) {

						}

						return;
					}
				});
			}
		);

		return router;
	})(express);
};



function handleData(models, req, res, data_) {

	var { User, AuthInfo } = models;
	var { userName, userEmail, userPassword } = req.body;


	User.findOne({ email: userEmail }).exec((err, data) => {

		if (data === null) {
			
			var user = new User();
			var authInfo = new AuthInfo();

			authInfo.setPassword(userPassword);
			
			user.userName = userName;
			
			user.email = userEmail;

			user.auth = authInfo._id;

			authInfo.save((err, auth) => {
				if (err) {
					return res.status(400).send('Unable to add user! Signe up failed :(!');
				} 
			});
			user.save((err, user_) => {
				if (err) return res.status(400).send('Unable to create user account :(!');
			});

			res.render('index', { title: 'Signing Up result', errors: [], data: data_.toString() });
			return true;

		} else {

			res.render('index', { title: 'Signing Up result', errors: [({ param: "Email", msg: "Email is already used by another account!" })], data: data_.toString() });
			return false;

		}
	});
}
