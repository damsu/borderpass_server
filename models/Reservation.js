/* vim: set ts=2 sw=2 softtabstop=2:

   Model for adding Reservations.
*/
// Creating the collection

var dummyData = [
	{	crossing: {note: "THIS IS DUMMY DATA"},
		traveller: {Firstname: "Test", Lastname: "Buster", DocumentNumber:"123456789"}
	},
	{	crossing: {note: "THIS IS DUMMY DATA"},
		traveller: {Firstname: "John", Lastname: "Doe", DocumentNumber:"987654321"}
	}
];

exports.clearData = function(dbref, callback) {

  dbref.collection('reservations', function(err, reserve_coll) {
    reserve_coll.remove({}, function(err, result) {
		
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
