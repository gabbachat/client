'use strict';

module.exports = function ( app, gabba ) {

  const config = app.get('config'),
        fs = require('fs'),
        io = gabba.io,
        log = gabba.log,
        namespace = gabba.namespace,
        Model = app.get('models').user,
        gravatar = require('gravatar'),
        socket = gabba.socket;

  return {

    init : function () {
      console.log('User Init');
      this.login();
    },

    avatar : function ( user_id ) {

      const User = this;


      if ( fs.existsSync( __dirname + '' + user_id ) ) {
        return '';
      } else {
        return '';
      }

    },


    connected : function( data ) {

      const User = this;

      console.log('user.connected()');

      let username = data.username;
      let session = data.session;

      socket.join( namespace );
      socket.join( namespace + ':' + session);

      // io.to('gabba:' + session).emit('user:connected', data);
      io.emit('user:connected', data);

    },

    fetch : function ( user_id, cb ) {

      Model.findOne( user_id, cb );

    },

    list : function() {

      console.log('list all users');

      // Model.list( function( users ) {
      //   io.to('gabba').emit('user:list', users);
      // });
    },

    listActive : function( room ) {

      console.log('list all active users');

      Model.query( { 'logged_in' : true }, function( users ) {
        io.to( 'gabba:' + room ).emit('user:listRoom', users);
      });

    },

    listActiveByRoom : function( room ) {

      console.log('list active users by room');

      Model.query( { 'room_id' : room, 'logged_in' : true }, function( users ) {
        io.to( 'gabba:' + room ).emit('user:listRoom', users);
      });

    },

    listByRoom : function( room ) {

      console.log('list users by room');

      Model.query( { 'room_id' : room }, function( users ) {
        io.to( 'gabba:' + room ).emit('user:listRoom', users);
      });

    },

    listInnactive : function( room ) {

      console.log('list innactive users');

      Model.query( { 'logged_in' : false }, function( users ) {
        io.to( 'gabba:' + room ).emit('user:listRoom', users);
      });

    },

    listInnactiveByRoom : function( room ) {

      console.log('list innactive users by room');

      Model.query( { 'room_id' : room, 'logged_in' : false }, function( users ) {
        io.to( 'gabba:' + room ).emit('user:listRoom', users);
      });

    },

    // CONNECT USER
    login : function() {

      const User = this;

      console.log('user.login');

      socket.on('user:login', function(data) {

        console.log('login user: ', data);
        let query = {session: data.session};

        // SAVE SESSION ID TO USER DB
        Model.findOne(query).exec(function(err, user) {
          console.log('find user');

          // IF SESSION IS NOT FOUND, LOGIN AGAIN
          if (err !== null) {
            console.log('User fetch error', err);

          // IF SESSION IS FOUND
          } else if (typeof user !== 'undefined') {
            console.log('user found, attempting to update room');
            Model.update(query, {connected: true, room: data.room}).exec(function(err, user2) {
              if (err !== null) {
                console.log('Error saving room', err);
              } else {
                console.log('room saved, tell user they are logged in');
                User.connected( user );
              }
              // User.list();
              // User.listByRoom(room_id);
            });
          }

        });

        // Model.findOne({session: data.session}).exec(function(err, data) {
        //   if (!err) console.log('User fetch error', err);
        // });

        // let email = data.email,
        //     room_id = data.room_id,
        //     user_id = data.user_id;
        //
        // User.fetch( user_id, function(data) {
        //
        //   var userData = data;
        //
        //   if ( typeof data === 'undefined' || data.length === 0 ) {
        //
        //     User.register( {
        //       email : email,
        //       user_id : user_id,
        //       name : user_id,
        //       room_id : room_id,
        //       logged_in : true,
        //       session_id : socket.id
        //     }, function( data ) {
        //       User.connected( data );
        //       User.list();
        //       User.listByRoom(room_id);
        //     } );
        //   } else {
        //
        //     var avatar = gravatar.url(data.email, {
        //       'size': 200,
        //       'default': 'http://gabbak.herokuapp.com/img/avatars/users/default.png'
        //     });
        //
        //     User.update( { user_id: user_id, avatar : avatar }, {
        //       room_id : room_id,
        //       logged_in : true,
        //       session_id : socket.id
        //     }, function( data ) {
        //       User.connected( userData );
        //       User.list();
        //       User.listByRoom(room_id);
        //     } );
        //
        //   }
        //
        // } );


      });

    },

    logout : function( session_id ) {

      const User = this;

      User.update( {'session_id': session_id}, {
        logged_in : false,
        session_id : session_id
      }, function( data ) {
        User.list();
      } );

    },


    register : function( data, cb ) {

      console.log('register user with data: ');
      console.log(data);

      Model.create( data, cb );

    },

    update : function( user_id, data, cb ) {

      Model.update( user_id, data, cb );

    },
  };
};
