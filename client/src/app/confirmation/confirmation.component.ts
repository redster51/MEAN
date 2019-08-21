import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {

  constructor(private ngZone: NgZone, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.params.subscribe(params => {
      this.http.post('/api/confirmation', {token: params.token}).subscribe((res) => {
        console.log(res);
        //что-то с респонсом
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
      })
    });
  }
}
