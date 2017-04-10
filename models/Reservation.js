/* vim: set ts=2 sw=2 softtabstop=2:

   Model for adding Reservations.
*/
// Creating the collection
const Q = require('q');
var deferred = Q.defer();

var dummyData = [
	{	crossing: {note: "THIS IS DUMMY DATA"},
		traveller: {Firstname: "Test", Lastname: "Buster", DocumentNumber:"123456789"}
	},
	{	crossing: {note: "THIS IS DUMMY DATA"},
		traveller: {Firstname: "John", Lastname: "Doe", DocumentNumber:"987654321"}
	}
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
