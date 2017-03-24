var collections = require('../models/Collections.js');
var crossings = require('../models/Crossings.js');
var mongo = require('mongodb').MongoClient;
var MONGO_URL = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost:27017/borderpass';
var dbref;


try {

  // create a server instance
  console.log('Trying to start server in address ' + MONGO_URL);
  /*/
  var serverInstance = new mongo.Server(MONGO_URL, 27017, {auto_reconnect: true});
>>>>>>> f0473dc9ea8c302174c90b6a6593314c3e1cc452

  // retrieve a database reference
  var dbref = new mongo.Db('borderpass', serverInstance);
  /*/
  var server = mongo.connect(MONGO_URL, function(err, db) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    dbref = db;
    console.log('MongoDB initalized succesfully!')
  });
  //*/
  console.log('Using mongoDB in the following url: ' + MONGO_URL);;

  // connect to database server
  //dbref.open();
}
catch(err) {

  console.log('There was an error when trying to start mongoDB!\nERROR: ' + err);
}
// testing object array
var collection = [

  {name: 'John', likes: 'cats'},
  {name: 'Marty', likes: 'dogs'},
  {name: 'Mariann', likes: 'dogs'},
  {name: 'Keem', likes: 'cats'},
  {name: 'Rob', likes: 'rats'},
  {name: 'Ehm', likes: 'camels'}
];

exports.list = function(req, res) {

  console.log(collection);
  db.driver.collectionNames(function(e, names) {

    res.json(names);
  });
};

exports.find = function(req, res) {


/*
  var collection = db.get(req.params.name);
  collection.find({}, {limit:20}, function(e,docs) {

    res.json(docs);
  })
*/
};

exports.init = function(req, res) {

  collections.create(dbref, "crossings", function(coll) {

    console.log("created collection : ", coll);
    collections.addCrossings(dbref, function(result) {

      console.log("inserted into crossings : ", result);
      res.send("created collection and inserted data !");
    });
  });
};

