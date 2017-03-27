var MongoClient = require('mongodb').MongoClient;
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
	'mongodb://localhost:27017/borderpass';

exports.DbConnect = function() {
	var useDb;
	MongoClient.connect(uristring, function (err, db) {

	  	if (err) {

	    	console.log('Unable to connect to the mongoDB server. Error:', err);
	  	} else {

	    	console.log('Connection established to', uristring);
	    	useDb = db;
		}
	});
	return useDb;
}