module.exports = function(express, fs, dir, db) {
	return (exp => {
		var router = exp.Router();

		var i = 0;

		router.get('/fetchReq/:location/:type', [
			validate,
			function(req, res, next) {
				var dataRecord = [];

				var location = req.params.location;
				var type = req.params.type;
				var { User, Files } = db;

				User.findOne({ _id: req.session.acc[0].id }).exec((err, user) => {
					if (err) {
						res.status(500).end('Internal server error!');

						return;
					}
			try{
					if (user.fileRecordType[location][type].length !== 0)
						for (i = 0, j = 0; i < user.fileRecordType[location][type].length; i++) {

							Files.findOne({ _id: user.fileRecordType[location][type][i] }).exec((err, file) => {
								if (err) {

									res.status(500).end('Internal server error!');

									return;
								}

								dataRecord.push(file);

								if (
									i - 1 == user.fileRecordType[location][type].length - 1 &&
									j == user.fileRecordType[location][type].length - 1
								) {
									res.status(200).json({ data: dataRecord });
								}
								j++;
							});
						}
					else {
						res.status(200).json({ data: [{ date: 'EMPTY', workType: 'EMPTY', name: 'EMPTY' }] });
					}
				
				
				}catch(e){
					res.status(200).json({ data: [{ date: 'EMPTY', workType: 'EMPTY', name: 'EMPTY' }] });
					
					return;
				}
			
			});

			},
		]);
		return router;
	})(express);
};

function validate(req, res, next) {
	if (!req.session.admin) {
		res.status(400).send('No validated user account Found ! plz Login with validated user Id !');
		return;
	}

	next();
	return;
}
