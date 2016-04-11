import {Component} from 'angular2/core';
// import * as io from 'socket.io-client';

@Component({
  selector: 'gabba-sidebar',
  templateUrl: 'ng/chat/sidebar'
})

export class SidebarComponent {
  socket = null;

  constructor(){
    console.log('sidebar component loaded')
  }

  public title = 'Gabba Chat';

}
