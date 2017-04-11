/* vim: set ts=2 sw=2 softtabstop=2:

   Routes for reservations.
*/
var collections = require('../models/Collections.js');
var database = require('../models/Database.js');
var reservation = require('../models/Reservation.js');
var crossings = require('../models/Crossings.js');
var ObjectId = require('mongodb').ObjectId;

var pad = function(number, size) {

	var s = "00000000000" + number;
	return s.substr(s.length - size);
}
var randHex = function() {

	var randHex = Math.floor(Math.random() * 16777215).toString(16) + Math.floor(Math.random() * 16777215).toString(16);
	//console.log("[randHex]: " + randHex);
	return pad(randHex, 12);
}

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
	var data = req.params.data;

	switch (type) {
	
		case 'docNum':

			database.findAll(res.app.locals.db, 'reservations', {"traveller.DocumentNumber" : data}, function(result) {
			
				res.send(result);
			});
			break;
		case 'id':

			var id = new ObjectId(data);
			database.findOne(res.app.locals.db, 'reservations', {_id: id}, function(result) {
				
				res.send(result);
			});
			break;
		default:

			res.sendStatus(404);
			break;
	}
}
exports.postAdd = function(req, res) {
	
	console.log('got POST request!');
	console.log('POST data: ' + JSON.stringify(req.body));

	var newId;
	var done = false;
	do {
	
		newId = new ObjectId(new Buffer(randHex().toString()));
		database.findOne(res.app.locals.db, 'reservations', {_id: newId}, function(result) {

			if (result == null) {

				done = true;
			}
		});
	} while (done === true);
	
	var data = req.body;
	var inputdata = {_id: newId, data};
	database.postData(res.app.locals.db, 'reservations', inputdata, function(result) {
	
		if (result.ops[0]._id) {

			res.send(result.ops[0]._id);
		} else {
			
			res.send(result);
		}
	});
}
exports.delete = function(req, res) {

	//TODO:	Add the removal of the reservation
	//			Yo mang.
	var id = new ObjectId(req.params.id);
	database.remove(res.app.locals.db, 'reservations', {_id: id}, function(result) {
		
		if (result.result.n === 1) {
		
			res.sendStatus(200);
		} else {
		
			res.send("nothing changed");
		}
	})
}
