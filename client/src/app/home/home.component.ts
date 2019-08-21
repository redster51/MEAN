import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users;


  constructor(private http: HttpClient) {
  }

  getAccounts(){
    return this.http.get('/api/users',
      { headers: { Authorization: `Bearer ${localStorage.getItem('mean-token')}` }});
  }

  ngOnInit() {
    this.getAccounts().subscribe((res) => {
      this.users = res;
      console.log(res);
    })
  }
}
