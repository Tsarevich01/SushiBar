import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { way } from '../config';
import { AuthCookie } from '../auth-cookies-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  login = '';
  password = '';

  // tslint:disable-next-line:variable-name
  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    if (this._authCookie.getAuth()) {
      this.router.navigate(['/']);
    }
  }

  buttonRegisterClick() {
    this.httpClient.post(`${way}/register`, `data=${JSON.stringify({
      login: this.login,
      password: this.password
    })}`, this.options).subscribe((result: any) => {
      if (!result) { return; }
      this._authCookie.setAuth(result.token);
      this._authCookie.setAdmin(result.isAdmin);
      this.router.navigate(['/']);
    });
  }
}
