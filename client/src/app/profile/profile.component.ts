import {Component, OnInit} from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html',
  styles: ['.container{ margin-top: 20px;}'],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  currentCompanies;
  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.auth.getCompaniesByUser(user._id).subscribe(r => {
        console.log(r);
        this.currentCompanies = r;
      });
    }, (err) => {
      console.error(err);
    });
  }
}
