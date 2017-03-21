/* BORDER PASS SERVER

   Created for Software Development Project 2
*/
// Included files
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var assert = require('assert');
var connection = require('./models/Db.js');
var collections = require('./models/Collections.js');
var crossings = require('./models/Crossings.js');

// include the mongodb module
var mongo = require('mongodb');

// create a server instance
var serverInstance = new mongo.Server('localhost', 27017, {auto_reconnect: true});

// retrieve a database reference
var dbref = new mongo.Db('borderpass', serverInstance);

// connect to database server
dbref.open(function(err, dbref) {
    // now a connection is established
});

// Setting up the port
app.set('port', (process.env.PORT || 8100));

// Starting to use modules
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', function(req, res) {

  res.send('Hello World');
});

//Create GET route as a test to GET Crossings data from MongoDB
app.get('/crossings', function(req, res) {
  crossings.getAll(dbref, function (docs) {
    res.json(docs);
  })
});

//Create crossings collection and when done, insert dummy data
app.get('/crossings/init', function(req, res) {
  collections.create(dbref, "crossings", function(coll){
    console.log("created collection : ", coll);
    collections.addCrossings(dbref, function(result){
      console.log("inserted into crossings : ", result);
      res.send("created collection and inserted data !");
    });
  });
});

// Listening to a port
app.listen(app.get('port'), function() {

  console.log('Node application is running in port ' + app.get('port'));
});

// vim: set ts=2 sw=2 softtabstop=2:
