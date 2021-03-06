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
  private user = this.auth.getUserDetails();
  isCompanyAvailable: boolean = false;
  displayURL;
  private rate: number;
  private value: number;
  private comment: string;
  private newsText: string;
  private newsTitle: string;
  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.auth.getCompany(params.get("id")).subscribe(res => {
        this.company = res[0];
        this.isCompanyAvailable = true;
        this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.matchYoutubeUrl(this.company.video));
        this.auth.getRating(this.company._id).subscribe(rating => {
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
    return countRatings / ratings.length;
  }

  matchYoutubeUrl(url) {
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? 'https://www.youtube.com/embed/' + RegExp.$1 : '';
  }

  addRating() {
    let rating = {userId: this.auth.getUserDetails()._id, rate: this.rate};
    let companyId = this.company._id;
    this.auth.addRating(companyId, rating).subscribe(r => this.ngOnInit());
  }

  addComment() {
    let comment = {userId: this.user._id, userName: this.user.name, time: CompanyComponent.getCurrentTime(), text: this.comment};
    this.auth.addComment({companyId: this.company._id, comment: comment}).subscribe(r => {
      console.log(r);
      this.ngOnInit();
    });
    this.comment = ''
  }

  checkUserIsCreator(creatorOfCompany, user){
    return creatorOfCompany === user;
  }

  addNews() {
    let newsObject = {time: CompanyComponent.getCurrentTime(), content: this.newsText, title: this.newsTitle};
    this.auth.addNews({companyId: this.company._id, text: newsObject}).subscribe(r => {
      console.log(r);
      this.ngOnInit();
    });
    this.newsText = '';
    this.newsTitle = '';
  }

  private static getCurrentTime(): string{
    let date = new Date();

    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleDateString('en-US', options)
  }

  useDonate():void {
    if (this.value !== 0) {
      let objectDonate: object = {name: this.company.name, userId: this.auth.getUserDetails()._id, donate: this.value};
      this.auth.addDonate(objectDonate).subscribe(r => this.ngOnInit());
    }
  }

  sumOfDonates(donates) {
    let sum = 0;
    for (let i = 1; i < donates.length; i++) {
      sum += Number(donates[i].donate);
    }
    return sum;
  }

  sumInPercent(value) {
    return value * 100 / this.company.needMoney;
  }
}
