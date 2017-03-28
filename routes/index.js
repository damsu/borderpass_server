/* vim: set ts=2 sw=2 softtabstop=2:
  
  Main routes-file for handling the generic routes.
*/
var http = require('http');
var fs = require('fs');

//*/
exports.index = function(req, res) {

  console.log('root route accessed.');
  res.send('Hello, world!');
};
/*/
exports.index = {
  
  hostname: 'localhost',
  port: app.get('port'),
  path: '/',
  agent: false
}, (res) => {

  res.sendStatus(200);
}
//*/

exports.test = {
  
  test1: function(n) {
    
    return function(req, res) {
    
      res.send('This is the route for test1!\nvariable: ' + n);
    }
  },
  test2: function(n) {

    return function(req, res) {
      
      res.send('Here is a second route: test2!\nvariable:' + n);
    }
  },
  post: {
  
    test1: function(req, res) {
    
      console.log('Post request got');
      res.sendStatus(200);
    }
  }
}

exports.ok = function(req, res) {

  res.sendStatus(200);
};

exports.cross = function(req, res) {

  console.log('cross route with "' + req.params.loc + '" as a location.');
  res.send('location: ' + req.params.loc);
};

