import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    // console.log(cloudinary.cloudinaryInstance.image('dog'));
    this.initCompanies()
  }

  initCompanies() {
    this.auth.getCompanies().subscribe((res) => {
      this.companies = res;
      console.log(res);
    })
  }

  goToCompany(id) {
    this.router.navigate(['/company', id]);
  }
}
