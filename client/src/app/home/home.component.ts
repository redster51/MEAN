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
    return this.http.get('/api/users', { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }

  ngOnInit() {
    this.users.subscribe((res) => {
      console.log(res);
    })
  }
}
