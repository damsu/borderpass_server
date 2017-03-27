/* vim: set ts=2 sw=2 softtabstop=2:

   Routes for showing crossing information.
*/
var collections = require('../models/Collections.js');
var crossings = require('../models/Crossings.js');
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGO_URL = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost:27017/borderpass';
var dbref;


try {

  // create a server instance
  //console.log('Trying to start server in address ' + MONGO_URL);
  /*/
  var serverInstance = new mongo.Server(MONGO_URL, 27017, {auto_reconnect: true});

  // retrieve a database reference
  var dbref = new mongo.Db('borderpass', serverInstance);
  /*/
  var server = mongo.connect(MONGO_URL, function(err, db) {
    if (err) {
      
      console.log(err);
      process.exit(1);
    }
    
    dbref = db;
  });
  //*/
  console.log('Using mongoDB in the following url: ' + MONGO_URL);;

  // connect to database server
  //dbref.open();
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

// GET route for getting one crossing document.
exports.one = function(req, res) {
  var id = new ObjectId(req.params.id);
  crossings.getOne(dbref, id, function(doc) {
    res.json(doc);
  });
};

// GET route for getting one crossing document.
exports.delete = function(req, res) {
  var id = new ObjectId(req.params.id);
  crossings.deleteOne(dbref, id, function(result) {
    res.send("Successfully deleted this crossing");
  });
};

// POST route for adding a crossing
exports.add = function(req, res) {
  
  crossings.addCrossing(dbref, req.body, function(result) {

    res.send("Sucessfully added a crossing");
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
