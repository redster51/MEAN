import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.initCompanies()
  }

  initCompanies() {
    this.auth.getCompanies().subscribe((res) => {
      this.companies = res;
      console.log(res);
    })
  }
}
