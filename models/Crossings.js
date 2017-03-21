//Fetch all documents on Crossings collection + return as Json
exports.getAll = function(dbref, callback){
	// retrieve a collection reference
	dbref.collection('crossings', function(err, crossings_collection) { 
    	crossings_collection.find().toArray(function(err, docs) {
    	callback(docs);
		});
  	});
}