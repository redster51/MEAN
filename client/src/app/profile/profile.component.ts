import {Component, OnInit} from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import {MatTableDataSource} from "@angular/material/table";
import {Router, RouterModule} from "@angular/router";

@Component({
  templateUrl: './profile.component.html',
  styles: ['.container{ margin-top: 20px;}'],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  currentCompanies;
  displayedColumns = ['position', 'name', 'Collected money', 'Need money'];
  dataSource;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private auth: AuthenticationService, private router: Router) {}
  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.auth.getCompaniesByUser(user._id).subscribe(r => {
        console.log(r);
        this.currentCompanies = r;
        this.dataSource = new MatTableDataSource(this.currentCompanies);
      });
    }, (err) => {
      console.error(err);
    });
  }
  sumOfDonates(donates) {
    let sum = 0;
    for (let i = 1; i < donates.length; i++) {
      sum += Number(donates[i].donate);
    }
    return sum;
  }

  goToCompany(id) {
    this.router.navigate(['/company', id]);
  }
}
