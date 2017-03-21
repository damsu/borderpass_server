var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/borderpass';

exports.DbConnect = function() {
	var useDb;
	MongoClient.connect(url, function (err, db) {

	  	if (err) {

	    	console.log('Unable to connect to the mongoDB server. Error:', err);
	  	} else {

	    	console.log('Connection established to', url);
	    	useDb = db;
		}
	});
	return useDb;
}