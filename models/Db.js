// vim: set ts=2 sw=2 softtabstop=2:

var mongo = require('mongodb').MongoClient;
const MONGO_URL = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost:27017/borderpass';

exports.connect = function(callback) {

  var dbref;
  mongo.connect(MONGO_URL, function(err, db) {

    if (err) {

      console.log('MongoDB error happened: ' + err);
    }
    dbref = db;
  });
  callback(dbref);
}
/*var uristring =
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
}*/
