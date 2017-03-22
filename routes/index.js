/* vim: set ts=2 sw=2 softtabstop=2:
  
  Main routes-file for handling the generic routes.
*/

exports.index = function(req, res) {

  console.log('root route accessed.');
  res.send('Hello, world!');
};

exports.test = {
  test1: function(req, res) {
    
    res.send('This is the route for test1!');
  },
  test2: function(req, res) {
    
    res.send('Here is a second route: test2!');
  }
}

exports.ok = function(req, res) {

  res.sendStatus(200);
};

exports.cross = function(req, res) {

  console.log('cross route with "' + req.params.loc + '" as a location.');
  res.send('location: ' + req.params.loc);
};

