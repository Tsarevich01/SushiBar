import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { way } from '../config';
import {AuthCookie} from '../auth-cookies-handler';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    const token = this.getTokenFromHref(document.location.href);
    if (token) {
      this.httpClient.get(`https://login.yandex.ru/info?oauth_token=${token}`, this.options).subscribe((result: any) => {
        if (!result) { return; }
        this.httpClient.post(`${way}/loginByToken`, `data=${JSON.stringify({
          login: result.default_email,
          oAuthToken: token
        })}`, this.options).subscribe((resultFromServer: any) => {
          if (!resultFromServer) { return; }
          this._authCookie.setAuth(resultFromServer.token);
          this._authCookie.setAdmin(resultFromServer.isAdmin);
          this.router.navigate(['/']);
        });
      });
    }
  }

  getTokenFromHref(href) {
    const startTokenIndex = href.indexOf('access_token=');
    const endTokenIndex = href.indexOf('&');
    if (startTokenIndex !== -1) {
      return href.slice(startTokenIndex + 13, endTokenIndex !== -1 ? endTokenIndex : href.length);
    }
  }
}
