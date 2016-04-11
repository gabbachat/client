# Gabba Core
This is the core node server that is installed by Gabba. It is built on top of [Express](http://expressjs.com) and has a handful of conveniences built in as you will see below.


## Routing
All routes are stored in [app/routes](app/routes). Any file placed in this directory fill automatically be loaded by the router.

**Example:**
Create a file [app/routes/user.js](app/routes/user.js):
```
module.exports = function(router) {
  router.get('/user/:id', 'user');
};
```
The example above will grab any GET requests to [http://localhost:3000/user/juno](http://localhost:3000/user/juno) and save "juno" as an "id" variable, and then load the "user" controller.

This Gabba router is merely an abstraction of the built in Express router. It should do the job for most cases, but should you have the need, you also have direct access to the express router. When the file is loaded, it is passed 2 properties, first is the `router` function you saw above, and the second is the `app` object.

For more advance routing options, check out the [Express routing](http://expressjs.com/en/guide/routing.html) documentation. Note, the "req" and "res" mentioned in the express documentation will automatically be injected into your controller, so there's no need to


---------------


## Controllers
You saw how to load a controller above, now to use it. Inside your controller you will want to have something like this:

```
module.exports = function(client, app) {
  let userID = client.get.params.id;
  client.send.render('index', {
    username: userID
  });
};
```

Two parameters will be passed to the controller by the loader. The first "client" is an object that contains the request & response data:

- client.get: maps to express [request](http://expressjs.com/en/4x/api.html#req) object
- client.send: maps to express [response](http://expressjs.com/en/4x/api.html#res) object


---------------


## Views


## Models
