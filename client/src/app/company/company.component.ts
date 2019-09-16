import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {CloudinaryOptions, CloudinaryUploader} from "ng2-cloudinary";
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
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({
      cloudName: 'db1ymlgol',
      uploadPreset: 'ml_default'
    }) //много вопросов к этому параметру
  );
  rate: number;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private sanitizer: DomSanitizer) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get("id"));
      this.auth.getCompany(params.get("id")).subscribe(res => {
        console.log(res);
        this.company = res[0];
        this.isCompanyAvailable = true;
        this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.matchYoutubeUrl(this.company.video));
      });
    });
  }

  matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? 'https://www.youtube.com/embed/' + RegExp.$1 : '';
  }

  upload() {
    this.loading = true;
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string): any => {
      let res: any = JSON.parse(response);
      console.log(res);
    };
    this.uploader.onErrorItem = function (fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
  }

  addRating() {
    let rate, userId;
    userId = this.auth.getUserDetails()._id;
    rate = this.rate;
    let rating = {userId, rate};
    let companyId = this.company._id;
    this.auth.addRating(companyId, rating);
  }
}
