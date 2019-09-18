import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {RedirectComponent} from './redirect/redirect.component';
import {CompanyCreateComponent} from './company-create/company-create.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {CompaniesComponent} from './companies/companies.component';
import {CompanyComponent} from './company/company.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FileUploadModule} from "ng2-file-upload";
import {BarRatingModule} from "ngx-bar-rating";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const routes: Routes = [
  {path: '', component: CompaniesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'confirmation/:token', component: ConfirmationComponent},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'create-company', component: CompanyCreateComponent, canActivate: [AuthGuardService]},
  {path: 'adm-panel', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'company/:id', component: CompanyComponent, canActivate: [AuthGuardService]},
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
    RedirectComponent,
    CompanyCreateComponent,
    CompaniesComponent,
    CompanyComponent,
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
    SharedModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    FileUploadModule,
    BarRatingModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatProgressBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory, // exported factory function needed for AoT compilation
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
