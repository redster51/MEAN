import {Component, OnInit} from '@angular/core';
import {MAT_CHECKBOX_CLICK_ACTION} from "@angular/material";
import {AuthenticationService} from "../authentication.service";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class HomeComponent implements OnInit {
  users;

  constructor(private auth: AuthenticationService) {
  }

  deleteUsers() {
    this.auth.deleteUsers(this.getCheckedUsers())
      .subscribe(() => this.initUsers());
  }

  blockUsers() {
    this.auth.blockUsers(this.getCheckedUsers())
      .subscribe(() => this.initUsers());
  }

  unblockUsers() {
    this.auth.unblockUsers(this.getCheckedUsers())
      .subscribe(() => this.initUsers());
  }

  getCheckedUsers() {
    return this.users.filter(user => user.checked);
  }

  ngOnInit() {
    this.initUsers();
  }

  private initUsers() {
    this.auth.getAccounts().subscribe((res) => {
      this.users = res;
      console.log(res);
    })
  }
}
