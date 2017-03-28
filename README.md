![Borderpass](/img/icon-bp.png)
#### server

---

# Table of Contents

* [About](#about)
* [Routing](#routing)
* [Adding more routes](#adding-more-routes)
  * [index.js](#indexjs)
  * [routes/foo.js](#routesfoojs)
* [Database connection](#database-connection)

# About  
This is a group project for the software development course.

# Routing
The server routing would go as follows:

| type | route | sent data | return |
| :-- | :-- | :-- | :-- |
| GET | /borders | n/a | list of crossing points |
| GET | /reservations/search/:id | **reservationNo** or **passportNo** | reservation data by reservation or passport number |
| POST | /reservations/add | **reservation_form** | add the users reservation to the database |
| DELETE | /admin/reservations/:id | **reservationID** | remove a reservation based on the reservation ID in the DB |

Some restrictions to specific routes

| route | restriction |
| :-- | :-- |
| /admin/.* | Only system administrators can access this route and its subroutes. |

# Adding more routes
Creating more routes for the server requires two parts:   
1. modification of the **index.js**
2. creating/modifying a file in **routes/** directory.

Example code below:

### index.js
```javascript
...
// Importing the required route(s).
var rt_foo = require('routes/foo.js');
...

...
// Using the new routes.
// GET routes
app.get('/foo', rt_foo.foo);
app.get('/foo/:bar', rt_foo.bar);

// POST routes
app.post('/foo', rt_foo.post.foo);
app.post('/foo/:bar', rt_foo.post.bar);
```

### routes/foo.js
```javascript
// GET routes
exports.foo = function(req, res) {

   // do stuff...
   res.send('foo');
}
exports.bar = function(req, res) {

   // do stuff...
   res.send('bar');
}
// ----------
// POST routes
exports.post = {

   foo: function(req, res) {

      // do stuff...
      console.log(req.body); // log the POST request.
      res.sendStatus(200); // OK!
   },
   bar: function(req, res) {

      // do stuff...
      console.log(req.body);
      res.sendStatus(200) // OK!
   }
}
// -----------
```

# Database connection
The mongoDB connection is initialized in the **index.js** file and the db element is put into expressjs [locals](http://expressjs.com/en/4x/api.html#res.locals).  
This can be called in a different export/route using ```
res.app.locals.db ```.
