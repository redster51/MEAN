import { Component } from '@angular/core';
import {AuthenticationService, companyDetails} from './authentication.service';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  text: string = '';
  companies: Array<companyDetails>;
  ru;
  en;
  constructor(public auth: AuthenticationService, private router: Router, private route: ActivatedRoute, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.en = true;
    this.route.queryParams.subscribe(param => {
      this.text = param.text;
    });
  }

  toRu() {
    this.translate.use('ru');
    this.en = false;
    this.ru = true;
  }

  toEn() {
    this.translate.use('en');
    this.en = true;
    this.ru = false;
  }

  search() {
    this.router.navigate(['/'], {queryParams: {text: this.text}});
  }
}
