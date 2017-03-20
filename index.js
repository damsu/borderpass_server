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
var crossings_collection;
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

// Connect to MongoDB and create a Crossings Collection
MongoClient.connect(url, function (err, db) {

  if (err) {

    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {

    console.log('Connection established to', url);

    db.createCollection("crossings", function(err, collection){
      if (err) throw err;
      console.log("Created Crossings Collection");
    });

    crossings_collection = db.collection('crossings');
  }
});

//Create GET route as a test to GET Crossings data from MongoDB
app.get('/crossings', function(req, res) {

  //Dummy documents for Crossings collection.
  var crossing = {test: 'this', or: 'this', and: 'that'};
  var crossing2 = {test: 'thisssss', or: 'thisssss', and: 'thattttt'};

  //Insert them into the collection
  crossings_collection.insert([crossing,crossing2], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully inserted : ', result);
    }
  })

  //Fetch all documents on Crossings collection + return as Json
  crossings_collection.find().toArray(function(err, docs) {
    return res.json(docs);
  }); 
});

// Listening to a port
app.listen(app.get('port'), function() {

  console.log('Node application is running in port ' + app.get('port'));
});

// vim: set ts=2 sw=2 softtabstop=2:
