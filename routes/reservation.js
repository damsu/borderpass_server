/* vim: set ts=2 sw=2 softtabstop=2:

   Routes for reservations.
*/
var collections = require('../models/Collections.js');
var database = require('../models/Database.js');
var reservation = require('../models/Reservation.js');
var crossings = require('../models/Crossings.js');
var ObjectId = require('mongodb').ObjectId;

var pad = function(number, size) {

	var s = "00000" + number;
	return s.substr(s.length - size);
}
var randNum = function() {

	// TODO: Make this function do a 24 byte long number instead of 12 byte long hex
	var d = pad((new Date).getTime() % 999999, 6) // 6 bytes long time in milliseconds
	
	var randNums = new Array();
	for (i = 0; i < 3; i++) {
		
		randNums[i] = pad(Math.floor(Math.random() * 1000000), 6); // from 000000 to 999999
	}
	console.log("[randNums]: " + d + randNums[0] + randNums[1] + randNums[2]);
	return (d + randNums[0] + randNums[1] + randNums[2]);
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
exports.get = {

	doc : function(req, res) {

		if (req.body.DocumentNumber && req.body.Document && req.body.Citizenship) {

			database.findAll(res.app.locals.db, 'reservations', {
				$and:[{
								"traveller.Citizenship" : req.body.Citizenship,
								"traveller.Document" : req.body.Document,
								"traveller.DocumentNumber" : req.body.DocumentNumber.toString()
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
				
			res.send((result[0]) ? result : []);
		});
	}
}
exports.postAdd = function(req, res) {
	
	//console.log('got POST request!');
	//console.log('POST data: ' + JSON.stringify(req.body));

	var newId;
	var done = false;
	do {
	
		newId = new ObjectId(randNum().toString());
		database.findOne(res.app.locals.db, 'reservations', {_id: newId}, function(result) {

			if (result[0] === null) {

				done = true;
			} else {

				console.log("[postAdd]: Found a match! Redoing.");
			}
		});
	} while (done === true);

	console.log("[postAdd]: newId " + newId);
	
	var crossing = req.body.crossing;
	var traveller = req.body.traveller;
	var vehicle = req.body.vehicle;
/*
	var crossing_time = req.body.crossing.Time;
	var crossing_date = req.body.crossing.Date;
	var crossing_address = req.body.crossing.Address;
*/
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
exports.update = function(req, res) {

	var id = new ObjectId(req.params.id);
	var data = req.body;

	database.update(res.app.locals.db, 'reservations', {_id: id}, data, function(result) {

		if (result.result.ok === 1) {

			//console.log(result);
			res.sendStatus(200);
		} else {

			res.send([]);
		}
	});
} 
