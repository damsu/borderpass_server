//Fetch all documents on Crossings collection + return as Json
exports.getAll = function(dbref, callback){
	// retrieve a collection reference
	dbref.collection('crossings', function(err, crossings_collection) { 
    	crossings_collection.find().toArray(function(err, docs) {
    	callback(docs);
		});
  	});
}

//Get a crossing data by Id
exports.getOne = function(dbref, crossing_id, callback){
	// retrieve a collection reference
	dbref.collection('crossings', function(err, crossings_collection) { 
    	crossings_collection.findOne({ _id: crossing_id },function(err, doc) {
    	if (err) {
		    console.log(err);
		  } else {
		    callback(doc);
		  }
		});
  	});
}

//Delete a crossing by Id
exports.deleteOne = function(dbref, crossing_id, callback){
	// retrieve a collection reference
	dbref.collection('crossings', function(err, crossings_collection) { 
    	crossings_collection.remove({ _id: crossing_id },function(err, doc) {
    	if (err) {
		    console.log(err);
		  } else {
		    callback(doc);
		  }
		});
  	});
}

//Add a new crossing
exports.addCrossing = function(dbref, crossing, callback){
	// retrieve a collection reference
	console.log(crossing);
	dbref.collection('crossings', function(err, crossings_collection) { 
		console.log(crossings_collection);
		crossings_collection.insert(crossing, function (err, result) {
		  if (err) {
		    console.log(err);
		  } else {
		    callback(result);
		  }
		})
	})
}

//Update a new crossing
exports.updateCrossing = function(db, coll, query, data, callback) {
	db.collection('crossings', function(err, collection) {
		collection.update(query, data, function(err, result) {
		
			if (err) {
			
				throw err;
			} else {
			
				callback(result);
			}
		});
	});
}
