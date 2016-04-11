import {Component} from 'angular2/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'gabba-chat',
  templateUrl: 'ng/chat/chat'
})

export class ChatComponent {
  socket = null;

  constructor(){
    let sessionID = Cookie.getCookie('gabba.sid')
    console.log('session id: ', sessionID)
  }

  public connecting = 'Waiting for connection to chat server...';

}
