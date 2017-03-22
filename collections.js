/* vim: set ts=2 sw=2 softtabstop=2:

   Routes for collections.
*/

exports.list = function(req,res) {

  db.driver.collectionNames(function(e,names){
    res.json(names);
  })
});

exports.find = function(req,res) {

  var collection = db.get(req.params.name);
  collection.find({}, {limit:20}, function(e,docs) {

    res.json(docs);
  })
});
