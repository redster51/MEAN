import { Component, OnInit } from '@angular/core';
import {AuthenticationService, companyDetails} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  user = this.auth.getUserDetails();
  company: companyDetails = {
    creator: '',
    name: '',
    description: '',
    topic: '',
    video: '',
    needMoney: 0,
    endDate: Date.toString()
  };

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.company.creator = this.user._id;
  }

  createCompany() {
    this.auth.addCompany(this.company).subscribe(r => console.log(r));
  }
}
