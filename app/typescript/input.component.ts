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
  }

  public placeholder = 'Type here to start talking...';

}
