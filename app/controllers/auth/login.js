'use strict';

module.exports = function(client, app) {

  const Model = app.get('models').user;
  const Utility = app.get('utility');
  const security = app.get('security');

  Utility.encrypt('blah', security).then(function(pass) {

    Model.find().where({
      username: client.get.params.method,
      password: pass
    }).then(function(data) {
      client.send.status(200).send(data);
    }).catch(function(err){
      client.send.status(200).send(err);
    });

  }).catch(function(err) {
    client.send.status(200).send(err);
  });



}
