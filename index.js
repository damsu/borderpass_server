/* vim: set ts=2 sw=2 softtabstop=2:
   
   BORDER PASS SERVER

   Created for Software Development Project 2
*/
// Node module imports
const express = require('express');
const cors = require('cors');
const MONGO_URL = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost:27017/borderpass';
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;

// Model Imports
const collections = require('./models/Collections.js');
const crossings = require('./models/Crossings.js');

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

// Setting up the port
app.set('port', (process.env.PORT || 8100));

// Starting to use modules
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', rt_main.index);

app.get('/borders', rt_cross.all);
app.get('/borders/:id', rt_cross.one);
app.get('/border/init', rt_cross.init);

app.put('/crossings/:id', rt_cross.update);

app.post('/crossings', rt_cross.add)

app.delete('/borders/:id', rt_cross.delete);

// Reservation routes.
app.get('/reservations/init', rt_reserve.init);
app.get('/reservations/dummy', rt_reserve.dummy);
app.get('/reservations', rt_reserve.all);
app.get('/reservations/id/:data', rt_reserve.get.id);

app.put('/reservations/id/:id', rt_reserve.update);

app.post('/reservations', rt_reserve.postAdd);
app.post('/reservations/docNum', rt_reserve.get.doc);

app.delete('/reservations/id/:id', rt_reserve.delete);

// Listening to a port. This either listens to the localhost port 8100
// or the port gotten from heroku.
app.listen(app.get('port'), function() {

  console.log('Node application is running in port ' + app.get('port'));
});
