/* vim: set ts=2 sw=2 softtabstop=2:

   Routes for showing crossing information.
*/
var collections = require('../models/Collections.js');
var crossings = require('../models/Crossings.js');
var ObjectId = require('mongodb').ObjectId;

// GET route for getting all the data from the table.
exports.all = function(req, res) {
    
  crossings.getAll(req.app.locals.db, function(docs) {

    res.json(docs);
  });
};

// GET route for getting one crossing document.
exports.one = function(req, res) {

  var id = new ObjectId(req.params.id);
  crossings.getOne(req.app.locals.db, id, function(doc) {
    
    res.json(doc);
  });
};

// GET route for getting one crossing document.
exports.delete = function(req, res) {
  
  var id = new ObjectId(req.params.id);
  crossings.deleteOne(req.app.locals.db, id, function(result) {
    
    res.send("Successfully deleted this crossing");
  });
};

// POST route for adding a crossing
exports.add = function(req, res) {

  var data = req.body;
  console.log(req.body)
  data.push({"timeslots": new Array()});
  
  crossings.addCrossing(req.app.locals.db, data, function(result) {
    res.send("Sucessfully added a crossing");
  });

};

// PUT route for editing a crossing
exports.update = function(req, res) {
  
    var id = new ObjectId(req.params.id);
    var data = req.body;
  
    crossings.updateCrossing(req.app.locals.db, 'crossings', {_id: id}, data, function(result) {
  
      if (result.result.ok === 1) {
  
        res.sendStatus(200);
      } else {
  
        res.send([]);
      }
    });
  } 

// Create the crossings collection and insert dummy data to it.
exports.init =  function(req, res) {

  collections.create(req.app.locals.db, "crossings", function(coll) {
    
    collections.addCrossings(req.app.locals.db, function(result) {
      
      console.log("inserted into crossings : ", result);
      res.send("created collection and inserted data !");
    });
  });
};
