import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {Router} from '@angular/router';
import {el} from "@angular/platform-browser/testing/src/browser_util";

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

export interface companyDetails {
  creator: string,
  name: string,
  description: string,
  topic: string,
  video: string,
  collectedMoney: Array<object>,
  needMoney: number,
  endDate: string,
  bonuses: Array<object>,
  rating: Array<object>,
  imgUrl: string,
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type, object?): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, object, {headers: {Authorization: `Bearer ${this.getToken()}`}});
    } else {
      base = this.http.get(`/api/${type}`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
    }

    const req = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return req;
  }

  public getChatInfo(): Observable<any> {
    return this.request('get', 'messages');
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public getAccounts(): Observable<any> {
    return this.request('get', 'users');
  }

  public deleteUsers(users): Observable<any> {
    return this.request('post', 'delete', users);
  }

  public blockUsers(users): Observable<any> {
    return this.request('post', 'block', users);
  }

  public unblockUsers(users): Observable<Object> {
    return this.request('post', 'unblock', users);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public addCompany(company: companyDetails): Observable<Object> {
    return this.request('post', 'createCompany', company);
  }

  public getCompanies(): Observable<Object> {
    return this.request("get", "companies");
  }

  public getCompaniesByUser(id): Observable<Object> {
    return this.request('get', 'userCompanies/' + id);
  }

  public getCompany(id: String): Observable<any> {
    return this.request("get", "company/" + id);
  }

  public addRating(companyId: string, rating: Object): Observable<Object> {
    return this.request('post', 'addRating', {companyId, rating});
  }

  public getRating(companyId: String): Observable<any> {
    return this.request('get', 'getRating/' + companyId);
  }

  public search(text: String): Observable<Object> {
    if (text) {
      return this.request('get', 'search/' + text);
    }
    return this.getCompanies();
  }

  public addDonate(donate): Observable<Object> {
    return this.request('post', 'donate', donate);
  }

  public addComment(comment): Observable<Object> {
    return this.request('post', 'addComment', comment);
  }

  public addNews(news): Observable<Object> {
    return this.request('post', 'addNews', news);
  }
}
