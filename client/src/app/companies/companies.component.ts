import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies;

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // console.log(cloudinary.cloudinaryInstance.image('dog'));
    this.route.queryParams
      .pipe(switchMap((param) => this.auth.search(param.text)))
      .subscribe(comps => this.companies = comps);
  }

  goToCompany(id) {
    this.router.navigate(['/company', id]);
  }

  search(message) {
    if (message) {
      this.auth.search(message).subscribe(r => this.companies = r);
    }
  }
}
