'use strict';

import {Component} from 'angular2/core';
// import * as io from 'socket.io-client';

@Component({
  selector: 'gabba-input',
  templateUrl: 'ng/chat/input'
})

export class InputComponent {
  socket = null;

  constructor(){
    console.log('input component loaded')
    // this.sessionID = Cookie.getCookie('gabba.sid');
    this.socket = io();
    const self = this;

    this.socket.on('connected', function( data ) {
      console.log('input: socket connected');

      self.socket.emit('user:login', {
        room: 'default',
        session: data.session
      });

    });

    this.socket.on('user:connected', function( data ) {
      console.log('input: user logged in.');
    });
  }

  connect(data) {
    // console.log('attempt login', data);
  }

  public placeholder = 'Type here to start talking...';

  sendMessage(event:any) {
    console.log('message: ' + event.target.value)
  }

}
