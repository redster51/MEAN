import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationService} from './authentication.service';
import {AuthGuardService} from './auth-guard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {AlertsModule} from "angular-alert-module";
import {ChatComponent} from "./chat/chat.component";
import {ChatModule} from "./chat/chat.module";
import {SharedModule} from "./chat/shared/shared.module";
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'confirmation/:token', component: ConfirmationComponent},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: '*', component: RedirectComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ConfirmationComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AlertsModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    ChatModule,
    SharedModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
