/*	vim: set ts=4 sw=4 noexpandtab softtabstop=4:

	model file for all the database modifying related stuff.
*/
var counter = 0;

exports.create = function(db, coll, callback) {
	db.createCollection(coll, function(err, collection) {

	if (err) throw err;
	callback(coll);
	});
};
exports.getAll = function(db, coll, callback) {
	db.collection(coll, function(err, collection) {
		collection.find().toArray(function(err, result) {
    
			if (err) {

				throw err;
			} else {

				callback(result);
			}
		});
	});
}
exports.postData = function(db, coll, data, callback) {
	db.collection(coll, function(err, collection) {

		collection.insert(data, function(err, result) {

			(err) ? callback(err) : callback(result);
		});
	});
}
exports.findAll = function(db, coll, data, callback) {
	db.collection(coll, function(err, collection) {
		collection.find(data).toArray(function(err, result) {
		
			if (err) {
			
				throw err;
			} else {
			
				callback(result);
			}
		})
	});
}
exports.findOne = function(db, coll, data, callback) {
	db.collection(coll, function(err, collection) {		
		collection.findOne(data, function(err, result) {
		
			if (err) {
			
				throw err;
			} else {
				
				callback([result]);
			}
		})
	});
}
exports.remove = function(db, coll, data, callback) {
	db.collection(coll, function(err, collection) {
		collection.remove(data, function(err, result) {
		
			if (err) {

				throw err;
			} else {
			
				callback(result);
			}
		});
	});
}
