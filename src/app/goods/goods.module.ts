import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GoodsComponent } from './goods.component';
import { FormsModule } from '@angular/forms';

export const ROUTES: Routes = [
  { path: '', component: GoodsComponent}
];

@NgModule({
  declarations: [
    GoodsComponent
  ],
    imports: [
        MDBBootstrapModule,
        RouterModule.forChild(ROUTES),
        CommonModule,
        FormsModule
    ]
})
export class GoodsModule { }
