/* vim: set ts=2 sw=2 softtabstop=2:

   Model for adding Reservations.
*/
// Creating the collection
const Q = require('q');
var deferred = Q.defer();

var dummyData = [
  {data1: "[1]data1", data2: "[1]data2"},
  {data1: "[2]data1", data2: "[2]data2"},
  {data1: "[3]data1", data2: "[3]data2"},
  {data1: "[4]data1", data2: "[4]data2"}
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
