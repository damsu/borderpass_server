/* vim: set ts=2 sw=2 softtabstop=2:

   Model for adding Reservations.
*/
// Creating the collection
const Q = require('q');
var deferred = Q.defer();

var dummyData = [
	{Name: "Test", Surname: "Buster", Address: "Nanitee", DocumentNumber:"123456789"},
	{Name: "Test", Surname: "Buster", Address: "Nanitama", DocumentNumber:"123456789"}
];

exports.addDummyData = function(dbref, callback) {

  // TODO: Add dummy data insertion. 
  dbref.collection('reservations', function(err, reserve_coll) {
  
    reserve_coll.remove({});
    reserve_coll.insert(dummyData, function(err, result) {

      if (err) {
      
        throw err;
      } else {
      
        callback(result);
      }
    });
  });
};
exports.getAll = function(dbref, callback) {

  dbref.collection('reservations', function(err, reserve_coll) {
  
    reserve_coll.find().toArray(function(err, result) {
    
      if (err) {
      
        throw err;
      } else {
      
        callback(result);
      }
    });
  });
}
