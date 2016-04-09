'use strict';

module.exports = function(app, client) {

  const id   = client.get.params.id,
        Model = app.get('model')('experience');

    Model.get('product', id).then(function(data) {

      client.send.render('experience', {
        config: app.get('config'),
        data: data,
        menu: {
          about: id,
        }
      });

    }).catch(function(err) {
      client.send.render('errors/experience', {
        config: app.get('config'),
        error: err
      });
    });

};
