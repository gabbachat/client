import {Component} from 'angular2/core';
// import * as io from 'socket.io-client';

@Component({
  selector: 'gabba',
  templateUrl: 'ng/gabba'
})

export class AppComponent {
  socket = null;

  constructor(){
    console.log('AppComponent loaded');
    this.socket = io();

    this.socket.on('connected', function(data){
      console.log('socket connected', data);
      this.connected = true;
    }.bind(this));

    this.socket.on('disconnect', function(data){
      console.log('socket connected', data);
      this.connected = false;
    }.bind(this));

    this.socket.on('error', function(data){
      console.log('Socket Error');
      console.error(data.err);
      this.connected = false;
    }.bind(this));

  }

  public title = 'Gabba';
  public username = '';

}
