import {Component, OnInit} from '@angular/core';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {CloudinaryOptions, CloudinaryUploader} from "ng2-cloudinary";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company;
  isCompanyAvailable: boolean = false;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'db1ymlgol',
      uploadPreset: 'ml_default' }) //много вопросов к этому параметру
  );
  loading: any;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get("id"));
      this.auth.getCompany(params.get("id")).subscribe(res => {
        console.log(res);
        this.company = res[0];
        this.isCompanyAvailable = true;
      });
    });
  }

  upload(){
    this.loading = true;
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res);
    };
    this.uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
  }

}
