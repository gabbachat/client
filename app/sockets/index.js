'use strict';

module.exports = function(app) {

  const io = require('socket.io')(app.server);

  console.info('socket/index.js loaded');

  // CONNECTION
  io.on('connection', function(socket){

    const id = socket.id,
          Socket = require( __dirname + '/config.js' )( socket, io ),
          Message = require( __dirname + '/message.js' )( app, Socket ),
          Room = require( __dirname + '/room.js' )( app, Socket ),
          User = require( __dirname + '/user.js' )( app, Socket );

    console.log('connected with id ' + id);

    // TELL CLIENT WE'RE CONNECTED
    socket.emit('connected', {
      connected : true,
      id : id
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
