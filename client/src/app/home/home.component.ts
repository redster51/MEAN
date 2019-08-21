import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_CHECKBOX_CLICK_ACTION} from "@angular/material";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class HomeComponent implements OnInit {
  users;
  array = [];

  constructor(private http: HttpClient) {
  }

  getAccounts() {
    return this.http.get('/api/users',
      {headers: {Authorization: `Bearer ${localStorage.getItem('mean-token')}`}});
  }

  arrayForEvent(email) {
    this.array.push(email);
    console.log(this.array);
  }

  postMethod() {
    this.http.post('/api/', this.getCheckedUsers()).subscribe(r => console.log('button'));
  }

  getCheckedUsers() {
    return this.users.filter(user => user.checked);
  }

  ngOnInit() {
    this.getAccounts().subscribe((res) => {
      this.users = res;
      console.log(res);
    })
  }
}
