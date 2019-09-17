import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company;
  isCompanyAvailable: boolean = false;
  loading;
  displayURL;
  rate: number;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.auth.getCompany(params.get("id")).subscribe(res => {
        this.company = res[0];
        this.isCompanyAvailable = true;
        this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.matchYoutubeUrl(this.company.video));
        this.auth.getRating(this.company._id).subscribe(rating => {
          console.log(rating);
          this.rate = this.countRating(rating);
        })
      });
    });
  }

  countRating(ratings) {
    let countRatings = 0;
      for (let i = 0; i < ratings.length; i++) {
        countRatings += ratings[i].rate;
      }
    return countRatings/ratings.length;
  }

  matchYoutubeUrl(url) {
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? 'https://www.youtube.com/embed/' + RegExp.$1 : '';
  }

  addRating() {
    let rating = {userId: this.auth.getUserDetails()._id, rate: this.rate};
    console.log(rating);
    let companyId = this.company._id;
    this.auth.addRating(companyId, rating).subscribe(r => {
      console.log(r);
    });
  }
}
