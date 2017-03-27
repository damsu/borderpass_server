/* vim: set ts=2 sw=2 softtabstop=2:
   
   BORDER PASS SERVER

   Created for Software Development Project 2
*/
// Node module imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Model Imports
var connection = require('./models/Db.js');
var collections = require('./models/Collections.js');
var crossings = require('./models/Crossings.js');

// Route Imports
var rt_main = require('./routes');
var rt_collec = require('./routes/collections.js');
var rt_cross = require('./routes/crossings.js');

// Creating the express instance
const app = express();

// Setting up the port
app.set('port', (process.env.PORT || 8100));

// Starting to use modules
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', rt_main.index);

// OK, this shit actually works!
//app.get('/test', rt_main.test);
app.get('/test1', rt_main.test.test1);
app.get('/test2', rt_main.test.test2);

//app.get('/cross/:loc', rt_main.cross);
//app.get('/collections', rt_collec.list);
//app.get('/collections/:name', rt_collec.find);
app.get('/crossings', rt_cross.all);
app.get('/crossings/:id', rt_cross.one);
app.delete('/crossings/:id', rt_cross.delete);
app.get('/init', rt_cross.init);
app.post('/crossings', rt_cross.add)

// Listening to a port
app.listen(app.get('port'), function() {

  console.log('Node application is running in port ' + app.get('port'));
});
