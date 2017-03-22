/* vim: set ts=2 sw=2 softtabstop=2:
   
   BORDER PASS SERVER

   Created for Software Development Project 2
*/
// Node module imports
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var assert = require('assert');

// Model Imports
var connection = require('./models/Db.js');
var collections = require('./models/Collections.js');
var crossings = require('./models/Crossings.js');

// Route Imports
var rt_main = require('./routes');
var rt_collec = require('./routes/collections.js');
var rt_cross = require('./routes/crossings.js');

// Creating the express instance
var app = express();

// include the mongodb module
var mongo = require('mongodb');

//try {

  // create a server instance
  var serverInstance = new mongo.Server('localhost', 27017, {auto_reconnect: true});

  // retrieve a database reference
  var dbref = new mongo.Db('borderpass', serverInstance);

  // connect to database server
  dbref.open(function(err, dbref) {
    
    console.log('MongoDB succesfully connected!');
    // now a connection is established
  });
//}
//catch(err) {

//  console.log('There was an error when trying to start mongoDB!\nERROR: ' + err);
//}

// Setting up the port
app.set('port', (process.env.PORT || 8100));

// Starting to use modules
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', rt_main.index);

//app.get('/cross/:loc', rt_main.cross);
//app.get('/collections', rt_collec.list);
//app.get('/collections/:name', rt_collec.find);
app.get('/crossings', rt_cross.all);
app.get('/crossings/init', rt_cross.init);

// Listening to a port
app.listen(app.get('port'), function() {

  console.log('Node application is running in port ' + app.get('port'));
});

