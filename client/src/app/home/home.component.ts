import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  users = this.getAccounts();

  constructor(private http: HttpClient) {
  }

  getAccounts(){
    return this.http.get(`http://localhost:3000/test/users/`);
  }

  ngOnInit() {

  }
}
