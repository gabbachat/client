'use strict';

module.exports = function(app) {

  const passport      = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        Model         = app.get('models').user,
        security      = app.get('security'),
        Utility       = app.get('utility');

  let User = {
    findOne: function(data, cb) {

      Model.findOne().where({
        username: data.username,
      }).then(function(data) {
        cb(false, data)
      }).catch(function(){
        cb(true, 'user not found')
      });

    },
    validPassword: function(password, data) {
      console.log('validating password');

      if (Utility.encryptSync(password, security) === data.password) {
        console.log('it\'s a match!' );
        return true;
      } else {
        console.log('no match');
        return false;
      }

    }
  }

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  return new LocalStrategy(
    function(username, password, done) {
      console.log('username', username);
      console.log('password', password);

      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log('no user');
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!User.validPassword(password, user)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('auth ok');
        return done(null, user);
      });
    }
  )

}
