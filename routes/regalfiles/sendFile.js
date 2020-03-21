
module.exports = function(express, fs, dir, Models) {

   const mime = require('mime-types');
	return (exp => {
		var router = exp.Router();
		var { mongodb, db_, objectID } = Models;
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

				let bucket = new mongodb.GridFSBucket(db_.db, {
					bucketName: location + '/' + type,
				});

				let downloadStream = bucket.openDownloadStream(new objectID(req.params.id));

				downloadStream.on('error',()=>{
					res.status(404).send('No  file found!');
				});
 var data_=[];

				downloadStream.on('data',(chunk)=>{
					data_.push(chunk);    
				});

				downloadStream.on('end',()=>{
					res.set('Content-Type',mime.lookup(fileName));
					res.status(200).send(Buffer.concat(data_));
					res.status(200).end();
				});

				/*
				Files.findOne({ _id: req.params.id, workType: type, location: location }).exec((err, file) => {
					let path = dir + '/public/data/temp'+'/' + file.name;
					fs.writeFile(path, file.bufferData.buffer, err => {
						if (err) res.status(500).send('Internal server error during file transfer!');
						else {
							var data = fs.readFileSync(path);

                            res.status(200).send(data);
                            
                            setImmediate(p=>fs.unlinkSync(p),path);
						}
					});
				});

				*/
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
