import {Component} from 'angular2/core';
// import * as io from 'socket.io-client';

@Component({
  selector: 'gabba-chat',
  templateUrl: 'ng/chat/chat'
})

export class ChatComponent {
  socket = null;

  constructor(){
    console.log('chat component loaded')
  }

  public connecting = 'Waiting for connection to chat server...';

}
