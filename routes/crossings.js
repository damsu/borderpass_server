/* vim: set ts=2 sw=2 softtabstop=2:

   Routes for showing crossing information.
*/
var collections = require('../models/Collections.js');
var crossings = require('../models/Crossings.js');
var mongo = require('mongodb');
var MONGO_URL = (process.env.PROD_MONGODB) ? process.env.PROD_MONGODB : 'localhost';

try {

  // create a server instance
  var serverInstance = new mongo.Server(MONGO_URL, 27017, {auto_reconnect: true});
  console.log('Using mongoDB in the following url: ' + MONGO_URL);;

  // retrieve a database reference
  var dbref = new mongo.Db('borderpass', serverInstance);

  // connect to database server
  dbref.open();
}
catch(err) {

  console.log('There was an error when trying to start mongoDB!\nERROR: ' + err);
}

// GET route for getting all the data from the table.
exports.all = function(req, res) {
  
  crossings.getAll(dbref, function(docs) {

    res.json(docs);
  });
};

// Create the crossings collection and insert dummy data to it.
exports.init =  function(req, res) {

  collections.create(dbref, "crossings", function(coll) {
    
    console.log("created collection : ", coll);
    collections.addCrossings(dbref, function(result) {
      
      console.log("inserted into crossings : ", result);
      res.send("created collection and inserted data !");
    });
  });
};
