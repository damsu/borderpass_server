//If doesn't exist, creates a colelction by given name
exports.create = function(dbref, coll, callback) {

	dbref.createCollection(coll, function(err, collection){

	      if (err) throw err;
	      callback(coll);
	    });
}

//Initialize the crossings documents for the app
//TODO: move it somewhere else? Do it with POST  request?
exports.addCrossings = function(dbref, callback) {
	//Crossings documents
	var crossings_1 = {
		from_country: 'Finland',	to_country: 'Russia',
		from_city: 'Imatra',			to_city: 'Svetogorsk',	address: 'Imatra',
		from_flag_url: 'fi.png',	to_flag_url: 'ru.png',
		short_name_from: 'fi',		short_name_to: 'ru',
		service_provider: 'Finnish Transport Agency'
	};
   var crossings_2 = {
		from_country: 'Finland',	to_country: 'Russia',
		from_city: 'Nuijamaa',		to_city: 'Brusnichnoe', address: 'Nuijamaa',
		from_flag_url: 'fi.png',	to_flag_url: 'ru.png',
		short_name_from: 'fi',		short_name_to: 'ru',
		service_provider: 'Finnish Transport Agency',
		timeslots: []
	};
	var crossings_3 = {
		from_country: 'Finland',	to_country: 'Russia',
		from_city: 'Niirala',		to_city: 'Wärtsilä',		address: 'Niirala',
		from_flag_url: 'fi.png',	to_flag_url: 'ru.png',
		short_name_from: 'fi',		short_name_to: 'ru',
		service_provider: 'Finnish Transport Agency',
		timeslots: []
	};
	var crossings_4 = {
		from_country: 'Russia',		to_country: 'Finland',
		from_city: 'Svetogorsk',	to_city: 'Imatra',		address: 'Svetogorsk',
		from_flag_url: 'ru.png',	to_flag_url: 'fi.png',
		short_name_from: 'ru',		short_name_to: 'fi',
		service_provider: 'Border Service of the Federal Security Service of the Russian Federation',
		timeslots: []
	};
	var crossings_5 = {
		from_country: 'Russia',		to_country: 'Finland',
		from_city: 'Brusnichnoe',	to_city: 'Nuijamaa',		address: 'Brusnichnoe',
		from_flag_url: 'ru.png',	to_flag_url: 'fi.png',
		short_name_from: 'ru',		short_name_to: 'fi',
		service_provider: 'Border Service of the Federal Security Service of the Russian Federation',
		timeslots: []
	};
	var crossings_6 = {
		from_country: 'Russia',		to_country: 'Finland',
		from_city: 'Wärtsilä',		to_city: 'Niirala',		address: 'Wärtsilä',
		from_flag_url: 'ru.png',	to_flag_url: 'fi.png',
		short_name_from: 'ru',		short_name_to: 'fi',
		service_provider: 'Border Service of the Federal Security Service of the Russian Federation',
		timeslots: []
	};
	var crossings_7 = {
		from_country: 'Russia',		to_country: 'Norway',
		from_city: 'Borisoglebsky',to_city: 'Storskog',		address: 'Borisoglebsky',
		from_flag_url: 'ru.png',	to_flag_url: 'no.png',
		short_name_from: 'ru',		short_name_to: 'no',
		service_provider: 'Border Service of the Federal Security Service of the Russian Federation',
		timeslots: []
	};
	var crossings_8 = {
		from_country: 'Norway',		to_country: 'Russia',
		from_city: 'Storskog',     to_city: 'Borisoglebsky',address: 'Storskog',
		from_flag_url: 'no.png',	to_flag_url: 'ru.png',
		short_name_from: 'no',		short_name_to: 'ru',
		service_provider: 'Norwegian Customs Se',
		timeslots: []
	};

	//Replace them into collection
	dbref.collection('crossings', function(err, crossings_collection) {
		crossings_collection.remove({});
		crossings_collection.insert([crossings_1, crossings_2, crossings_3, crossings_4, crossings_5, crossings_6, crossings_7, crossings_8], function (err, result) {
		  if (err) {
		    console.log(err);
		  } else {
		    callback(result);
		  }
		})
	})
}
