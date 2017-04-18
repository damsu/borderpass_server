/* vim: set ts=2 sw=2 softtabstop=2:
   
   BORDER PASS SERVER

   Created for Software Development Project 2
*/
// Node module imports
const express = require('express');
const cors = require('cors');
const Q = require('q');
const MONGO_URL = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost:27017/borderpass';
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;

// Model Imports
var collections = require('./models/Collections.js');
var crossings = require('./models/Crossings.js');

// Route Imports
const rt_main = require('./routes');
const rt_collec = require('./routes/collections.js');
const rt_cross = require('./routes/crossings.js');
const rt_reserve = require('./routes/reservation.js');

// Creating the express instance
var app = express();

// Creating the database connection
mongo.connect(MONGO_URL, function(err, db) {  
  
  if (err) {
      
    console.log(err);
    process.exit(1);
  }
  app.locals.db = db;
});

// Testing variables.
var varfoo = 'foo';
var varbar = 'bar';

// Setting up the port
app.set('port', (process.env.PORT || 8100));

// Starting to use modules
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', rt_main.index);

// OK, this shit actually works!
//app.get('/test', rt_main.test);
app.get('/test1', rt_main.test.test1(varfoo));
app.get('/test2', rt_main.test.test2(varbar));

app.post('/test1', rt_main.test.post.test1);

//app.get('/cross/:loc', rt_main.cross);
//app.get('/collections', rt_collec.list);
//app.get('/collections/:name', rt_collec.find);
app.get('/borders', rt_cross.all);
app.get('/borders/:id', rt_cross.one);
app.delete('/borders/:id', rt_cross.delete);
app.get('/init', rt_cross.init);
app.post('/crossings', rt_cross.add)

// Reservation routes.
app.get('/reservations/init', rt_reserve.init);
app.get('/reservations/dummy', rt_reserve.dummy);
app.get('/reservations', rt_reserve.all);
app.post('/reservations/docNum', rt_reserve.get.doc);
app.get('/reservations/id/:data', rt_reserve.get.id);
app.delete('/reservations/:id', rt_reserve.delete);
app.post('/reservations', rt_reserve.postAdd);

// Listening to a port
app.listen(app.get('port'), function() {

  console.log('Node application is running in port ' + app.get('port'));
});
