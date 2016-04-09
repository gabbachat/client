import {Component} from 'angular2/core';

@Component({
  selector: 'huck',
  templateUrl: 'views/huck.html'
})

export class AppComponent {
  public title = 'Huck';
  public template = 'app/huck.jade';
  public component = 'app/huck.component.ts';
}
