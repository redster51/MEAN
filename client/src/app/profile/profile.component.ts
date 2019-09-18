import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html',
  styles: ['.container{ margin-top: 20px;}'],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: UserDetails;
  currentCompanies;
  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.currentCompanies = this.getCompaniesByUser(user._id);
      console.log('user', user._id);
    }, (err) => {
      console.error(err);
    });
  }

  getCompaniesByUser(id) {
    console.log(id);
    this.auth.getCompaniesByUser(id).subscribe(r => console.log(r));
  }
}
