/* vim: set ts=2 sw=2 softtabstop=2:
  
  Main routes-file for handling the generic routes.
	Only holds the base root route!
*/
exports.index = function(req, res) {

  res.send('Hello, world!');
};
