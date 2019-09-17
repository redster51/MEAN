import { Component } from '@angular/core';
import {AuthenticationService, companyDetails} from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  text: string = '';
  companies: Array<companyDetails>;
  constructor(public auth: AuthenticationService) {

  }

  search() {
    if (this.text) {
      this.auth.search(this.text).subscribe(r => console.log(r));
    }
  }
}
