import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../goods/Product';
import { way } from '../config';
import { AuthCookie } from '../auth-cookies-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];

  isUpdate = false;
  product: Product = new Product();

  // tslint:disable-next-line:variable-name
  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    if (!this._authCookie.getAuth()) {
      return this.router.navigate(['/']);
    }
    this.httpClient.post(`${way}/goods`, `data=${JSON.stringify({
      token: this._authCookie.getAuth()
      })}`, this.options).subscribe((result: any) => {
      if (result) {
        this.products = result;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  buttonCreateUpdateClick() {
    if (this.isUpdate) {
      this.Update();
    } else {
      this.Create();
    }
  }

  Create() {
    // tslint:disable-next-line:max-line-length
    this.httpClient.post(`${way}/goods/create`, `data=${JSON.stringify({token: this._authCookie.getAuth(), data: this.product})}`, this.options).subscribe((result: any) => {
      if (!result) { return; }
      this.products.push({id: result.id, name: result.name, description: result.description, price: result.price, url: result.url});
      this.product = new Product();
    });
  }

  buttonLoadUpdateClick(id: string) {
    // tslint:disable-next-line:radix
    this.product = JSON.parse(JSON.stringify(this.products.find(x => x.id === parseInt(id))));
    this.isUpdate = true;
  }

  Update() {
    // tslint:disable-next-line:max-line-length
    this.httpClient.post(`${way}/goods/update`, `data=${JSON.stringify({token: this._authCookie.getAuth(), data: this.product})}`, this.options).subscribe((result: any) => {
      if (!result) { return; }
      const productIndex = this.products.findIndex(x => x.id === result.id);
      if (productIndex === -1) { return; }
      this.products[productIndex] = result;
      this.product = new Product();
    });
    this.isUpdate = false;
  }

  buttonDeleteClick(id: number) {
    this.httpClient.post(`${way}/goods/delete`, `data=${JSON.stringify({token: this._authCookie.getAuth(), data: {
      id
    }})}`, this.options).subscribe((result: any) => {
      if (result) {
        const productIndex = this.products.findIndex(x => x.id === id);
        if (productIndex === -1) { return; }
        this.products.splice(productIndex, 1);
      }
    });
  }
}
