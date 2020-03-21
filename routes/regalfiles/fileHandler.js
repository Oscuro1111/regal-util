module.exports = function(express, fs, dir, db) {
	return (exp => {
		var router = exp.Router();
		var path = require('path');
		const {Readable} = require('stream');
	 router.post('/uploads/:location/:type/', [
			validate,
			(req, res, next) => {
				let location = req.params.location;
				let type = req.params.type;
				var { Files, User ,objectID, mongodb,db_} = db;
				let dbDB = db_.db;
				User.findOne({ _id: req.session.acc[0].id }).exec((err, user) => {
					if (err) {
						res.end('Internal server error!');
					}
					if (Object.keys(req.files) != 0) {
						var records = req.files.filepond;
						
						const readableFileStream = new Readable();
						readableFileStream.push(records.data);
						readableFileStream.push(null);
						let bucket = new mongodb.GridFSBucket(dbDB,{
							bucketName:location+"/"+type
						});

						let uploadStream;

						var file = new Files();
						let d = new Date();

										file.name = records.name;
										file.location= location;
										file.workType = type;
									//	file.bufferData=records.data;
										
									    file.date= d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear();
										
										uploadStream=bucket.openUploadStream(location+"/"+type+"/"+file._id);
										
										file.fileObjectID = uploadStream.id; //mongo Object ID

										file.save();

										  readableFileStream.pipe(uploadStream);
										  user.fileRecordType[location][type].push(file._id);
										  user.save();
										  
										  uploadStream.on('finish', () => {
											 return res.status(200).end();
										  });

										  uploadStream.on('error', () => {
											return res.status(500).send("File Upload error!");
										  });
									  
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

