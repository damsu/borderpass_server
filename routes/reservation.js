/* vim: set ts=2 sw=2 softtabstop=2:

   Routes for reservations.
*/
var collections = require('../models/Collections.js');
var database = require('../models/Database.js');
var reservation = require('../models/Reservation.js');
var crossings = require('../models/Crossings.js');

exports.add = function(req, res) {

  // TODO: make this function add the reservations in here.
};

exports.all = function(req, res) {

  database.getAll(res.app.locals.db, 'reservations', function(result) {
  
    console.log('all data fetched from the server');
    res.json(result);
  });
}

// Create the reservations collection
exports.init = function(req, res) {

  database.create(req.app.locals.db, 'reservations', function(coll) {
    
    console.log("created collection : ", coll);
    res.send("Collection creation succesful!");
  });
};

// Dummy data route for the reservations.
exports.dummy = function(req, res) {

  reservation.addDummyData(res.app.locals.db, function(result) {
  
    console.log('inserted collections data: ' + result);
    res.sendStatus(200);
  });
}
exports.get = function(req, res) {

	var type = req.params.type;
	var id = req.params.id;

	switch (type) {
	
		case 'passport':

			
			break;
		case 'reservation':

			
			break;
		default:

			res.sendStatus(404);
			break;
	}
}
exports.post = function(req, res) {
	
	console.log('got POST request!');
	console.log('POST data: ' + JSON.stringify(req.body));

	database.postData(res.app.locals.db, 'reservations', req.body, function(result) {
	
		if (result.ops[0]._id) {
		
			res.send(result.ops[0]._id);
		} else {
			
			res.send(result);
		}
	});
}
