/* BORDER PASS SERVER

   Created for Software Development Project 2
*/
// Included files
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/borderpass';

// Setting up the port
app.set('port', (process.env.PORT || 8100));

// Starting to use modules
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', function(req, res) {

  res.send('Hello, world!');
});

MongoClient.connect(url, function (err, db) {

  if (err) {

    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {

    console.log('Connection established to', url);

    db.createCollection('cars', function(err, collection) {

	   if (err) throw err;

	   	console.log("Created Cars Collection");
	 		//console.log(collection);
	  });

    var cars_collection = db.collection('cars');

	  var car1 = {owner_id: 1, vehicle_type: 'A', car_plate: 'XIH-222', car_manufacturer: 'Renault', car_model: 'Logan'};
	  var car2 = {owner_id: 2, vehicle_type: 'A', car_plate: 'XIH-222', car_manufacturer: 'Renault', car_model: 'Logan'};
	  var car3 = {owner_id: 3, vehicle_type: 'A', car_plate: 'XIH-222', car_manufacturer: 'Renault', car_model: 'Logan'}

    cars_collection.insert([car1, car2, car3], function (err, result) {
      if (err) {

        console.log(err);
      } else {

        console.log('Inserted %d documents into the "cars" collection. The documents inserted with "_id" are:', result.length, result);
        cars_collection.find();
      }
      //Close connection
      db.close();
    });
  }
});

// Listening to a port
app.listen(app.get('port'), function() {

  console.log('Node application is running in port ' + app.get('port'));
});

// vim: set ts=2 sw=2 softtabstop=2:
