exports.createCrossingsCollection = function(db) {

	db.createCollection("crossings", function(err, collection){

	      if (err) throw err;
	      console.log("Created Crossings Collection");
	    });
}

exports.insertCrossingsDocuments = function(db) {
	//Dummy documents for Crossings collection.
	var crossing = {test: 'this', or: 'this', and: 'that'};
	var crossing2 = {test: 'thisssss', or: 'thisssss', and: 'thattttt'};

	//Insert them into the collection
	const crossings_collection = db.get('crossings');
	crossings_collection.insert([crossing,crossing2], function (err, result) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('Successfully inserted : ', result);
	  }
	})
}