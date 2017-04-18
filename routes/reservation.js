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

	var d = (new Date).getTime() % 86400000;
	var randHex = Math.floor(Math.random() * d).toString(16) + Math.floor(Math.random() * 16777216).toString(16);
	//console.log("[randHex]: " + d.toString(16));
	//console.log("[randHex]: " + randHex);
	return pad(randHex, 12);
}

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
/*
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
*/
exports.get = {

	doc : function(req, res) {

		var query;

		if (req.body.DocumentNumber && req.body.Document && req.body.Citizenship) {

			database.findAll(res.app.locals.db, 'reservations', {
				$and:[{	"traveller.DocumentNumber" : req.body.DocumentNumber.toString(),
								"traveller.Document" : req.body.Document,
								"traveller.Citizenship" : req.body.Citizenship
				}]
			}, function(result) {
			
				console.log(result);
				res.send(result);
			});
		} else {
		
			res.send([]);
		}
	},
	id : function(req, res) {
	
		var data = req.params.data;
		var id = new ObjectId(data);
		database.findOne(res.app.locals.db, 'reservations', {_id: id}, function(result) {
				
			res.send(result);
		});
	}
}
exports.postAdd = function(req, res) {
	
	//console.log('got POST request!');
	//console.log('POST data: ' + JSON.stringify(req.body));

	var newId;
	var done = false;
	do {
	
		newId = new ObjectId(randHex().toString());
		database.findOne(res.app.locals.db, 'reservations', {_id: newId}, function(result) {

			if (result == null) {

				done = true;
			} else {
			
				console.log("[postAdd]: Found a match! Redoing.");
			}
		});
	} while (done === true);

	console.log("[postAdd]: newId " + newId);
	
	var crossing = req.body.crossing;
	var traveller = req.body.traveller;
	var vehicle = req.body.vehicle
	
	database.postData(res.app.locals.db, 'reservations', {_id: newId, crossing, traveller, vehicle}, function(result) {
	
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
