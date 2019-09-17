import { Component, OnInit } from '@angular/core';
import {AuthenticationService, companyDetails} from "../authentication.service";
import {Router} from "@angular/router";
import {CloudinaryOptions, CloudinaryUploader} from "ng2-cloudinary";

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  user = this.auth.getUserDetails();
  loading;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({
      cloudName: 'db1ymlgol',
      uploadPreset: 'ml_default'
    })
  );
  company: companyDetails = {
    creator: '',
    name: '',
    description: '',
    topic: '',
    video: '',
    collectedMoney: 0,
    needMoney: 0,
    endDate: Date.toString(),
    bonuses: [],
    rating: [{userId: '', rate: 5}],
    imgUrl: ''
  };

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.company.creator = this.user._id;
  }

  upload() {
    this.loading = true;
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string): any => {
      let res: any = JSON.parse(response);
      console.log(res);
      this.company.imgUrl = res.url;
      console.log('image', this.company.imgUrl);
    };
    this.uploader.onErrorItem = function (fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
  }

  createCompany() {
    this.auth.addCompany(this.company).subscribe(r => console.log(r));
  }
}
