import {Component} from '@angular/core';
import {AuthenticationService, TokenPayload} from '../authentication.service';
import {Router} from '@angular/router';
import {AlertsService} from "angular-alert-module";


@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, private alerts: AlertsService) {
  }

  register() {
    this.auth.register(this.credentials).subscribe((t) => {
      console.log(t);
    });
    this.alerts.setMessage('Check your email please...','success');
  }
}
