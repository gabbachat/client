import {Component} from 'angular2/core';

@Component({
  selector: 'gabba',
  templateUrl: 'ng/gabba'
})

export class AppComponent {
  public title = 'Gabba';
  public template = 'app/gabba.jade';
  public component = 'app/gabba.component.ts';
}
