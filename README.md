![Borderpass](/img/icon-bp.png)
### S E R V E R

---

# Table of Contents

* [About](#about)
* [Routing](#routing)
  * [Getting reservation data](#getting-reservation-data)
  * [Adding new reservations](#adding-new-reservations)
  * [Getting all borders](#adding-new-reservations)
  * [Getting specified border](#adding-new-reservations)
  * [Adding new border](#adding-new-reservations)
  * [Updating existing border](#adding-new-reservations)
* [Adding more routes](#adding-more-routes)
  * [index.js](#indexjs)
  * [routes/foo.js](#routesfoojs)
* [Database connection](#database-connection)

# About  
This is a group project for the software development course. The aim was to create a mobile platform to make the border crossing faster and a less of an hassle to begin with.

# Routing
The server routing would go as follows:

| type | route | sent data |
| :-- | :-- | :-- |
| GET | /borders | n/a |

**Returns:** Every border crossing saved to the database.

---
## Getting reservation data

### By document number:
| type | route | sent data |
| :-- | :-- | :-- |
| POST | /reservations/docNum | **Object** |
**Object format:**
``` json
{
	"Document": "<document type>",
	"DocumentNumber": "<document number>",
	"Citizenship": "<EN/FI/RU/GR etc...>"
}
```

**Returns:** All the matching data from the query in reverse order. (Returns an empty array if nothing is found.)

### By document ID:
| type | route | sent data |
| :-- | :-- | :-- |
| GET | /reservations/id/**:id** | **id** of the reservation |
**Returns:** The reservation matching the id parameter of the route.

---
## Getting all borders
| type | route | sent data |
| :-- | :-- | :-- |
| POST | /borders/ | **empty** |

**Returns:** Array of added borders  

---

## Getting specified border
| type | route | sent data |
| :-- | :-- | :-- |
| POST | /borders/:id | **id of the border** |

**Returns:** Border with specified id. 

---
## Getting reservation data

| type | route | sent data |
| :-- | :-- | :-- |
| POST | /reservations/docNum | **Object** |
**Object format:**
``` json
{
	"Document": "<document type>",
	"DocumentNumber": "<document number>",
	"Citizenship": "<EN/FI/RU/GR etc...>"
}
```

**Returns:** All the matching data from the query in reverse order. (Returns an empty array if nothing is found.)

---
## Adding new border
| type | route | sent data |
| :-- | :-- | :-- |
| POST | /crossings/ | **crossing_form** |

**Returns:** 200 OK
**reservation_form format:**  
*(the server is interested in the following data)*
``` json
	{
		"from_country":"<string>",
		"to_country":"<string>",
		"from_city":"<string>",
		"to_city":"<string>",
		"address":"<string>",
		"from_flag_url":"<string>",
		"to_flag_url":"<string>",
		"short_name_from":"<string>",
		"short_name_to":"<string>",
		"service_provider":"<string>"
	}
```

---
## Updating existing border
| type | route | sent data |
| :-- | :-- | :-- |
| POST | /crossings/:id | **id (in URL) + crossing_form** |

**Returns:** 200 OK
**reservation_form format:**  
*(the server is interested in the following data)*
``` json
	{
		"from_country":"<string>",
		"to_country":"<string>",
		"from_city":"<string>",
		"to_city":"<string>",
		"address":"<string>",
		"from_flag_url":"<string>",
		"to_flag_url":"<string>",
		"short_name_from":"<string>",
		"short_name_to":"<string>",
		"service_provider":"<string>"
	}
```
---

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
