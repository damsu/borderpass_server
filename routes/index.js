/*= = = = =
  Main routes-file for handling the routes.
  = = = = =*/

exports.index = function(req, res) {

  console.log('root route accessed.');
  res.send('Hello, world!');
};

exports.collections = function(req, res) {

  res.sendStatus(200);
};

exports.cross = function(req, res) {

  console.log('cross route with "' + req.params.loc + '" as a location.');
  res.send('location: ' + req.params.loc);
};

// vim: set ts=2 sw=2 softtabstop=2:
