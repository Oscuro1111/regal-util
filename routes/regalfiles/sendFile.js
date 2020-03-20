module.exports = function(express, fs, dir, Models) {
	return (exp => {
		var router = exp.Router();

		var path = require('path');

		router.get('/download/:location/:type/:id/:fileName', [
			validate,
			function(req, res, next) {
				var location = req.params.location;
				var type = req.params.type;
				var fileName = req.params.fileName;

				var { User, Files } = Models;

				if (fileName === 'EMPTY') {
					res.redirect('/auth/home');
					return;
				}

				Files.findOne({ _id: req.params.id, workType: type, location: location }).exec((err, file) => {
					let path = dir + '/public/data/temp'+'/' + file.name;
					console.log(file.bufferData.buffer);
					fs.writeFile(path, file.bufferData, err => {
						if (err) res.status(500).send('Internal server error during file transfer!');
						else {
							var data = fs.readFileSync(path);

                            res.status(200).send(data);
                            
                            setImmediate(p=>fs.unlinkSync(p),path);
						}
					});
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
