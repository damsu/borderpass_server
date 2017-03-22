/* vim: set ts=2 sw=2 softtabstop=2:

   Routes for collections.
*/
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

