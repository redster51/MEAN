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
  array: Array<String> = this.array.getCheckedUsers();  //по идее должен прилетать массив строк.
                                                        //ты что-то говорил про то, что приетает объект. но нужен массив

  constructor(private http: HttpClient) {
  }

  getAccounts() {
    return this.http.get('/api/users',
      {headers: {Authorization: `Bearer ${localStorage.getItem('mean-token')}`}});
  }


  deleteUsers() {
    this.http.post('/api/delete', 'qwerty',
      {headers: {Authorization: `Bearer ${localStorage.getItem('mean-token')}`}})
      .subscribe(r => console.log('delete-button') );
  }

  blockUsers() {
    this.http.post('/api/block', this.getCheckedUsers(),
      {headers: {Authorization: `Bearer ${localStorage.getItem('mean-token')}`}})
      .subscribe(r => console.log('button') );
  }

  unblockUsers() {
    this.http.post('/api/unblock', this.getCheckedUsers(),
      {headers: {Authorization: `Bearer ${localStorage.getItem('mean-token')}`}})
      .subscribe(r => console.log('button') );
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
