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
var routes = require('./routes');
var collroute = require('./routes/collections.js');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/borderpass');

// Setting up the port
app.set('port', (process.env.PORT || 8100));

// Starting to use modules
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', routes.index);

app.get('/cross/:loc', routes.cross);
app.get('/collections/', collroute.list);
app.get('/collections/:name', collroute.find);

//Create GET route as a test to GET Crossings data from MongoDB
/*app.get('/crossings', function(req, res) {
  //collections.createCrossingsCollection(db);
  collections.insertCrossingsDocuments(db);
  var crossingsJson = crossings.getCrossings(db);
  res.json(crossingsJson);
});*/

/*app.get('/crossings/add', function(req, res) {

  collections.insertCrossingsDocuments(db);
});*/

/*
app.get('/collections',function(req,res){
  db.driver.collectionNames(function(e,names){
    res.json(names);
  })
});
app.get('/collections/:name',function(req,res){
  var collection = db.get(req.params.name);
  collection.find({},{limit:20},function(e,docs){
    res.json(docs);
  })
});
*/

// Listening to a port
app.listen(app.get('port'), function() {

  console.log('Node application is running in port ' + app.get('port'));
});

// vim: set ts=2 sw=2 softtabstop=2:
