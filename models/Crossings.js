//Fetch all documents on Crossings collection + return as Json
exports.getCrossings = function(db){
	const crossings_collection = db.get('crossings');
  crossings_collection.find().toArray(function(err, docs) {
    return docs;
  });
}