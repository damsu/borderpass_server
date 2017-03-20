/* BORDER PASS SERVER

   Created for Software Development Project 2
*/
// Included files
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// Setting up the port
app.set('port', (process.env.PORT || 8100));

// Starting to use modules
app.use(cors());
app.use(bodyParser.json());

// Base route
app.get('/', function(req, res) {
   
   res.send('Hello, world!');
});

// Listening to a port
app.listen(app.get('port'), function() {

   console.log('Node application is running in port ' + app.get('port'));
});
