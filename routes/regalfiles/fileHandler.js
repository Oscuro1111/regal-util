module.exports = function(express, fs, dir, db) {
	return (exp => {
		var router = exp.Router();
		var path = require('path');
	 router.post('/uploads/:location/:type/', [
			validate,
			(req, res, next) => {
				var location = req.params.location;
				var type = req.params.type;
				var { Files, User } = db;
				console.log("ok");
				User.findOne({ _id: req.session.acc[0].id }).exec((err, user) => {
					if (err) {
						res.end('Internal server error!');
					}
					if (Object.keys(req.files) != 0) {
						var records = req.files.filepond;
						
						var file = new Files();
						let d = new Date();
										console.log(records);
										file.name = records.name;
										file.location= location;
										file.workType = type;
										file.bufferData=records.data;
										file.date= d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear();
										file.save((f,e)=>{console.log(f,e)});
										console.log(file);
										user.fileRecordType[location][type].push(file._id);
										user.save();

										res.status(200).end();
							
						 
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
