var collections = require('../models/Collections.js');
var crossings = require('../models/Crossings.js');
var mongo = require('mongodb');
/* vim: set ts=2 sw=2 softtabstop=2:

   Routes for collections.
*/
try {

  // create a server instance
  var serverInstance = new mongo.Server('mongodb://damien:passpass@ds141450.mlab.com', 41450);
  //console.log('Using mongoDB in the following url: ' + MONGO_URL);;

  // retrieve a database reference
  var dbref = new mongo.Db('borderpass', serverInstance);

  // connect to database server
  dbref.open();
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

