import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from "../../authentication.service";

@Component({
  selector: 'tcc-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);
  previousUsername: string;

  constructor(public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any, private auth: AuthenticationService) {
    this.previousUsername = params.username ? params.username : undefined;
  }

  ngOnInit() {
    this.params.username = this.auth.getUserDetails().name;
  }

  public onSave(): void {
    this.dialogRef.close({
      username: this.params.username,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }
}
