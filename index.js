var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/borderpass';

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    db.createCollection("cars", function(err, collection){
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
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        cars_collection.find();
      }
      //Close connection
      db.close();
    });
    /**/
  }
});