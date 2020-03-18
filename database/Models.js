//Following module pattern

module.exports = (async function() {
	var crypto = require('crypto');
	var mongoose = require('mongoose');
	console.log('MoongoDB');

 var dbserver =await mongoose.connect("mongodb+srv://Oscuro:Computerislife;@cluster0-guxyc.mongodb.net/test2?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
	//var dbserver = await mongoose.connect('mongodb://localhost/Demo3', {
		//useNewUrlParser: true,
	//	useUnifiedTopology: true,
	//});
	var User = mongoose.Schema({
		userName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		auth: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'authInfo',
			required: true,
		},
		fileRecordType: {
			locationA: {
				typeA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeC: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeD: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
			},
			locationB: {
				typeA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeC: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeD: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
			},
			locationC: {
				typeA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeC: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeD: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
			},
			locationD: {
				typeA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeC: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeD: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
			},
			locationE: {
				typeA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeC: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
				typeD: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files', required: false }],
			},
		},
	});

	var authInfo = mongoose.Schema({
		hash: String,
		salt: String,
	});

	authInfo.methods.setPassword = function(password) {
		this.salt = crypto.randomBytes(16).toString('hex');
		this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString('hex');
	};

	authInfo.methods.validPassword = function(password) {
		var _hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString('hex');

		return this.hash === _hash;
	};

	var Files = mongoose.Schema({
		name: String,
		location: String,
		bufferData:mongoose.Schema.Types.Buffer,
        workType:String,
		date: {
			type: String,
		},
	});

	return {
		models: {
			User: mongoose.model('user', User, 'user'),
			AuthInfo: mongoose.model('authInfo', authInfo, 'authInfo'),
			Files: mongoose.model('files', Files, 'files'),
			db_: mongoose.connection,
			mongoose:mongoose
		},
	};
})();
