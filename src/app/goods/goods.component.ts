import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './Product';
import { way } from '../config';
import { Router } from '@angular/router';
import { AuthCookie } from '../auth-cookies-handler';
import { WebSocketService } from '../web-soket';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.less']
})
export class GoodsComponent implements OnInit {

  products: Product[] = [];
  findText = '';
  lastFindText = '';
  waitTimes = 0;
  message = '';

  // tslint:disable-next-line:variable-name max-line-length
  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie, private webSocketService: WebSocketService) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.webSocketService.webSocketContext.onmessage = (result: any) => {
      console.log('New WS message', result);
      result = JSON.parse(result.data);
      if (result && result.data && result.type) {
        if (result.type === 'updateSushi') {
          this.products = result.data;
        } else if (result.type === 'updateText') {
          this.message = result.data.object.body;
        }
      } else {
        this.router.navigate(['/']);
      }
    };
    this.httpClient.post(`${way}/goods`, `data=${JSON.stringify({
      token: this._authCookie.getAuth()
      })}`, this.options).subscribe((result: any) => {
      if (result) {
        this.products = result;
      } else {
        this.router.navigate(['/']);
      }
    });
    setInterval(() => {
      if (this.waitTimes !== 0) {
        this.waitTimes--;
      } else {
        if (this.lastFindText !== this.findText) {
          this.lastFindText = this.findText;
          this.waitTimes = 10;
          this.httpClient.post(`${way}/goods`, `data=${JSON.stringify({
            token: this._authCookie.getAuth(), data: { findText: this.findText
            }})}`, this.options).subscribe((result: any) => {
            if (result) {
              this.products = result;
            } else {
              this.router.navigate(['/']);
            }
          });
        }
      }
    }, 100);
  }
}
