import { Component } from '@angular/core';
import {AuthenticationService, companyDetails} from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  search: string = ' ';
  companies: Array<companyDetails>;
  constructor(public auth: AuthenticationService) {

  }

  getSearch() {
    this.auth.getSearch(this.search).subscribe(r => console.log(r));
  }
}
