import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import {MaterialModule} from "./shared/material/material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [ChatComponent, DialogUserComponent],
  providers: [SocketService],
  entryComponents: [DialogUserComponent]
})
export class ChatModule { }
