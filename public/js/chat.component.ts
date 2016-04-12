import {Component} from 'angular2/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'gabba-chat',
  templateUrl: 'ng/chat/chat'
})

export class ChatComponent {
  socket = null;

  constructor(){
    const self = this;
    const sessionID = Cookie.getCookie('gabba.sid')
    this.socket = io();

    this.socket.on('connected', function( data ) {
      console.log('chat: socket connected');
    });

    this.socket.on('user:connected', function( data ) {
      console.log('input: user logged in.');
      self.connecting = 'Hola ' + data.info.name.first + '!';
    });
  }

  public connecting = 'Waiting for connection to chat server...';

}
