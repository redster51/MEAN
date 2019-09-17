import { Component } from '@angular/core';
import {AuthenticationService, companyDetails} from './authentication.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  text: string = '';
  companies: Array<companyDetails>;
  constructor(public auth: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(param => {
      this.text = param.text;
    })
  }

  search() {
    this.router.navigate(['/'], {queryParams: {text: this.text}});
  }
}
