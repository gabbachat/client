'use strict';

module.exports = function(app) {

  const io = require('socket.io')(app.server);

  // CONNECTION
  io.on('connection', function(socket){

    const id = socket.id,
          Socket = require( __dirname + '/config.js' )( socket, io ),
          Message = require( __dirname + '/message.js' )( app, Socket ),
          Room = require( __dirname + '/room.js' )( app, Socket ),
          User = require( __dirname + '/user.js' )( app, Socket );

    console.log('connected with id ' + id);
    // console.log('session id: ', app.get('sessionID'));
    // console.log('user data: ', app.get('userData'));

    // TELL CLIENT WE'RE CONNECTED
    socket.emit('connected', {
      connected : true,
      id : id,
      session: app.get('sessionID')
    });

    // ERROR HANDLER
    socket.on('error', function (err){

      console.error('Socket Error:', err.message);

      io.to('gabba').emit('error', {
        err : err.message
      });

    });

    // HANDLE DISCONNECTIONS
    socket.on('disconnect', function (socket){
      console.log('USER DISCONNECTED!');
      console.log(id + ' disconnected');
      User.logout(id);
    });

    // INITIALIZE SOCKETS
    User.init();
    Message.init();
    Room.init();

  });

};
