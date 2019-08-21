import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['.navig{margin-bottom: 50px}', '.span{margin: auto}']
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {}
}
